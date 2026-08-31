/* eslint-disable @next/next/no-html-link-for-pages -- Sites/vinext full-page navigation is intentional. */
import type { Metadata } from 'next';
import { chatGPTSignInPath, getChatGPTUser, isStudioOwner } from '@/app/chatgpt-auth';
import { OwnerTrackingExclusion } from '@/app/leads/owner-tracking-exclusion';
import { buildExecutiveSummary, formatMoneySeries } from '@/app/revenue/dashboard-model';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Owner Revenue Evidence',
  robots: { index: false, follow: false },
};

type MarketingSummary = {
  visits: number;
  offer_views: number;
  proof_views: number;
  brief_starts: number;
  brief_submissions: number;
};

type LeadSummary = {
  stored_enquiries: number;
  unique_contacts: number;
  qualified_contacts: number;
};

type AgreementSummary = { accepted_sows: number };

type MoneyRow = {
  currency: string;
  captured_milestones: number;
  captured_amount: number;
  refund_cases: number;
  refunded_amount: number;
  review_required: number;
};

type EventChannel = {
  source: string;
  medium: string;
  campaign: string | null;
  visits: number;
  offer_views: number;
  proof_views: number;
  brief_starts: number;
  brief_submissions: number;
};

type LeadChannel = {
  source: string;
  medium: string;
  campaign: string | null;
  stored_enquiries: number;
  unique_contacts: number;
  qualified_contacts: number;
};

type CommercialChannel = {
  source: string;
  medium: string;
  campaign: string | null;
  accepted_sows: number;
  captured_milestones: number;
};

type Channel = EventChannel & LeadChannel & CommercialChannel;

type DuplicateContact = {
  email: string;
  name: string;
  company: string;
  stored_enquiries: number;
};

type StaleLead = {
  id: string;
  name: string;
  company: string;
  status: string;
  next_action_at: string | null;
  age_days: number;
  reason: string;
};

type Stage = {
  name: string;
  value: number | null;
  window: string;
  source: string;
  note: string;
};

function asNumber(value: number | null | undefined) {
  return Number(value || 0);
}

function channelKey(source: string, medium: string, campaign: string | null) {
  return [source, medium, campaign || ''].join('|');
}

function blankChannel(source: string, medium: string, campaign: string | null): Channel {
  return {
    source,
    medium,
    campaign,
    visits: 0,
    offer_views: 0,
    proof_views: 0,
    brief_starts: 0,
    brief_submissions: 0,
    stored_enquiries: 0,
    unique_contacts: 0,
    qualified_contacts: 0,
    accepted_sows: 0,
    captured_milestones: 0,
  };
}

function AccessGate({ denied }: { denied?: boolean }) {
  return (
    <main className="min-h-screen bg-[#f2f0e9] px-6 py-24 text-[#17201c]">
      <section className="mx-auto max-w-xl border border-black/15 bg-white p-10">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">Private studio area</p>
        <h1 className="mt-6 font-serif text-6xl leading-[.9]">{denied ? 'This account does not have access.' : 'Revenue evidence is protected.'}</h1>
        <p className="mt-7 text-sm leading-7 text-black/65">{denied ? 'Use the ChatGPT account that owns SP Studios.' : 'Sign in with the studio owner account to review verified funnel and money evidence.'}</p>
        <a className="mt-8 inline-flex rounded-full bg-[#17201c] px-6 py-4 text-xs font-bold uppercase tracking-[.1em] text-white" href={chatGPTSignInPath('/revenue')} target="_top">Sign in to owner dashboard →</a>
      </section>
    </main>
  );
}

