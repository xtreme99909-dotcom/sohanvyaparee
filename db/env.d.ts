declare namespace Cloudflare {
  interface Env {
    DB: D1Database;
    STUDIO_OWNER_EMAIL?: string;
    RAZORPAY_KEY_ID?: string;
    RAZORPAY_KEY_SECRET?: string;
    RAZORPAY_WEBHOOK_SECRET?: string;
    RESEND_API_KEY?: string;
    LEAD_NOTIFICATION_EMAIL?: string;
    PAYMENT_NOTIFICATION_EMAIL?: string;
    RESEND_FROM?: string;
    WHATSAPP_ACCESS_TOKEN?: string;
    WHATSAPP_PHONE_NUMBER_ID?: string;
    STUDIO_WHATSAPP_RECIPIENT?: string;
    WHATSAPP_PAYMENT_TEMPLATE?: string;
    WHATSAPP_GRAPH_API_VERSION?: string;
  }
}
