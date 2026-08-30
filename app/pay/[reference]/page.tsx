/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';
import { ensureLeadsSchema } from '@/db';
import { paymentReferencePattern } from '@/app/payments/reference';
import { CheckoutButton } from './checkout-button';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PaymentReview = {
  reference_id: string;
  created_at: string;
  status: string;
  description: string;
  amount: number;
  amount_paid: number;
  refunded_amount: number;
  refund_status: string;
  currency: string;
  expires_at: string | null;
  customer_name: string | null;
  company: string;
  agreement_reference: string;
  scope_version: string;
  delivery_window: string;
  policy_version: string;
  is_expired: number;
};

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Private payment review | SP Studios', robots: { index: false, follow: false, noarchive: true } };
}

function formatMoney(amount: number, currency: string) {
  try { return new Intl.NumberFormat('en', { style: 'currency', currency }).format(amount / 100); }
  catch { return `${currency} ${(amount / 100).toFixed(2)}`; }
}

function formatDate(value: string | null) {
  if (!value) return 'Named in the agreement';
  return new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(value));
}

export default async function PaymentReviewPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  let payment: PaymentReview | null = null;
  if (paymentReferencePattern.test(reference)) {
    try {
      const db = await ensureLeadsSchema();
      payment = await db.prepare(`SELECT payment_links.reference_id, payment_links.created_at,
        payment_links.status, payment_links.description, payment_links.amount, payment_links.amount_paid,
        payment_links.refunded_amount, payment_links.refund_status, payment_links.currency,
        payment_links.expires_at, payment_links.customer_name, leads.company,
        payment_links.agreement_reference, payment_links.scope_version,
        payment_links.delivery_window, payment_links.policy_version,
        CASE WHEN payment_links.expires_at IS NOT NULL AND unixepoch(payment_links.expires_at) <= unixepoch('now') THEN 1 ELSE 0 END AS is_expired
        FROM payment_links JOIN leads ON leads.id = payment_links.lead_id
        WHERE payment_links.reference_id = ?`).bind(reference).first<PaymentReview>();
    } catch {
      payment = null;
    }
  }

  if (!payment) {
    return (
      <main className="min-h-screen bg-[#f2f0e9] px-5 py-20 text-[#17201c] sm:px-8">
        <section className="mx-auto max-w-2xl border border-black/15 bg-white p-9 sm:p-14"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/45">Private payment request</p><h1 className="mt-7 font-serif text-6xl leading-[.9]">This reference is not available.</h1><p className="mt-7 text-sm leading-7 text-black/60">Check the complete link from the project email. Do not pay through a replacement bank or card link sent from an unfamiliar account.</p><a className="mt-8 inline-flex rounded-full bg-[#17201c] px-6 py-4 text-[10px] font-bold uppercase tracking-[.1em] text-white" href="/trust">Open the trust centre →</a></section>
      </main>
    );
  }

  const expired = payment.is_expired === 1;
  const payable = payment.status === 'created' && !expired;
  const statusLabel = expired && payment.status === 'created' ? 'expired' : payment.status.replaceAll('_', ' ');

  return (
    <main className="min-h-screen bg-[#f2f0e9] text-[#17201c]">
      <header className="border-b border-black/10 px-5 py-5 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4"><a className="flex items-center gap-3" href="/"><span className="grid size-10 place-items-center rounded-full bg-[#17201c] font-serif text-sm italic text-white">SP</span><strong className="text-sm">SP Studios</strong></a><a className="text-[10px] font-bold uppercase tracking-[.1em] text-black/50" href="/trust">Payment trust centre ↗</a></div></header>

      <section className="mx-auto grid max-w-[1240px] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_.72fr] lg:px-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/45">Private milestone review · Prepared for {payment.company || payment.customer_name}</p>
          <h1 className="mt-7 max-w-4xl font-serif text-6xl leading-[.86] tracking-[-.055em] sm:text-8xl">Review first. Pay only when it matches.</h1>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-black/60">Compare this record with your signed statement of work and invoice. If the client, amount, currency, milestone, scope version or agreement reference is different, stop and reply through the existing project conversation.</p>

          <div className="mt-12 overflow-hidden border border-black/15 bg-white">
            <div className="grid gap-2 border-b border-black/10 bg-[#17201c] p-6 text-white sm:grid-cols-[.42fr_1fr]"><span className="text-[10px] font-bold uppercase tracking-[.12em] text-white/45">Amount due</span><strong className="font-serif text-5xl font-normal">{formatMoney(payment.amount, payment.currency)}</strong></div>
            {[
              ['Milestone', payment.description],
              ['Scope version', payment.scope_version],
              ['Agreement reference', payment.agreement_reference],
              ['Delivery window', payment.delivery_window],
              ['Checkout valid until', formatDate(payment.expires_at)],
              ['Studio reference', payment.reference_id],
              ['Policy version', payment.policy_version],
            ].map(([label, value]) => <div key={label} className="grid gap-2 border-b border-black/10 p-5 last:border-0 sm:grid-cols-[.42fr_1fr]"><span className="text-[10px] font-bold uppercase tracking-[.1em] text-black/40">{label}</span><strong className="break-words text-xs font-semibold leading-6">{value}</strong></div>)}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="border border-black/15 p-5"><span className="text-[9px] font-bold uppercase tracking-[.12em] text-black/40">No card storage</span><p className="mt-3 text-xs leading-5 text-black/55">Credentials stay with the payment provider.</p></div>
            <div className="border border-black/15 p-5"><span className="text-[9px] font-bold uppercase tracking-[.12em] text-black/40">Signed confirmation</span><p className="mt-3 text-xs leading-5 text-black/55">A browser return never proves payment.</p></div>
            <div className="border border-black/15 p-5"><span className="text-[9px] font-bold uppercase tracking-[.12em] text-black/40">Fair refunds</span><p className="mt-3 text-xs leading-5 text-black/55">Rules are published before checkout.</p></div>
          </div>
        </div>

        <aside className="h-fit bg-[#17201c] p-6 text-white sm:p-8 lg:sticky lg:top-8">
          <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-white/45">Current status</span><strong className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[.1em] ${payment.status === 'paid' ? 'bg-[#d8ff63] text-[#17201c]' : 'border border-white/20'}`}>{statusLabel}</strong></div>
          <h2 className="mt-8 font-serif text-5xl leading-[.9]">{payable ? 'Ready for secure checkout.' : payment.status === 'paid' ? 'This milestone is recorded as paid.' : 'This request cannot accept payment.'}</h2>
          <p className="mt-6 text-sm leading-7 text-white/60">{payable ? 'Proceed only if the private record matches the signed agreement in your possession.' : payment.status === 'paid' ? `Provider-confirmed amount: ${formatMoney(payment.amount_paid || payment.amount, payment.currency)}.` : 'Ask through the existing project conversation for a fresh or corrected payment request.'}</p>
          {payment.refunded_amount > 0 ? <p className="mt-4 border border-white/15 p-4 text-xs leading-6 text-white/65">Refund recorded: {formatMoney(payment.refunded_amount, payment.currency)} · {payment.refund_status}</p> : null}
          <div className="mt-8"><CheckoutButton reference={payment.reference_id} disabled={!payable} /></div>
          <p className="mt-5 text-center text-[10px] leading-5 text-white/40">International card and currency availability depends on the payment provider&apos;s approval and the client&apos;s country. The checkout shows only currently enabled methods.</p>
        </aside>
      </section>
    </main>
  );
}