export default async function RevenuePage() {
  const user = await getChatGPTUser();
  if (!user) return <AccessGate />;
  if (!isStudioOwner(user)) return <AccessGate denied />;

  const { ensureLeadsSchema } = await import('@/db');
  const db = await ensureLeadsSchema();

  const [
    marketing,
    leadSummary,
    agreementSummary,
    moneyResult,
    eventChannelResult,
    leadChannelResult,
    commercialChannelResult,
    duplicateResult,
    staleResult,
  ] = await Promise.all([
    db.prepare(
      'SELECT ' +
      "COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS visits, " +
      "COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path IN ('/services/complete-website-launch', '/services/d2c-commerce-launch', '/services/b2b-lead-generation-websites') THEN session_id END) AS offer_views, " +
      "COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path LIKE '/work/%' THEN session_id END) AS proof_views, " +
      "COUNT(DISTINCT CASE WHEN event_type = 'brief_start' THEN session_id END) AS brief_starts, " +
      "COUNT(DISTINCT CASE WHEN event_type = 'brief_submit' THEN session_id END) AS brief_submissions " +
      'FROM marketing_events ' +
      "WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days') AND source NOT LIKE 'internal_%'",
    ).first<MarketingSummary>(),
    db.prepare(
      'SELECT COUNT(*) AS stored_enquiries, COUNT(DISTINCT lower(trim(email))) AS unique_contacts, ' +
      "COUNT(DISTINCT CASE WHEN status = 'qualified' THEN lower(trim(email)) END) AS qualified_contacts " +
      "FROM leads WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')",
    ).first<LeadSummary>(),
    db.prepare(
      'SELECT COUNT(DISTINCT lower(trim(leads.email))) AS accepted_sows ' +
      'FROM payment_links JOIN leads ON leads.id = payment_links.lead_id ' +
      "WHERE payment_links.agreement_confirmed_at IS NOT NULL AND trim(payment_links.agreement_reference) <> '' AND trim(payment_links.scope_version) <> ''",
    ).first<AgreementSummary>(),
    db.prepare(
      'SELECT currency, ' +
      "COUNT(CASE WHEN status = 'paid' AND amount_paid = amount AND provider_payment_id IS NOT NULL AND paid_at IS NOT NULL AND EXISTS (SELECT 1 FROM payment_webhook_events events WHERE events.provider_link_id = payment_links.provider_link_id AND events.event_type = 'payment_link.paid' AND events.processing_status = 'processed') THEN 1 END) AS captured_milestones, " +
      "COALESCE(SUM(CASE WHEN status = 'paid' AND amount_paid = amount AND provider_payment_id IS NOT NULL AND paid_at IS NOT NULL AND EXISTS (SELECT 1 FROM payment_webhook_events events WHERE events.provider_link_id = payment_links.provider_link_id AND events.event_type = 'payment_link.paid' AND events.processing_status = 'processed') THEN amount_paid ELSE 0 END), 0) AS captured_amount, " +
      "COUNT(CASE WHEN refunded_amount > 0 AND refund_reference IS NOT NULL AND refund_status IN ('partial', 'full') THEN 1 END) AS refund_cases, " +
      "COALESCE(SUM(CASE WHEN refunded_amount > 0 AND refund_reference IS NOT NULL AND refund_status IN ('partial', 'full') THEN refunded_amount ELSE 0 END), 0) AS refunded_amount, " +
      "COUNT(CASE WHEN status = 'review_required' THEN 1 END) AS review_required " +
      'FROM payment_links GROUP BY currency ORDER BY currency',
    ).all<MoneyRow>(),
    db.prepare(
      'SELECT source, medium, campaign, ' +
      "COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS visits, " +
      "COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path IN ('/services/complete-website-launch', '/services/d2c-commerce-launch', '/services/b2b-lead-generation-websites') THEN session_id END) AS offer_views, " +
      "COUNT(DISTINCT CASE WHEN event_type = 'page_view' AND page_path LIKE '/work/%' THEN session_id END) AS proof_views, " +
      "COUNT(DISTINCT CASE WHEN event_type = 'brief_start' THEN session_id END) AS brief_starts, " +
      "COUNT(DISTINCT CASE WHEN event_type = 'brief_submit' THEN session_id END) AS brief_submissions " +
      "FROM marketing_events WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days') AND source NOT LIKE 'internal_%' " +
      'GROUP BY source, medium, campaign',
    ).all<EventChannel>(),
    db.prepare(
      "SELECT COALESCE(NULLIF(utm_source, ''), NULLIF(source, ''), 'website') AS source, COALESCE(NULLIF(utm_medium, ''), 'none') AS medium, NULLIF(utm_campaign, '') AS campaign, " +
      'COUNT(*) AS stored_enquiries, COUNT(DISTINCT lower(trim(email))) AS unique_contacts, ' +
      "COUNT(DISTINCT CASE WHEN status = 'qualified' THEN lower(trim(email)) END) AS qualified_contacts " +
      "FROM leads WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days') " +
      'GROUP BY source, medium, campaign',
    ).all<LeadChannel>(),
    db.prepare(
      "SELECT COALESCE(NULLIF(leads.utm_source, ''), NULLIF(leads.source, ''), 'website') AS source, COALESCE(NULLIF(leads.utm_medium, ''), 'none') AS medium, NULLIF(leads.utm_campaign, '') AS campaign, " +
      "COUNT(DISTINCT CASE WHEN payment_links.agreement_confirmed_at IS NOT NULL AND trim(payment_links.agreement_reference) <> '' AND trim(payment_links.scope_version) <> '' THEN lower(trim(leads.email)) END) AS accepted_sows, " +
      "COUNT(DISTINCT CASE WHEN payment_links.status = 'paid' AND payment_links.amount_paid = payment_links.amount AND payment_links.provider_payment_id IS NOT NULL AND payment_links.paid_at IS NOT NULL AND EXISTS (SELECT 1 FROM payment_webhook_events events WHERE events.provider_link_id = payment_links.provider_link_id AND events.event_type = 'payment_link.paid' AND events.processing_status = 'processed') THEN payment_links.id END) AS captured_milestones " +
      'FROM leads LEFT JOIN payment_links ON payment_links.lead_id = leads.id ' +
      "WHERE leads.created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days') " +
      'GROUP BY source, medium, campaign',
    ).all<CommercialChannel>(),
    db.prepare(
      'SELECT lower(trim(email)) AS email, MIN(name) AS name, MIN(company) AS company, COUNT(*) AS stored_enquiries ' +
      "FROM leads WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days') " +
      'GROUP BY lower(trim(email)) HAVING COUNT(*) > 1 ORDER BY stored_enquiries DESC LIMIT 50',
    ).all<DuplicateContact>(),
    db.prepare(
      'WITH open_leads AS (SELECT id, name, company, status, next_action_at, CAST(julianday(\'now\') - julianday(COALESCE(updated_at, created_at)) AS INTEGER) AS age_days FROM leads WHERE status <> \'closed\') ' +
      "SELECT *, CASE WHEN next_action_at IS NOT NULL AND date(next_action_at) < date('now') THEN 'Next action overdue' WHEN status = 'new' THEN 'New for 2+ days' WHEN status = 'contacted' THEN 'Waiting 7+ days' ELSE 'Qualified for 10+ days' END AS reason " +
      "FROM open_leads WHERE (next_action_at IS NOT NULL AND date(next_action_at) < date('now')) OR (status = 'new' AND age_days >= 2) OR (status = 'contacted' AND age_days >= 7) OR (status = 'qualified' AND age_days >= 10) " +
      'ORDER BY CASE WHEN next_action_at IS NOT NULL AND date(next_action_at) < date(\'now\') THEN 0 ELSE 1 END, age_days DESC LIMIT 100',
    ).all<StaleLead>(),
  ]);

  const marketingSummary = marketing || { visits: 0, offer_views: 0, proof_views: 0, brief_starts: 0, brief_submissions: 0 };
  const leads = leadSummary || { stored_enquiries: 0, unique_contacts: 0, qualified_contacts: 0 };
  const acceptedSows = asNumber(agreementSummary?.accepted_sows);
  const moneyRows = moneyResult.results;
  const capturedMilestones = moneyRows.reduce((sum, row) => sum + asNumber(row.captured_milestones), 0);
  const refundCases = moneyRows.reduce((sum, row) => sum + asNumber(row.refund_cases), 0);
  const reviewRequired = moneyRows.reduce((sum, row) => sum + asNumber(row.review_required), 0);
  const duplicateEnquiries = Math.max(0, asNumber(leads.stored_enquiries) - asNumber(leads.unique_contacts));

  const channelMap = new Map<string, Channel>();
  const ensureChannel = (source: string, medium: string, campaign: string | null) => {
    const key = channelKey(source, medium, campaign);
    const existing = channelMap.get(key);
    if (existing) return existing;
    const created = blankChannel(source, medium, campaign);
    channelMap.set(key, created);
    return created;
  };
  for (const row of eventChannelResult.results) Object.assign(ensureChannel(row.source, row.medium, row.campaign), row);
  for (const row of leadChannelResult.results) Object.assign(ensureChannel(row.source, row.medium, row.campaign), row);
  for (const row of commercialChannelResult.results) Object.assign(ensureChannel(row.source, row.medium, row.campaign), row);
  const channels = [...channelMap.values()].sort((left, right) =>
    (right.captured_milestones * 100 + right.accepted_sows * 50 + right.qualified_contacts * 20 + right.unique_contacts * 10 + right.brief_submissions * 5 + right.visits)
    - (left.captured_milestones * 100 + left.accepted_sows * 50 + left.qualified_contacts * 20 + left.unique_contacts * 10 + left.brief_submissions * 5 + left.visits),
  );

  const executive = buildExecutiveSummary({
    storedEnquiries: asNumber(leads.stored_enquiries),
    uniqueContacts: asNumber(leads.unique_contacts),
    duplicateEnquiries,
    qualified: asNumber(leads.qualified_contacts),
    acceptedSows,
    capturedMilestones,
    refundCases,
    reviewRequired,
    stale: staleResult.results.length,
    settlementAvailable: false,
  });

  const stages: Stage[] = [
    { name: 'Visits', value: asNumber(marketingSummary.visits), window: 'Last 30 days', source: 'First-party page_view events', note: 'Distinct browser sessions; owner-marked sessions excluded.' },
    { name: 'Offer views', value: asNumber(marketingSummary.offer_views), window: 'Last 30 days', source: 'First-party page_view events', note: 'Distinct sessions on the three service pages.' },
    { name: 'Proof views', value: asNumber(marketingSummary.proof_views), window: 'Last 30 days', source: 'First-party page_view events', note: 'Distinct sessions on individual work pages.' },
    { name: 'Brief starts', value: asNumber(marketingSummary.brief_starts), window: 'Last 30 days', source: 'First-party brief_start events', note: 'Distinct sessions that interacted with the brief.' },
    { name: 'Brief submissions', value: asNumber(marketingSummary.brief_submissions), window: 'Last 30 days', source: 'First-party brief_submit events', note: 'Submission-attempt evidence; stored enquiries are counted separately.' },
    { name: 'Stored enquiries', value: asNumber(leads.stored_enquiries), window: 'Last 30 days', source: 'Persisted lead records', note: 'Every stored form record, before contact deduplication.' },
    { name: 'Qualified leads', value: asNumber(leads.qualified_contacts), window: 'Last 30 days', source: 'Owner-saved lead status', note: 'Distinct normalized emails; repeated enquiries count once.' },
    { name: 'Verified replies', value: null, window: 'Not instrumented', source: 'No explicit receipt or message record', note: 'The contacted status is deliberately not treated as proof of a reply.' },
    { name: 'Scopeable opportunities', value: null, window: 'Not instrumented', source: 'No scope-ready evidence field', note: 'Qualified is not silently promoted to scopeable.' },
    { name: 'Proposals issued', value: null, window: 'Not instrumented', source: 'No proposal issue record', note: 'Payment requests are not backfilled as proposals.' },
    { name: 'Accepted SOWs', value: acceptedSows, window: 'All stored records', source: 'Owner confirmation + agreement and scope references', note: 'Distinct normalized contacts with all three evidence fields.' },
    { name: 'Captured milestones', value: capturedMilestones, window: 'All stored records', source: 'Signed provider webhook ledger', note: 'Full amount, payment ID and processed paid event must agree.' },
    { name: 'Refunds', value: refundCases, window: 'All stored records', source: 'Signed refund webhook + provider reference', note: 'Partial and full processed refunds only.' },
    { name: 'Disputes', value: null, window: 'Not instrumented', source: 'No dispute webhook ledger', note: 'Review-required payment events are not mislabeled as disputes.' },
    { name: 'Settled money', value: null, window: 'Not instrumented', source: 'No provider settlement evidence', note: 'No revenue total is shown until bank-settlement evidence exists.' },
  ];

  return (
    <main className="min-h-screen bg-[#f2f0e9] px-4 py-8 text-[#17201c] sm:px-8 lg:px-12">
      <header className="mx-auto flex max-w-[1500px] flex-col justify-between gap-5 border-b border-black/15 pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-black/55">SP Studios · Private owner area</p>
          <h1 className="mt-4 font-serif text-6xl leading-[.88] sm:text-8xl">Revenue evidence</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/60">What the studio can prove today—without turning proposals, accepted scopes or captured payments into imaginary revenue.</p>
        </div>
        <nav className="flex flex-wrap gap-3" aria-label="Owner area">
          <a className="rounded-full border border-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" href="/leads">Lead inbox</a>
          <a className="rounded-full border border-black/20 px-5 py-3 text-xs font-bold uppercase tracking-[.08em]" href="/">View studio ↗</a>
          <a className="rounded-full bg-[#17201c] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-white" href="/revenue">Refresh</a>
        </nav>
      </header>

      <OwnerTrackingExclusion />

      <section className="mx-auto mt-8 max-w-[1500px]">
        <div className="grid gap-3 lg:grid-cols-4">
          {[
            ['Accounting truth', executive.revenue],
            ['Demand', executive.demand],
            ['Commercial movement', executive.movement],
            ['Owner attention', executive.attention],
          ].map(([label, copy], index) => (
            <article key={label} className={'border p-6 ' + (index === 0 ? 'border-[#17201c] bg-[#17201c] text-white' : index === 3 && (staleResult.results.length || reviewRequired || refundCases) ? 'border-[#a4382c]/35 bg-[#f7ded9]' : 'border-black/15 bg-white')}>
              <p className={'text-[10px] font-bold uppercase tracking-[.14em] ' + (index === 0 ? 'text-white/50' : 'text-black/45')}>{label}</p>
              <p className={'mt-5 text-sm leading-7 ' + (index === 0 ? 'text-white/75' : 'text-black/65')}>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1500px] border border-black/15 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-black/15 p-6 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.14em] text-black/50">Verified funnel ledger</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Evidence, then interpretation.</h2></div>
          <p className="max-w-xl text-xs leading-6 text-black/55">Unavailable means the evidence is not captured—not zero. Potential pipeline is not revenue, and this table never assigns it a monetary value.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-xs">
            <thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-[.12em] text-black/45"><th className="p-4 font-semibold">Stage</th><th className="p-4 font-semibold">Verified count</th><th className="p-4 font-semibold">Window</th><th className="p-4 font-semibold">Evidence source</th><th className="p-4 font-semibold">Counting rule</th></tr></thead>
            <tbody>{stages.map((stage) => (
              <tr key={stage.name} className="border-b border-black/10 last:border-0">
                <td className="p-4 font-semibold">{stage.name}</td>
                <td className="p-4"><strong className={'font-serif text-3xl font-normal ' + (stage.value === null ? 'text-black/35' : '')}>{stage.value === null ? 'Unavailable' : stage.value}</strong></td>
                <td className="p-4 text-black/55">{stage.window}</td>
                <td className="p-4 text-black/65">{stage.source}</td>
                <td className="max-w-lg p-4 leading-6 text-black/55">{stage.note}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1500px]">
        <div className="mb-5"><p className="text-xs font-bold uppercase tracking-[.14em] text-black/50">Money evidence · all stored records</p><h2 className="mt-3 font-serif text-4xl sm:text-5xl">Captured is not settled.</h2></div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <article className="border border-black/15 bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Captured milestones</p><strong className="mt-6 block font-serif text-3xl font-normal">{formatMoneySeries(moneyRows, 'captured_amount', 'No verified captures')}</strong><p className="mt-4 text-xs leading-6 text-black/50">{capturedMilestones} signed paid event{capturedMilestones === 1 ? '' : 's'}</p></article>
          <article className="border border-black/15 bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Processed refunds</p><strong className="mt-6 block font-serif text-3xl font-normal">{formatMoneySeries(moneyRows, 'refunded_amount', 'No verified refunds')}</strong><p className="mt-4 text-xs leading-6 text-black/50">{refundCases} refund case{refundCases === 1 ? '' : 's'} with provider reference</p></article>
          <article className="border border-black/15 bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Disputes</p><strong className="mt-6 block font-serif text-3xl font-normal text-black/35">Not connected</strong><p className="mt-4 text-xs leading-6 text-black/50">No dispute events are counted.</p></article>
          <article className="border border-[#17201c] bg-[#17201c] p-6 text-white"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-white/45">Settled money</p><strong className="mt-6 block font-serif text-3xl font-normal">Unavailable</strong><p className="mt-4 text-xs leading-6 text-white/55">Settlement evidence is not connected, so revenue is not reported.</p></article>
          <article className={'border p-6 ' + (reviewRequired ? 'border-[#a4382c]/35 bg-[#f7ded9]' : 'border-black/15 bg-white')}><p className="text-[10px] font-bold uppercase tracking-[.14em] text-black/45">Verification review</p><strong className="mt-6 block font-serif text-5xl font-normal">{reviewRequired}</strong><p className="mt-4 text-xs leading-6 text-black/50">Mismatched provider events; never counted as capture.</p></article>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-[1500px] border border-black/15 bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-black/15 p-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-black/50">Source attribution · last 30 days</p><h2 className="mt-3 font-serif text-4xl">Channel to verified action.</h2></div><p className="max-w-lg text-xs leading-6 text-black/50">Counts use stored first-party attribution. A contact is deduplicated by normalized email inside each channel.</p></div>
        {channels.length === 0 ? <p className="p-8 text-sm leading-7 text-black/60">No attributable events or contacts are stored for this window.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px] border-collapse text-left text-xs">
              <thead><tr className="border-b border-black/10 text-[10px] uppercase tracking-[.12em] text-black/45"><th className="p-4 font-semibold">Source</th><th className="p-4 font-semibold">Campaign</th><th className="p-4 font-semibold">Visits</th><th className="p-4 font-semibold">Offer</th><th className="p-4 font-semibold">Proof</th><th className="p-4 font-semibold">Brief start / submit</th><th className="p-4 font-semibold">Unique / stored</th><th className="p-4 font-semibold">Qualified</th><th className="p-4 font-semibold">Accepted SOW</th><th className="p-4 font-semibold">Captured</th></tr></thead>
              <tbody>{channels.map((channel) => (
                <tr key={channelKey(channel.source, channel.medium, channel.campaign)} className="border-b border-black/10 last:border-0">
                  <td className="p-4"><strong className="block text-sm">{channel.source}</strong><span className="mt-1 block text-black/45">{channel.medium}</span></td>
                  <td className="max-w-xs p-4 text-black/55">{channel.campaign || '—'}</td>
                  <td className="p-4 font-serif text-2xl">{channel.visits}</td>
                  <td className="p-4 font-serif text-2xl">{channel.offer_views}</td>
                  <td className="p-4 font-serif text-2xl">{channel.proof_views}</td>
                  <td className="p-4 font-serif text-2xl">{channel.brief_starts} / {channel.brief_submissions}</td>
                  <td className="p-4 font-serif text-2xl">{channel.unique_contacts} / {channel.stored_enquiries}</td>
                  <td className="p-4 font-serif text-2xl">{channel.qualified_contacts}</td>
                  <td className="p-4 font-serif text-2xl">{channel.accepted_sows}</td>
                  <td className="p-4 font-serif text-2xl">{channel.captured_milestones}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mx-auto mt-8 grid max-w-[1500px] gap-3 lg:grid-cols-2">
        <article className="border border-black/15 bg-white">
          <div className="border-b border-black/15 p-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-black/50">Duplicate-contact guardrail</p><h2 className="mt-3 font-serif text-4xl">One contact, one stage count.</h2><p className="mt-4 text-xs leading-6 text-black/55">Normalized email controls contact-stage counting. Repeated briefs remain visible as stored enquiries but cannot inflate qualified leads, accepted SOWs or the executive summary. This reporting guardrail never deletes a lead.</p></div>
          {duplicateResult.results.length === 0 ? <p className="p-6 text-sm text-black/55">No duplicate contacts in the last 30 days.</p> : <div className="divide-y divide-black/10">{duplicateResult.results.map((contact) => <div key={contact.email} className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><strong className="block text-sm">{contact.name} · {contact.company}</strong><span className="mt-1 block text-xs text-black/50">{contact.email}</span></div><div className="text-left sm:text-right"><strong className="font-serif text-3xl font-normal">{contact.stored_enquiries}</strong><span className="ml-2 text-[10px] uppercase tracking-[.1em] text-black/45">stored</span></div></div>)}</div>}
        </article>

        <article className="border border-black/15 bg-white">
          <div className="border-b border-black/15 p-6"><p className="text-xs font-bold uppercase tracking-[.14em] text-black/50">Stale-stage alerts</p><h2 className="mt-3 font-serif text-4xl">Work the evidence queue.</h2><p className="mt-4 text-xs leading-6 text-black/55">Alerts: new for 2 days, contacted for 7, qualified for 10, or any saved next action past due.</p></div>
          {staleResult.results.length === 0 ? <p className="p-6 text-sm text-black/55">No stale open stages under the current thresholds.</p> : <div className="max-h-[520px] divide-y divide-black/10 overflow-auto">{staleResult.results.map((lead) => <a key={lead.id} href="/leads" className="grid gap-3 p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><strong className="block text-sm">{lead.name} · {lead.company}</strong><span className="mt-1 block text-xs text-black/50">{lead.status} · {lead.reason}{lead.next_action_at ? ' · due ' + lead.next_action_at : ''}</span></div><div className="text-left sm:text-right"><strong className="font-serif text-3xl font-normal">{lead.age_days}</strong><span className="ml-2 text-[10px] uppercase tracking-[.1em] text-black/45">days</span></div></a>)}</div>}
        </article>
      </section>

      <footer className="mx-auto mt-8 max-w-[1500px] border-t border-black/15 py-7 text-xs leading-6 text-black/50">Owner-only evidence view. No payment action, settlement action, account mutation or outbound message is available from this page.</footer>
    </main>
  );
}
