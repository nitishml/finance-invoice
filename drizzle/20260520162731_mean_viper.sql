CREATE TABLE "client" (
	"id" text PRIMARY KEY NOT NULL,
	"poc_name" text,
	"poc_contact" text,
	"poc_email" text,
	"website_url" text,
	"gstin" text,
	"cin" text,
	"pan" text,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employee" (
	"id" text PRIMARY KEY NOT NULL,
	"designation" text NOT NULL,
	"department" text NOT NULL,
	"alternate_contact" text,
	"official_email" text,
	"contactAddress" text,
	"adhaar" text,
	"pan" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vendor" (
	"id" text PRIMARY KEY NOT NULL,
	"poc_name" text,
	"poc_contact" text,
	"poc_email" text,
	"website_url" text,
	"gstin" text,
	"cin" text,
	"pan" text,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."contact_category_enum";--> statement-breakpoint
CREATE TYPE "public"."contact_category_enum" AS ENUM('VENDOR', 'CLIENT', 'EMPLOYEE');--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "category" SET DATA TYPE "public"."contact_category_enum" USING "category"::"public"."contact_category_enum";--> statement-breakpoint
ALTER TABLE "client" ADD CONSTRAINT "client_id_contact_id_fk" FOREIGN KEY ("id") REFERENCES "public"."contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_id_contact_id_fk" FOREIGN KEY ("id") REFERENCES "public"."contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_id_contact_id_fk" FOREIGN KEY ("id") REFERENCES "public"."contact"("id") ON DELETE no action ON UPDATE no action;