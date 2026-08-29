import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bread Butter Jamm — Case Story + Qualified Enquiry Concept',
  description: 'An independent, uncommissioned experience concept prepared after permission for Bread Butter Jamm.',
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

const chapters = [
  {
    number: '01',
    label: 'The context',
    title: 'Why did this moment need to exist?',
    copy: 'One concise paragraph gives the brand, audience and cultural moment enough context for a prospective client to understand the challenge.',
    prompt: 'Confirm the business or community tension—not only the event format.',
  },
  {
    number: '02',
    label: 'The idea',
    title: 'Name the thought people could participate in.',
    copy: 'The creative idea becomes the spine of the page. It explains why the experience looked, moved and behaved the way it did.',
    prompt: 'Use the actual concept language approved by the brand.',
  },
  {
    number: '03',
    label: 'The experience',
    title: 'Show the moments that made the idea tangible.',
    copy: 'Arrival, participation, social energy and the final memory become an edited sequence—not an unexplained wall of photographs.',
    prompt: 'Four to seven selected moments are stronger than every available frame.',
  },
  {
    number: '04',
    label: 'The evidence',
    title: 'Close with what the work changed or proved.',
    copy: 'Verified participation, reach, stakeholder feedback or a clear qualitative outcome helps the next buyer understand the commercial value.',
    prompt: 'Publish only evidence Bread Butter Jamm and the client can substantiate.',
  },
];

const enquirySteps = [
  ['01', 'Experience type', 'Activation · immersive event · celebration · curated travel'],
  ['02', 'The desired memory', 'What should people feel, remember or do afterward?'],
  ['03', 'Reality on the ground', 'Dates · cities · audience · venue · fixed partners'],
  ['04', 'Working frame', 'Decision-maker · investment readiness · response timing'],
];

