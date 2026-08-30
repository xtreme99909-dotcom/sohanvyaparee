import type { Metadata } from 'next';
import { PolicyShell } from '@/app/legal/policy-shell';

export const metadata: Metadata = { title: 'Digital delivery and fulfilment policy | SP Studios', alternates: { canonical: '/delivery-fulfilment' } };

const phases = [
  ['01', 'Direction', 'Written direction, sitemap or scope decisions named in the SOW.'],
  ['02', 'Experience', 'Reviewable responsive design direction and agreed feedback record.'],
  ['03', 'Build', 'A working staged implementation of the approved in-scope journey.'],
  ['04', 'Launch', 'QA record, production deployment and the handover items named in the SOW.'],
];

export default function DeliveryFulfilmentPage() {
  return (
    <PolicyShell eyebrow="Digital delivery & fulfilment policy · No physical shipping" title="Delivery means access, evidence and handover." intro="Website services are delivered digitally. No physical product is shipped. The signed statement of work defines the exact review links, files, accounts, documentation and production outcome for each milestone.">
      <section className="grid gap-0 border border-black/15 md:grid-cols-4">
        {phases.map(([number, title, copy]) => <article key={number} className="min-h-72 border-b border-black/15 bg-white p-6 last:border-0 md:border-b-0 md:border-r md:last:border-r-0"><span className="font-serif text-2xl italic text-black/35">{number}</span><h2 className="mt-16 font-serif text-4xl leading-none">{title}</h2><p className="mt-5 text-xs leading-6 text-black/55">{copy}</p></article>)}
      </section>

      <section className="mt-20 grid gap-12 lg:grid-cols-[.62fr_1fr]">
        <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Delivery rules</p><h2 className="mt-6 font-serif text-6xl leading-[.9]">A visible route to done.</h2></div>
        <div className="divide-y divide-black/15 border-y border-black/15 text-sm leading-7 text-black/65">
          <p className="py-7"><strong className="block text-[#17201c]">Delivery window</strong>The private payment page shows the agreed delivery window or target. The SOW names assumptions such as prepared content, access, feedback windows and third-party approvals.</p>
          <p className="py-7"><strong className="block text-[#17201c]">Review and acceptance</strong>Each review milestone is supplied through the agreed project channel. The client can compare it against the named SOW outcome and submit consolidated in-scope feedback before acceptance.</p>
          <p className="py-7"><strong className="block text-[#17201c]">Client-caused pause</strong>Missing content, access, decisions, payment or approvals pause the delivery clock. The studio records the blocker and provides a revised date once the dependency is restored.</p>
          <p className="py-7"><strong className="block text-[#17201c]">Studio delay</strong>If a material delay is expected, the studio explains it in writing and proposes a revised plan. Cancellation and unearned-fee remedies follow the SOW and Refund & Cancellation Policy.</p>
          <p className="py-7"><strong className="block text-[#17201c]">Third-party services</strong>Domain registrars, hosting, app stores, payment providers, CMS platforms and APIs can have separate approval and uptime conditions. The studio remains responsible for the integration work it accepted, not for falsely guaranteeing a third party.</p>
        </div>
      </section>

      <section className="mt-20 bg-[#d8ff63] p-8 sm:p-12">
        <p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Typical final handover record</p>
        <div className="mt-8 grid gap-x-10 gap-y-4 text-sm md:grid-cols-2"><span>✓ Production URL and launch status</span><span>✓ Named repository, files or CMS access</span><span>✓ Domain and hosting ownership status</span><span>✓ Agreed admin and integration access transfer</span><span>✓ Known limitations and third-party renewals</span><span>✓ Correction/support window stated in the SOW</span></div>
      </section>
    </PolicyShell>
  );
}
