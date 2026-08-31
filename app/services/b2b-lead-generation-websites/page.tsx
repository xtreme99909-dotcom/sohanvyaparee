/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';
import { ProjectBrief } from '../../project-brief';
import { publicSiteUrl as siteUrl } from '../../site';
import { FounderAvatar } from '../../founder-avatar';

const servicePath = '/services/b2b-lead-generation-websites';

export const metadata: Metadata = {
  title: 'B2B Website Design & Lead Generation Systems | SP Studios',
  description: 'Complete B2B websites for manufacturers and service businesses: positioning, original design, qualified-enquiry flows, file uploads, CRM or WhatsApp routing, QA and launch. Business websites start at $3,000+.',
  alternates: { canonical: servicePath },
  keywords: [
    'B2B website design and development',
    'lead generation website for manufacturers',
    'professional services website design',
    'B2B website with CRM integration',
    'website enquiry qualification system',
  ],
  openGraph: {
    title: 'Qualify the enquiry before your team repeats the same call.',
    description: 'A complete B2B website system connecting positioning, proof, enquiry qualification and practical sales routing.',
    type: 'website',
    url: servicePath,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Complete B2B websites by SP Studios' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qualify the enquiry before your team repeats the same call.',
    description: 'B2B website direction, qualified-enquiry workflow, integrations and launch ownership.',
    images: ['/og.png'],
  },
};

const buyerPath = [
  { number: '01', label: 'Find need', copy: 'Help the right buyer recognise their need, market or use case without decoding internal language.' },
  { number: '02', label: 'Understand', copy: 'Explain the offer, process and commercial difference before the first sales conversation.' },
  { number: '03', label: 'Trust', copy: 'Place evidence, capability, constraints and next-step reassurance beside the decision.' },
  { number: '04', label: 'Give details', copy: 'Ask for the use case, volume, timing, geography, budget or files the team needs to assess fit.' },
  { number: '05', label: 'Reach team', copy: 'Send useful context to the right owner, inbox, CRM or WhatsApp workflow without losing attribution.' },
];

const systemLayers = [
  { number: '01', title: 'Commercial direction', copy: 'Clarify the ideal buyer, profitable need, buying trigger, evidence and action the website must support.' },
  { number: '02', title: 'Buyer architecture', copy: 'Shape services, applications, sectors and decision content around buyer questions instead of the company org chart.' },
  { number: '03', title: 'Credibility system', copy: 'Use approved capabilities, process, certifications, founder context, specifications and honest proof where doubt appears.' },
  { number: '04', title: 'Qualified enquiry', copy: 'Design forms, file uploads and conditional questions that capture enough context without turning the brief into paperwork.' },
  { number: '05', title: 'Routing and launch', copy: 'Connect the agreed inbox, CRM or WhatsApp path, preserve attribution, test the journey and stay accountable through go-live.' },
];

const outputs = [
  'Buyer, offer and conversion-direction brief',
  'Information architecture and content framework',
  'Original responsive visual direction',
  'Service, sector or capability page system',
  'Qualified-enquiry and file-upload journey',
  'One agreed CRM, inbox or WhatsApp integration',
  'Mobile, form and launch-critical QA',
  'Metadata, analytics foundation and handover',
];

const faqs = [
  {
    question: 'How much does a B2B lead-generation website cost?',
    answer: 'A complete business website starts at $3,000. A signature system with deeper positioning, six to eight pages and one agreed integration starts at $5,000. Complex catalogues, portals, migrations, calculators, multi-language content or several integrations are custom-scoped after the workflow is understood.',
  },
  {
    question: 'Can enquiries go to our CRM or WhatsApp?',
    answer: 'Yes. The starting integration can route an agreed form and its useful context to a CRM, inbox, WhatsApp workflow or another practical system. Platform access, API limits, approved message templates and data responsibilities are confirmed before production.',
  },
  {
    question: 'Can buyers upload drawings, briefs or reference files?',
    answer: 'Yes, when files are genuinely needed to qualify the opportunity. The proposal defines allowed formats, limits, storage, access and retention so the upload does not become an unmanaged security or privacy risk.',
  },
  {
    question: 'Will the website guarantee leads?',
    answer: 'No responsible studio can guarantee qualified demand. The website can make the offer clearer, strengthen trust, preserve attribution and improve the path from interest to a useful enquiry. Traffic, offer-market fit, sales follow-up and external demand still matter.',
  },
  {
    question: 'Can you improve an existing company website?',
    answer: 'Yes. I first identify where the current site loses clarity, credibility or enquiry context, then scope a redesign, structured migration or focused conversion path. Existing SEO, redirects, analytics, content and live workflows are treated as dependencies—not discarded casually.',
  },
  {
    question: 'What does our team need to provide?',
    answer: 'One decision-maker, accurate capability and product facts, approved proof, required account access, timely feedback and a realistic launch goal. I can shape the story and content framework, but the business verifies the claims customers will rely on.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${siteUrl}${servicePath}#service`,
  name: 'B2B Website Design and Lead Generation System',
  serviceType: 'B2B website strategy, UX/UI design, qualified-enquiry workflow, integrations, QA and launch',
  provider: { '@type': 'ProfessionalService', '@id': `${siteUrl}/#studio`, name: 'SP Studios', url: siteUrl },
  areaServed: 'Worldwide',
  audience: { '@type': 'BusinessAudience', audienceType: 'Manufacturers, professional services and founder-led B2B businesses' },
  description: 'A complete B2B website system connecting positioning, evidence, qualified enquiries, practical routing and launch ownership.',
  offers: [
    { '@type': 'Offer', name: 'Complete Business Website', price: '3000', priceCurrency: 'USD', description: 'Starting scope for a qualified business website. Final scope follows content, workflow, integrations and launch risk.' },
    { '@type': 'Offer', name: 'Signature Website and Integration', price: '5000', priceCurrency: 'USD', description: 'Starting scope for deeper B2B storytelling and one agreed integration.' },
  ],
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
    { '@type': 'ListItem', position: 3, name: 'B2B Lead Generation Websites', item: `${siteUrl}${servicePath}` },
  ],
};

