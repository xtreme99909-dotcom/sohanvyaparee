import { NextRequest, NextResponse } from 'next/server';
import { ensureLeadsSchema } from '@/db';
import { marketingPagePaths } from '@/app/marketing-attribution';
import { marketingEventTypes } from '@/app/marketing-events';

const allowedEvents = new Set<string>(marketingEventTypes);
const allowedPaths = new Set<string>(marketingPagePaths);

type EventInput = Record<string, unknown>;

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function referrerHost(value: unknown) {
  const candidate = clean(value, 500);
  if (!candidate) return '';
  try {
    return new URL(candidate).hostname.slice(0, 160);
  } catch {
    return '';
  }
}

export async function POST(request: NextRequest) {
  try {
    if (Number(request.headers.get('content-length') || 0) > 5_000) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    const requestOrigin = new URL(request.url).origin;
    const origin = request.headers.get('origin');
    if (origin && origin !== requestOrigin) {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    }

    const input = (await request.json()) as EventInput;
    const eventType = clean(input.eventType, 40);
    const pagePath = clean(input.pagePath, 120);
    const sessionId = clean(input.sessionId, 80);
    if (!allowedEvents.has(eventType) || !allowedPaths.has(pagePath) || !/^[a-zA-Z0-9-]{16,80}$/.test(sessionId)) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    const db = await ensureLeadsSchema();
    const now = new Date();
    await db.batch([
      db.prepare(`INSERT OR IGNORE INTO marketing_events (
        id, created_at, event_type, page_path, source, medium, campaign, referrer_host, session_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(
          crypto.randomUUID(),
          now.toISOString(),
          eventType,
          pagePath,
          clean(input.source, 120) || 'direct',
          clean(input.medium, 120) || 'none',
          clean(input.campaign, 160) || null,
          referrerHost(input.referrer) || null,
          sessionId,
        ),
      db.prepare('DELETE FROM marketing_events WHERE created_at < ?')
        .bind(new Date(now.getTime() - 180 * 24 * 60 * 60 * 1_000).toISOString()),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Event unavailable' }, { status: 500 });
  }
}
