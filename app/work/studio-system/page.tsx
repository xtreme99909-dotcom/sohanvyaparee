/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio Acquisition System Case Study — Sohan Vyaparee',
  description: 'A live, self-initiated website system connecting positioning, honest proof, scope guidance, project qualification and a private owner inbox.',
  alternates: { canonical: '/work/studio-system' },
  openGraph: {
    title: 'From broad capability to a clear buying journey',
    description: 'A live, truth-labelled acquisition-system case study by Sohan Vyaparee.',
    type: 'article',
    url: '/work/studio-system',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'From broad capability to a clear buying journey',
    description: 'A live, truth-labelled acquisition-system case study by Sohan Vyaparee.',
    images: [],
  },
};

const enquiryPath = '/services/complete-website-launch#brief';
const scopePath = '/services/complete-website-launch#planner';

const buyerJourney = [
  {
    number: '01',
    title: 'Understand',
    copy: 'State the complete outcome clearly: strategy, original design, development, integrations and launch under one direction.',
  },
  {
    number: '02',
    title: 'Verify',
    copy: 'Separate live founder-built work, self-initiated systems and speculative concepts so the buyer can judge the evidence honestly.',
  },
  {
    number: '03',
    title: 'Scope',
    copy: 'Turn five practical project decisions into a realistic starting engagement without pretending to issue an automatic quotation.',
  },
  {
    number: '04',
    title: 'Qualify',
    copy: 'Capture the business result, timing, budget and decision context in one structured brief instead of a vague contact message.',
  },
  {
    number: '05',
    title: 'Review',
    copy: 'Keep each enquiry, original source, stage, private note, next-action date and qualification response in one owner-only desk.',
  },
];

const responsibilities = [
  'Offer and audience positioning',
  'Information architecture and conversion path',
  'Original editorial art direction',
  'Responsive UX/UI and implementation',
  'Truth-labelled portfolio structure',
  'Five-decision scope-planner logic',
  'Qualified project brief and consent flow',
  'Private owner triage, response direction and source attribution',
];

