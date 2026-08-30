import type { Metadata } from 'next';
import { PolicyShell } from '@/app/legal/policy-shell';

export const metadata: Metadata = { title: 'Privacy policy | Sohan Vyaparee Studio', alternates: { canonical: '/privacy' } };

const sections = [
  ['Project information', 'The project form collects the name, work email, company, budget, timing and project information you choose to provide. Campaign-source tags may be saved so the studio can understand which channel introduced you. This information is used to assess and reply to the enquiry, prepare a relevant proposal and maintain the project record.'],
  ['First-party website signals', 'Public pages record a small set of first-party signals: a page view, enquiry-button click and whether the project brief was started. These records contain the page, campaign tags, referring website hostname and a random session identifier. They do not store an advertising identifier, browser fingerprint or raw IP address, and anonymous marketing records are removed after 180 days.'],
  ['Agreement and payment records', 'For a qualified project, the studio may store the SOW reference, scope version, delivery window, milestone amount, currency, payment-provider references, payment status, refund status and the timestamp at which the client acknowledged the linked policies. The studio does not store card numbers, CVV, bank passwords, PINs or OTPs. Payment credentials are processed by the approved payment provider under its own privacy and security terms.'],
  ['How information is shared', 'Information is not sold or added to an unrelated mailing list. It is shared only with services needed to operate the website, communicate, contract, invoice, process payment, deliver the project, prevent fraud or meet legal and accounting obligations. Access to the lead and payment dashboard is restricted to the studio owner.'],
  ['Retention and security', 'Enquiry, contract, invoice, payment and delivery records are kept only as long as reasonably needed for the project, support, accounting, dispute prevention and applicable legal duties, then deleted or anonymised where appropriate. No internet service can promise absolute security, so sensitive access is requested through the least exposed practical route.'],
  ['Your choices', 'You may ask for an enquiry to be corrected or removed by replying in the same project conversation or using the project brief to identify the earlier submission. Some commercial records may need to be retained where a contract, payment, dispute or law requires it.'],
  ['No contract from a brief', 'Submitting a brief does not create a contract and acknowledging website policies does not replace the signed SOW. Scope, price, tax treatment, milestones, delivery and legal terms are confirmed separately in writing before work begins.'],
];

export default function PrivacyPage() {
  return (
    <PolicyShell eyebrow="Plain-language privacy policy" title="Your enquiry stays a project enquiry." intro="The studio collects the minimum practical information needed to evaluate, contract, deliver and support a website project. Payment credentials never belong in the project form or chat.">
      <div className="mx-auto max-w-4xl divide-y divide-black/15 border-y border-black/15">
        {sections.map(([title, copy]) => <section key={title} className="grid gap-5 py-9 sm:grid-cols-[.42fr_1fr]"><h2 className="text-sm font-semibold">{title}</h2><p className="text-sm leading-7 text-black/65">{copy}</p></section>)}
      </div>
    </PolicyShell>
  );
}
