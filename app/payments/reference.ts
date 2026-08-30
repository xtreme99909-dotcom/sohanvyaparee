const paymentReferencePrefix = 'SP';

export const paymentReferencePattern = /^SP-[A-Z0-9]{20}$/;

export function createPaymentReference(id: string) {
  return `${paymentReferencePrefix}-${id.replaceAll('-', '').slice(0, 20).toUpperCase()}`;
}
