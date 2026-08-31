export type LaunchState = 'new' | 'redesign' | 'connected';
export type CustomerAction = 'trust' | 'enquiry' | 'transaction' | 'workflow';
export type PageRange = '1–3' | '4–5' | '6–8' | 'needs-mapping';
export type Integration = 'none' | 'one' | 'several';
export type ContentState = 'ready' | 'needs-shaping';

export type ScopePlannerAnswers = {
  launchState?: LaunchState;
  customerAction?: CustomerAction;
  pageRange?: PageRange;
  integration?: Integration;
  contentState?: ContentState;
};

export type CompleteScopePlannerAnswers = Required<ScopePlannerAnswers>;

export function getScopeRecommendation(answers: CompleteScopePlannerAnswers) {
  if (answers.customerAction === 'workflow' || answers.integration === 'several') {
    return {
      name: 'Custom Website System',
      budget: '$12,000+',
      project: 'A product or platform experience',
      reason: 'A product workflow or several connected systems needs launch discovery before the customer journey, technical boundary, timing and investment can be fixed responsibly.',
      includes: 'Launch discovery · journey mapping · original interface direction · technical scope · milestone plan',
    };
  }

  if (answers.customerAction === 'transaction' || answers.integration === 'one' || answers.pageRange === '6–8' || answers.launchState === 'connected') {
    return {
      name: 'Website + Integration',
      budget: '$6,000–$12,000',
      project: answers.customerAction === 'transaction'
        ? 'A commerce or ordering experience'
        : 'A business website with one integration',
      reason: 'The customer journey includes one practical business system, so that integration belongs inside the website scope from the start.',
      includes: 'Custom page plan · original visual direction · responsive build · one agreed integration',
    };
  }

  if (answers.pageRange === '4–5' || answers.pageRange === 'needs-mapping' || answers.contentState === 'needs-shaping' || answers.launchState === 'redesign') {
    return {
      name: 'Complete Business Website',
      budget: '$3,000–$6,000',
      project: answers.launchState === 'redesign' ? 'A serious website redesign' : 'A new website from scratch',
      reason: 'The business needs a complete public story and enough direction to connect the offer, proof, pages and enquiry journey coherently.',
      includes: 'Up to 5 custom pages · message structure · original design · responsive build · launch',
    };
  }

  return {
    name: 'Focused Website',
    budget: '$1,500–$3,000',
    project: 'A new website from scratch',
    reason: 'The project has one focused goal, a compact page surface and no significant integration, so a deliberately narrow launch is the credible place to begin.',
    includes: '1–3 purposeful pages · focused direction · responsive build · launch',
  };
}
