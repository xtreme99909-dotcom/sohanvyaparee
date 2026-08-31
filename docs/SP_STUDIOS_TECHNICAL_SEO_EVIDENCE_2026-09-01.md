# SP Studios technical SEO and crawl/index evidence pack

Snapshot date: 1 September 2026  
Validated branch: `rebrand/sp-studios-domain-preview`  
Validated branch head before this artifact: `f540cc7eb71aed36f7986dd03de97ccc79717cc7`  
Authority: [SP_STUDIOS_HQ_CONTEXT.md](./SP_STUDIOS_HQ_CONTEXT.md)  
Related external-action lane: [SP_STUDIOS_SEARCH_CONSOLE_APPROVAL_RUNBOOK.md](./SP_STUDIOS_SEARCH_CONSOLE_APPROVAL_RUNBOOK.md)

## Scope

This artifact owns only:

- crawl permissions;
- index/noindex behavior;
- canonical origin and page canonicals;
- XML sitemap readiness;
- robots metadata-route readiness;
- HTML metadata rendering;
- structured-data technical accuracy;
- private-route search exclusion; and
- evidence required before Search Console indexing actions.

It does not own content strategy, service positioning, public profiles, outreach, local-business creation, Search Console property creation, URL submission, deployment, DNS, analytics, payments or revenue reporting.

## Branch validation

The branch was read directly after other workers advanced it. No earlier checkout or cached file was treated as current.

Current evidence blobs:

| File | Current blob |
|---|---|
| `app/site.ts` | `6bf010365844ef6bc402b5355418a636c3bf65a1` |
| `app/layout.tsx` | `845d68297e45c4311e83d44ba4f1d51b75792bf7` |
| `app/sitemap.ts` | `984c9eede68f30c5f4c1c7d4f9fd167276888477` |
| `app/robots.ts` | `e907877cd07713d7f637454b341b75bef06c0248` |
| `next.config.ts` | `b22af960af499f682e3f73236f8ae8a6bde38da1` |
| `app/leads/page.tsx` | `1d0c7b4beea99f699d2405c868813ff076663b14` |
| `app/revenue/page.tsx` | `b97cde1dce6378dd73a5061cda962d91ecd9441b` |
| Complete service page | `a8c1d81ef880b7673ae913c2255eb07bbc48d60d` |
| B2B service page | `55d1d91f56e42ad7675f799a3783005ce7c4f939` |
| D2C service page | `92f85a6a3d34bba028dc1ad6e7b0b2bb4e7112eb` |
| Work index | `f51a580abb2e86a5598c30b8db97f75acdaad818` |

The branch advanced during the audit through an unrelated contact-sender documentation commit. The current head was refreshed before writing this file; no shared code file was overwritten.

## Verified passes

### Public crawl intent

`app/layout.tsx` declares:

- `robots: { index: true, follow: true }`;
- a production fallback metadata base of `https://www.thespstudios.com`;
- a distinct current homepage title and description; and
- Google verification metadata.

The verification token proves only that a token is rendered in code. It does not prove the Search Console property is currently verified or controlled.

### Sitemap source exists

`app/sitemap.ts` exists and declares 14 public URLs:

- homepage;
- three commercial service pages;
- partners;
- work index;
- three case studies;
- privacy;
- trust;
- terms;
- refund/cancellation; and
- delivery/fulfilment.

No `/leads`, `/revenue`, API or payment-review URL is present in the sitemap source.

### Robots source exists

`app/robots.ts` exists, allows `/`, references the canonical sitemap path and blocks several non-public route patterns.

There is no competing `public/robots.txt`.

### Commercial canonicals are distinct

The current source contains page-specific canonicals for:

- `/`;
- `/services/complete-website-launch`;
- `/services/b2b-lead-generation-websites`;
- `/services/d2c-commerce-launch`;
- `/work`;
- `/work/bongfoods`;
- `/work/studio-system`;
- `/work/private-market-concept`;
- `/partners`;
- `/trust`; and
- all four public policy pages in the sitemap.

The main commercial pages do not currently canonicalize to the homepage.

### Private owner pages are protected in application code

Both `/leads` and `/revenue`:

- force dynamic rendering;
- require the owner ChatGPT identity before database access; and
- declare `robots: { index: false, follow: false }`.

The sitemap excludes both routes.

### Page metadata is differentiated

The three service pages, work index, case studies, partners and trust page have distinct titles and descriptions. The observed stale animation-era homepage search title is therefore not explained by current title source and remains a recrawl/index-state issue.

## Confirmed current blockers

### TSEO-01 — robots prevents Google from reading the /leads noindex rule

Severity: P1 technical contradiction  
Files:

