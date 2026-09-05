# Custom or integrated project checklist

Use for every project outside the narrow one-week Focused Launch: larger/content-heavy sites, auth, payments, commerce, portals, custom backend, migrations, multilingual work, sensitive data, stateful/business-critical integration or more than one integration.

Project:  
Candidate reference:  
Architecture decision record:  
Data classification:  
Integration owners:  
UAT owner:  
Launch/rollback owner:

## Gate 0 — discovery and architecture approval

- [ ] Business outcome, users, critical journeys and measurable acceptance conditions are written.
- [ ] Scope is split into must-launch, later and explicitly excluded.
- [ ] System/context diagram identifies app, data stores, providers and trust boundaries.
- [ ] Data classification covers personal, financial, authentication, operational and public data.
- [ ] Each integration has an accountable client/provider owner.
- [ ] Rate limits, quotas, regions, retention, cost triggers and support constraints are known.
- [ ] Authentication/authorization roles and permission matrix are approved.
- [ ] Migration, cutover, coexistence and decommission needs are decided.
- [ ] Architecture, integration contracts and UAT plan receive staged approval before build.
- [ ] qa/project.json says custom and contains integration, security, data and observability checks.

Exit: the system is understood well enough to estimate; unknowns are named, not hidden.

## Gate 1 — intake, environments and test data

Complete qa/templates/intake.md plus:

- [ ] Development, preview/staging and production are separated.
- [ ] Sandbox/test accounts exist or mocks are contractually accurate.
- [ ] Access is least-privilege and environment-specific.
- [ ] No real secrets or production datasets are stored in code, fixtures, screenshots or reports.
- [ ] Synthetic/redacted test data covers success, boundary, empty, duplicate and failure cases.
- [ ] Webhook endpoints, signing method, event IDs and replay policy are documented.
- [ ] Source-of-truth and conflict rules are set for every synchronized field.
- [ ] Data export, deletion, retention and audit responsibilities are approved.
- [ ] Provider/KYC/legal/tax/security dependencies are marked external and cannot be claimed complete from code.
- [ ] One decision-maker and separate technical/UAT owners are named.

Exit: environments and evidence can be used without touching real clients or money.

## Gate 2 — design-system and component contract

Run every standard design check, then:

- [ ] Component API, variants, content limits and failure states are documented.
- [ ] Authenticated, unauthorized, expired, unavailable, partial-data and degraded states are designed.
- [ ] Tables, filters, pagination, uploads, exports and notifications have keyboard and screen-reader behavior.
- [ ] Responsive rules cover dense data and role-specific actions.
- [ ] Motion does not hide state transitions or delay critical feedback.
- [ ] Audit/legal/payment language is reviewed by the responsible external owner.
- [ ] Visual baselines are separated by route, role, viewport, theme and stable test data.

Exit: implementation states are defined before integration complexity arrives.

## Gate 3 — automated test matrix

Baseline:

- [ ] Lint, type/build and source policy.
- [ ] Unit tests for validation, money/date/reference, permissions and pure state transitions.
- [ ] Component tests for interactive states.
- [ ] Browser tests across agreed desktop/mobile/browser projects.
- [ ] Automated axe plus manual keyboard/screen-reader/zoom/contrast checks.
- [ ] Route metadata, canonical, sitemap, robots, structured data and internal links.
- [ ] Lighthouse budgets on representative public and authenticated pages.
- [ ] Visual snapshots with masked nondeterministic regions.

Integrations:

- [ ] Contract fixture matches current provider documentation/version.
- [ ] Sandbox happy path passes.
- [ ] Invalid/missing credential, timeout, 4xx, 5xx, rate-limit and malformed response fail safely.
- [ ] Retry uses bounded backoff and does not duplicate side effects.
- [ ] Idempotency covers client retry, provider retry and concurrent requests.
- [ ] Webhook invalid signature is rejected before mutation.
- [ ] Duplicate and out-of-order webhook events preserve monotonic state.
- [ ] Mismatched account/reference/amount/currency/status is quarantined.
- [ ] Provider notification and redirect behavior match the approved customer journey.
- [ ] Third-party outage leaves a usable recovery path and observable error.

Auth/security:

