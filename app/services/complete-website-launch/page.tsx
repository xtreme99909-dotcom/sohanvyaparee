/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';
import { ProjectBrief } from '../../project-brief';
import { ScopePlanner } from '../../scope-planner';
import { publicSiteUrl as siteUrl } from '../../site';
import { FounderAvatar } from '../../founder-avatar';


export const metadata: Metadata = {
  title: 'Complete Website Design & Development for Founders | SP Studios',
  description: 'One accountable partner for website strategy, original art direction, UX, responsive development, integrations, QA and launch. Focused launches start at $1,500; connected launch systems at $6,500+.',
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
  { number: '01', title: 'Website plan', copy: 'Decide what the website must explain, who it is for and what visitors should do.' },
  { number: '02', title: 'Page structure', copy: 'Turn the business story into a clear page list, content order and calls to action.' },
  { number: '03', title: 'Original design', copy: 'Create a visual style that belongs to the business instead of using a generic template.' },
  { number: '04', title: 'Mobile and desktop', copy: 'Make the real customer journey easy to use across phones, tablets and computers.' },
  { number: '05', title: 'Build and connections', copy: 'Build the approved design with the forms, store, booking or other tools it needs.' },
  { number: '06', title: 'Testing and launch', copy: 'Check the important journeys, prepare deployment and stay responsible through launch.' },
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
  { number: '01', title: 'Plan', copy: 'Offer, audience, proof, page list, priorities and one agreed result.', output: 'Website plan' },
  { number: '02', title: 'Design', copy: 'Original visual style, responsive page designs, content order and interaction decisions.', output: 'Approved website design' },
  { number: '03', title: 'Build', copy: 'Responsive implementation, content assembly, forms, CMS and agreed integration.', output: 'Working production site' },
  { number: '04', title: 'Launch', copy: 'Cross-device QA, performance pass, metadata, deployment and practical handover.', output: 'Live customer-ready website' },
];

const internationalWorkingModel = [
  {
    label: 'Scope & currency',
    title: 'One written commercial decision.',
    copy: 'The proposal names the deliverables, timing, dependencies and one agreed billing currency before production begins. Exchange-rate ambiguity is not introduced halfway through the project.',
  },
  {
    label: 'Collaboration',
    title: 'Async by default. Live when useful.',
    copy: 'A shared decision trail, focused feedback windows and milestone reviews keep the work moving across time zones. Calls are used for decisions that genuinely benefit from them—not as a substitute for progress.',
  },
  {
    label: 'Milestones',
    title: '50 / 30 / 20 protects both sides.',
    copy: 'The usual structure is 50% to reserve the project, 30% at the agreed design or build approval point and 20% before production launch or final handover. The exact gates are written into the scope.',
  },
  {
    label: 'Payment boundary',
    title: 'Private, verified and tied to the agreement.',
    copy: 'Payment instructions follow an accepted proposal and agreement; there is no public arbitrary-amount checkout. Funds count only after the approved payment provider confirms them. Upwork projects remain inside Upwork escrow.',
  },
];

const engagements = [
  { name: 'Focused Website', price: '$1,500+', schemaPrice: '1500', pages: '1–3 purposeful pages', fit: 'Narrow offer or focused first launch', timing: '5–7 working days' },
  { name: 'Complete Business Website', price: '$3,000+', schemaPrice: '3000', pages: 'Up to 5 custom pages', fit: 'Complete public business website', timing: '7–15 working days' },
  { name: 'Website + Integration', price: '$5,000+', schemaPrice: '5000', pages: '6–8 custom pages', fit: 'Deeper story plus one agreed integration', timing: '3–6 weeks' },
  { name: 'International or Complex Website', price: '$6,500+', schemaPrice: '6500', pages: '5–8 launch-critical pages', fit: 'D2C, SaaS, hospitality or high-trust launch', timing: '4–8 weeks' },
];

const faqs = [
  {
    question: 'How quickly can the website launch?',
    answer: 'A prepared one-to-three-page launch can often ship in five to seven working days. A complete business site is usually seven to fifteen working days, while a signature or integrated launch commonly takes three to eight weeks. Complex platforms, migrations, multiple integrations or heavy content production can require six to twelve weeks or longer. These windows depend on a defined scope, prepared facts and assets, required account access, one decision-maker and timely feedback; the proposal names the real schedule before production.',
  },
  {
    question: 'Why do focused launches start at $1,500 while connected systems start at $6,500?',
    answer: 'They solve different problems. The focused engagement is a deliberately narrow one-to-three-page launch with one primary conversion and no complex workflow. A connected launch system carries a broader business story through original design, five to eight launch-critical pages, implementation, an agreed integration, QA and launch ownership. The written scope makes that boundary explicit before work begins.',
  },
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
    question: 'Can you work with a business outside India?',
    answer: 'Yes. International engagements use one written scope, one agreed billing currency, clear approval gates and milestone-based payments. Collaboration is designed to work asynchronously across time zones, with live sessions only where they help a real decision. Payment instructions are shared privately after the proposal and agreement are accepted; I never ask a client to send card credentials, a PIN or an OTP directly.',
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
    '@id': `${siteUrl}/#studio`,
    name: 'SP Studios',
    url: siteUrl,
  },
  areaServed: 'Worldwide',
  description: 'Complete website engagements for founders and growing businesses, from business direction and original design through responsive development, integrations, QA and launch.',
  offers: engagements.map((engagement) => ({
    '@type': 'Offer',
    name: engagement.name,
    price: engagement.schemaPrice,
    priceCurrency: 'USD',
    description: `${engagement.pages}. ${engagement.fit}. Typical delivery: ${engagement.timing}.`,
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SP Studios', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Complete Website Design and Development', item: `${siteUrl}/services/complete-website-launch` },
  ],
};

