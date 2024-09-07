CREATE TABLE `roster_artifacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roster_id` integer,
	`artifact_id` integer,
	`level` integer,
	FOREIGN KEY (`roster_id`) REFERENCES `roster`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `roster` ADD `timestamp` text DEFAULT (current_timestamp) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `roster_artifacts_roster_id_artifact_id_unique` ON `roster_artifacts` (`roster_id`,`artifact_id`);--> statement-breakpoint
ALTER TABLE `roster` DROP COLUMN `last_update`;