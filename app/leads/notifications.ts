import { env } from 'cloudflare:workers';

export type LeadAlert = {
  referenceId: string;
  name: string;
  company: string;
  projectType: string;
  budget: string;
  timing: string;
  studioInboxUrl: string;
};

export type LeadNotificationResult = {
  state: 'sent' | 'not_configured' | 'failed';
  detail: string;
};

export async function notifyOwnerOfLead(alert: LeadAlert): Promise<LeadNotificationResult> {
  if (!env.RESEND_API_KEY || !env.LEAD_NOTIFICATION_EMAIL || !env.RESEND_FROM) {
    return { state: 'not_configured', detail: 'Lead email alert is not connected.' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM,
        to: [env.LEAD_NOTIFICATION_EMAIL],
        subject: `New private project brief · ${alert.company}`,
        text: [
          'A new project brief was stored in the private SP Studios lead inbox.',
          `Reference: ${alert.referenceId}`,
          `Contact: ${alert.name}`,
          `Company: ${alert.company}`,
          `Project: ${alert.projectType}`,
          `Budget: ${alert.budget}`,
          `Timing: ${alert.timing}`,
          `Review securely: ${alert.studioInboxUrl}`,
          'The full project goal and contact details remain inside the protected lead desk.',
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      return { state: 'failed', detail: `Email provider returned ${response.status}.` };
    }
    return { state: 'sent', detail: 'Owner lead alert sent.' };
  } catch {
    return { state: 'failed', detail: 'The lead alert request failed safely.' };
  }
}
