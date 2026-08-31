import { env } from 'cloudflare:workers';
import { NextRequest, NextResponse } from 'next/server';
import { getChatGPTUser, isStudioOwner } from '@/app/chatgpt-auth';
import { paymentPolicyVersion } from '@/app/payments/policy';
import { createPaymentReference } from '@/app/payments/reference';
import { ensureLeadsSchema } from '@/db';

const supportedCurrencies = new Set(['INR', 'USD', 'EUR', 'GBP', 'AED']);

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

type ProviderPaymentLink = Record<string, unknown>;

function basicAuthorization() {
  return `Basic ${btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`)}`;
}

async function stableRequestId(parts: Record<string, string | number>) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(parts)));
  const hex = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function providerLinkFromList(payload: unknown, referenceId: string) {
  if (!payload || typeof payload !== 'object') return null;
  const links = (payload as Record<string, unknown>).payment_links;
  if (!Array.isArray(links)) return null;
  const matches = links.filter((link): link is ProviderPaymentLink => Boolean(
    link && typeof link === 'object' && clean((link as ProviderPaymentLink).reference_id, 40) === referenceId,
  ));
  return matches.length === 1 ? matches[0] : null;
}

async function findProviderLink(referenceId: string) {
  const response = await fetch(`https://api.razorpay.com/v1/payment_links?reference_id=${encodeURIComponent(referenceId)}`, {
    headers: { authorization: basicAuthorization(), 'content-type': 'application/json' },
  });
  if (!response.ok) return null;
  return providerLinkFromList(await response.json(), referenceId);
}

async function cancelProviderLink(providerLinkId: string) {
  if (!providerLinkId) return;
  try {
    await fetch(`https://api.razorpay.com/v1/payment_links/${encodeURIComponent(providerLinkId)}/cancel`, {
      method: 'POST',
      headers: { authorization: basicAuthorization(), 'content-type': 'application/json' },
    });
  } catch {
    // The local request remains blocked even when provider-side cleanup needs manual reconciliation.
  }
}

function validProviderLink(link: ProviderPaymentLink, expected: { amount: number; currency: string; referenceId: string }) {
  return Boolean(clean(link.id, 80)
    && clean(link.short_url, 500).startsWith('https://')
    && Number(link.amount) === expected.amount
    && clean(link.currency, 3).toUpperCase() === expected.currency
    && clean(link.reference_id, 40) === expected.referenceId);
}

