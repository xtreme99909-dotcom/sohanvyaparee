# Approval-Controlled Release Packet — 2026-08-29

## Decision requested

Approve or decline one production release of the already completed local conversion, proof, motion and private owner-desk bundle. Approval to deploy does not authorize public posting, outreach, follow-ups, account changes, paid promotion or production test submissions.

The current public site remains unchanged at <https://sohan-website-studio.vercel.app/>. No deployment has been made from this worktree.

## Buyer-facing changes in the release

- A guided five-decision scope preview on the complete-website service page. It recommends a credible starting engagement without presenting an automatic quotation.
- Stronger homepage and case-study paths from interest to the scope preview and structured project brief.
- A third proof route for the studio's own acquisition system, truth-labelled as self-initiated work.
- Clearer separation between live founder-built work, speculative product concepts and creative-direction background.
- Non-destructive enquiry recovery: a buyer's answers remain visible if the private inbox cannot save the submission, with the verified Upwork project available as a fallback.
- A premium site-wide motion system: cinematic entrances, scroll reveals, progress feedback, restrained hover movement and an integrated logo glow.
- Accessibility protection through a reduced-motion mode and keyboard/focus-safe interactions.

## Private owner changes in the release

- A protected owner-only lead desk at `/leads`.
- Persistent lead stage, next-action date and private notes.
- A qualification-oriented response draft for each captured enquiry.
- No production password, private enquiry or deployment secret in the repository.

## Data change

Migration `drizzle/0002_cuddly_omega_flight.sql` adds owner notes, next-action and update fields to the existing leads table, adds the triage index, and safely creates the marketing-events table and its indexes when absent.

Run the migration once in the production environment as part of the approved release. Confirm the existing leads table and backup posture before applying it. Do not create, edit or delete a real lead as a smoke test without separate approval.

## Verified locally

- `npm run lint` passed.
- `npm run build` passed.
- `git diff --check` passed.
- Homepage, complete-website service, studio-system proof, BongFoods proof, private-market concept and BBJ concept were checked at desktop and mobile sizes.
- No tested page showed a runtime overlay, console error or horizontal overflow.
- Reduced-motion behavior was checked.
- The public site and its private dashboard were inspected separately; they still show the older production release.

## Release sequence after explicit approval

1. Re-run lint, production build and diff checks from the exact release worktree.
2. Review the complete diff and confirm only intended files are included.
3. Apply the production database migration using the linked production environment.
4. Deploy the release through the connected GitHub/Vercel project.
5. Verify the final public URL, deployment commit and production logs.
6. Check homepage, service, proof, privacy, sitemap, robots and BBJ concept routes on desktop and mobile.
7. Confirm unauthenticated `/leads` access is denied and the authenticated owner can open the lead desk.
8. Confirm the scope preview, brief validation, enquiry-recovery state, source attribution and reduced-motion mode without submitting synthetic production data.
9. Check browser console, responsive overflow and key Core Web Vitals signals.

## Rollback boundary

If the public experience, authentication or data migration fails verification, stop traffic-changing work and promote the last known-good deployment. Do not delete or rewrite production lead data. Preserve logs and the failed deployment for diagnosis.

## Current channel evidence

- Private dashboard: 11 site visits, 2 proof views, 0 offer views, 0 enquiry clicks and 0 captured leads in the displayed 30-day snapshot.
- Upwork project: 4 views and 0 orders in the displayed 30-day snapshot.
- LinkedIn: the four campaign invitations remain pending; the clean Abhishek concept link was seen, with no new reply.

No qualified inquiry or client engagement is currently recorded.
