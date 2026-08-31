#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const warnings = [];
const passes = [];
function read(relativePath) { try { return fs.readFileSync(path.join(root, relativePath), 'utf8'); } catch { return ''; } }
function pass(message) { passes.push(message); }
function fail(message) { failures.push(message); }
function warn(message) { warnings.push(message); }
function assert(condition, message) { condition ? pass(message) : fail(message); }

let packageJson = {};
try { packageJson = JSON.parse(read('package.json')); } catch { fail('package.json is not valid JSON.'); }
assert(Boolean(packageJson.scripts && packageJson.scripts.lint), 'Lint command exists.');
assert(Boolean(packageJson.scripts && packageJson.scripts.build), 'Production build command exists.');
assert(Boolean(read('app/layout.tsx')), 'Root layout exists.');
assert(Boolean(read('app/sitemap.ts')), 'Sitemap metadata route exists.');
assert(Boolean(read('app/robots.ts')), 'Robots metadata route exists.');
assert(Boolean(read('app/site.ts')), 'Canonical site helper exists.');

const layout = read('app/layout.tsx');
assert(/<html\s+lang=["'][a-z-]+["']/.test(layout), 'Document language is declared.');
assert(/export\s+const\s+metadata/.test(layout), 'Next metadata object exists.');
assert(/openGraph\s*:/.test(layout) && /twitter\s*:/.test(layout), 'Social metadata exists.');
assert(/application\/ld\+json/.test(layout), 'Structured data is emitted.');
assert(/metadataBase/.test(layout) && /canonical/.test(layout), 'Canonical metadata base exists.');

const robots = read('app/robots.ts');
assert(/\/leads/.test(robots) && /\/api\//.test(robots) && /\/pay\//.test(robots) && /\/payments\//.test(robots), 'Private and transactional routes are excluded from robots.');
const sitemap = read('app/sitemap.ts');
assert(!/\/leads|\/pay\/|\/payments\//.test(sitemap), 'Private and transactional routes are absent from sitemap.');

const css = read('app/globals.css');
assert(/:root\s*\{/.test(css), 'Global design-token root exists.');
assert(/:focus-visible/.test(css), 'Visible keyboard focus styles exist.');
assert(/prefers-reduced-motion\s*:\s*reduce/.test(css), 'Reduced-motion treatment exists.');
assert((css.match(/@media/g) || []).length >= 2, 'Responsive media rules exist.');

const brief = read('app/project-brief.tsx');
if (brief) {
  assert(/<form/.test(brief) && /<label/.test(brief), 'Project brief uses a form and visible labels.');
  assert(/type=["']email["']/.test(brief), 'Email field uses an email input.');
  assert(/role=["']alert["']/.test(brief) && /role=["']status["']/.test(brief), 'Form exposes error and success status semantics.');
  assert(/website-field/.test(brief) && /formStartedAt/.test(brief), 'Form includes anti-bot timing and honeypot signals.');
}

const leadRoute = read('app/api/leads/route.ts');
if (leadRoute) {
  assert(/content-length/.test(leadRoute), 'Lead endpoint limits request size.');
  assert(/Invalid origin/.test(leadRoute), 'Lead endpoint rejects cross-origin writes.');
  assert(/Too many recent enquiries/.test(leadRoute), 'Lead endpoint rate-limits repeated enquiries.');
  assert(/consent/.test(leadRoute), 'Lead endpoint requires consent.');
}

const paymentRoute = read('app/api/payment-links/route.ts');
if (paymentRoute) {
  assert(/isStudioOwner/.test(paymentRoute) && /Owner access required/.test(paymentRoute), 'Payment-link creation is owner-only.');
  assert(/agreementConfirmed/.test(paymentRoute) && /scopeVersion/.test(paymentRoute), 'Payment links require accepted scope evidence.');
  assert(/supportedCurrencies/.test(paymentRoute) && /Number\.isInteger\(amount\)/.test(paymentRoute), 'Payment amount and currency are allowlisted.');
}

const webhook = read('app/api/webhooks/razorpay/route.ts');
if (webhook) {
  assert(/HMAC/.test(webhook) && /x-razorpay-signature/.test(webhook), 'Razorpay webhook verifies an HMAC signature.');
  assert(/constantTimeEqual/.test(webhook), 'Webhook signature comparison is constant-time.');
  assert(/INSERT OR IGNORE INTO payment_webhook_events/.test(webhook), 'Webhook events are duplicate-protected.');
  assert(/WHEN status = 'paid' THEN status/.test(webhook), 'Paid state is monotonic.');
}

const envExample = read('.env.example');
if (envExample) {
  const assignedSecrets = envExample.split(/\r?\n/).filter((line) => /(?:SECRET|TOKEN|KEY|PASSWORD)\s*=\s*\S+/.test(line) && !/example|placeholder/i.test(line));
  assert(assignedSecrets.length === 0, '.env.example contains no populated secret values.');
}
assert(!fs.existsSync(path.join(root, 'app', 'concepts', 'tenderma')), 'Excluded Tenderma public route is absent.');

if (!read('.github/workflows/qa-gates.yml')) warn('QA workflow is not present yet.');
if (!read('qa/project.json')) warn('qa/project.json is not created; copy qa/project.example.json for an active project.');
if (!/Content-Security-Policy/i.test(read('next.config.ts'))) warn('No source-level Content-Security-Policy was detected; decide per runtime before launch.');
if (!/headers\s*\(/.test(read('next.config.ts'))) warn('No source-level security-header function was detected; verify headers at the edge.');

console.log('Source audit');
passes.forEach((message) => console.log('PASS: ' + message));
warnings.forEach((message) => console.warn('WARN: ' + message));
failures.forEach((message) => console.error('FAIL: ' + message));
console.log('Result: ' + (failures.length ? 'BLOCKED' : 'PASS') + ' (' + failures.length + ' failures, ' + warnings.length + ' warnings)');
process.exit(failures.length ? 1 : 0);