export async function POST(request: NextRequest) {
  const user = await getChatGPTUser();
  if (!user) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
  if (!isStudioOwner(user)) return NextResponse.json({ error: 'Owner access required.' }, { status: 403 });

  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  }
  if (Number(request.headers.get('content-length') || 0) > 8_000) {
    return NextResponse.json({ error: 'Payment request too large.' }, { status: 413 });
  }
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET || !env.RAZORPAY_ACCOUNT_ID) {
    return NextResponse.json({ error: 'Razorpay verification is not fully connected yet.' }, { status: 503 });
  }

  try {
    const input = (await request.json()) as Record<string, unknown>;
    const leadId = clean(input.leadId, 36);
    const currency = clean(input.currency, 3).toUpperCase();
    const description = clean(input.description, 180);
    const agreementReference = clean(input.agreementReference, 120);
    const scopeVersion = clean(input.scopeVersion, 120);
    const deliveryWindow = clean(input.deliveryWindow, 160);
    const agreementConfirmed = input.agreementConfirmed === true;
    const amount = Number(input.amount);

    if (!/^[0-9a-f-]{36}$/i.test(leadId) || !supportedCurrencies.has(currency) || !Number.isInteger(amount) || amount < 5_000 || amount > 50_000_000 || description.length < 8) {
      return NextResponse.json({ error: 'Use a valid lead, amount, currency and milestone.' }, { status: 400 });
    }
    if (!agreementConfirmed || agreementReference.length < 5 || scopeVersion.length < 3 || deliveryWindow.length < 8) {
      return NextResponse.json({ error: 'Record the accepted agreement, scope version and delivery window before issuing payment.' }, { status: 400 });
    }

    const db = await ensureLeadsSchema();
    const lead = await db.prepare('SELECT id, name, email, company, status FROM leads WHERE id = ?')
      .bind(leadId)
      .first<{ id: string; name: string; email: string; company: string; status: string }>();
    if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    if (lead.status !== 'qualified') {
      return NextResponse.json({ error: 'Qualify and save the client before issuing a payment link.' }, { status: 409 });
    }

    const id = await stableRequestId({
      leadId: lead.id,
      amount,
      currency,
      description,
      agreementReference,
      scopeVersion,
      deliveryWindow,
      policyVersion: paymentPolicyVersion,
    });
    const referenceId = createPaymentReference(id);
    const expiresAtSeconds = Math.floor(Date.now() / 1000) + (14 * 24 * 60 * 60);
    const expiresAt = new Date(expiresAtSeconds * 1000).toISOString();
    const now = new Date().toISOString();
    await db.prepare(`INSERT OR IGNORE INTO payment_links (
      id, created_at, updated_at, lead_id, provider_link_id, reference_id, short_url,
      description, amount, currency, status, customer_name, customer_email, expires_at,
      agreement_reference, scope_version, delivery_window, policy_version, agreement_confirmed_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'creating', ?, ?, ?, ?, ?, ?, ?, ?)`).bind(
      id,
      now,
      now,
      lead.id,
      `pending:${id}`,
      referenceId,
      '',
      description,
      amount,
      currency,
      lead.name,
      lead.email,
      expiresAt,
      agreementReference,
      scopeVersion,
      deliveryWindow,
      paymentPolicyVersion,
      now,
    ).run();

    const reviewUrl = new URL(`/pay/${encodeURIComponent(referenceId)}`, request.nextUrl.origin).toString();
    const existing = await db.prepare(`SELECT provider_link_id, short_url, status FROM payment_links WHERE id = ?`)
      .bind(id)
      .first<{ provider_link_id: string; short_url: string; status: string }>();
    if (!existing) throw new Error('The payment request could not be reserved.');
    if (!existing.provider_link_id.startsWith('pending:') && existing.short_url.startsWith('https://')) {
      return NextResponse.json({ ok: true, url: reviewUrl, reference: referenceId, reused: true });
    }

    let providerData = await findProviderLink(referenceId);
    if (!providerData) {
      const providerResponse = await fetch('https://api.razorpay.com/v1/payment_links', {
        method: 'POST',
        headers: { authorization: basicAuthorization(), 'content-type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          accept_partial: false,
          reference_id: referenceId,
          description,
          customer: { name: lead.name, email: lead.email },
          notify: { email: false, sms: false },
          reminder_enable: false,
          expire_by: expiresAtSeconds,
          callback_url: `${request.nextUrl.origin}/payments/complete?reference=${encodeURIComponent(referenceId)}`,
          callback_method: 'get',
          notes: {
            lead_id: lead.id,
            company: lead.company.slice(0, 120),
            agreement_reference: agreementReference,
            scope_version: scopeVersion,
            provider_account: env.RAZORPAY_ACCOUNT_ID,
          },
        }),
      });
      providerData = await providerResponse.json() as ProviderPaymentLink;
      if (!providerResponse.ok) {
        await db.prepare(`UPDATE payment_links SET status = 'creation_failed', updated_at = ? WHERE id = ?`).bind(new Date().toISOString(), id).run();
        return NextResponse.json({ error: 'Razorpay could not create this payment link.' }, { status: 502 });
      }
    }

    const providerLinkId = clean(providerData.id, 80);
    const shortUrl = clean(providerData.short_url, 500);
    if (!validProviderLink(providerData, { amount, currency, referenceId })) {
      await cancelProviderLink(providerLinkId);
      await db.prepare(`UPDATE payment_links SET status = 'review_required', notification_status = 'failed',
        notification_detail = 'Provider link did not match the reserved request.', updated_at = ? WHERE id = ?`)
        .bind(new Date().toISOString(), id)
        .run();
      return NextResponse.json({ error: 'The provider response did not match this milestone. No link was issued.' }, { status: 502 });
    }

    try {
      await db.prepare(`UPDATE payment_links SET provider_link_id = ?, short_url = ?, status = 'created',
        expires_at = ?, updated_at = ? WHERE id = ?`).bind(providerLinkId, shortUrl, expiresAt, new Date().toISOString(), id).run();
    } catch (error) {
      await cancelProviderLink(providerLinkId);
      throw error;
    }

    return NextResponse.json({ ok: true, url: reviewUrl, reference: referenceId });
  } catch {
    return NextResponse.json({ error: 'The secure payment link could not be created.' }, { status: 500 });
  }
}
