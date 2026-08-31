'use client';

import { FormEvent, useState } from 'react';

export type EvidenceRecorderLead = {
  id: string;
  name: string;
  company: string;
  email: string;
};

type EvidenceEventType = 'qualified_lead' | 'verified_reply' | 'scopeable_opportunity' | 'proposal_issued' | 'sow_accepted';
type ScopeableSignal = 'need' | 'authority' | 'outcome' | 'scope' | 'readiness' | 'timing' | 'investment';

const events: Array<{ value: EvidenceEventType; label: string; reference: string }> = [
  { value: 'qualified_lead', label: 'Qualified lead', reference: 'Qualification record reference' },
  { value: 'verified_reply', label: 'Verified buyer reply', reference: 'Message or thread reference' },
  { value: 'scopeable_opportunity', label: 'Scopeable opportunity', reference: 'Qualification record reference' },
  { value: 'proposal_issued', label: 'Proposal issued', reference: 'Proposal document reference' },
  { value: 'sow_accepted', label: 'SOW accepted', reference: 'Signed agreement reference' },
];

const signals: Array<{ value: ScopeableSignal; label: string }> = [
  { value: 'need', label: 'Need' },
  { value: 'authority', label: 'Authority' },
  { value: 'outcome', label: 'Outcome' },
  { value: 'scope', label: 'Scope shape' },
  { value: 'readiness', label: 'Readiness' },
  { value: 'timing', label: 'Timing' },
  { value: 'investment', label: 'Investment fit' },
];

function initialBasis(): Record<ScopeableSignal, boolean> {
  return {
    need: false,
    authority: false,
    outcome: false,
    scope: false,
    readiness: false,
    timing: false,
    investment: false,
  };
}