export default function StudioSystemCaseStudy() {
  return (
    <main id="top" className="case-page studio-system-case">
      <header className="site-header case-header">
        <a href="/" className="wordmark" aria-label="Sohan Vyaparee — home">
          <span>SV</span>
          <strong>Sohan Vyaparee</strong>
        </a>
        <nav aria-label="Case study navigation">
          <a href="/#work">Selected work</a>
          <a href="#system">Buyer system</a>
          <a href={enquiryPath} className="header-cta" data-marketing-event="enquiry_click">Discuss a project ↗</a>
        </nav>
      </header>

      <section className="case-hero section-shell">
        <div className="case-hero-copy">
          <p className="eyebrow"><span /> Case study · Live self-initiated system</p>
          <h1 className="case-title">From broad capability <span>to a clear buying journey.</span></h1>
          <p className="case-lead">The studio needed to sell more than attractive pages or isolated coding. I shaped one operating website that explains the complete engagement, proves the thinking honestly and helps a serious buyer reach a useful project brief.</p>
          <div className="hero-actions">
            <a href="#system" className="primary-action">Explore the buyer system <span>↓</span></a>
            <a href="#truth" className="text-action">Read the truth label <span>↘</span></a>
          </div>
        </div>

        <aside className="case-fact-board" aria-label="Studio acquisition-system facts">
          <div className="case-fact-status"><i /> Live operating website</div>
          <div className="case-monogram">SV</div>
          <dl>
            <div><dt>Business</dt><dd>Independent website studio</dd></div>
            <div><dt>Type</dt><dd>Self-initiated operating system</dd></div>
            <div><dt>Focus</dt><dd>Positioning · proof · qualification</dd></div>
            <div><dt>Role</dt><dd>Strategy · direction · design · build</dd></div>
          </dl>
          <p>This is the studio’s own live acquisition system—not a client transformation, paid campaign result or claim of guaranteed leads.</p>
        </aside>
      </section>

      <section className="case-statement">
        <div className="section-shell case-statement-grid">
          <p className="section-index light">01 · The business problem</p>
          <h2>Creative range is valuable only when the buyer can understand what to buy.</h2>
          <div>
            <p>A background across CGI, direction, business ownership and AI-assisted implementation can sound broad instead of useful. The website had to translate that range into one accountable promise.</p>
            <p>The answer was not more service labels. It was one journey connecting the offer, truthful proof, scope decisions and a qualified next step.</p>
          </div>
        </div>
      </section>

      <section className="case-journey section-shell">
        <div className="case-section-heading">
          <div><p className="section-index">02 · Buyer journey</p><h2>Five decisions from first visit to useful brief.</h2></div>
          <p>Each stage answers a real buying question before asking the visitor for more commitment.</p>
        </div>
        <div className="journey-grid">
          {buyerJourney.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="market-case-stage studio-system-stage">
        <div className="section-shell">
          <div className="case-product-label">
            <p className="section-index light">03 · Operating system</p>
            <span>Public story · Scope guidance · Private review</span>
          </div>
          <div className="market-case-window" role="img" aria-label="Studio website acquisition journey from offer to qualified brief">
            <div className="market-case-window-bar"><i /><i /><i /><span>Website acquisition system · One connected path</span><b>Live</b></div>
            <div className="market-case-app">
              <aside className="market-case-nav">
                <div className="market-case-brand">SV</div>
                <small>Website studio</small>
                {['Positioning', 'Proof', 'Scope preview', 'Project brief', 'Studio inbox'].map((item, index) => (
                  <p key={item} className={index === 2 ? 'active' : ''}><span>0{index + 1}</span>{item}</p>
                ))}
                <div className="market-member"><i>SV</i><span><strong>Owner workspace</strong><small>Private review</small></span></div>
              </aside>

              <div className="market-case-main">
                <div className="market-case-toolbar"><span>Qualified project path</span><p>One promise&nbsp;&nbsp; · &nbsp;&nbsp;One accountable partner</p></div>
                <div className="market-case-heading"><div><small>Complete website engagement</small><h2>From direction to launch</h2></div><span>Open for qualified enquiries</span></div>

                <div className="market-case-grid">
                  <article className="market-opportunity">
                    <div className="market-asset studio-system-asset"><span>Public offer</span><b>Live</b><strong>Strategy<br />Design<br />Build<br />Launch</strong></div>
                    <div className="market-opportunity-meta"><span>Founder-led business</span><span>Fixed scope before production</span></div>
                    <h3>One complete website project.</h3>
                    <p>The promise, work, process and commercial starting points stay connected instead of becoming separate freelance tasks.</p>
                    <div className="market-match"><span><i /> Honest evidence</span><strong>No copied template or invented result</strong></div>
                  </article>

                  <aside className="market-access-panel">
                    <span className="market-access-kicker">Scope route</span>
                    <h3>Clarity before the enquiry.</h3>
                    <ol>
                      <li className="complete"><span>01</span><p><strong>Business outcome</strong><small>New launch, redesign or working journey</small></p><b>✓</b></li>
                      <li className="complete"><span>02</span><p><strong>Proof and fit</strong><small>Truth labels and working boundaries</small></p><b>✓</b></li>
                      <li className="current"><span>03</span><p><strong>Scope preview</strong><small>Five practical project decisions</small></p><b>→</b></li>
                      <li><span>04</span><p><strong>Qualified brief</strong><small>Private owner review and response</small></p></li>
                    </ol>
                    <div className="market-access-button">No automatic quotation <span>→</span></div>
                  </aside>
                </div>

                <div className="market-deal-strip">
                  <div><span>Starting engagements</span><strong>$499 · $999 · $1,799</strong></div>
                  <div><span>Response</span><strong>Normally within 2 working days</strong></div>
                  <div><span>Owner desk</span><strong>Triage · reply · next action</strong></div>
                  <div><span>Attribution</span><strong>Original source preserved</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-scope section-shell">
        <div className="case-scope-intro">
          <p className="section-index">04 · What I directed</p>
          <h2>The public story and the private business workflow were built together.</h2>
          <p>The site is not only a portfolio shell. It connects original positioning and interface direction to scope guidance, qualification, consent, attribution, persistent owner triage and a considered first response.</p>
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
          <h2>I can turn a complex capability into a usable customer and business system.</h2>
          <p>This work demonstrates end-to-end website direction: shaping the offer, designing the responsive experience, building the qualification journey and connecting the operational layer behind it. The protected desk can save stage, next action and private context while preparing an authority/timing/integration response. It does not claim client revenue, traffic growth or lead results that have not been established.</p>
          <a href={scopePath}>Build a realistic scope preview →</a>
        </div>
        <div className="proof-note">
          <span>Truth label</span>
          <strong>Live self-initiated operating system</strong>
          <p>Created and operated by Sohan Vyaparee for his independent website studio. Not a client engagement or performance case study.</p>
        </div>
      </section>

      <section className="case-cta">
        <div className="section-shell case-cta-grid">
          <div><p className="section-index light">Your business · Next</p><h2>Need the offer and the website to become one clear system?</h2></div>
          <div><p>Use the scope preview to identify the business outcome, website shape, connected workflow, budget and timing before writing the brief.</p><a href={scopePath} className="primary-action light-action">Build your scope preview <span>↗</span></a></div>
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SV</span><strong>Sohan Vyaparee</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Case study · Studio acquisition system</span><span>© 2026 Sohan Vyaparee</span></div>
      </footer>
    </main>
  );
}
