# Standard one-week website checklist

Use only for a prepared 1–3 page Focused Launch with no auth, payments, commerce, migration, sensitive data, custom backend or business-critical integration. If any condition is false, stop and use custom-integrated.md.

Project:  
Candidate reference:  
Preview URL:  
Decision-maker:  
Target date:  
QA evidence folder/run:

## Gate 0 — classify and freeze

- [ ] Primary business outcome and one primary customer action are written.
- [ ] Scope is 1–3 pages and the included sections/states are listed.
- [ ] No custom/integrated trigger is present.
- [ ] One client decision-maker is named.
- [ ] Content, asset, access and feedback deadlines are accepted.
- [ ] Anything excluded is written; “small extra” is not a testable scope.
- [ ] qa/project.json says standard and passes the schema gate.

Command:

~~~
node scripts/qa-gate.mjs qa/project.json --schema-only
~~~

Exit: track is standard; scope and ownership are unambiguous.

## Gate 1 — content and access intake

- [ ] Final copy is in one approved source, not scattered across chat.
- [ ] Legal, pricing, factual and performance claims have a client owner.
- [ ] Logo, fonts, images, video and testimonials have usage rights.
- [ ] Real navigation labels, CTA destinations, business details and form recipients are approved.
- [ ] Missing, empty, long, error and success states have content.
- [ ] DNS, domain, hosting, CMS, analytics and form-delivery owners are recorded.
- [ ] Access is least-privilege, time-bounded where possible and shared through an approved password manager.
- [ ] No credential, cookie, OTP, recovery code or private key appears in the repository or qa/project.json.
- [ ] Production form submission is not used as QA evidence.
- [ ] Content freeze version and approval evidence are recorded.

Exit: inputs are ready. Delay the start date if they are not.

## Gate 2 — design-system and implementation checks

- [ ] Color, type, spacing, radius, shadow, motion and layout values come from named tokens.
- [ ] Every interactive component has default, hover, focus, disabled, loading, error and success behavior as applicable.
- [ ] One H1 and a logical heading order exist on every critical route.
- [ ] Links look and behave like links; buttons perform actions.
- [ ] Visible focus and reduced-motion behavior are present.
- [ ] Images have dimensions; informative images have useful alt text; decorative images are ignored by assistive tech.
- [ ] Real approved content is used for final layout testing.
- [ ] No unapproved proof, client, revenue, impact or guarantee claim appears.

Command:

~~~
npm run qa:static
~~~

Exit: lint, build, source policy and manifest schema pass.

## Gate 3 — automated candidate QA

Responsive:

- [ ] Critical routes pass at 360×800, 390×844, 768×1024, 1280×720 and 1440×900.
- [ ] No horizontal overflow, clipped text, covered CTA or unusable fixed element.
- [ ] Navigation, forms, tables/cards, embeds and long content reflow.
- [ ] Touch targets and spacing are comfortable on mobile.
- [ ] Portrait/landscape and 200% zoom retain the customer path.

Accessibility:

- [ ] Automated axe scan has no serious or critical violation.
- [ ] Keyboard-only pass covers navigation, dialogs, tabs, forms and errors.
- [ ] Focus order follows visual order; focus never disappears behind a sticky layer.
- [ ] Form labels, instructions, validation and live status are announced.
- [ ] Contrast, non-color meaning and reduced motion are manually checked.
- [ ] Screen-reader spot check covers page title, landmarks, H1, navigation, form and success/error state.

Performance:

- [ ] Mobile Lighthouse meets project budgets for critical routes.
- [ ] LCP element is identified and intentionally loaded.
- [ ] CLS has no visible late jump.
- [ ] Images, fonts, video and third-party scripts are justified and bounded.
- [ ] Cache/compression and asset errors are checked on the preview.

SEO:

- [ ] Unique title, description, canonical and one H1 per indexable route.
- [ ] Open Graph/Twitter image and text render correctly.
- [ ] JSON-LD claims match visible truth.
- [ ] robots.txt and sitemap use the intended canonical host.
- [ ] Private, preview, form-result, owner and transactional routes are not in the sitemap.
- [ ] Redirects and internal links do not chain or break.

