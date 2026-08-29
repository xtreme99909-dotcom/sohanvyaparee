import type { Metadata } from 'next';
import { PartnerBrief } from './partner-brief';
import { PartnerFit } from './partner-fit';

/* Vinext currently hydrates this route reliably with native internal anchors. */
/* eslint-disable @next/next/no-html-link-for-pages */

const siteUrl = 'https://sohan-website-studio.vercel.app';

export const metadata: Metadata = {
  title: 'Website Delivery Partner for Creative and Growth Specialists — Sohan Vyaparee',
  description: 'A transparent collaboration path for brand, copy, photography, growth and automation specialists whose clients need complete website strategy, original UX/UI, development, integrations and launch.',
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'The work around the website—connected.',
    description: 'A transparent strategy-to-launch website collaboration path for complementary specialists.',
    url: '/partners',
  },
  twitter: {
    title: 'The work around the website—connected.',
    description: 'A transparent strategy-to-launch website collaboration path for complementary specialists.',
  },
};

const collaborationModels = [
  {
    number: '01',
    title: 'Direct introduction',
    copy: 'You identify a credible complete-site need. I qualify, scope, contract and deliver the website directly, with the source of the relationship kept visible.',
  },
  {
    number: '02',
    title: 'Transparent joint scope',
    copy: 'The client understands who owns each discipline. We align the handoff, milestones and approvals before work begins instead of inventing them mid-project.',
  },
  {
    number: '03',
    title: 'Named delivery capacity',
    copy: 'A specialist brings a real opportunity that needs accountable website ownership. I join only when the client, role and quality boundary can stay clear.',
  },
] as const;

const introductionSignals = [
  ['Need', 'A new site, substantive redesign, commerce experience or connected customer journey—not a tiny ticket or coding-only task.'],
  ['Authority', 'A founder, owner or accountable lead is involved, or there is a credible route to the person who can approve the work.'],
  ['Commercial fit', 'The buyer understands that an original, complete website is a serious business engagement—not a template purchase.'],
  ['Timing', 'There is a real launch, repositioning, campaign, system change or business milestone behind the website need.'],
] as const;

export default function PartnersPage() {
  const partnerServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Transparent website delivery collaboration',
    serviceType: 'Website strategy, original UX/UI, responsive development, integrations and launch delivery',
    provider: { '@id': `${siteUrl}/#studio` },
    url: `${siteUrl}/partners`,
    areaServed: 'Worldwide',
    audience: {
      '@type': 'Audience',
      audienceType: 'Brand, copy, photography, growth, CRM and automation specialists',
    },
  };

  return (
    <main className="partner-page">
      <header className="site-header">
        <a href="/" className="wordmark" aria-label="Sohan Vyaparee — home"><span>SV</span><strong>Sohan Vyaparee</strong></a>
        <nav aria-label="Primary navigation">
          <a href="/services/complete-website-launch">Services</a>
          <a href="/work">Selected work</a>
          <a href="/">Home</a>
          <a href="#partner-brief" className="header-cta" data-marketing-event="enquiry_click">Explore a fit ↗</a>
        </nav>
      </header>

      <section id="top" className="partner-hero section-shell">
        <div className="partner-hero-copy">
          <p className="eyebrow"><span /> Collaboration · India / Worldwide</p>
          <h1>The work around the website—<span>connected.</span></h1>
          <p>For brand, copy, photography, growth and automation specialists whose clients need a complete website partner—from strategy and original design through build, integrations and launch.</p>
          <div className="hero-actions">
            <a href="#partner-fit" className="primary-action">Find the clean boundary <span>↗</span></a>
            <a href="/work" className="text-action">Review the evidence <span>↗</span></a>
          </div>
        </div>
        <aside className="partner-principle-board" aria-label="Collaboration principles">
          <div><span>01</span><p>Client context before introductions</p></div>
          <div><span>02</span><p>Ownership agreed before scope</p></div>
          <div><span>03</span><p>No anonymous white-label assumption</p></div>
          <div><span>04</span><p>No fee or exclusivity promise in advance</p></div>
          <strong>Useful when the client needs the website to work as one business system—not as disconnected production.</strong>
        </aside>
      </section>

      <section className="partner-positioning">
        <div className="section-shell partner-positioning-grid">
          <p className="section-index light">01 · The partnership premise</p>
          <h2>You keep the strength of your specialty. <em>The website gets accountable ownership.</em></h2>
          <div>
            <p>The collaboration is not a promise to swap every lead or hide who is doing the work. It starts with one qualified opportunity and a clear division of responsibility.</p>
            <p>When the fit is real, the client gets one coherent website journey and each specialist protects the quality of the discipline they actually own.</p>
          </div>
        </div>
      </section>

      <section id="partner-fit" className="partner-fit-section section-shell">
        <div className="section-heading-row">
          <div><p className="section-index">02 · Choose your lane</p><h2>See where the handoff becomes useful.</h2></div>
          <p>Select the specialty closest to yours. The boundary changes; the principle does not.</p>
        </div>
        <PartnerFit />
      </section>

      <section className="partner-models section-shell">
        <div className="section-heading-row">
          <div><p className="section-index">03 · Three honest models</p><h2>Start with one opportunity, not a vague alliance.</h2></div>
          <p>No standing referral promise is required. The relationship earns its shape through a real client situation.</p>
        </div>
        <div className="partner-model-grid">
          {collaborationModels.map((model) => (
            <article key={model.number}><span>{model.number}</span><h3>{model.title}</h3><p>{model.copy}</p></article>
          ))}
        </div>
      </section>

      <section className="partner-qualification">
        <div className="section-shell partner-qualification-grid">
          <div><p className="section-index light">04 · Before an introduction</p><h2>Four signals protect everyone’s time.</h2></div>
          <div className="partner-signal-list">
            {introductionSignals.map(([label, copy], index) => (
              <div key={label}><span>0{index + 1}</span><strong>{label}</strong><p>{copy}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="partner-proof section-shell">
        <div><p className="section-index">05 · Evidence before promises</p><h2>Review what is live, what is self-initiated and what is conceptual.</h2></div>
        <div className="partner-proof-links">
          <a href="/work/bongfoods"><span>Live founder-built product</span><strong>BongFoods commerce journey</strong><i>View case study ↗</i></a>
          <a href="/work/studio-system"><span>Live self-initiated system</span><strong>Studio acquisition journey</strong><i>View case study ↗</i></a>
          <a href="/work/private-market-concept"><span>Speculative product concept</span><strong>Private-market platform</strong><i>View concept study ↗</i></a>
        </div>
      </section>

      <section id="partner-brief" className="partner-enquiry">
        <div className="section-shell partner-enquiry-grid">
          <div>
            <p className="section-index light">06 · Explore a real fit</p>
            <h2>Bring the context—not a mass partnership pitch.</h2>
            <p>Use this private note for a named opportunity or a specific client pattern. It creates no fee, exclusivity or delivery commitment.</p>
            <div className="contact-signal"><i /><span><strong>Private collaboration inbox</strong>Reviewed personally by Sohan</span></div>
          </div>
          <PartnerBrief />
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SV</span><strong>Sohan Vyaparee</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Transparent collaboration · Qualified opportunities only</span><span>© 2026 Sohan Vyaparee</span></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerServiceSchema) }} />
    </main>
  );
}
