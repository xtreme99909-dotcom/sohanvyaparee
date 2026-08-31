/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';
import { WorkProofNavigator } from './work-proof-navigator';
import { FounderAvatar } from '../founder-avatar';

export const metadata: Metadata = {
  title: 'Selected Work & Website Case Studies — SP Studios',
  description: 'Inspect live founder-built work, a self-initiated business system and a speculative concept—with clear evidence, responsibilities and truth labels.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Proof you can inspect. Boundaries you can trust.',
    description: 'Selected website and product work by Sohan Vyaparee, clearly separated into live, self-initiated and speculative evidence.',
    type: 'website',
    url: '/work',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Selected website and product work by Sohan Vyaparee' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proof you can inspect. Boundaries you can trust.',
    description: 'Selected website and product work by Sohan Vyaparee, with clear evidence and truth labels.',
    images: ['/og.png'],
  },
};

const capabilities = [
  'Business direction',
  'Information architecture',
  'Art direction',
  'Responsive development',
  'Connected workflows',
  'Launch ownership',
];

const projects = [
  {
    number: '01',
    name: 'BongFoods',
    category: 'Restaurant commerce',
    label: 'Live founder-built work',
    tone: 'food',
    headline: 'From discovery to a structured ordering path.',
    summary: 'A mobile-first commerce experience for my own operating cloud kitchen, presenting menu discovery, phone verification, cart, address capture, delivery-area logic and a payment path.',
    proves: ['Business and customer-journey definition', 'Responsive product UX direction', 'Verification, delivery and payment-path thinking'],
    boundary: 'My own operating business—not a client transformation or a claim of revenue uplift.',
    caseHref: '/work/bongfoods',
    liveHref: 'https://www.bongfoods.com/',
    liveLabel: 'Open live product ↗',
    signal: 'Public product',
    signalDetail: 'Discovery → delivery eligibility → payment path',
  },
  {
    number: '02',
    name: 'Studio system',
    category: 'Acquisition and qualification',
    label: 'Self-initiated business system',
    tone: 'studio',
    headline: 'From broad capability to a clear buying journey.',
    summary: 'An operating studio website connecting positioning, truth-labelled proof, scope guidance, a structured project brief, attribution and persistent owner triage.',
    proves: ['Offer and audience positioning', 'Scope-planner and qualification logic', 'Public journey connected to private operations'],
    boundary: 'The studio’s own live system—not a paid client engagement or a guarantee of leads.',
    caseHref: '/work/studio-system',
    liveHref: '/services/complete-website-launch#planner',
    liveLabel: 'Try the scope path ↗',
    signal: 'Operating system',
    signalDetail: 'Visit → proof → scope → brief',
  },
  {
    number: '03',
    name: 'Private market',
    category: 'PropTech product concept',
    label: 'Speculative concept',
    tone: 'market',
    headline: 'Designing trust before disclosure.',
    summary: 'A product study for a verified private real-estate network, exploring anonymized opportunities, access requests, NDA gating, matching and Deal Room workflows.',
    proves: ['Category-pattern exploration', 'Permission and progressive-disclosure UX', 'Complex dashboard and workflow direction'],
    boundary: 'Not commissioned and not live. It demonstrates product thinking, interface direction and interface-study depth.',
    caseHref: '/work/private-market-concept',
    liveHref: '/services/complete-website-launch#brief',
    liveLabel: 'Discuss a relevant project ↗',
    signal: 'Speculative system',
    signalDetail: 'Discover → qualify → reveal → collaborate',
  },
] as const;

