'use client';

import { FormEvent, useRef, useState } from 'react';

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
  project: 'A new website from scratch',
  budget: '$500–$1,000',
  timing: 'Within 1–2 months',
  goal: '',
  consent: false,
};

export function ProjectBrief() {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [reference, setReference] = useState('');
  const startedAt = useRef(0);

  function updateBrief(field: keyof Brief, value: string) {
    if (!startedAt.current) startedAt.current = Date.now();
    setBrief((current) => ({ ...current, [field]: value }));
    setStatus('idle');
  }

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    try {
      const params = new URLSearchParams(window.location.search);
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...brief,
          website,
          formStartedAt: startedAt.current,
          source: params.get('utm_source') || document.referrer || 'website',
          utmSource: params.get('utm_source'),
          utmMedium: params.get('utm_medium'),
          utmCampaign: params.get('utm_campaign'),
        }),
      });
      if (!response.ok) throw new Error('Unable to send enquiry');
      const result = (await response.json()) as { reference?: string };
      setReference(result.reference || 'received');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="brief-success" role="status">
        <span>Enquiry received · {reference}</span>
        <h3>Your project is now in my private studio inbox.</h3>
        <p>I’ll review the business goal, scope and timing together and reply using the email you supplied—normally within two working days.</p>
        <div>
          <button type="button" onClick={() => { setBrief(emptyBrief); setReference(''); setStatus('idle'); startedAt.current = 0; }}>Send another enquiry</button>
          <a href="https://www.upwork.com/services/product/development-it-a-complete-launch-ready-website-for-your-startup-or-small-business-2092747598122889534" target="_blank" rel="noreferrer">Prefer an Upwork contract? ↗</a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submitBrief} onFocusCapture={() => { if (!startedAt.current) startedAt.current = Date.now(); }} className="brief-form">
      <div className="form-row">
        <label>Your name<input required value={brief.name} onChange={(event) => updateBrief('name', event.target.value)} placeholder="Name" /></label>
        <label>Work email<input required type="email" value={brief.email} onChange={(event) => updateBrief('email', event.target.value)} placeholder="you@company.com" /></label>
      </div>
      <label>Company or project<input required value={brief.company} onChange={(event) => updateBrief('company', event.target.value)} placeholder="Company name or working title" /></label>
      <div className="form-row">
        <label>What do you need?<select value={brief.project} onChange={(event) => updateBrief('project', event.target.value)}><option>A new website from scratch</option><option>A serious website redesign</option><option>A product or platform experience</option><option>A commerce or ordering experience</option></select></label>
        <label>Working budget<select value={brief.budget} onChange={(event) => updateBrief('budget', event.target.value)}><option>$500–$1,000</option><option>$1,000–$2,000</option><option>$2,000–$4,000</option><option>$4,000+</option><option>Not sure yet</option></select></label>
      </div>
      <label>Preferred timing<select value={brief.timing} onChange={(event) => updateBrief('timing', event.target.value)}><option>Within 1–2 months</option><option>Within 3–4 months</option><option>Exploring for later</option><option>There is a fixed launch date</option></select></label>
      <label>What must the website help the business achieve?<textarea required rows={4} value={brief.goal} onChange={(event) => updateBrief('goal', event.target.value)} placeholder="For example: explain a new product clearly, generate qualified enquiries, take direct orders, or reposition the company…" /></label>
      <label className="consent-field"><input required type="checkbox" checked={brief.consent} onChange={(event) => setBrief((current) => ({ ...current, consent: event.target.checked }))} /><span>I agree that these details may be used to respond to my project enquiry. No mailing list or resale.</span></label>
      <label className="website-field" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      <button className="prepare-button" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending securely…' : 'Send project enquiry'} <span>→</span></button>
      <p className="form-privacy">One submission reaches the studio directly. Read the <a href="/privacy">privacy note</a>.</p>
      {status === 'error' ? <p className="form-error" role="alert">The enquiry could not be saved. Please try once more, or use the Upwork link below.</p> : null}
    </form>
  );
}
