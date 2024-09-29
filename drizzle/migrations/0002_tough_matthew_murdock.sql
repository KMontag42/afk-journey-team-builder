CREATE TABLE `roster_artifacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roster_id` integer NOT NULL,
	`artifact_id` integer NOT NULL,
	`level` integer NOT NULL,
	FOREIGN KEY (`roster_id`) REFERENCES `roster`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `roster_equipment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roster_id` integer NOT NULL,
	`equipment_id` integer NOT NULL,
	`equipment_class` text(255) NOT NULL,
	`arm_level` integer NOT NULL,
	`body_level` integer NOT NULL,
	`head_level` integer NOT NULL,
	`leg_level` integer NOT NULL,
	`ornament_level` integer NOT NULL,
	`weapon_level` integer NOT NULL,
	FOREIGN KEY (`roster_id`) REFERENCES `roster`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `roster_heroes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roster_id` integer NOT NULL,
	`hero_id` integer NOT NULL,
	`ascension` text(255) NOT NULL,
	`equipment` integer NOT NULL,
	FOREIGN KEY (`roster_id`) REFERENCES `roster`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `roster_levels` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roster_id` integer NOT NULL,
	`level_id` integer NOT NULL,
	`level` integer NOT NULL,
	FOREIGN KEY (`roster_id`) REFERENCES `roster`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `roster` RENAME COLUMN `last_update` TO `timestamp`;--> statement-breakpoint

CREATE UNIQUE INDEX `roster_artifacts_roster_id_artifact_id_unique` ON `roster_artifacts` (`roster_id`,`artifact_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `roster_equipment_roster_id_equipment_id_equipment_class_unique` ON `roster_equipment` (`roster_id`,`equipment_id`,`equipment_class`);--> statement-breakpoint
CREATE UNIQUE INDEX `roster_heroes_roster_id_hero_id_unique` ON `roster_heroes` (`roster_id`,`hero_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `roster_levels_roster_id_level_id_unique` ON `roster_levels` (`roster_id`,`level_id`);