export function EvidenceRecorder({ leads }: { leads: EvidenceRecorderLead[] }) {
  const [leadId, setLeadId] = useState('');
  const [eventType, setEventType] = useState<EvidenceEventType>('verified_reply');
  const [occurredAt, setOccurredAt] = useState('');
  const [evidenceRef, setEvidenceRef] = useState('');
  const [notes, setNotes] = useState('');
  const [basis, setBasis] = useState(initialBasis);
  const [confirmed, setConfirmed] = useState(false);
  const [state, setState] = useState<'idle' | 'saving' | 'error' | 'saved'>('idle');
  const [message, setMessage] = useState('');

  const selectedEvent = events.find((event) => event.value === eventType) || events[0];
  const requiredSignals = eventType === 'qualified_lead'
    ? signals.filter((signal) => !['scope', 'readiness'].includes(signal.value))
    : eventType === 'scopeable_opportunity' ? signals : [];
  const evidenceComplete = requiredSignals.every((signal) => basis[signal.value]);

  async function appendEvidence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('saving');
    setMessage('');

    try {
      if (!leadId || !occurredAt || evidenceRef.trim().length < 4 || !confirmed || !evidenceComplete) {
        throw new Error('Complete the evidence fields and confirmation.');
      }
      const response = await fetch('/api/revenue-evidence', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          leadId,
          eventType,
          occurredAt: new Date(occurredAt).toISOString(),
          evidenceRef,
          notes,
          scopeableBasis: basis,
        }),
      });
      const result = await response.json() as { error?: string; duplicate?: boolean };
      if (!response.ok) throw new Error(result.error || 'Evidence could not be appended.');

      setState('saved');
      setMessage(result.duplicate ? 'That evidence reference was already recorded. Nothing was duplicated.' : 'Evidence appended. Reloading the verified dashboard…');
      if (!result.duplicate) window.setTimeout(() => window.location.reload(), 700);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : 'Evidence could not be appended.');
    }
  }

  return (
    <section className="border border-black/15 bg-[#17201c] text-white">
      <div className="grid gap-6 border-b border-white/15 p-6 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.14em] text-white/45">Append-only evidence recorder</p>
          <h2 className="mt-3 font-serif text-4xl">Record completion, never intention.</h2>
          <p className="mt-5 max-w-lg text-xs leading-6 text-white/60">Use a non-secret source reference for an event that actually happened. Research, drafts, friendly conversation, proposal value and payment promises do not qualify. Saved records cannot be edited or deleted.</p>
        </div>
        <form className="grid gap-3 sm:grid-cols-2" onSubmit={appendEvidence}>
          <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/55">
            Contact
            <select className="min-h-11 border border-white/20 bg-[#17201c] px-3 text-sm font-medium normal-case tracking-normal text-white" value={leadId} onChange={(event) => { setLeadId(event.target.value); setState('idle'); }} required>
              <option value="">Select stored enquiry</option>
              {leads.map((lead) => <option key={lead.id} value={lead.id}>{lead.name} · {lead.company} · {lead.email}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/55">
            Completed stage
            <select className="min-h-11 border border-white/20 bg-[#17201c] px-3 text-sm font-medium normal-case tracking-normal text-white" value={eventType} onChange={(event) => { setEventType(event.target.value as EvidenceEventType); setBasis(initialBasis()); setState('idle'); }}>
              {events.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/55">
            Occurred at
            <input className="min-h-11 border border-white/20 bg-white/10 px-3 text-sm font-medium normal-case tracking-normal text-white" type="datetime-local" value={occurredAt} onChange={(event) => { setOccurredAt(event.target.value); setState('idle'); }} required />
          </label>
          <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/55">
            {selectedEvent.reference}
            <input className="min-h-11 border border-white/20 bg-white/10 px-3 text-sm font-medium normal-case tracking-normal text-white" value={evidenceRef} onChange={(event) => { setEvidenceRef(event.target.value); setState('idle'); }} maxLength={160} placeholder="Stable reference, not a draft title" required />
          </label>

          {requiredSignals.length ? (
            <fieldset className="sm:col-span-2">
              <legend className="text-[10px] font-bold uppercase tracking-[.12em] text-white/55">{eventType === 'qualified_lead' ? 'All qualification conditions must be evidenced' : 'All scopeable conditions must be evidenced'}</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-4">
                {requiredSignals.map((signal) => (
                  <label key={signal.value} className="flex min-h-11 items-center gap-3 border border-white/15 bg-white/5 px-3 text-[10px] text-white/65">
                    <input type="checkbox" className="size-4 accent-[#d8ff63]" checked={basis[signal.value]} onChange={(event) => { setBasis((current) => ({ ...current, [signal.value]: event.target.checked })); setState('idle'); }} />
                    {signal.label}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/55 sm:col-span-2">
            Evidence note
            <textarea className="min-h-24 resize-y border border-white/20 bg-white/10 p-3 text-sm font-normal leading-6 normal-case tracking-normal text-white" value={notes} onChange={(event) => { setNotes(event.target.value); setState('idle'); }} maxLength={500} placeholder="Concise factual context. Do not paste credentials, private documents or payment data." />
          </label>
          <label className="flex min-h-12 items-center gap-3 border border-white/20 bg-white/5 px-4 text-[10px] leading-5 text-white/65 sm:col-span-2">
            <input type="checkbox" className="size-4 accent-[#d8ff63]" checked={confirmed} onChange={(event) => { setConfirmed(event.target.checked); setState('idle'); }} />
            I confirm this stage actually occurred and the reference identifies evidence—not research, a draft, estimated value or planned work.
          </label>
          <button className="min-h-11 rounded-full bg-[#d8ff63] px-5 text-xs font-bold uppercase tracking-[.08em] text-[#17201c] disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2" type="submit" disabled={state === 'saving' || !confirmed || !evidenceComplete || leads.length === 0}>
            {state === 'saving' ? 'Appending…' : 'Append evidence record'}
          </button>
          {message ? <p className={'text-xs sm:col-span-2 ' + (state === 'error' ? 'text-[#ffb7ad]' : 'text-white/60')} role={state === 'error' ? 'alert' : 'status'}>{message}</p> : null}
        </form>
      </div>
    </section>
  );
}
