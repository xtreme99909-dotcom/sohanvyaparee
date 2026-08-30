import { NextRequest, NextResponse } from 'next/server';
import { ensureLeadsSchema } from '@/db';

type LeadInput = Record<string, unknown>;

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 160;
}

export async function POST(request: NextRequest) {
  try {
    if (Number(request.headers.get('content-length') || 0) > 30_000) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    const requestOrigin = new URL(request.url).origin;
    const origin = request.headers.get('origin');
    if (origin && origin !== requestOrigin) {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    }

    const input = (await request.json()) as LeadInput;
    if (clean(input.website, 200)) {
      return NextResponse.json({ ok: true, reference: 'received' });
    }

    const formStartedAt = Number(input.formStartedAt || 0);
    if (!Number.isFinite(formStartedAt) || formStartedAt <= 0 || Date.now() - formStartedAt < 1_000) {
      return NextResponse.json({ error: 'Please review the brief before sending.' }, { status: 400 });
    }

    const name = clean(input.name, 100);
    const email = clean(input.email, 160).toLowerCase();
    const company = clean(input.company, 140) || 'Not supplied';
    const projectType = clean(input.project, 100);
    const budget = clean(input.budget, 60);
    const timing = clean(input.timing, 80);
    const goal = clean(input.goal, 2_500);
    const consent = input.consent === true;

    if (!name || !validEmail(email) || !projectType || !budget || !timing || goal.length < 12 || !consent) {
      return NextResponse.json({ error: 'Please complete every required field.' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const db = await ensureLeadsSchema();
    const recentWindow = new Date(Date.now() - 60 * 60 * 1_000).toISOString();
    const recent = await db.prepare('SELECT COUNT(*) AS total FROM leads WHERE email = ? AND created_at > ?')
      .bind(email, recentWindow)
      .first<{ total: number }>();
    if ((recent?.total || 0) >= 3) {
      return NextResponse.json({ error: 'Too many recent enquiries.' }, { status: 429 });
    }

    await db.prepare(`INSERT INTO leads (
      id, created_at, name, email, company, project_type, budget, timing, goal,
      source, status, utm_source, utm_medium, utm_campaign, consent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?, ?, ?, 1)`)
      .bind(
        id,
        new Date().toISOString(),
        name,
        email,
        company,
        projectType,
        budget,
        timing,
        goal,
        clean(input.source, 500) || 'website',
        clean(input.utmSource, 120) || null,
        clean(input.utmMedium, 120) || null,
        clean(input.utmCampaign, 160) || null,
      )
      .run();

    return NextResponse.json({ ok: true, reference: id.slice(0, 8).toUpperCase() });
  } catch {
    return NextResponse.json({ error: 'The enquiry could not be saved.' }, { status: 500 });
  }
}
