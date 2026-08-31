import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { buildExecutiveSummary, formatMoneySeries } from '../app/revenue/dashboard-model.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');
const page = read('app/revenue/page.tsx');
const api = read('app/api/revenue-evidence/route.ts');
const recorder = read('app/revenue/evidence-recorder.tsx');
const schema = read('db/schema.ts');
const migration = read('drizzle/0006_funnel_evidence_events.sql');

const summary = buildExecutiveSummary({
  storedEnquiries: 5,
  uniqueContacts: 3,
  duplicateEnquiries: 2,
  qualified: 1,
  verifiedReplies: 1,
  scopeableOpportunities: 1,
  proposalsIssued: 1,
  acceptedSows: 1,
  capturedMilestones: 1,
  refundCases: 0,
  reviewRequired: 0,
  stale: 0,
  settlementAvailable: false,
});

assert.match(summary.revenue, /Revenue is not reported/);
assert.match(summary.revenue, /not revenue/);
assert.match(summary.demand, /2 duplicate enquiries are excluded/);
assert.match(summary.movement, /none is presented as settled revenue/i);
assert.match(summary.movement, /Research, drafts and potential value are excluded/);
assert.equal(formatMoneySeries([{ currency: 'USD', captured_amount: 12500 }], 'captured_amount', 'empty'), '$125.00');
assert.equal(formatMoneySeries([], 'captured_amount', 'No verified captures'), 'No verified captures');

for (const contract of [
  'COUNT(DISTINCT lower(trim(email))) AS unique_contacts',
  'Duplicate-contact guardrail',
  'Stale-stage alerts',
  'Source attribution',
  'Potential pipeline is not revenue',
  'Settlement evidence is not connected',
  'EvidenceRecorder',
  'verified_reply',
  'scopeable_opportunity',
  'proposal_issued',
  'sow_accepted',
]) {
  assert.ok(page.includes(contract), 'Missing dashboard evidence contract: ' + contract);
}

for (const contract of [
  'INSERT OR IGNORE INTO funnel_evidence_events',
  "scopeable_opportunity: 'qualified_lead'",
  "proposal_issued: 'scopeable_opportunity'",
  "sow_accepted: 'proposal_issued'",
  'idempotencyKey',
]) {
  assert.ok(api.includes(contract), 'Missing evidence API contract: ' + contract);
}

assert.match(schema, /export const funnelEvidenceEvents/);
assert.match(migration, /BEFORE UPDATE ON `funnel_evidence_events`/);
assert.match(migration, /BEFORE DELETE ON `funnel_evidence_events`/);
assert.match(migration, /CREATE UNIQUE INDEX `idx_funnel_evidence_idempotency`/);
assert.doesNotMatch(api, /UPDATE\s+funnel_evidence_events/i);
assert.doesNotMatch(api, /DELETE\s+FROM\s+funnel_evidence_events/i);
assert.doesNotMatch(recorder, /type=["']number["']/);
assert.doesNotMatch(page, /pipeline\s+(value|revenue)\s*[:=]/i);
assert.doesNotMatch(page, /status\s*=\s*'paid'.{0,80}revenue/is);

console.log('Revenue dashboard and append-only evidence contract passed.');