Forms:

- [ ] Required, email, length and consent validation work.
- [ ] Keyboard submit and duplicate-click protection work.
- [ ] Loading, success, server error, offline and recovery states preserve the user’s input where promised.
- [ ] Anti-spam controls fail safely.
- [ ] Test uses route mocking or an authorized non-production sink.
- [ ] Privacy notice, retention owner and destination are correct.
- [ ] No real client, payment or confidential data is used.

Read-only smoke:

~~~
QA_BASE_URL=https://authorized-preview.example node scripts/preview-smoke.mjs qa/project.json
node scripts/qa-gate.mjs qa/project.json --phase=candidate
~~~

Exit: no blocker; evidence is tied to the immutable candidate.

## Gate 4 — Sohan director/final-test gate

Review desktop and mobile, not screenshots alone.

- [ ] First screen states audience, offer, outcome/proof boundary and next action plainly.
- [ ] Hierarchy, rhythm, composition and restraint feel directed.
- [ ] Mobile reading order tells the same story.
- [ ] Long names, missing media, error states and empty states do not collapse the design.
- [ ] Motion helps orientation, pauses appropriately and fully respects reduced motion.
- [ ] Pricing, proof labels, claims and business details are true.
- [ ] The main customer path can be completed without explanation.
- [ ] Visual diffs are understood; baselines were not blindly updated.
- [ ] Sohan records approve, approve-with-listed-nonblockers or reject against the candidate reference.

Exit: director approval is recorded.

## Gate 5 — client approval

- [ ] Client reviews the same candidate reference approved by Sohan.
- [ ] Approval covers content, visual direction, scope and functional acceptance.
- [ ] Feedback is one consolidated list from the decision-maker.
- [ ] Fixes are classified as defect, agreed revision or new scope.
- [ ] Any change creates a new candidate and reruns affected gates.
- [ ] Written approval includes approver, timestamp, candidate reference and exceptions.

~~~
node scripts/qa-gate.mjs qa/project.json --phase=approve
~~~

Exit: exact candidate is accepted.

## Gate 6 — launch and rollback readiness

This checklist does not authorize or perform deployment.

- [ ] Candidate SHA/version, build output and environment are recorded.
- [ ] Final diff contains only approved scope.
- [ ] Required environment keys are listed; values remain server-side.
- [ ] Domain/canonical, redirects, robots/sitemap and legal pages are ready.
- [ ] Known-good application version is recorded.
- [ ] Rollback trigger, owner and exact restore procedure are written.
- [ ] Application rollback will not delete or rewrite leads, orders or audit records.
- [ ] Backup/restore responsibility is confirmed.
- [ ] Launch authorization names the exact candidate and window.
- [ ] No account, DNS or provider change occurs without separate exact approval.

~~~
node scripts/qa-gate.mjs qa/project.json --phase=launch
~~~

Exit: ready for a separately authorized human launch.

## Gate 7 — handover, support and monitoring

- [ ] Repository/source access and ownership are recorded.
- [ ] Client owns the domain, hosting, analytics and business accounts or has an explicit transfer plan.
- [ ] Secrets are rotated/revoked by the account owner after handover.
- [ ] Content guide, asset source, component/tokens guide and runbook are delivered.
- [ ] Form destination, retention and privacy responsibilities are handed over.
- [ ] Known limitations and third-party dependencies are listed.
- [ ] Support start/end, severity definitions, response targets and exclusions are accepted.
- [ ] Read-only post-launch smoke runs after an authorized launch.
- [ ] Availability, critical routes, form delivery, errors and indexing directives are observed for the agreed window.
- [ ] Monitoring alerts have a named human recipient.
- [ ] Client acknowledges receipt.

~~~
node scripts/qa-gate.mjs qa/project.json --phase=handover
~~~

Exit: handover accepted; support window is active.
