CREATE TABLE `funnel_evidence_events` (
  `id` text PRIMARY KEY NOT NULL,
  `created_at` text NOT NULL,
  `occurred_at` text NOT NULL,
  `event_type` text NOT NULL,
  `lead_id` text NOT NULL,
  `evidence_source` text NOT NULL,
  `evidence_ref` text NOT NULL,
  `basis_json` text DEFAULT '{}' NOT NULL,
  `notes` text DEFAULT '' NOT NULL,
  `idempotency_key` text NOT NULL,
  `recorded_by` text NOT NULL,
  FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_funnel_evidence_lead_type_occurred` ON `funnel_evidence_events` (`lead_id`,`event_type`,`occurred_at`);
--> statement-breakpoint
CREATE INDEX `idx_funnel_evidence_type_occurred` ON `funnel_evidence_events` (`event_type`,`occurred_at`);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_funnel_evidence_idempotency` ON `funnel_evidence_events` (`idempotency_key`);
--> statement-breakpoint
CREATE TRIGGER `funnel_evidence_events_no_update`
BEFORE UPDATE ON `funnel_evidence_events`
BEGIN
  SELECT RAISE(ABORT, 'funnel evidence is append-only');
END;
--> statement-breakpoint
CREATE TRIGGER `funnel_evidence_events_no_delete`
BEFORE DELETE ON `funnel_evidence_events`
BEGIN
  SELECT RAISE(ABORT, 'funnel evidence is append-only');
END;