- `app/robots.ts`
- `app/leads/page.tsx`

Current source:

- robots disallows `/leads`;
- the page itself returns an owner access gate and declares `noindex, nofollow`.

A crawler blocked by robots cannot fetch the HTML to read the page-level `noindex`. If the URL is discovered externally, it can remain known as a URL-only result even though the protected data itself is inaccessible.

The access control already protects the data. Search exclusion should be enforced by the page/header `noindex`, not by making that rule unreadable.

No-deploy remediation:

1. Remove `/leads` from the robots disallow list.
2. Retain the owner authorization gate.
3. Retain page-level `noindex, nofollow`.
4. Confirm the live response renders the robots meta for logged-out crawlers.
5. Apply the same rule to every private HTML route: access control plus readable `noindex`.

Do not remove access control. Robots is not a security boundary.

### TSEO-02 — root entity schema asserts an unverified local-business subtype

Severity: P1 entity/schema accuracy  
Files:

- `app/layout.tsx`;
- all three service pages; and
- `app/partners/page.tsx`.

Current root schema uses:

- `@type: ProfessionalService`;
- `@id: https://www.thespstudios.com/#studio`;
- `areaServed: India / Worldwide`; and
- no verified physical address or confirmed in-person service model.

The headquarters context does not currently establish Google local-business eligibility, a studio address or an in-person operating area. `ProfessionalService` is a LocalBusiness subtype and is stronger local-business semantics than the evidence supports.

No-deploy remediation:

1. Use `Organization` for the root SP Studios entity.
2. Use the stable ID `https://www.thespstudios.com/#organization`.
3. Change every Service `provider.@id` to the same Organization ID.
4. Keep `areaServed` only as truthful service coverage, not as evidence of offices.
5. Do not add `LocalBusiness`, address, telephone, opening hours or map properties until headquarters verifies them.
6. Add a separate `WebSite` node linked to the Organization.
7. Keep Sohan as a `Person` founder node linked from the Organization.

This changes machine semantics only; it does not rewrite the visible offer or another owner's positioning.

### TSEO-03 — sameAs links currently reinforce conflicting external identities

Severity: P1 external entity dependency with a code-side amplifier  
File: `app/layout.tsx`

The root entity emits `sameAs` links for LinkedIn, Instagram, personal LinkedIn, LinkedIn Services, Upwork and GitHub.

Current public search evidence showed at least the LinkedIn company entity describing SP Studios as an animation/CGI studio and job-related results attracting employment intent. A `sameAs` assertion tells crawlers these pages describe the same entity; it therefore reinforces the present contradiction.

No-deploy remediation options:

- Preferred: the external-profile owner aligns each profile first, then the technical owner retains verified matching URLs.
- Safe interim: omit any `sameAs` URL whose current public identity has not been checked against headquarters positioning.
- Never add a social URL merely because the handle looks similar.

External profile edits remain outside this lane.

### TSEO-04 — canonical origin depends on a mutable public environment variable

Severity: P2 configuration risk  
File: `app/site.ts`

Current source:

`(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thespstudios.com').replace(/\/$/, '')`

This value controls:

- metadataBase;
- canonical resolution;
- sitemap URLs;
- robots sitemap location; and
- JSON-LD IDs and URLs.

If production receives a preview, apex or alternate-host value, every canonical signal can change together and appear internally consistent while still identifying the wrong host.

No-deploy remediation:

1. Record the production value of `NEXT_PUBLIC_SITE_URL` without exposing secrets.
2. Require the exact value `https://www.thespstudios.com`.
3. Prefer an immutable production canonical constant unless preview builds have a proven need to emit a different origin.
4. Add a build/readiness assertion that rejects any canonical origin other than the approved production host for production builds.

### TSEO-05 — no application-level canonical-host redirect is defined

Severity: P2 runtime dependency  
Files:

- `next.config.ts` is empty;
- no root `middleware.ts` exists.

The repository does not enforce apex-to-www, HTTP-to-HTTPS or duplicate trailing-slash behavior at the application layer. The hosting platform may already enforce these redirects, but that behavior was not verifiable from repository source.

This is not yet a confirmed production defect. It is an exact unresolved runtime gate.

Required evidence:

| Request | Required production outcome |
|---|---|
| `http://thespstudios.com/` | One permanent redirect chain to `https://www.thespstudios.com/` |
| `https://thespstudios.com/` | Permanent redirect to the www URL |
| `http://www.thespstudios.com/` | Permanent redirect to HTTPS www |
| Non-www service URL | Permanent redirect to matching www service URL |
| Trailing-slash duplicate | One consistent policy with matching canonical |

