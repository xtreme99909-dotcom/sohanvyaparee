# SP Studios brief-conversion acceptance gate

Status: approval-ready, non-production test specification  
Lane: conversion and inbound handoff only  
Authority: [SP Studios headquarters context at `e544fad195c0dd5335a7dffc641227de3fd71a30`](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/e544fad195c0dd5335a7dffc641227de3fd71a30/docs/SP_STUDIOS_HQ_CONTEXT.md)  
Prepared from: latest `rebrand/sp-studios-domain-preview` branch state when this artifact branch was created

## Purpose

Resolve one bounded question without redesigning another worker's lane:

> Can a qualified visitor move from planner or brief start to a durably stored enquiry, receive a truthful success reference, and leave enough evidence for the owner to distinguish conversion friction from a storage or deployment fault?

The last headquarters checkpoint recorded 8 brief starts and 0 stored enquiries. Those historical figures must not be reused as current totals until the owner desk is refreshed. They justify an acceptance test; they do not prove that the form is broken.

## Preserved verified work

Do not replace or weaken these existing controls:

1. `ScopePlanner` records planner start and completion separately.
2. A completed planner carries project type, indicative budget and structured context into `ProjectBrief`.
3. A planner-assisted brief requires a business-specific result before submission.
4. The form preserves the visitor's answers when saving fails.
5. `POST /api/leads` validates request size, same-origin requests, bot timing, email, consent and required fields.
6. The lead is inserted before the optional owner notification is attempted.
7. Notification failure is logged without changing a successfully stored lead into a false submission failure.
8. A successful response returns a reference; the client only shows success after a successful HTTP response.
9. Marketing evidence separates `brief_start`, `brief_submit`, `brief_success` and `brief_error`.
10. Attribution is carried from current UTM parameters or the stored first-party session value.

Authoritative implementation files:

- [`app/scope-planner.tsx`](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/scope-planner.tsx)
- [`app/project-brief.tsx`](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/project-brief.tsx)
- [`app/api/leads/route.ts`](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/api/leads/route.ts)
- [`app/marketing-events.ts`](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/marketing-events.ts)
- [`app/marketing-attribution.ts`](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/marketing-attribution.ts)

## One controlled runtime test

Run this only on an isolated preview or staging environment backed by non-production storage. Disable owner email and WhatsApp notifications for the test. Do not use the public form, a real prospect identity or production lead storage.

Synthetic record label:

- Name: `SP Studios QA — DO NOT QUALIFY`
- Company: `Synthetic acceptance test`
- Goal: `Verify that a planner-assisted project brief is stored once and returns the same visible reference held by the owner desk.`
- Source/UTM: `qa / acceptance / brief-storage-gate`
- Budget and timing: select ordinary non-committal test values
- Email: an approved non-delivering test address owned by headquarters

### Happy-path acceptance

1. Open the preview with the QA UTM parameters.
2. Complete all five planner questions.
3. Confirm one `planner_start` and one `planner_complete` event.
4. Carry the recommendation into the brief.
5. Confirm the project type, budget and structured goal are visible and editable.
6. Add the required business-specific result.
7. Submit exactly once.
8. Confirm one `brief_submit` followed by one `brief_success`.
9. Confirm the screen displays a non-empty enquiry reference.
10. Confirm exactly one non-production database row exists.
11. Confirm the owner desk shows the same reference, source, campaign, scope, budget, timing and goal.
12. Confirm the row state is `new`; do not call it qualified, scopeable, proposed or revenue.
13. Mark the record as synthetic in non-production evidence and remove it only through the environment's approved cleanup process.

Pass condition: all thirteen checks pass with one stored row and no duplicate.

### Recoverable-failure acceptance

Using an isolated preview configured to reject or fail the storage request:

1. Fill the brief with synthetic data.
2. Trigger the controlled failure once.
3. Confirm one `brief_submit` followed by one `brief_error` and no `brief_success`.
4. Confirm the name, email, company, goal, project type, budget and timing remain present.
5. Confirm the error does not claim the enquiry was stored.
6. Restore the preview dependency and retry once.
7. Confirm exactly one row is stored and one success reference is shown.

Pass condition: no lost answers, no false success and no duplicate storage.

## Evidence interpretation after the test

| Observed evidence | Meaning | Next bounded action |
|---|---|---|
| Preview passes; live owner desk remains at zero stored enquiries | Storage logic is viable; current live deployment/bindings or genuine visitor completion remain unresolved | Compare deployed revision and production bindings without submitting the public form |
| `brief_submit` occurs but `brief_error` rises | A save/dependency failure is plausible | Inspect server logs and database binding for those timestamps |
| `brief_start` occurs with no `brief_submit` | Pre-submit friction or low intent is plausible | Review field-level abandonment evidence before changing copy |
| `brief_success` occurs with no matching stored row | Evidence integrity failure | Stop acquisition reporting and reconcile instrumentation/storage before further optimization |
| One stored row and matching owner-desk reference | Handoff passes | Preserve the path; focus future work on qualified demand and verified replies |

No event, form start or successful technical test is a lead, client, proposal, captured milestone or revenue.

## Release gate

Do not change the current brief copy, planner logic, proof labels, payment workflow or owner triage based only on the historical 8-to-0 checkpoint.

A conversion change is justified only after:

1. the current owner-desk totals are refreshed;
2. the controlled preview test above passes or exposes a specific failure;
3. the deployed revision and required production bindings are identified; and
4. headquarters assigns the resulting implementation to one owner.

## External dependencies

- An isolated preview/staging deployment of the latest working branch
- Non-production database storage with the lead schema available
- An approved, non-delivering headquarters test email
- Owner access to preview event evidence and the non-production owner desk
- A controlled way to simulate storage rejection without altering production
- Current authoritative owner-desk totals

No payment provider, KYC, bank, DNS, outreach, client contact or production submission is required.

## Smallest headquarters decision

Approve or decline exactly this action:

> Authorize one synthetic, owner-observed brief submission on an isolated non-production preview, with owner notifications disabled, using the acceptance steps in this document.

If approved, headquarters must name the preview URL and approved test email. Nothing else should be changed first.