export default function CompleteWebsiteLaunchPage() {
  return (
    <main id="top" className="service-page">
      <header className="site-header service-site-header">
        <a href="/" className="wordmark" aria-label="SP Studios — home">
          <span>SP</span>
          <strong>SP Studios</strong>
        </a>
        <nav aria-label="Service navigation">
          <a href="#proof">Work</a>
          <a href="#process">How it works</a>
          <a href="#scope">Prices</a>
          <a href="#brief" className="header-cta founder-header-cta" data-marketing-event="enquiry_click"><span>Start a project ↗</span><FounderAvatar compact /></a>
        </nav>
      </header>

      <section className="service-hero section-shell">
        <div className="service-hero-copy">
          <p className="eyebrow"><span /> Complete business websites</p>
          <h1>One person to plan, design, build <span>and launch your website.</span></h1>
          <p>You bring the business goal. I help shape the message, design the pages, build the website, connect the tools it needs and take it live.</p>
          <div className="hero-actions">
            <a href="#brief" className="primary-action" data-marketing-event="enquiry_click">Tell me what you need <span>↗</span></a>
            <a href="#proof" className="text-action">See the work <span>↓</span></a>
          </div>
          <small>Independent studio · India / Worldwide · Focused launches from $1,500 · Complete business sites from $3,000</small>
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
            <div><small>Founder-built restaurant commerce</small><h3>BongFoods — from craving to confirmed order.</h3><p>Product direction, UX/UI, responsive implementation, phone verification, cart, address, delivery-area logic, payments and launch for my own operating food business.</p><a href="/work/bongfoods" data-marketing-event="proof_click">View the live-product case study →</a></div>
          </article>
          <article className="proof-market">
            <div className="proof-visual"><span>P</span><i>Speculative concept</i></div>
            <div><small>Independent product exploration</small><h3>Private market — designing trust through controlled access.</h3><p>A truth-labelled concept for verified members, anonymized opportunities, access requests, NDA gates, matching and a private deal room.</p><a href="/work/private-market-concept" data-marketing-event="proof_click">View the speculative case study →</a></div>
          </article>
          <article className="proof-studio">
            <div className="proof-visual"><span>SP</span><i>Live self-initiated system</i></div>
            <div><small>Operating acquisition and qualification system</small><h3>Studio system — connecting the public story to a useful project brief.</h3><p>Positioning, truth-labelled proof, scope guidance, project qualification, source attribution and persistent owner triage shaped as one live business journey. This proves the connected system without claiming client results or guaranteed leads.</p><a href="/work/studio-system" data-marketing-event="proof_click">View the live-system case study →</a></div>
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
        <p className="scope-note">The $1,500 starting point is deliberately narrow and normally moves in five to seven working days when the inputs are ready. A complete business website starts at $3,000 and is typically seven to fifteen working days. A connected international launch system begins at $6,500 and usually runs four to eight weeks when the work includes deeper strategy, five to eight launch-critical pages, original direction, implementation, an agreed integration and launch QA. Complex products, marketplaces, migrations and multi-integration work may run six to twelve weeks or longer and remain custom-scoped.</p>
        <a href="/services/d2c-commerce-launch" className="service-detail-link">Launching a consumer brand or storefront? <span>See the D2C commerce system →</span></a>
        <a href="/services/b2b-lead-generation-websites" className="service-detail-link">Need a B2B website that qualifies enquiries? <span>See the lead-generation system →</span></a>
        <a href="#planner" className="service-detail-link">Not sure where the project starts? <span>Build a scope preview ↓</span></a>
      </section>

      <section className="international-working-model" aria-labelledby="international-working-model-title">
        <div className="section-shell">
          <div className="international-working-heading">
            <div>
              <p className="section-index light">Working worldwide</p>
              <h2 id="international-working-model-title">Distance should not make the project vague.</h2>
            </div>
            <p>For an international client, the commercial and decision process should be as considered as the website. Nothing is charged from a public pricing card, and no project starts from a loose chat promise.</p>
          </div>
          <div className="international-working-grid">
            {internationalWorkingModel.map((item, index) => (
              <article key={item.label}>
                <div><span>{String(index + 1).padStart(2, '0')}</span><small>{item.label}</small></div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="international-working-note">Based outside India? Include your country, target market and preferred working time zone in the project goal below. The final proposal will name the currency, milestone gates and payment route before you commit.</p>
          <a href="/trust" className="service-detail-link" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}>How payment, delivery and refunds are documented <span style={{ color: '#d8ff63' }}>Open the trust centre →</span></a>
        </div>
      </section>

      <ScopePlanner />

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
        <div className="service-faq-heading"><p className="section-index">06 · Practical questions</p><h2>Before you send the brief.</h2></div>
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
            <p className="section-index light">07 · Start with the real project</p>
            <h2>Tell me what the website must make possible.</h2>
            <p className="contact-intro">Send the business, current situation, timing and working budget. International clients can add their country, target market and preferred time zone. I’ll review the goal and tell you honestly whether the fit and starting scope make sense.</p>
            <div className="contact-signal"><i /><span><strong>Private studio inbox</strong>One brief · no mailing list · normally answered within two working days</span></div>
          </div>
          <ProjectBrief />
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SP</span><strong>SP Studios</strong></a><p>Complete websites from direction to launch.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Service · Complete website launch</span><span><a href="/trust">Trust & payments</a> · <a href="/terms">Terms</a> · Directed by Sohan Vyaparee</span></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  );
}
