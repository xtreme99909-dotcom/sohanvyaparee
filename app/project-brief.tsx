'use client';

import { FormEvent, useState } from 'react';

type Brief = {
  name: string;
  company: string;
  project: string;
  budget: string;
  timing: string;
  goal: string;
};

const emptyBrief: Brief = {
  name: '',
  company: '',
  project: 'A new website from scratch',
  budget: '$500–$1,000',
  timing: 'Within 1–2 months',
  goal: '',
};

export function ProjectBrief() {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [briefReady, setBriefReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const briefText = [
    'Hi Sohan — I would like to discuss a complete website project.',
    `Name: ${brief.name || '—'}`,
    `Company: ${brief.company || '—'}`,
    `Project: ${brief.project}`,
    `Budget: ${brief.budget}`,
    `Timing: ${brief.timing}`,
    `What the website needs to achieve: ${brief.goal || '—'}`,
  ].join('\n');

  function updateBrief(field: keyof Brief, value: string) {
    setBrief((current) => ({ ...current, [field]: value }));
    setBriefReady(false);
    setCopied(false);
  }

  function prepareBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBriefReady(true);
    setCopied(false);
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form onSubmit={prepareBrief} className="brief-form">
      <div className="form-row">
        <label>Your name<input required value={brief.name} onChange={(event) => updateBrief('name', event.target.value)} placeholder="Name" /></label>
        <label>Company or project<input required value={brief.company} onChange={(event) => updateBrief('company', event.target.value)} placeholder="Company name" /></label>
      </div>
      <div className="form-row">
        <label>What do you need?<select value={brief.project} onChange={(event) => updateBrief('project', event.target.value)}><option>A new website from scratch</option><option>A serious website redesign</option><option>A product or platform experience</option><option>A commerce or ordering experience</option></select></label>
        <label>Working budget<select value={brief.budget} onChange={(event) => updateBrief('budget', event.target.value)}><option>$500–$1,000</option><option>$1,000–$2,000</option><option>$2,000–$4,000</option><option>$4,000+</option><option>Not sure yet</option></select></label>
      </div>
      <label>Preferred timing<select value={brief.timing} onChange={(event) => updateBrief('timing', event.target.value)}><option>Within 1–2 months</option><option>Within 3–4 months</option><option>Exploring for later</option><option>There is a fixed launch date</option></select></label>
      <label>What must the website help the business achieve?<textarea required rows={4} value={brief.goal} onChange={(event) => updateBrief('goal', event.target.value)} placeholder="For example: explain a new product clearly, generate qualified enquiries, take direct orders, or reposition the company…" /></label>
      <button className="prepare-button" type="submit">Prepare my project brief <span>→</span></button>

      {briefReady ? (
        <div className="brief-result" role="status">
          <p>Your brief is ready. Copy it, then choose where to send it.</p>
          <pre>{briefText}</pre>
          <div>
            <button type="button" onClick={copyBrief}>{copied ? 'Brief copied ✓' : 'Copy brief'}</button>
            <a href="https://www.linkedin.com/in/sohan-vyaparee-397a29352/" target="_blank" rel="noreferrer">Send on LinkedIn ↗</a>
            <a href="https://www.upwork.com/freelancers/~01b29ff9dfbe850b7b" target="_blank" rel="noreferrer">Start on Upwork ↗</a>
          </div>
        </div>
      ) : null}
    </form>
  );
}
