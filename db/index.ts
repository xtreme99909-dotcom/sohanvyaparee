import { env } from 'cloudflare:workers';

export function getD1() {
  if (!env.DB) throw new Error('The studio lead database is unavailable.');
  return env.DB;
}

export async function ensureLeadsSchema() {
  const db = getD1();
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      project_type TEXT NOT NULL,
      budget TEXT NOT NULL,
      timing TEXT NOT NULL,
      goal TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'website',
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      consent INTEGER NOT NULL DEFAULT 1
    )`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_leads_status_created_at
      ON leads(status, created_at)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_leads_email_created_at
      ON leads(email, created_at)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS marketing_events (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'enquiry_click', 'brief_start')),
      page_path TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'direct',
      medium TEXT NOT NULL DEFAULT 'none',
      campaign TEXT,
      referrer_host TEXT,
      session_id TEXT NOT NULL
    )`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_marketing_events_created_at
      ON marketing_events(created_at)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_marketing_events_session_type_path
      ON marketing_events(session_id, event_type, page_path)`),
  ]);
  await db.prepare('PRAGMA optimize').run();
  return db;
}