export default function B2BLeadGenerationWebsitesPage() {
  return (
    <main id="top" className="service-page b2b-service-page">
      <header className="site-header service-site-header">
        <a href="/" className="wordmark" aria-label="SP Studios — home"><span>SP</span><strong>SP Studios</strong></a>
        <nav aria-label="B2B service navigation">
          <a href="#buyer-path">Buyer journey</a>
          <a href="#proof">Work</a>
          <a href="#investment">Price</a>
          <a href="#brief" className="header-cta founder-header-cta" data-marketing-event="enquiry_click"><span>Start a project ↗</span><FounderAvatar compact /></a>
        </nav>
      </header>

      <section className="service-hero section-shell b2b-hero">
        <div className="service-hero-copy">
          <p className="eyebrow"><span /> B2B and manufacturing websites</p>
          <h1>Explain what you do. Show proof. <span>Get better enquiries.</span></h1>
          <p>I help manufacturers and service businesses explain their work clearly, show the evidence buyers need and collect useful project details before the first sales conversation.</p>
          <div className="hero-actions">
            <a href="#brief" className="primary-action" data-marketing-event="enquiry_click">Tell me about the website <span>↗</span></a>
            <a href="#buyer-path" className="text-action">See the buyer journey <span>↓</span></a>
          </div>
          <small>Independent studio · India / Worldwide · Complete business websites from $3,000</small>
        </div>

        <aside className="b2b-enquiry-board" aria-label="Illustrative B2B enquiry qualification workflow">
          <div className="b2b-board-head"><span>New project enquiry</span><b>Useful context captured</b></div>
          <div className="b2b-enquiry-card">
            <div className="b2b-enquiry-kicker"><span>Interface example · not a client result</span><i>Qualified</i></div>
            <h2>Custom footwear programme for a regional retail network.</h2>
            <dl>
              <div><dt>Volume</dt><dd>1,200–1,800 pairs / quarter</dd></div>
              <div><dt>Market</dt><dd>UAE · initial launch</dd></div>
              <div><dt>Need</dt><dd>Sampling, MOQ and lead-time review</dd></div>
            </dl>
          </div>
          <div className="b2b-route-list">
            {buyerPath.map((item, index) => <div key={item.number}><span>{item.number}</span><strong>{item.label}</strong><i className={index < 4 ? 'complete' : ''} /></div>)}
          </div>
          <div className="b2b-board-foot"><span>Route with context</span><strong>Buyer → brief → owner</strong></div>
        </aside>
      </section>

      <section className="service-signal-strip" aria-label="B2B website working model">
        <div><span>Outcome</span><strong>Clearer, more useful enquiries</strong></div>
        <div><span>Starting scope</span><strong>$3,000+ after qualification</strong></div>
        <div><span>Integration</span><strong>Inbox, CRM or WhatsApp</strong></div>
      </section>

      <section id="buyer-path" className="service-intent section-shell">
        <p className="section-index">01 · The commercial problem</p>
        <div>
          <h2>A B2B website should reduce uncertainty <em>before sales spends time.</em></h2>
          <div className="service-intent-copy">
            <p>Many capable businesses still force buyers to translate a vague company profile into their own use case. The enquiry arrives as “send price” because the website never explained fit, evidence, process or the information needed for a useful response.</p>
            <p>The job is to turn expertise into a decision path: recognise the need, understand the capability, believe the proof, provide the right context and reach the correct owner.</p>
          </div>
        </div>
      </section>

      <section className="service-use-cases section-shell d2c-friction-grid">
        <article><div><span>01</span><small>Positioning</small></div><h2>The offer is accurate—but only insiders understand it.</h2><p>Translate services, sectors and capability into buyer language without flattening the technical truth.</p></article>
        <article><div><span>02</span><small>Evidence</small></div><h2>The proof exists—but the buyer has to ask for all of it.</h2><p>Place approved specifications, process, examples and risk-reducing context beside the decision they support.</p></article>
        <article><div><span>03</span><small>Enquiry</small></div><h2>Every lead enters as the same empty contact message.</h2><p>Capture the use case, scale, timing, market and files needed to decide whether a real conversation makes sense.</p></article>
      </section>

      <section className="service-process d2c-system-section b2b-system-section">
        <div className="section-shell">
          <div className="service-section-heading">
            <div><p className="section-index light">02 · The connected system</p><h2>Five layers. One useful sales journey.</h2></div>
            <p>The public message, proof, form and internal follow-up should agree. A polished page cannot repair a broken handoff after the buyer submits.</p>
          </div>
          <div className="d2c-system-grid">
            {systemLayers.map((layer) => <article key={layer.number}><span>{layer.number}</span><div><h3>{layer.title}</h3><p>{layer.copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="proof" className="d2c-proof section-shell">
        <div className="service-section-heading dark-heading">
          <div><p className="section-index">03 · Relevant proof</p><h2>The studio itself runs the journey I am proposing.</h2></div>
          <p>This is self-initiated operating proof—not an invented client-growth claim. The system connects a clear offer, truth-labelled proof, scope guidance, structured qualification, attribution and private owner triage.</p>
        </div>
        <div className="d2c-proof-card b2b-proof-card">
          <div className="d2c-proof-mark b2b-proof-mark"><span>SP</span><small>Live self-initiated system</small></div>
          <div>
            <p className="eyebrow"><span /> SP Studios · acquisition and qualification</p>
            <h3>From a business need to a useful brief—without pretending every visitor is a lead.</h3>
            <p>The case demonstrates positioning, original interface direction, project qualification, source attribution and an owner-only operating desk. It does not claim traffic, revenue or client results that have not been verified.</p>
            <a href="/work/studio-system">View the live-system case study →</a>
          </div>
        </div>
      </section>

      <section className="d2c-deliverables section-shell">
        <div>
          <p className="section-index">04 · Starting website system</p>
          <h2>What a complete B2B scope can include.</h2>
          <p>The exact pages follow the offer, evidence, content and workflow—not an arbitrary page package. Every production scope is written before work begins.</p>
        </div>
        <ol>{outputs.map((output, index) => <li key={output}><span>{String(index + 1).padStart(2, '0')}</span><strong>{output}</strong></li>)}</ol>
      </section>

      <section id="investment" className="d2c-investment">
        <div className="section-shell d2c-investment-grid">
          <div><p className="section-index light">05 · Investment boundary</p><h2>Complete business websites start at <em>$3,000.</em></h2></div>
          <div>
            <p>A signature B2B system with deeper positioning, six to eight pages and one agreed integration starts at $5,000. Final investment follows content readiness, workflow, migration, technical dependencies and launch risk.</p>
            <ul><li>Strategy, original direction and responsive build</li><li>Qualified enquiry journey—not a generic contact form</li><li>One agreed inbox, CRM or WhatsApp integration</li><li>QA, deployment and practical handover</li></ul>
            <a href="#brief" className="primary-action light-action" data-marketing-event="enquiry_click">Describe the business need <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="service-fit section-shell d2c-fit">
        <div className="fit-card fit-yes"><p>Strong fit</p><h2>The business needs the website and the enquiry path shaped together.</h2><ul><li>A manufacturer, professional service or B2B company with a clear capability</li><li>One decision-maker and approved business facts</li><li>A genuine problem across positioning, proof or lead quality</li><li>A working budget aligned with a complete website system</li></ul></div>
        <div className="fit-card fit-no"><p>Not the right engagement</p><h2>The request is only a cosmetic task or a volume promise.</h2><ul><li>A copied competitor layout or generic template reskin</li><li>Hourly coding tickets or staff augmentation</li><li>Guaranteed rankings, leads or revenue without evidence</li><li>Unverified claims or unlimited integrations inside a starter price</li></ul></div>
      </section>

      <section className="service-faq section-shell">
        <div className="service-faq-heading"><p className="section-index">06 · Before the brief</p><h2>Practical B2B website questions.</h2></div>
        <div className="faq-list">
          {faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{faq.question}</strong><i>+</i></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section id="brief" className="contact-section service-contact">
        <div className="section-shell contact-grid">
          <div><p className="section-index light">07 · Start with the real sales need</p><h2>Tell me what a useful enquiry must contain.</h2><p className="contact-intro">Send the current website, buyer, offer, sales friction, timing and working budget. I’ll review the goal and tell you honestly whether the fit and starting scope make sense.</p><div className="contact-signal"><i /><span><strong>Private studio inbox</strong>One brief · no mailing list · normally answered within two working days</span></div></div>
          <ProjectBrief />
        </div>
      </section>

      <footer>
        <div className="footer-main"><a href="/" className="wordmark light-mark"><span>SP</span><strong>SP Studios</strong></a><p>B2B websites from expertise to useful enquiry.</p><a href="#top">Back to top ↑</a></div>
        <div className="footer-small"><span>Service · B2B lead-generation websites</span><span>SP Studios · Directed by Sohan Vyaparee</span></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </main>
  );
}
