'use client';

import { FormEvent, useState } from 'react';
import { buildLeadReply, classifyLead, nextDecisionFor, type LeadKind, type LeadStatus } from './lead-classification';

export type LeadRecord = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  project_type: string;
  budget: string;
  timing: string;
  goal: string;
  source: string;
  status: string;
  owner_notes: string;
  next_action_at: string | null;
  updated_at: string | null;
  utm_source: string | null;
};

const statusOptions: Array<{ value: LeadStatus; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'closed', label: 'Closed' },
];

function asLeadStatus(value: string): LeadStatus {
  return statusOptions.some((option) => option.value === value) ? value as LeadStatus : 'new';
}

function LeadCard({ lead, onSaved }: { lead: LeadRecord; onSaved: (lead: LeadRecord) => void }) {
  const [status, setStatus] = useState<LeadStatus>(asLeadStatus(lead.status));
  const [ownerNotes, setOwnerNotes] = useState(lead.owner_notes || '');
  const [nextActionAt, setNextActionAt] = useState(lead.next_action_at || '');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const kind = classifyLead(lead.project_type);
  const reply = buildLeadReply(lead);
  const mailto = `mailto:${lead.email}?subject=${encodeURIComponent(reply.subject)}&body=${encodeURIComponent(reply.body)}`;

  async function saveTriage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState('saving');
    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status, ownerNotes, nextActionAt }),
      });
      if (!response.ok) throw new Error('Save failed');
      const result = (await response.json()) as Pick<LeadRecord, 'status' | 'owner_notes' | 'next_action_at' | 'updated_at'>;
      onSaved({ ...lead, ...result });
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
  }

  async function copyReply() {
    try {
      await navigator.clipboard.writeText(`Subject: ${reply.subject}\n\n${reply.body}`);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  }

  return (
    <article className="border border-black/15 bg-white">
      <div className="grid gap-6 border-b border-black/10 p-6 lg:grid-cols-[.62fr_.8fr_1.45fr]">
        <div><div className="flex flex-wrap gap-2"><span className="inline-flex rounded-full bg-[#d8ff63] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em]">{status}</span><span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] ${kind === 'partner' ? 'bg-[#252c57] text-white' : 'border border-black/15 bg-white text-black/55'}`}>{kind === 'partner' ? 'Partner opportunity' : 'Direct project'}</span></div><p className="mt-4 text-xs text-black/50">{new Date(lead.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p><p className="mt-2 text-xs text-black/50">Source · {lead.utm_source || lead.source}</p></div>
        <div><h2 className="font-serif text-4xl leading-none">{lead.name}</h2><p className="mt-3 text-sm font-semibold">{lead.company}</p><a className="mt-2 inline-block border-b border-black/25 pb-0.5 text-xs text-black/60" href={`mailto:${lead.email}`}>{lead.email}</a></div>
        <div><p className="text-xs font-bold uppercase tracking-[.12em] text-black/50">{lead.project_type} · {lead.budget} · {lead.timing}</p><p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-black/70">{lead.goal}</p></div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={saveTriage} className="grid content-start gap-5 border-b border-black/10 p-6 lg:border-b-0 lg:border-r">
          <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Owner triage · {kind === 'partner' ? 'collaboration' : 'direct client'}</p><p className="mt-3 text-sm leading-6 text-black/60">{nextDecisionFor(kind, status)}</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-black/50">Stage<select className="min-h-11 border border-black/20 bg-white px-3 text-sm font-medium normal-case tracking-normal text-[#17201c]" value={status} onChange={(event) => { setStatus(asLeadStatus(event.target.value)); setSaveState('idle'); }}>{statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
            <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-black/50">Next action date<input className="min-h-11 border border-black/20 bg-white px-3 text-sm font-medium normal-case tracking-normal text-[#17201c]" type="date" value={nextActionAt} onChange={(event) => { setNextActionAt(event.target.value); setSaveState('idle'); }} /></label>
          </div>
          <label className="grid gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-black/50">Private owner note<textarea className="min-h-28 resize-y border border-black/20 bg-white p-3 text-sm font-normal leading-6 normal-case tracking-normal text-[#17201c]" maxLength={2000} value={ownerNotes} onChange={(event) => { setOwnerNotes(event.target.value); setSaveState('idle'); }} placeholder="Authority, current build, timing, integration, budget or agreed follow-up…" /></label>
          <div className="flex flex-wrap items-center gap-3"><button className="rounded-full bg-[#17201c] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-white disabled:cursor-wait disabled:opacity-60" type="submit" disabled={saveState === 'saving'}>{saveState === 'saving' ? 'Saving…' : 'Save triage'}</button><span className="text-xs text-black/50" aria-live="polite">{saveState === 'saved' ? 'Saved to the private desk.' : saveState === 'error' ? 'Could not save. Try once more.' : ''}</span></div>
        </form>

        <div className="grid content-start gap-5 bg-[#f7f5ee] p-6">
          <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">First-response direction</p><h3 className="mt-3 font-serif text-3xl leading-none">{reply.direction}</h3></div>
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[.1em] text-black/50">{reply.signals.map((signal) => <span key={signal} className="border border-black/15 bg-white px-2 py-3">{signal}</span>)}</div>
          <p className="max-h-44 overflow-auto whitespace-pre-wrap border-l-2 border-[#17201c] pl-4 text-xs leading-6 text-black/60">{reply.body}</p>
          <div className="flex flex-wrap items-center gap-3"><a className="rounded-full bg-[#d8ff63] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-[#17201c]" href={mailto}>Open email draft →</a><button className="rounded-full border border-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" type="button" onClick={copyReply}>Copy draft</button><span className="text-xs text-black/50" aria-live="polite">{copyState === 'copied' ? 'Copied.' : copyState === 'error' ? 'Copy unavailable.' : ''}</span></div>
          <p className="text-[10px] leading-5 text-black/45">Opening the draft does not send it. Review every line, then record the actual next action above.</p>
        </div>
      </div>
    </article>
  );
}

export function LeadInbox({ initialLeads }: { initialLeads: LeadRecord[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [kindFilter, setKindFilter] = useState<'all' | LeadKind>('all');
  const newCount = leads.filter((lead) => lead.status === 'new').length;
  const qualifiedCount = leads.filter((lead) => lead.status === 'qualified').length;
  const directCount = leads.filter((lead) => classifyLead(lead.project_type) === 'direct').length;
  const partnerCount = leads.length - directCount;
  const filteredLeads = kindFilter === 'all' ? leads : leads.filter((lead) => classifyLead(lead.project_type) === kindFilter);

  function updateLead(updated: LeadRecord) {
    setLeads((current) => current.map((lead) => lead.id === updated.id ? updated : lead));
  }

  return (
    <>
      <section className="mx-auto mt-8 grid max-w-[1500px] gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">New enquiries</span><strong className="mt-6 block font-serif text-6xl font-normal">{newCount}</strong></div>
        <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Qualified</span><strong className="mt-6 block font-serif text-6xl font-normal">{qualifiedCount}</strong></div>
        <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Direct projects</span><strong className="mt-6 block font-serif text-6xl font-normal">{directCount}</strong></div>
        <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Partner opportunities</span><strong className="mt-6 block font-serif text-6xl font-normal">{partnerCount}</strong></div>
        <div className="border border-black/15 bg-[#17201c] p-6 text-white"><span className="text-xs uppercase tracking-[.14em] text-white/55">One owner workflow</span><strong className="mt-6 block font-serif text-4xl font-normal leading-none">Review · Reply · Next action</strong></div>
      </section>

      <section className="mx-auto mt-8 max-w-[1500px]">
        <div className="mb-3 flex flex-col justify-between gap-4 border border-black/15 bg-white p-4 sm:flex-row sm:items-center">
          <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Inbox view</p><p className="mt-1 text-xs text-black/55">Direct buyers and complementary partners stay in one protected desk with separate qualification rules.</p></div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter leads by enquiry type">
            {([['all', `All · ${leads.length}`], ['direct', `Direct · ${directCount}`], ['partner', `Partners · ${partnerCount}`]] as const).map(([value, label]) => (
              <button key={value} type="button" aria-pressed={kindFilter === value} className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[.1em] ${kindFilter === value ? 'bg-[#17201c] text-white' : 'border border-black/15 bg-white text-black/55'}`} onClick={() => setKindFilter(value)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="border border-dashed border-black/20 p-12 text-center"><h2 className="font-serif text-5xl">{leads.length === 0 ? 'The inbox is ready.' : `No ${kindFilter === 'partner' ? 'partner opportunities' : 'direct projects'} yet.`}</h2><p className="mt-4 text-sm text-black/60">{leads.length === 0 ? 'New project and collaboration briefs from every campaign channel will appear here automatically.' : 'Choose another view or wait for a qualified enquiry—do not manufacture one.'}</p></div>
        ) : filteredLeads.map((lead) => <LeadCard key={lead.id} lead={lead} onSaved={updateLead} />)}
        </div>
      </section>
    </>
  );
}
