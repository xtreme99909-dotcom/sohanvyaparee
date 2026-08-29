CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`company` text NOT NULL,
	`project_type` text NOT NULL,
	`budget` text NOT NULL,
	`timing` text NOT NULL,
	`goal` text NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`consent` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_leads_status_created_at` ON `leads` (`status`,`created_at`);