CREATE TABLE "Cat" (
	"created_at" timestamp NOT NULL,
	"id" uuid PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"born_date" timestamp NOT NULL,
	"name" text NOT NULL
);
