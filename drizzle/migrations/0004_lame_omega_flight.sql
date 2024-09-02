CREATE TABLE `roster_heroes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roster_id` integer,
	`hero_id` integer,
	`ascension` text(255),
	`equipment` integer,
	FOREIGN KEY (`roster_id`) REFERENCES `roster`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roster_heroes_roster_id_hero_id_unique` ON `roster_heroes` (`roster_id`,`hero_id`);