- [ ] Anonymous, wrong-role, expired/revoked session and direct-URL access are tested.
- [ ] Object-level authorization prevents cross-tenant/user access.
- [ ] State-changing requests enforce origin/CSRF strategy and size/rate limits.
- [ ] Sensitive responses are not cached publicly or written to logs.
- [ ] Upload type/size/storage rules and download authorization are tested if applicable.
- [ ] Security headers and cookie properties are verified at the actual edge runtime.
- [ ] Dependency/security findings have owner, severity and disposition.

Data/migration:

- [ ] Forward migration runs on a production-like copy.
- [ ] Backward compatibility or restore plan is proven.
- [ ] Counts, checksums/key records and invariants reconcile before and after.
- [ ] Partial migration/interruption can resume or roll back safely.
- [ ] Application rollback does not corrupt data written by the new version.
- [ ] Backup restoration is tested by the authorized owner.
- [ ] Audit/event ledgers survive retry and application rollback.

Observability:

- [ ] Health, error, latency, queue/webhook and critical-journey signals exist.
- [ ] Logs identify correlation/reference without exposing secrets or personal data.
- [ ] Alert thresholds, recipient and silence/escalation behavior are tested.
- [ ] Synthetic/read-only check never creates a real lead, order or payment.
- [ ] Provider dashboard/manual reconciliation procedure is documented.

Commands:

~~~
npm run qa:static
QA_BASE_URL=https://authorized-preview.example node scripts/preview-smoke.mjs qa/project.json
node scripts/qa-gate.mjs qa/project.json --phase=candidate
~~~

Exit: machine evidence is green; external provider/legal/account dependencies remain explicitly unresolved.

## Gate 4 — Sohan director review and staged UAT

- [ ] Sohan reviews visual direction, truth, hierarchy, customer journey and degraded states.
- [ ] Architecture owner approves system behavior and known limitations.
- [ ] Integration owner accepts sandbox evidence and reconciliation path.
- [ ] UAT uses written scenarios and synthetic/redacted data.
- [ ] Client decision-maker accepts scope and business behavior.
- [ ] Open issues have severity, owner, due date and launch disposition.
- [ ] Approval refers to immutable candidate, environment and fixture version.

~~~
node scripts/qa-gate.mjs qa/project.json --phase=approve
~~~

Exit: candidate is accepted for launch planning, not automatically deployed.

## Gate 5 — controlled launch and rollback plan

- [ ] Cutover sequence lists each application, data, DNS, provider and communication step with owner.
- [ ] Freeze window and go/no-go time are agreed.
- [ ] Backup/restore evidence is current.
- [ ] Migration dry run and duration are recorded.
- [ ] Feature flags, compatibility window or staged exposure are used where appropriate.
- [ ] Rollback triggers are measurable: availability, error rate, integrity, payment/auth/form failure.
- [ ] Application, data, DNS and provider rollback steps are separate.
- [ ] Non-reversible steps have explicit approval and contingency.
- [ ] Reconciliation covers in-flight requests/events during rollback.
- [ ] Last known-good version and configuration revision are recorded.
- [ ] Final diff, build, migrations, environment-key names and provider mode are verified.
- [ ] Sohan gives exact candidate/window authorization; provider/account/DNS changes require separate approval.

~~~
node scripts/qa-gate.mjs qa/project.json --phase=launch
~~~

Exit: launch can be performed only by an authorized owner.

## Gate 6 — handover, support and post-launch operations

- [ ] Architecture, data model, API/contracts, environment inventory and runbooks are delivered.
- [ ] Client owns required accounts and billing; access/rotation tasks have owners.
- [ ] Operational procedures cover retry, replay, reconciliation, refund/cancel where applicable, export/deletion and incident evidence.
- [ ] Support severities, hours, response targets, escalation and excluded change work are accepted.
- [ ] Warranty versus enhancement classification is written.
- [ ] Monitoring window is long enough for scheduled/provider events.
- [ ] Daily evidence records availability, critical journey, error rate, integration lag/failure, data reconciliation and security events.
- [ ] Incident log records detection, impact, containment, recovery, evidence and follow-up.
- [ ] Handover acceptance and support start/end are recorded.

~~~
node scripts/qa-gate.mjs qa/project.json --phase=handover
~~~

Exit: operational ownership is explicit; unresolved external dependencies are not disguised as completion.
