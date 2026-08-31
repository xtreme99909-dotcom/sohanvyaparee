/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';
import { ProjectBrief } from '../../project-brief';
import { publicSiteUrl as siteUrl } from '../../site';
import { FounderAvatar } from '../../founder-avatar';

const servicePath = '/services/d2c-commerce-launch';

export const metadata: Metadata = {
  title: 'D2C & Ecommerce Website Design and Launch | SP Studios',
  description: 'A complete D2C website launch system connecting brand positioning, product discovery, trust, responsive commerce, integrations, QA and launch. Qualified systems start at $6,500+.',
  alternates: { canonical: servicePath },
  keywords: [
    'D2C website design and development',
    'ecommerce website design for startups',
    'Shopify website strategy and design',
    'consumer brand website launch',
    'D2C ecommerce website launch',
  ],
  openGraph: {
    title: 'Your product is not the whole buying journey.',
    description: 'Complete D2C website direction, product discovery, commerce implementation, integrations and launch ownership.',
    type: 'website',
    url: servicePath,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Complete websites from business idea to launch by Sohan Vyaparee' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your product is not the whole buying journey.',
    description: 'A complete D2C launch system from brand direction through commerce and QA.',
    images: ['/og.png'],
  },
};

const journey = [
  { number: '01', label: 'Discover', copy: 'Help the right buyer find the category, collection or product without fighting the catalogue.' },
  { number: '02', label: 'Understand', copy: 'Explain what makes the product different with useful hierarchy, proof and comparison.' },
  { number: '03', label: 'Trust', copy: 'Put ingredients, materials, fit, policies, delivery and real reassurance beside the decision.' },
  { number: '04', label: 'Buy', copy: 'Reduce friction across product choice, variant selection, cart, payment and mobile checkout.' },
  { number: '05', label: 'Return', copy: 'Connect support, order expectations, useful content and later releases without manufactured urgency.' },
];

const systemLayers = [
  { number: '01', title: 'Commercial direction', copy: 'Audience, launch trigger, product story, catalogue shape, proof and the decision the website must improve.' },
  { number: '02', title: 'Product discovery', copy: 'Navigation, collections, filters, comparison and product-page architecture built around how customers actually choose.' },
  { number: '03', title: 'Trust system', copy: 'Claims, ingredients or materials, sizing, policies, delivery, reviews and founder proof placed where doubt appears.' },
  { number: '04', title: 'Commerce build', copy: 'Responsive storefront implementation, content assembly and the agreed platform, payments, forms or operational integrations.' },
  { number: '05', title: 'Launch control', copy: 'Critical-journey QA, metadata, analytics setup, deployment and handover with one person accountable through go-live.' },
];

const launchOutputs = [
  'Positioning and launch-direction brief',
  'Customer journey and page architecture',
  'Original responsive visual direction',
  'Collection and product-detail system',
  'Commerce implementation and content assembly',
  'One agreed integration inside the starting scope',
  'Mobile, cart, form and launch-critical QA',
  'Metadata, deployment and practical handover',
];

const faqs = [
  {
    question: 'Is this only for Shopify brands?',
    answer: 'No. The platform follows the catalogue, team, integrations and operating model. Shopify can be appropriate for a commerce-first brand, while another CMS or custom stack may fit a different launch. The proposal names the platform and explains the choice before production starts.',
  },
  {
    question: 'Can you migrate an existing store?',
    answer: 'Yes, after the products, customers, orders, content, redirects, apps and operational dependencies are mapped. Migration is never silently included in a page-price promise; it is scoped as a controlled workstream so live business data is protected.',
  },
  {
    question: 'Do you write product claims or invent reviews?',
    answer: 'No. I structure approved evidence and help identify missing content, but the business remains responsible for factual, legal, medical, nutritional or performance claims. Reviews, certifications and outcomes are never invented.',
  },
  {
    question: 'What integrations can be included?',
    answer: 'The starting system can include one agreed integration such as email capture, WhatsApp, payments, shipping, booking, CRM or another practical workflow. Multiple apps, custom APIs, subscriptions, complex fulfilment or marketplace operations are scoped after the dependencies are understood.',
  },
  {
    question: 'How much does a D2C launch website cost?',
    answer: 'The International Launch System starts at $6,500 for a qualified launch with five to eight launch-critical pages, original direction, implementation, one agreed integration, QA and launch ownership. Larger catalogues, migrations, custom operations, multiple integrations or content production increase the written scope.',
  },
  {
    question: 'What must the founder or team provide?',
    answer: 'One decision-maker, timely feedback, product facts, approved claims, commercial policies, required account access and a realistic launch date. I can shape the content structure, but the business must verify the information customers will rely on.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}${servicePath}#service`,
  name: 'D2C and Ecommerce Website Design and Launch',
  serviceType: 'D2C website strategy, UX/UI design, commerce development, integrations, QA and launch',
  provider: { '@type': 'ProfessionalService', '@id': `${siteUrl}/#studio`, name: 'SP Studios', url: siteUrl },
  areaServed: 'Worldwide',
  audience: { '@type': 'BusinessAudience', audienceType: 'Founder-led consumer and D2C brands' },
  description: 'A complete D2C website launch system connecting brand positioning, product discovery, trust, responsive commerce, integrations, QA and launch ownership.',
  offers: {
    '@type': 'Offer',
    name: 'International Launch System',
    price: '6500',
    priceCurrency: 'USD',
    description: 'Starting scope for qualified D2C launches. Final price follows catalogue, content, integrations, migration and launch risk.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Complete Website Launch', item: `${siteUrl}/services/complete-website-launch` },
    { '@type': 'ListItem', position: 3, name: 'D2C Commerce Launch', item: `${siteUrl}${servicePath}` },
  ],
};

