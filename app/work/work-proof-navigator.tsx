'use client';

import { useRef, useState, type KeyboardEvent } from 'react';

const proofPaths = [
  {
    id: 'commerce',
    tab: 'Launch commerce',
    prompt: 'I need customers to discover, trust and buy.',
    study: 'BongFoods',
    label: 'Live founder-built work',
    headline: 'Start with a real operating-business context.',
    summary: 'The strongest available evidence for a commerce launch is a presented journey connecting appetite and choice with verification, delivery logic and a payment path.',
    risk: 'A beautiful storefront that breaks when buying becomes practical.',
    signals: ['Mobile-first decision flow', 'Verification and delivery logic', 'Cart, delivery and payment-path direction'],
    href: '/work/bongfoods',
    tone: 'food',
  },
  {
    id: 'service',
    tab: 'Clarify a service',
    prompt: 'I need buyers to understand and qualify themselves.',
    study: 'Studio system',
    label: 'Self-initiated business system',
    headline: 'Start with the offer-to-enquiry system.',
    summary: 'The closest proof is an operating website that connects positioning, truth-labelled evidence, scope guidance, a structured brief and private owner triage.',
    risk: 'A polished brochure that attracts attention but leaves the buying decision vague.',
    signals: ['Positioning and information architecture', 'Scope and qualification logic', 'Public journey connected to owner operations'],
    href: '/work/studio-system',
    tone: 'studio',
  },
  {
    id: 'platform',
    tab: 'Shape a platform',
    prompt: 'I need a complex product to feel understandable and trusted.',
    study: 'Private market',
    label: 'Speculative concept',
    headline: 'Start with the high-trust workflow study.',
    summary: 'The relevant evidence is a product concept built around permissions, progressive disclosure, matching, access requests and secure collaboration—not just attractive screens.',
    risk: 'A feature-heavy interface that exposes complexity before it establishes trust.',
    signals: ['Category-pattern product direction', 'Permissions and disclosure UX', 'Marketplace and Deal Room workflows'],
    href: '/work/private-market-concept',
    tone: 'market',
  },
] as const;

export function WorkProofNavigator() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = proofPaths[selectedIndex];

  function selectWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();

    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? proofPaths.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + proofPaths.length) % proofPaths.length;

    setSelectedIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="work-proof-navigator" aria-labelledby="proof-navigator-title">
      <div className="section-shell">
        <div className="work-proof-navigator-heading">
          <div>
            <p className="section-index">01 · Find the closest proof</p>
            <h2 id="proof-navigator-title">What are you trying to make work?</h2>
          </div>
          <p>Choose the commercial problem closest to yours. The portfolio will point you to the most relevant evidence—and state exactly what that evidence can and cannot prove.</p>
        </div>

        <div className="work-proof-interface">
          <div className="work-proof-tabs" role="tablist" aria-label="Choose a project type">
            {proofPaths.map((path, index) => (
              <button
                key={path.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                id={`proof-tab-${path.id}`}
                type="button"
                role="tab"
                aria-selected={selectedIndex === index}
                aria-controls="proof-match-panel"
                tabIndex={selectedIndex === index ? 0 : -1}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(event) => selectWithKeyboard(event, index)}
              >
                <span>0{index + 1}</span>
                <strong>{path.tab}</strong>
                <small>{path.prompt}</small>
              </button>
            ))}
          </div>

          <div
            key={active.id}
            id="proof-match-panel"
            className={`work-proof-match ${active.tone}`}
            role="tabpanel"
            aria-labelledby={`proof-tab-${active.id}`}
          >
            <div className="work-proof-match-visual">
              <div className="work-proof-match-status"><i /> Best evidence match</div>
              <p>{active.label}</p>
              <strong>{active.study}</strong>
              <span>{active.headline}</span>
              <b aria-hidden="true">0{selectedIndex + 1}</b>
            </div>

            <div className="work-proof-match-copy">
              <div>
                <p className="work-index-label">Why this is the closest match</p>
                <h3>{active.headline}</h3>
                <p>{active.summary}</p>
              </div>
              <div className="work-proof-risk">
                <span>Risk this evidence addresses</span>
                <p>{active.risk}</p>
              </div>
              <ul aria-label={`Signals demonstrated by ${active.study}`}>
                {active.signals.map((signal) => <li key={signal}>{signal}</li>)}
              </ul>
              <div className="work-proof-match-actions">
                <a href={active.href}>Inspect {active.study} <span>→</span></a>
                <a href="/services/complete-website-launch#brief" data-marketing-event="enquiry_click">Discuss a similar challenge ↗</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
