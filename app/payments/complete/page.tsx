/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';
import { ensureLeadsSchema } from '@/db';

export const metadata: Metadata = {
  title: 'Payment confirmation | Sohan Vyaparee',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type ConfirmationRecord = { reference_id: string; status: string; description: string; amount: number; amount_paid: number; refunded_amount: number; currency: string };

function formatMoney(amount: number, currency: string) {
  try { return new Intl.NumberFormat('en', { style: 'currency', currency }).format(amount / 100); }
  catch { return `${currency} ${(amount / 100).toFixed(2)}`; }
}

export default async function PaymentCompletePage({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const { reference = '' } = await searchParams;
  let record: ConfirmationRecord | null = null;
  if (/^SV-[A-Z0-9]{20}$/.test(reference)) {
    try {
      const db = await ensureLeadsSchema();
      record = await db.prepare(`SELECT reference_id, status, description, amount, amount_paid, refunded_amount, currency
        FROM payment_links WHERE reference_id = ?`).bind(reference).first<ConfirmationRecord>();
    } catch {
      record = null;
    }
  }
  const paid = record?.status === 'paid';
  return (
    <main className="min-h-screen bg-[#f2f0e9] px-6 py-24 text-[#17201c]">
      <section className="mx-auto max-w-2xl border border-black/15 bg-white p-10 sm:p-14">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">Secure milestone payment · {record?.reference_id || 'Reference pending'}</p>
        <h1 className="mt-6 font-serif text-6xl leading-[.9] sm:text-7xl">{paid ? 'Payment confirmed by the provider.' : 'Thank you. Confirmation is being checked.'}</h1>
        <p className="mt-7 max-w-xl text-sm leading-7 text-black/65">{paid && record ? `${formatMoney(record.amount_paid || record.amount, record.currency)} is recorded against “${record.description}”.` : 'A browser redirect is not treated as proof of payment. The studio records the milestone only after the approved payment provider sends a signed server confirmation.'}</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-black/65">{record?.refunded_amount ? `A refund record of ${formatMoney(record.refunded_amount, record.currency)} is attached to this payment.` : 'You will receive the next project step through the agreed client channel after the payment and reference are matched.'}</p>
        <div className="mt-8 flex flex-wrap gap-3"><a className="inline-flex rounded-full bg-[#17201c] px-6 py-4 text-xs font-bold uppercase tracking-[.1em] text-white" href={record ? `/pay/${record.reference_id}` : '/trust'}>{record ? 'Review payment record' : 'Open trust centre'} →</a><a className="inline-flex rounded-full border border-black/20 px-6 py-4 text-xs font-bold uppercase tracking-[.1em]" href="/">Return to studio</a></div>
      </section>
    </main>
  );
}
