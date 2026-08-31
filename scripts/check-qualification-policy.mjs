import assert from 'node:assert/strict';
import {ENGAGEMENT_CONTEXTS,approvalMatches,evaluateQualification,proposalIssuePreflight,proposalPreflight,recommendationFromPlanner,scoreGrades,selectNextQuestion,validateProposalSow} from '../app/leads/qualification-policy.js';
let passed=0;const check=run=>{run();passed+=1};
const now='2026-09-01T12:00:00.000Z',later='2026-09-02T12:00:00.000Z';
const grades={need:3,authority:3,outcome:3,scope:3,readiness:2,timing:2,investment:3};
const approval=(type,artifactId,artifactVersion,artifactHash,extra={})=>({type,artifactId,artifactVersion,artifactHash,state:'approved',expiresAt:later,...extra});
for(const[name,id,amount]of[
 ['Focused Launch','focused_launch',1500],
 ['Complete Business Website','complete_business_website',3000],
 ['Signature Experience + Integration','signature_experience_integration',5000],
 ['International Launch System','international_launch_system',6500],
])check(()=>{const r=recommendationFromPlanner({name,budget:`$${amount}+`,project:'Project',reason:'Reason',includes:'Boundary'});assert.deepEqual([r.id,r.startingAmountUsd,r.automaticQuote,r.requiresFixedOwnerAmount],[id,amount,false,true])});
check(()=>assert.equal(ENGAGEMENT_CONTEXTS.focused_launch.startingAmountUsd,1500));
check(()=>assert.equal(scoreGrades(grades),94));
check(()=>assert.equal(selectNextQuestion({grades:{...grades,investment:null}}).id,'ask_investment'));
check(()=>assert.equal(selectNextQuestion({grades:{...grades,need:null},contradictions:['Conflict']}).id,'clarify_contradiction'));
const qualified=evaluateQualification({grades,recommendedContext:'focused_launch',explicitBudgetMaxUsd:1500});
check(()=>assert.equal(qualified.route,'scopeable'));
check(()=>assert.equal(evaluateQualification({grades,recommendedContext:'focused_launch',explicitBudgetMaxUsd:1499}).route,'no_fit'));
check(()=>assert.equal(evaluateQualification({grades,recommendedContext:'complete_business_website',explicitBudgetMaxUsd:2999}).reasonCodes[0],'investment_below_context'));
check(()=>assert.equal(evaluateQualification({grades,recommendedContext:'focused_launch',stopReason:'stop'}).route,'suppressed'));
check(()=>assert.equal(evaluateQualification({grades,recommendedContext:'focused_launch',duplicateConflict:true}).route,'suppressed'));
check(()=>assert.equal(evaluateQualification({grades,recommendedContext:'focused_launch',strongOwnedJourneyWithoutGap:true}).route,'no_fit'));
check(()=>assert.equal(evaluateQualification({grades:{...grades,investment:null},recommendedContext:'focused_launch'}).nextQuestion.id,'ask_investment'));
check(()=>assert.equal(evaluateQualification({grades,recommendedContext:null}).route,'qualified'));
check(()=>assert.equal(evaluateQualification({grades:{...grades,authority:1},recommendedContext:'focused_launch'}).route,'hold'));
const scope={id:'scope-1',version:1,contentHash:'scope-hash',recommendedContext:'focused_launch',amountMinor:150000,currency:'USD',deliveryWindow:'5–7 working days',deliverables:[{id:'d1',text:'Focused launch',acceptance:'Approved responsive pages'}],dependencies:['Approved content'],assumptions:['One approval owner'],exclusions:['Custom workflow'],integrations:[],milestones:[{percent:50,amountMinor:75000},{percent:30,amountMinor:45000},{percent:20,amountMinor:30000}]};
const approvals=[approval('scope',scope.id,scope.version,scope.contentHash),approval('commercials',scope.id,scope.version,scope.contentHash)];
check(()=>assert.equal(proposalPreflight({qualification:qualified,scope,approvals,now}).ok,true));
check(()=>assert.ok(proposalPreflight({qualification:qualified,scope:{...scope,amountMinor:149900},approvals,now}).errors.includes('amount_below_hq_context')));
const inrScope={...scope,id:'scope-inr',contentHash:'scope-inr-hash',amountMinor:12500000,currency:'INR',milestones:[{percent:50,amountMinor:6250000},{percent:30,amountMinor:3750000},{percent:20,amountMinor:2500000}]};
check(()=>assert.equal(proposalPreflight({qualification:qualified,scope:inrScope,approvals:[approval('scope',inrScope.id,1,inrScope.contentHash),approval('commercials',inrScope.id,1,inrScope.contentHash)],now}).ok,true));
check(()=>assert.ok(proposalPreflight({qualification:qualified,scope,approvals:[approvals[0]],now}).errors.includes('commercials_approval_missing')));
check(()=>assert.equal(approvalMatches(approval('scope',scope.id,1,scope.contentHash,{expiresAt:now}),{type:'scope',artifactId:scope.id,artifactVersion:1,artifactHash:scope.contentHash},now),false));
const projection={id:'proposal-1',version:1,contentHash:'proposal-hash',leadId:'lead-1',clientLegalName:'Example Private Limited',scopeSnapshotId:scope.id,scopeVersion:1,scopeHash:scope.contentHash,recommendedContext:scope.recommendedContext,amountMinor:scope.amountMinor,currency:scope.currency,deliveryWindow:scope.deliveryWindow,deliverables:scope.deliverables,dependencies:scope.dependencies,assumptions:scope.assumptions,exclusions:scope.exclusions,integrations:scope.integrations,milestones:scope.milestones};
check(()=>assert.equal(validateProposalSow(projection,{...projection}).ok,true));
check(()=>assert.ok(validateProposalSow(projection,{...projection,amountMinor:151000}).errors.includes('mismatch_amountMinor')));
check(()=>assert.ok(validateProposalSow(projection,{...projection,deliverables:[]}).errors.includes('mismatch_deliverables')));
check(()=>assert.ok(validateProposalSow(projection,{...projection,milestones:projection.milestones.slice(0,2)}).errors.includes('milestone_percentages_not_100')));
const issueApproval=approval('proposal_issue',projection.id,1,projection.contentHash);
check(()=>assert.equal(proposalIssuePreflight({proposal:projection,sow:{...projection},approvals:[issueApproval],now}).ok,true));
check(()=>assert.ok(proposalIssuePreflight({proposal:{...projection,contentHash:'changed'},sow:{...projection,contentHash:'changed'},approvals:[issueApproval],now}).errors.includes('proposal_issue_approval_missing')));
assert.equal(passed,28);
console.log(`Qualification policy checks passed: ${passed}`);
globalThis.__qualificationPolicyTestResult={passed,total:28};
