# SP Studios Portfolio Proof System

Status: Internal review artifact — not public case-study copy  
Audit date: 31 August 2026 (UTC)  
Requested branch: rebrand/sp-studios-domain-preview  
Audited branch head: bb0b1265e732ed53fb813d268c0e7b73b8af3996

## 1. Purpose

This document is the source of truth for what SP Studios may claim about the work currently shown at [thespstudios.com/work](https://thespstudios.com/work).

The rule is simple:

> Claim only the highest evidence level that can be opened, inspected or reproduced. A working screen is not proof of use. Use is not proof of a business result. A founder-owned project is not a client result.

Nothing in this document authorizes publication, deployment, outreach, purchasing, or a paid production transaction.

## 2. Audit basis and release boundary

The audit used:

- The three examples rendered by the [work index](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/work/page.tsx): BongFoods, Studio system and Private market.
- Their three case-study source files on the requested branch.
- The Studio system implementation behind the public journey: scope planner, structured brief, lead API, attribution, owner-only lead desk and database schema.
- Sites runtime metadata showing a public current live URL at thespstudios.com and active custom domains for both apex and www.
- Sites saved-version metadata showing version 30 sourced from commit 938df43523136df38e44638bd552d2c6baf78239.
- The requested branch head at bb0b1265e732ed53fb813d268c0e7b73b8af3996, one commit ahead of that saved source. The later commit changes payment and webhook infrastructure, not the work pages.

Release rule: do not describe a head-only implementation as live until the exact deployed source commit is recorded. Public work-page content is unchanged by the one-commit difference, but the payment hardening at branch head must not be presented as production evidence from this audit.

A separate route exists at /concepts/bbj-case-enquiry, but it is not a current example on /work and is therefore outside this three-case portfolio audit. Audit it before promoting it into Selected Work.

## 3. Canonical classifications

Use one canonical label per case everywhere: home page, work index, case page, metadata and social image.

| Case | Canonical classification | Audit decision | Public boundary |
| --- | --- | --- | --- |
| BongFoods | Live founder-built work | Keep, with qualification | Founder-owned and founder-directed work. Do not imply a paid client engagement, sole unaided engineering, successful transactions or revenue impact without attached proof. |
| Studio system | Self-initiated system | Keep | A real system made for SP Studios itself. Its public deployment and source implementation are evidence; client acquisition or revenue results are not yet established. |
| Private market | Speculative concept | Keep | An uncommissioned interface and workflow study. It is not a live product, client project, user-tested prototype or source of transaction results. |

### Label drift to remove

The site currently uses several close variants:

- BongFoods: “Live founder-built product.”
- Studio system: “Live self-initiated system,” “Live self-initiated business system” and “Live self-initiated operating system.”
- Private market: “Independent speculative study,” “Speculative product concept” and “Independent speculative concept.”

These are not deceptive, but the drift makes review harder. The canonical classification should remain stable; a separate state badge may say Live or Concept.

Recommended display:

- Classification: Live founder-built work · State: Live
- Classification: Self-initiated system · State: Live
- Classification: Speculative concept · State: Interface study

## 4. Evidence vocabulary

Every material claim receives one status.

| Status | Meaning | Allowed wording |
| --- | --- | --- |
| Verified | Direct runtime, source, dated artifact or reproducible check supports the claim. | “Is live,” “stores,” “routes,” “renders,” or another narrow factual statement. |
| Supported | Multiple first-party artifacts make the claim credible, but the full real-world path was not reproduced during this audit. | “Designed to,” “includes,” “Sohan directed,” with the evidence named. |
| Stated | The case study says it, but the audit did not find independent or implementation evidence. | Keep only as an attributed founder statement, or hold for evidence. |
| Missing | No adequate evidence is attached. | Do not publish as fact. |
| Not applicable | The claim is outside the project type, usually business outcomes for a speculative concept. | Say why it does not apply. |

### Claim ladder

1. Present — a screen, file or artifact exists.
2. Functional — a reproducible interaction completes in an appropriate test environment.
3. Used — dated first-party evidence shows real use.
4. Outcome — a defined metric changed over a defined period.
5. Attributed outcome — credible analysis connects the change to the work.

Never skip a rung. “Live” normally proves level 1 and sometimes level 2. It does not prove level 3, 4 or 5 by itself.

## 5. Minimum evidence gate for every case study

A case study is review-ready only when all seven fields below are filled and every published sentence stays within its evidence status.

| Required field | Minimum evidence | Pass condition |
| --- | --- | --- |
| Business problem | A dated founder brief, operating note, existing-state capture or explicitly labelled design hypothesis. | The problem is specific, belongs to the actual business or is clearly framed as a concept assumption, and does not invent a client brief. |
| Sohan’s direction | A role statement plus at least three dated direction decisions, annotated frames or attributable commits. | The text separates business ownership, creative direction, implementation and assistance. |
| Designed/built scope | Page and system inventory plus a contribution matrix: directed, designed, implemented, AI-assisted, vendor/platform and not owned. | A reviewer can tell what Sohan personally owned and what came from tools or third parties. |
| Interactions/integrations | A short reproducible flow, implementation link and status for each item: live, test-mode, prototype, mockup or conceptual. | No static mockup is described as an integration; no configured vendor is assumed without runtime evidence. |
| Decisions | Three to five decisions with option, trade-off and reason. | The section explains why the work is shaped this way, not only what screens exist. |
| Outcome evidence | At minimum, evidence of existence or launch. Stronger claims need dated usage or business data, a window and a source. | The claim names its evidence level and avoids causal or revenue language when only launch evidence exists. |
| Honest limitations | Ownership context, commission status, evidence gaps, AI/tool participation, third-party dependencies and untested areas. | A buyer cannot reasonably mistake founder work for client work, concept flow for production or output for outcome. |

### Mandatory evidence header

Each case should carry a compact header:

- Classification
- State
- Sohan’s role
- Evidence checked on
- Evidence level reached
- Outcome claim permitted
- Known limitation

### Contribution language

“Founder-built” may include an AI-assisted workflow, but it must still mean Sohan materially set direction, made decisions and owned delivery. Where implementation was generated, scaffolded or substantially assisted, say so. Safer wording is “founder-owned and founder-directed, built with an AI-assisted workflow” until the contribution matrix supports a narrower engineering claim.

## 6. Current-case audit

### 6.1 BongFoods

Canonical classification: Live founder-built work  
Current evidence ceiling: Supported, with a live-link claim still needing a dated flow capture  
Risk level: High, because it is the only example that can be mistaken for external client or transaction-outcome proof

| Required field | Status | Audit finding |
| --- | --- | --- |
| Business problem | Supported | The case names a clear operating problem: help a mobile customer move from food discovery through delivery eligibility and payment. It is an owner-defined business problem, not a client brief. |
| Sohan’s direction | Stated | Founder, director and builder roles are stated. The branch contains the case study, but not the BongFoods production source or dated direction record. |
| Designed/built scope | Stated | Visual direction, responsive front end, phone verification, cart, address, delivery-area logic and payment path are listed. A contribution matrix is absent. |
| Interactions/integrations | Stated | The case describes verification, delivery logic and payment. No dated screen recording, test transcript, redacted provider event or production-source link is attached here. |
| Decisions | Missing | The journey is described, but options, trade-offs and reasons are not documented as decisions. |
| Outcome evidence | Missing beyond existence claim | The page links to a public product, but this audit environment could not reproduce the external BongFoods flow. No order, conversion, revenue or customer evidence should be claimed. |
| Honest limitations | Partial | It correctly says founder-owned and not a client transformation. It does not yet disclose AI/tool contribution or the absence of measured outcome evidence. |

Decision: keep the classification, but treat “live founder-built” as a claim requiring a proof pack. Until that pack exists, the safest public lead is “Founder-owned restaurant commerce product, directed by Sohan.” Do not say “successful orders,” “payment working,” “improved conversion,” “built entirely from scratch” or “original front-end implementation” as audited facts.

Current safe proof: real founder context, coherent commerce journey and a public destination link.  
Current missing proof: production provenance, exact contribution, reproducible core flow and real outcome evidence.

### 6.2 Studio system

Canonical classification: Self-initiated system  
Current evidence ceiling: Verified for public existence and source implementation; no verified commercial outcome  
Risk level: Medium, mainly from calling configured code an operating result

| Required field | Status | Audit finding |
| --- | --- | --- |
| Business problem | Supported | The case clearly frames the problem: broad capabilities need one understandable buying journey. |
| Sohan’s direction | Supported | The information architecture, truth labels, scope logic, brief structure and private triage model are coherent across the case and implementation. |
| Designed/built scope | Verified in source | The branch contains the public site, proof navigator, scope planner, project brief, lead API, D1 persistence, owner auth, attribution and triage interface. |
| Interactions/integrations | Verified in source; partly unverified in runtime | The scope planner carries structured choices into the brief; the brief posts to the lead API; the API validates, rate-limits and stores; the owner desk reads and updates stage, notes and next action; attribution events are persisted. Email notification is conditional on environment configuration and must not be claimed as connected without checking it. |
| Decisions | Partial | The case documents one offer-to-brief path, truth labels, no automatic quotation and owner review. It needs explicit alternatives and trade-offs. |
| Outcome evidence | Verified at existence level | The Sites project is public at thespstudios.com with active custom domains. Source and saved-version history exist. No lead volume, conversion, client or revenue result is established by this audit. |
| Honest limitations | Strong but incomplete | It says self-initiated, not a client result and no guaranteed leads. Add the source/deployment boundary, recent-launch context and analytics limitations. |

Decision: this is the strongest auditable case. Lead the portfolio with it when the buyer values systems thinking, but call it an operating self-initiated system rather than a client acquisition result.

Current safe proof: source-backed public journey, scope-to-brief interaction, stored owner workflow and live public site.  
Current missing proof: exact deployed commit mapping, configured notification evidence, a stable measurement window and any commercial outcome.

### 6.3 Private market

Canonical classification: Speculative concept  
Current evidence ceiling: Supported as an interface and workflow study  
Risk level: Medium, because “prototype,” “research” and “workflow” can imply more validation than exists

| Required field | Status | Audit finding |
| --- | --- | --- |
| Business problem | Supported as a hypothesis | The design tension—create intent while controlling disclosure—is credible and clearly framed without a client. |
| Sohan’s direction | Supported by the artifact | Progressive disclosure, qualification, access request, reveal and collaboration form a coherent direction. |
| Designed/built scope | Verified as rendered case-study UI | The branch contains original page layouts and a detailed dashboard illustration. It does not contain a functional private-market product. |
| Interactions/integrations | Conceptual | Verification, matching, NDA gating and Deal Room behavior are depicted and described. They are not implemented integrations or working product flows. |
| Decisions | Partial | The page explains disclosure as a sequence and owner-controlled access. It needs documented alternatives, constraints and trade-offs. |
| Outcome evidence | Not applicable | There is no live product, client result, user test, network, transaction or proprietary dataset. The output is the evidence. |
| Honest limitations | Strong | It says uncommissioned, not live and not based on proprietary transaction data. Replace “prototype depth” with “interface-study depth” unless an interactive prototype is attached. |

Decision: keep it, but sell it as evidence of product framing and interface direction. Do not present competitor research as completed until a dated source log exists. Do not use “verified member,” “96% match,” document counts or due-diligence status as real data; they are illustrative interface content.

Current safe proof: coherent permission-aware product thinking and original interface direction.  
Current missing proof: research log, interactive prototype, user testing and real-world outcomes.

## 7. Ordered proof backlog

The ordering is based on credibility risk first, then commercial usefulness. Every item can be completed without spending or contacting anyone.

### P0 — 1. Build the BongFoods proof pack

Owner: Sohan  
Why first: it carries the strongest “real commerce” claim and the largest evidence gap.

Acceptance criteria:

- Record the date, public URL, current product state and responsible owner.
- Capture a short end-to-end screen recording on mobile from discovery through the last safe step before any real charge. Use test mode for payment if already available; do not place or fund a real order.
- Attach redacted proof for phone verification, delivery-area decision and payment-path configuration where lawful and safe.
- Add source provenance or an implementation inventory that a reviewer can inspect.
- Add a contribution matrix covering Sohan, AI tools, platform scaffolding, payment provider and any collaborator.
- State exactly which flow was reproduced and which was not.

### P0 — 2. Tighten BongFoods role and outcome wording

Owner: Sohan  
Acceptance criteria:

- Replace sole-engineering implications with the contribution language supported by item 1.
- Keep “not a client transformation.”
- Add “no revenue, conversion or customer-growth result is claimed.”
- Use “payment path” until a reproducible test or redacted provider evidence supports stronger wording.
- Remove “built entirely from scratch” wherever it cannot be demonstrated.

### P0 — 3. Pin the Studio system to production evidence

Owner: SP Studios  
Acceptance criteria:

- Record the exact deployed version and commit, not only the latest branch head.
- Capture the public offer → work → planner → brief flow.
- Capture the owner desk with fake or fully redacted data; expose no real lead identity.
- Record which integrations are configured in production and which are merely implemented in source.
- Specifically verify notification configuration before saying alerts are connected.
- Do not issue a payment link or trigger a paid transaction for proof.

### P1 — 4. Establish a Studio outcome baseline

Owner: SP Studios  
Acceptance criteria:

- Choose a fixed measurement window and write down its start date.
- Separate visits, proof views, planner completions, stored briefs and qualified leads.
- Exclude or label owner/internal traffic limitations.
- Report counts only after the window closes and the source is retained.
- Never describe correlation as causation or promise future lead performance.

### P1 — 5. Turn the Private market artifact into documented product thinking

Owner: Sohan  
Acceptance criteria:

- Add a dated research log with source links and the exact patterns learned.
- Write at least three decision records: progressive disclosure, approval authority and Deal Room boundary.
- Label every screen value as illustrative.
- Use “interface study” unless a navigable prototype exists.
- If an interactive prototype is later made, list what is simulated and what is functional.

### P1 — 6. Normalize all three case studies to the seven-field outline

Owner: SP Studios  
Acceptance criteria:

- Use the same section order: problem, direction, scope, interactions, decisions, outcomes, limitations.
- Use the canonical classifications from section 3.
- Show evidence status and last-checked date.
- Link each material claim to an artifact or mark it as founder statement.
- Withhold missing claims instead of smoothing over the gap with marketing language.

### P2 — 7. Maintain a proof manifest

Owner: SP Studios  
Acceptance criteria:

- Keep one manifest with case slug, canonical label, state, last checked, deployed commit, evidence links, outcome level and known limitations.
- Recheck any live claim after material source or vendor changes.
- Retire stale evidence rather than leaving “live” permanently attached.
- Keep private screenshots, analytics and provider records out of the public repository; link only to approved redacted derivatives.

## 8. Review-ready case-study outlines

These outlines are ready for editorial review. Text marked HOLD must not be published until the named evidence exists.

### 8.1 BongFoods — review outline

Working title: BongFoods — Directing a mobile restaurant journey from appetite to payment

Truth header:

- Classification: Live founder-built work
- State: Public product — live flow capture pending
- Role: Founder, business director and product/website director
- Evidence level: Supported
- Permitted outcome: A founder-owned product and defined commerce journey exist
- Limitation: Not a client engagement; no commercial uplift is claimed; contribution and runtime proof still need attachment

1. Business problem

Safe draft: “BongFoods needed a mobile journey that could turn appetite into a practical order without making customers navigate disconnected menu, verification, delivery and payment steps.”

Add a dated founder brief or operator note. Avoid presenting this as a client assignment.

2. Sohan’s direction

Safe draft: “Sohan set the business and experience direction: lead with appetite, make today’s menu easy to scan, defer friction until it protects the order and keep delivery eligibility visible before payment.”

HOLD: “Sohan personally implemented every part” until the contribution matrix is complete.

3. Designed/built scope

Review inventory:

- Brand and visual direction
- Mobile menu and product discovery
- Cart and customer state
- Phone-verification path
- Address capture and delivery eligibility
- Payment path and confirmation
- Launch and ongoing founder decisions

For each line, mark directed, designed, implemented, AI-assisted, platform/vendor or not owned.

4. Interactions and integrations

Safe draft: “The intended core path is discover → choose → verify → confirm delivery eligibility → continue to payment.”

HOLD as live/working until captured:

- Phone verification
- Delivery-area decision
- Provider checkout handoff
- Payment confirmation
- Order persistence or notification

5. Decisions

Required decision records:

- Why phone verification occurs where it does
- Why delivery eligibility is checked before payment
- How menu depth was reduced for mobile scanning
- What happens when an address is outside the service area
- Which failure state protects the customer from a false confirmation

6. Outcome evidence

Safe draft now: “This case is evidence of founder-owned commerce direction, not evidence of revenue uplift.”

After proof pack: “On [date], the public mobile path was reproduced through [last verified step].”

Never add order count, conversion, repeat-customer or revenue language without dated first-party records.

7. Honest limitations

Publish:

- Sohan owns the business, so this is not independent client validation.
- The workflow used AI-assisted and third-party tools where documented.
- Payment, messaging and mapping depend on external providers.
- No business-performance result is claimed.
- Any unreproduced flow is explicitly marked.

### 8.2 Studio system — review outline

Working title: SP Studios — Turning a broad capability into one inspectable buying system

Truth header:

- Classification: Self-initiated system
- State: Public
- Role: Strategy, positioning, art direction, UX and implementation
- Evidence level: Verified for existence and source behavior
- Permitted outcome: A live public system and source-backed operating workflow exist
- Limitation: It is not a client project and no lead or revenue outcome is established

1. Business problem

Safe draft: “SP Studios could describe many capabilities, but a buyer needed one clear answer: what is being bought, what proof is relevant and what information is needed for a responsible scope.”

2. Sohan’s direction

Safe draft: “Sohan collapsed the offer into a single founder-led path from positioning and truth-labelled proof through scope guidance, a structured brief and private review.”

3. Designed/built scope

Verified source inventory:

- Public positioning and service pages
- Truth-labelled work index and proof navigator
- Five-decision scope planner
- Structured brief and consent
- First-party source attribution
- Lead validation, rate limiting and D1 persistence
- Owner-only authentication
- Lead stage, notes and next-action tracking
- Draft response direction
- Payment-link workflow in source, with deployment state recorded separately

4. Interactions and integrations

Verified in source:

- Planner recommendation carries selected scope into the brief.
- Brief submission posts to /api/leads.
- Lead API validates origin, size, required fields, consent and submission frequency.
- Leads persist with source and UTM context.
- Owner desk reads and updates stage, notes and next action.
- Marketing events persist as first-party session-level diagnostics.

Conditional:

- Owner email alert uses Resend only when required environment variables are configured.
- Payment and webhook code at branch head must not be called live until the deployed commit is confirmed.

5. Decisions

Review-ready decisions:

- One accountable offer instead of a list of freelance tasks
- Truth labels instead of borrowed credibility
- Guidance, not an automatic quotation, in the scope planner
- A structured brief instead of a generic contact form
- An owner-only desk so private context is not exposed publicly

For each, add the rejected alternative and trade-off.

6. Outcome evidence

Safe draft: “The system is publicly available at thespstudios.com, and its planner, brief, persistence and owner workflow are represented in source.”

Add exact deployed version and a dated reproduction.

Do not claim that the system generates, improves or qualifies leads at a proven rate until a closed measurement window supports it.

7. Honest limitations

Publish:

- Built for SP Studios itself, not for a paying client
- Recently launched, with no established commercial result
- Analytics are first-party and directional; internal-traffic exclusion has limits
- Configured vendors must be verified separately from source presence
- Branch head may be newer than production

### 8.3 Private market — review outline

Working title: Private market — An interface study for earning disclosure

Truth header:

- Classification: Speculative concept
- State: Interface study
- Role: Product framing, UX architecture and visual direction
- Evidence level: Supported as an artifact
- Permitted outcome: Demonstrates a coherent permission-aware product direction
- Limitation: Not commissioned, live, user-tested or built against real transaction data

1. Business problem

Safe draft: “The study asks how a private real-estate network might establish relevance without exposing sensitive asset information too early.”

Use “asks,” “explores” and “hypothesis.” Do not invent an organization, stakeholder or client brief.

2. Sohan’s direction

Safe draft: “Sohan organized disclosure as a sequence: discover, qualify, request, reveal and collaborate.”

3. Designed/built scope

Safe inventory:

- Public-to-private product framing
- Member dashboard information architecture
- Opportunity discovery and illustrative match signals
- Access-request and approval states
- NDA-gating concept
- Deal Room document and message concept
- Responsive visual system
- Rendered interface study

HOLD: “competitor research completed” until the research log exists.  
HOLD: “prototype” unless a navigable prototype is attached.

4. Interactions and integrations

Safe draft: “The artifact depicts how verification, matching, approval and controlled document access could work.”

Explicitly mark all of these as conceptual. There is no identity provider, matching engine, e-signature integration, document store or messaging backend in this case.

5. Decisions

Required records:

- Progressive disclosure rather than full listing visibility
- Owner approval rather than automatic reveal
- Mandate signals before access request
- Deal Room as the controlled collaboration boundary
- What information remains hidden at each stage

6. Outcome evidence

Safe draft: “The outcome is the case-study artifact itself: a coherent product model and visual direction.”

Do not use the illustrative 96% match, opportunity count, participant count, document count or due-diligence status as evidence.

7. Honest limitations

Publish:

- Uncommissioned and independent
- No live network, real members or transaction data
- No user research or usability result yet
- No working integrations
- Illustrative content and values
- Shows direction, not product-market fit or engineering completion

## 9. Final editorial gate

Before any case is approved, the reviewer answers yes to all items:

- The canonical classification is identical everywhere.
- The business problem is real or explicitly a hypothesis.
- Sohan’s role is separated from tool, platform and third-party contributions.
- Every interaction says live, test, prototype, mockup or conceptual.
- At least three decisions include a reason and trade-off.
- The outcome stops at the highest evidenced rung.
- Limitations are visible before the CTA, not buried in a footnote.
- No invented client, metric, quote, user, transaction or result appears.
- Any live claim has a date and reproducible artifact.
- Private data and secrets are absent from public evidence.
- The exact deployed source version is recorded.
- Missing proof is shown as missing, not converted into confident copy.

## 10. Source map

Primary portfolio sources:

- [Selected Work index](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/work/page.tsx)
- [BongFoods case](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/work/bongfoods/page.tsx)
- [Studio system case](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/work/studio-system/page.tsx)
- [Private market case](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/work/private-market-concept/page.tsx)
- [Proof navigator](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/work/work-proof-navigator.tsx)

Studio implementation sources:

- [Scope planner](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/scope-planner.tsx)
- [Scope recommendation logic](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/scope-planner-recommendation.ts)
- [Project brief](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/project-brief.tsx)
- [Lead API](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/api/leads/route.ts)
- [Owner lead desk](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/leads/page.tsx)
- [Lead workflow UI](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/leads/lead-inbox.tsx)
- [Attribution tracker](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/app/marketing-tracker.tsx)
- [Database schema](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/rebrand/sp-studios-domain-preview/db/schema.ts)

This document is an audit and production backlog. It does not assert that missing evidence exists.
