# SP Studios qualification and one-scope proposal contract

Status: bounded headquarters artifact; no runtime code changed
Lane: qualification, proposal/SOW consistency, approvals, and upstream duplicate suppression
Authority: `docs/SP_STUDIOS_HQ_CONTEXT.md` at `e544fad195c0dd5335a7dffc641227de3fd71a30`
Repository branch reviewed: `rebrand/sp-studios-domain-preview` through `72f2c9e40152425e563f5aba9042792809491a98`

## 1. Ownership and non-goals

This contract extends the existing Owner Desk. It does not replace or reimplement:

- lead capture and consent in `app/api/leads/route.ts`;
- direct/partner classification and unsent reply drafts in `app/leads/lead-classification.ts`;
- scope signals in `app/scope-planner-recommendation.ts`;
- contact infrastructure, first-contact rules, cadence, channel safety, bounce handling, or sender activation in `docs/CONTACT_SENDER_ACTIVATION_GATE.md`;
- prospect research, vertical pipeline, portfolio proof, Search Console, Instagram, payment, legal, delivery, DNS, or deployment lanes.

It defines deterministic contracts for structured qualification, one automatic next question, no-fit/hold routing, one-scope proposal generation, proposal/SOW equality, owner approvals, and a transactional key that prevents the Owner Desk from queuing the same follow-up twice.

No prospect contact, proposal issue, payment action, deployment, account change, DNS change, credential entry, or public change is authorized by this file.

## 2. Verified baseline preserved

| Source | Exact reviewed evidence | Preserved responsibility |
|---|---|---|
| Headquarters context | commit `e544fad195c0dd5335a7dffc641227de3fd71a30`; blob `3e46c7befe30fca4ceaa50571d0ff985253e78f7` | Positioning, offer contexts, acquisition path, evidence rules, external-action boundary |
| Lead classification | blob `8fde2fcd680663fec9937953664af0c625ffce00` | `direct` / `partner`, current statuses, owner guidance, draft replies |
| Lead create route | blob `b1cc8c9c318171a8c1b1f3a8b4e2d4df9fd9b4f0` | Validation, consent, origin/body controls, storage, rate control |
| Owner lead update route | blob `e34ebbec4768383d384b813fbbdb73d1feac8037` | Owner-only status, notes, next-action updates |
| Database schema | blob `72530cd31a5d1b1fa4fbe7d09d0ab8a19213f638` | Existing lead, marketing-event and payment tables |
| Scope planner | blob `3a56d9dc0b78021310ea9a632a7e21de5544cc2e` | Existing recommendation signals |
| Scope planner check | blob `66f8a67079ec342a574a030023e15b62020bc650` | Six existing passing recommendation cases |
| Contact sender gate | blob `dde21a1a99d7fde063650f975f5f6a9ad23e9ee8` | Sender activation and controlled-contact lane |

The current lead statuses—`new`, `contacted`, `qualified`, and `closed`—remain untouched until a reviewed migration exists. Qualification route and proposal readiness belong in companion records and must not be overloaded into `leads.status`.

## 3. Headquarters offer correction

There is no universal USD 2,500 qualification floor.

Headquarters defines starting contexts, not automatic quotations:

| Engagement context | Starting context | Typical delivery after ready inputs |
|---|---:|---|
| Focused Launch | USD 1,500 | 5–7 working days |
| Complete Business Website | USD 3,000 | 7–15 working days |
| Signature Experience + Integration | USD 5,000 | 3–6 weeks |
| International Launch System | USD 6,500 | 4–8 weeks |

Investment fit is evaluated against the correctly recommended context. One buyer receives one fixed amount, one currency, and one realistic delivery window only after qualification. An agreed Indian direct-client scope may use INR. The system must never use a remembered exchange rate.

The existing planner returns `Website + Integration · $6,000–$12,000`, while headquarters names `Signature Experience + Integration · USD 5,000` as a starting context. Until headquarters records whether that stricter planner range is intentional, integration-led automatic proposal generation must stop at `owner_context_decision_required`.

## 4. Companion schemas

