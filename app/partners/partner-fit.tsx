'use client';

import { useState } from 'react';

const lanes = [
  {
    label: 'Brand + copy',
    partnerOwns: 'Positioning, identity, naming, voice or final copy.',
    studioOwns: 'Information architecture, original UX/UI, responsive build, integrations, QA and launch.',
    ideal: 'A rebrand or messaging engagement that needs to become a complete, market-ready website.',
  },
  {
    label: 'Photo + film',
    partnerOwns: 'Art-directed product, hospitality, founder or campaign imagery.',
    studioOwns: 'The customer journey that gives those assets commercial context, action and measurement.',
    ideal: 'A shoot or launch where the final website should feel as considered as the visual production.',
  },
  {
    label: 'Growth + strategy',
    partnerOwns: 'Growth priorities, campaign direction, budget context or the larger commercial plan.',
    studioOwns: 'The accountable website execution—from discovery and hierarchy through build and launch.',
    ideal: 'A qualified business that needs a specialist operator to carry the website work without fragmenting the strategy.',
  },
  {
    label: 'CRM + automation',
    partnerOwns: 'CRM architecture, lead routing, lifecycle automation, attribution or enablement.',
    studioOwns: 'The customer-facing website, forms, events and handoff points that feed the agreed system.',
    ideal: 'A B2B or high-consideration launch where the front-end journey and the operating workflow must agree.',
  },
] as const;

export function PartnerFit() {
  const [activeLane, setActiveLane] = useState(0);
  const lane = lanes[activeLane];

  return (
    <div className="partner-fit-board">
      <div className="partner-fit-tabs" role="group" aria-label="Choose your collaboration specialty">
        {lanes.map((item, index) => (
          <button
            key={item.label}
            type="button"
            aria-pressed={activeLane === index}
            className={activeLane === index ? 'active' : ''}
            onClick={() => setActiveLane(index)}
          >
            <span>0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div key={lane.label} className="partner-fit-detail">
        <p className="partner-fit-kicker">A clean responsibility boundary</p>
        <h2>{lane.label}</h2>
        <div className="partner-fit-columns">
          <div><span>Your specialty can own</span><p>{lane.partnerOwns}</p></div>
          <div><span>The website studio can own</span><p>{lane.studioOwns}</p></div>
        </div>
        <aside><span>Strong opportunity signal</span><strong>{lane.ideal}</strong></aside>
      </div>
    </div>
  );
}
