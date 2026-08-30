/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext Link prefetch throws at runtime; full-page navigation is intentional here. */
import type { Metadata } from 'next';
import { chatGPTSignInPath, getChatGPTUser, isStudioOwner } from '@/app/chatgpt-auth';
import { LeadInbox, type LeadRecord } from '@/app/leads/lead-inbox';
import { OwnerTrackingExclusion } from '@/app/leads/owner-tracking-exclusion';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Studio Leads', robots: { index: false, follow: false } };

type MarketingSummary = {
  visits: number;
  service_views: number;
  proof_views: number;
  proof_clicks: number;
  enquiry_clicks: number;
  planner_starts: number;
  planner_completions: number;
  brief_starts: number;
  brief_submits: number;
  brief_successes: number;
  brief_errors: number;
};

type EventChannel = {
  source: string;
  medium: string;
  campaign: string | null;
  visits: number;
  service_views: number;
  proof_views: number;
  proof_clicks: number;
  enquiry_clicks: number;
  planner_starts: number;
  planner_completions: number;
  brief_starts: number;
  brief_submits: number;
  brief_successes: number;
  brief_errors: number;
};

type LeadChannel = {
  source: string;
  medium: string;
  campaign: string | null;
  leads: number;
};

type Channel = EventChannel & { leads: number };

