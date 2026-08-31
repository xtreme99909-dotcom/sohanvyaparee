'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { readStoredMarketingAttribution } from '@/app/marketing-attribution';
import { emitMarketingEvent } from '@/app/marketing-events';

type Brief = {
  name: string;
  email: string;
  company: string;
  project: string;
  budget: string;
  timing: string;
  goal: string;
  consent: boolean;
};

const emptyBrief: Brief = {
  name: '',
  email: '',
  company: '',
  project: 'Not decided yet',
  budget: 'Not sure yet',
  timing: 'Exploring the right timeline',
  goal: '',
  consent: false,
};

export function ProjectBrief() {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'needs-detail'>('idle');
  const [reference, setReference] = useState('');
  const [plannerApplied, setPlannerApplied] = useState('');
  const startedAt = useRef(0);
  const goalField = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    function applyScopePlan(event: Event) {
      const detail = (event as CustomEvent<Partial<Brief> & { recommendation?: string }>).detail;
      if (!detail || typeof detail.project !== 'string' || typeof detail.budget !== 'string' || typeof detail.goal !== 'string') return;
      setBrief((current) => ({ ...current, project: detail.project!, budget: detail.budget!, goal: detail.goal! }));
      setPlannerApplied(detail.recommendation || 'Scope preview');
      setStatus('idle');
      if (!startedAt.current) startedAt.current = Date.now();
    }

    window.addEventListener('sv:scope-plan', applyScopePlan);
    return () => window.removeEventListener('sv:scope-plan', applyScopePlan);
  }, []);

  useEffect(() => {
    if (!plannerApplied) return;
    const frame = window.requestAnimationFrame(() => {
      const field = goalField.current;
      if (!field) return;
      field.focus({ preventScroll: true });
      field.setSelectionRange(field.value.length, field.value.length);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [plannerApplied]);

  function updateBrief(field: keyof Brief, value: string) {
    if (!startedAt.current) startedAt.current = Date.now();
    setBrief((current) => ({ ...current, [field]: value }));
    setStatus('idle');
  }

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const plannerDetail = brief.goal.split('Business-specific result needed:')[1]?.trim();
    if (plannerApplied && (!plannerDetail || plannerDetail.length < 12)) {
      setStatus('needs-detail');
      window.requestAnimationFrame(() => {
        const field = goalField.current;
        if (!field) return;
        field.focus();
        field.setSelectionRange(field.value.length, field.value.length);
      });
      return;
    }
    emitMarketingEvent('brief_submit');
    setStatus('submitting');
    try {
      const params = new URLSearchParams(window.location.search);
      const savedAttribution = readStoredMarketingAttribution();
      const utmSource = params.get('utm_source') || savedAttribution?.source || null;
      const utmMedium = params.get('utm_medium') || savedAttribution?.medium || null;
      const utmCampaign = params.get('utm_campaign') || savedAttribution?.campaign || null;
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...brief,
          website,
          formStartedAt: startedAt.current,
          source: utmSource || document.referrer || 'website',
          utmSource,
          utmMedium,
          utmCampaign,
        }),
      });
      if (!response.ok) throw new Error('Unable to send enquiry');
      const result = (await response.json()) as { reference?: string };
      setReference(result.reference || 'received');
      setStatus('success');
      emitMarketingEvent('brief_success');
    } catch {
      setStatus('error');
      emitMarketingEvent('brief_error');
    }
  }

  if (status === 'success') {
    return (
      <div className="brief-success" role="status">
        <span>Enquiry received · {reference}</span>
        <h3>Your project is in my private inbox.</h3>
        <p>I’ll review what you need and reply to the email you entered.</p>
        <div>
          <button type="button" onClick={() => { setBrief(emptyBrief); setReference(''); setStatus('idle'); startedAt.current = 0; }}>Send another enquiry</button>
          <a href="/trust">See how projects are protected →</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submitBrief} onFocusCapture={() => { if (!startedAt.current) startedAt.current = Date.now(); }} className="brief-form">
      {plannerApplied ? <p className="scope-plan-applied" role="status"><span>Website option added</span><strong>{plannerApplied}</strong>Check the choices and add what the website must help the business achieve.</p> : null}
      <p className="brief-time"><strong>Three details · about 45 seconds</strong><span>No account and no mailing list.</span></p>
      <div className="form-row">
        <label>Your name<input required autoComplete="name" value={brief.name} onChange={(event) => updateBrief('name', event.target.value)} placeholder="Name" /></label>
        <label>Email<input required type="email" autoComplete="email" value={brief.email} onChange={(event) => updateBrief('email', event.target.value)} placeholder="you@company.com" /></label>
      </div>
      <label><span className="field-label">Company or current website <em className="optional-label">Optional</em></span><input autoComplete="organization" value={brief.company} onChange={(event) => updateBrief('company', event.target.value)} placeholder="Company name or website URL" /></label>
      <label htmlFor="business-goal">What website do you need, and what should it help the business do?
        <textarea
          ref={goalField}
          id="business-goal"
          required
          minLength={12}
          rows={4}
          value={brief.goal}
          onChange={(event) => updateBrief('goal', event.target.value)}
          placeholder="For example: a new website that explains our services clearly and brings useful customer enquiries…"
          aria-invalid={status === 'needs-detail'}
          aria-describedby={status === 'needs-detail' ? 'business-goal-help business-goal-error' : 'business-goal-help'}
        />
        <small id="business-goal-help" className="field-help">Two or three sentences are enough. If you used the website planner, finish the last line it added.</small>
      </label>
      <details className="brief-qualifier">
        <summary>Add website type, budget and timing <span>Optional →</span></summary>
        <div className="brief-qualifier-fields">
          <label>What do you need?<select value={brief.project} onChange={(event) => updateBrief('project', event.target.value)}><option>Not decided yet</option><option>A new website from scratch</option><option>A serious website redesign</option><option>A business website with one integration</option><option>A product or platform experience</option><option>A commerce or ordering experience</option></select></label>
          <label>Working budget<select value={brief.budget} onChange={(event) => updateBrief('budget', event.target.value)}><option>Not sure yet</option><option>$1,500–$3,000</option><option>$3,000–$6,000</option><option>$6,000–$12,000</option><option>$12,000+</option></select></label>
          <label>Preferred delivery window
            <select value={brief.timing} onChange={(event) => updateBrief('timing', event.target.value)}>
              <option>Exploring the right timeline</option>
              <option>Focused launch · 5–7 working days</option>
              <option>Complete business site · 7–15 working days</option>
              <option>Integrated launch · 3–8 weeks</option>
              <option>Complex system · 6–12+ weeks</option>
              <option>There is a fixed launch date</option>
              <option>Exploring for later</option>
            </select>
            <small className="field-help">Useful context, not a commitment. The final scope is written after review.</small>
          </label>
        </div>
      </details>
      <label className="consent-field"><input required type="checkbox" checked={brief.consent} onChange={(event) => setBrief((current) => ({ ...current, consent: event.target.checked }))} /><span>Use these details only to respond to this project enquiry. No mailing list or resale.</span></label>
      <label className="website-field" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      <button className="prepare-button" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending securely…' : 'Send my project brief'} <span>→</span></button>
      <p className="form-privacy">One submission reaches the studio directly. Read the <a href="/privacy">privacy note</a>.</p>
      {status === 'needs-detail' ? <p id="business-goal-error" className="form-error" role="alert">Add the specific business result the website must achieve after “Business-specific result needed” before sending.</p> : null}
      {status === 'error' ? (
        <div className="form-error form-error-recovery" role="alert">
          <strong>The enquiry could not be saved.</strong>
          <span>Your answers are still here. Wait a moment, then use “Send my project brief” once more.</span>
        </div>
      ) : null}
    </form>
  );
}
