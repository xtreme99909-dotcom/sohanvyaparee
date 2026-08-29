import { NextRequest, NextResponse } from 'next/server';
import { getChatGPTUser, isStudioOwner } from '@/app/chatgpt-auth';

const allowedStatuses = new Set(['new', 'contacted', 'qualified', 'closed']);
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await getChatGPTUser();
  if (!user) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
  if (!isStudioOwner(user)) return NextResponse.json({ error: 'Owner access required.' }, { status: 403 });

  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  }

  if (Number(request.headers.get('content-length') || 0) > 6_000) {
    return NextResponse.json({ error: 'Update too large.' }, { status: 413 });
  }

  try {
    const { id } = await context.params;
    const input = (await request.json()) as Record<string, unknown>;
    const status = clean(input.status, 20);
    const ownerNotes = clean(input.ownerNotes, 2_000);
    const nextActionAt = clean(input.nextActionAt, 10);

    if (!/^[0-9a-f-]{36}$/i.test(id) || !allowedStatuses.has(status)) {
      return NextResponse.json({ error: 'Invalid lead update.' }, { status: 400 });
    }
    if (nextActionAt && !datePattern.test(nextActionAt)) {
      return NextResponse.json({ error: 'Use a valid next-action date.' }, { status: 400 });
    }

    const updatedAt = new Date().toISOString();
    const { ensureLeadsSchema } = await import('@/db');
    const db = await ensureLeadsSchema();
    const result = await db.prepare(`UPDATE leads
      SET status = ?, owner_notes = ?, next_action_at = ?, updated_at = ?
      WHERE id = ?`)
      .bind(status, ownerNotes, nextActionAt || null, updatedAt, id)
      .run();

    if (!result.meta.changes) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    return NextResponse.json({
      ok: true,
      status,
      owner_notes: ownerNotes,
      next_action_at: nextActionAt || null,
      updated_at: updatedAt,
    });
  } catch {
    return NextResponse.json({ error: 'The lead update could not be saved.' }, { status: 500 });
  }
}
