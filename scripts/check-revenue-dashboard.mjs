import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { buildExecutiveSummary, formatMoneySeries } from '../app/revenue/dashboard-model.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const page = readFileSync(join(root, 'app/revenue/page.tsx'), 'utf8');

const duplicateSummary = buildExecutiveSummary({
  storedEnquiries: 5,
  uniqueContacts: 3,
  duplicateEnquiries: 2,
  qualified: 1,
  acceptedSows: 1,
  capturedMilestones: 1,
  refundCases: 0,
  reviewRequired: 0,
  stale: 0,
  settlementAvailable: false,
});

assert.match(duplicateSummary.revenue, /Revenue is not reported/);
assert.match(duplicateSummary.revenue, /not revenue/);
assert.match(duplicateSummary.demand, /2 duplicate enquiries are excluded/);
assert.match(duplicateSummary.movement, /None is presented as settled revenue/);
assert.equal(formatMoneySeries([{ currency: 'USD', captured_amount: 12500 }], 'captured_amount', 'empty'), '$125.00');
assert.equal(formatMoneySeries([], 'captured_amount', 'No verified captures'), 'No verified captures');

const requiredContracts = [
  'COUNT(DISTINCT lower(trim(email))) AS unique_contacts',
  "events.event_type = 'payment_link.paid'",
  "events.processing_status = 'processed'",
  'Duplicate-contact guardrail',
  'Stale-stage alerts',
  'Source attribution',
  'Potential pipeline is not revenue',
  'Settlement evidence is not connected',
  "settlementAvailable: false",
  'The contacted status is deliberately not treated as proof of a reply.',
  'Review-required payment events are not mislabeled as disputes.',
  'Stored enquiries',
];

for (const contract of requiredContracts) {
  assert.ok(page.includes(contract), 'Missing dashboard evidence contract: ' + contract);
}

assert.doesNotMatch(page, /pipeline\s+(value|revenue)\s*[:=]/i);
assert.doesNotMatch(page, /status\s*=\s*'paid'.{0,80}revenue/is);

console.log('Revenue dashboard evidence contract passed.');
