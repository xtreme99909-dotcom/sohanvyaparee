# SP Studios QA and handoff operating layer

This folder turns delivery into evidence-driven gates. Automation handles repeatable checks; Sohan remains director, truth owner and final tester.

Nothing here deploys, submits a production form, contacts a client, changes an account or buys a service.

## Director contract

Automation owns:

- deterministic lint, build and source-policy checks;
- route, metadata, link and read-only preview smoke checks;
- repeatable browser, accessibility, visual-regression and performance checks once the recommended test packages are installed;
- evidence collection and release-candidate summaries;
- track-policy enforcement so a custom build cannot masquerade as a one-week Focused Launch.

Sohan owns:

- whether the visual direction feels intentional;
- whether copy, proof, pricing and claims are true;
- whether the mobile journey communicates in the right order;
- whether the client has approved the exact candidate;
- the final launch or rollback decision.

The client owns:

- approved content and legal claims;
- access they are authorized to grant;
- one named decision-maker;
- approval or a consolidated change request.

## Two delivery tracks

| Rule | Standard one-week website | Custom or integrated work |
| --- | --- | --- |
| Intended scope | Prepared 1–3 page Focused Launch | Any larger/content-heavy build, auth, payments, commerce, custom backend, migration, multilingual work, sensitive data or business-critical integration |
| Delivery promise | 5–7 working days only when content, access and one decision-maker are ready | Estimate after discovery, contracts, data and failure modes are understood |
| Integrations | At most one low-risk, replaceable integration | Any business-critical, stateful or multi-system integration |
| Test depth | Static gates, critical-path browser tests, accessibility scan, visual review, Lighthouse budget, safe form mock | Standard suite plus contract, sandbox, webhook/idempotency, permission, migration, recovery and observability tests |
| Approval | One visual round and one consolidated acceptance round | Staged approvals: architecture, visual system, integration/UAT and launch |
| Rollback | Restore last known-good site version; preserve submissions | Application and data rollback are separate; migrations must be forward/backward compatible or have a tested restore plan |
| Support | Fixed defect window with scope boundary | Named severity/SLA, integration owner, runbook and monitoring period |

The standard track is only the narrow Focused Launch with ready scope, content, access and one fast approval owner. All broader engagements use the custom track.

A standard project must be reclassified as custom when any standard-track limit is crossed. A deadline does not turn custom work into standard work. Calendars are not compression algorithms.

## Reusable scaffold

Use this structure in every delivery repository:

~~~
qa/
  README.md
  project.json                 # copy project.example.json; never store secrets
  checklists/
    standard-one-week.md
    custom-integrated.md
  templates/
    intake.md
    approval-handover.md
  TEST_RECOMMENDATIONS.md
scripts/
  qa-gate.mjs
  source-audit.mjs
  preview-smoke.mjs
.github/workflows/
  qa-gates.yml
~~~

For a new project:

1. Copy qa/project.example.json to qa/project.json.
2. Select standard or custom.
3. Replace placeholders; add no passwords, tokens, cookies or private keys.
4. Fill checks as work completes. Every pass needs durable evidence: CI URL, screenshot path, test report, approval record or dated note.
5. Run the candidate gate before Sohan reviews.
6. Run approve only after Sohan and the client accept the same immutable candidate.
7. Run launch immediately before a human-authorized deployment.
8. Run handover after post-launch verification. These commands validate evidence; they never deploy.

## Commands

~~~
npm run qa:static
node scripts/qa-gate.mjs qa/project.json --phase=candidate
QA_BASE_URL=https://preview.example.test node scripts/preview-smoke.mjs qa/project.json
node scripts/qa-gate.mjs qa/project.json --phase=approve
node scripts/qa-gate.mjs qa/project.json --phase=launch
node scripts/qa-gate.mjs qa/project.json --phase=handover
~~~

The preview smoke script performs GET requests only. It never submits forms. It refuses an invalid URL and can be pointed at localhost or an authorized preview.

## Gate sequence

