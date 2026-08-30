import { env } from 'cloudflare:workers';
import { NextResponse } from 'next/server';
import { notifyOwnerOfPayment } from '@/app/payments/notifications';
import { ensureLeadsSchema } from '@/db';

type RazorpayEntity = Record<string, unknown>;

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function nestedEntity(payload: unknown, key: string): RazorpayEntity {
  if (!payload || typeof payload !== 'object') return {};
  const keyed = (payload as Record<string, unknown>)[key];
  if (!keyed || typeof keyed !== 'object') return {};
  const entity = (keyed as Record<string, unknown>).entity;
  return entity && typeof entity === 'object' ? entity as RazorpayEntity : {};
}

function bytesToHex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return mismatch === 0;
}

async function validSignature(body: string, signature: string) {
  if (!env.RAZORPAY_WEBHOOK_SECRET || !signature) return false;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(env.RAZORPAY_WEBHOOK_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const digest = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  return constantTimeEqual(bytesToHex(digest), signature.toLowerCase());
}

function amountLabel(amount: number, currency: string) {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).format(amount / 100);
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-razorpay-signature') || '';
  const providerEventId = clean(request.headers.get('x-razorpay-event-id'), 160) || null;
  if (!(await validSignature(body, signature))) {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
  }

  try {
    const event = JSON.parse(body) as Record<string, unknown>;
    const eventType = clean(event.event, 80);
    const paymentLink = nestedEntity(event.payload, 'payment_link');
    const payment = nestedEntity(event.payload, 'payment');
    const refund = nestedEntity(event.payload, 'refund');
    const providerLinkId = clean(paymentLink.id, 80);
    const db = await ensureLeadsSchema();

    const inserted = await db.prepare(`INSERT OR IGNORE INTO payment_webhook_events
      (signature, event_id, created_at, event_type, provider_link_id) VALUES (?, ?, ?, ?, ?)`).bind(
      signature,
      providerEventId,
      new Date().toISOString(),
      eventType || 'unknown',
      providerLinkId || null,
    ).run();
    if (!inserted.meta.changes) return NextResponse.json({ received: true, duplicate: true });

    if (eventType === 'refund.processed') {
      const refundPaymentId = clean(refund.payment_id, 80) || clean(payment.id, 80);
      const refundId = clean(refund.id, 80) || null;
      const refundAmount = Number(refund.amount || 0);
      if (!refundPaymentId || !Number.isFinite(refundAmount) || refundAmount <= 0) {
        return NextResponse.json({ received: true, ignored: true });
      }
      const now = new Date().toISOString();
      await db.prepare(`UPDATE payment_links SET
        refunded_amount = MIN(amount, refunded_amount + ?),
        refund_status = CASE WHEN refunded_amount + ? >= amount THEN 'full' ELSE 'partial' END,
        refund_reference = COALESCE(?, refund_reference), last_provider_event_at = ?, updated_at = ?
        WHERE provider_payment_id = ?`).bind(refundAmount, refundAmount, refundId, now, now, refundPaymentId).run();
      return NextResponse.json({ received: true, refundRecorded: true });
    }

    if (!providerLinkId || !['payment_link.paid', 'payment_link.partially_paid', 'payment_link.cancelled', 'payment_link.expired'].includes(eventType)) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const statusByEvent: Record<string, string> = {
      'payment_link.paid': 'paid',
      'payment_link.partially_paid': 'partially_paid',
      'payment_link.cancelled': 'cancelled',
      'payment_link.expired': 'expired',
    };
    const status = statusByEvent[eventType];
    const amountPaid = Number(paymentLink.amount_paid || payment.amount || 0);
    const providerPaymentId = clean(payment.id, 80) || null;
    const now = new Date().toISOString();
    const previous = await db.prepare('SELECT status FROM payment_links WHERE provider_link_id = ?')
      .bind(providerLinkId)
      .first<{ status: string }>();

    await db.prepare(`UPDATE payment_links SET
      status = CASE
        WHEN status = 'paid' THEN status
        WHEN ? = 'paid' THEN 'paid'
        WHEN status = 'partially_paid' AND ? IN ('cancelled', 'expired') THEN status
        ELSE ? END,
      amount_paid = MAX(amount_paid, ?), provider_payment_id = COALESCE(?, provider_payment_id),
      paid_at = CASE WHEN ? = 'paid' THEN COALESCE(paid_at, ?) ELSE paid_at END,
      last_provider_event_at = ?, updated_at = ?
      WHERE provider_link_id = ?`).bind(
      status,
      status,
      status,
      Number.isFinite(amountPaid) ? amountPaid : 0,
      providerPaymentId,
      status,
      now,
      now,
      now,
      providerLinkId,
    ).run();

    if (status !== 'paid' || previous?.status === 'paid') return NextResponse.json({ received: true });

    const record = await db.prepare(`SELECT reference_id, amount, amount_paid, currency, description,
      customer_name, customer_email FROM payment_links WHERE provider_link_id = ?`).bind(providerLinkId).first<{
        reference_id: string;
        amount: number;
        amount_paid: number;
        currency: string;
        description: string;
        customer_name: string | null;
        customer_email: string | null;
      }>();
    if (!record) return NextResponse.json({ received: true, untracked: true });

    const results = await notifyOwnerOfPayment({
      amountLabel: amountLabel(record.amount_paid || record.amount, record.currency),
      clientName: record.customer_name || 'Client',
      clientEmail: record.customer_email || '',
      description: record.description,
      referenceId: record.reference_id,
    });
    const notificationStatus = results.some((result) => result.state === 'sent') ? 'sent' : 'not_configured';
    const notificationDetail = results.map((result) => `${result.channel}: ${result.detail}`).join(' · ').slice(0, 800);
    await db.prepare(`UPDATE payment_links SET notification_status = ?, notification_detail = ?, updated_at = ?
      WHERE provider_link_id = ?`).bind(notificationStatus, notificationDetail, new Date().toISOString(), providerLinkId).run();

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 });
  }
}
