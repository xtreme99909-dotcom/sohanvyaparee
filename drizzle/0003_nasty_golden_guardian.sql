PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `payment_links` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`lead_id` text NOT NULL,
	`provider` text DEFAULT 'razorpay' NOT NULL,
	`provider_link_id` text NOT NULL,
	`reference_id` text NOT NULL,
	`short_url` text NOT NULL,
	`description` text NOT NULL,
	`amount` integer NOT NULL,
	`amount_paid` integer DEFAULT 0 NOT NULL,
	`currency` text NOT NULL,
	`status` text DEFAULT 'created' NOT NULL,
	`provider_payment_id` text,
	`paid_at` text,
	`customer_name` text,
	`customer_email` text,
	`notification_status` text DEFAULT 'pending' NOT NULL,
	`notification_detail` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS `__new_payment_links`;
--> statement-breakpoint
CREATE TABLE `__new_payment_links` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`lead_id` text NOT NULL,
	`provider` text DEFAULT 'razorpay' NOT NULL,
	`provider_link_id` text NOT NULL,
	`reference_id` text NOT NULL,
	`short_url` text NOT NULL,
	`description` text NOT NULL,
	`amount` integer NOT NULL,
	`amount_paid` integer DEFAULT 0 NOT NULL,
	`currency` text NOT NULL,
	`status` text DEFAULT 'created' NOT NULL,
	`provider_payment_id` text,
	`paid_at` text,
	`expires_at` text,
	`customer_name` text,
	`customer_email` text,
	`agreement_reference` text DEFAULT '' NOT NULL,
	`scope_version` text DEFAULT '' NOT NULL,
	`delivery_window` text DEFAULT '' NOT NULL,
	`policy_version` text DEFAULT '30 August 2026' NOT NULL,
	`agreement_confirmed_at` text,
	`client_policy_accepted_at` text,
	`client_policy_version` text,
	`last_provider_event_at` text,
	`refunded_amount` integer DEFAULT 0 NOT NULL,
	`refund_status` text DEFAULT 'none' NOT NULL,
	`refund_reference` text,
	`notification_status` text DEFAULT 'pending' NOT NULL,
	`notification_detail` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`lead_id`) REFERENCES `leads`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_payment_links` (
	`id`, `created_at`, `updated_at`, `lead_id`, `provider`, `provider_link_id`, `reference_id`,
	`short_url`, `description`, `amount`, `amount_paid`, `currency`, `status`, `provider_payment_id`,
	`paid_at`, `customer_name`, `customer_email`, `notification_status`, `notification_detail`
) SELECT
	`id`, `created_at`, `updated_at`, `lead_id`, `provider`, `provider_link_id`, `reference_id`,
	`short_url`, `description`, `amount`, `amount_paid`, `currency`, `status`, `provider_payment_id`,
	`paid_at`, `customer_name`, `customer_email`, `notification_status`, `notification_detail`
FROM `payment_links`;
--> statement-breakpoint
DROP TABLE `payment_links`;
--> statement-breakpoint
ALTER TABLE `__new_payment_links` RENAME TO `payment_links`;
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_links_provider_link_id_unique` ON `payment_links` (`provider_link_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_links_reference_id_unique` ON `payment_links` (`reference_id`);
--> statement-breakpoint
CREATE INDEX `idx_payment_links_lead_created_at` ON `payment_links` (`lead_id`,`created_at`);
--> statement-breakpoint
CREATE INDEX `idx_payment_links_status_updated_at` ON `payment_links` (`status`,`updated_at`);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `payment_webhook_events` (
	`signature` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`event_type` text NOT NULL,
	`provider_link_id` text
);
--> statement-breakpoint
DROP TABLE IF EXISTS `__new_payment_webhook_events`;
--> statement-breakpoint
CREATE TABLE `__new_payment_webhook_events` (
	`signature` text PRIMARY KEY NOT NULL,
	`event_id` text,
	`created_at` text NOT NULL,
	`event_type` text NOT NULL,
	`provider_link_id` text
);
--> statement-breakpoint
INSERT INTO `__new_payment_webhook_events` (`signature`, `created_at`, `event_type`, `provider_link_id`)
SELECT `signature`, `created_at`, `event_type`, `provider_link_id` FROM `payment_webhook_events`;
--> statement-breakpoint
DROP TABLE `payment_webhook_events`;
--> statement-breakpoint
ALTER TABLE `__new_payment_webhook_events` RENAME TO `payment_webhook_events`;
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_payment_webhook_events_event_id` ON `payment_webhook_events` (`event_id`);
--> statement-breakpoint
CREATE INDEX `idx_payment_webhook_events_created_at` ON `payment_webhook_events` (`created_at`);
--> statement-breakpoint
PRAGMA foreign_keys=ON;
