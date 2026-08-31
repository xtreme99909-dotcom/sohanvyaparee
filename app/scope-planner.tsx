'use client';

import { useEffect, useRef, useState } from 'react';
import { emitMarketingEvent } from '@/app/marketing-events';
import {
  getScopeRecommendation,
  type CompleteScopePlannerAnswers,
  type ContentState,
  type CustomerAction,
  type Integration,
  type LaunchState,
  type PageRange,
  type ScopePlannerAnswers,
} from '@/app/scope-planner-recommendation';

type Option<T extends string> = {
  value: T;
  label: string;
  note: string;
};

const launchOptions: Option<LaunchState>[] = [
  { value: 'new', label: 'New website', note: 'The business needs its first credible digital home.' },
  { value: 'redesign', label: 'Website redesign', note: 'The existing site no longer represents the business.' },
  { value: 'connected', label: 'Website with extra features', note: 'The site needs a store, booking system or another customer flow.' },
];

const actionOptions: Option<CustomerAction>[] = [
  { value: 'trust', label: 'Understand and trust', note: 'Explain the offer and establish credibility.' },
  { value: 'enquiry', label: 'Send a qualified enquiry', note: 'Turn the right visitors into useful conversations.' },
  { value: 'transaction', label: 'Book, order or pay', note: 'Help customers complete a practical transaction.' },
  { value: 'workflow', label: 'Use a custom feature', note: 'Accounts, member access, matching or another special journey.' },
];

const pageOptions: Option<PageRange>[] = [
  { value: '1–3', label: '1–3 pages', note: 'One focused offer or compact launch.' },
  { value: '4–5', label: '4–5 pages', note: 'A complete public business story.' },
  { value: '6–8', label: '6–8 pages', note: 'Deeper proof, services and customer paths.' },
  { value: 'needs-mapping', label: 'Needs mapping', note: 'The right structure is not clear yet.' },
];

const integrationOptions: Option<Integration>[] = [
  { value: 'none', label: 'No extra connection', note: 'A contact form or link is enough.' },
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
  const [answers, setAnswers] = useState<ScopePlannerAnswers>({});
  const complete = Boolean(answers.launchState && answers.customerAction && answers.pageRange && answers.integration && answers.contentState);
  const recommendation = complete ? getScopeRecommendation(answers as CompleteScopePlannerAnswers) : null;
  const answeredCount = Object.values(answers).filter(Boolean).length;
  const plannerStarted = useRef(false);
  const plannerCompleted = useRef(false);

  useEffect(() => {
    if (answeredCount > 0 && !plannerStarted.current) {
      plannerStarted.current = true;
      emitMarketingEvent('planner_start');
    }
    if (complete && !plannerCompleted.current) {
      plannerCompleted.current = true;
      emitMarketingEvent('planner_complete');
    }
  }, [answeredCount, complete]);

  function update<K extends keyof ScopePlannerAnswers>(key: K, value: NonNullable<ScopePlannerAnswers[K]>) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function carryIntoBrief() {
    if (!recommendation || !complete) return;
    const resolved = answers as CompleteScopePlannerAnswers;
    const goal = [
      `Website option: ${recommendation.name}.`,
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
          <p className="section-index light">05 · Find your starting option</p>
          <h2 id="scope-planner-title">Get a starting website option in about a minute.</h2>
        </div>
        <div>
          <p>Answer five quick questions. This is guidance, not a final quotation; I confirm the real scope after reading your brief.</p>
          <span>{answeredCount} of 5 questions answered</span>
        </div>
      </div>

      <div className="scope-planner-grid">
        <div className="scope-questions">
          <OptionGroup index="01" legend="What are we building?" name="launch-state" options={launchOptions} value={answers.launchState} onChange={(value) => update('launchState', value)} />
          <OptionGroup index="02" legend="What should visitors do?" name="customer-action" options={actionOptions} value={answers.customerAction} onChange={(value) => update('customerAction', value)} />
          <OptionGroup index="03" legend="How many pages do you expect?" name="page-range" options={pageOptions} value={answers.pageRange} onChange={(value) => update('pageRange', value)} />
          <OptionGroup index="04" legend="Does the website need to connect to another tool?" name="integration" options={integrationOptions} value={answers.integration} onChange={(value) => update('integration', value)} />
          <OptionGroup index="05" legend="How ready is the content?" name="content-state" options={contentOptions} value={answers.contentState} onChange={(value) => update('contentState', value)} />
        </div>

        <aside className="scope-recommendation" aria-live="polite" aria-atomic="true">
          {recommendation ? (
            <>
              <p>Suggested website option</p>
              <h3>{recommendation.name}</h3>
              <strong>{recommendation.budget}</strong>
              <small>Indicative working budget selected for the brief</small>
              <div>
                <span>Why this fits</span>
                <p>{recommendation.reason}</p>
              </div>
              <div>
                <span>What it can include</span>
                <p>{recommendation.includes}</p>
              </div>
              <button type="button" onClick={carryIntoBrief} data-marketing-event="enquiry_click">Use this in my project brief <span>→</span></button>
              <em>I confirm final pages, timing and price after reviewing the business goal and any technical needs.</em>
            </>
          ) : (
            <>
              <p>Suggested website option</p>
              <h3>Answer five quick questions.</h3>
              <div className="scope-empty-meter" aria-hidden="true"><i style={{ width: `${answeredCount * 20}%` }} /></div>
              <span className="scope-empty-copy">Your answers will show a sensible starting option and fill the matching parts of the project brief.</span>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
