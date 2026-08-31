# SP Studios Search Console approval runbook

Last prepared: 1 September 2026
Owner lane: search discovery and indexing operations
Authority: [SP_STUDIOS_HQ_CONTEXT.md](./SP_STUDIOS_HQ_CONTEXT.md)
Working branch: `rebrand/sp-studios-domain-preview`
Pinned headquarters context reviewed at: `e544fad195c0dd5335a7dffc641227de3fd71a30`

## Purpose

This is the single approval and evidence-capture runbook for Google Search Console setup, sitemap discovery, canonical verification and priority-page recrawling for SP Studios.

It does not replace the existing website positioning, service pages, buyer journey, proof labels, analytics, payment safeguards or delivery work. It does not authorize publishing, deployment, DNS changes, public profile edits, outreach, spending or claims of clients, leads or revenue.

The search objective is narrow:

> Help buyers discover SP Studios as a founder-led studio for complete business websites—from direction and original design through development, integrations and launch—without attracting job, internship, coding-ticket or cheap-template intent.

## Preserved verified work

Do not reopen these decisions in this lane:

- SP Studios is a founder-led website strategy, design and development studio.
- The main promise is complete business websites from direction through launch.
- Public work remains labelled as live founder-built work, a self-initiated business system or a speculative concept.
- Focused Launch begins at USD 1,500 only for a narrow ready scope.
- Complete Business Website begins at USD 3,000.
- Signature Experience + Integration begins at USD 5,000.
- International Launch System begins at USD 6,500.
- There are currently zero verified SP Studios clients and zero verified SP Studios client payments in the headquarters evidence boundary.
- Search impressions, clicks and indexed URLs must never be reported as leads, clients, pipeline revenue or settled money.

## Current external evidence

Observed during a read-only audit on 31 August 2026:

1. The live homepage and main service pages were publicly crawlable and returned substantial rendered text.
2. The homepage search result still displayed an animation-era title even though the live page presented complete business websites.
3. Exact searches for several service and case-study URLs surfaced the homepage but did not surface the requested deeper page.
4. The LinkedIn company description still presented SP Studios as an animation/CGI studio.
5. Current external job/profile results could attract internship and employment intent.
6. A search result using Sohan Vyaparee's name was localized to Delhi, while the BongFoods case study identifies its own market as Nagpur. Neither fact establishes the studio's headquarters or Google Business Profile eligibility.

Evidence URLs:

- <https://www.thespstudios.com/>
- <https://www.thespstudios.com/services/complete-website-launch>
- <https://www.thespstudios.com/services/b2b-lead-generation-websites>
- <https://www.thespstudios.com/services/d2c-commerce-launch>
- <https://www.thespstudios.com/work>
- <https://www.linkedin.com/company/sp-studios7>
- <https://bebee.com/in/companies/sp-studios>

The available audit browser could not independently validate the contents of `/robots.txt`, `/sitemap.xml`, canonical elements or JSON-LD. Those items remain verification dependencies, not confirmed defects.

## Canonical candidate and priority inventory

The observed public pages resolve to the `www` host. Treat `https://www.thespstudios.com/` as the canonical candidate until source inspection and Search Console confirm the declared and Google-selected canonicals.

Priority commercial URLs:

1. `https://www.thespstudios.com/`
2. `https://www.thespstudios.com/services/complete-website-launch`
3. `https://www.thespstudios.com/services/b2b-lead-generation-websites`
4. `https://www.thespstudios.com/services/d2c-commerce-launch`
5. `https://www.thespstudios.com/work`
6. `https://www.thespstudios.com/work/bongfoods`
7. `https://www.thespstudios.com/work/studio-system`
8. `https://www.thespstudios.com/work/private-market-concept`
9. `https://www.thespstudios.com/trust`
10. `https://www.thespstudios.com/partners`

A future founder/entity page belongs in this inventory only after another owner publishes it and confirms its canonical URL. This lane must not create a duplicate About or founder page.

## Gate 0 — preflight evidence

No Search Console action should be approved until an owner records:

- `https://www.thespstudios.com/robots.txt`: HTTP status and complete text.
- `https://www.thespstudios.com/sitemap.xml`: HTTP status and complete canonical URL inventory.
- Homepage source: title, meta description, robots meta, canonical and JSON-LD.
- Each priority URL: final URL after redirects, HTTP status, title, one H1, robots meta and canonical.
- HTTP/non-www/trailing-slash behavior for at least the homepage and one service page.
- Whether Google Analytics or Google Tag Manager is already present and controlled by the same Google account intended for Search Console.

Pass conditions:

- Priority pages return HTTP 200.
- Public priority pages are not blocked and do not contain `noindex`.
- One canonical host is used consistently.
- Each indexable priority page has an absolute self-canonical.
- Sitemap URLs are absolute, canonical and indexable.
- Private owner, submission-result, preview and payment-review routes are absent from the sitemap.
- Private data is protected by access control, not robots.txt alone.

If a condition fails, send the exact evidence to the existing technical discovery owner. Do not repair metadata, canonical, routing, schema or payment code from this runbook lane.

## Gate 1 — property approval

Requested headquarters approval:

- Property type: **URL-prefix**
- Exact property: `https://www.thespstudios.com/`
- Reason: covers the observed canonical candidate without requiring a DNS change.
- Preferred verification: an existing authorized Google Analytics or Google Tag Manager installation.
- Fallback verification: an HTML verification tag in a separately approved website deployment.
- Not approved by this runbook: Domain property, DNS TXT record, new analytics property, tag deployment or access invitation.

Evidence to retain:

- Property type and exact URL.
- Verification method.
- Google account or workspace owner, without recording credentials.
- Verification timestamp in UTC.
- Screenshot or exported confirmation stored in the headquarters evidence location.

