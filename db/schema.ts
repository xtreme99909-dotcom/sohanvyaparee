import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
    consent: integer('consent', { mode: 'boolean' }).notNull().default(true),
  },
  (table) => [
    index('idx_leads_status_created_at').on(table.status, table.createdAt),
    index('idx_leads_email_created_at').on(table.email, table.createdAt),
  ],
);
