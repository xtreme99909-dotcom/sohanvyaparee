/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy note — Sohan Vyaparee Studio', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f2f0e9] px-6 py-20 text-[#17201c]">
      <article className="mx-auto max-w-3xl">
        <a className="text-xs font-bold uppercase tracking-[.13em]" href="/">← Back to the studio</a>
        <p className="mt-20 text-xs font-bold uppercase tracking-[.18em] text-black/65">Plain-language privacy note</p>
        <h1 className="mt-7 font-serif text-7xl leading-[.88] sm:text-9xl">Your enquiry stays a project enquiry.</h1>
        <div className="mt-16 space-y-8 border-t border-black/15 pt-10 text-base leading-8 text-black/70">
          <p>The project form collects the name, work email, company, budget, timing and project information you choose to provide. Campaign-source tags may also be saved so I can understand which channel introduced you.</p>
          <p>The public studio pages also record a small set of anonymous first-party signals: a page view, an enquiry-button click and whether the project brief was started. These records contain the page, campaign tags, referring website hostname and a random session identifier. They do not store an IP address, advertising identifier or browser fingerprint, and the anonymous records are removed after 180 days.</p>
          <p>This information is used only to evaluate and reply to your website enquiry, prepare a relevant proposal and maintain a record of the conversation. It is not sold, added to a mailing list or used for unrelated marketing.</p>
          <p>The information is stored in the private database connected to this studio website. Access to the lead dashboard is restricted to the studio owner. If you want an enquiry corrected or removed, request it in the same email conversation used for the project.</p>
          <p>Submitting a brief does not create a contract. Scope, price, milestones and terms are confirmed separately in writing before work begins.</p>
        </div>
      </article>
    </main>
  );
}
