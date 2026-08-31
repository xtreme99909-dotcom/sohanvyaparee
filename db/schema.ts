import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const leads = sqliteTable(
  'leads',
  {
    id: text('id').primaryKey(),
    createdAt: text('created_at').notNull(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    company: text('company').notNull(),
    projectType: text('project_type').notNull(),
    budget: text('budget').notNull(),
    timing: text('timing').notNull(),
    goal: text('goal').notNull(),
    source: text('source').notNull().default('website'),
    status: text('status').notNull().default('new'),
    ownerNotes: text('owner_notes').notNull().default(''),
    nextActionAt: text('next_action_at'),
    updatedAt: text('updated_at'),
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
    consent: integer('consent', { mode: 'boolean' }).notNull().default(true),
  },
  (table) => [
    index('idx_leads_status_created_at').on(table.status, table.createdAt),
    index('idx_leads_status_next_action_created_at').on(table.status, table.nextActionAt, table.createdAt),
    index('idx_leads_email_created_at').on(table.email, table.createdAt),
  ],
);


export const funnelEvidenceEvents = sqliteTable(
  'funnel_evidence_events',
  {
    id: text('id').primaryKey(),
    createdAt: text('created_at').notNull(),
    occurredAt: text('occurred_at').notNull(),
    eventType: text('event_type').notNull(),
    leadId: text('lead_id').notNull().references(() => leads.id),
    evidenceSource: text('evidence_source').notNull(),
    evidenceRef: text('evidence_ref').notNull(),
    basisJson: text('basis_json').notNull().default('{}'),
    notes: text('notes').notNull().default(''),
    idempotencyKey: text('idempotency_key').notNull(),
    recordedBy: text('recorded_by').notNull(),
  },
  (table) => [
    index('idx_funnel_evidence_lead_type_occurred').on(table.leadId, table.eventType, table.occurredAt),
    index('idx_funnel_evidence_type_occurred').on(table.eventType, table.occurredAt),
    uniqueIndex('idx_funnel_evidence_idempotency').on(table.idempotencyKey),
  ],
);

export const marketingEvents = sqliteTable(
  'marketing_events',
  {
    id: text('id').primaryKey(),
    createdAt: text('created_at').notNull(),
    eventType: text('event_type').notNull(),
    pagePath: text('page_path').notNull(),
    source: text('source').notNull().default('direct'),
    medium: text('medium').notNull().default('none'),
    campaign: text('campaign'),
    referrerHost: text('referrer_host'),
    sessionId: text('session_id').notNull(),
  },
  (table) => [
    index('idx_marketing_events_created_at').on(table.createdAt),
    index('idx_marketing_events_session_type_path').on(table.sessionId, table.eventType, table.pagePath),
    uniqueIndex('idx_marketing_events_unique_session_event_path').on(table.sessionId, table.eventType, table.pagePath),
  ],
);

export const paymentLinks = sqliteTable(
  'payment_links',
  {
    id: text('id').primaryKey(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
    leadId: text('lead_id').notNull().references(() => leads.id),
    provider: text('provider').notNull().default('razorpay'),
    providerLinkId: text('provider_link_id').notNull().unique(),
    referenceId: text('reference_id').notNull().unique(),
    shortUrl: text('short_url').notNull(),
    description: text('description').notNull(),
    amount: integer('amount').notNull(),
    amountPaid: integer('amount_paid').notNull().default(0),
    currency: text('currency').notNull(),
    status: text('status').notNull().default('created'),
    providerPaymentId: text('provider_payment_id'),
    paidAt: text('paid_at'),
    expiresAt: text('expires_at'),
    customerName: text('customer_name'),
    customerEmail: text('customer_email'),
    agreementReference: text('agreement_reference').notNull().default(''),
    scopeVersion: text('scope_version').notNull().default(''),
    deliveryWindow: text('delivery_window').notNull().default(''),
    policyVersion: text('policy_version').notNull().default('30 August 2026'),
    agreementConfirmedAt: text('agreement_confirmed_at'),
    clientPolicyAcceptedAt: text('client_policy_accepted_at'),
    clientPolicyVersion: text('client_policy_version'),
    lastProviderEventAt: text('last_provider_event_at'),
    refundedAmount: integer('refunded_amount').notNull().default(0),
    refundStatus: text('refund_status').notNull().default('none'),
    refundReference: text('refund_reference'),
    notificationStatus: text('notification_status').notNull().default('pending'),
    notificationDetail: text('notification_detail').notNull().default(''),
  },
  (table) => [
    index('idx_payment_links_lead_created_at').on(table.leadId, table.createdAt),
    index('idx_payment_links_status_updated_at').on(table.status, table.updatedAt),
  ],
);

export const paymentWebhookEvents = sqliteTable(
  'payment_webhook_events',
  {
    signature: text('signature').primaryKey(),
    eventId: text('event_id'),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at'),
    eventType: text('event_type').notNull(),
    providerLinkId: text('provider_link_id'),
    processingStatus: text('processing_status').notNull().default('received'),
    attempts: integer('attempts').notNull().default(0),
    processedAt: text('processed_at'),
    processingToken: text('processing_token'),
    leaseExpiresAt: text('lease_expires_at'),
    lastError: text('last_error').notNull().default(''),
  },
  (table) => [
    uniqueIndex('idx_payment_webhook_events_event_id').on(table.eventId),
    index('idx_payment_webhook_events_created_at').on(table.createdAt),
  ],
);
