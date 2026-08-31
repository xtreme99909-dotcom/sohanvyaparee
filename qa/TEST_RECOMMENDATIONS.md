# Test implementation recommendations

The current QA layer deliberately adds no dependency. Its manifest, source audit and GET-only preview smoke fit the existing lockfile. Browser, accessibility, visual and performance automation should be added in a separate reviewed dependency change.

## Recommended tools

| Need | Tool |
| --- | --- |
| Responsive and end-to-end browser checks | @playwright/test |
| Automated accessibility checks | @axe-core/playwright |
| Visual regression | Playwright screenshot assertions |
| Performance and SEO lab budgets | @lhci/cli |
| Pure rules and state transitions | Node test runner or Vitest |
| External integration behavior | Deterministic fixtures plus an authorized sandbox |

Official references:

- https://playwright.dev/docs/test-projects
- https://playwright.dev/docs/test-snapshots
- https://playwright.dev/docs/accessibility-testing
- https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright
- https://github.com/GoogleChrome/lighthouse-ci
- https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
- https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots

After approval, install reviewed versions and commit package.json and package-lock.json together:

~~~
npm install --save-dev @playwright/test @axe-core/playwright @lhci/cli
npx playwright install --with-deps chromium firefox webkit
~~~

Release CI should use the lockfile, not an unpinned download.

## Browser matrix

Standard one-week track:

- mobile Chromium and desktop Chromium on every candidate;
- Firefox and WebKit before approval;
- viewports at 360, 390, 768, 1280 and 1440 widths;
- public critical path, navigation, forms with mocked endpoints and reduced motion.

Custom/integrated track adds:

- every supported browser/role/environment;
- authenticated and unauthorized states;
- contract fixtures, sandbox behavior and provider failure modes;
- migration, retry/idempotency, recovery and reconciliation scenarios;
- observability evidence.

## Route test pattern

Generate cases from qa/project.json so route expectations have one source of truth:

~~~ts
import { test, expect } from '@playwright/test';
import manifest from '../../qa/project.json';

for (const route of manifest.routes.filter((item) => item.public && item.critical)) {
  test(route.path + ' critical route', async ({ page }) => {
    const response = await page.goto(route.path);
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(new RegExp(route.expectedTitle, 'i'));
    await expect(page.getByRole('heading', { level: 1 })).toContainText(route.expectedH1);
    expect(await page.locator('html').evaluate((node) => node.scrollWidth <= node.clientWidth)).toBeTruthy();
  });
}
~~~

## Accessibility

~~~ts
import AxeBuilder from '@axe-core/playwright';

const result = await new AxeBuilder({ page }).analyze();
const blockers = result.violations.filter((item) =>
  item.impact === 'critical' || item.impact === 'serious'
);
expect(blockers).toEqual([]);
~~~

Automation is not conformance. Manually check keyboard order, focus, 200% zoom, contrast, reduced motion, alternative text, error announcement and a screen-reader critical path.

## Forms

UI tests should mock the network:

~~~ts
await page.route('**/api/**', async (route) => {
  await route.fulfill({
    status: 503,
    contentType: 'application/json',
    body: '{"error":"synthetic test failure"}',
  });
});
~~~

Cover required/invalid/long values, consent, keyboard submit, loading, duplicate click, success, server errors, offline recovery, privacy notice and retained input. Persistence tests may use only an authorized non-production store and synthetic data. Production smoke remains GET-only.

## Visual review

Use stable content and mask nondeterministic regions. Capture critical routes/states on mobile and desktop, including reduced motion.

~~~ts
await expect(page).toHaveScreenshot('critical-mobile.webp', {
  fullPage: true,
  animations: 'disabled',
  maxDiffPixelRatio: 0.005,
});
~~~

A baseline change requires a linked visual decision. Never update snapshots only to make CI green.

## Performance and SEO

Collect at least three Lighthouse runs for representative routes. Initial targets from qa/project.example.json are accessibility 1.00, mobile performance 0.90, SEO 0.95, LCP 2500 ms and CLS 0.10. Tune budgets only from evidence, not to excuse a regression.

Also assert unique title/description/canonical/H1, truthful structured data, intended robots/sitemap behavior, social preview, redirects and internal links.

## Integration tests

For each custom integration, test:

- contract fixture and sandbox happy path;
- missing/invalid authentication;
- timeout, malformed response, rate limit, 4xx and 5xx;
- bounded retry and duplicate protection;
- invalid signature before mutation where webhooks apply;
- duplicate and out-of-order events;
- source-of-truth conflict and reconciliation;
- degraded customer path and rollback/disable procedure.

No test should create a live charge, refund, message, lead or client record.

## Gate order

1. lint, build, source audit and manifest;
2. unit/component tests;
3. browser/responsive and form mock;
4. axe and manual accessibility;
5. visual snapshots;
6. Lighthouse/SEO;
7. custom integration/data/security/observability suite;
8. evidence packet for Sohan;
9. client approval against the same candidate;
10. launch-readiness validation, never automatic deployment.
