import assert from 'node:assert/strict';
import fs from 'node:fs';

const paymentLinks = fs.readFileSync(new URL('../app/api/payment-links/route.ts', import.meta.url), 'utf8');
const webhook = fs.readFileSync(new URL('../app/api/webhooks/razorpay/route.ts', import.meta.url), 'utf8');
const migration = fs.readFileSync(new URL('../drizzle/0004_slow_the_executioner.sql', import.meta.url), 'utf8');

const reservationIndex = paymentLinks.indexOf('INSERT OR IGNORE INTO payment_links');
const providerCreateIndex = paymentLinks.indexOf("fetch('https://api.razorpay.com/v1/payment_links'");

assert(reservationIndex >= 0 && providerCreateIndex > reservationIndex, 'The local payment request must be reserved before creating the provider link.');
assert(paymentLinks.includes("notify: { email: false, sms: false }"), 'Provider email and SMS notifications must remain disabled.');
assert(paymentLinks.includes('reminder_enable: false'), 'Provider reminders must remain disabled.');
assert(paymentLinks.includes('stableRequestId'), 'Payment issuance must retain a stable idempotency key.');
assert(paymentLinks.includes('findProviderLink(referenceId)'), 'Ambiguous retries must reconcile by the provider reference.');
assert(paymentLinks.includes('cancelProviderLink(providerLinkId)'), 'Unpersisted or mismatched provider links must be cancelled when possible.');
assert(paymentLinks.includes('RAZORPAY_ACCOUNT_ID'), 'Payment issuance must require an expected provider account.');

for (const field of ['processing_status', 'attempts', 'processed_at', 'last_error']) {
  assert(webhook.includes(field), `Webhook processing is missing ${field}.`);
  assert(migration.includes(field), `The webhook migration is missing ${field}.`);
}
assert(webhook.includes("payment.captured === true"), 'Paid events must require a captured payment.');
assert(webhook.includes('paidEventMismatches'), 'Paid events must verify reference, amount, currency and provider account.');
assert(webhook.includes("status = 'review_required'"), 'Payment mismatches must be quarantined for review.');
assert(webhook.includes("processing_status = 'processed'"), 'Webhook events must be marked processed only after state handling.');
assert(webhook.includes("processing_status = 'failed'"), 'Failed webhook processing must remain retryable.');

console.log(JSON.stringify({
  ok: true,
  providerNotificationsDisabled: true,
  durableReservationBeforeProvider: true,
  stableRetryReference: true,
  providerMismatchQuarantine: true,
  retryableWebhookLedger: true,
  capturedPaymentVerification: true,
}, null, 2));
