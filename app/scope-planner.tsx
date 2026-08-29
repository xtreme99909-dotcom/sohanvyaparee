'use client';

import { useState } from 'react';

type LaunchState = 'new' | 'redesign' | 'connected';
type CustomerAction = 'trust' | 'enquiry' | 'transaction' | 'workflow';
type PageRange = '1–3' | '4–5' | '6–8' | 'needs-mapping';
type Integration = 'none' | 'one' | 'several';
type ContentState = 'ready' | 'needs-shaping';

type Answers = {
  launchState?: LaunchState;
  customerAction?: CustomerAction;
  pageRange?: PageRange;
  integration?: Integration;
  contentState?: ContentState;
};

type Option<T extends string> = {
  value: T;
  label: string;
  note: string;
};

const launchOptions: Option<LaunchState>[] = [
  { value: 'new', label: 'New website', note: 'The business needs its first credible digital home.' },
  { value: 'redesign', label: 'Serious redesign', note: 'The existing site no longer represents the business.' },
  { value: 'connected', label: 'Connected experience', note: 'The site must support commerce, booking or a product flow.' },
];

const actionOptions: Option<CustomerAction>[] = [
  { value: 'trust', label: 'Understand and trust', note: 'Explain the offer and establish credibility.' },
  { value: 'enquiry', label: 'Send a qualified enquiry', note: 'Turn the right visitors into useful conversations.' },
  { value: 'transaction', label: 'Book, order or pay', note: 'Help customers complete a practical transaction.' },
  { value: 'workflow', label: 'Use a product workflow', note: 'Access, accounts, matching or another custom journey.' },
];

const pageOptions: Option<PageRange>[] = [
  { value: '1–3', label: '1–3 pages', note: 'One focused offer or compact launch.' },
  { value: '4–5', label: '4–5 pages', note: 'A complete public business story.' },
  { value: '6–8', label: '6–8 pages', note: 'Deeper proof, services and customer paths.' },
  { value: 'needs-mapping', label: 'Needs mapping', note: 'The right structure is not clear yet.' },
];

const integrationOptions: Option<Integration>[] = [
  { value: 'none', label: 'No integration yet', note: 'A focused form or external link is enough.' },
  { value: 'one', label: 'One key integration', note: 'For example booking, commerce, CRM or payments.' },
  { value: 'several', label: 'Several or custom logic', note: 'Multiple systems or a product-level workflow.' },
];

const contentOptions: Option<ContentState>[] = [
  { value: 'ready', label: 'Mostly ready', note: 'The offer, proof and core content already exist.' },
  { value: 'needs-shaping', label: 'Needs shaping', note: 'The structure and copy framework need direction.' },
];

const labels = {
  launchState: Object.fromEntries(launchOptions.map((option) => [option.value, option.label])),
  customerAction: Object.fromEntries(actionOptions.map((option) => [option.value, option.label])),
  pageRange: Object.fromEntries(pageOptions.map((option) => [option.value, option.label])),
  integration: Object.fromEntries(integrationOptions.map((option) => [option.value, option.label])),
  contentState: Object.fromEntries(contentOptions.map((option) => [option.value, option.label])),
} as const;

function getRecommendation(answers: Required<Answers>) {
  if (answers.customerAction === 'workflow' || answers.integration === 'several') {
    return {
      name: 'Launch System',
      budget: '$4,000+',
      project: 'A product or platform experience',
      reason: 'A product workflow or several connected systems needs launch discovery before the customer journey, technical boundary, timing and investment can be fixed responsibly.',
      includes: 'Launch discovery · journey mapping · original interface direction · technical scope · milestone plan',
    };
  }

  if (answers.customerAction === 'transaction' || answers.integration === 'one' || answers.pageRange === '6–8' || answers.launchState === 'connected') {
    return {
      name: 'Signature + Integration',
      budget: '$2,000–$4,000',
      project: answers.customerAction === 'transaction' ? 'A commerce or ordering experience' : 'A product or platform experience',
      reason: 'The customer journey must connect a deeper public experience to one practical business system, so the integration belongs inside the scope from the start.',
      includes: '6–8 custom pages · original art direction · responsive build · one agreed integration',
    };
  }

  if (answers.pageRange === '4–5' || answers.pageRange === 'needs-mapping' || answers.contentState === 'needs-shaping' || answers.launchState === 'redesign') {
    return {
      name: 'Business Launch',
      budget: '$1,000–$2,000',
      project: answers.launchState === 'redesign' ? 'A serious website redesign' : 'A new website from scratch',
      reason: 'The business needs a complete public story and enough direction to connect the offer, proof, pages and enquiry journey coherently.',
      includes: 'Up to 5 custom pages · message structure · original design · responsive build · launch',
    };
  }

  return {
    name: 'Launch Essentials',
    budget: '$500–$1,000',
    project: 'A new website from scratch',
    reason: 'The project has one focused goal, a compact page surface and no significant integration, so a deliberately narrow launch is the credible place to begin.',
    includes: '1–3 purposeful pages · focused direction · responsive build · launch',
  };
}

