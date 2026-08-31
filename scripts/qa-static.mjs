#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const npmExecPath = process.env.npm_execpath;
if (!npmExecPath) {
  console.error('QA static runner must be started through npm so npm_execpath is available.');
  process.exit(2);
}

const checks = [
  { name: 'lint', args: [npmExecPath, 'run', 'lint'] },
  { name: 'production build', args: [npmExecPath, 'run', 'build'] },
  { name: 'payment safety contract', args: ['scripts/check-payment-safety.mjs'] },
  { name: 'revenue evidence contract', args: ['scripts/check-revenue-dashboard.mjs'] },
  { name: 'scope recommendation contract', args: ['scripts/check-scope-planner-recommendation.mjs'] },
  { name: 'qualification contract', args: ['scripts/check-qualification-policy.mjs'] },
  { name: 'source policy', args: ['scripts/source-audit.mjs'] },
  { name: 'active QA manifest schema', args: ['scripts/qa-gate.mjs', 'qa/project.json', '--schema-only'] },
];

const results = [];
for (const check of checks) {
  console.log('\n=== QA CHECK: ' + check.name + ' ===');
  const result = spawnSync(process.execPath, check.args, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  });
  const status = Number.isInteger(result.status) ? result.status : 1;
  results.push({ name: check.name, status });
  if (result.error) console.error(result.error.message);
}

console.log('\n=== QA STATIC SUMMARY ===');
for (const result of results) {
  console.log((result.status === 0 ? 'PASS' : 'FAIL') + ': ' + result.name);
}
const failures = results.filter((result) => result.status !== 0);
console.log('Result: ' + (failures.length ? 'BLOCKED' : 'PASS') + ' (' + failures.length + ' failed checks)');
process.exit(failures.length ? 1 : 0);
