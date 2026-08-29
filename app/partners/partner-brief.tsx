'use client';

import { FormEvent, useRef, useState } from 'react';
import { readStoredMarketingAttribution } from '@/app/marketing-attribution';

type PartnerBriefState = {
  name: string;
  email: string;
  studio: string;
  specialty: string;
  model: string;
  portfolio: string;
  opportunity: string;
  consent: boolean;
};

const emptyBrief: PartnerBriefState = {
  name: '',
  email: '',
  studio: '',
  specialty: 'Brand strategy, identity or copy',
  model: 'A direct referral when the fit is clear',
  portfolio: '',
  opportunity: '',
  consent: false,
};

export function PartnerBrief() {
  const [brief, setBrief] = useState(emptyBrief);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const startedAt = useRef(0);

  function update<K extends keyof PartnerBriefState>(field: K, value: PartnerBriefState[K]) {
    if (!startedAt.current) startedAt.current = Date.now();
    setBrief((current) => ({ ...current, [field]: value }));
    setStatus('idle');
  }

  async function submitPartnerBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');

    try {
      const params = new URLSearchParams(window.location.search);
      const savedAttribution = readStoredMarketingAttribution();
      const utmSource = params.get('utm_source') || savedAttribution?.source || null;
      const utmMedium = params.get('utm_medium') || savedAttribution?.medium || null;
      const utmCampaign = params.get('utm_campaign') || savedAttribution?.campaign || null;
      const context = [
        `Specialty: ${brief.specialty}`,
        `Preferred model: ${brief.model}`,
        `Portfolio: ${brief.portfolio || 'Not supplied'}`,
        `Where the collaboration could fit: ${brief.opportunity}`,
      ].join('\n');

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: brief.name,
          email: brief.email,
          company: brief.studio,
          project: `Partner collaboration · ${brief.model}`,
          budget: 'Commercial terms agreed per qualified scope',
          timing: 'Opportunity-led · no standing commitment',
          goal: context,
          consent: brief.consent,
          website,
          formStartedAt: startedAt.current,
          source: utmSource || document.referrer || 'partner-page',
          utmSource,
          utmMedium,
          utmCampaign,
        }),
      });

      if (!response.ok) throw new Error('Unable to send collaboration note');
      const result = (await response.json()) as { reference?: string };
      setReference(result.reference || 'received');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="brief-success partner-brief-success" role="status">
        <span>Collaboration note received · {reference}</span>
        <h3>The opportunity is now in my private studio inbox.</h3>
        <p>I’ll review the specialty boundary, client context and delivery fit together, then reply to the work email supplied—normally within two working days.</p>
        <button type="button" onClick={() => { setBrief(emptyBrief); setReference(''); setStatus('idle'); startedAt.current = 0; }}>Send another note</button>
      </div>
    );
  }

  return (
    <form className="brief-form partner-brief" onSubmit={submitPartnerBrief} onFocusCapture={() => { if (!startedAt.current) startedAt.current = Date.now(); }}>
      <div className="form-row">
        <label>Your name<input required value={brief.name} onChange={(event) => update('name', event.target.value)} placeholder="Name" /></label>
        <label>Work email<input required type="email" value={brief.email} onChange={(event) => update('email', event.target.value)} placeholder="you@studio.com" /></label>
      </div>
      <label>Studio, practice or company<input required value={brief.studio} onChange={(event) => update('studio', event.target.value)} placeholder="Business or practice name" /></label>
      <div className="form-row">
        <label>Your core specialty
          <select value={brief.specialty} onChange={(event) => update('specialty', event.target.value)}>
            <option>Brand strategy, identity or copy</option>
            <option>Photography, film or art direction</option>
            <option>Growth strategy or fractional leadership</option>
            <option>CRM, RevOps or automation</option>
            <option>Another complementary specialty</option>
          </select>
        </label>
        <label>Best starting model
          <select value={brief.model} onChange={(event) => update('model', event.target.value)}>
            <option>A direct referral when the fit is clear</option>
            <option>A transparent joint scope</option>
            <option>Delivery capacity for a named opportunity</option>
            <option>Exploring the boundary first</option>
          </select>
        </label>
      </div>
      <label>Portfolio or practice URL <small>Optional</small><input type="url" value={brief.portfolio} onChange={(event) => update('portfolio', event.target.value)} placeholder="https://" /></label>
      <label>Where could this collaboration genuinely fit?
        <textarea required minLength={20} rows={5} value={brief.opportunity} onChange={(event) => update('opportunity', event.target.value)} placeholder="Describe the kinds of clients, projects or handoff points where a complete website partner would improve the outcome…" />
        <small className="field-help">A real opportunity or specific client pattern is more useful than a generic partnership pitch.</small>
      </label>
      <label className="consent-field"><input required type="checkbox" checked={brief.consent} onChange={(event) => update('consent', event.target.checked)} /><span>I agree that these details may be used to respond to this collaboration enquiry. No mailing list or resale.</span></label>
      <label className="website-field" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      <button className="prepare-button" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending securely…' : 'Send collaboration note'} <span>→</span></button>
      <p className="form-privacy">One submission reaches the private studio inbox. Read the <a href="/privacy">privacy note</a>.</p>
      {status === 'error' ? <p className="form-error" role="alert">The note could not be saved. Your answers remain here—please try once more.</p> : null}
    </form>
  );
}
