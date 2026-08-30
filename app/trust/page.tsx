import type { Metadata } from 'next';
import Image from 'next/image';
import { PolicyShell } from '@/app/legal/policy-shell';

export const metadata: Metadata = {
  title: 'Payment trust centre | SP Studios',
  description: 'How scope, milestone payments, secure checkout, delivery evidence, refunds and project handover are documented before a website client pays.',
  alternates: { canonical: '/trust' },
};

const beforePayment = [
  { number: '01', title: 'A named scope', copy: 'You receive a written statement of work with deliverables, exclusions, dependencies, timing, revision gates and one billing currency.' },
  { number: '02', title: 'An agreement reference', copy: 'The payment request names the accepted scope version and agreement reference. If they do not match your copy, do not pay.' },
  { number: '03', title: 'A milestone—not a vague deposit', copy: 'Every amount is tied to a specific reservation, approval point, build stage, launch or handover outcome.' },
  { number: '04', title: 'A review page on this domain', copy: 'Your private link shows the amount, currency, milestone, delivery window, policy version and payment status before checkout opens.' },
];

const evidence = [
  ['Commercial record', 'Signed statement of work, scope version and agreed currency'],
  ['Payment record', 'Unique studio reference, provider payment reference and signed server confirmation'],
  ['Decision record', 'Written feedback, approval gates and approved change requests'],
  ['Delivery record', 'Milestone review links, handover checklist and final access transfer'],
  ['Support record', 'A written channel for corrections, payment questions and refund requests'],
];

