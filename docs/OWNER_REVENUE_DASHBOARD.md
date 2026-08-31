# SP Studios owner revenue evidence dashboard

Authoritative operating source: docs/SP_STUDIOS_HQ_CONTEXT.md.  
Owned surface: private /revenue dashboard and append-only funnel evidence model only.

## Reporting boundary

The dashboard reports evidence, not optimism. Research, drafts, views, friendly conversations, budget bands, starting prices, proposal value, authorized payments and captured-but-unsettled milestones cannot become revenue.

Settled money remains unavailable until provider settlement evidence is reconciled to SP Studios-only bank/accounting evidence. Unrelated Razorpay or business activity must never enter this dashboard.

## Evidence sources

| Stage | Authoritative evidence | Counting identity |
| --- | --- | --- |
| Visits | Distinct first-party page_view session | Session |
| Offer/proof views | Distinct first-party page_view session on defined routes | Session |
| Brief starts/submissions | First-party brief events | Session |
| Stored enquiries | Persisted lead row | Submission |
| Qualified leads | Append-only qualification record; current qualified status remains legacy evidence | Normalized contact |
| Verified replies | Append-only buyer-message receipt reference | Normalized contact |
| Scopeable opportunities | Append-only qualification record satisfying every headquarters scopeability condition | Normalized contact |
| Proposals issued | Append-only proposal document reference after scopeability | Normalized contact |
| Accepted SOWs | Append-only signed-agreement reference after proposal; legacy accepted-agreement payment prerequisite remains visible | Normalized contact |
| Captured milestones | Full amount, payment ID, paid timestamp and processed signed payment_link.paid webhook | Payment link |
| Refunds | Processed refund state and provider refund reference written by the signed webhook flow | Refund/payment reference |
| Disputes | Signed provider dispute ledger | Unavailable today |
| Settled money | Reconciled provider settlement and SP Studios bank/accounting evidence | Unavailable today |

An unavailable stage is not rendered as zero.

## Append-only funnel model

Table: funnel_evidence_events

Required fields:

- server-generated ID and created time;
- actual occurred time;
- stored lead reference;
- controlled event type;
- server-controlled evidence source;
- non-secret evidence reference;
- qualification basis JSON where required;
- optional factual note;
- deterministic idempotency key derived from normalized contact, event type and evidence reference; and
- authenticated owner recorder ID.

Allowed event sequence:

1. qualified_lead;
2. scopeable_opportunity, requiring qualified_lead;
3. proposal_issued, requiring scopeable_opportunity;
4. sow_accepted, requiring proposal_issued.

verified_reply is independent because a stored enquiry can contain enough qualification evidence without a later buyer reply, while a reply alone does not prove qualification.

Qualification requires need, authority, outcome, timing and investment fit. Scopeability additionally requires scope shape and readiness.

The private API supports INSERT OR IGNORE only. It exposes no PATCH or DELETE route. Database triggers reject UPDATE and DELETE statements. Repeated evidence references for the same normalized contact and stage are idempotent even when duplicate lead rows exist.

Proposal or pipeline amount is deliberately absent from the model.

## Duplicate and stale safeguards

Contact stages count distinct lower(trim(email)). Stored enquiries remain visible separately, so repeat forms cannot inflate qualified, scopeable, proposal or SOW counts.

Stale alerts remain operational only:

- New: 2 days
- Contacted: 7 days
- Qualified: 10 days
- Any saved next action past due

A stale or contacted state is not proof of a reply.

## Source attribution

Event acquisition uses first-party source, medium and campaign. Lead and commercial evidence uses stored UTM values with lead source fallback. The evidence trail shows its associated source without assigning revenue value.

## Tests

Focused contract command:

    node scripts/check-revenue-dashboard.mjs

Repository gates when a build-capable checkout is available:

    npm run lint
    npm run build

The focused test covers deterministic executive summaries, money formatting, normalized-contact counting, signed capture evidence, append-only triggers, stage prerequisites, idempotent insertion, missing settlement evidence and the prohibition on pipeline-as-revenue presentation.

## External dependencies left unresolved

- Signed provider dispute events are not connected.
- Provider settlements are not reconciled to an SP Studios-only bank/accounting ledger.
- Live payment/KYC/bank/category/international/accounting/legal approvals remain outside this code lane.
- No messages, proposals, payments, refunds or deployments are performed by this dashboard.

## Smallest headquarters decision

No decision is required to use the append-only commercial evidence ledger. A future decision is needed only before adding financial settlement ingestion: choose the authoritative SP Studios settlement-reconciliation source and retention policy.
