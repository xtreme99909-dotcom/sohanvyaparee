/**
 * @typedef {Object} ExecutiveInput
 * @property {number} storedEnquiries
 * @property {number} uniqueContacts
 * @property {number} duplicateEnquiries
 * @property {number} qualified
 * @property {number} acceptedSows
 * @property {number} capturedMilestones
 * @property {number} refundCases
 * @property {number} reviewRequired
 * @property {number} stale
 * @property {boolean} settlementAvailable
 */

/**
 * Format an integer amount stored in the currency's smallest unit.
 * @param {number} amount
 * @param {string} currency
 */
export function formatMoney(amount, currency) {
  try {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount / 100);
  } catch {
    return currency + ' ' + (amount / 100).toFixed(2);
  }
}

/**
 * @param {Array<{currency: string, captured_amount?: number, refunded_amount?: number}>} rows
 * @param {'captured_amount' | 'refunded_amount'} field
 * @param {string} emptyLabel
 */
export function formatMoneySeries(rows, field, emptyLabel) {
  const verified = rows.filter((row) => Number(row[field]) > 0);
  if (verified.length === 0) return emptyLabel;
  return verified.map((row) => formatMoney(Number(row[field]), row.currency)).join(' + ');
}

/**
 * Build deterministic owner-facing summaries from stored evidence only.
 * @param {ExecutiveInput} input
 */
export function buildExecutiveSummary(input) {
  const revenue = input.settlementAvailable
    ? 'Settled money is available from recorded provider settlement evidence.'
    : 'Revenue is not reported because settlement evidence is not connected. Captured milestones remain cash-in-transit evidence, not revenue.';

  const demand = input.storedEnquiries === 0
    ? 'No stored enquiries were recorded in the selected 30-day window.'
    : input.duplicateEnquiries > 0
      ? input.uniqueContacts + ' unique contacts came from ' + input.storedEnquiries + ' stored enquiries; ' + input.duplicateEnquiries + ' duplicate enquir' + (input.duplicateEnquiries === 1 ? 'y is' : 'ies are') + ' excluded from contact-stage counts.'
      : input.uniqueContacts + ' unique contacts came from ' + input.storedEnquiries + ' stored enquiries, with no duplicate contacts in the window.';

  const movement = input.qualified + ' qualified contact' + (input.qualified === 1 ? '' : 's') + ', ' +
    input.acceptedSows + ' accepted SOW' + (input.acceptedSows === 1 ? '' : 's') + ' with stored references, and ' +
    input.capturedMilestones + ' provider-verified captured milestone' + (input.capturedMilestones === 1 ? '' : 's') +
    '. None is presented as settled revenue.';

  const attention = input.stale > 0 || input.reviewRequired > 0 || input.refundCases > 0
    ? input.stale + ' stale lead stage' + (input.stale === 1 ? '' : 's') + ', ' +
      input.reviewRequired + ' payment review case' + (input.reviewRequired === 1 ? '' : 's') + ', and ' +
      input.refundCases + ' verified refund case' + (input.refundCases === 1 ? '' : 's') + ' need attention.'
    : 'No stale stages, payment-review cases or verified refunds are currently recorded.';

  return { revenue, demand, movement, attention };
}
