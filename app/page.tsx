import Image from 'next/image';
import { DirectionBoard } from './direction-board';
import { ProjectBrief } from './project-brief';
import { FounderAvatar } from './founder-avatar';

const websitePaths = [
  {
    label: 'Business website',
    detail: 'Explain what you do, build trust and collect enquiries.',
    price: 'From $1,500',
    href: '/services/complete-website-launch',
  },
  {
    label: 'Online store',
    detail: 'Help customers find, understand and buy your products.',
    price: 'From $6,500',
    href: '/services/d2c-commerce-launch',
  },
  {
    label: 'B2B website',
    detail: 'Show your capability and collect better project details.',
    price: 'From $3,000',
    href: '/services/b2b-lead-generation-websites',
  },
];

const heroClarity = [
  { label: 'You tell me', value: 'What you are building and who it is for' },
  { label: 'I handle', value: 'Plan, copy, design, build and integrations' },
  { label: 'You get', value: 'A complete live website ready for customers' },
];

const process = [
  {
    number: '01',
    title: 'Understand the business',
    copy: 'We agree what the website must explain, who it is for and what visitors should do next.',
    output: 'Website plan · page list · main action',
  },
  {
    number: '02',
    title: 'Plan and design the pages',
    copy: 'I turn the business plan into clear page structure, key messages and an original visual design.',
    output: 'Page structure · key copy · design direction',
  },
  {
    number: '03',
    title: 'Build and connect it',
    copy: 'The approved design becomes a working website with the forms, booking, store or tools it needs.',
    output: 'Working website · forms · needed integrations',
  },
  {
    number: '04',
    title: 'Test and launch',
    copy: 'I check the important journeys on real screen sizes, fix problems and take the website live.',
    output: 'Mobile checks · speed · analytics · handover',
  },
];

