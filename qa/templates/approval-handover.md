# Approval, launch-readiness and handover record

This record never deploys, changes an account, submits a form or activates a provider. Every decision must refer to one immutable candidate.

## Candidate identity

| Field | Value |
| --- | --- |
| Project / track | |
| Candidate commit/version | |
| Preview URL | |
| Build/CI evidence | |
| Content version | |
| Test-fixture version | |
| Environment/config revision | |
| Known-good rollback version | |

A change to code, content, environment or fixture invalidates affected approvals.

## Director review — Sohan

Decision: approve / approve with listed nonblockers / reject  
Candidate reference:  
Reviewed routes/viewports/states:  
Visual diff evidence:  
Truth/proof/pricing review evidence:  
Exceptions with owner/date:  
Approved by: Sohan Vyaparee  
UTC timestamp:

Director acceptance means the direction, hierarchy, mobile story, claim truth and customer experience meet the studio bar. It is not client approval or launch authorization.

## Client acceptance

Decision: approve / consolidated changes / reject  
Candidate reference:  
Accepted scope version:  
Accepted content version:  
Accepted functional/UAT scenarios:  
Exceptions/nonblockers:  
New-scope requests separated:  
Approved by authorized decision-maker:  
Role/company:  
UTC timestamp:  
Evidence reference:

Suggested approval language:

> I approve candidate [reference] for the scope and content version listed above, subject only to the recorded exceptions. I understand that later changes create a new candidate and may affect timing or scope.

## Change-control record

| Request | Defect / agreed revision / new scope | Candidate affected | Owner | Decision | Retest gates |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Launch-readiness authorization

This section records readiness only. Deployment/provider/DNS/account action needs its own authority.

Candidate reference:  
Window:  
Final diff reviewed: yes / no  
Automated gates green: yes / no  
Director approval matches: yes / no  
Client approval matches: yes / no  
Known-good version:  
Rollback trigger and owner:  
Data preservation/reconciliation confirmed:  
External dependencies still unresolved:  
Decision: ready / blocked  
Authorized by Sohan:  
UTC timestamp:  
Evidence reference:

## Rollback card

| Question | Answer |
| --- | --- |
| Trigger: what measurable failure causes rollback? | |
| Decision owner | |
| Last known-good application version | |
| Config/environment revision | |
| Restore steps | |
| Data policy: what must never be deleted/reversed? | |
| Migration compatibility/restore | |
| In-flight event reconciliation | |
| DNS/provider rollback if separately changed | |
| Verification after rollback | |
| Last rehearsal/evidence | |

Preserve the failed version and logs for diagnosis. Application rollback and data recovery are separate operations.

## Handover inventory

| Deliverable | Location/evidence | Client owner | Received |
| --- | --- | --- | --- |
| Source/repository access | | | |
| Design source and assets | | | |
| Component/design-token guide | | | |
| Content/SEO update guide | | | |
| Architecture/data/integration notes | | | |
| Environment-key inventory without values | | | |
| Domain/DNS/hosting ownership | | | |
| Analytics/search ownership | | | |
| Form/CRM destination and retention | | | |
| Backup/restore and rollback runbook | | | |
| Monitoring/incident runbook | | | |
| Known limitations/dependency list | | | |
| Account access rotation/revocation tasks | | | |

## Support boundary

Support start:  
Support end:  
Support channel:  
Hours/time zone:  
P0 definition and response target:  
P1 definition and response target:  
P2 definition and response target:  
Warranty/defect definition:  
Excluded enhancement/change work:  
Third-party outage responsibility:  
Escalation owner:  

No response target is a promise until both sides accept it.

## Post-launch monitoring record

| UTC time | Availability | Critical journey | Form/integration delivery | Errors/latency | SEO directives | Action/owner |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

Rules:

- read-only checks by default;
- no real lead, order or payment creation;
- no private data in reports;
- alert has a human owner;
- custom projects also reconcile queues/webhooks/data invariants;
- observation window and exit conditions are agreed.

## Incident record

Detected at:  
Detected by:  
Severity:  
Candidate/version:  
User/business impact:  
Data/payment/auth impact:  
Containment:  
Rollback or forward fix:  
Recovered at:  
Verification evidence:  
Root cause and follow-up owner:  
Client notification owner/approval if required:

## Handover acceptance

I confirm receipt of the listed deliverables, ownership/responsibility assignments and support boundaries.

Client decision-maker:  
Candidate reference:  
Decision: accepted / blocked  
Open items and owners:  
UTC timestamp:  
Evidence reference:
