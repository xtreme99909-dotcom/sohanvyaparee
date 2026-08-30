/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment confirmation | Sohan Vyaparee',
  robots: { index: false, follow: false },
};

export default function PaymentCompletePage() {
  return (
    <main className="min-h-screen bg-[#f2f0e9] px-6 py-24 text-[#17201c]">
      <section className="mx-auto max-w-2xl border border-black/15 bg-white p-10 sm:p-14">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">Secure milestone payment</p>
        <h1 className="mt-6 font-serif text-6xl leading-[.9] sm:text-7xl">Thank you. Confirmation is being checked.</h1>
        <p className="mt-7 max-w-xl text-sm leading-7 text-black/65">A browser redirect is not treated as proof of payment. The studio records the milestone only after the approved payment provider sends a signed server confirmation.</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-black/65">You will receive the next project step through the agreed client channel after the payment and reference are matched.</p>
        <a className="mt-8 inline-flex rounded-full bg-[#17201c] px-6 py-4 text-xs font-bold uppercase tracking-[.1em] text-white" href="/">Return to the studio →</a>
      </section>
    </main>
  );
}
