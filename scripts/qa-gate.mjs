#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const manifestPath = args.find((arg) => !arg.startsWith('--'));
const phaseArg = args.find((arg) => arg.startsWith('--phase='));
const phase = phaseArg ? phaseArg.split('=')[1] : 'candidate';
const schemaOnly = args.includes('--schema-only');

const allowedPhases = ['candidate', 'approve', 'launch', 'handover'];
const allowedTracks = ['standard', 'custom'];
const allowedStatuses = ['pending', 'pass', 'fail', 'not-applicable', 'waived'];
const allowedOwners = ['automation', 'director', 'client'];
const baseCategories = ['content','access','design','responsive','accessibility','performance','seo','forms','visual','approval','launch','rollback','handover','support','monitoring'];
const customCategories = ['integration','security','data','observability'];
const phaseCategories = {
  candidate: ['content','access','design','responsive','accessibility','performance','seo','forms','integration','security','data','observability'],
  approve: ['content','access','design','responsive','accessibility','performance','seo','forms','integration','security','data','observability','visual','approval'],
  launch: ['content','access','design','responsive','accessibility','performance','seo','forms','integration','security','data','observability','visual','approval','launch','rollback'],
  handover: [...baseCategories, ...customCategories]
};

const errors = [];
const warnings = [];
function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }
function present(value) { return value !== undefined && value !== null && value !== ''; }
function requireValue(value, label) { if (!present(value)) fail('Missing ' + label + '.'); }
function isIsoDate(value) { return typeof value === 'string' && !Number.isNaN(Date.parse(value)); }

function scanForSecrets(value, trail = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanForSecrets(item, trail.concat(String(index))));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    const nextTrail = trail.concat(key);
    if (/^(password|secret|token|apiKey|privateKey|credential)$/i.test(key) && present(child)) {
      fail('Possible secret stored at ' + nextTrail.join('.') + '. Store only an access method or evidence reference.');
    }
    if (typeof child === 'string' && /(sk_live_|rzp_live_|BEGIN (RSA |EC )?PRIVATE KEY|ghp_[A-Za-z0-9]{20})/.test(child)) {
      fail('Secret-like value found at ' + nextTrail.join('.') + '.');
    }
    scanForSecrets(child, nextTrail);
  }
}

if (!manifestPath) {
  console.error('Usage: node scripts/qa-gate.mjs qa/project.json --phase=candidate');
  process.exit(2);
}
if (!allowedPhases.includes(phase)) {
  console.error('Unknown phase: ' + phase + '. Use ' + allowedPhases.join(', ') + '.');
  process.exit(2);
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(path.resolve(manifestPath), 'utf8'));
} catch (error) {
  console.error('Cannot read manifest: ' + error.message);
  process.exit(2);
}

scanForSecrets(manifest);
if (manifest.schemaVersion !== 1) fail('schemaVersion must equal 1.');
const project = manifest.project || {};
requireValue(project.id, 'project.id');
requireValue(project.name, 'project.name');
requireValue(project.owner, 'project.owner');
requireValue(project.decisionMaker, 'project.decisionMaker');
requireValue(project.candidateRef, 'project.candidateRef');
if (!allowedTracks.includes(project.track)) fail('project.track must be standard or custom.');
if (!Number.isInteger(project.pageCount) || project.pageCount < 1) fail('project.pageCount must be a positive integer.');

const capabilities = manifest.capabilities || {};
const integrations = Array.isArray(manifest.integrations) ? manifest.integrations : [];
const standardTriggers = [];
if ((project.pageCount || 0) > 3) standardTriggers.push('more than three pages');
if (capabilities.authentication) standardTriggers.push('authentication');
if (capabilities.payments) standardTriggers.push('payments');
if (capabilities.commerce) standardTriggers.push('commerce');
if (capabilities.customBackend) standardTriggers.push('custom backend');
if (capabilities.dataMigration) standardTriggers.push('data migration');
if (capabilities.sensitiveData) standardTriggers.push('sensitive data');
if ((capabilities.languages || 1) > 1) standardTriggers.push('multiple languages');
if (integrations.length > 1) standardTriggers.push('multiple integrations');
if (project.track === 'standard' && standardTriggers.length) fail('Standard track must be reclassified as custom because it includes: ' + standardTriggers.join(', ') + '.');
if (project.track === 'standard' && integrations.length === 1) {
  const item = integrations[0] || {};
  if (item.businessCritical || item.stateful || item.writesProductionData) fail('A business-critical, stateful or production-writing integration requires the custom track.');
}

const routes = Array.isArray(manifest.routes) ? manifest.routes : [];
if (!routes.length) fail('At least one route is required.');
if (!routes.some((route) => route && route.path === '/' && route.public)) fail('A public root route is required.');
const routePaths = new Set();
for (const route of routes) {
  if (!route || typeof route.path !== 'string' || !route.path.startsWith('/')) {
    fail('Every route needs a root-relative path.');
    continue;
  }
  if (routePaths.has(route.path)) fail('Duplicate route: ' + route.path + '.');
  routePaths.add(route.path);
  if (route.public && route.critical) {
    requireValue(route.expectedTitle, 'expectedTitle for ' + route.path);
    requireValue(route.expectedH1, 'expectedH1 for ' + route.path);
  }
}

const forms = Array.isArray(manifest.forms) ? manifest.forms : [];
for (const form of forms) {
  requireValue(form && form.name, 'form.name');
  requireValue(form && form.route, 'form.route');
  requireValue(form && form.endpoint, 'form.endpoint');
  requireValue(form && form.testMode, 'form.testMode');
  if (form && form.testMode === 'production') fail('Production form submissions are not an accepted QA test mode.');
}

