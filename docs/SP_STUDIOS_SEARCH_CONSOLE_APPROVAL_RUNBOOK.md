# SP Studios Google presence approval runbook

Last prepared: 31 August 2026 UTC  
Owner lane: Google Search Console and Google Business Profile presence only  
Authority: [SP_STUDIOS_HQ_CONTEXT.md](./SP_STUDIOS_HQ_CONTEXT.md)  
Repository evidence checkpoint: c909a4afcacaa58d06062b679e0a01ea7ca95bb1  
Pinned headquarters context reviewed at: e544fad195c0dd5335a7dffc641227de3fd71a30

## Purpose

This is the single approval sequence for:

1. Search Console Domain property ownership;
2. one controlled sitemap submission;
3. truthful SP Studios entity information in Google Search; and
4. the separate stop/go gate for any Google Business Profile.

It preserves the existing website, proof labels, SEO implementation, payment safeguards and other worker lanes. It authorizes no account, DNS, website, profile or public change.

## Current determination

### Search Console

Preparation is technically ready, but no ownership or submission action is authorized.

Repository evidence at the checkpoint:

- app/site.ts sets the public fallback origin to https://www.thespstudios.com.
- app/sitemap.ts generates https://www.thespstudios.com/sitemap.xml with 14 public URLs.
- app/robots.ts declares that sitemap and disallows /leads, /api/, /pay and /payments.
- app/layout.tsx declares index/follow, a www canonical base, current website-studio metadata and a Google verification meta token.
- app/layout.tsx emits a ProfessionalService JSON-LD entity for SP Studios and a Person entity for Sohan Vyaparee.

Important boundary:

- The existing meta token can support a URL-prefix verification method.
- It does not verify a Domain property.
- A Search Console Domain property for thespstudios.com requires an approved DNS verification method.
- No account state, DNS state or live Search Console verification state was inspected.

### Sitemap

Source readiness is established; live readiness is not yet established.

The generated inventory contains exactly these 14 URL candidates:

1. https://www.thespstudios.com
2. https://www.thespstudios.com/services/complete-website-launch
3. https://www.thespstudios.com/services/d2c-commerce-launch
4. https://www.thespstudios.com/services/b2b-lead-generation-websites
5. https://www.thespstudios.com/partners
6. https://www.thespstudios.com/work
7. https://www.thespstudios.com/work/bongfoods
8. https://www.thespstudios.com/work/studio-system
9. https://www.thespstudios.com/work/private-market-concept
10. https://www.thespstudios.com/privacy
11. https://www.thespstudios.com/trust
12. https://www.thespstudios.com/terms
13. https://www.thespstudios.com/refund-cancellation
14. https://www.thespstudios.com/delivery-fulfilment

No owner, API, lead, payment-review or submission-result route appears in source inventory.

### Truthful studio entity

The public identity must remain:

- name: SP Studios;
- founder: Sohan Vyaparee;
- positioning: founder-led website strategy, design and development studio;
- promise: complete business websites from direction and original design through development, integrations and launch;
- proof boundary: live founder-built work, self-initiated business system or speculative concept;
- verified SP Studios clients at the headquarters checkpoint: zero;
- verified SP Studios client payments at the headquarters checkpoint: zero.

No address, phone, staff size, client result, award, headquarters city or local service territory is established by headquarters evidence.

The current ProfessionalService type is a local-business-oriented schema choice. It must not be treated as evidence of Google Business Profile eligibility or a public storefront. If in-person/local operation remains unverified, the technical entity owner should approve changing the top-level type to Organization and preserving the founder Person node. This runbook does not make that code change.

## Official Google rules used

- A Domain property is defined without protocol or path and can include all protocol and subdomain variants.  
  <https://support.google.com/webmasters/answer/10431861>

- Domain properties are verified through DNS. The verification record should remain in DNS after verification to preserve ownership.  
  <https://support.google.com/webmasters/answer/9008080>

- A sitemap should contain fully qualified canonical URLs. Submission is a discovery hint, not an indexing guarantee. Search Console's Sitemaps report records access and processing errors.  
  <https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>

- Organization markup can help Google understand and disambiguate an entity. Properties should be relevant, truthful and represented by visible page content; no property is required merely to fill the schema.  
  <https://developers.google.com/search/docs/appearance/structured-data/organization>  
  <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>

- A Google Business Profile requires in-person customer contact during stated hours. Online-only businesses are ineligible.  
  <https://support.google.com/business/answer/13763036>

## Exact approval sequence

Every numbered gate needs separate recorded approval. Approval of one gate does not imply approval of the next.

### Gate 0 — designate the Google owner

Headquarters decision:

- nominate one SP Studios-controlled Google Account as primary Search Console owner;
- confirm two-step verification is enabled;
- decide whether Sohan alone remains owner or whether one named backup owner is needed;
- never record a password, recovery code or one-time code in the repository.

Evidence to capture:

| Evidence | Required record |
|---|---|
| Account custodian | Sohan or approved named custodian |
| Account identifier | Masked email or internal owner reference |
| Security | 2-step verification confirmed, with no secret captured |
| Scope | Search Console Domain property only |
| UTC approval | Approver and timestamp |

Stop condition: no approved owner account.

### Gate 1 — approve the Domain property

Exact proposed property:

> thespstudios.com

Property type:

> Domain

Coverage:

- http and https;
- root and www;
- present and future subdomains under thespstudios.com.

Evidence to capture before creation:

- screenshot or written record showing Domain property type;
- exact property string thespstudios.com;
- approved owner account reference;
- confirmation that no URL path or protocol was entered;
- UTC approval record.

Do not add the property until headquarters explicitly approves Gate 1.

### Gate 2 — obtain, review and approve the DNS proof

After Gate 1 approval, Search Console will supply the exact verification record or an approved provider flow.

Preferred controlled method:

- record type: TXT;
- host/name: root value required by the authoritative DNS provider, commonly @ or blank;
- value: the exact Google-provided google-site-verification string;
- TTL: provider default unless the DNS owner approves a different value.

Before any DNS change, capture:

- authoritative DNS provider and zone owner;
- existing TXT records at the root;
- the proposed new TXT record exactly;
- a fingerprint of the verification value in the approval log rather than credentials;
- confirmation that A, AAAA, CNAME, MX, NS, SPF, DKIM and DMARC records will not be edited;
- rollback instruction: remove only the newly added Google verification TXT if headquarters later revokes it.

Important:

- adding another TXT record must not replace existing TXT records;
- the Google token is not a password, but it is still a provider-issued ownership proof and should not be pasted into general discussion;
- no worker may make this DNS change without exact approval.

Small approval statement:

> Approve adding only the Search Console TXT record generated for the Domain property thespstudios.com, with no other DNS edits.

### Gate 3 — verify DNS propagation, then ownership

After the DNS owner confirms the approved record was added:

1. Query authoritative/public DNS for TXT records on thespstudios.com.
2. Confirm the full Google value is present exactly once.
3. Record resolver, UTC time, observed TTL and verification-value fingerprint.
4. In Search Console, click Verify once.
5. If verification fails, retain the record and wait for propagation; do not repeatedly replace it or delete unrelated TXT records.
6. On success, leave the verification TXT in place.
7. Inspect the Search Console owner list and confirm only approved owners/users.

Pass evidence:

| Evidence | Pass condition |
|---|---|
| Public DNS lookup | Exact Google TXT visible |
| Search Console status | Ownership verified |
| Property | thespstudios.com, type Domain |
| Owner list | Only approved accounts |
| Security reports | Initial Manual actions and Security issues states exported or captured |
| Timestamp | UTC verification time |
| Retention | DNS verification record retained |

Verification is ownership evidence, not evidence of ranking, indexing, customers or revenue.

### Gate 4 — live sitemap preflight

This gate must pass immediately before submission even though source code is ready.

For https://www.thespstudios.com/robots.txt capture:

- final URL after redirects;
- HTTP status 200;
- complete response text;
- the exact Sitemap line;
- disallow rules for private/API/payment paths.

For https://www.thespstudios.com/sitemap.xml capture:

- final URL after redirects;
- HTTP status 200;
- XML content type or valid XML response;
- complete URL inventory;
- URL count;
- host consistency;
- absence of private routes.

For every one of the 14 sitemap URLs capture:

- final URL;
- HTTP status;
- indexability;
- declared canonical;
- whether the URL is meaningfully public and linked.

Pass conditions:

- sitemap endpoint returns valid XML;
- exactly 14 source-expected URLs are present, unless an approved deployment has deliberately changed the inventory;
- all entries are absolute https://www.thespstudios.com URLs;
- entries are canonical and return 200;
- no URL is noindex;
- /leads, /api, /pay, /payments and other private/result routes are absent;
- canonical host and sitemap host agree.

If the count differs, record the exact difference and route it to the technical discovery owner. Do not submit first and investigate later.

Google ignores sitemap priority and changeFrequency values, so their presence is not a submission blocker.

### Gate 5 — approve and submit the sitemap once

Exact proposed submission:

> https://www.thespstudios.com/sitemap.xml

Only after Gates 1–4 pass:

1. Select the verified Domain property thespstudios.com.
2. Open Indexing → Sitemaps.
3. Enter the full sitemap URL.
4. Confirm the host is www.thespstudios.com.
5. Submit once.
6. Record the immediate UI response without translating Pending into Success.
7. When processed, capture status, last-read time and discovered URL count.

Pass evidence:

| Field | Required value |
|---|---|
| Property | thespstudios.com |
| Submitted sitemap | https://www.thespstudios.com/sitemap.xml |
| Submission count | One |
| Status | Success |
| Discovered URLs | Expected 14 or an explained approved count |
| Last read | Google-reported UTC/date evidence |
| Errors | None, or exact exported error routed to owner |

Do not repeatedly resubmit an unchanged failing sitemap. A successful sitemap status means Google processed the sitemap; it does not mean every page is indexed.

### Gate 6 — establish the truthful Search entity