export default function WorkIndex() {
  return (
    <main id="top" className="work-index-page">
      <header className="site-header work-index-header">
        <a href="/" className="wordmark" aria-label="SP Studios — home">
          <span>SP</span>
          <strong>SP Studios</strong>
        </a>
        <nav aria-label="Selected work navigation">
          <a href="/services/complete-website-launch">What I build</a>
          <a href="#projects">Work</a>
          <a href="#evidence">How work is labelled</a>
          <a href="/services/complete-website-launch#brief" className="header-cta founder-header-cta" data-marketing-event="enquiry_click"><span>Start a project ↗</span><FounderAvatar compact /></a>
        </nav>
      </header>

      <section className="work-index-hero section-shell">
        <div className="work-index-hero-copy">
          <p className="eyebrow"><span /> Selected website work</p>
          <h1>See what I built.<span>See what each project proves.</span></h1>
          <p>Every project says what is live, what I personally contributed and what is only a self-started concept. You can open the work and judge it for yourself.</p>
          <div className="hero-actions">
            <a href="#projects" className="primary-action">See the projects <span>↓</span></a>
            <a href="/services/complete-website-launch" className="text-action">See website options <span>↗</span></a>
          </div>
        </div>

        <aside className="work-truth-ledger" aria-label="How the portfolio work is labelled">
          <div className="work-ledger-heading"><span>How the work is labelled</span><b>Current</b></div>
          <div className="work-ledger-count"><strong>03</strong><span>substantive studies<br />available to inspect</span></div>
          <dl>
            <div><dt>01</dt><dd><strong>Live founder-built work</strong><span>Founder-owned commerce context and decisions</span></dd><b>Live</b></div>
            <div><dt>02</dt><dd><strong>Self-initiated business system</strong><span>Real positioning and qualification path</span></dd><b>Live</b></div>
            <div><dt>03</dt><dd><strong>Speculative concept</strong><span>Deep workflow and interface exploration</span></dd><b>Concept</b></div>
          </dl>
          <p><strong>Zero borrowed agency credits.</strong> No invented client outcomes, traffic claims or guaranteed results.</p>
        </aside>
      </section>

      <section className="work-capability-strip" aria-label="Capabilities demonstrated across the work">
        {capabilities.map((capability) => <span key={capability}>{capability}</span>)}
      </section>

      <WorkProofNavigator />

      <section id="projects" className="work-index-projects">
        <div className="section-shell work-index-heading">
          <div><p className="section-index light">02 · Inspect the work</p><h2>Different contexts. One connected standard.</h2></div>
          <p>The visual language changes with the business. The discipline does not: clarify the decision, design the journey, build the real surface and protect the truth.</p>
        </div>

        <div className="section-shell work-index-list">
          {projects.map((project) => (
            <article key={project.name} className={`work-index-card ${project.tone}`}>
              <div className="work-index-card-head"><span>{project.label}</span><b>{project.number} / 03</b></div>
              <div className="work-index-signal" aria-label={`${project.name}: ${project.signal}`}>
                <span>{project.name}</span>
                <strong>{project.signal}</strong>
                <p>{project.signalDetail}</p>
                <i aria-hidden="true" />
              </div>
              <div className="work-index-copy">
                <div><p>{project.category}</p><h3>{project.headline}</h3><strong>{project.summary}</strong></div>
                <div>
                  <p className="work-index-label">What this proves</p>
                  <ul>{project.proves.map((item) => <li key={item}>{item}</li>)}</ul>
                  <p className="work-truth-boundary"><span>Truth boundary</span>{project.boundary}</p>
                  <div className="work-index-actions">
                    <a href={project.caseHref}>Read case study →</a>
                    <a href={project.liveHref} target={project.liveHref.startsWith('http') ? '_blank' : undefined} rel={project.liveHref.startsWith('http') ? 'noreferrer' : undefined}>{project.liveLabel}</a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="evidence" className="work-evidence section-shell">
        <div className="work-evidence-intro">
          <p className="section-index">03 · How to read the evidence</p>
          <h2>Choose the proof closest to your risk.</h2>
          <p>A restaurant owner may care most about the real operating-business context. A founder launching a service needs the studio’s positioning and qualification system. A platform team may care about the private-market workflow depth.</p>
        </div>
        <div className="work-evidence-table" role="table" aria-label="Comparison of portfolio evidence">
          <div className="work-evidence-row work-evidence-head" role="row"><span role="columnheader">Study</span><span role="columnheader">Strongest evidence</span><span role="columnheader">Commercial relevance</span></div>
          <div className="work-evidence-row" role="row"><strong role="cell">BongFoods</strong><span role="cell">A presented customer journey with real operating constraints</span><span role="cell">D2C, commerce, hospitality and ordering journeys</span></div>
          <div className="work-evidence-row" role="row"><strong role="cell">Studio system</strong><span role="cell">A complete offer-to-brief path with owner-side operations</span><span role="cell">Founder-led services, B2B offers and serious redesigns</span></div>
          <div className="work-evidence-row" role="row"><strong role="cell">Private market</strong><span role="cell">Conceptual permissions, disclosure and collaboration workflow</span><span role="cell">Platforms, portals, memberships and high-trust products</span></div>
        </div>
      </section>

      <section className="work-index-cta">
        <div className="section-shell work-index-cta-grid">
          <div><p className="section-index light">Your business · Next</p><h2>Need the thinking and the finished website?</h2></div>
          <div><p>Start with five practical decisions. You will see the realistic engagement range before sending a brief—without an account, sales call or automatic quotation.</p><a href="/services/complete-website-launch#planner" className="primary-action light-action">Build a realistic scope <span>↗</span></a></div>
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SP</span><strong>SP Studios</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Selected work · Truth-labelled evidence</span><span>SP Studios · Directed by Sohan Vyaparee</span></div>
      </footer>
    </main>
  );
}
