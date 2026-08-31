# SP Studios owner revenue evidence dashboard

Authoritative operating source: docs/SP_STUDIOS_HQ_CONTEXT.md at commit e544fad195c0dd5335a7dffc641227de3fd71a30.

## Bounded outcome

The private /revenue route is an evidence dashboard, not a forecast dashboard. It reads the existing first-party event, lead, payment-link and signed webhook ledgers. It does not deploy, send outreach, issue payment links, activate providers, change accounts or mutate external systems.

## Evidence contract

| Stage | Counted evidence | Deduplication | State |
| --- | --- | --- | --- |
| Visits | Distinct first-party sessions with page_view | Session ID | Implemented |
| Offer views | Distinct sessions viewing a service page | Session ID | Implemented |
| Proof views | Distinct sessions viewing an individual work page | Session ID | Implemented |
| Brief starts | Distinct sessions with brief_start | Session ID | Implemented |
| Brief submissions | Distinct sessions with brief_submit | Session ID | Implemented as attempt evidence |
| Stored enquiries | Persisted lead rows | None at submission level | Implemented |
| Qualified leads | Owner-saved qualified status | Normalized email | Implemented |
| Verified replies | Explicit sent-message receipt or reply record | Normalized email | Uninstrumented; contacted is not substituted |
| Scopeable opportunities | Explicit scope-ready record satisfying the headquarters definition | Normalized email | Uninstrumented; qualified is not substituted |
| Proposals issued | Explicit proposal issue record and reference | Proposal reference and contact | Uninstrumented |
| Accepted SOWs | Owner confirmation plus non-empty agreement and scope references | Normalized email | Implemented |
| Captured milestones | Full amount, provider payment ID, paid timestamp and processed signed payment_link.paid webhook event | Payment-link ID | Implemented |
| Refunds | Positive processed refund plus provider refund reference | Payment-link/refund reference | Implemented |
| Disputes | Signed provider dispute event | Dispute ID | Uninstrumented; review_required is not substituted |
| Settled money | Provider settlement evidence reconciled to the SP Studios bank/accounting record | Settlement reference | Uninstrumented; no revenue total is reported |

Unavailable means evidence is not captured, not zero. Potential starting value, budgets, open leads, proposals, accepted scopes and captured milestones are never presented as revenue.

## Periods and attribution

Acquisition, brief and lead-channel views use a rolling 30-day window. Accepted SOW, capture and refund evidence uses all stored records because the repository does not yet contain a complete accounting-period settlement ledger. Every stage labels its window.

Browser events retain source, medium and campaign. Leads prefer stored UTM values and fall back to their stored lead source. Source-level contact stages deduplicate with lower(trim(email)). Captured milestones are attributed as counts only; no source receives a revenue value.

## Duplicate-contact guardrail

The dashboard keeps stored-enquiry volume visible while using normalized email for contact-stage counts and executive summaries. A separate duplicate list exposes repeat contacts. This is a non-destructive reporting guardrail: it does not delete, merge or rewrite enquiries, and it does not authorize contacting a person through another channel.

## Stale-stage rules

An open lead enters the owner queue when a saved next-action date is overdue or its last stored activity is older than:

- New: 2 days
- Contacted: 7 days
- Qualified: 10 days

Closed leads are excluded. These are operational alerts, not evidence that a reply or opportunity exists.

## Executive summaries

Summaries are deterministic functions of stored counts. They report:

1. whether accounting-grade settlement evidence exists;
2. stored demand and duplicate exclusions;
3. qualified, accepted-SOW and captured-milestone movement without assigning pipeline value; and
4. stale, refund and provider-review attention items.

## Validation

Run:

    npm run lint
    npm run build
    node scripts/check-revenue-dashboard.mjs

The focused contract check exercises money formatting and deterministic summaries, then asserts the source keeps its signed-webhook, normalized-contact, stale-stage, missing-evidence and no-pipeline-as-revenue safeguards.

## Unresolved external dependencies

No code-only change can truthfully fill the currently unavailable stages. Headquarters needs:

- an approved append-only evidence source for replies, scopeability and proposals;
- provider webhook subscription and tested payload evidence for disputes;
- provider settlement evidence plus SP Studios-only account reconciliation;
- verified merchant/KYC, bank, category, international and accounting state before any live payment activation; and
- CA/counsel confirmation for invoice, export, agreement, refund and dispute treatment.

This dashboard intentionally does not cross those boundaries.

## Smallest headquarters decision

Decide whether the next owner-desk increment should add an append-only commercial evidence ledger for verified replies, scopeable opportunities and proposals. Until that source exists, those stages should remain visibly unavailable.
