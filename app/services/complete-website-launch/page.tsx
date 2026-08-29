/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';
import { ProjectBrief } from '../../project-brief';

const siteUrl = 'https://sohan-website-studio.vercel.app';

export const metadata: Metadata = {
  title: 'Complete Website Design & Development for Founders | Sohan Vyaparee',
  description: 'One accountable partner for website strategy, original art direction, UX, responsive development, integrations, QA and launch. Projects start at $499.',
  alternates: { canonical: '/services/complete-website-launch' },
  keywords: [
    'complete website design and development',
    'website designer for founders',
    'business website design India',
    'startup website design and development',
    'website strategy design build launch',
  ],
  openGraph: {
    title: 'One partner. From first question to live website.',
    description: 'Complete website direction, design, development, integrations and launch for founders and growing businesses.',
    type: 'website',
    url: '/services/complete-website-launch',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Complete websites from business idea to launch by Sohan Vyaparee' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One partner. From first question to live website.',
    description: 'Complete website direction, design, development, integrations and launch.',
    images: ['/og.png'],
  },
};

const responsibilities = [
  { number: '01', title: 'Business direction', copy: 'Clarify the offer, audience, proof and decision the website needs to support.' },
  { number: '02', title: 'Message structure', copy: 'Turn the business story into a useful sitemap, page hierarchy and calls to action.' },
  { number: '03', title: 'Original art direction', copy: 'Create a visual language that belongs to the business instead of borrowing a generic template.' },
  { number: '04', title: 'Responsive experience', copy: 'Design the real customer journey across mobile, tablet and desktop—not one static canvas.' },
  { number: '05', title: 'Build & integrations', copy: 'Implement the approved direction with the CMS, forms, commerce, booking or API connection it needs.' },
  { number: '06', title: 'QA & launch', copy: 'Test the important journeys, prepare deployment and stay accountable through go-live.' },
];

const useCases = [
  {
    label: 'New business',
    title: 'Launch with credibility from the first serious visit.',
    copy: 'For a founder who has the business idea and needs the positioning, website and enquiry path shaped into one market-ready experience.',
  },
  {
    label: 'Growing company',
    title: 'Make the website represent the quality you already deliver.',
    copy: 'For a company whose current site feels smaller, older or less coherent than the real work, team or customer experience.',
  },
  {
    label: 'Connected experience',
    title: 'Move beyond a brochure into a working business journey.',
    copy: 'For restaurants, hospitality, services, commerce or platforms that need ordering, booking, lead qualification, private access or another real workflow.',
  },
];

const phases = [
  { number: '01', title: 'Direction', copy: 'Offer, audience, proof, sitemap, page priorities and one agreed outcome.', output: 'Direction brief' },
  { number: '02', title: 'Experience', copy: 'Original visual system, responsive page concepts, content hierarchy and interaction decisions.', output: 'Approved design direction' },
  { number: '03', title: 'Build', copy: 'Responsive implementation, content assembly, forms, CMS and agreed integration.', output: 'Working production site' },
  { number: '04', title: 'Launch', copy: 'Cross-device QA, performance pass, metadata, deployment and practical handover.', output: 'Live customer-ready website' },
];

const engagements = [
  { name: 'Launch Essentials', price: '$499', pages: '1–3 purposeful pages', fit: 'Focused launch, offer or small business', timing: '7–10 working days' },
  { name: 'Business Launch', price: '$999', pages: 'Up to 5 custom pages', fit: 'Complete public business website', timing: '2–3 weeks' },
  { name: 'Signature + Integration', price: '$1,799', pages: '6–8 custom pages', fit: 'Deeper story plus one agreed integration', timing: '3–5 weeks' },
];

