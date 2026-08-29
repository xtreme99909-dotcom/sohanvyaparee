CREATE TABLE IF NOT EXISTS `marketing_events` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`event_type` text NOT NULL,
	`page_path` text NOT NULL,
	`source` text DEFAULT 'direct' NOT NULL,
	`medium` text DEFAULT 'none' NOT NULL,
	`campaign` text,
	`referrer_host` text,
	`session_id` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_marketing_events_created_at` ON `marketing_events` (`created_at`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_marketing_events_session_type_path` ON `marketing_events` (`session_id`,`event_type`,`page_path`);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `idx_marketing_events_unique_session_event_path` ON `marketing_events` (`session_id`,`event_type`,`page_path`);--> statement-breakpoint
ALTER TABLE `leads` ADD `owner_notes` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `leads` ADD `next_action_at` text;--> statement-breakpoint
ALTER TABLE `leads` ADD `updated_at` text;--> statement-breakpoint
CREATE INDEX `idx_leads_status_next_action_created_at` ON `leads` (`status`,`next_action_at`,`created_at`);