function OptionGroup<T extends string>({
  index,
  legend,
  name,
  options,
  value,
  onChange,
}: {
  index: string;
  legend: string;
  name: string;
  options: Option<T>[];
  value?: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="scope-question">
      <legend><span>{index}</span>{legend}</legend>
      <div className="scope-options">
        {options.map((option) => (
          <label key={option.value} className={value === option.value ? 'selected' : undefined}>
            <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} />
            <strong>{option.label}</strong>
            <small>{option.note}</small>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ScopePlanner() {
  const [answers, setAnswers] = useState<Answers>({});
  const complete = Boolean(answers.launchState && answers.customerAction && answers.pageRange && answers.integration && answers.contentState);
  const recommendation = complete ? getRecommendation(answers as Required<Answers>) : null;
  const answeredCount = Object.values(answers).filter(Boolean).length;

  function update<K extends keyof Answers>(key: K, value: NonNullable<Answers[K]>) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function carryIntoBrief() {
    if (!recommendation || !complete) return;
    const resolved = answers as Required<Answers>;
    const goal = [
      `Scope preview: ${recommendation.name}.`,
      `Starting point: ${labels.launchState[resolved.launchState]}.`,
      `Primary customer action: ${labels.customerAction[resolved.customerAction]}.`,
      `Expected public surface: ${labels.pageRange[resolved.pageRange]}.`,
      `Connected workflow: ${labels.integration[resolved.integration]}.`,
      `Content readiness: ${labels.contentState[resolved.contentState]}.`,
      'Business-specific result needed: ',
    ].join('\n');

    window.dispatchEvent(new CustomEvent('sv:scope-plan', {
      detail: { project: recommendation.project, budget: recommendation.budget, goal, recommendation: recommendation.name },
    }));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('brief')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  return (
    <section id="planner" className="scope-planner" aria-labelledby="scope-planner-title">
      <div className="scope-planner-intro">
        <div>
          <p className="section-index light">05 · Scope preview</p>
          <h2 id="scope-planner-title">Build a realistic starting scope in sixty seconds.</h2>
        </div>
        <div>
          <p>This is not an automatic quotation. It identifies the first credible engagement before you spend time writing the project brief.</p>
          <span>{answeredCount} of 5 decisions made</span>
        </div>
      </div>

      <div className="scope-planner-grid">
        <div className="scope-questions">
          <OptionGroup index="01" legend="What are we launching?" name="launch-state" options={launchOptions} value={answers.launchState} onChange={(value) => update('launchState', value)} />
          <OptionGroup index="02" legend="What should the customer do?" name="customer-action" options={actionOptions} value={answers.customerAction} onChange={(value) => update('customerAction', value)} />
          <OptionGroup index="03" legend="How much public surface is expected?" name="page-range" options={pageOptions} value={answers.pageRange} onChange={(value) => update('pageRange', value)} />
          <OptionGroup index="04" legend="What must connect behind the website?" name="integration" options={integrationOptions} value={answers.integration} onChange={(value) => update('integration', value)} />
          <OptionGroup index="05" legend="How ready is the content?" name="content-state" options={contentOptions} value={answers.contentState} onChange={(value) => update('contentState', value)} />
        </div>

        <aside className="scope-recommendation" aria-live="polite" aria-atomic="true">
          {recommendation ? (
            <>
              <p>Likely starting point</p>
              <h3>{recommendation.name}</h3>
              <strong>{recommendation.budget}</strong>
              <small>Indicative working budget selected for the brief</small>
              <div>
                <span>Why this direction</span>
                <p>{recommendation.reason}</p>
              </div>
              <div>
                <span>Starting shape</span>
                <p>{recommendation.includes}</p>
              </div>
              <button type="button" onClick={carryIntoBrief} data-marketing-event="enquiry_click">Carry this into my brief <span>→</span></button>
              <em>Final pages, timing and price are confirmed only after the real business goal and technical requirements are reviewed.</em>
            </>
          ) : (
            <>
              <p>Likely starting point</p>
              <h3>Make five decisions.</h3>
              <div className="scope-empty-meter" aria-hidden="true"><i style={{ width: `${answeredCount * 20}%` }} /></div>
              <span className="scope-empty-copy">Your answers will produce a practical starting engagement and prefill the relevant parts of the private project brief.</span>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
