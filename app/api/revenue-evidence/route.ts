import { NextRequest, NextResponse } from 'next/server';
import { getChatGPTUser, isStudioOwner } from '@/app/chatgpt-auth';
import { ensureLeadsSchema } from '@/db';

const eventTypes = ['qualified_lead', 'verified_reply', 'scopeable_opportunity', 'proposal_issued', 'sow_accepted'] as const;
type EvidenceEventType = (typeof eventTypes)[number];

const evidenceSource: Record<EvidenceEventType, string> = {
  qualified_lead: 'qualification_record',
  verified_reply: 'message_receipt',
  scopeable_opportunity: 'qualification_record',
  proposal_issued: 'proposal_record',
  sow_accepted: 'signed_agreement',
};

const requiredPriorEvent: Partial<Record<EvidenceEventType, EvidenceEventType>> = {
  scopeable_opportunity: 'qualified_lead',
  proposal_issued: 'scopeable_opportunity',
  sow_accepted: 'proposal_issued',
};

const qualificationSignals = ['need', 'authority', 'outcome', 'timing', 'investment'] as const;
const scopeableSignals = ['need', 'authority', 'outcome', 'scope', 'readiness', 'timing', 'investment'] as const;

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isEventType(value: string): value is EvidenceEventType {
  return eventTypes.some((eventType) => eventType === value);
}

function normalizedBasis(value: unknown) {
  if (!value || typeof value !== 'object') return {};
  const input = value as Record<string, unknown>;
  return Object.fromEntries(scopeableSignals.map((signal) => [signal, input[signal] === true]));
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
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
    return NextResponse.json({ error: 'Evidence record too large.' }, { status: 413 });
  }

  try {
    const input = (await request.json()) as Record<string, unknown>;
    const leadId = clean(input.leadId, 36);
    const eventType = clean(input.eventType, 40);
    const evidenceRef = clean(input.evidenceRef, 160);
    const notes = clean(input.notes, 500);
    const occurredInput = clean(input.occurredAt, 40);

    if (!/^[0-9a-f-]{36}$/i.test(leadId) || !isEventType(eventType) || evidenceRef.length < 4) {
      return NextResponse.json({ error: 'Lead, evidence stage and reference are required.' }, { status: 400 });
    }

    const occurredDate = new Date(occurredInput);
    if (!Number.isFinite(occurredDate.getTime())) {
      return NextResponse.json({ error: 'Use a valid evidence time.' }, { status: 400 });
    }
    const occurredAt = occurredDate.toISOString();
    const now = new Date();
    if (occurredDate.getTime() > now.getTime() + 5 * 60 * 1_000) {
      return NextResponse.json({ error: 'Evidence time cannot be in the future.' }, { status: 400 });
    }
    if (occurredDate.getTime() < new Date('2020-01-01T00:00:00.000Z').getTime()) {
      return NextResponse.json({ error: 'Evidence time is outside the supported operating period.' }, { status: 400 });
    }

    const basis = normalizedBasis(input.scopeableBasis);
    const requiredSignals = eventType === 'qualified_lead'
      ? qualificationSignals
      : eventType === 'scopeable_opportunity' ? scopeableSignals : [];
    if (requiredSignals.some((signal) => basis[signal] !== true)) {
      return NextResponse.json({
        error: eventType === 'qualified_lead'
          ? 'Qualification requires need, authority, outcome, timing and investment fit.'
          : 'Scopeable evidence also requires scope shape and readiness.',
      }, { status: 400 });
    }

    const db = await ensureLeadsSchema();
    const lead = await db.prepare('SELECT id, lower(trim(email)) AS contact_key FROM leads WHERE id = ?')
      .bind(leadId)
      .first<{ id: string; contact_key: string }>();
    if (!lead) return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });

    const priorEvent = requiredPriorEvent[eventType];
    if (priorEvent) {
      const prior = await db.prepare(
        'SELECT evidence.id FROM funnel_evidence_events evidence ' +
        'JOIN leads evidence_lead ON evidence_lead.id = evidence.lead_id ' +
        'WHERE lower(trim(evidence_lead.email)) = ? AND evidence.event_type = ? AND evidence.occurred_at <= ? LIMIT 1',
      ).bind(lead.contact_key, priorEvent, occurredAt).first<{ id: string }>();
      if (!prior) {
        const errorByEvent: Record<string, string> = {
          scopeable_opportunity: 'Record qualification evidence before scopeability.',
          proposal_issued: 'Record scopeable evidence before a proposal.',
          sow_accepted: 'Record the issued proposal before an accepted SOW.',
        };
        return NextResponse.json({ error: errorByEvent[eventType] }, { status: 409 });
      }
    }

    const idempotencyKey = await sha256([lead.contact_key, eventType, evidenceRef.toLowerCase()].join('|'));
    const id = crypto.randomUUID();
    const createdAt = now.toISOString();
    const result = await db.prepare(
      'INSERT OR IGNORE INTO funnel_evidence_events ' +
      '(id, created_at, occurred_at, event_type, lead_id, evidence_source, evidence_ref, basis_json, notes, idempotency_key, recorded_by) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    ).bind(
      id,
      createdAt,
      occurredAt,
      eventType,
      leadId,
      evidenceSource[eventType],
      evidenceRef,
      JSON.stringify(requiredSignals.length ? basis : {}),
      notes,
      idempotencyKey,
      user.userId,
    ).run();

    if (!result.meta.changes) {
      const existing = await db.prepare('SELECT id FROM funnel_evidence_events WHERE idempotency_key = ?')
        .bind(idempotencyKey)
        .first<{ id: string }>();
      return NextResponse.json({ ok: true, duplicate: true, id: existing?.id || null });
    }

    return NextResponse.json({ ok: true, duplicate: false, id });
  } catch {
    return NextResponse.json({ error: 'The evidence record could not be appended.' }, { status: 500 });
  }
}
