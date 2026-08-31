export const ENGAGEMENT_CONTEXTS=Object.freeze({
focused_launch:{id:'focused_launch',name:'Focused Launch',startingAmountUsd:1500,deliveryContext:'5–7 working days'},
complete_business_website:{id:'complete_business_website',name:'Complete Business Website',startingAmountUsd:3000,deliveryContext:'7–15 working days'},
signature_experience_integration:{id:'signature_experience_integration',name:'Signature Experience + Integration',startingAmountUsd:5000,deliveryContext:'3–6 weeks'},
international_launch_system:{id:'international_launch_system',name:'International Launch System',startingAmountUsd:6500,deliveryContext:'4–8 weeks'},
});
const CONTEXT_BY_NAME=Object.fromEntries(Object.values(ENGAGEMENT_CONTEXTS).map(c=>[c.name,c]));
const GATE_POINTS={need:[0,7,13,20],authority:[0,5,10,15],outcome:[0,5,10,15],scope:[0,5,10,15],readiness:[0,3,7,10],timing:[0,3,7,10],investment:[0,5,10,15]};
const QUESTION_PRIORITY=['need','outcome','authority','investment','scope','timing','readiness'];
const CRITICAL_GATES=['need','authority','outcome','scope','investment'];
const unique=v=>[...new Set(v)];
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);

export function recommendationFromPlanner(p){
 const c=CONTEXT_BY_NAME[p?.name];
 if(!c)throw new Error('Planner recommendation is not mapped to an HQ context.');
 return {...c,plannerBudget:p.budget,project:p.project,reason:p.reason,includes:p.includes,automaticQuote:false,requiresFixedOwnerAmount:true};
}
export function scoreGrades(g){
 return Object.entries(GATE_POINTS).reduce((t,[k,p])=>{const n=g?.[k];return t+(Number.isInteger(n)&&n>=0&&n<=3?p[n]:0)},0);
}
export function selectNextQuestion({grades,contradictions=[]}){
 if(contradictions.length)return{id:'clarify_contradiction',gate:null,contradiction:contradictions[0]};
 const gate=QUESTION_PRIORITY.find(k=>grades?.[k]===null);
 return gate?{id:`ask_${gate}`,gate,contradiction:null}:null;
}
export function evaluateQualification(input){
 const score=scoreGrades(input.grades),context=input.recommendedContext?ENGAGEMENT_CONTEXTS[input.recommendedContext]:null;
 const result=(route,reasonCodes,nextQuestion=null)=>({route,score,reasonCodes,nextQuestion});
 if(input.stopReason)return result('suppressed',['stop_decision']);
 if(input.duplicateConflict)return result('suppressed',['duplicate_conflict']);
 if(input.integrityConflict)return result('no_fit',['integrity_conflict']);
 if(input.strongOwnedJourneyWithoutGap)return result('no_fit',['no_ownership_gap']);
 if(context&&Number.isFinite(input.explicitBudgetMaxUsd)&&input.explicitBudgetMaxUsd<context.startingAmountUsd&&!input.ownerException)return result('no_fit',['investment_below_context']);
 const next=selectNextQuestion(input);
 if(next)return result('needs_information',['unresolved_gate'],next);
 const qualifies=score>=75&&CRITICAL_GATES.every(k=>input.grades[k]>=2)&&input.grades.readiness>=1&&input.grades.timing>=1;
 return qualifies?result(context?'scopeable':'qualified',[]):result('hold',['qualification_threshold_not_met']);
}
export function approvalMatches(a,e,now=new Date().toISOString()){
 return Boolean(a&&a.state==='approved'&&a.type===e.type&&a.artifactId===e.artifactId&&a.artifactVersion===e.artifactVersion&&a.artifactHash===e.artifactHash&&(!a.expiresAt||a.expiresAt>now));
}
export function proposalPreflight({qualification,scope,approvals=[],now}){
 const errors=[],context=scope?.recommendedContext?ENGAGEMENT_CONTEXTS[scope.recommendedContext]:null;
 if(qualification?.route!=='scopeable')errors.push('lead_not_scopeable');
 if(!scope||typeof scope!=='object'||Array.isArray(scope))errors.push('one_scope_required');
 if(!context)errors.push('invalid_engagement_context');
 if(!scope?.contentHash)errors.push('scope_hash_missing');
 if(!Number.isInteger(scope?.amountMinor)||scope.amountMinor<=0)errors.push('fixed_amount_missing');
 if(!['USD','INR'].includes(scope?.currency))errors.push('fixed_currency_missing');
 if(!scope?.deliveryWindow)errors.push('delivery_window_missing');
 if(!scope?.deliverables?.length)errors.push('deliverables_missing');
 if(context&&scope?.currency==='USD'&&scope.amountMinor<context.startingAmountUsd*100)errors.push('amount_below_hq_context');
 const milestones=scope?.milestones||[];
 if(milestones.length!==3)errors.push('three_milestones_required');
 if(milestones.reduce((s,x)=>s+(x.percent||0),0)!==100)errors.push('milestone_percentages_not_100');
 if(milestones.reduce((s,x)=>s+(x.amountMinor||0),0)!==scope?.amountMinor)errors.push('milestone_amounts_do_not_equal_total');
 const target={artifactId:scope?.id,artifactVersion:scope?.version,artifactHash:scope?.contentHash};
 for(const type of ['scope','commercials'])if(!approvals.some(a=>approvalMatches(a,{...target,type},now)))errors.push(`${type}_approval_missing`);
 return{ok:errors.length===0,errors:unique(errors)};
}
export function validateProposalSow(proposal,sow){
 const errors=[];
 for(const f of ['leadId','clientLegalName','scopeSnapshotId','scopeVersion','scopeHash','recommendedContext','amountMinor','currency','deliveryWindow'])if(proposal?.[f]!==sow?.[f])errors.push(`mismatch_${f}`);
 for(const f of ['deliverables','dependencies','assumptions','exclusions','integrations','milestones'])if(!same(proposal?.[f],sow?.[f]))errors.push(`mismatch_${f}`);
 const m=sow?.milestones||[];
 if(m.reduce((s,x)=>s+(x.percent||0),0)!==100)errors.push('milestone_percentages_not_100');
 if(m.reduce((s,x)=>s+(x.amountMinor||0),0)!==sow?.amountMinor)errors.push('milestone_amounts_do_not_equal_total');
 return{ok:errors.length===0,errors:unique(errors)};
}
export function proposalIssuePreflight({proposal,sow,approvals=[],now}){
 const consistency=validateProposalSow(proposal,sow),target={type:'proposal_issue',artifactId:proposal?.id,artifactVersion:proposal?.version,artifactHash:proposal?.contentHash};
 const errors=[...consistency.errors];
 if(!approvals.some(a=>approvalMatches(a,target,now)))errors.push('proposal_issue_approval_missing');
 return{ok:errors.length===0,errors:unique(errors)};
}
