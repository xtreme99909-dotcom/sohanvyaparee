import type { Metadata } from 'next';
import { PolicyShell } from '@/app/legal/policy-shell';

export const metadata: Metadata = { title: 'Service terms | SP Studios', alternates: { canonical: '/terms' } };

const sections = [
  ['1. How an engagement is formed', 'SP Studios is the public studio name directed by Sohan Vyaparee. A website enquiry, call, estimate or public price is not a contract. An engagement begins only when the client and studio accept a written proposal or statement of work (“SOW”) that identifies the exact contracting parties, scope, price, billing currency, milestone schedule, dependencies, delivery assumptions and governing legal terms. Electronic acceptance and signed electronic records may be used.'],
  ['2. Scope hierarchy', 'The signed SOW controls the project. These public terms, the refund policy, delivery policy and privacy policy support it. If they conflict, the project-specific SOW controls except where applicable law does not allow a right or obligation to be excluded. A client should not pay if the payment request, invoice and SOW do not match.'],
  ['3. Client responsibilities', 'The client supplies accurate business facts, lawful content, timely access, one authorised decision-maker and feedback within the agreed windows. The client confirms it has rights to materials it provides. Delays in required inputs or approvals pause the schedule and may require a revised delivery date.'],
  ['4. Fees, currency and taxes', 'Fees are stated in one agreed currency and tied to named milestones. Bank, conversion or intermediary charges are allocated in the SOW. Applicable tax treatment and invoice details are stated on the commercial record; public prices do not by themselves determine tax. The studio never requests card credentials, bank passwords, a PIN or an OTP directly.'],
  ['5. Reviews, revisions and change requests', 'Each phase has an agreed review and acceptance method. Included revision rounds are stated in the SOW. New pages, features, integrations, content or changed business requirements are documented as a change request with their effect on fee and timing before that additional work begins.'],
  ['6. Delivery and acceptance', 'Digital delivery follows the published Delivery & Fulfilment Policy and the project-specific gates in the SOW. The client receives a reasonable opportunity to inspect each review milestone. A milestone is accepted only through the method stated in the SOW; silence is not treated as approval unless the SOW lawfully and clearly says otherwise.'],
  ['7. Intellectual property and licences', 'Unless the SOW states otherwise, ownership of final client-specific deliverables transfers after full payment of all accepted work. Pre-existing studio methods, reusable systems, open-source software, fonts, stock assets and third-party services remain subject to their own ownership and licences. The SOW identifies material third-party costs or restrictions known before launch.'],
  ['8. Confidentiality and publicity', 'Each side protects non-public business, access and customer information shared for the project. The studio does not publish confidential work or describe a speculative concept as commissioned. Any portfolio use, launch credit or public case study follows the permission stated in the SOW.'],
  ['9. Quality promise and limits', 'The studio promises to perform the agreed services with reasonable care and to correct reproducible, in-scope defects reported during the correction window stated in the SOW. No promise is made for revenue, conversions, rankings, uninterrupted third-party uptime or outcomes outside the agreed scope.'],
  ['10. Suspension, termination and refunds', 'Either side may pause or terminate as stated in the SOW. Refunds and cancellation settlements follow the published Refund & Cancellation Policy, the work actually performed, accepted milestones, documented non-recoverable costs and any mandatory legal rights.'],
  ['11. Disputes and legal terms', 'A concern should first be raised through the active project email or project workspace with the relevant reference and requested remedy. The SOW must state the contracting identity, governing law, jurisdiction and any escalation or mediation process appropriate to that engagement. Do not sign or pay if those details are absent.'],
  ['12. Updates', 'The version shown on the private payment review page is the policy version attached to that payment request. Later website updates do not silently replace the terms already attached to an accepted SOW or paid milestone.'],
];

export default function TermsPage() {
  return (
    <PolicyShell eyebrow="Standard service terms" title="A website project should not begin with ambiguity." intro="These terms explain the studio’s standard operating boundaries. The signed statement of work names the exact deliverables, commercial terms and legal details for each engagement.">
      <div className="mx-auto max-w-4xl divide-y divide-black/15 border-y border-black/15">
        {sections.map(([title, copy]) => <section key={title} className="grid gap-5 py-9 sm:grid-cols-[.42fr_1fr]"><h2 className="text-sm font-semibold">{title}</h2><p className="text-sm leading-7 text-black/65">{copy}</p></section>)}
      </div>
      <p className="mx-auto mt-12 max-w-4xl border-l-2 border-[#17201c] pl-5 text-xs leading-6 text-black/55">These public terms explain the operating model; they are not a substitute for project-specific legal or tax advice. Mandatory rights under applicable law continue to apply.</p>
    </PolicyShell>
  );
}