```ts
type GateName =
  | 'need'
  | 'authority'
  | 'outcome'
  | 'scope'
  | 'readiness'
  | 'timing'
  | 'investment';

type GateGrade = 0 | 1 | 2 | 3 | null;

type QualificationRoute =
  | 'suppressed'
  | 'no_fit'
  | 'needs_information'
  | 'hold'
  | 'qualified'
  | 'scopeable';

type EngagementContext =
  | 'focused_launch'
  | 'complete_business_website'
  | 'signature_experience_integration'
  | 'international_launch_system'
  | 'custom_discovery';

interface QualificationSnapshot {
  id: string;
  leadId: string;
  version: number;
  createdAt: string;
  sourceLeadUpdatedAt: string | null;
  gates: Record<GateName, {
    grade: GateGrade;
    reason: string;
    evidenceIds: string[];
    confidence: 'low' | 'medium' | 'high';
  }>;
  score: number;
  route: QualificationRoute;
  reasonCodes: string[];
  recommendedContext: EngagementContext | null;
  nextQuestionId: string | null;
  policyVersion: 'hq-e544fad-qualification-v1';
}

interface ScopeSnapshot {
  id: string;
  leadId: string;
  version: number;
  status: 'draft' | 'owner_approved' | 'superseded';
  contentHash: string;
  recommendedContext: EngagementContext;
  businessOutcome: string;
  primaryCustomerAction: string;
  deliverables: Array<{ id: string; text: string; acceptance: string }>;
  dependencies: string[];
  assumptions: string[];
  exclusions: string[];
  includedIntegrations: Array<{ id: string; name: string; boundary: string }>;
  amountMinor: number;
  currency: 'USD' | 'INR';
  deliveryWindow: string;
  milestonePercentages: [number, number, number];
}

interface ApprovalRecord {
  id: string;
  type:
    | 'qualification_exception'
    | 'scope'
    | 'commercials'
    | 'proposal_issue'
    | 'followup'
    | 'payment_request';
  artifactId: string;
  artifactVersion: number;
  artifactHash: string;
  state: 'pending' | 'approved' | 'rejected' | 'expired' | 'consumed';
  approvedBy: string | null;
  approvedAt: string | null;
  expiresAt: string | null;
  consumedAt: string | null;
}

interface CommunicationEligibility {
  leadId: string;
  threadKey: string;
  channel: string;
  purpose: 'initial' | 'followup' | 'proof_permission';
  sequence: 0 | 1;
  messageHash: string;
  idempotencyKey: string;
  state: 'blocked' | 'eligible_for_sender_gate' | 'cancelled';
  blockingReasons: string[];
}
```

Records are append-only. A changed lead, scope, amount, currency, recipient, channel, or message produces a new version and invalidates dependent approvals.

## 5. Gate scoring

| Gate | Weight | Grade 0 | Grade 1 | Grade 2 | Grade 3 |
|---|---:|---|---|---|---|
| Need | 20 | No material website need | Weak/cosmetic problem | Credible business problem | Urgent evidenced ownership gap |
| Authority | 15 | No access and no route | Routing contact only | Decision-maker reachable/involved | Approval ownership clear |
| Outcome | 15 | No customer/business outcome | Vague improvement | One credible primary action | Action plus acceptance measure |
| Scope | 15 | Outside studio boundary | Shape unclear | Bounded website engagement | Day-one scope/exclusions clear |
| Readiness | 10 | Inputs/access unavailable | Realistic readiness plan | Core inputs and approval owner credible | Inputs/access/feedback process ready |
| Timing | 10 | No trigger or implausible date | General future intent | Credible window and trigger | Date/dependencies/approval pace credible |
| Investment | 15 | Explicitly below correct context with no exception | Not set but discussable | Fits recommended starting context | Fixed amount/procurement route credible |

Point maps:

- Need: `0 / 7 / 13 / 20`
- Authority, outcome, scope, investment: `0 / 5 / 10 / 15`
- Readiness and timing: `0 / 3 / 7 / 10`

Unknown is `null`, never zero.

Qualified requires score at least 75; need, authority, outcome, scope, and investment each at least grade 2; readiness and timing each at least grade 1; and no stop, duplicate, integrity, stale-decision, or source-conflict blocker.

Scopeable requires credible need, authority, outcome, scope shape, timing, investment, and a resolved engagement context. Readiness gaps may become explicit dependencies but must not be silently assumed.

