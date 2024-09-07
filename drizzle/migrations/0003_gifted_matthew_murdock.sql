CREATE TABLE `roster_levels` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roster_id` integer,
	`level_id` integer,
	`level` integer,
	FOREIGN KEY (`roster_id`) REFERENCES `roster`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roster_levels_roster_id_level_id_unique` ON `roster_levels` (`roster_id`,`level_id`);