export default function TrustPage() {
  return (
    <PolicyShell
      eyebrow="Payment trust centre · No public arbitrary checkout"
      title="See the agreement before money moves."
      intro="A polished checkout is not protection by itself. Confidence comes from a traceable scope, a controlled milestone, secure provider processing, fair cancellation rules and evidence of what was accepted and delivered."
    >
      <section className="grid gap-3 md:grid-cols-3">
        <article className="border border-black/15 bg-white p-7"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Scope protected</span><h2 className="mt-8 font-serif text-4xl leading-none">No surprise invoice.</h2><p className="mt-5 text-sm leading-7 text-black/60">The payment request is issued only after the proposal and statement of work are accepted.</p></article>
        <article className="border border-black/15 bg-[#17201c] p-7 text-white"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-white/45">Payment protected</span><h2 className="mt-8 font-serif text-4xl leading-none">No card data stored here.</h2><p className="mt-5 text-sm leading-7 text-white/60">Card, bank, PIN and OTP details stay inside the approved provider-hosted checkout.</p></article>
        <article className="border border-black/15 bg-[#d8ff63] p-7"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Delivery protected</span><h2 className="mt-8 font-serif text-4xl leading-none">Every gate leaves evidence.</h2><p className="mt-5 text-sm leading-7 text-black/60">Reviews, approvals, change requests, launch checks and handover are kept in the project decision trail.</p></article>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-[.62fr_1fr]">
        <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/45">Before you pay</p><h2 className="mt-6 font-serif text-6xl leading-[.9]">Four checks built into the request.</h2><p className="mt-7 max-w-lg text-sm leading-7 text-black/60">The studio does not publish a buy-now button for custom work. A real client receives a private reference after scope and commercial terms are agreed.</p></div>
        <div className="border-t border-black/20">
          {beforePayment.map((item) => (
            <article key={item.number} className="grid grid-cols-[44px_1fr] gap-5 border-b border-black/15 py-7">
              <span className="font-serif text-xl italic text-black/45">{item.number}</span><div><h3 className="text-sm font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-black/60">{item.copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 bg-[#17201c] px-6 py-10 text-white sm:px-10 sm:py-14">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1fr]">
          <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/45">Secure payment boundary</p><h2 className="mt-6 font-serif text-6xl leading-[.9]">Provider-hosted checkout. Server-verified result.</h2></div>
          <div className="grid gap-5 text-sm leading-7 text-white/65">
            <p>The private review page starts on this website. When you choose to pay, checkout is handled by Razorpay. This studio does not ask you to send card credentials, bank login details, a PIN or an OTP by email, WhatsApp or a project form.</p>
            <p>A return to the website is never treated as proof of payment. The milestone changes to paid only after the provider sends a cryptographically signed server notification that matches the issued reference.</p>
            <p>Available methods and currencies can vary by the client&apos;s country, provider approval and risk checks. The checkout shows what is actually available before money moves.</p>
            <a className="mt-2 w-fit border-b border-[#d8ff63] pb-1 text-[10px] font-bold uppercase tracking-[.1em] text-[#d8ff63]" href="https://razorpay.com/docs/security/" target="_blank" rel="noreferrer">Read Razorpay&apos;s security information ↗</a>
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-[.62fr_1fr]">
        <div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-black/45">Proof trail</p><h2 className="mt-6 font-serif text-6xl leading-[.9]">What you can keep.</h2></div>
        <div className="overflow-hidden border border-black/15 bg-white">
          {evidence.map(([title, copy]) => <div key={title} className="grid gap-2 border-b border-black/10 p-6 last:border-0 sm:grid-cols-[.42fr_1fr]"><strong className="text-xs">{title}</strong><span className="text-xs leading-6 text-black/55">{copy}</span></div>)}
        </div>
      </section>

      <section className="mt-24 grid gap-3 md:grid-cols-2">
        <article className="border border-black/15 bg-white p-8"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Refund and correction path</p><h2 className="mt-6 font-serif text-4xl leading-none">No blanket “no refunds” trap.</h2><p className="mt-5 text-sm leading-7 text-black/60">Eligibility follows the signed scope, work actually performed, accepted milestones, service deficiencies and mandatory legal rights. The published policy explains timing and escalation.</p><a className="mt-7 inline-block border-b border-black/30 pb-1 text-[10px] font-bold uppercase tracking-[.1em]" href="/refund-cancellation">Read refund rules →</a></article>
        <article className="border border-black/15 bg-white p-8"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Digital fulfilment</p><h2 className="mt-6 font-serif text-4xl leading-none">A handover, not a disappearing act.</h2><p className="mt-5 text-sm leading-7 text-black/60">The agreed delivery includes review links, launch checks and transfer of the final accounts, files or documentation named in the statement of work.</p><a className="mt-7 inline-block border-b border-black/30 pb-1 text-[10px] font-bold uppercase tracking-[.1em]" href="/delivery-fulfilment">Read delivery rules →</a></article>
      </section>

      <section className="mt-24 border border-black/15 bg-white p-8 sm:p-12">
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Important honesty boundary</p>
        <h2 className="mt-6 max-w-3xl font-serif text-5xl leading-[.92] sm:text-6xl">Trust is a process, not a badge collection.</h2>
        <div className="mt-8 grid gap-5 text-sm leading-7 text-black/60 md:grid-cols-2"><p>This site does not claim escrow, legal-firm review, government registration, payment-provider approval, guaranteed revenue or guaranteed search ranking unless that exact fact is documented for the engagement.</p><p>For high-value or regulated work, either side may request identity checks, a lawyer-reviewed agreement, tax documentation or a mutually agreed escrow/platform route before signing.</p></div>
      </section>

      <section className="mt-24 grid overflow-hidden bg-[#17201c] text-white lg:grid-cols-[.62fr_1fr]">
        <figure className="relative min-h-[520px] lg:min-h-[700px]">
          <Image className="object-cover object-[50%_58%]" src="/founder-working-professional.jpg" alt="Sohan Vyaparee working on a laptop in a café, wearing a digitally restyled professional outfit" fill sizes="(max-width: 1024px) 100vw, 42vw" />
          <figcaption className="absolute inset-x-4 bottom-4 bg-[#17201c]/90 p-3 text-[9px] leading-5 text-white/55 backdrop-blur">Personal working photograph · Clothing digitally restyled for this presentation · Identity and setting retained</figcaption>
        </figure>
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/45">The person accountable</p>
          <h2 className="mt-7 font-serif text-6xl leading-[.88]">A real name behind the scope and handover.</h2>
          <p className="mt-8 max-w-xl text-sm leading-7 text-white/65">I&apos;m Sohan Vyaparee. I personally direct the strategy, visual system, build decisions and launch quality. AI helps me move research and implementation faster; it does not replace the named human responsible for your project.</p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">Before payment, the contracting identity on your SOW and invoice must match the identity in the private payment record. If it does not, stop and verify through the existing project conversation.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a className="rounded-full bg-[#d8ff63] px-5 py-3 text-[10px] font-bold uppercase tracking-[.1em] text-[#17201c]" href="/services/complete-website-launch#brief">Start with the project brief →</a><a className="rounded-full border border-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[.1em]" href="https://www.linkedin.com/in/sohan-vyaparee-397a29352/" target="_blank" rel="noreferrer">Verify on LinkedIn ↗</a></div>
        </div>
      </section>
    </PolicyShell>
  );
}
