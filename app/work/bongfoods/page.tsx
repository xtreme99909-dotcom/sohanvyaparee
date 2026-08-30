/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BongFoods Case Study — SP Studios',
  description: 'A founder-built restaurant commerce experience shaped from customer journey and visual direction through ordering, payments and launch.',
  alternates: { canonical: '/work/bongfoods' },
  openGraph: {
    title: 'BongFoods — From food discovery to a real order',
    description: 'A live, founder-built restaurant commerce case study by Sohan Vyaparee.',
    type: 'article',
    images: [{ url: '/bongfoods-case-og.png', width: 1280, height: 633, alt: 'BongFoods restaurant commerce case study by Sohan Vyaparee' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BongFoods — From food discovery to a real order',
    description: 'A live, founder-built restaurant commerce case study by Sohan Vyaparee.',
    images: ['/bongfoods-case-og.png'],
  },
};

const enquiryPath = '/services/complete-website-launch#brief';
const scopePath = '/services/complete-website-launch#planner';

const journey = [
  {
    number: '01',
    title: 'Discover',
    copy: 'Lead with appetite, availability and a clear path into today’s menu.',
  },
  {
    number: '02',
    title: 'Choose',
    copy: 'Make dishes, descriptions and prices easy to scan on a phone.',
  },
  {
    number: '03',
    title: 'Verify',
    copy: 'Use phone verification to protect the order flow without creating a heavy account journey.',
  },
  {
    number: '04',
    title: 'Deliver',
    copy: 'Capture the address and validate whether the kitchen can serve that location.',
  },
  {
    number: '05',
    title: 'Confirm',
    copy: 'Carry cart value, payment and confirmation through one connected experience.',
  },
];

const responsibilities = [
  'Business and customer-journey definition',
  'Information architecture and UX flow',
  'Original visual direction and interface design',
  'Responsive front-end implementation',
  'Phone verification and customer state',
  'Cart, address and delivery-area logic',
  'Payment-path integration and launch',
  'Ongoing founder-led product decisions',
];

export default function BongFoodsCaseStudy() {
  return (
    <main id="top" className="case-page">
      <header className="site-header case-header">
        <a href="/" className="wordmark" aria-label="SP Studios — home">
          <span>SP</span>
          <strong>SP Studios</strong>
        </a>
        <nav aria-label="Case study navigation">
          <a href="/work">Selected work</a>
          <a href="https://www.bongfoods.com/" target="_blank" rel="noreferrer">Live website ↗</a>
          <a href={enquiryPath} className="header-cta" data-marketing-event="enquiry_click">Discuss a project ↗</a>
        </nav>
      </header>

      <section className="case-hero section-shell">
        <div className="case-hero-copy">
          <p className="eyebrow"><span /> Case study · Live founder-built product</p>
          <h1 className="case-title">From craving <span>to confirmed order.</span></h1>
          <p className="case-lead">BongFoods is my own cloud-kitchen venture—and the clearest proof that I think beyond the landing page. I shaped the customer journey, visual experience and working commerce flow as one product.</p>
          <div className="hero-actions">
            <a href="https://www.bongfoods.com/" target="_blank" rel="noreferrer" className="primary-action">Experience the live site <span>↗</span></a>
            <a href="#journey" className="text-action">See the product journey <span>↓</span></a>
          </div>
        </div>

        <aside className="case-fact-board" aria-label="BongFoods project facts">
          <div className="case-fact-status"><i /> Live product</div>
          <div className="case-monogram">B</div>
          <dl>
            <div><dt>Business</dt><dd>Restaurant commerce</dd></div>
            <div><dt>Role</dt><dd>Founder · Director · Builder</dd></div>
            <div><dt>Focus</dt><dd>Mobile ordering journey</dd></div>
            <div><dt>Market</dt><dd>Nagpur, India</dd></div>
          </dl>
          <p>No borrowed agency credit. No speculative client claim. A real product built for my own operating business.</p>
        </aside>
      </section>

      <section className="case-statement">
        <div className="section-shell case-statement-grid">
          <p className="section-index light">01 · The real brief</p>
          <h2>A food website has one job: make the next decision feel effortless.</h2>
          <div>
            <p>The customer may arrive hungry, distracted and on a small screen. The experience has to establish appetite and trust quickly, then keep the practical ordering steps understandable.</p>
            <p>This meant treating imagery, menu structure, verification, location eligibility, cart state and payment as one continuous journey—not separate website features.</p>
          </div>
        </div>
      </section>

      <section id="journey" className="case-journey section-shell">
        <div className="case-section-heading">
          <div><p className="section-index">02 · Customer journey</p><h2>Five moments. One clear path.</h2></div>
          <p>Each stage answers the customer’s next practical question before asking for more commitment.</p>
        </div>
        <div className="journey-grid">
          {journey.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-product-stage">
        <div className="section-shell">
          <div className="case-product-label">
            <p className="section-index light">03 · Experience system</p>
            <span>Responsive commerce · Mobile first</span>
          </div>
          <div className="case-browser">
            <div className="case-browser-bar"><i /><i /><i /><span>bongfoods.com</span><b>Live</b></div>
            <div className="case-browser-canvas">
              <div className="case-menu-panel">
                <div className="case-menu-nav"><strong>BongFoods</strong><span>Menu &nbsp; About &nbsp; Bag · 2</span></div>
                <div className="case-menu-hero"><small>Kitchen open · Nagpur</small><h2>Food that feels<br />like home.</h2><p>Authentic Bengali meals, prepared with care and delivered to your door.</p><b>View today’s menu ↗</b></div>
                <div className="case-menu-cards"><i /><i /><i /></div>
              </div>
              <div className="case-checkout-panel">
                <div className="checkout-head"><span>Secure checkout</span><b>02 / 03</b></div>
                <h3>Where should we deliver?</h3>
                <label>Phone verified <i>✓</i></label>
                <div className="checkout-field">Delivery address</div>
                <div className="checkout-zone"><i /> Checking delivery area…</div>
                <div className="checkout-total"><span>Order total</span><strong>₹640</strong></div>
                <div className="checkout-button">Continue to payment <span>→</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-scope section-shell">
        <div className="case-scope-intro">
          <p className="section-index">04 · What I owned</p>
          <h2>Direction and execution stayed connected.</h2>
          <p>Because I was both founder and builder, the website decisions were tested against an operating question: does this make ordering clearer for the customer and more useful for the business?</p>
        </div>
        <div className="scope-list">
          {responsibilities.map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>
          ))}
        </div>
      </section>

      <section className="case-proof section-shell">
        <div className="proof-card">
          <p className="section-index light">05 · What this proves</p>
          <h2>I understand the screen—and the business operating behind it.</h2>
          <p>BongFoods is not presented as a client transformation or a performance case study. It is evidence of end-to-end product thinking: turning a real offer into a coherent, working customer journey and carrying it through launch.</p>
          <a href="https://www.bongfoods.com/" target="_blank" rel="noreferrer">Open the live BongFoods experience ↗</a>
        </div>
        <div className="proof-note">
          <span>Truth label</span>
          <strong>Live founder-built product</strong>
          <p>Built and directed by Sohan Vyaparee for his own cloud-kitchen venture.</p>
        </div>
      </section>

      <section className="case-cta">
        <div className="section-shell case-cta-grid">
          <div><p className="section-index light">Your business · Next</p><h2>Need the complete website—not disconnected pieces?</h2></div>
          <div><p>Use the scope preview to turn what you need into a realistic starting engagement, working budget and project shape before writing the brief.</p><a href={scopePath} className="primary-action light-action">Build your scope preview <span>↗</span></a></div>
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SP</span><strong>SP Studios</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Case study · BongFoods</span><span>SP Studios · Directed by Sohan Vyaparee</span></div>
      </footer>
    </main>
  );
}
