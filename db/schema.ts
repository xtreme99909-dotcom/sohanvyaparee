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
