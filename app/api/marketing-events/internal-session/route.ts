import { NextRequest, NextResponse } from 'next/server';
import { getChatGPTUser, isStudioOwner } from '@/app/chatgpt-auth';
import { ensureLeadsSchema } from '@/db';

type SessionInput = Record<string, unknown>;

function cleanSessionId(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 80) : '';
}
export async function POST(request: NextRequest) {
  try {
    const user = await getChatGPTUser();
    if (!user || !isStudioOwner(user)) {
      return NextResponse.json({ error: 'Owner access required.' }, { status: 403 });
    }

    const requestOrigin = new URL(request.url).origin;
    const origin = request.headers.get('origin');
    if (origin && origin !== requestOrigin) {
      return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
    }

    const input = (await request.json()) as SessionInput;
    const sessionId = cleanSessionId(input.sessionId);
    if (!/^[a-zA-Z0-9-]{16,80}$/.test(sessionId)) {
      return NextResponse.json({ error: 'Invalid session.' }, { status: 400 });
    }

    const db = await ensureLeadsSchema();
    await db.prepare(`UPDATE marketing_events
      SET source = 'internal_owner', medium = 'internal', campaign = 'owner_browser', referrer_host = NULL
      WHERE session_id = ?`).bind(sessionId).run();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Owner session could not be excluded.' }, { status: 500 });
  }
}
