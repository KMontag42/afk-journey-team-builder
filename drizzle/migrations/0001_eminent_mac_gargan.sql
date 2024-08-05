CREATE TABLE `roster` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`last_update` integer,
	`user_id` text(255)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roster_user_id_unique` ON `roster` (`user_id`);