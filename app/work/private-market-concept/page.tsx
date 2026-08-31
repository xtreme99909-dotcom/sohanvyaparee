/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private-Market Product Concept — SP Studios',
  description: 'A speculative PropTech case study exploring verified members, progressive disclosure, access requests, matching and private deal-room workflows.',
  alternates: { canonical: '/work/private-market-concept' },
  openGraph: {
    title: 'Designing trust before disclosure',
    description: 'An independent speculative concept for a verified private real-estate network.',
    type: 'article',
    url: '/work/private-market-concept',
    images: [{ url: '/private-market-case-og.png', width: 1200, height: 630, alt: 'Private-market product concept by SP Studios' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Designing trust before disclosure',
    description: 'An independent speculative concept for a verified private real-estate network.',
    images: ['/private-market-case-og.png'],
  },
};

const enquiryPath = '/services/complete-website-launch#brief';
const scopePath = '/services/complete-website-launch#planner';

const disclosureSteps = [
  { number: '01', title: 'Discover', copy: 'Show enough market context to establish relevance without exposing the sensitive asset.' },
  { number: '02', title: 'Qualify', copy: 'Use mandate, geography, capital and role signals to separate curiosity from credible intent.' },
  { number: '03', title: 'Request', copy: 'Make the access request explicit, accountable and easy for the opportunity owner to review.' },
  { number: '04', title: 'Reveal', copy: 'Release identity, financials and documents progressively after verification and NDA approval.' },
  { number: '05', title: 'Collaborate', copy: 'Carry documents, messages, participants and next steps into one controlled deal room.' },
];

const responsibilities = [
  'Category-pattern exploration',
  'Public-to-private product strategy',
  'Role, verification and permission model',
  'Opportunity discovery and matching UX',
  'Access-request and NDA-gating flow',
  'Member dashboard information architecture',
  'Deal Room document and message workflow',
  'Responsive visual system and interface-study direction',
];

export default function PrivateMarketConceptCaseStudy() {
  return (
    <main id="top" className="case-page private-case">
      <header className="site-header case-header">
        <a href="/" className="wordmark" aria-label="SP Studios — home">
          <span>SP</span>
          <strong>SP Studios</strong>
        </a>
        <nav aria-label="Case study navigation">
          <a href="/work">Selected work</a>
          <a href="#system">Product system</a>
          <a href={enquiryPath} className="header-cta" data-marketing-event="enquiry_click">Discuss a project ↗</a>
        </nav>
      </header>

      <section className="case-hero section-shell">
        <div className="case-hero-copy">
          <p className="eyebrow"><span /> Speculative concept · Independent study</p>
          <h1 className="case-title">Designing trust <span>before disclosure.</span></h1>
          <p className="case-lead">A private market cannot behave like a public listings portal. This concept explores how verified people, sensitive opportunities and serious intent could move from first signal to controlled collaboration.</p>
          <div className="hero-actions">
            <a href="#system" className="primary-action">Explore the product system <span>↓</span></a>
            <a href="#truth" className="text-action">Read the truth label <span>↘</span></a>
          </div>
        </div>

        <aside className="case-fact-board" aria-label="Private-market concept facts">
          <div className="case-fact-status"><i /> Clearly labelled concept</div>
          <div className="case-monogram">P</div>
          <dl>
            <div><dt>Category</dt><dd>Private real-estate network</dd></div>
            <div><dt>Type</dt><dd>Speculative concept</dd></div>
            <div><dt>Focus</dt><dd>Trust · access · workflow</dd></div>
            <div><dt>Role</dt><dd>Strategy · UX/UI · interface study</dd></div>
          </dl>
          <p>Not commissioned by a client and not presented as a live platform. The work demonstrates product thinking and interface direction.</p>
        </aside>
      </section>

      <section className="case-statement">
        <div className="section-shell case-statement-grid">
          <p className="section-index light">01 · The design tension</p>
          <h2>Reveal enough to create intent. Protect enough to preserve trust.</h2>
          <div>
            <p>Public marketplaces optimize for reach. A private network has a different job: establish credibility, qualify relevance and control who sees what.</p>
            <p>The interface therefore treats disclosure as a sequence—not a switch—connecting anonymized discovery, verification, approval and deal collaboration.</p>
          </div>
        </div>
      </section>

      <section className="case-journey section-shell">
        <div className="case-section-heading">
          <div><p className="section-index">02 · Progressive access</p><h2>Five stages from signal to deal room.</h2></div>
          <p>Each step earns the next level of information while keeping the owner in control.</p>
        </div>
        <div className="journey-grid">
          {disclosureSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="market-case-stage">
        <div className="section-shell">
          <div className="case-product-label">
            <p className="section-index light">03 · Member product</p>
            <span>Verified network · Controlled disclosure</span>
          </div>
          <div className="market-case-window" role="img" aria-label="Private-market member dashboard concept">
            <div className="market-case-window-bar"><i /><i /><i /><span>Member workspace · Private by design</span><b>Verified</b></div>
            <div className="market-case-app">
              <aside className="market-case-nav">
                <div className="market-case-brand">P</div>
                <small>Private network</small>
                {['Overview', 'Opportunities', 'Matches', 'Deal rooms', 'Messages'].map((item, index) => (
                  <p key={item} className={index === 2 ? 'active' : ''}><span>0{index + 1}</span>{item}</p>
                ))}
                <div className="market-member"><i>SV</i><span><strong>Verified member</strong><small>Investment principal</small></span></div>
              </aside>

              <div className="market-case-main">
                <div className="market-case-toolbar"><span>Mandate dashboard</span><p>Private Desk&nbsp;&nbsp; · &nbsp;&nbsp;3 new matches</p></div>
                <div className="market-case-heading"><div><small>Curated for your mandate</small><h2>Private matches</h2></div><span>12 opportunities</span></div>

                <div className="market-case-grid">
                  <article className="market-opportunity">
                    <div className="market-asset"><span>Identity protected</span><b>96%</b></div>
                    <div className="market-opportunity-meta"><span>London · Residential portfolio</span><span>Direct mandate</span></div>
                    <h3>Prime heritage portfolio</h3>
                    <p>Core-plus residential assets · Institutional scale · Verified ownership representative</p>
                    <div className="market-match"><span><i /> Mandate match</span><strong>Investment range aligned</strong></div>
                  </article>

                  <aside className="market-access-panel">
                    <span className="market-access-kicker">Access protocol</span>
                    <h3>Details release progressively.</h3>
                    <ol>
                      <li className="complete"><span>01</span><p><strong>Member verified</strong><small>Identity and role confirmed</small></p><b>✓</b></li>
                      <li className="complete"><span>02</span><p><strong>Mandate aligned</strong><small>Capital and criteria reviewed</small></p><b>✓</b></li>
                      <li className="current"><span>03</span><p><strong>Request access</strong><small>Owner approval required</small></p><b>→</b></li>
                      <li><span>04</span><p><strong>NDA and Deal Room</strong><small>Documents unlock after approval</small></p></li>
                    </ol>
                    <div className="market-access-button">Request controlled access <span>→</span></div>
                  </aside>
                </div>

                <div className="market-deal-strip">
                  <div><span>Active Deal Room</span><strong>European Hospitality Portfolio</strong></div>
                  <div><span>Documents</span><strong>14 / 18 reviewed</strong></div>
                  <div><span>Participants</span><strong>6 verified</strong></div>
                  <div><span>Status</span><strong>Due diligence</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-scope section-shell">
        <div className="case-scope-intro">
          <p className="section-index">04 · What I directed</p>
          <h2>The public story and member workflow were designed as one system.</h2>
          <p>The concept extends beyond a polished landing page. It connects positioning, qualification, permissions, matching and transaction collaboration so every interface supports the network’s trust model.</p>
        </div>
        <div className="scope-list">
          {responsibilities.map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>
          ))}
        </div>
      </section>

      <section id="truth" className="case-proof section-shell">
        <div className="proof-card">
          <p className="section-index light">05 · What this proves</p>
          <h2>I can direct the promise outside the login and the product behind it.</h2>
          <p>This study demonstrates product strategy, hierarchy, permission-aware UX and serious dashboard direction. It does not claim a client outcome, a live network or proprietary transaction data.</p>
          <a href={scopePath}>Build a product scope preview →</a>
        </div>
        <div className="proof-note">
          <span>Truth label</span>
          <strong>Speculative concept</strong>
          <p>Created to demonstrate a category hypothesis, product thinking and original interface direction. Not a client engagement.</p>
        </div>
      </section>

      <section className="case-cta">
        <div className="section-shell case-cta-grid">
          <div><p className="section-index light">Your product · Next</p><h2>Building a marketplace, portal or member experience?</h2></div>
          <div><p>Use the scope preview to separate the public website, core product workflow and connected systems before committing to pages, timing or price.</p><a href={scopePath} className="primary-action light-action">Build your scope preview <span>↗</span></a></div>
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SP</span><strong>SP Studios</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Concept study · Private-market product</span><span>SP Studios · Directed by Sohan Vyaparee</span></div>
      </footer>
    </main>
  );
}
