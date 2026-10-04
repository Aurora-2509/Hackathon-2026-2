CREATE TABLE `clothing_items` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`original_category` text NOT NULL,
	`color` text DEFAULT 'unknown' NOT NULL,
	`style` text DEFAULT 'unknown' NOT NULL,
	`image_url` text,
	`product_url` text,
	`price` real,
	`currency` text DEFAULT 'USD' NOT NULL,
	`source` text DEFAULT 'mvasil/polyvore-outfits' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_clothing_category_id` ON `clothing_items` (`category`,`id`);