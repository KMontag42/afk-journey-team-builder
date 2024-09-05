CREATE TABLE `roster_equipment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`roster_id` integer,
	`equipment_id` integer,
	`equipment_class` text(255),
	`arm_level` integer,
	`body_level` integer,
	`head_level` integer,
	`leg_level` integer,
	`ornament_level` integer,
	`weapon_level` integer,
	FOREIGN KEY (`roster_id`) REFERENCES `roster`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roster_equipment_roster_id_equipment_id_equipment_class_unique` ON `roster_equipment` (`roster_id`,`equipment_id`,`equipment_class`);