export default function D2CCommerceLaunchPage() {
  return (
    <main id="top" className="service-page d2c-service-page">
      <header className="site-header service-site-header">
        <a href="/" className="wordmark" aria-label="SP Studios — home"><span>SP</span><strong>SP Studios</strong></a>
        <nav aria-label="D2C service navigation">
          <a href="#journey">Buying journey</a>
          <a href="#proof">Live work</a>
          <a href="#investment">Price</a>
          <a href="#brief" className="header-cta founder-header-cta" data-marketing-event="enquiry_click"><span>Start a project ↗</span><FounderAvatar compact /></a>
        </nav>
      </header>

      <section className="service-hero section-shell d2c-hero">
        <div className="service-hero-copy">
          <p className="eyebrow"><span /> Online store and D2C websites</p>
          <h1>A store that helps people <span>understand, trust and buy.</span></h1>
          <p>I help product businesses plan and build the whole buying journey—from finding the right product to trusting it, paying and knowing what happens next.</p>
          <div className="hero-actions">
            <a href="#brief" className="primary-action" data-marketing-event="enquiry_click">Tell me about your store <span>↗</span></a>
            <a href="#journey" className="text-action">See how it works <span>↓</span></a>
          </div>
          <small>Independent studio · India / Worldwide · Qualified launch systems from $6,500</small>
        </div>

        <aside className="d2c-journey-board" aria-label="D2C customer journey from discovery to repeat relationship">
          <div className="d2c-board-head"><span>Customer journey</span><b>Connected, not decorated</b></div>
          <div className="d2c-product-card">
            <div className="d2c-product-kicker"><span>01 · Product truth</span><i>In stock</i></div>
            <h2>Make the value clear before the scroll becomes work.</h2>
            <div className="d2c-proof-line"><span>What it is</span><span>Why it matters</span><span>Why trust it</span></div>
          </div>
          <div className="d2c-route-list">
            {journey.map((item) => <div key={item.number}><span>{item.number}</span><strong>{item.label}</strong><i /></div>)}
          </div>
          <div className="d2c-board-foot"><span>Mobile decision path</span><strong>Product → confidence → checkout</strong></div>
        </aside>
      </section>

      <section className="service-signal-strip" aria-label="D2C launch working model">
        <div><span>System</span><strong>Brand through checkout</strong></div>
        <div><span>Starting scope</span><strong>$6,500+ after qualification</strong></div>
        <div><span>Accountability</span><strong>Direction through launch QA</strong></div>
      </section>

      <section id="journey" className="service-intent section-shell">
        <p className="section-index">01 · The commercial problem</p>
        <div>
          <h2>A beautiful storefront can still make the buyer <em>work too hard.</em></h2>
          <div className="service-intent-copy">
            <p>D2C websites fail quietly when navigation mirrors internal categories, product pages hide the proof, policies arrive after doubt and mobile checkout becomes the first real test.</p>
            <p>The work is to connect brand desire with practical confidence: what this is, who it is for, how to choose, why to trust it and what happens after payment.</p>
          </div>
        </div>
      </section>

      <section className="service-use-cases section-shell d2c-friction-grid">
        <article><div><span>01</span><small>Discovery</small></div><h2>The catalogue does not explain how people choose.</h2><p>Collections, filters, search and product hierarchy should follow customer decisions—not only the inventory sheet.</p></article>
        <article><div><span>02</span><small>Trust</small></div><h2>The strongest proof is separated from the moment of doubt.</h2><p>Materials, ingredients, fit, origin, policies, delivery and approved claims belong beside the decision they support.</p></article>
        <article><div><span>03</span><small>Operations</small></div><h2>The launch page and the real fulfilment journey disagree.</h2><p>Payments, shipping, support, WhatsApp, email and analytics must reflect what the team can actually operate after go-live.</p></article>
      </section>

      <section className="service-process d2c-system-section">
        <div className="section-shell">
          <div className="service-section-heading">
            <div><p className="section-index light">02 · The connected system</p><h2>Five layers. One buying experience.</h2></div>
            <p>The storefront is only credible when the brand promise, product information and operational reality agree across every important screen.</p>
          </div>
          <div className="d2c-system-grid">
            {systemLayers.map((layer) => <article key={layer.number}><span>{layer.number}</span><div><h3>{layer.title}</h3><p>{layer.copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="proof" className="d2c-proof section-shell">
        <div className="service-section-heading dark-heading">
          <div><p className="section-index">03 · Relevant proof</p><h2>A real commerce system I built and operate.</h2></div>
          <p>BongFoods is founder-built proof, not a borrowed client credit. I directed the product experience and implemented the path from discovery to confirmed order for my own operating food business.</p>
        </div>
        <div className="d2c-proof-card">
          <div className="d2c-proof-mark"><span>B</span><small>Live founder-built product</small></div>
          <div>
            <p className="eyebrow"><span /> BongFoods · restaurant commerce</p>
            <h3>Craving, phone verification, cart, address, delivery area and payment—one mobile journey.</h3>
            <p>The case shows product direction, UX/UI, responsive implementation and connected ordering logic. It does not claim invented client revenue or third-party conversion results.</p>
            <a href="/work/bongfoods">View the live-product case study →</a>
          </div>
        </div>
      </section>

      <section className="d2c-deliverables section-shell">
        <div>
          <p className="section-index">04 · Starting launch system</p>
          <h2>What the first complete scope can include.</h2>
          <p>Five to eight launch-critical pages, one coherent product system and one agreed integration—adapted to the real catalogue, content and launch risk.</p>
        </div>
        <ol>{launchOutputs.map((output, index) => <li key={output}><span>{String(index + 1).padStart(2, '0')}</span><strong>{output}</strong></li>)}</ol>
      </section>

      <section id="investment" className="d2c-investment">
        <div className="section-shell d2c-investment-grid">
          <div><p className="section-index light">05 · Investment boundary</p><h2>Launch systems start at <em>$6,500.</em></h2></div>
          <div>
            <p>This is not a blanket store price. Final investment follows catalogue size, product content, migration, custom operations, integrations, launch timing and the team’s readiness to decide.</p>
            <ul><li>Focused 5–8 page launch-critical scope</li><li>Original direction and responsive implementation</li><li>One agreed integration inside the starting boundary</li><li>QA, deployment and launch handover</li></ul>
            <a href="#brief" className="primary-action light-action" data-marketing-event="enquiry_click">Describe the launch <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="service-fit section-shell d2c-fit">
        <div className="fit-card fit-yes"><p>Strong fit</p><h2>The business is ready to make connected launch decisions.</h2><ul><li>A product launch, serious redesign or commerce expansion within four months</li><li>One decision-maker and approved product facts</li><li>A real need across discovery, trust, commerce or operations</li><li>A working budget aligned with a complete launch system</li></ul></div>
        <div className="fit-card fit-no"><p>Not the right engagement</p><h2>The request is only a theme swap or isolated task.</h2><ul><li>A copied template without strategic direction</li><li>Hourly coding tickets or staff augmentation</li><li>Unverified health, performance or sustainability claims</li><li>Unlimited products, revisions or integrations hidden inside a starter price</li></ul></div>
      </section>

      <section className="service-faq section-shell">
        <div className="service-faq-heading"><p className="section-index">06 · Before the brief</p><h2>Practical D2C launch questions.</h2></div>
        <div className="faq-list">
          {faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{faq.question}</strong><i>+</i></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section id="brief" className="contact-section service-contact">
        <div className="section-shell contact-grid">
          <div><p className="section-index light">07 · Start with the real launch</p><h2>Tell me what customers must understand, trust and do.</h2><p className="contact-intro">Send the brand, current storefront or launch state, catalogue, timing and working budget. I’ll review the goal and tell you honestly whether the fit and starting scope make sense.</p><div className="contact-signal"><i /><span><strong>Private studio inbox</strong>One brief · no mailing list · normally answered within two working days</span></div></div>
          <ProjectBrief />
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SP</span><strong>SP Studios</strong></a><p>D2C websites from product truth to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Service · D2C commerce launch</span><span>SP Studios · Directed by Sohan Vyaparee</span></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  );
}