const services = [
  {
    label: 'A clear 1–3 page website',
    title: 'Focused Website',
    price: '$1,500+',
    copy: 'A polished, original website for a new offer or small business that needs to look credible and start generating enquiries.',
    scope: ['Direction call and page plan', '1–3 responsive pages', 'Original visual direction', 'Contact or enquiry flow', 'Deployment and launch support'],
    timing: 'Typical timeline · 5–7 working days',
  },
  {
    label: 'Up to 5 custom pages',
    title: 'Complete Business Website',
    price: '$3,000+',
    copy: 'A complete customer-facing website that explains the business clearly, builds trust and turns attention into a useful next step.',
    scope: ['Strategy and customer journey', 'Up to 5 custom pages', 'Copy and proof structure', 'Forms, analytics and basic SEO', 'Responsive QA and launch'],
    timing: 'Typical timeline · 7–15 working days',
  },
  {
    label: '6–8 pages plus one connection',
    title: 'Website + Integration',
    price: '$5,000+',
    copy: 'A more distinctive website for an established brand, product or service that needs deeper storytelling and a connected business workflow.',
    scope: ['Positioning and creative direction', '6–8 custom pages', 'Advanced responsive interactions', 'One agreed CRM, booking or API integration', 'Performance, QA and launch support'],
    timing: 'Typical timeline · 3–6 weeks',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f2f0e9] text-[#17201c]">
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="SP Studios — home">
          <span>SP</span>
          <strong>SP Studios</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/services/complete-website-launch">What I build</a>
          <a href="/work">Work</a>
          <a href="#approach">How it works</a>
          <a href="#contact" className="header-cta founder-header-cta" data-marketing-event="enquiry_click"><span>Start a project ↗</span><FounderAvatar compact /></a>
        </nav>
      </header>

      <section id="top" className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Founder-led by Sohan Vyaparee · India / Worldwide</p>
          <h1>
            A complete website,
            <span>built around your business.</span>
          </h1>
          <p className="hero-intro">
            Tell me what your business needs. I plan the pages, help shape the message, create the design, build the website, connect the needed tools and take it live.
          </p>
          <div className="hero-clarity" aria-label="How a complete website project works">
            {heroClarity.map((item, index) => (
              <div key={item.label}>
                <span>0{index + 1} · {item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <a href="/services/complete-website-launch#scope" className="primary-action">See website options <span>↗</span></a>
            <a href="/work" className="text-action" data-marketing-event="proof_click">See the work <span>↗</span></a>
          </div>
          <p className="fit-note">Focused websites from $1,500 · complete business websites from $3,000 · one private brief · no account required.</p>
        </div>

        <DirectionBoard />
      </section>

      <section className="website-paths section-shell" aria-labelledby="website-paths-title">
        <div className="website-paths-heading"><span id="website-paths-title">What do you need?</span><p>Choose the closest starting point. I will confirm the right scope after reading your brief.</p></div>
        <div className="website-paths-grid">
          {websitePaths.map((path) => (
            <a key={path.label} href={path.href}>
              <span>{path.label}</span>
              <strong>{path.detail}</strong>
              <small>{path.price} · See details →</small>
            </a>
          ))}
        </div>
      </section>

      <section className="positioning-section section-shell">
        <p className="section-index">01 · Why one studio</p>
        <div className="positioning-grid">
          <h2>Your message, design and website should <em>work together.</em></h2>
          <div>
            <p>When planning, writing, design and development are split between different people, the website can look finished but still feel confusing.</p>
            <p>With SP Studios, one person stays responsible from the first business question to the final mobile check. AI helps me work faster; the important decisions and final quality stay human.</p>
            <div className="founder-note">
              <span>Founder perspective</span>
              <strong>I also built the ordering experience for my own food business, so I care what happens after a customer clicks—not only how the page looks.</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="section-shell work-heading">
          <div>
            <p className="section-index light">02 · Work you can inspect</p>
            <h2>Website and product work you can open and judge.</h2>
          </div>
          <p>Each project says what is live, what I built and what is only a concept.<a href="/work" className="work-index-link">See all work →</a></p>
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
                  <a href="/services/d2c-commerce-launch">D2C launch service →</a>
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
              <div><p>Private real-estate platform concept</p><h3>Making a private property network easy to use.</h3></div>
              <div><p>A self-started concept showing member checks, hidden property details, access requests, signed documents, private matches and deal-room messages.</p><a href="/work/private-market-concept">View concept study →</a><span className="concept-label">Concept study · Not a client project</span></div>
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
              <span className="studio-mark">SP</span>
              <div><p>Positioning · Proof · Qualification</p><strong>One path<br />from visit to brief.</strong></div>
            </div>
            <div className="project-copy">
              <div><p>SP Studios · Website and lead system</p><h3>Turning many skills into a simple client journey.</h3></div>
              <div><p>This website itself: clear services, honest work examples, price guidance, a project form, visitor-source tracking and a private lead dashboard.</p><a href="/work/studio-system">View the website case study →</a><span className="concept-label">Self-started · Not a client result</span></div>
            </div>
          </article>
        </div>
      </section>

      <section id="approach" className="process-section section-shell">
        <div className="section-heading-row">
          <div><p className="section-index">03 · How it works</p><h2>How your website gets built.</h2></div>
          <p>You deal with one person from the first plan to the live website.</p>
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
          <div><p className="section-index light">04 · Faster production</p><h2>AI helps me move faster. Decisions stay human.</h2></div>
          <div>
            <p className="ai-lead">I use AI to research, explore ideas, test different screen sizes and build faster.</p>
            <p>I still decide what the business should say, what customers need to see and what is good enough to launch.</p>
            <div className="ai-rules">
              <span><i>+</i> Faster research and building</span>
              <span><i>+</i> More time for testing and polish</span>
              <span><i>−</i> No generic AI templates</span>
              <span><i>−</i> No fake work or invented results</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-shell">
        <div className="section-heading-row">
          <div><p className="section-index">05 · Website options</p><h2>Choose the website you need.</h2></div>
          <p>These are starting prices. You receive a written list of pages, features, timing and payment stages before work begins.</p>
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
        <aside className="delivery-speed-note" aria-labelledby="delivery-speed-title">
          <span>Clear timelines</span>
          <strong id="delivery-speed-title">Most business websites take days or weeks—not open-ended months.</strong>
          <p>A prepared one-to-three-page website can launch in about one working week. A complete business website usually takes seven to fifteen working days. Stores, migrations and custom systems take longer, so the real timeline is written before work begins.</p>
        </aside>
        <aside className="launch-system-callout" aria-labelledby="launch-system-title">
          <div>
            <p>For a larger or international project</p>
            <h3 id="launch-system-title">International or Complex Website</h3>
          </div>
          <div>
            <strong>$6,500+ <small>USD · custom scope</small></strong>
            <p>For an online store, SaaS product, hospitality business or high-trust service that needs five to eight important pages, custom design, one agreed integration, testing and launch support. Typical delivery is four to eight weeks when content and access are ready.</p>
          </div>
          <div className="launch-system-actions">
            <a href="/services/complete-website-launch#scope" className="launch-primary-link">Compare all website options <span>↗</span></a>
            <a href="/services/d2c-commerce-launch" className="launch-specialist-link">Online store? <span>See ecommerce websites →</span></a>
            <a href="/services/b2b-lead-generation-websites" className="launch-specialist-link">B2B or manufacturing? <span>See B2B websites →</span></a>
          </div>
        </aside>
        <a href="/services/complete-website-launch" className="service-detail-link">See prices, process and common questions <span>↗</span></a>
      </section>

      <section className="fit-section section-shell">
        <div className="fit-card fit-yes">
          <p>Good fit</p>
          <h2>You need help deciding what the website should say and do.</h2>
          <ul>
            <li>A new business, offer or product needs its first credible website</li>
            <li>Your current site no longer reflects the quality of the company</li>
            <li>You want strategy, design and build owned by one partner</li>
            <li>You value distinctive direction and are ready to make decisions</li>
          </ul>
        </div>
        <div className="fit-card fit-no">
          <p>Not the right fit</p>
          <h2>You only need a small technical task.</h2>
          <ul>
            <li>A finished design converted to code without creative input</li>
            <li>A one-hour fix, bug ticket or long-term hourly development role</li>
            <li>A copied template, speculative unpaid pitch or cheapest quote</li>
            <li>Unlimited revisions without a defined decision process</li>
          </ul>
        </div>
      </section>

      <section id="about" className="about-section section-shell">
        <p className="section-index">06 · Who you work with</p>
        <div className="about-grid">
          <figure className="founder-portrait">
            <Image src="/founder-working-professional.jpg" width={941} height={1672} sizes="(max-width: 1080px) 91vw, 36vw" alt="Sohan Vyaparee, founder and website creative director, working on a laptop" />
            <figcaption><span>Founder · Director · Builder</span><strong>Sohan Vyaparee</strong></figcaption>
          </figure>
          <div>
            <h2>Sohan personally directs every website from plan to launch.</h2>
            <p>I’m Sohan Vyaparee, founder and creative director of SP Studios—and the founder behind BongFoods. I help businesses turn an idea, offer or outdated presence into one clear, customer-ready website.</p>
            <p>My background in creative direction and advertising helps the website feel distinctive. Building and operating my own food business keeps that creativity practical: Will people understand it? Trust it? Act on it?</p>
            <p>I use an AI-assisted workflow to research, test and build faster, but I personally direct the message, design and final quality.</p>
            <div className="about-links"><a href="/work">See all website work →</a><a href="https://www.linkedin.com/in/sohan-vyaparee-397a29352/" target="_blank" rel="noreferrer">View LinkedIn ↗</a><a href="/trust">How projects are protected ↗</a><a href="/partners">For agencies & collaborators ↗</a></div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-shell contact-grid">
          <div>
            <p className="section-index light">07 · Start a project</p>
            <h2>Tell me what website you need.</h2>
            <p className="contact-intro">Send one short brief about the business, goal and timing. It goes into my private project inbox—no account or repeated messages.</p>
            <div className="contact-signal"><FounderAvatar /><span><strong>Private project inbox</strong>Reviewed personally by Sohan</span></div>
          </div>

          <ProjectBrief />
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="#top" className="wordmark light-mark"><span>SP</span><strong>SP Studios</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Independent digital studio · Directed by Sohan Vyaparee</span><span><a href="/trust">Trust & payments</a> · <a href="/privacy">Privacy</a> · <a href="/partners">Collaboration</a> · © 2026 Sohan Vyaparee</span></div>
      </footer>
    </main>
  );
}
