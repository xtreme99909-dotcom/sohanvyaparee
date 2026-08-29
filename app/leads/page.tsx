import { env } from 'cloudflare:workers';
import type { Metadata } from 'next';
import Link from 'next/link';
import { chatGPTSignInPath, getChatGPTUser } from '@/app/chatgpt-auth';
import { ensureLeadsSchema } from '@/db';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Studio Leads', robots: { index: false, follow: false } };

const ownerUserId = 'c7db48cc-aa8c-4865-b83c-1a12fa914a20';

function isStudioOwner(user: { userId: string; email: string }) {
  const configuredOwnerEmail = env.STUDIO_OWNER_EMAIL?.trim().toLowerCase();
  return user.userId === ownerUserId
    || Boolean(configuredOwnerEmail && user.email.trim().toLowerCase() === configuredOwnerEmail);
}

type Lead = {
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
  utm_source: string | null;
};

export default async function LeadsPage() {
  const user = await getChatGPTUser();
  if (!user) {
    return (
      <main className="min-h-screen bg-[#f2f0e9] px-6 py-24 text-[#17201c]">
        <section className="mx-auto max-w-xl border border-black/15 bg-white p-10">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">Private studio area</p>
          <h1 className="mt-6 font-serif text-6xl leading-[.9]">Your lead inbox is protected.</h1>
          <p className="mt-7 text-sm leading-7 text-black/65">Sign in with the ChatGPT account that owns this studio to see project enquiries.</p>
          <a className="mt-8 inline-flex rounded-full bg-[#17201c] px-6 py-4 text-xs font-bold uppercase tracking-[.1em] text-white" href={chatGPTSignInPath('/leads')} target="_top">Sign in to view leads →</a>
        </section>
      </main>
    );
  }
  if (!isStudioOwner(user)) {
    return (
      <main className="min-h-screen bg-[#f2f0e9] px-6 py-24 text-[#17201c]">
        <section className="mx-auto max-w-xl border border-black/15 bg-white p-10">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">Private studio area</p>
          <h1 className="mt-6 font-serif text-6xl leading-[.9]">This account does not have access.</h1>
          <p className="mt-7 text-sm leading-7 text-black/65">The lead inbox is working, but it is restricted to the ChatGPT account that owns this studio.</p>
          <a className="mt-8 inline-flex rounded-full bg-[#17201c] px-6 py-4 text-xs font-bold uppercase tracking-[.1em] text-white" href={chatGPTSignInPath('/leads')} target="_top">Sign in with the owner account →</a>
        </section>
      </main>
    );
  }

  const db = await ensureLeadsSchema();
  const result = await db.prepare(`SELECT id, created_at, name, email, company, project_type, budget,
    timing, goal, source, status, utm_source FROM leads ORDER BY created_at DESC LIMIT 200`).all<Lead>();
  const leads = result.results;
  const newCount = leads.filter((lead) => lead.status === 'new').length;

  return (
    <main className="min-h-screen bg-[#f2f0e9] px-4 py-8 text-[#17201c] sm:px-8 lg:px-12">
      <header className="mx-auto flex max-w-[1500px] flex-col justify-between gap-5 border-b border-black/15 pb-7 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">Sohan Vyaparee · Private studio</p><h1 className="mt-4 font-serif text-6xl leading-none sm:text-8xl">Lead inbox</h1></div>
        <div className="flex gap-3"><Link className="rounded-full border border-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" href="/">View studio ↗</Link><Link className="rounded-full bg-[#17201c] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-white" href="/leads">Refresh</Link></div>
      </header>

      <section className="mx-auto mt-8 grid max-w-[1500px] gap-3 sm:grid-cols-3">
        <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">New enquiries</span><strong className="mt-6 block font-serif text-6xl font-normal">{newCount}</strong></div>
        <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">All captured</span><strong className="mt-6 block font-serif text-6xl font-normal">{leads.length}</strong></div>
        <div className="border border-black/15 bg-[#d8ff63] p-6"><span className="text-xs uppercase tracking-[.14em] text-black/55">One place to check</span><strong className="mt-6 block font-serif text-4xl font-normal leading-none">Website · Social · Search</strong></div>
      </section>

      <section className="mx-auto mt-8 max-w-[1500px] space-y-3">
        {leads.length === 0 ? (
          <div className="border border-dashed border-black/20 p-12 text-center"><h2 className="font-serif text-5xl">The inbox is ready.</h2><p className="mt-4 text-sm text-black/60">New project briefs from every campaign channel will appear here automatically.</p></div>
        ) : leads.map((lead) => (
          <article key={lead.id} className="grid gap-6 border border-black/15 bg-white p-6 lg:grid-cols-[.7fr_.9fr_1.6fr_auto] lg:items-start">
            <div><span className="inline-flex rounded-full bg-[#d8ff63] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em]">{lead.status}</span><p className="mt-4 text-xs text-black/50">{new Date(lead.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p><p className="mt-2 text-xs text-black/50">Source · {lead.utm_source || lead.source}</p></div>
            <div><h2 className="font-serif text-4xl leading-none">{lead.name}</h2><p className="mt-3 text-sm font-semibold">{lead.company}</p><p className="mt-2 text-xs text-black/55">{lead.email}</p></div>
            <div><p className="text-xs font-bold uppercase tracking-[.12em] text-black/50">{lead.project_type} · {lead.budget} · {lead.timing}</p><p className="mt-4 max-w-3xl text-sm leading-7 text-black/70">{lead.goal}</p></div>
            <a className="inline-flex rounded-full bg-[#17201c] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-white" href={`mailto:${lead.email}?subject=${encodeURIComponent(`Your website project — ${lead.company}`)}`}>Reply →</a>
          </article>
        ))}
      </section>
    </main>
  );
}
