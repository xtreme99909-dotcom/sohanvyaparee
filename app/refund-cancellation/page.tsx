import type { Metadata } from 'next';
import { PolicyShell } from '@/app/legal/policy-shell';

export const metadata: Metadata = { title: 'Refund and cancellation policy | Sohan Vyaparee Studio', alternates: { canonical: '/refund-cancellation' } };

const rules = [
  { title: 'Duplicate or incorrect payment', copy: 'A verified duplicate, excess or wrong-currency payment is corrected or refunded after the provider record is matched. Any bank conversion difference outside the studio’s control is explained with the transaction record.' },
  { title: 'Studio cannot begin or cancels', copy: 'If the studio cannot begin within the agreed start window or cancels without client breach, the unearned amount is refunded. Work already accepted by the client is handled according to the SOW.' },
  { title: 'Client cancels before kickoff', copy: 'If no work has begun, the paid project amount is refundable except for a specifically authorised, documented and legally permissible non-recoverable cost. The studio does not invent an administration penalty after payment.' },
  { title: 'Client cancels after work begins', copy: 'The settlement is based on work actually performed, accepted milestones and committed third-party costs authorised in the SOW. The unearned balance is refundable; an accepted milestone is normally not refundable unless the service is defective, deficient or not as agreed.' },
  { title: 'Work is not as agreed', copy: 'The client should identify the affected deliverable and SOW requirement. The studio receives the correction opportunity stated in the SOW. If a material in-scope deficiency is not corrected within that window, the affected unaccepted milestone may receive a proportionate or full refund as required by the agreement and applicable law.' },
  { title: 'Client delays or missing inputs', copy: 'The timeline pauses while required content, access or approvals are missing. Delay alone does not automatically forfeit all money. If the project cannot resume, the parties close it against accepted work, work actually performed and documented commitments.' },
];

export default function RefundCancellationPage() {
  return (
    <PolicyShell eyebrow="Refund & cancellation policy" title="Fair to the client. Fair to work already done." intro="Custom creative and development work cannot be returned like a physical product, but that does not justify a blanket no-refund rule. The settlement follows evidence: the signed scope, work performed, approvals, defects and unearned balance.">
      <section className="grid gap-3 lg:grid-cols-2">
        {rules.map((rule, index) => <article key={rule.title} className="border border-black/15 bg-white p-7"><span className="font-serif text-xl italic text-black/35">{String(index + 1).padStart(2, '0')}</span><h2 className="mt-8 font-serif text-4xl leading-none">{rule.title}</h2><p className="mt-5 text-sm leading-7 text-black/60">{rule.copy}</p></article>)}
      </section>

      <section className="mt-20 grid gap-10 border-y border-black/15 py-12 lg:grid-cols-[.6fr_1fr]">
        <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">How to request a refund</p><h2 className="mt-6 font-serif text-5xl leading-[.92]">Use the project record.</h2></div>
        <ol className="grid gap-5 text-sm leading-7 text-black/65">
          <li><strong className="text-[#17201c]">1 · Send the reference.</strong> Reply in the active project email or workspace with the studio payment reference, affected milestone and requested resolution.</li>
          <li><strong className="text-[#17201c]">2 · Attach the evidence.</strong> Identify the SOW item, payment, duplicate charge, delivery issue or cancellation date. Never send card details, PINs, bank passwords or OTPs.</li>
          <li><strong className="text-[#17201c]">3 · Receive a written decision.</strong> The studio aims to acknowledge the request within two working days and provide a decision or evidence request within five working days.</li>
          <li><strong className="text-[#17201c]">4 · Track the provider refund.</strong> Once approved and initiated, the provider refund reference is shared. Bank credit commonly takes several working days and can vary by bank, country, currency and provider processing.</li>
        </ol>
      </section>

      <section className="mt-20 border border-black/15 bg-[#17201c] p-8 text-white sm:p-12">
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/45">Important boundaries</p>
        <div className="mt-8 grid gap-6 text-sm leading-7 text-white/65 md:grid-cols-2"><p>A refund is returned through the original provider route wherever possible. Once a provider refund is initiated, it may not be cancellable or reversible. Provider and bank timelines are not represented as instant credit.</p><p>Upwork or another mutually agreed escrow/platform engagement follows that platform’s payment, dispute and refund rules. Nothing here removes a mandatory remedy available under applicable law.</p></div>
      </section>
    </PolicyShell>
  );
}
