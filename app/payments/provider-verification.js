function providerCurrency(value) {
  return typeof value === 'string' ? value.trim().slice(0, 3).toUpperCase() : '';
}

export function providerCurrencyMismatches(expectedCurrency, paymentCurrencyValue, paymentLinkCurrencyValue) {
  const mismatches = [];
  const paymentCurrency = providerCurrency(paymentCurrencyValue);
  const paymentLinkCurrency = providerCurrency(paymentLinkCurrencyValue);

  if (!paymentCurrency && !paymentLinkCurrency) mismatches.push('currency missing');
  if (paymentCurrency && paymentCurrency !== expectedCurrency) mismatches.push('payment currency');
  if (paymentLinkCurrency && paymentLinkCurrency !== expectedCurrency) mismatches.push('payment-link currency');
  return mismatches;
}
