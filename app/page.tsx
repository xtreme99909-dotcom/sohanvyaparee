import Image from 'next/image';
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
    label: 'A focused first launch',
    title: 'Launch Essentials',
    price: '$499',
    copy: 'A polished, original website for a new offer or small business that needs to look credible and start generating enquiries.',
    scope: ['Direction call and page plan', '1–3 responsive pages', 'Original visual direction', 'Contact or enquiry flow', 'Deployment and launch support'],
    timing: 'Typical timeline · 7–10 working days',
  },
  {
    label: 'The complete business site',
    title: 'Business Launch',
    price: '$999',
    copy: 'A complete customer-facing website that explains the business clearly, builds trust and turns attention into a useful next step.',
    scope: ['Strategy and customer journey', 'Up to 5 custom pages', 'Copy and proof structure', 'Forms, analytics and basic SEO', 'Responsive QA and launch'],
    timing: 'Typical timeline · 2–3 weeks',
  },
  {
    label: 'More pages, polish and systems',
    title: 'Signature + Integration',
    price: '$1,799',
    copy: 'A more distinctive website for an established brand, product or service that needs deeper storytelling and a connected business workflow.',
    scope: ['Positioning and creative direction', '6–8 custom pages', 'Advanced responsive interactions', 'One agreed CRM, booking or API integration', 'Performance, QA and launch support'],
    timing: 'Typical timeline · 3–5 weeks',
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
          <a href="/services/complete-website-launch">Services</a>
          <a href="#work">Selected work</a>
          <a href="#approach">Approach</a>
          <a href="#contact" className="header-cta" data-marketing-event="enquiry_click">Discuss a project ↗</a>
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
            <a href="/services/complete-website-launch#planner" className="primary-action">Build a realistic scope <span>↗</span></a>
            <a href="#work" className="text-action">See selected work <span>↓</span></a>
          </div>
          <p className="fit-note">A sixty-second scope preview before the project brief · no account and no automatic quotation.</p>
        </div>

        <div className="direction-board" role="group" aria-label="A complete website directed from strategy through launch">
          <div className="board-topline">
            <span>Live direction board</span>
            <span className="availability"><i /> Open for qualified enquiries</span>
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
          <div className="board-progress" role="group" aria-label="Project stages">
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
          <p>Live work, self-initiated systems and speculative concepts are labelled clearly. No borrowed agency credits.</p>
        </div>

        <div className="work-grid section-shell">
          <article className="project-card food-card">
            <div className="project-meta">
              <span>Live founder-built product</span>
              <span>01 / 03</span>
            </div>
            <div className="food-visual" role="img" aria-label="BongFoods ordering experience preview">
              <div className="phone-shell">
                <div className="phone-top"><span>B</span><small>KITCHEN OPEN · NAGPUR</small><i>Bag · 2</i></div>
                <div className="food-hero">
                  <p>Food that feels like home.</p>
                  <strong>Authentic Bengali<br />meals, delivered.</strong>
                  <span className="food-demo-button">View today’s menu ↗</span>
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
              <div>
                <p>A mobile-first experience for my own cloud kitchen, including visual menu, phone verification, cart, address capture, delivery-area logic and payments.</p>
                <div className="project-links">
                  <a href="/work/bongfoods">View case study →</a>
                  <a href="https://www.bongfoods.com/" target="_blank" rel="noreferrer">Visit live website ↗</a>
                </div>
              </div>
            </div>
          </article>

          <article className="project-card market-card">
            <div className="project-meta">
              <span>Speculative product concept</span>
              <span>02 / 03</span>
            </div>
            <div className="market-visual" role="img" aria-label="Private real-estate platform concept preview">
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
              <div><p>An independently initiated concept exploring verified members, anonymized opportunities, access requests, NDA gating, matching, documents and Deal Room workflows.</p><a href="/work/private-market-concept">View concept study →</a><span className="concept-label">Concept study · Not a client engagement</span></div>
            </div>
          </article>

          <article className="project-card studio-card">
            <div className="project-meta">
              <span>Live self-initiated business system</span>
              <span>03 / 03</span>
            </div>
            <div className="studio-visual" role="img" aria-label="Studio acquisition system connecting positioning, proof and project qualification">
              <span className="orbit orbit-one" />
              <span className="orbit orbit-two" />
              <span className="studio-mark">SV</span>
              <div><p>Positioning · Proof · Qualification</p><strong>One path<br />from visit to brief.</strong></div>
            </div>
            <div className="project-copy">
              <div><p>Sohan Vyaparee Studio · Acquisition system</p><h3>Turning a broad capability into a clear buying journey.</h3></div>
              <div><p>An operating studio website connecting positioning, truth-labelled proof, scope guidance, a qualified project brief, attribution and persistent owner triage.</p><a href="/work/studio-system">View the live-system case study →</a><span className="concept-label">Self-initiated · Not a client result</span></div>
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
          <div><p className="section-index">05 · Engagements</p><h2>Clear starting prices. No mystery.</h2></div>
          <p>Focused engagements start at $499. Larger launch systems begin at $2,500 when strategy, deeper customer journeys, integrations and launch responsibility need to work together. Final scope, timing and milestones are written before production.</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article key={service.title} className={index === 1 ? 'featured' : ''}>
              <p>{service.label}</p>
              <h3>{service.title}</h3>
              <div className="service-price"><span>Starting at</span><b>{service.price}</b><small>USD · fixed-scope estimate</small></div>
              <strong>{service.copy}</strong>
              <ul>{service.scope.map((item) => <li key={item}>{item}</li>)}</ul>
              <small>{service.timing}</small>
            </article>
          ))}
        </div>
        <aside className="launch-system-callout" aria-labelledby="launch-system-title">
          <div>
            <p>For a larger market launch</p>
            <h3 id="launch-system-title">International Launch System</h3>
          </div>
          <div>
            <strong>$2,500+ <small>USD · custom scope</small></strong>
            <p>For a qualified D2C, SaaS, hospitality or high-trust business that needs strategy, five to eight launch-critical pages, original design, responsive implementation, an agreed integration, QA and launch ownership.</p>
          </div>
          <a href="/services/complete-website-launch#scope">See the full scope boundary <span>↗</span></a>
        </aside>
        <a href="/services/complete-website-launch" className="service-detail-link">See the complete engagement, proof and FAQs <span>↗</span></a>
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

      <section id="about" className="about-section section-shell">
        <p className="section-index">06 · The person directing it</p>
        <div className="about-grid">
          <figure className="founder-portrait">
            <Image src="/founder-sohan.jpg" width={1200} height={1187} sizes="(max-width: 1080px) 91vw, 36vw" alt="Sohan Vyaparee, founder and website creative director" />
            <figcaption><span>Founder · Director · Builder</span><strong>Sohan Vyaparee</strong></figcaption>
          </figure>
          <div>
            <h2>Visual taste, business instinct and hands-on execution.</h2>
            <p>I’m Sohan Vyaparee, a website creative director and the founder behind SP Studios and BongFoods. I help founders turn a business idea, offer or outdated presence into one clear, customer-ready website.</p>
            <p>My background in CGI, animation, advertising and art direction gives the work a strong visual point of view. Building and operating my own food business keeps that creativity grounded in practical questions: Will people understand it? Trust it? Act on it?</p>
            <p>I use an AI-assisted workflow to research, prototype and build faster, but every important decision—strategy, hierarchy, taste and final quality—stays personally directed.</p>
            <div className="about-links"><a href="https://www.linkedin.com/services/page/a8036034688b927420/" target="_blank" rel="noreferrer">LinkedIn services ↗</a><a href="https://www.upwork.com/freelancers/~01b29ff9dfbe850b7b" target="_blank" rel="noreferrer">Upwork ↗</a><a href="https://github.com/xtreme99909-dotcom/sohanvyaparee" target="_blank" rel="noreferrer">GitHub source ↗</a></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-shell contact-grid">
          <div>
            <p className="section-index light">07 · Start with the business</p>
            <h2>Tell me what needs to exist when we are done.</h2>
            <p className="contact-intro">This short brief filters for complete website projects. Send it once and it goes directly into my private project inbox—no platform account or repeated message required.</p>
            <div className="contact-signal"><i /><span><strong>Private studio inbox</strong>Open for qualified project enquiries</span></div>
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
