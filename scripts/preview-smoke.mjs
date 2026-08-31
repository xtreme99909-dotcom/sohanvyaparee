#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const manifestPath = process.argv.slice(2).find((arg) => !arg.startsWith('--')) || 'qa/project.json';
let manifest;
try { manifest = JSON.parse(fs.readFileSync(path.resolve(manifestPath), 'utf8')); }
catch (error) { console.error('Cannot read manifest: ' + error.message); process.exit(2); }

const rawBase = process.env.QA_BASE_URL || (manifest.project && manifest.project.previewUrl);
let base;
try { base = new URL(rawBase); } catch { console.error('QA_BASE_URL or project.previewUrl must be a valid absolute URL.'); process.exit(2); }
if (base.hostname.endsWith('.invalid')) { console.error('Replace the example preview URL before running smoke checks.'); process.exit(2); }
if (!['http:', 'https:'].includes(base.protocol)) { console.error('Preview URL must use HTTP or HTTPS.'); process.exit(2); }

const productionUrl = manifest.project && manifest.project.productionUrl;
if (productionUrl) {
  try {
    const productionHost = new URL(productionUrl).host;
    if (base.host === productionHost && process.env.QA_ALLOW_PRODUCTION_READS !== 'true') {
      console.error('Production read checks require QA_ALLOW_PRODUCTION_READS=true. This script still performs GET requests only.');
      process.exit(2);
    }
  } catch { console.error('project.productionUrl is invalid.'); process.exit(2); }
}

const failures = [];
const warnings = [];
const checked = new Map();
function cleanText(html) { return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim(); }
function attr(html, tag, name) {
  const pattern = new RegExp("<" + tag + "\\b[^>]*\\b" + name + "=[\\\"']([^\\\"']+)[\\\"'][^>]*>", "i");
  return html.match(pattern)?.[1] || '';
}
function metaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const safeName = name.replace(/[.*+?^$()|[\]\\]/g, '\\$&');
    if (new RegExp("\\b(?:name|property)=[\\\"']" + safeName + "[\\\"']", "i").test(tag)) return tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] || '';
  }
  return '';
}
function canonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((item) => /\brel=["']canonical["']/i.test(item));
  return tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || '';
}
async function fetchText(url) {
  if (checked.has(url.href)) return checked.get(url.href);
  const started = Date.now();
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'user-agent': 'SP-Studios-QA/1.0 read-only-smoke' } });
    const text = await response.text();
    const result = { response, text, duration: Date.now() - started };
    checked.set(url.href, result);
    return result;
  } catch (error) {
    const result = { error, duration: Date.now() - started, text: '' };
    checked.set(url.href, result);
    return result;
  }
}

const routes = (Array.isArray(manifest.routes) ? manifest.routes : []).filter((route) => route && route.public);
for (const route of routes) {
  const url = new URL(route.path, base);
  const result = await fetchText(url);
  if (result.error) { failures.push(route.path + ' request failed: ' + result.error.message); continue; }
  if (!result.response.ok) { failures.push(route.path + ' returned HTTP ' + result.response.status + '.'); continue; }
  if (!/text\/html/i.test(result.response.headers.get('content-type') || '')) { failures.push(route.path + ' did not return HTML.'); continue; }
  const html = result.text;
  const htmlLang = attr(html, 'html', 'lang');
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '';
  const description = metaContent(html, 'description');
  const robots = metaContent(html, 'robots');
  const canonicalHref = canonical(html);
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => cleanText(match[1]));
  if (!htmlLang) failures.push(route.path + ' has no html lang.');
  if (!title) failures.push(route.path + ' has no title.');
  if (!description) failures.push(route.path + ' has no meta description.');
  if (route.expectedTitle && !title.toLowerCase().includes(String(route.expectedTitle).toLowerCase())) failures.push(route.path + ' title does not contain expectedTitle.');
  if (h1Matches.length !== 1) failures.push(route.path + ' should expose exactly one H1; found ' + h1Matches.length + '.');
  if (route.expectedH1 && h1Matches[0] && !h1Matches[0].toLowerCase().includes(String(route.expectedH1).toLowerCase())) failures.push(route.path + ' H1 does not contain expectedH1.');
  if (/\bnoindex\b/i.test(robots)) failures.push(route.path + ' is public but marked noindex.');
  if (!canonicalHref) warnings.push(route.path + ' has no canonical link in rendered HTML.');
  if (result.duration > 2000) warnings.push(route.path + ' server response took ' + result.duration + 'ms; run Lighthouse for user-centric timing.');
}

for (const specialPath of ['/robots.txt', '/sitemap.xml']) {
  const result = await fetchText(new URL(specialPath, base));
  if (result.error || !result.response || !result.response.ok) failures.push(specialPath + ' is unavailable.');
}

const rootResult = await fetchText(new URL('/', base));
if (rootResult.response && rootResult.response.ok) {
  const hrefs = [...rootResult.text.matchAll(/\bhref=["']([^"']+)["']/gi)].map((match) => match[1]);
  const internal = [...new Set(hrefs)].filter((href) => href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/api/') && !href.startsWith('/pay/')).slice(0, 50);
  for (const href of internal) {
    const url = new URL(href, base);
    url.hash = '';
    const result = await fetchText(url);
    if (result.error || !result.response || result.response.status >= 400) failures.push('Internal link failed: ' + href + '.');
  }
}

console.log('Read-only preview smoke: ' + base.origin);
for (const [url, result] of checked) if (result.response) console.log(result.response.status + ' ' + result.duration + 'ms ' + url);
warnings.forEach((message) => console.warn('WARN: ' + message));
failures.forEach((message) => console.error('FAIL: ' + message));
console.log('Result: ' + (failures.length ? 'BLOCKED' : 'PASS') + ' (' + failures.length + ' failures, ' + warnings.length + ' warnings)');
process.exit(failures.length ? 1 : 0);
