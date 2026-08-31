export async function getD1() {
  const { env } = await import('cloudflare:workers');
  if (!env.DB) throw new Error('The studio lead database is unavailable.');
  return env.DB;
}

export async function ensureLeadsSchema() {
  const db = await getD1();
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
      owner_notes TEXT NOT NULL DEFAULT '',
      next_action_at TEXT,
      updated_at TEXT,
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
      event_type TEXT NOT NULL,
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
    db.prepare(`DELETE FROM marketing_events WHERE rowid NOT IN (
      SELECT MIN(rowid) FROM marketing_events GROUP BY session_id, event_type, page_path
    )`),
    db.prepare(`CREATE UNIQUE INDEX IF NOT EXISTS idx_marketing_events_unique_session_event_path
      ON marketing_events(session_id, event_type, page_path)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS payment_links (
      id TEXT PRIMARY KEY NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      lead_id TEXT NOT NULL,
      provider TEXT NOT NULL DEFAULT 'razorpay',
      provider_link_id TEXT NOT NULL UNIQUE,
      reference_id TEXT NOT NULL UNIQUE,
      short_url TEXT NOT NULL,
      description TEXT NOT NULL,
      amount INTEGER NOT NULL,
      amount_paid INTEGER NOT NULL DEFAULT 0,
      currency TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'creating' CHECK (status IN ('creating', 'creation_failed', 'created', 'partially_paid', 'paid', 'cancelled', 'expired', 'review_required')),
      provider_payment_id TEXT,
      paid_at TEXT,
      expires_at TEXT,
      customer_name TEXT,
      customer_email TEXT,
      agreement_reference TEXT NOT NULL DEFAULT '',
      scope_version TEXT NOT NULL DEFAULT '',
      delivery_window TEXT NOT NULL DEFAULT '',
      policy_version TEXT NOT NULL DEFAULT '30 August 2026',
      agreement_confirmed_at TEXT,
      client_policy_accepted_at TEXT,
      client_policy_version TEXT,
      last_provider_event_at TEXT,
      refunded_amount INTEGER NOT NULL DEFAULT 0,
      refund_status TEXT NOT NULL DEFAULT 'none',
      refund_reference TEXT,
      notification_status TEXT NOT NULL DEFAULT 'pending',
      notification_detail TEXT NOT NULL DEFAULT '',
      FOREIGN KEY (lead_id) REFERENCES leads(id)
    )`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_payment_links_lead_created_at
      ON payment_links(lead_id, created_at)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_payment_links_status_updated_at
      ON payment_links(status, updated_at)`),
    db.prepare(`CREATE TABLE IF NOT EXISTS payment_webhook_events (
      signature TEXT PRIMARY KEY NOT NULL,
      event_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT,
      event_type TEXT NOT NULL,
      provider_link_id TEXT,
      processing_status TEXT NOT NULL DEFAULT 'received',
      attempts INTEGER NOT NULL DEFAULT 0,
      processed_at TEXT,
      processing_token TEXT,
      lease_expires_at TEXT,
      last_error TEXT NOT NULL DEFAULT ''
    )`),
  ]);

  // Older databases constrained marketing events to the original three event types.
  // The API allowlist is the source of truth, so rebuild that legacy table without
  // the stale CHECK constraint before accepting newer funnel diagnostics.
  const marketingTable = await db.prepare(
    "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'marketing_events'",
  ).first<{ sql: string }>();
  if (marketingTable?.sql?.includes('CHECK (event_type IN')) {
    await db.batch([
      db.prepare('DROP TABLE IF EXISTS marketing_events_unconstrained'),
      db.prepare(`CREATE TABLE marketing_events_unconstrained (
        id TEXT PRIMARY KEY NOT NULL,
        created_at TEXT NOT NULL,
        event_type TEXT NOT NULL,
        page_path TEXT NOT NULL,
        source TEXT NOT NULL DEFAULT 'direct',
        medium TEXT NOT NULL DEFAULT 'none',
        campaign TEXT,
        referrer_host TEXT,
        session_id TEXT NOT NULL
      )`),
      db.prepare(`INSERT OR IGNORE INTO marketing_events_unconstrained (
        id, created_at, event_type, page_path, source, medium, campaign, referrer_host, session_id
      )
      SELECT id, created_at, event_type, page_path, source, medium, campaign, referrer_host, session_id
      FROM marketing_events`),
      db.prepare('DROP TABLE marketing_events'),
      db.prepare('ALTER TABLE marketing_events_unconstrained RENAME TO marketing_events'),
      db.prepare(`CREATE INDEX IF NOT EXISTS idx_marketing_events_created_at
        ON marketing_events(created_at)`),
      db.prepare(`CREATE INDEX IF NOT EXISTS idx_marketing_events_session_type_path
        ON marketing_events(session_id, event_type, page_path)`),
      db.prepare(`CREATE UNIQUE INDEX IF NOT EXISTS idx_marketing_events_unique_session_event_path
        ON marketing_events(session_id, event_type, page_path)`),
    ]);
  }

  const leadColumns = await db.prepare('PRAGMA table_info(leads)').all<{ name: string }>();
  const existingColumns = new Set(leadColumns.results.map((column) => column.name));
  const leadMigrations = [];
  if (!existingColumns.has('owner_notes')) {
    leadMigrations.push(db.prepare("ALTER TABLE leads ADD COLUMN owner_notes TEXT NOT NULL DEFAULT ''"));
  }
  if (!existingColumns.has('next_action_at')) {
    leadMigrations.push(db.prepare('ALTER TABLE leads ADD COLUMN next_action_at TEXT'));
  }
  if (!existingColumns.has('updated_at')) {
    leadMigrations.push(db.prepare('ALTER TABLE leads ADD COLUMN updated_at TEXT'));
  }
  if (leadMigrations.length > 0) await db.batch(leadMigrations);

  const paymentColumns = await db.prepare('PRAGMA table_info(payment_links)').all<{ name: string }>();
  const existingPaymentColumns = new Set(paymentColumns.results.map((column) => column.name));
  const paymentMigrations: ReturnType<typeof db.prepare>[] = [];
  const addPaymentColumn = (name: string, statement: string) => {
    if (!existingPaymentColumns.has(name)) paymentMigrations.push(db.prepare(statement));
  };
  addPaymentColumn('expires_at', 'ALTER TABLE payment_links ADD COLUMN expires_at TEXT');
  addPaymentColumn('agreement_reference', "ALTER TABLE payment_links ADD COLUMN agreement_reference TEXT NOT NULL DEFAULT ''");
  addPaymentColumn('scope_version', "ALTER TABLE payment_links ADD COLUMN scope_version TEXT NOT NULL DEFAULT ''");
  addPaymentColumn('delivery_window', "ALTER TABLE payment_links ADD COLUMN delivery_window TEXT NOT NULL DEFAULT ''");
  addPaymentColumn('policy_version', "ALTER TABLE payment_links ADD COLUMN policy_version TEXT NOT NULL DEFAULT '30 August 2026'");
  addPaymentColumn('agreement_confirmed_at', 'ALTER TABLE payment_links ADD COLUMN agreement_confirmed_at TEXT');
  addPaymentColumn('client_policy_accepted_at', 'ALTER TABLE payment_links ADD COLUMN client_policy_accepted_at TEXT');
  addPaymentColumn('client_policy_version', 'ALTER TABLE payment_links ADD COLUMN client_policy_version TEXT');
  addPaymentColumn('last_provider_event_at', 'ALTER TABLE payment_links ADD COLUMN last_provider_event_at TEXT');
  addPaymentColumn('refunded_amount', 'ALTER TABLE payment_links ADD COLUMN refunded_amount INTEGER NOT NULL DEFAULT 0');
  addPaymentColumn('refund_status', "ALTER TABLE payment_links ADD COLUMN refund_status TEXT NOT NULL DEFAULT 'none'");
  addPaymentColumn('refund_reference', 'ALTER TABLE payment_links ADD COLUMN refund_reference TEXT');
  if (paymentMigrations.length > 0) await db.batch(paymentMigrations);

  const webhookColumns = await db.prepare('PRAGMA table_info(payment_webhook_events)').all<{ name: string }>();
  const existingWebhookColumns = new Set(webhookColumns.results.map((column) => column.name));
  const webhookMigrations: ReturnType<typeof db.prepare>[] = [];
  const addWebhookColumn = (name: string, statement: string) => {
    if (!existingWebhookColumns.has(name)) webhookMigrations.push(db.prepare(statement));
  };
  addWebhookColumn('event_id', 'ALTER TABLE payment_webhook_events ADD COLUMN event_id TEXT');
  addWebhookColumn('updated_at', 'ALTER TABLE payment_webhook_events ADD COLUMN updated_at TEXT');
  addWebhookColumn('processing_status', "ALTER TABLE payment_webhook_events ADD COLUMN processing_status TEXT NOT NULL DEFAULT 'received'");
  addWebhookColumn('attempts', 'ALTER TABLE payment_webhook_events ADD COLUMN attempts INTEGER NOT NULL DEFAULT 0');
  addWebhookColumn('processed_at', 'ALTER TABLE payment_webhook_events ADD COLUMN processed_at TEXT');
  addWebhookColumn('processing_token', 'ALTER TABLE payment_webhook_events ADD COLUMN processing_token TEXT');
  addWebhookColumn('lease_expires_at', 'ALTER TABLE payment_webhook_events ADD COLUMN lease_expires_at TEXT');
  addWebhookColumn('last_error', "ALTER TABLE payment_webhook_events ADD COLUMN last_error TEXT NOT NULL DEFAULT ''");
  if (webhookMigrations.length > 0) await db.batch(webhookMigrations);
  await db.prepare('CREATE UNIQUE INDEX IF NOT EXISTS idx_payment_webhook_events_event_id ON payment_webhook_events(event_id)').run();
  await db.prepare('CREATE INDEX IF NOT EXISTS idx_payment_webhook_events_created_at ON payment_webhook_events(created_at)').run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_leads_status_next_action_created_at
    ON leads(status, next_action_at, created_at)`).run();
  await db.prepare('PRAGMA optimize').run();
  return db;
}