## Gate 2 — sitemap approval

Only after Gate 0 and Gate 1 pass:

1. Open **Search Console → Sitemaps**.
2. In **Add a new sitemap**, enter `sitemap.xml`.
3. Submit once.
4. Record status, submitted timestamp, last-read timestamp and discovered URL count.
5. Export or capture any fetch error exactly; do not repeatedly submit an unchanged failing sitemap.

Pass condition:

- Status is `Success`.
- The discovered count is explainable from the canonical inventory.
- No private, preview, parameter, payment-review or submission-result URL is discovered from the sitemap.

## Gate 3 — URL Inspection evidence

After an approved production deployment affecting search signals, inspect these first:

1. Homepage
2. Complete Website service
3. B2B service
4. D2C service
5. Work index
6. Studio System case study

For each URL:

1. Inspect the indexed URL.
2. Record whether the URL is on Google.
3. Record the last crawl and referring discovery source when available.
4. Record user-declared canonical.
5. Record Google-selected canonical.
6. Click **Test Live URL**.
7. Confirm crawl allowed, indexing allowed and HTTP 200.
8. Inspect rendered HTML/screenshot for the current H1 and buyer-facing copy.
9. Record detected structured data and exact errors or warnings.

Pass condition:

- Live test succeeds.
- Declared and selected canonicals match the intended exact URL.
- Current buyer-facing content is present in Google's render.
- No animation-era title, Careers navigation or job-focused main content exists in the live render.

## Gate 4 — recrawl approval

After Gate 3 passes, request indexing once for:

1. Homepage
2. Complete Website service
3. B2B service
4. D2C service
5. Work index
6. Studio System case study

Rules:

- Do not request indexing before the approved change is live.
- Do not repeatedly resubmit unchanged URLs.
- Let the sitemap and internal links handle lower-priority pages.
- Do not use the Google Indexing API for normal service or case-study pages.
- Do not use the Removals tool to repair a stale title or snippet.
- A successful request means Google accepted a crawl request, not that the page is indexed or ranked.

Record each request timestamp and later indexed status.

## Gate 5 — query-quality baseline

In **Performance → Search results**, retain separate filters.

Brand regex:

`(?i)(sp studios|thespstudios|sohan vyaparee)`

Wrong-intent regex:

`(?i)(job|jobs|career|careers|intern|internship|hiring|salary|course|cheap|free|template|source code|hourly|coding task)`

Buyer-intent regex:

`(?i)(business website|complete website|website design|website redesign|b2b website|manufacturing website|d2c website|ecommerce website|website studio)`

Review dimensions:

- Query
- Page
- Country
- Device
- Search appearance
- Date comparison

Report search-layer measurements separately:

- discovered canonical URLs;
- indexed priority URLs;
- impressions;
- clicks;
- click-through rate;
- average position;
- buyer-intent query count;
- wrong-intent query count; and
- branded result freshness.

The authoritative owner desk remains the source for brief starts, stored enquiries, qualified leads, scopeable opportunities, proposals, agreements, captured milestones and settled money.

## Thirty-day operating sequence

### Days 1–3

- Complete Gate 0.
- Resolve the canonical host from source and redirect evidence.
- Identify the non-DNS verification method.
- Capture the pre-action search-result screenshot and exact stale title.

### Days 4–7

- Headquarters decides whether to approve Gate 1.
- If approved, create and verify only the exact URL-prefix property.
- Export the initial Page indexing, Manual actions and Security issues states.
- Submit the sitemap only after its direct preflight passes.

### Days 8–14

- Run URL Inspection.
- Route technical failures to the existing implementation owner.
- After an approved production fix, request priority recrawls once.
- Do not publish generic SEO articles during this gate.

### Days 15–21

- Recheck indexed status and titles.
- Record buyer-, brand- and wrong-intent queries.
- Prepare one content decision only if query evidence identifies a real buyer question not already answered by a service page.

### Days 22–30

- Compare indexed coverage and query quality with the baseline.
- Decide between one B2B buyer guide, one D2C launch guide or no new content.
- Do not create location pages until headquarters confirms the studio's truthful operating base and local-search eligibility.
- Do not create international city pages without verified demand or proof.

## Evidence record template

| UTC date | URL/report | Indexed status | Live test | Declared canonical | Selected canonical | Search title | Exact issue/action | Owner |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

## Unresolved external dependencies

1. Search Console property ownership and approved Google account.
2. Existing Google Analytics/Tag Manager presence and access.
3. Direct HTTP/source evidence for robots, sitemap, canonical and JSON-LD.
4. Approved production deployment if a verification tag or technical correction is needed.
5. Google's recrawl and canonical selection timing.
6. Current authoritative owner-desk acquisition numbers.
7. Headquarters confirmation of the studio's actual operating base and whether it meets clients in person.
8. Ownership/control of LinkedIn, BeBee, OLX and other external profiles; this runbook does not edit them.

## Explicit non-actions

This artifact did not:

- create or verify a Search Console property;
- submit a sitemap or URL;
- request indexing;
- use the Indexing API;
- modify DNS;
- edit metadata, canonicals, schema, robots or sitemap code;
- publish or deploy the website;
- edit an external profile;
- send outreach;
- create a Google Business Profile;
- activate payments or providers;
- spend money; or
- report a search visit, click or enquiry as a client or revenue.

## Smallest headquarters decision

Approve or decline this exact first external action:

> Create the URL-prefix Search Console property `https://www.thespstudios.com/` using an existing authorized Google Analytics/Tag Manager verification method, with no DNS change and no sitemap or URL submission until Gate 0 evidence passes.
