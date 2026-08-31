# SP Studios contact sender activation gate

Status: **NOT ACTIVATED — approval and evidence artifact only**
Lane: `contact@thespstudios.com` mailbox, authentication, owner testing, and controlled one-to-one email
Authority: [SP Studios headquarters context at e544fad195c0dd5335a7dffc641227de3fd71a30](https://github.com/xtreme99909-dotcom/sohanvyaparee/blob/e544fad195c0dd5335a7dffc641227de3fd71a30/docs/SP_STUDIOS_HQ_CONTEXT.md)
Prepared: 1 September 2026

This document is not evidence that a mailbox exists, DNS is configured, outreach is approved, or email has been sent. It deliberately contains no guessed provider DNS.

## Bounded purpose

Prepare one safe sender for:

1. receiving project communication;
2. replying personally as Sohan Vyaparee;
3. after separate headquarters approval, sending highly selective first contact to a qualified business.

The sender supports SP Studios' position as a founder-led website strategy, original design, development, integration, and launch studio. It is not a newsletter, mail-merge, bulk cold-email, job-search, CGI/animation, coding-only, or automated-sequence system.

The existing acquisition path remains authoritative:

**interest → need → authority → outcome → scope → readiness → timing → investment → fixed proposal → completed SOW/agreement → verified captured milestone → onboarding → project start**

A sent email, view, reply, friendly conversation, proposal, or payment promise is not a client, captured milestone, or settled revenue.

## Preserved verified work

Do not change or delete:

- authoritative nameservers;
- root or `www` A, AAAA, CNAME, HTTPS, or CAA records;
- search, hosting, certificate, analytics, or ownership-verification TXT records;
- the existing private project-enquiry path or its privacy boundary;
- payment code, provider configuration, KYC, bank state, secrets, webhooks, or payment evidence;
- acquisition, portfolio-proof, or delivery artifacts owned by other lanes.

When changing SPF, edit only the single TXT value beginning `v=spf1`; never replace the complete root TXT RRset.

## Current evidence state

| Evidence | State |
|---|---|
| Public site | Verified live at <https://thespstudios.com> |
| Founder identity and positioning | Verified by headquarters context and public site |
| Enquiry privacy boundary | Verified: project information is not an unrelated mailing list |
| Working branch at preparation | `rebrand/sp-studios-domain-preview` at `e544fad195c0dd5335a7dffc641227de3fd71a30` |
| Existing sender artifact in `docs/` | None found at preparation |
| Active mailbox provider | **Unresolved** |
| `contact@thespstudios.com` mailbox type/state | **Unresolved** |
| Authoritative MX/SPF/DKIM/DMARC values | **Unresolved** |
| Website-form mail source and From/Reply-To behavior | **Unresolved** |
| Live send/receive test | **Not performed** |
| Outreach approval | **Not granted** |

## Required owner evidence packet

No activation work begins until headquarters holds a private packet containing:

### Provider/account

- provider name;
- evidence of an active custom-domain-mail entitlement, or the word `NONE`;
- official provider setup URL;
- provider admin screen showing `contact@thespstudios.com` as a full mailbox or authenticated shared mailbox;
- MFA and recovery confirmation without credentials or recovery codes;
- provider-generated record table: host, type, priority, value, purpose;
- official provider sending-limit and acceptable-use links.

### DNS baseline

- complete zone export and screenshots, timestamped;
- NS and SOA;
- root A, AAAA, MX, TXT, and CAA;
- `www` CNAME/A/AAAA;
- `_dmarc` TXT;
- `_mta-sts` and `_smtp._tls`, if present;
- a list of every website/search/ownership verification record;
- authoritative-server and two public-resolver answers.

The DNS host is determined from authoritative NS records. Do not assume the registrar or website host controls the active zone.

### Sending-source inventory

Record every system that can emit mail using `thespstudios.com`:

- owner mailbox;
- project form or lead dashboard;
- proposal/invoice system;
- payment notifications;
- booking or CRM system;
- any legacy forwarder, alias, SMTP relay, or automation.

The website form must not spoof a visitor's address in `From`. Use an authenticated studio/provider identity for `From`; place the visitor address in `Reply-To`.

## Provider DNS change manifest

Every row must cite the provider admin wizard and matching official provider documentation.

| Owner name | Type | Existing value | Proposed exact value | Source URL/screen | Action | Rollback value |
|---|---|---|---|---|---|---|
| `@` | MX | PENDING | PENDING | PENDING | PENDING | PENDING |
| `@` | TXT/SPF | PENDING | PENDING | PENDING | merge one SPF record | PENDING |
| provider selector | TXT/CNAME DKIM | PENDING | PENDING | PENDING | add/replace exact selector | PENDING |
| `_dmarc` | TXT | PENDING | standards-based staged value | RFC 9989 | add/update one record | PENDING |
| provider verification | TXT/CNAME | PENDING | PENDING | PENDING | additive only | PENDING |

Rules:

- Never infer MX from nameservers, registrar, website host, or a generic tutorial.
- Never publish two SPF records.
- Use only confirmed sending sources in SPF and stay within RFC 7208's ten DNS-triggering-lookup limit.
- DKIM selector and value must be generated for this provider/account. Prefer 2048-bit keys where supported.
- Require `dkim=pass` with an aligned `header.d=thespstudios.com`.
- If current MX serves mail, classify the work as a migration and use that provider's official migration/rollback sequence. Do not mix providers casually.
- Mailbox readiness must precede MX cutover.

## DMARC plan

Use the current DMARC standard, RFC 9989. It obsoletes RFC 7489 and removes the old `pct` rollout tag.

A report destination must exist, accept mail, and be approved before inserting it below. Do not create one inside this task.

### Stage 1: monitoring

After SPF and DKIM pass and the report destination is verified:

```text
v=DMARC1; p=none; rua=<VERIFIED_REPORT_URI>
```

Hold for at least 30 days while identifying every legitimate source.

### Stage 2: root quarantine, subdomain monitoring

Only after the owner test and website-form test pass, and reports show no unidentified legitimate source:

```text
v=DMARC1; p=quarantine; sp=none; rua=<VERIFIED_REPORT_URI>
```

Hold for at least 30 further days.

### Stage 3: enforcement

Only after a final subdomain/source audit:

```text
v=DMARC1; p=reject; sp=reject; rua=<VERIFIED_REPORT_URI>
```

Omit message-specific `ruf` reporting initially because of its privacy and data-handling burden.

Standards:

- SPF: <https://www.rfc-editor.org/info/rfc7208/>
- DKIM: <https://www.rfc-editor.org/info/rfc6376/>
- DMARC: <https://www.rfc-editor.org/info/rfc9989/>
- DMARC aggregate reporting: <https://www.rfc-editor.org/info/rfc9990/>

Receiver guidance:

- Gmail: <https://support.google.com/mail/answer/81126?hl=en>
- Yahoo: <https://senders.yahooinc.com/best-practices/>

## Activation gates

| Gate | Pass evidence | Failure action |
|---|---|---|
| 0. Headquarters approval | Exact provider/evidence decision recorded | Stop |
| 1. Baseline | Full zone export and record diff | Stop |
| 2. Mailbox readiness | Authenticated mailbox can sign in, send, receive, and reply | Do not change MX |
| 3. Authentication | Public SPF/DKIM records verified; DKIM enabled | No prospect sending |
| 4. Two-way owner test | Gmail and Outlook evidence below passes | Pause and correct only mail records |
| 5. Website/form preservation | Root, `www`, HTTPS, search verification, and project enquiry behavior pass | Restore exact changed RRset |
| 6. DMARC observation | 30 days of reports; every legitimate source accounted for | Remain at `p=none` |
| 7. Outreach approval | Fresh exact headquarters approval for named prospects/channel | Do not send |

## Two-way owner test

Use owner-controlled Gmail and Outlook mailboxes. Start with plain text and no links or attachments.

For each received test, capture the original headers privately and require:

- `spf=pass`;
- `dkim=pass`;
- DKIM `header.d=thespstudios.com`;
- `dmarc=pass`;
- `header.from=thespstudios.com`;
- a valid Message-ID;
- correct display name, From, and Reply-To;
- inbox placement rather than spam.

Test sequence:

1. Send one owner-controlled test from `contact@` to Gmail and one to Outlook.
2. Reply from both external accounts and confirm both reach `contact@`.
3. Start new inbound messages from both accounts and reply from `contact@`.
4. Submit one project enquiry using an owner-controlled address.
5. Confirm the enquiry reaches its existing private destination.
6. Confirm any form notification uses an authenticated From identity and a safe Reply-To.
7. Recheck root/`www` HTTPS, sitemap/robots, and search-verification state.

Test subject:

```text
SP Studios mailbox verification — OWNER TEST
```

No message may be labelled delivered solely because no bounce arrived. Record `sent / no DSN` unless receipt is independently verified.

## Controlled first-contact rule

Email is one possible channel, never a duplicate channel. Before drafting, check that the same business has not already been contacted through Instagram, LinkedIn, WhatsApp, phone, a form, or another email address.

Qualification evidence required before first contact:

- a real business and current trigger;
- a weak, fragmented, social-only, aggregator-led, or absent owned website journey;
- a reachable decision-maker or credible routing contact;
- one customer action a website can materially improve;
- no strong incumbent-owned journey that removes the need;
- no invented client, outcome, urgency, result, or relationship.

First contact must contain one specific business observation and ask permission for the smallest useful next step. It must not contain a free redesign, generic audit, attachment, proposal, meeting link, price, or multi-channel follow-up.

Approval-ready template:

```text
Subject: A question about [specific customer journey]

Hi [First name],

I was looking at [specific public page/channel] because [true business trigger].
I noticed [one factual observation tied to a customer action].

I run SP Studios and personally handle website direction, original design,
development and launch. Would it be useful if I sent two short questions
to understand whether [specific outcome] is a current priority?

Best,
Sohan Vyaparee
SP Studios
https://thespstudios.com

If this is not relevant, tell me and I will close the loop.
```

Do not use the template until every bracket is replaced with verified evidence.

## One-at-a-time operating ceiling

These are internal safety ceilings, not provider limits or an instruction to send.

| Phase after successful owner test | New first contacts |
|---|---:|
| Days 1–7 | maximum 3/day |
| Days 8–14 | maximum 5/day |
| Days 15–28 | maximum 8/day |
| Steady state | maximum 10/day and 50/week |

Additional controls:

- at least 30 minutes between new first contacts;
- one active prospect per company/domain in seven days;
- one initial email and at most one approved follow-up after 5–7 business days;
- no BCC, mail merge, bought list, tracking pixel, hidden image, link shortener, or attachment;
- record opt-out immediately;
- pause on any complaint, authentication failure, provider warning, `5.7.x` policy rejection, or first hard bounce during the initial 20 prospects.

## Private tracking states

Keep separately:

- researched business;
- channel checked;
- draft prepared;
- approved to send;
- sent / no DSN;
- verified reply;
- qualified lead;
- scopeable opportunity;
- proposal issued;
- accepted SOW/agreement;
- captured milestone;
- settled money.

Never collapse these states into “lead”, “client”, “pipeline revenue”, or “revenue”.

Bounce/reply actions:

| Evidence | Action |
|---|---|
| `4.x.x` temporary failure | let provider retry; do not duplicate |
| `5.1.1` invalid mailbox | permanently suppress address |
| `5.7.x` authentication/policy | pause all new contact and investigate |
| opt-out/not interested | suppress immediately |
| out of office/not now | date-specific hold; no automatic sequence |
| positive question | personal reply in the same thread |
| complaint | suppress and pause the lane |

## External dependencies

Unresolved outside this artifact:

1. active mailbox provider and entitlement;
2. exact authoritative DNS zone and current mail records;
3. mailbox creation/type and MFA state;
4. provider-generated MX/SPF/DKIM/verification values;
5. website-form sending identity;
6. approved DMARC report destination;
7. owner-performed DNS change and two-way tests;
8. fresh approval for any named outreach.

## Exactly what was not done

No login, mailbox creation, provider activation, DNS edit, email send, form submission, credential entry, purchase, public deployment, payment action, repository code change, lead claim, client claim, or revenue claim was performed.

## Smallest headquarters decision

**HQ-EMAIL-01:** Does an active custom-domain-mail entitlement already exist for `thespstudios.com`?

Return exactly one of:

- `EXISTING — provider: [name]`
- `NONE — provider selection required`

Do not purchase, configure, or change DNS as part of that answer.

---

## 31 August 2026 UTC evidence recheck

This section supersedes only the earlier preparation snapshot. It does not change the activation status.

| Check | Exact evidence | Result |
|---|---|---|
| Repository baseline | Branch `rebrand/sp-studios-domain-preview` was read at `c909a4afcacaa58d06062b679e0a01ea7ca95bb1` immediately before this update | Verified |
| Sender runbook | Existing file blob `dde21a1a99d7fde063650f975f5f6a9ad23e9ee8` was fetched before replacement | Verified |
| Public website | A fresh public crawl returned the SP Studios website at `https://www.thespstudios.com/` | Reachable |
| Public DNS resolver | Google Public DNS JSON queries for NS, MX, root TXT, `_dmarc`, A, AAAA, and `www` CNAME were attempted; the read-only browser rejected the query URLs before returning answers | **No DNS answer captured** |
| Google Admin Toolbox | Dig pages for MX, TXT, DMARC, and NS loaded, but their JavaScript-generated answers were not present in the captured response | **No DNS answer captured** |
| Provider identity | No provider account screen, entitlement, MX answer, or provider-generated record set was supplied | **Unresolved — do not infer** |
| Mailbox existence | No owner sign-in, provider screen, header, or two-way receipt evidence was supplied | **Unverified** |
| SPF/DKIM/DMARC | No current authoritative answers or received-message headers were captured | **Unverified** |

A blocked resolver interface is not a negative DNS result. Do not write “no MX,” “no SPF,” or “no DMARC” from this recheck.

Activation remains blocked at Gate 0 (provider entitlement) and Gate 1 (authoritative-zone baseline).

## Exact owner-run activation sequence

Each step is a stop gate. The owner performs provider and DNS actions only after separate headquarters authorization. Record timestamps in UTC.

### A. Establish the immutable baseline

1. Record the branch/document commit used for this runbook.
2. In the active DNS host, export the complete zone without editing it.
3. Identify the active DNS host from the domain's authoritative NS response—not from the registrar receipt or website platform.
4. Save the provider account page showing the custom-domain-mail entitlement and the exact mailbox product.
5. Record whether `contact@thespstudios.com` is a full licensed mailbox, shared mailbox, alias, or forwarder.
6. Inventory every legitimate sender that can use `@thespstudios.com`. Mailbox activation does not authorize the website, CRM, invoicing, booking, or payment systems to send.

Owner terminal evidence commands:

```sh
dig +noall +answer NS thespstudios.com
dig +noall +answer SOA thespstudios.com
dig +noall +answer MX thespstudios.com
dig +noall +answer TXT thespstudios.com
dig +noall +answer TXT _dmarc.thespstudios.com
dig +noall +answer A thespstudios.com
dig +noall +answer AAAA thespstudios.com
dig +noall +answer CAA thespstudios.com
dig +noall +answer CNAME www.thespstudios.com
```

Repeat the relevant queries against one authoritative nameserver and two independent public resolvers. Preserve the raw output; do not paste credentials, cookies, recovery codes, or full private emails into the repository.

**Pass:** complete zone export, raw answers, provider entitlement, mailbox type, and sending-source inventory are present.

**Fail:** stop. Do not create or change any DNS record.

### B. Build the exact change manifest

1. Open the authenticated provider's custom-domain setup wizard.
2. Copy its current record table exactly: owner, type, priority, TTL, target/value, and purpose.
3. Link the matching official provider documentation.
4. Diff those rows against the full DNS baseline.
5. Mark each proposed operation as additive, edit-one-RR, or migration.
6. Put the exact prior RRset in the rollback column.
7. If an MX RRset already exists, classify this as a migration. Confirm the existing receiving service, mailbox export/retention needs, cutover order, and rollback before touching MX.
8. For SPF, produce one final root TXT string. Never add a second `v=spf1` record and never replace unrelated root TXT records.
9. Generate DKIM inside this exact provider/account. Record the selector and exact TXT/CNAME target; never use an example selector.
10. Leave DMARC at its existing valid policy until SPF and DKIM alignment are proven. If no DMARC record is authoritatively confirmed, the first proposed policy is the Stage 1 value already defined above, with a verified aggregate-report destination.

**Pass:** every value comes from the active account/provider wizard, the rollback is complete, and unrelated site/search records have a zero-change diff.

**Fail:** stop and return the manifest for correction.

### C. Prepare the mailbox before mail routing

1. Create or confirm the provider mailbox only under separate authorization.
2. Set the display name to `Sohan Vyaparee — SP Studios`.
3. Enable MFA and verify recovery without recording secrets.
4. Confirm the provider shows `contact@thespstudios.com` as capable of both authenticated sending and receiving; an alias or forwarder alone does not satisfy this gate.
5. Keep the mailbox empty of imported contacts and automated sequences.
6. Do not change MX until the receiving mailbox is ready.

### D. Apply the approved mail-only DNS diff

1. Re-export the zone immediately before the change.
2. Apply only the approved provider-verification, MX, SPF, and DKIM rows.
3. Preserve NS, SOA, root/website A and AAAA, `www`, CAA, search verification, hosting verification, and every unrelated TXT record.
4. Do not change nameservers.
5. Enable DKIM in the provider only when its exact DNS record resolves.
6. Capture the post-change RRsets from the authoritative nameserver and two public resolvers.
7. Reopen the public root and `www` HTTPS pages. A website failure triggers rollback of the exact changed RRset and a stop.

### E. Validate authentication before any owner test

Required public evidence:

- exactly one SPF policy at the root;
- provider source authorized by that SPF policy;
- the provider's exact DKIM selector resolves;
- provider reports DKIM signing enabled;
- DMARC has exactly one syntactically valid record at `_dmarc`;
- no unapproved source was added;
- no DNS-triggering SPF lookup overflow.

Do not claim alignment from DNS alone. Alignment is proven from a received message's headers.

### F. Run the owner-only test worksheet

Use one owner-controlled Gmail mailbox and one owner-controlled Outlook mailbox. No prospect address, tracking pixel, attachment, URL shortener, signature image, BCC, CC, or mailing tool is allowed.

| ID | Owner action | Exact subject | Required receipt evidence |
|---|---|---|---|
| T01 | `contact@` → owner Gmail | `SP Studios sender test T01` | Gmail receives once; inbox/spam location recorded; full original headers saved |
| T02 | Gmail replies in the same thread | keep T01 subject | Reply reaches `contact@` once; time and folder recorded |
| T03 | owner Gmail → `contact@`, then `contact@` replies | `SP Studios inbound test T03` | Both legs independently visible |
| T04 | `contact@` → owner Outlook | `SP Studios sender test T04` | Outlook receives once; inbox/junk location recorded; full headers saved |
| T05 | Outlook replies in the same thread | keep T04 subject | Reply reaches `contact@` once; time and folder recorded |
| T06 | owner Outlook → `contact@`, then `contact@` replies | `SP Studios inbound test T06` | Both legs independently visible |
| T07 | reply from `contact@` to both services after 24 hours | `SP Studios sender test T07` | No duplicate delivery; placement and latency recorded |

Exact outbound body for T01/T04:

```text
Hello,

This is an owner-controlled delivery test for contact@thespstudios.com.
No response or action is requested beyond replying with: RECEIVED.

Sohan Vyaparee
SP Studios
```

Exact inbound body for T03/T06:

```text
OWNER TEST: Please reply with the word CONFIRMED.
```

For T01 and T04, privately record these parsed fields from the received original:

```text
Test ID:
UTC sent:
UTC received:
Mailbox provider:
Folder: Inbox | Spam/Junk | Other
From:
Return-Path:
Reply-To:
Message-ID:
Authentication-Results SPF:
Authentication-Results DKIM:
DKIM header.d:
DKIM selector s:
Authentication-Results DMARC:
DMARC header.from:
TLS shown by receiver: Yes | No | Unknown
Reply received at contact@: Yes | No
Unexpected duplicate: Yes | No
Redacted evidence location:
```

**Pass criteria:**

- all seven tests complete without a hard bounce or duplicate;
- Gmail and Outlook each receive outbound mail and deliver a reply back;
- new inbound messages reach `contact@`, and its replies return;
- `spf=pass`;
- `dkim=pass` with `header.d=thespstudios.com` or an aligned subdomain;
- `dmarc=pass` with visible From domain `thespstudios.com`;
- display name, From, Reply-To, Return-Path behavior, and Message-ID are expected;
- no provider warning or policy rejection occurs.

**Fail criteria:** any `5.7.x`, hard bounce, missing inbound leg, SPF/DKIM/DMARC failure, unaligned DKIM domain, duplicate, provider warning, or unexplained junk placement. Stop new sending, preserve the evidence, and correct only the proven mail-record/account cause.

“No bounce” alone is never a pass.

### G. Close the activation gate

1. Keep DMARC at monitoring until at least 30 days of aggregate evidence accounts for all legitimate sources.
2. Record the owner-test result as `PASS` or `FAIL`; never “probably working.”
3. Mark the mailbox `OWNER-TESTED` only after every pass criterion is met.
4. Keep prospect outreach blocked until headquarters grants fresh approval for named prospects and the email channel.
5. The first live non-owner message remains subject to the existing one-at-a-time ceiling and stop rules.

## Send-ready status

Current status: **BLOCKED — do not send**

Missing evidence:

- provider name and active entitlement;
- current authoritative DNS answers and full zone export;
- exact provider-generated MX/SPF/DKIM values;
- mailbox type/readiness and MFA confirmation;
- verified DMARC aggregate-report destination;
- completed owner-only T01–T07 worksheet.

The runbook becomes executable without rewriting when those fields are supplied. It deliberately provides no guessed DNS value.