const faqs = [
  {
    question: 'Do I need finished copy or designs before we begin?',
    answer: 'No. The engagement is designed for founders who need the website shaped, not only assembled. I help define the structure, proof, page priorities and copy framework before translating the direction into design and build.',
  },
  {
    question: 'What platform will the website use?',
    answer: 'The platform follows the business need. A focused marketing site may use Next.js; content-heavy projects may need a CMS; commerce may suit Shopify or another agreed stack. The written proposal names the platform and explains the choice before work begins.',
  },
  {
    question: 'Can you connect forms, booking, payments, WhatsApp or a CRM?',
    answer: 'Yes, when the integration is part of the agreed scope. I map the customer-facing journey first, then connect the practical system behind it. Complex or multiple integrations are quoted after the workflow is understood.',
  },
  {
    question: 'How do revisions work?',
    answer: 'Each phase has a clear decision and two structured feedback rounds. New requirements are not hidden inside unlimited revisions; they are documented and priced separately so the original launch stays predictable.',
  },
  {
    question: 'How do you use AI in the process?',
    answer: 'AI helps accelerate research, exploration, implementation and testing. It does not decide the positioning, invent proof or replace human judgment. The final direction, taste and launch accountability stay with me.',
  },
  {
    question: 'What happens after launch?',
    answer: 'Every project includes launch support and a practical handover. Ongoing improvements, content work or maintenance can be scoped separately if the business needs them; the engagement does not force an unnecessary monthly retainer.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Complete Website Design and Development',
  serviceType: 'Website strategy, design, development, integrations and launch',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Sohan Vyaparee — Independent Website Studio',
    url: siteUrl,
  },
  areaServed: 'Worldwide',
  description: 'Complete website engagements for founders and growing businesses, from business direction and original design through responsive development, integrations, QA and launch.',
  offers: engagements.map((engagement) => ({
    '@type': 'Offer',
    name: engagement.name,
    price: engagement.price.replace('$', '').replace(',', ''),
    priceCurrency: 'USD',
    description: `${engagement.pages}. ${engagement.fit}.`,
  })),
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

export default function CompleteWebsiteLaunchPage() {
  return (
    <main id="top" className="service-page">
      <header className="site-header service-site-header">
        <a href="/" className="wordmark" aria-label="Sohan Vyaparee — home">
          <span>SV</span>
          <strong>Sohan Vyaparee</strong>
        </a>
        <nav aria-label="Service navigation">
          <a href="#proof">Proof</a>
          <a href="#process">Process</a>
          <a href="#scope">Scope</a>
          <a href="#brief" className="header-cta" data-marketing-event="enquiry_click">Start a project ↗</a>
        </nav>
      </header>

      <section className="service-hero section-shell">
        <div className="service-hero-copy">
          <p className="eyebrow"><span /> Complete website design & development</p>
          <h1>One partner.<span>From first question to live website.</span></h1>
          <p>I help founders turn a business idea, serious redesign or disconnected customer journey into one original, responsive website—then carry the direction through development, integrations, QA and launch.</p>
          <div className="hero-actions">
            <a href="#brief" className="primary-action" data-marketing-event="enquiry_click">Describe the project <span>↗</span></a>
            <a href="#proof" className="text-action">See honest proof <span>↓</span></a>
          </div>
          <small>Independent studio · India / Worldwide · Projects from $499</small>
        </div>

        <aside className="responsibility-board" aria-label="What the complete website engagement includes">
          <div className="responsibility-heading"><span>What I take responsibility for</span><b>01—06</b></div>
          <div className="responsibility-list">
            {responsibilities.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div><h2>{item.title}</h2><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="service-signal-strip" aria-label="Studio working model">
        <div><span>One direction</span><strong>Strategy through launch</strong></div>
        <div><span>Clear response</span><strong>Normally within 2 working days</strong></div>
        <div><span>Working model</span><strong>Fixed scope before production</strong></div>
      </section>

      <section className="service-intent section-shell">
        <p className="section-index">01 · The actual need</p>
        <div>
          <h2>You do not need more web tasks. <em>You need the decisions to connect.</em></h2>
          <div className="service-intent-copy">
            <p>A complete website is not strategy handed to one person, copy handed to another, a design file passed to a coder, and a launch nobody owns.</p>
            <p>The business story, proof, interaction and technical result should feel like one decision. I stay close enough to the whole problem to protect that coherence.</p>
          </div>
        </div>
      </section>

      <section className="service-use-cases section-shell">
        {useCases.map((useCase, index) => (
          <article key={useCase.label}>
            <div><span>0{index + 1}</span><small>{useCase.label}</small></div>
            <h2>{useCase.title}</h2>
            <p>{useCase.copy}</p>
          </article>
        ))}
      </section>

      <section id="process" className="service-process">
        <div className="section-shell">
          <div className="service-section-heading">
            <div><p className="section-index light">02 · Delivery system</p><h2>Four decisions between blank page and launch.</h2></div>
            <p>Every phase has a concrete output, feedback window and approval point. You know what is being decided before production moves forward.</p>
          </div>
          <div className="service-phase-grid">
            {phases.map((phase) => (
              <article key={phase.number}>
                <span>{phase.number}</span>
                <h3>{phase.title}</h3>
                <p>{phase.copy}</p>
                <small>{phase.output}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="service-proof section-shell">
        <div className="service-section-heading dark-heading">
          <div><p className="section-index">03 · Honest proof</p><h2>Real work is real. Concept work is labelled.</h2></div>
          <p>I do not borrow agency credits, invent conversion metrics or make a speculative project sound commissioned.</p>
        </div>
        <div className="service-proof-grid">
          <article className="proof-food">
            <div className="proof-visual"><span>B</span><i>Live product</i></div>
            <div><small>Founder-built restaurant commerce</small><h3>BongFoods — from craving to confirmed order.</h3><p>Product direction, UX/UI, responsive implementation, phone verification, cart, address, delivery-area logic, payments and launch for my own operating food business.</p><a href="/work/bongfoods">View the live-product case study →</a></div>
          </article>
          <article className="proof-market">
            <div className="proof-visual"><span>P</span><i>Speculative concept</i></div>
            <div><small>Independent product exploration</small><h3>Private market — designing trust through controlled access.</h3><p>A truth-labelled concept for verified members, anonymized opportunities, access requests, NDA gates, matching and a private deal room.</p><a href="/work/private-market-concept">View the speculative case study →</a></div>
          </article>
        </div>
      </section>

      <section id="scope" className="service-scope section-shell">
        <div className="service-section-heading dark-heading">
          <div><p className="section-index">04 · Starting engagements</p><h2>A clear place to begin. A written scope before work.</h2></div>
          <p>These are starting points, not a page-count trap. Final price follows the business goal, content readiness, workflow, integrations and launch timing.</p>
        </div>
        <div className="engagement-table" role="table" aria-label="Starting website engagement options">
          <div className="engagement-row engagement-head" role="row"><span role="columnheader">Engagement</span><span role="columnheader">Starting at</span><span role="columnheader">Typical scope</span><span role="columnheader">Best for</span><span role="columnheader">Typical timing</span></div>
          {engagements.map((engagement) => (
            <div className="engagement-row" role="row" key={engagement.name}>
              <strong role="cell">{engagement.name}</strong><b role="cell">{engagement.price}</b><span role="cell">{engagement.pages}</span><span role="cell">{engagement.fit}</span><span role="cell">{engagement.timing}</span>
            </div>
          ))}
        </div>
        <p className="scope-note">Complex products, marketplaces, commerce and multi-integration projects are custom-scoped. When the budget is lower, I reduce scope rather than quietly reduce the thinking or quality.</p>
      </section>

      <section className="service-fit section-shell">
        <div className="fit-card fit-yes">
          <p>Strong fit</p>
          <h2>You need someone to help shape the website and ship it.</h2>
          <ul><li>A real launch or redesign within the next four months</li><li>One decision-maker who can give focused feedback</li><li>Original direction that still serves a practical customer journey</li><li>A working budget aligned with the scope</li></ul>
        </div>
        <div className="fit-card fit-no">
          <p>Not the right engagement</p>
          <h2>You only need isolated execution or the cheapest page.</h2>
          <ul><li>A finished design converted to code without creative input</li><li>Hourly ticket work, employment or staff augmentation</li><li>A copied template or unpaid speculative competition</li><li>Unlimited revisions without a defined decision process</li></ul>
        </div>
      </section>

      <section className="service-faq section-shell">
        <div className="service-faq-heading"><p className="section-index">05 · Practical questions</p><h2>Before you send the brief.</h2></div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{faq.question}</strong><i>+</i></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="brief" className="contact-section service-contact">
        <div className="section-shell contact-grid">
          <div>
            <p className="section-index light">06 · Start with the real project</p>
            <h2>Tell me what the website must make possible.</h2>
            <p className="contact-intro">Send the business, current situation, timing and working budget. I’ll review the goal and tell you honestly whether the fit and starting scope make sense.</p>
            <div className="contact-signal"><i /><span><strong>Private studio inbox</strong>One brief · no mailing list · normally answered within two working days</span></div>
          </div>
          <ProjectBrief />
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SV</span><strong>Sohan Vyaparee</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Service · Complete website launch</span><span>© 2026 Sohan Vyaparee</span></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
