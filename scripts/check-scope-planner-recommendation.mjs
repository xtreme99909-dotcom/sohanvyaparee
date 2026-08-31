import assert from 'node:assert/strict';
import { getScopeRecommendation } from '../app/scope-planner-recommendation.ts';

const cases = [
  {
    label: 'focused website',
    answers: { launchState: 'new', customerAction: 'trust', pageRange: '1–3', integration: 'none', contentState: 'ready' },
    expected: { name: 'Focused Launch', budget: '$1,500+', project: 'A new website from scratch' },
  },
  {
    label: 'complete business website',
    answers: { launchState: 'new', customerAction: 'enquiry', pageRange: '4–5', integration: 'none', contentState: 'needs-shaping' },
    expected: { name: 'Complete Business Website', budget: '$3,000–$6,000', project: 'A new website from scratch' },
  },
  {
    label: 'serious redesign',
    answers: { launchState: 'redesign', customerAction: 'enquiry', pageRange: '4–5', integration: 'none', contentState: 'ready' },
    expected: { name: 'Complete Business Website', budget: '$3,000–$6,000', project: 'A serious website redesign' },
  },
  {
    label: 'business website with one integration',
    answers: { launchState: 'new', customerAction: 'enquiry', pageRange: '4–5', integration: 'one', contentState: 'needs-shaping' },
    expected: { name: 'Signature Experience + Integration', budget: '$5,000+', project: 'A business website with one integration' },
  },
  {
    label: 'commerce or ordering experience',
    answers: { launchState: 'connected', customerAction: 'transaction', pageRange: '6–8', integration: 'one', contentState: 'ready' },
    expected: { name: 'Website + Integration', budget: '$6,000–$12,000', project: 'A commerce or ordering experience' },
  },
  {
    label: 'custom product or platform',
    answers: { launchState: 'connected', customerAction: 'workflow', pageRange: 'needs-mapping', integration: 'several', contentState: 'needs-shaping' },
    expected: { name: 'International Launch System', budget: '$6,500+', project: 'A product or platform experience' },
  },
];

for (const testCase of cases) {
  const result = getScopeRecommendation(testCase.answers);
  assert.deepEqual(
    { name: result.name, budget: result.budget, project: result.project },
    testCase.expected,
    testCase.label,
  );
}

console.log(`Scope planner recommendation checks passed: ${cases.length}`);