Do not add application redirects until the platform behavior is recorded; duplicate redirects can create loops.

### TSEO-06 — root Offer markup presents starting contexts as exact Offers without the visible qualification boundary

Severity: P2 structured-data truth accuracy  
File: `app/layout.tsx`

The root `hasOfferCatalog` emits exact USD prices but does not include the qualification language present on the service pages. Headquarters defines these values as starting contexts, not automatic quotations.

No-deploy remediation:

- either remove the root OfferCatalog and keep commercial Offer markup on the relevant service pages; or
- add accurate descriptions stating that each amount is a starting context and final scope follows qualification.

Do not add INR prices from remembered exchange rates.

## Items that are not current blockers

Do not reopen these without new evidence:

- Missing sitemap source: false; `app/sitemap.ts` exists.
- Missing robots source: false; `app/robots.ts` exists.
- All service pages canonicalizing to home: false in current source.
- Public pages carrying `noindex`: false for the inspected commercial routes.
- Private dashboards exposed without authorization: false in the inspected page code.
- Duplicate service titles: false in the inspected metadata.
- Lack of `lastModified` in the sitemap: optional, not an indexing blocker.
- Meta keywords: ignored by Google but not a crawl blocker.
- FAQ schema not producing a rich result: not an indexing blocker and not guaranteed for this site type.
- Search result title differing from the HTML title: not by itself proof that the current metadata is wrong.

## No-deploy remediation bundle

A technical-only patch may change these files after approval:

1. `app/robots.ts`
   - stop blocking private HTML pages that already have authorization and readable `noindex`;
   - continue blocking API paths from ordinary crawling.

2. `app/layout.tsx`
   - replace the root `ProfessionalService` node with `Organization`;
   - use `#organization`;
   - add a linked `WebSite` node;
   - qualify or remove root Offer markup;
   - retain only externally verified `sameAs` URLs.

3. Service and partner pages
   - change provider IDs from `#studio` to `#organization`;
   - do not change visible service content.

4. `app/site.ts`
   - make the approved canonical origin production-stable or add a production assertion.

5. New `scripts/check-search-readiness.mjs`
   - assert canonical origin;
   - assert expected sitemap URLs are unique;
   - assert private routes are absent from the sitemap;
   - assert public routes have distinct canonicals;
   - assert private HTML routes have `noindex`;
   - fail if robots blocks an HTML route that relies on page-level `noindex`;
   - assert all Service providers reference the root Organization ID.

6. `package.json`
   - expose the check as `check:search-readiness`.

No deployment, Search Console action or external profile mutation belongs in this bundle.

## Required verification after a future patch

Local/build gate:

1. Install from the repository lockfile.
2. Run lint.
3. Run `check:search-readiness`.
4. Run the production build.
5. Start the production build locally.
6. Fetch `/robots.txt`, `/sitemap.xml`, homepage, services, work, `/leads` and `/revenue`.
7. Confirm metadata in returned HTML rather than source assumptions alone.

Production gate after separate deployment approval:

- verify redirect matrix;
- verify HTTP 200 for every sitemap URL;
- verify robots and sitemap bodies;
- verify self-canonicals;
- verify logged-out private pages return readable `noindex` without private data;
- validate Organization, WebSite, Service and Breadcrumb JSON-LD;
- compare declared and Google-selected canonicals in URL Inspection.

## Exact unresolved external dependencies

1. Live HTTP bodies and status codes for `/robots.txt` and `/sitemap.xml`.
2. Host-level redirect configuration.
3. Production `NEXT_PUBLIC_SITE_URL`.
4. Search Console ownership and Google-selected canonical evidence.
5. Current public identity of every URL listed in `sameAs`.
6. Headquarters decision on the actual operating base and in-person eligibility.
7. Deployment approval for any future code patch.
8. A runnable repository checkout/build environment for test execution.

## Explicit non-actions

This evidence pack did not:

- modify application code;
- change sitemap, robots, metadata, canonicals or schema;
- create a Search Console property;
- verify an existing property;
- submit a sitemap or URL;
- request indexing;
- modify DNS or hosting;
- edit an external profile;
- create a location page or Google Business Profile;
- publish, deploy or spend;
- touch outreach, payments or revenue logic; or
- treat search activity as a client, lead or payment.

## Smallest headquarters decision

Approve or decline a **no-deploy technical SEO patch branch** limited to:

1. resolving the `/leads` robots/noindex contradiction;
2. changing root and provider schema from unverified `ProfessionalService/#studio` to `Organization/#organization`;
3. removing or qualifying unsupported Offer and stale `sameAs` assertions; and
4. adding a deterministic search-readiness test.

Runtime redirect or Search Console actions remain separate approval gates.
