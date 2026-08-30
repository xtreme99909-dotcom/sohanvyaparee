import { env } from 'cloudflare:workers';

export type PaymentAlert = {
  amountLabel: string;
  clientName: string;
  clientEmail: string;
  description: string;
  referenceId: string;
};

type NotificationResult = {
  channel: 'email' | 'whatsapp';
  state: 'sent' | 'not_configured' | 'failed';
  detail: string;
};

async function sendEmail(alert: PaymentAlert): Promise<NotificationResult> {
  if (!env.RESEND_API_KEY || !env.PAYMENT_NOTIFICATION_EMAIL || !env.RESEND_FROM) {
    return { channel: 'email', state: 'not_configured', detail: 'Email alert is not connected.' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: [env.PAYMENT_NOTIFICATION_EMAIL],
      subject: `Payment received · ${alert.amountLabel}`,
      text: [
        `A provider-verified payment was received from ${alert.clientName}.`,
        `Amount: ${alert.amountLabel}`,
        `Reference: ${alert.referenceId}`,
        `Milestone: ${alert.description}`,
        `Client email: ${alert.clientEmail || 'Not supplied'}`,
        'Open the private studio desk to review the recorded payment before beginning the next milestone.',
      ].join('\n'),
    }),
  });

  if (!response.ok) {
    return { channel: 'email', state: 'failed', detail: `Email provider returned ${response.status}.` };
  }
  return { channel: 'email', state: 'sent', detail: 'Owner email alert sent.' };
}

async function sendWhatsApp(alert: PaymentAlert): Promise<NotificationResult> {
  const version = env.WHATSAPP_GRAPH_API_VERSION;
  if (!env.WHATSAPP_ACCESS_TOKEN || !env.WHATSAPP_PHONE_NUMBER_ID || !env.STUDIO_WHATSAPP_RECIPIENT || !env.WHATSAPP_PAYMENT_TEMPLATE || !version) {
    return { channel: 'whatsapp', state: 'not_configured', detail: 'WhatsApp Business alert is not connected.' };
  }

  const response = await fetch(`https://graph.facebook.com/${version}/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.WHATSAPP_ACCESS_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: env.STUDIO_WHATSAPP_RECIPIENT,
      type: 'template',
      template: {
        name: env.WHATSAPP_PAYMENT_TEMPLATE,
        language: { code: 'en' },
        components: [{
          type: 'body',
          parameters: [
            { type: 'text', text: alert.amountLabel },
            { type: 'text', text: alert.clientName },
            { type: 'text', text: alert.referenceId },
          ],
        }],
      },
    }),
  });

  if (!response.ok) {
    return { channel: 'whatsapp', state: 'failed', detail: `WhatsApp provider returned ${response.status}.` };
  }
  return { channel: 'whatsapp', state: 'sent', detail: 'WhatsApp payment alert sent.' };
}

export async function notifyOwnerOfPayment(alert: PaymentAlert) {
  const settled = await Promise.allSettled([sendEmail(alert), sendWhatsApp(alert)]);
  return settled.map<NotificationResult>((result, index) => {
    if (result.status === 'fulfilled') return result.value;
    return {
      channel: index === 0 ? 'email' : 'whatsapp',
      state: 'failed',
      detail: 'The notification request failed safely.',
    };
  });
}