Before asking Google to recrawl the homepage, headquarters approves one entity record:

| Field | Approved truthful value |
|---|---|
| Public name | SP Studios |
| Alternate name | SP Studios by Sohan Vyaparee |
| Canonical URL | https://www.thespstudios.com |
| Founder | Sohan Vyaparee |
| Description | Founder-led website strategy, original design, responsive development, integrations and launch |
| Proof status | No invented client, revenue or outcome claims |
| Address | Omit unless separately approved for public use |
| Phone | Omit unless a dedicated public business number is approved |
| Employee count | Omit |
| Founding date | Omit until evidenced |
| Logo | Add only an approved crawlable logo of at least 112×112 |
| Social sameAs | Only owner-controlled profiles whose current public identity matches SP Studios |
| Reviews/ratings | Omit while there are no verified clients/reviews |

Current evidence review required before pass:

1. Decide whether the studio is actually local/in-person.
2. If NO or UNKNOWN, approve Organization as the top-level schema type rather than ProfessionalService.
3. Keep Sohan's Person node separate and linked as founder.
4. Do not add address, telephone, headquarters city or LocalBusiness fields.
5. Review every sameAs URL. The existing runbook observed the studio LinkedIn page still presenting an animation/CGI identity; either the external-profile owner corrects it or the technical entity owner omits it from sameAs.
6. Keep self-initiated and speculative work truth labels visible.
7. Validate that rendered JSON-LD matches visible homepage content.
8. Use URL Inspection after an approved production deployment to confirm Google's rendered HTML contains the approved entity record.

Structured data can help disambiguation but does not guarantee a knowledge panel, logo, ranking or other Search appearance.

### Gate 7 — Google Business Profile stop/go decision

Search Console Domain verification does not make SP Studios eligible for a Business Profile.

Headquarters must answer:

> Does SP Studios currently make genuine in-person contact with customers during stated hours, including visiting clients at their premises?

If NO or UNKNOWN:

- do not create or claim a Business Profile;
- do not add a Maps pin;
- do not invent service areas;
- maintain only the Search Console and website entity presence.

If YES, capture before any profile action:

- exact in-person service offered;
- normal customer-facing hours;
- private real operating base;
- evidence tying SP Studios to that base;
- cities/postcodes genuinely reachable, generally within two hours;
- exact public name SP Studios;
- proposed primary category Website designer, subject to live availability;
- public website;
- dedicated public business phone decision, if any;
- confirmation that the address will be hidden;
- one-profile-only confirmation;
- verification evidence plan.

Then seek a separate exact approval to create one hidden-address service-area profile. Do not submit verification under this runbook.

## Post-verification Search Console evidence

After Domain ownership and sitemap success, collect a baseline without changing anything:

- Page indexing summary;
- HTTPS report;
- Manual actions;
- Security issues;
- sitemap status and discovered count;
- URL Inspection for homepage, complete website service and work index;
- user-declared and Google-selected canonicals;
- detected rendered structured data;
- branded query baseline when data becomes available.

Report separately:

- verified property;
- submitted/processed sitemap;
- discovered URLs;
- indexed URLs;
- impressions;
- clicks;
- click-through rate;
- average position.

Never translate those metrics into leads, clients, proposals, captured milestones or settled money.

## Evidence record

| Gate | UTC date | Approver/operator | Exact action or observation | Evidence location | Result | Next owner |
|---|---|---|---|---|---|---|
| 0 | | | | | | |
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |

Do not store credentials, recovery codes, DNS-provider sessions, private addresses or private phone numbers in this record.

## Unresolved external dependencies

1. Approved SP Studios-controlled Google Account and custodian.
2. Headquarters approval for Domain rather than URL-prefix property.
3. Authoritative DNS provider ownership and exact change operator.
4. Google-generated DNS verification value.
5. Public DNS propagation.
6. Live robots.txt and sitemap.xml response capture.
7. Search Console verification and sitemap processing results.
8. Technical entity owner's decision on Organization versus ProfessionalService.
9. Owner review of every sameAs target.
10. Approved crawlable studio logo, if one is to be declared.
11. Headquarters answer on genuine in-person customer contact.
12. Fresh approval before any Search Console, DNS or Business Profile action.

## Explicit non-actions

This artifact did not:

- access or modify a Google Account;
- add or verify a Search Console property;
- generate or publish a DNS record;
- modify DNS;
- submit a sitemap;
- inspect private Search Console data;
- request indexing;
- edit or deploy website code;
- change structured data;
- create, claim or edit a Business Profile;
- submit Business Profile verification;
- add a Maps pin;
- expose a private address, phone or credential;
- request a review;
- send outreach;
- spend money;
- claim ranking, clients or revenue.

## Smallest headquarters decision

Approve or decline this exact first external sequence:

> Use one SP Studios-controlled Google Account to create the Search Console Domain property thespstudios.com, then pause and return the exact Google-generated DNS verification record for separate DNS-change approval. Do not change DNS, verify ownership or submit the sitemap under that first approval.
