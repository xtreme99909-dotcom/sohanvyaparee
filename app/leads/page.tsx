/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import { env } from 'cloudflare:workers';
import type { Metadata } from 'next';
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

type MarketingSummary = {
  visits: number;
  proof_views: number;
  enquiry_clicks: number;
  brief_starts: number;
};

type EventChannel = {
  source: string;
  medium: string;
  campaign: string | null;
  visits: number;
  proof_views: number;
  enquiry_clicks: number;
  brief_starts: number;
};

type LeadChannel = {
  source: string;
  medium: string;
  campaign: string | null;
  leads: number;
};

type Channel = EventChannel & { leads: number };

function channelKey(source: string, medium: string, campaign: string | null) {
  return `${source}\u0000${medium}\u0000${campaign || ''}`;
}

export default async function LeadsPage() {
  const user = await getChatGPTUser();
  if (!user) {
    return (
      <main className="min-h-screen bg-[#f2f0e9] px-6 py-24 text-[#17201c]">
        <section className="mx-auto max-w-xl border border-black/15 bg-white p-10">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">Private studio area</p>
          <h1 className="mt-6 font-serif text-6xl leading-[.9]">Your lead inbox is protected.</h1>
          <p className="mt-7 text-sm leading-7 text-black/65">Sign in with the ChatGPT account that owns this studio to see project enquiries.</p>
          <a className="mt-8 inline-flex rounded-full bg-[#17201c] px-6 py-4 text-xs font-bold uppercase tracking-[.1em]" style={{ color: '#fff' }} href={chatGPTSignInPath('/leads')} target="_top">Sign in to view leads →</a>
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
          <a className="mt-8 inline-flex rounded-full bg-[#17201c] px-6 py-4 text-xs font-bold uppercase tracking-[.1em]" style={{ color: '#fff' }} href={chatGPTSignInPath('/leads')} target="_top">Sign in with the owner account →</a>
        </section>
      </main>
    );
  }

  const db = await ensureLeadsSchema();
  const [result, marketing, eventChannelResult, leadChannelResult, leadSummary] = await Promise.all([
    db.prepare(`SELECT id, created_at, name, email, company, project_type, budget,
      timing, goal, source, status, utm_source FROM leads ORDER BY created_at DESC LIMIT 200`).all<Lead>(),
    db.prepare(`SELECT
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS visits,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path = '/work/bongfoods' THEN session_id END) AS proof_views,
      COUNT(DISTINCT CASE WHEN event_type = 'enquiry_click' THEN session_id END) AS enquiry_clicks,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_start' THEN session_id END) AS brief_starts
      FROM marketing_events
      WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')`).first<MarketingSummary>(),
    db.prepare(`SELECT source, medium, campaign,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS visits,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path = '/work/bongfoods' THEN session_id END) AS proof_views,
      COUNT(DISTINCT CASE WHEN event_type = 'enquiry_click' THEN session_id END) AS enquiry_clicks,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_start' THEN session_id END) AS brief_starts
      FROM marketing_events
      WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')
      GROUP BY source, medium, campaign`).all<EventChannel>(),
    db.prepare(`SELECT
      COALESCE(NULLIF(utm_source, ''), NULLIF(source, ''), 'website') AS source,
      COALESCE(NULLIF(utm_medium, ''), 'none') AS medium,
      NULLIF(utm_campaign, '') AS campaign,
      COUNT(*) AS leads
      FROM leads
      WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')
      GROUP BY source, medium, campaign`).all<LeadChannel>(),
    db.prepare(`SELECT COUNT(*) AS total FROM leads
      WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')`).first<{ total: number }>(),
  ]);
  const leads = result.results;
  const newCount = leads.filter((lead) => lead.status === 'new').length;
  const channelMap = new Map<string, Channel>();
  for (const row of eventChannelResult.results) {
    channelMap.set(channelKey(row.source, row.medium, row.campaign), { ...row, leads: 0 });
  }
  for (const row of leadChannelResult.results) {
    const key = channelKey(row.source, row.medium, row.campaign);
    const existing = channelMap.get(key);
    channelMap.set(key, existing ? { ...existing, leads: row.leads } : {
      source: row.source,
      medium: row.medium,
      campaign: row.campaign,
      visits: 0,
      proof_views: 0,
      enquiry_clicks: 0,
      brief_starts: 0,
      leads: row.leads,
    });
  }
  const channels = [...channelMap.values()].sort((a, b) =>
    (b.leads * 10 + b.brief_starts * 4 + b.enquiry_clicks * 2 + b.visits)
    - (a.leads * 10 + a.brief_starts * 4 + a.enquiry_clicks * 2 + a.visits));
  const leadsLast30Days = leadSummary?.total || 0;

  return (
    <main className="min-h-screen bg-[#f2f0e9] px-4 py-8 text-[#17201c] sm:px-8 lg:px-12">
      <header className="mx-auto flex max-w-[1500px] flex-col justify-between gap-5 border-b border-black/15 pb-7 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">Sohan Vyaparee · Private studio</p><h1 className="mt-4 font-serif text-6xl leading-none sm:text-8xl">Lead inbox</h1></div>
        <div className="flex gap-3"><a className="rounded-full border border-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" href="/">View studio ↗</a><a className="rounded-full bg-[#17201c] px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" style={{ color: '#fff' }} href="/leads">Refresh</a></div>
      </header>

      <section className="mx-auto mt-8 max-w-[1500px]">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-black/50">Marketing snapshot · last 30 days</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Attention to enquiry.</h2></div><p className="max-w-lg text-xs leading-6 text-black/55">First-party signals from this website only. LinkedIn, Instagram and Upwork profile analytics stay on those platforms until a prospect visits this site.</p></div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Site visits</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.visits || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Proof views</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.proof_views || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Enquiry clicks</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.enquiry_clicks || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Briefs started</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.brief_starts || 0}</strong></div>
          <div className="border border-black/15 bg-[#d8ff63] p-6"><span className="text-xs uppercase tracking-[.14em] text-black/55">Leads captured</span><strong className="mt-6 block font-serif text-6xl font-normal">{leadsLast30Days}</strong></div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1500px] border border-black/15 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-black/15 p-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-black/50">Channel evidence</p><h2 className="mt-3 font-serif text-4xl">What is creating intent</h2></div><p className="text-xs text-black/50">Source → campaign → on-site action</p></div>
        {channels.length === 0 ? (
          <p className="p-8 text-sm leading-7 text-black/60">Tracking is ready. Channel rows will appear after a public page visit or enquiry action.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-xs">
              <thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-[.12em] text-black/45"><th className="p-4 font-semibold">Source</th><th className="p-4 font-semibold">Campaign</th><th className="p-4 font-semibold">Visits</th><th className="p-4 font-semibold">Proof</th><th className="p-4 font-semibold">Clicks</th><th className="p-4 font-semibold">Starts</th><th className="p-4 font-semibold">Leads</th></tr></thead>
              <tbody>{channels.map((channel) => (
                <tr key={channelKey(channel.source, channel.medium, channel.campaign)} className="border-b border-black/10 last:border-0">
                  <td className="p-4"><strong className="block text-sm">{channel.source}</strong><span className="mt-1 block text-black/45">{channel.medium}</span></td>
                  <td className="max-w-xs p-4 text-black/60">{channel.campaign || '—'}</td>
                  <td className="p-4 font-serif text-2xl">{channel.visits}</td><td className="p-4 font-serif text-2xl">{channel.proof_views}</td><td className="p-4 font-serif text-2xl">{channel.enquiry_clicks}</td><td className="p-4 font-serif text-2xl">{channel.brief_starts}</td><td className="p-4 font-serif text-2xl">{channel.leads}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mx-auto mt-8 grid max-w-[1500px] gap-3 sm:grid-cols-3">
        <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">New enquiries</span><strong className="mt-6 block font-serif text-6xl font-normal">{newCount}</strong></div>
        <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">All captured</span><strong className="mt-6 block font-serif text-6xl font-normal">{leads.length}</strong></div>
        <div className="border border-black/15 bg-[#17201c] p-6 text-white"><span className="text-xs uppercase tracking-[.14em] text-white/55">One place to check</span><strong className="mt-6 block font-serif text-4xl font-normal leading-none">Website · Social · Search</strong></div>
      </section>

      <section className="mx-auto mt-8 max-w-[1500px] space-y-3">
        {leads.length === 0 ? (
          <div className="border border-dashed border-black/20 p-12 text-center"><h2 className="font-serif text-5xl">The inbox is ready.</h2><p className="mt-4 text-sm text-black/60">New project briefs from every campaign channel will appear here automatically.</p></div>
        ) : leads.map((lead) => (
          <article key={lead.id} className="grid gap-6 border border-black/15 bg-white p-6 lg:grid-cols-[.7fr_.9fr_1.6fr_auto] lg:items-start">
            <div><span className="inline-flex rounded-full bg-[#d8ff63] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em]">{lead.status}</span><p className="mt-4 text-xs text-black/50">{new Date(lead.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p><p className="mt-2 text-xs text-black/50">Source · {lead.utm_source || lead.source}</p></div>
            <div><h2 className="font-serif text-4xl leading-none">{lead.name}</h2><p className="mt-3 text-sm font-semibold">{lead.company}</p><p className="mt-2 text-xs text-black/55">{lead.email}</p></div>
            <div><p className="text-xs font-bold uppercase tracking-[.12em] text-black/50">{lead.project_type} · {lead.budget} · {lead.timing}</p><p className="mt-4 max-w-3xl text-sm leading-7 text-black/70">{lead.goal}</p></div>
            <a className="inline-flex rounded-full bg-[#17201c] px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" style={{ color: '#fff' }} href={`mailto:${lead.email}?subject=${encodeURIComponent(`Your website project — ${lead.company}`)}`}>Reply →</a>
          </article>
        ))}
      </section>
    </main>
  );
}