export default function BreadButterJammConcept() {
  return (
    <main id="top" className="bbj-concept">
      <div className="bbj-truthbar">
        <span>Independent experience concept</span>
        <p>Prepared after permission · Not commissioned · Illustrative copy only</p>
      </div>

      <header className="bbj-header">
        <a href="#top" className="bbj-wordmark" aria-label="Bread Butter Jamm concept home">
          <span>Bread.</span><span>Butter.</span><strong>Jamm.</strong>
        </a>
        <nav aria-label="Concept navigation">
          <a href="#case-story">Case story</a>
          <a href="#buyer-path">Buyer path</a>
          <a href="#enquiry" className="bbj-nav-cta">Start a project <span>↗</span></a>
        </nav>
      </header>

      <section className="bbj-hero">
        <div className="bbj-hero-copy">
          <div className="bbj-kicker"><span>Brand activation</span><i /> <span>Case-page direction</span></div>
          <h1>Turn a beautiful movement into a story a brand can buy.</h1>
          <p>The existing website already creates atmosphere. This concept keeps that energy, then gives a prospective brand the context, role, idea and evidence needed to understand why the work matters.</p>
          <div className="bbj-hero-actions">
            <a href="#case-story">Explore the story system <span>↓</span></a>
            <a href="#enquiry">See the qualified enquiry path <span>↘</span></a>
          </div>
        </div>

        <aside className="bbj-hero-stage" aria-label="Abstract event-story composition">
          <div className="bbj-stage-grid" />
          <div className="bbj-stage-card bbj-stage-card-a"><span>01</span><strong>Context</strong><small>Why this moment?</small></div>
          <div className="bbj-stage-card bbj-stage-card-b"><span>02</span><strong>Participation</strong><small>How people entered the idea</small></div>
          <div className="bbj-stage-card bbj-stage-card-c"><span>03</span><strong>Memory</strong><small>What travelled beyond the room</small></div>
          <div className="bbj-stage-orbit"><i /><i /><i /><b>Jamm.</b></div>
          <p>Story before gallery</p>
        </aside>
      </section>

      <section className="bbj-bridge" aria-label="Concept principle">
        <p>Current strength</p><strong>Distinctive visual energy</strong><span>+</span><p>Added layer</p><strong>Commercial case clarity</strong><i>→</i><b>A stronger reason to enquire</b>
      </section>

      <section id="case-story" className="bbj-case-intro bbj-shell">
        <div className="bbj-section-label"><span>01</span><p>A story-led case page</p></div>
        <div>
          <p className="bbj-overline">Public project reference · Canva Community Labs</p>
          <h2>The gallery becomes a guided argument.</h2>
          <p className="bbj-intro-copy">The public project name is used only as a reference. The narrative below is a proposed content structure—not a claim about the brief, Bread Butter Jamm’s exact scope or project results.</p>
        </div>
      </section>

      <section className="bbj-case-cover">
        <div className="bbj-case-cover-copy">
          <span>Canva · Community experience</span>
          <h2>Participation creates memory.</h2>
          <p>Illustrative editorial direction for the opening thought. Replace with the real approved idea and project language.</p>
        </div>
        <div className="bbj-case-cover-visual" role="img" aria-label="Abstract placeholder for an event hero image or film">
          <div className="bbj-pulse one" /><div className="bbj-pulse two" /><div className="bbj-pulse three" />
          <span>Hero film / defining image</span>
          <b>01:24</b>
        </div>
        <div className="bbj-case-facts">
          <div><span>Ecosystem</span><strong>Brand activation</strong></div>
          <div><span>Audience</span><strong>[Confirm]</strong></div>
          <div><span>What BBJ owned</span><strong>[Confirm]</strong></div>
          <div><span>Market / year</span><strong>[Confirm]</strong></div>
        </div>
      </section>

      <section className="bbj-chapters bbj-shell">
        {chapters.map((chapter) => (
          <article key={chapter.number}>
            <div><span>{chapter.number}</span><small>{chapter.label}</small></div>
            <h3>{chapter.title}</h3>
            <p>{chapter.copy}</p>
            <footer><i />{chapter.prompt}</footer>
          </article>
        ))}
      </section>

      <section className="bbj-media-story">
        <div className="bbj-shell">
          <div className="bbj-media-heading">
            <div className="bbj-section-label light"><span>02</span><p>Edit the memory</p></div>
            <h2>Every frame answers a question.</h2>
            <p>Media remains immersive, but each selected moment earns its place in the story.</p>
          </div>
          <div className="bbj-media-grid">
            <article className="bbj-media-large"><span>01 · Arrival</span><strong>How did the world announce itself?</strong><i /></article>
            <article className="bbj-media-small blue"><span>02 · Participation</span><strong>What could people make, change or join?</strong><i /></article>
            <article className="bbj-media-small lime"><span>03 · Social energy</span><strong>What made the room feel collective?</strong><i /></article>
            <article className="bbj-media-wide"><span>04 · Afterlife</span><strong>What travelled beyond the physical moment?</strong><i /></article>
          </div>
        </div>
      </section>

      <section id="buyer-path" className="bbj-buyer bbj-shell">
        <div className="bbj-section-label"><span>03</span><p>The buyer’s decision</p></div>
        <div className="bbj-buyer-grid">
          <div>
            <h2>Do not make the next client reverse-engineer the value.</h2>
            <p>A strong case page should let a marketing, people or experience leader understand the work at three levels: the idea, Bread Butter Jamm’s role and the proof that reduces risk.</p>
          </div>
          <ol>
            <li><span>01</span><p><strong>Is this relevant to my brief?</strong><small>Lead with objective, audience and ecosystem.</small></p></li>
            <li><span>02</span><p><strong>Can this team shape the experience?</strong><small>Name the thinking and exact scope—not only the output.</small></p></li>
            <li><span>03</span><p><strong>Can they execute at my level?</strong><small>Use selective production proof and verified scale.</small></p></li>
            <li><span>04</span><p><strong>What should I do next?</strong><small>Open a relevant brief, not a generic footer email.</small></p></li>
          </ol>
        </div>
      </section>

      <section className="bbj-next-case">
        <div><span>Next relevant movement</span><h2>From one remembered experience to the next.</h2></div>
        <div className="bbj-next-card"><small>Brand activation</small><strong>Skyscanner · Outsmarting Summer</strong><span>View the story direction ↗</span></div>
      </section>

      <section id="enquiry" className="bbj-enquiry">
        <div className="bbj-shell">
          <div className="bbj-enquiry-intro">
            <div className="bbj-section-label light"><span>04</span><p>A qualified enquiry path</p></div>
            <h2>Start with the experience—not “tell us about yourself.”</h2>
            <p>The form turns an open-ended email into a useful first brief. Bread Butter Jamm can respond with the right producer, questions and next step instead of repeating discovery basics.</p>
            <div className="bbj-routing">
              {enquirySteps.map(([number, title, copy]) => <div key={number}><span>{number}</span><p><strong>{title}</strong><small>{copy}</small></p></div>)}
            </div>
          </div>

          <form className="bbj-form" aria-label="Illustrative qualified project enquiry">
            <div className="bbj-form-head"><span>Project signal</span><strong>1 / 1</strong></div>
            <label>What are we creating?
              <select defaultValue="Brand activation"><option>Brand activation</option><option>Immersive event</option><option>Soul celebration</option><option>Curated travel</option><option>Not sure yet</option></select>
            </label>
            <div className="bbj-form-row">
              <label>Where?<input placeholder="City / market / multiple locations" /></label>
              <label>When?<input placeholder="Target date or working window" /></label>
            </div>
            <label>What should people remember or do afterward?<textarea rows={3} placeholder="The outcome, feeling or behaviour the experience must create…" /></label>
            <div className="bbj-form-row">
              <label>What is already fixed?<select defaultValue="Select"><option disabled>Select</option><option>Dates</option><option>Venue</option><option>Brand / campaign system</option><option>Partners or talent</option><option>Nothing yet</option></select></label>
              <label>Investment readiness<select defaultValue="Select"><option disabled>Select</option><option>Approved working range</option><option>Range under review</option><option>Need help shaping scope</option></select></label>
            </div>
            <div className="bbj-form-row">
              <label>Your name<input placeholder="Name" /></label>
              <label>Work email<input type="email" placeholder="you@brand.com" /></label>
            </div>
            <button type="button">Send the project signal <span>→</span></button>
            <p>This is a non-functional prototype. Final routing, privacy consent and response logic would be agreed before implementation.</p>
          </form>
        </div>
      </section>

      <section className="bbj-concept-note">
        <div><span>Concept boundary</span><p>This direction deliberately avoids redesigning Bread Butter Jamm’s identity. It adds a commercial storytelling and qualification layer around the visual system already working.</p></div>
        <div><span>Content required</span><p>One 30-minute project debrief, approved scope language, four to seven media selects and only the outcomes the client permits Bread Butter Jamm to publish.</p></div>
      </section>

      <footer className="bbj-footer">
        <a href="#top" className="bbj-wordmark light" aria-label="Back to top"><span>Bread.</span><span>Butter.</span><strong>Jamm.</strong></a>
        <div><span>Independent concept by Sohan Vyaparee</span><p>Case story · qualified enquiry · responsive direction</p></div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
