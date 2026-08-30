import { env } from 'cloudflare:workers';
import { NextRequest, NextResponse } from 'next/server';
import { getChatGPTUser, isStudioOwner } from '@/app/chatgpt-auth';
import { ensureLeadsSchema } from '@/db';

const supportedCurrencies = new Set(['INR', 'USD', 'EUR', 'GBP', 'AED']);

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
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
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: 'Razorpay is not connected yet.' }, { status: 503 });
  }

  try {
    const input = (await request.json()) as Record<string, unknown>;
    const leadId = clean(input.leadId, 36);
    const currency = clean(input.currency, 3).toUpperCase();
    const description = clean(input.description, 180);
    const amount = Number(input.amount);

    if (!/^[0-9a-f-]{36}$/i.test(leadId) || !supportedCurrencies.has(currency) || !Number.isInteger(amount) || amount < 5_000 || amount > 50_000_000 || description.length < 8) {
      return NextResponse.json({ error: 'Use a valid lead, amount, currency and milestone.' }, { status: 400 });
    }

    const db = await ensureLeadsSchema();
    const lead = await db.prepare('SELECT id, name, email, company, status FROM leads WHERE id = ?')
      .bind(leadId)
      .first<{ id: string; name: string; email: string; company: string; status: string }>();
    if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    if (lead.status !== 'qualified') {
      return NextResponse.json({ error: 'Qualify and save the client before issuing a payment link.' }, { status: 409 });
    }

    const id = crypto.randomUUID();
    const referenceId = `SV-${id.replaceAll('-', '').slice(0, 20).toUpperCase()}`;
    const credentials = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
    const providerResponse = await fetch('https://api.razorpay.com/v1/payment_links', {
      method: 'POST',
      headers: {
        authorization: `Basic ${credentials}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        accept_partial: false,
        reference_id: referenceId,
        description,
        customer: { name: lead.name, email: lead.email },
        notify: { email: true, sms: false },
        reminder_enable: true,
        callback_url: `${request.nextUrl.origin}/payments/complete?reference=${encodeURIComponent(referenceId)}`,
        callback_method: 'get',
        notes: { lead_id: lead.id, company: lead.company.slice(0, 120) },
      }),
    });

    const providerData = await providerResponse.json() as Record<string, unknown>;
    const providerLinkId = clean(providerData.id, 80);
    const shortUrl = clean(providerData.short_url, 500);
    if (!providerResponse.ok || !providerLinkId || !shortUrl.startsWith('https://')) {
      return NextResponse.json({ error: 'Razorpay could not create this payment link.' }, { status: 502 });
    }

    const now = new Date().toISOString();
    await db.prepare(`INSERT INTO payment_links (
      id, created_at, updated_at, lead_id, provider_link_id, reference_id, short_url,
      description, amount, currency, customer_name, customer_email
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(
      id,
      now,
      now,
      lead.id,
      providerLinkId,
      referenceId,
      shortUrl,
      description,
      amount,
      currency,
      lead.name,
      lead.email,
    ).run();

    return NextResponse.json({ ok: true, url: shortUrl, reference: referenceId });
  } catch {
    return NextResponse.json({ error: 'The secure payment link could not be created.' }, { status: 500 });
  }
}
