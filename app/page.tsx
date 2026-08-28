import { ProjectBrief } from './project-brief';

const disciplines = [
  'Strategy',
  'Art direction',
  'UX & copy structure',
  'Responsive build',
  'Integrations',
  'Launch',
];

const process = [
  {
    number: '01',
    title: 'Find the sharpest story',
    copy: 'We clarify the offer, audience, proof and action the website needs to create before a layout is designed.',
    output: 'Direction brief · sitemap · conversion path',
  },
  {
    number: '02',
    title: 'Direct the experience',
    copy: 'I shape the visual language, page hierarchy, messaging rhythm and responsive experience as one system.',
    output: 'Art direction · UX · copy framework',
  },
  {
    number: '03',
    title: 'Build the real thing',
    copy: 'The approved direction becomes a fast, polished website with the forms, booking, ordering or platform flows it needs.',
    output: 'Responsive build · integrations · CMS',
  },
  {
    number: '04',
    title: 'Test, refine and launch',
    copy: 'I pressure-test the key journeys, remove friction, prepare launch details and stay accountable through go-live.',
    output: 'QA · performance · analytics-ready launch',
  },
];

const services = [
  {
    label: 'New business or offer',
    title: 'Website Launch',
    copy: 'A focused, original website that gives a new company the clarity and credibility to enter the market well.',
    scope: ['Strategy and sitemap', 'Original responsive direction', '3–5 purposeful pages', 'Lead, booking or enquiry flow', 'Deployment and launch support'],
    timing: 'Typical timeline · 2–4 weeks',
  },
  {
    label: 'Established business',
    title: 'Signature Website',
    copy: 'A deeper repositioning and digital experience for a business whose current website no longer matches its level.',
    scope: ['Customer-journey workshop', 'Copy and proof architecture', '6–10 custom pages', 'CMS, commerce or service integrations', 'Migration, polish and launch'],
    timing: 'Typical timeline · 4–7 weeks',
  },
  {
    label: 'Startup or digital platform',
    title: 'Product Experience',
    copy: 'A market-facing site plus the key product flows needed to explain, validate or present a platform with conviction.',
    scope: ['Positioning and product narrative', 'Public marketing experience', 'Marketplace or dashboard flows', 'Interactive prototype or frontend', 'Investor and customer-ready handoff'],
    timing: 'Scoped around the product',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f2f0e9] text-[#17201c]">
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="Sohan Vyaparee — home">
          <span>SV</span>
          <strong>Sohan Vyaparee</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#approach">Approach</a>
          <a href="#contact" className="header-cta">Discuss a project ↗</a>
        </nav>
      </header>

      <section id="top" className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Independent website studio · India / Worldwide</p>
          <h1>
            From business idea
            <span>to a website ready for market.</span>
          </h1>
          <p className="hero-intro">
            I direct the strategy, customer journey, visual language and build—then carry it through integrations, polish and launch. One accountable creative partner, from blank page to live product.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="primary-action">Start a complete website <span>↗</span></a>
            <a href="#work" className="text-action">See selected work <span>↓</span></a>
          </div>
          <p className="fit-note">For founders and businesses that need the complete direction—not a coder for a finished design.</p>
        </div>

        <div className="direction-board" aria-label="A complete website directed from strategy through launch">
          <div className="board-topline">
            <span>Live direction board</span>
            <span className="availability"><i /> Taking on 2 projects</span>
          </div>
          <div className="board-stage">
            <div className="stage-number">01</div>
            <p>Current stage</p>
            <h2>Find the sharpest story the business can own.</h2>
            <div className="signal-card">
              <span>Positioning signal</span>
              <strong>Clarity before decoration.</strong>
              <p>Every page earns its place in the customer journey.</p>
            </div>
          </div>
          <div className="board-progress" aria-label="Project stages">
            {['Direction', 'Experience', 'Build', 'Launch'].map((item, index) => (
              <div key={item} className={index === 0 ? 'active' : ''}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="discipline-strip" aria-label="Capabilities">
        {disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
      </section>

      <section className="positioning-section section-shell">
        <p className="section-index">01 · The difference</p>
        <div className="positioning-grid">
          <h2>A website is not a collection of pages. <em>It is the business, experienced.</em></h2>
          <div>
            <p>Many projects split strategy, writing, design and development between people who only see one part of the problem. The result may look finished without feeling coherent.</p>
            <p>I work differently: one direction runs from the first business question to the final mobile interaction. AI accelerates the production; judgment, taste and accountability stay human.</p>
            <div className="founder-note">
              <span>Founder perspective</span>
              <strong>I built my own food business experience, so I care what happens after a customer clicks—not only how the screen looks.</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="section-shell work-heading">
          <div>
            <p className="section-index light">02 · Selected work</p>
            <h2>Proof across business, product and visual direction.</h2>
          </div>
          <p>Real work is labelled as real. Self-initiated concept work is labelled as speculative. No borrowed agency credits.</p>
        </div>

        <div className="work-grid section-shell">
          <article className="project-card food-card">
            <div className="project-meta">
              <span>Live founder-built product</span>
              <span>01 / 03</span>
            </div>
            <div className="food-visual" aria-label="BongFoods ordering experience preview">
              <div className="phone-shell">
                <div className="phone-top"><span>B</span><small>KITCHEN OPEN · NAGPUR</small><i>Bag · 2</i></div>
                <div className="food-hero">
                  <p>Food that feels like home.</p>
                  <strong>Authentic Bengali<br />meals, delivered.</strong>
                  <button type="button">View today’s menu ↗</button>
                </div>
                <div className="menu-preview">
                  <span>Today’s favourites</span>
                  <div><i /><p><strong>Chicken Kosha</strong><small>Slow-cooked Bengali curry</small></p><b>₹280</b></div>
                  <div><i /><p><strong>Basanti Pulao</strong><small>Fragrant sweet rice</small></p><b>₹180</b></div>
                </div>
              </div>
            </div>
            <div className="project-copy">
              <div><p>BongFoods · Restaurant commerce</p><h3>From food discovery to a real order.</h3></div>
              <div><p>A mobile-first experience for my own cloud kitchen, including visual menu, phone verification, cart, address capture, delivery-area logic and payments.</p><a href="https://www.bongfoods.com/" target="_blank" rel="noreferrer">Visit live website ↗</a></div>
            </div>
          </article>

          <article className="project-card market-card">
            <div className="project-meta">
              <span>Speculative product concept</span>
              <span>02 / 03</span>
            </div>
            <div className="market-visual" aria-label="Private real-estate platform concept preview">
              <div className="market-sidebar">
                <span>PM</span>
                {['Overview', 'Matches', 'Deal rooms', 'Messages'].map((item, index) => <p key={item} className={index === 1 ? 'selected' : ''}>{item}</p>)}
              </div>
              <div className="market-content">
                <div className="market-toolbar"><p>Private opportunities</p><small>Verified member · VL</small></div>
                <div className="market-title"><span>Curated for your mandate</span><strong>12 private matches</strong></div>
                <div className="market-properties">
                  <div><i /><span>London · Residential</span><strong>Heritage Portfolio</strong><small>96% mandate match</small></div>
                  <div><i /><span>Dubai · Hospitality</span><strong>Waterfront Asset</strong><small>92% mandate match</small></div>
                </div>
              </div>
            </div>
            <div className="project-copy">
              <div><p>Private-market platform · PropTech</p><h3>Turning discretion into a usable product.</h3></div>
              <div><p>An independently initiated concept exploring verified members, anonymized opportunities, access requests, NDA gating, matching, documents and Deal Room workflows.</p><span className="concept-label">Concept study · Not a client engagement</span></div>
            </div>
          </article>

          <article className="project-card studio-card">
            <div className="project-meta">
              <span>Creative direction background</span>
              <span>03 / 03</span>
            </div>
            <div className="studio-visual">
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <span className="studio-mark">SP</span>
              <div><p>Image · Motion · Meaning</p><strong>Visual judgment<br />before software.</strong></div>
            </div>
            <div className="project-copy">
              <div><p>SP Studios · CGI and storytelling</p><h3>Art direction that gives the interface a point of view.</h3></div>
              <div><p>CGI, animation and advertising experience shape the composition, pacing and visual storytelling behind the website work.</p></div>
            </div>
          </article>
        </div>
      </section>

      <section id="approach" className="process-section section-shell">
        <div className="section-heading-row">
          <div><p className="section-index">03 · One connected process</p><h2>One direction. Four clear stages.</h2></div>
          <p>No design disappearing into a development handoff. No client coordinating five freelancers.</p>
        </div>
        <div className="process-grid">
          {process.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <small>{step.output}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="ai-section">
        <div className="section-shell ai-grid">
          <div><p className="section-index light">04 · AI-directed production</p><h2>More exploration. Less production drag.</h2></div>
          <div>
            <p className="ai-lead">I use a developed AI workflow to research faster, explore more directions, test responsive behavior and accelerate the build.</p>
            <p>It does not replace the hard part: deciding what the business should say, what the customer needs next and what deserves to make the final cut.</p>
            <div className="ai-rules">
              <span><i>+</i> Faster iteration and problem-solving</span>
              <span><i>+</i> More time for polish and edge cases</span>
              <span><i>−</i> No generic AI-template positioning</span>
              <span><i>−</i> No invented strategy or fake proof</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-shell">
        <div className="section-heading-row">
          <div><p className="section-index">05 · Engagements</p><h2>Built for complete outcomes.</h2></div>
          <p>Most complete projects begin at $1,500. Final scope follows a short fit conversation and written proposal.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article key={service.title} className={index === 1 ? 'featured' : ''}>
              <p>{service.label}</p>
              <h3>{service.title}</h3>
              <strong>{service.copy}</strong>
              <ul>{service.scope.map((item) => <li key={item}>{item}</li>)}</ul>
              <small>{service.timing}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="fit-section section-shell">
        <div className="fit-card fit-yes">
          <p>Good fit</p>
          <h2>You need someone to shape the website, not wait for instructions.</h2>
          <ul>
            <li>A new business, offer or product needs its first credible website</li>
            <li>Your current site no longer reflects the quality of the company</li>
            <li>You want strategy, design and build owned by one partner</li>
            <li>You value distinctive direction and are ready to make decisions</li>
          </ul>
        </div>
        <div className="fit-card fit-no">
          <p>Not the right fit</p>
          <h2>You only need isolated execution.</h2>
          <ul>
            <li>A finished design converted to code without creative input</li>
            <li>A one-hour fix, bug ticket or long-term hourly development role</li>
            <li>A copied template, speculative unpaid pitch or cheapest quote</li>
            <li>Unlimited revisions without a defined decision process</li>
          </ul>
        </div>
      </section>

      <section className="about-section section-shell">
        <p className="section-index">06 · The person directing it</p>
        <div className="about-grid">
          <div className="portrait-type"><span>S</span><span>V</span><small>Founder · Director · Builder</small></div>
          <div>
            <h2>I understand the ambition—and the practical work behind it.</h2>
            <p>I’m Sohan Vyaparee, founder of SP Studios and BongFoods. Running a real food business taught me to look at websites from the owner’s side: trust, customer behavior, operations and revenue matter alongside aesthetics.</p>
            <p>My CGI, animation and advertising background gives me a visual point of view. My AI-assisted workflow lets me execute that direction quickly and stay personally accountable through launch.</p>
            <div className="about-links"><a href="https://www.linkedin.com/in/sohan-vyaparee-397a29352/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.upwork.com/freelancers/~01b29ff9dfbe850b7b" target="_blank" rel="noreferrer">Upwork ↗</a></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-shell contact-grid">
          <div>
            <p className="section-index light">07 · Start with the business</p>
            <h2>Tell me what needs to exist when we are done.</h2>
            <p className="contact-intro">This short brief filters for complete website projects. Your details stay in your browser until you choose to copy and send them through LinkedIn or Upwork.</p>
            <div className="contact-signal"><i /><span><strong>Current availability</strong>Two new project starts</span></div>
          </div>

          <ProjectBrief />
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="#top" className="wordmark light-mark"><span>SV</span><strong>Sohan Vyaparee</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>SP Studios · BongFoods · Independent worldwide</span><span>© 2026 Sohan Vyaparee</span></div>
      </footer>
    </main>
  );
}