## 6. Deterministic routing

| Priority | Condition | Result |
|---:|---|---|
| 1 | Stop, closed-no-reopen, proof-only partner, non-prospect | `suppressed` |
| 2 | Existing open thread, verified reply, active proposal, prior contact conflict | `suppressed` |
| 3 | Invented proof, deceptive claim, credential request, integrity conflict | `no_fit` |
| 4 | Strong owned journey, no trigger, no operating evidence, no ownership gap | `no_fit` |
| 5 | Explicit investment below correctly recommended context, no exception | `no_fit` |
| 6 | Any gate unknown | `needs_information` |
| 7 | Thresholds pass | `qualified`, then evaluate scopeability |
| 8 | Potential fit with one named missing condition | `hold` |

A hold contains exactly one reopening condition and creates no indefinite nurture sequence. No-fit handling creates an internal reason plus an unsent respectful close. It never creates a cheaper hidden tier, referral, proposal, or follow-up.

## 7. Automatic next question

Code selects the question ID. Language generation may only render that selected question.

Priority: contradiction, need, outcome, authority, investment, scope, timing, readiness.

| ID | Approved intent |
|---|---|
| `clarify_contradiction` | Resolve one named conflict using the conflicting evidence |
| `ask_need` | Business problem and consequence of no change |
| `ask_outcome` | One customer action or business result |
| `ask_authority` | Scope/investment decision ownership |
| `ask_investment` | Realistic investment for the recommended context |
| `ask_scope` | Day-one pages, workflows, content, and integrations |
| `ask_timing` | Launch window and real business trigger |
| `ask_readiness` | Content, assets, access, and consolidated feedback |

Exactly one question is returned. Known evidence is not re-asked. Two unresolved attempts on the same critical gate route to hold for owner review.

## 8. Prompt contracts

### Qualification extraction

```text
Use only supplied intake, discovery notes, and evidence IDs.
Do not infer authority, investment, readiness, timing, or outcomes.
Unknown values are null. Separate observed fact from interpretation.
Do not draft outreach, proposals, payment actions, or meeting links.
Return strict JSON for gates, contradictions, and missing fields.
```

### Selected-question renderer

```text
Render only QUESTION_ID from the approved question bank.
Do not add a second question, price, proposal promise, meeting link,
or request for private access. Return { questionId, question }.
```

### One-scope proposal draft

```text
Draft only from one owner-approved ScopeSnapshot.
Output one recommended scope, one fixed amount, one currency, and one
realistic delivery window. No packages, tiers, alternatives, discounts,
or automatic quotation. Preserve deliverables, dependencies,
assumptions, exclusions, acceptance conditions, and content hash.
Status remains draft_pending_owner_approval.
Do not send, submit, or create a payment link.
```

### No-fit draft

```text
Return an internal reason, one reopening condition or null, and an
unsent respectful close. Do not invent referrals, offer a hidden
cheaper tier, schedule a follow-up, or imply owner review.
```

AI output never overrides deterministic routing, equality checks, or approval validation.

## 9. One-scope proposal and SOW consistency

Proposal drafting is blocked unless:

- lead is qualified and scopeable;
- one current owner-approved ScopeSnapshot exists;
- the engagement-context mismatch in section 3 is resolved for integration-led work;
- one fixed amount, currency, and delivery window exist;
- dependencies and exclusions are explicit;
- custom products, commerce, portals, several integrations, or large content systems complete discovery;
- no placeholder or unsupported claim exists; and
- scope and commercial approvals match the exact content hash.

Proposal and SOW are projections of the same ScopeSnapshot, never separate sources of truth.

Blocking equality checks: lead/legal identity; snapshot ID/version/hash; engagement context; deliverable IDs/wording/acceptance; dependencies/assumptions/exclusions; integration names/count/boundaries; amount in minor units; currency; delivery window; milestone percentages/amounts; revision/stabilization wording when applicable; change control; placeholders; alternate packages.

Milestones must total 100 percent and amounts must equal the proposal total. Any mismatch sets the draft to `not_issuable`.

## 10. Owner approval checkpoints