type PaymentRecord = {
  id: string;
  created_at: string;
  reference_id: string;
  description: string;
  amount: number;
  amount_paid: number;
  currency: string;
  status: string;
  notification_status: string;
  agreement_reference: string;
  scope_version: string;
  delivery_window: string;
  client_policy_accepted_at: string | null;
  refunded_amount: number;
  refund_status: string;
  customer_name: string | null;
  customer_email: string | null;
  company: string;
};

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).format(amount / 100);
}

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

  const { ensureLeadsSchema } = await import('@/db');
  const db = await ensureLeadsSchema();
  const [result, marketing, eventChannelResult, leadChannelResult, leadSummary, paymentResult] = await Promise.all([
    db.prepare(`SELECT id, created_at, name, email, company, project_type, budget,
      timing, goal, source, status, owner_notes, next_action_at, updated_at, utm_source
      FROM leads ORDER BY created_at DESC LIMIT 200`).all<LeadRecord>(),
    db.prepare(`SELECT
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS visits,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path = '/services/complete-website-launch' THEN session_id END) AS service_views,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path LIKE '/work/%' THEN session_id END) AS proof_views,
      COUNT(DISTINCT CASE WHEN event_type = 'proof_click' THEN session_id END) AS proof_clicks,
      COUNT(DISTINCT CASE WHEN event_type = 'enquiry_click' THEN session_id END) AS enquiry_clicks,
      COUNT(DISTINCT CASE WHEN event_type = 'planner_start' THEN session_id END) AS planner_starts,
      COUNT(DISTINCT CASE WHEN event_type = 'planner_complete' THEN session_id END) AS planner_completions,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_start' THEN session_id END) AS brief_starts,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_submit' THEN session_id END) AS brief_submits,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_success' THEN session_id END) AS brief_successes,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_error' THEN session_id END) AS brief_errors
      FROM marketing_events
      WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')
        AND source NOT LIKE 'internal_%'`).first<MarketingSummary>(),
    db.prepare(`SELECT source, medium, campaign,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS visits,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path = '/services/complete-website-launch' THEN session_id END) AS service_views,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path LIKE '/work/%' THEN session_id END) AS proof_views,
      COUNT(DISTINCT CASE WHEN event_type = 'proof_click' THEN session_id END) AS proof_clicks,
      COUNT(DISTINCT CASE WHEN event_type = 'enquiry_click' THEN session_id END) AS enquiry_clicks,
      COUNT(DISTINCT CASE WHEN event_type = 'planner_start' THEN session_id END) AS planner_starts,
      COUNT(DISTINCT CASE WHEN event_type = 'planner_complete' THEN session_id END) AS planner_completions,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_start' THEN session_id END) AS brief_starts,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_submit' THEN session_id END) AS brief_submits,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_success' THEN session_id END) AS brief_successes,
      COUNT(DISTINCT CASE WHEN event_type = 'brief_error' THEN session_id END) AS brief_errors
      FROM marketing_events
      WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')
        AND source NOT LIKE 'internal_%'
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
    db.prepare(`SELECT payment_links.id, payment_links.created_at, payment_links.reference_id,
      payment_links.description, payment_links.amount, payment_links.amount_paid, payment_links.currency,
      payment_links.status, payment_links.notification_status, payment_links.customer_name,
      payment_links.customer_email, payment_links.agreement_reference, payment_links.scope_version,
      payment_links.delivery_window, payment_links.client_policy_accepted_at,
      payment_links.refunded_amount, payment_links.refund_status, leads.company
      FROM payment_links JOIN leads ON leads.id = payment_links.lead_id
      ORDER BY payment_links.created_at DESC LIMIT 100`).all<PaymentRecord>(),
  ]);
  const leads = result.results;
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
      service_views: 0,
      proof_views: 0,
      proof_clicks: 0,
      enquiry_clicks: 0,
      planner_starts: 0,
      planner_completions: 0,
      brief_starts: 0,
      brief_submits: 0,
      brief_successes: 0,
      brief_errors: 0,
      leads: row.leads,
    });
  }
  const channels = [...channelMap.values()].sort((a, b) =>
    (b.leads * 14 + b.brief_successes * 12 + b.brief_errors * 9 + b.brief_submits * 8
      + b.planner_completions * 5 + b.planner_starts * 4 + b.brief_starts * 4
      + b.enquiry_clicks * 3 + b.proof_clicks * 2 + b.service_views * 2 + b.proof_views + b.visits)
    - (a.leads * 14 + a.brief_successes * 12 + a.brief_errors * 9 + a.brief_submits * 8
      + a.planner_completions * 5 + a.planner_starts * 4 + a.brief_starts * 4
      + a.enquiry_clicks * 3 + a.proof_clicks * 2 + a.service_views * 2 + a.proof_views + a.visits));
  const leadsLast30Days = leadSummary?.total || 0;
  const diagnosticMessage = marketing?.brief_errors
    ? 'Submission errors were recorded. Check the affected channel and compare stored successes with the lead inbox before following up.'
    : marketing?.brief_submits && marketing.brief_successes < marketing.brief_submits
      ? 'At least one tracked submission has no matching success event yet. This can indicate abandonment during the request or a server-side failure.'
      : marketing?.brief_successes
        ? 'The tracked form is recording successful submissions. Compare stored successes with Leads captured to spot any attribution mismatch.'
        : 'These diagnostic events begin with the 31 August release. Older sessions remain visible in the acquisition totals above, but are not retroactively classified.';

  return (
    <main className="min-h-screen bg-[#f2f0e9] px-4 py-8 text-[#17201c] sm:px-8 lg:px-12">
      <header className="mx-auto flex max-w-[1500px] flex-col justify-between gap-5 border-b border-black/15 pb-7 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">SP Studios · Private owner area</p><h1 className="mt-4 font-serif text-6xl leading-none sm:text-8xl">Lead inbox</h1></div>
        <div className="flex gap-3"><a className="rounded-full border border-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" href="/">View studio ↗</a><a className="rounded-full bg-[#17201c] px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" style={{ color: '#fff' }} href="/leads">Refresh</a></div>
      </header>

      <section className="mx-auto mt-8 max-w-[1500px]">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-black/50">Marketing snapshot · last 30 days</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Attention to enquiry.</h2></div><p className="max-w-lg text-xs leading-6 text-black/55">First-party browser sessions from this website only—not identified people or customers. Known owner browsers are excluded after opening this protected dashboard, but older unmarked visits may remain in the totals.</p></div>
        <OwnerTrackingExclusion />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Site visits</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.visits || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Offer views</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.service_views || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Proof views</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.proof_views || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Enquiry clicks</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.enquiry_clicks || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Briefs started</span><strong className="mt-6 block font-serif text-6xl font-normal">{marketing?.brief_starts || 0}</strong></div>
          <div className="border border-black/15 bg-[#d8ff63] p-6"><span className="text-xs uppercase tracking-[.14em] text-black/55">Leads captured</span><strong className="mt-6 block font-serif text-6xl font-normal">{leadsLast30Days}</strong></div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.16em] text-black/50">Conversion diagnostics · new release</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Where intent stops.</h2></div>
          <p className="max-w-2xl text-xs leading-6 text-black/55">{diagnosticMessage}</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Proof clicks</span><strong className="mt-6 block font-serif text-5xl font-normal">{marketing?.proof_clicks || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Planner starts</span><strong className="mt-6 block font-serif text-5xl font-normal">{marketing?.planner_starts || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Plans completed</span><strong className="mt-6 block font-serif text-5xl font-normal">{marketing?.planner_completions || 0}</strong></div>
          <div className="border border-black/15 bg-white p-6"><span className="text-xs uppercase tracking-[.14em] text-black/50">Brief submissions</span><strong className="mt-6 block font-serif text-5xl font-normal">{marketing?.brief_submits || 0}</strong></div>
          <div className="border border-black/15 bg-[#d8ff63] p-6"><span className="text-xs uppercase tracking-[.14em] text-black/55">Stored successfully</span><strong className="mt-6 block font-serif text-5xl font-normal">{marketing?.brief_successes || 0}</strong></div>
          <div className={`border p-6 ${marketing?.brief_errors ? 'border-[#a4382c]/35 bg-[#f7ded9]' : 'border-black/15 bg-white'}`}><span className="text-xs uppercase tracking-[.14em] text-black/50">Error sessions</span><strong className="mt-6 block font-serif text-5xl font-normal">{marketing?.brief_errors || 0}</strong></div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1500px] border border-black/15 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-black/15 p-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-black/50">Channel evidence</p><h2 className="mt-3 font-serif text-4xl">What is creating intent</h2></div><p className="text-xs text-black/50">Source → campaign → on-site action</p></div>
        {channels.length === 0 ? (
          <p className="p-8 text-sm leading-7 text-black/60">Tracking is ready. Channel rows will appear after a public page visit or enquiry action.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px] border-collapse text-left text-xs">
              <thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-[.12em] text-black/45"><th className="p-4 font-semibold">Source</th><th className="p-4 font-semibold">Campaign</th><th className="p-4 font-semibold">Visits</th><th className="p-4 font-semibold">Offer</th><th className="p-4 font-semibold">Proof</th><th className="p-4 font-semibold">Enquiry</th><th className="p-4 font-semibold">Planner</th><th className="p-4 font-semibold">Brief</th><th className="p-4 font-semibold">Stored</th><th className="p-4 font-semibold">Errors</th><th className="p-4 font-semibold">Leads</th></tr></thead>
              <tbody>{channels.map((channel) => (
                <tr key={channelKey(channel.source, channel.medium, channel.campaign)} className="border-b border-black/10 last:border-0">
                  <td className="p-4"><strong className="block text-sm">{channel.source}</strong><span className="mt-1 block text-black/45">{channel.medium}</span></td>
                  <td className="max-w-xs p-4 text-black/60">{channel.campaign || '—'}</td>
                  <td className="p-4 font-serif text-2xl">{channel.visits}</td>
                  <td className="p-4 font-serif text-2xl">{channel.service_views}</td>
                  <td className="p-4"><strong className="font-serif text-2xl font-normal">{channel.proof_views} / {channel.proof_clicks}</strong><span className="mt-1 block text-[9px] uppercase tracking-[.1em] text-black/40">view / click</span></td>
                  <td className="p-4 font-serif text-2xl">{channel.enquiry_clicks}</td>
                  <td className="p-4"><strong className="font-serif text-2xl font-normal">{channel.planner_starts} / {channel.planner_completions}</strong><span className="mt-1 block text-[9px] uppercase tracking-[.1em] text-black/40">start / done</span></td>
                  <td className="p-4"><strong className="font-serif text-2xl font-normal">{channel.brief_starts} / {channel.brief_submits}</strong><span className="mt-1 block text-[9px] uppercase tracking-[.1em] text-black/40">start / submit</span></td>
                  <td className="p-4 font-serif text-2xl">{channel.brief_successes}</td>
                  <td className={`p-4 font-serif text-2xl ${channel.brief_errors ? 'text-[#a4382c]' : ''}`}>{channel.brief_errors}</td>
                  <td className="p-4 font-serif text-2xl">{channel.leads}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mx-auto mt-8 max-w-[1500px] border border-black/15 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-black/15 p-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-black/50">Milestone payments</p><h2 className="mt-3 font-serif text-4xl">Issued, verified, notified.</h2></div><p className="max-w-lg text-xs leading-6 text-black/50">A checkout return is never treated as payment. Only a signed provider webhook changes a milestone to paid.</p></div>
        {paymentResult.results.length === 0 ? (
          <p className="p-8 text-sm leading-7 text-black/60">No payment links have been issued. Qualify a real enquiry, agree the scope and contract, then create its milestone link from that lead card.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-xs">
              <thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-[.12em] text-black/45"><th className="p-4 font-semibold">Client</th><th className="p-4 font-semibold">Milestone</th><th className="p-4 font-semibold">Amount</th><th className="p-4 font-semibold">Agreement proof</th><th className="p-4 font-semibold">Status</th><th className="p-4 font-semibold">Alert</th><th className="p-4 font-semibold">Reference</th></tr></thead>
              <tbody>{paymentResult.results.map((payment) => (
                <tr key={payment.id} className="border-b border-black/10 last:border-0">
                  <td className="p-4"><strong className="block text-sm">{payment.customer_name || payment.company}</strong><span className="mt-1 block text-black/45">{payment.customer_email || payment.company}</span></td>
                  <td className="max-w-sm p-4 text-black/60">{payment.description}</td>
                  <td className="p-4"><span className="font-serif text-2xl">{formatMoney(payment.amount_paid || payment.amount, payment.currency)}</span>{payment.refunded_amount ? <span className="mt-1 block text-[10px] text-black/45">Refunded {formatMoney(payment.refunded_amount, payment.currency)} · {payment.refund_status}</span> : null}</td>
                  <td className="p-4"><strong className="block text-[11px]">{payment.agreement_reference || 'Legacy request'}</strong><span className="mt-1 block text-[10px] text-black/45">{payment.scope_version || 'No scope version'} · {payment.client_policy_accepted_at ? 'policies acknowledged' : 'awaiting acknowledgement'}</span></td>
                  <td className="p-4"><span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.1em] ${payment.status === 'paid' ? 'bg-[#d8ff63]' : 'border border-black/15'}`}>{payment.status.replaceAll('_', ' ')}</span></td>
                  <td className="p-4 text-black/55">{payment.notification_status.replaceAll('_', ' ')}</td>
                  <td className="p-4 font-mono text-[11px] text-black/55"><a className="border-b border-black/20" href={`/pay/${payment.reference_id}`} target="_blank" rel="noreferrer">{payment.reference_id} ↗</a></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>

      <LeadInbox initialLeads={leads} />
    </main>
  );
}
