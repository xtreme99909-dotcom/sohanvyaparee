import { NextRequest, NextResponse } from 'next/server';
import { paymentPolicyVersion } from '@/app/payments/policy';
import { ensureLeadsSchema } from '@/db';

export async function POST(request: NextRequest, { params }: { params: Promise<{ reference: string }> }) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 2_000) return NextResponse.json({ error: 'Request too large.' }, { status: 413 });

  const { reference } = await params;
  if (!/^SV-[A-Z0-9]{20}$/.test(reference)) return NextResponse.json({ error: 'Payment request not found.' }, { status: 404 });

  try {
    const input = await request.json() as Record<string, unknown>;
    if (input.accepted !== true) return NextResponse.json({ error: 'Review and accept the payment policies first.' }, { status: 400 });

    const db = await ensureLeadsSchema();
    const payment = await db.prepare(`SELECT short_url, status, expires_at
      FROM payment_links WHERE reference_id = ?`).bind(reference).first<{
        short_url: string;
        status: string;
        expires_at: string | null;
      }>();
    if (!payment) return NextResponse.json({ error: 'Payment request not found.' }, { status: 404 });
    if (payment.status !== 'created') return NextResponse.json({ error: `This payment request is ${payment.status.replaceAll('_', ' ')}.` }, { status: 409 });
    if (payment.expires_at && new Date(payment.expires_at).getTime() <= Date.now()) return NextResponse.json({ error: 'This payment request has expired. Ask for a fresh reference.' }, { status: 410 });
    if (!payment.short_url.startsWith('https://')) return NextResponse.json({ error: 'Secure checkout is unavailable.' }, { status: 503 });

    const now = new Date().toISOString();
    await db.prepare(`UPDATE payment_links SET
      client_policy_accepted_at = COALESCE(client_policy_accepted_at, ?),
      client_policy_version = COALESCE(client_policy_version, ?), updated_at = ?
      WHERE reference_id = ?`).bind(now, paymentPolicyVersion, now, reference).run();

    return NextResponse.json({ ok: true, url: payment.short_url }, { headers: { 'cache-control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Secure checkout could not be opened.' }, { status: 500 });
  }
}
