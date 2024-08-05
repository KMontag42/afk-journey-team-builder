CREATE TABLE IF NOT EXISTS `formations` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`formation` text(255),
	`artifact` text(255),
	`layout` integer,
	`user_id` text(255),
	`name` text(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`formation_id` integer,
	`user_id` text(255),
	FOREIGN KEY (`formation_id`) REFERENCES `formations`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `votes_formation_id_user_id_unique` ON `votes` (`formation_id`,`user_id`);