| Gate | Entry | Automated evidence | Human evidence | Exit |
| --- | --- | --- | --- | --- |
| G0 classify | Enquiry understood | Track-policy result | Sohan accepts scope boundary | Track fixed |
| G1 intake | Proposal/scope accepted | Manifest completeness | Content/access owners confirm readiness | Inputs frozen |
| G2 build candidate | Implementation complete | Lint, build, source audit | None | Immutable preview/reference |
| G3 functional QA | Candidate exists | Responsive, a11y, forms, SEO, link, performance and integration results | Exception notes | No blocker |
| G4 director review | G3 green | Visual diffs and device captures | Sohan approves direction, truth and mobile order | Director approval recorded |
| G5 client acceptance | Director-approved candidate | Candidate/ref match | Client approval or one consolidated change list | Exact candidate accepted |
| G6 launch readiness | Client approval | Re-run green checks, backup/rollback record | Sohan launch authorization | Ready; no automatic deployment |
| G7 handover | Authorized launch later occurs | Read-only production smoke and monitoring evidence | Client receives assets/access/runbook | Support window begins |

A changed commit, build, environment or content package invalidates visual and client approval. Re-run the affected gates.

## SP Studios repository baseline

The current repository is a Next.js 16 / React 19 / TypeScript application built with vinext. It already includes:

- lint and production-build commands;
- site-wide metadata, Open Graph/Twitter data, JSON-LD, sitemap and robots files;
- responsive and reduced-motion styling;
- a database-backed brief with origin, size, honeypot, timing and rate-limit controls;
- an owner-only lead desk;
- owner-issued Razorpay links guarded by accepted scope data;
- HMAC-verified and duplicate-protected payment webhooks;
- an approval-controlled release packet and explicit last-known-good rollback boundary.

The missing reusable layer is evidence normalization: there is no CI workflow, project manifest, browser suite, accessibility scan, performance budget, visual-baseline policy or client/handover record. This scaffold supplies the contract and zero-dependency gates now; qa/TEST_RECOMMENDATIONS.md defines the next test implementation.

Repo-specific blockers:

- /leads, /api, /pay and /payments must stay excluded from search indexing.
- Public tests must never create real leads or payments.
- Payment-link tests require an owner-authenticated non-production environment and provider mocking or sandbox credentials.
- Webhook tests must cover invalid signatures, duplicates, out-of-order events, refunds and notification failure without weakening paid-state monotonicity.
- Lead and payment records must survive application rollback.
- The excluded Tenderma concept must remain absent from public candidates unless separately authorized.
- The existing Sites production version must be recorded as rollback target before any future launch.

## Evidence policy

Good evidence is immutable or dated and tied to a candidate reference:

- commit SHA and preview URL;
- CI run URL and machine-readable report;
- screenshots named by route, viewport and commit;
- Lighthouse JSON/HTML report;
- accessibility report with rule, selector and disposition;
- sandbox request/response fixture with secrets removed;
- written approval including candidate reference and approved scope.

Bad evidence includes “looked fine,” an undated chat fragment, a mutable latest-preview URL without commit, production form submissions, or screenshots that do not identify viewport and candidate.

Statuses are pending, pass, fail, not-applicable or waived. A waiver needs the risk, owner, expiry and approver. Custom-track security, payment, data-integrity and rollback blockers cannot be waived by convenience.

## Visual review gate

Automation captures desktop and mobile snapshots and flags pixel changes. Sohan reviews the actual candidate for:

- first-screen clarity: audience, offer, proof, price boundary and next action;
- hierarchy, rhythm, composition and restraint;
- mobile reading order and touch comfort;
- real content stress: long names, missing images, empty states and error states;
- animation purpose, pause behavior and reduced-motion result;
- claim truth, proof labels, pricing and legal-sensitive wording;
- consistency across homepage, offer, work, trust, legal, brief and recovery states.

Record approve, approve-with-listed-nonblockers, or reject. Do not silently update visual baselines to make a red diff disappear.

## Definition of done

A project is done when the correct track is recorded; scope/content/access are frozen; machine gates are green; Sohan approves the immutable visual candidate; the client accepts that same candidate; a human-authorized launch has a known-good rollback; handover materials are received; support boundaries are written; and post-launch monitoring has an owner and end date.
