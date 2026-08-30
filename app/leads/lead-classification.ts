export type LeadKind = 'direct' | 'partner';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export type ReplyLead = {
  name: string;
  email: string;
  company: string;
  project_type: string;
  budget: string;
  timing: string;
  goal: string;
};

export function classifyLead(projectType: string): LeadKind {
  return projectType.trim().toLowerCase().startsWith('partner collaboration') ? 'partner' : 'direct';
}

const directDecisions: Record<LeadStatus, string> = {
  new: 'Reply within two working days. Confirm authority, current build status, launch timing and required integrations.',
  contacted: 'Wait for the buyer’s reply. Follow up once only on the saved date, then close or nurture deliberately.',
  qualified: 'Confirm the decision process and prepare a written fixed scope before discussing production or free design work.',
  closed: 'Stop outreach. Reopen only if the buyer returns or a genuinely new business trigger appears.',
};

const partnerDecisions: Record<LeadStatus, string> = {
  new: 'Confirm there is a named opportunity or repeat client pattern, a clean specialty boundary and credible authority, timing and commercial context.',
  contacted: 'Wait for the partner’s reply. Do not chase through another channel, promise referral terms or contact the client independently.',
  qualified: 'Agree client visibility, responsibility, contracting, confidentiality, decision ownership and commercial terms before any introduction or shared work.',
  closed: 'Close the lane without pressure. Reopen only for a genuinely new named opportunity or materially stronger fit.',
};

export function nextDecisionFor(kind: LeadKind, status: LeadStatus) {
  return kind === 'partner' ? partnerDecisions[status] : directDecisions[status];
}

function shortGoal(goal: string) {
  return goal.length > 420 ? `${goal.slice(0, 417).trim()}…` : goal;
}

export function buildLeadReply(lead: ReplyLead) {
  const firstName = lead.name.trim().split(/\s+/)[0] || 'there';
  const goal = shortGoal(lead.goal);

  if (classifyLead(lead.project_type) === 'partner') {
    return {
      subject: `Website collaboration fit · ${lead.company}`,
      body: [
        `Hi ${firstName},`,
        '',
        `Thanks for sharing the collaboration context from ${lead.company}. I read the possible fit as:`,
        '',
        `“${goal}”`,
        '',
        'Before I suggest a collaboration model, could you confirm four things?',
        '1. Is there a named client opportunity now, or a repeat client pattern you expect to encounter?',
        '2. Who owns the client relationship and final approval?',
        '3. What timing and commercial context are already confirmed?',
        '4. Which specialty do you want to retain, and which website responsibilities need one accountable owner?',
        '',
        'If those points align, I can suggest a direct introduction, transparent joint scope or named delivery arrangement. No referral fee, exclusivity, anonymous white-label or client-access assumption is made in advance. Email is enough to establish the boundary; a call is optional.',
        '',
        'Best,',
        'Sohan Vyaparee',
      ].join('\n'),
      direction: 'Qualify the opportunity before partnership terms.',
      signals: ['Client', 'Boundary', 'Commercial'],
    };
  }

  return {
    subject: `Next step for ${lead.company}'s website`,
    body: [
      `Hi ${firstName},`,
      '',
      `Thanks for sharing ${lead.company}'s website project. I read the main priority as:`,
      '',
      `“${goal}”`,
      '',
      'Before I recommend pages or price, could you confirm three things?',
      '1. Are you the person approving the website scope and investment?',
      `2. Is “${lead.timing}” still the working launch window?`,
      '3. Which practical systems must connect at launch—for example forms, booking, commerce, payments, WhatsApp or a CRM?',
      '',
      `Your current brief points to ${lead.project_type.toLowerCase()} with a ${lead.budget} working budget. Once those details are clear, I’ll tell you honestly whether the right starting point is a focused launch, complete business site, integration-led engagement or a custom scope. Email is fine; a call is not required unless it would be useful.`,
      '',
      'Best,',
      'Sohan Vyaparee',
    ].join('\n'),
    direction: 'Qualify before pages or price.',
    signals: ['Authority', 'Launch', 'Systems'],
  };
}