| Checkpoint | Bound artifact | Approval permits |
|---|---|---|
| Qualification exception | Snapshot version/hash | Override only named gate/result |
| Scope | Scope snapshot version/hash | Freeze delivery boundary |
| Commercials | Same hash, amount, currency, window | Use exact commercial terms |
| Proposal issue | Final proposal hash, recipient, channel | One external issue action after sender/action gate |
| Follow-up | Thread, channel, sequence, message hash | Eligibility handoff to contact-sender gate |
| Payment request | Accepted agreement/SOW and milestone | Separate downstream payment action only |

Approval is not execution. Any changed bound value invalidates it. Proposal approval cannot activate payment.

## 11. Duplicate prevention handoff

`docs/CONTACT_SENDER_ACTIVATION_GATE.md` remains authoritative for sender readiness, channel duplication, follow-up timing, cadence, bounce, complaint, opt-out, and action-time approval.

This lane adds only transactional Owner Desk suppression:

```sql
CREATE UNIQUE INDEX uq_communication_eligibility_key
ON communication_eligibility (idempotency_key);

CREATE UNIQUE INDEX uq_thread_purpose_sequence
ON communication_eligibility (thread_key, purpose, sequence);
```

Idempotency key:

```text
lead_id : thread_key : purpose : sequence : approved_message_hash
```

Before returning `eligible_for_sender_gate`, require initial-send proof for a follow-up; no reply, stop, opt-out, complaint, hold, or active-proposal conflict; no existing sequence row; original channel; and fresh approval matching the message hash.

A reply changes every pending eligibility record for that thread to `cancelled` in the same transaction. This file does not define sender cadence or send mail.

## 12. Required implementation tests

1. strong complete-site lead qualifies;
2. focused-launch investment at USD 1,500 is not rejected by a universal floor;
3. unknown investment selects `ask_investment` when earlier gates are known;
4. contradiction outranks missing gates;
5. stop overrides high score;
6. newer close overrides stale approval;
7. strong owned website plus no trigger is no-fit;
8. missing authority prevents scopeability;
9. selector returns one question;
10. two unresolved critical attempts create hold;
11. one scope passes preflight;
12. multiple price packages fail;
13. unresolved HQ/planner mismatch blocks integration proposal;
14. matching proposal/SOW hash passes;
15. amount mismatch blocks;
16. currency mismatch blocks;
17. milestone percentages total 100;
18. milestone amounts equal total;
19. reply cancels eligibility;
20. duplicate sequence is rejected;
21. cross-channel follow-up is blocked;
22. approval hash mismatch is blocked;
23. idempotency key is stable;
24. proposal approval cannot reach payment-link creation.

## 13. Safe implementation order

1. Pure policy module and table-driven tests; no database/UI mutation.
2. Headquarters resolves the offer-context mismatch.
3. New companion tables through a reviewed Drizzle migration; existing lead/payment tables preserved.
4. Owner-only qualification and approval views added to existing lead inbox.
5. Proposal/SOW draft persistence.
6. Transactional eligibility handoff to contact-sender lane.
7. Lint, build, existing scope-planner check, and new contract tests.
8. Preview/evidence packet; no deployment.

## 14. External dependencies

- Fresh authoritative Owner Desk counts before reporting visits, leads, clients, or revenue.
- Current public evidence before any action-time contact.
- Contact sender gate completion before any email action.
- Client legal name, decision authority, inputs/access, and accepted scope before proposal issue.
- Merchant/KYC, bank, international acceptance, tax, invoice, legal, refund, and dispute readiness before payment activation.

## 15. Smallest headquarters decision

**HQ-QUAL-01:** Is the planner's `Website + Integration · $6,000–$12,000` range intentionally stricter than the HQ `Signature Experience + Integration · USD 5,000` starting context?

Return one:

- `KEEP STRICTER PLANNER RANGE`
- `ALIGN PLANNER TO HQ CONTEXT`

Until recorded, qualification and scope questions may proceed, but automatic integration-led fixed-proposal generation remains blocked.

## 16. Explicit non-actions

No prospect was contacted. No email, follow-up, proposal, form, meeting, payment link, refund, public edit, provider action, DNS action, credential entry, account change, database migration, runtime-code change, deployment, client claim, payment claim, or revenue claim was made.
