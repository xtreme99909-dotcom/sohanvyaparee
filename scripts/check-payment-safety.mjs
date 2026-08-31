import assert from 'node:assert/strict';
import fs from 'node:fs';
import { providerCurrencyMismatches } from '../app/payments/provider-verification.js';

const paymentLinks = fs.readFileSync(new URL('../app/api/payment-links/route.ts', import.meta.url), 'utf8');
const webhook = fs.readFileSync(new URL('../app/api/webhooks/razorpay/route.ts', import.meta.url), 'utf8');
const schema = fs.readFileSync(new URL('../db/schema.ts', import.meta.url), 'utf8');
const migrationsDirectory = new URL('../drizzle/', import.meta.url);
const migrations = fs.readdirSync(migrationsDirectory)
  .filter((name) => name.endsWith('.sql'))
  .map((name) => fs.readFileSync(new URL(name, migrationsDirectory), 'utf8'))
  .join('\n');

const reservationIndex = paymentLinks.indexOf('INSERT OR IGNORE INTO payment_links');
const providerCreateIndex = paymentLinks.indexOf("fetch('https://api.razorpay.com/v1/payment_links'");

assert(reservationIndex >= 0 && providerCreateIndex > reservationIndex, 'The local payment request must be reserved before creating the provider link.');
assert(paymentLinks.includes("notify: { email: false, sms: false }"), 'Provider email and SMS notifications must remain disabled.');
assert(paymentLinks.includes('reminder_enable: false'), 'Provider reminders must remain disabled.');
assert(paymentLinks.includes('stableRequestId'), 'Payment issuance must retain a stable idempotency key.');
assert(paymentLinks.includes('findProviderLink(referenceId)'), 'Ambiguous retries must reconcile by the provider reference.');
assert(paymentLinks.includes('cancelProviderLink(providerLinkId)'), 'Unpersisted or mismatched provider links must be cancelled when possible.');
assert(paymentLinks.includes('RAZORPAY_ACCOUNT_ID'), 'Payment issuance must require an expected provider account.');
assert(paymentLinks.includes('paymentLinkLeaseMs'), 'Payment issuance must retain a bounded creation lease.');
assert(paymentLinks.includes("provider_link_id LIKE 'pending:%'"), 'Concurrent payment-link creation must use an atomic pending-lease claim.');
assert(paymentLinks.includes("status = 'creation_failed' OR (status = 'creating' AND updated_at <= ?)"), 'Only failed or stale payment-link claims may be taken over.');
assert(paymentLinks.includes('ownsCreationLease = Number(claim.meta.changes) > 0'), 'Provider creation must require a successful atomic claim.');
assert(paymentLinks.includes("WHERE id = ? AND provider_link_id = ? AND status = 'creating'"), 'Payment-link persistence must remain bound to the active claim.');
assert(paymentLinks.includes("state: 'unavailable'"), 'Provider lookup failures must not be treated as a missing link.');

for (const field of ['processing_status', 'attempts', 'processed_at', 'processing_token', 'lease_expires_at', 'last_error']) {
  assert(webhook.includes(field), `Webhook processing is missing ${field}.`);
  assert(schema.includes(field.replaceAll('_', '').toLowerCase()) || schema.includes(field), `The webhook schema is missing ${field}.`);
  assert(migrations.includes(field), `The webhook migrations are missing ${field}.`);
}
assert(webhook.includes("payment.captured === true"), 'Paid events must require a captured payment.');
assert(webhook.includes('paidEventMismatches'), 'Paid events must verify reference, amount, currency and provider account.');
assert(webhook.includes('providerCurrencyMismatches(record.currency, payment.currency, paymentLink.currency)'), 'Every present provider currency must be checked independently.');
assert.deepEqual(providerCurrencyMismatches('USD', 'USD', 'USD'), [], 'Matching provider currencies must pass.');
assert.deepEqual(providerCurrencyMismatches('USD', 'USD', 'EUR'), ['payment-link currency'], 'A wrong payment-link currency must not be hidden by the payment currency.');
assert.deepEqual(providerCurrencyMismatches('USD', 'EUR', 'USD'), ['payment currency'], 'A wrong payment currency must not be hidden by the payment-link currency.');
assert.deepEqual(providerCurrencyMismatches('USD', '', ''), ['currency missing'], 'A paid event must include at least one provider currency.');
assert(webhook.includes("status = 'review_required'"), 'Payment mismatches must be quarantined for review.');
assert(webhook.includes("processing_status = 'processed'"), 'Webhook events must be marked processed only after state handling.');
assert(webhook.includes("processing_status = 'failed'"), 'Failed webhook processing must remain retryable.');
assert(webhook.includes("processing_status IN ('received', 'failed')"), 'Webhook claims must start only from claimable states.');
assert(webhook.includes('lease_expires_at <= ?'), 'Webhook processing must support bounded stale-lease recovery.');
assert(webhook.includes('if (!Number(claim.meta.changes))'), 'A duplicate webhook must not process without winning the atomic claim.');
assert(webhook.includes("processing_token = ?"), 'Webhook state changes must remain bound to the active processing token.');
assert(webhook.includes("SELECT 1 FROM payment_webhook_events"), 'Payment and refund mutations must verify the active webhook claim.');

console.log(JSON.stringify({
  ok: true,
  providerNotificationsDisabled: true,
  durableReservationBeforeProvider: true,
  stableRetryReference: true,
  atomicCreationLease: true,
  providerMismatchQuarantine: true,
  retryableWebhookLedger: true,
  atomicWebhookClaim: true,
  guardedRefundMutation: true,
  capturedPaymentVerification: true,
  independentCurrencyVerification: true,
}, null, 2));
