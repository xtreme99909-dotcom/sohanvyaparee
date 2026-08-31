ALTER TABLE `payment_webhook_events` ADD `updated_at` text;--> statement-breakpoint
ALTER TABLE `payment_webhook_events` ADD `processing_status` text DEFAULT 'received' NOT NULL;--> statement-breakpoint
ALTER TABLE `payment_webhook_events` ADD `attempts` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `payment_webhook_events` ADD `processed_at` text;--> statement-breakpoint
ALTER TABLE `payment_webhook_events` ADD `last_error` text DEFAULT '' NOT NULL;