if (!manifest.qualityBudgets || typeof manifest.qualityBudgets !== 'object') {
  fail('qualityBudgets is required.');
} else {
  for (const budget of ['accessibilityScore','performanceScoreMobile','seoScore','lcpMs','cls','inpMs']) {
    if (typeof manifest.qualityBudgets[budget] !== 'number') fail('qualityBudgets.' + budget + ' must be numeric.');
  }
}

const checks = Array.isArray(manifest.checks) ? manifest.checks : [];
if (!checks.length) fail('checks must contain the project gate evidence.');
const checkIds = new Set();
const categories = new Set();
for (const check of checks) {
  if (!check || typeof check !== 'object') {
    fail('Every check must be an object.');
    continue;
  }
  requireValue(check.id, 'check.id');
  if (checkIds.has(check.id)) fail('Duplicate check id: ' + check.id + '.');
  checkIds.add(check.id);
  categories.add(check.category);
  if (![...baseCategories, ...customCategories].includes(check.category)) fail('Unknown category for ' + check.id + ': ' + check.category + '.');
  if (!allowedOwners.includes(check.owner)) fail('Unknown owner for ' + check.id + '.');
  if (!allowedStatuses.includes(check.status)) fail('Unknown status for ' + check.id + '.');
  if (!Array.isArray(check.evidence)) fail('Evidence must be an array for ' + check.id + '.');
  if (check.status === 'fail') fail(check.id + ' is explicitly failed.');
  if (check.status === 'pass' && (!Array.isArray(check.evidence) || check.evidence.length === 0) && !schemaOnly) fail(check.id + ' is marked pass without evidence.');
  if (check.status === 'not-applicable' && !String(check.note || '').trim() && !schemaOnly) fail(check.id + ' is not-applicable without a reason.');
  if (check.status === 'waived') {
    if (!String(check.note || '').trim()) fail(check.id + ' is waived without a risk note.');
    if (!check.waiver || !check.waiver.approvedBy || !isIsoDate(check.waiver.expiresAt)) fail(check.id + ' waiver needs approvedBy and a valid expiresAt.');
    if (project.track === 'custom' && check.severity === 'blocker' && ['integration','security','data','rollback'].includes(check.category)) fail(check.id + ' is a non-waivable custom-track blocker.');
  }
}
for (const category of baseCategories) if (!categories.has(category)) fail('Missing required check category: ' + category + '.');

if (project.track === 'custom') {
  for (const category of customCategories) if (!categories.has(category)) fail('Custom track is missing check category: ' + category + '.');
  if (!integrations.length) warn('Custom track has no integration entry; confirm another custom trigger is intentional.');
  for (const integration of integrations) {
    for (const field of ['name','owner','environment','contractTest','failureMode','rollback']) requireValue(integration && integration[field], 'integration.' + field);
    if (!integration.sandboxEvidence || !Array.isArray(integration.sandboxEvidence)) fail('Each custom integration needs sandboxEvidence as an array.');
  }
}

if (!schemaOnly) {
  const requiredNow = new Set(phaseCategories[phase]);
  for (const check of checks) {
    if (requiredNow.has(check.category) && !['pass','not-applicable','waived'].includes(check.status)) {
      fail(check.id + ' must be resolved for phase ' + phase + '; current status is ' + check.status + '.');
    }
  }
  const approvals = manifest.approvals || {};
  const requireApproval = (key) => {
    const approval = approvals[key] || {};
    if (approval.status !== 'approved') fail('approvals.' + key + '.status must be approved.');
    if (approval.candidateRef !== project.candidateRef) fail('approvals.' + key + ' must reference the exact candidateRef.');
    requireValue(approval.approvedBy, 'approvals.' + key + '.approvedBy');
    if (!isIsoDate(approval.approvedAt)) fail('approvals.' + key + '.approvedAt must be a valid date.');
    if (!Array.isArray(approval.evidence) || approval.evidence.length === 0) fail('approvals.' + key + ' needs evidence.');
  };
  if (['approve','launch','handover'].includes(phase)) {
    requireApproval('director');
    requireApproval('client');
  }
  if (['launch','handover'].includes(phase)) {
    requireApproval('launch');
    const rollback = manifest.rollback || {};
    for (const field of ['owner','knownGoodRef','procedure','dataPolicy','trigger']) requireValue(rollback[field], 'rollback.' + field);
    if (!Array.isArray(rollback.evidence) || rollback.evidence.length === 0) fail('rollback.evidence is required for launch.');
  }
  if (phase === 'handover') {
    requireApproval('handover');
    const handover = manifest.handover || {};
    for (const field of ['repositoryTransferredOrShared','accountsOwnedByClient','secretRotationAssigned','contentGuideDelivered','runbookDelivered','analyticsOwnershipConfirmed']) {
      if (handover[field] !== true) fail('handover.' + field + ' must be true.');
    }
    if (!Array.isArray(handover.evidence) || handover.evidence.length === 0) fail('handover.evidence is required.');
    const monitoring = manifest.monitoring || {};
    requireValue(monitoring.owner, 'monitoring.owner');
    if (!Array.isArray(monitoring.evidence) || monitoring.evidence.length === 0) fail('monitoring.evidence is required.');
  }
}

console.log('QA gate: ' + project.name + ' [' + project.track + '] phase=' + phase + (schemaOnly ? ' schema-only' : ''));
warnings.forEach((message) => console.warn('WARN: ' + message));
errors.forEach((message) => console.error('ERROR: ' + message));
console.log('Result: ' + (errors.length ? 'BLOCKED' : 'PASS') + ' (' + errors.length + ' errors, ' + warnings.length + ' warnings)');
process.exit(errors.length ? 1 : 0);
