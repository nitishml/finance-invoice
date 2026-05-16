CREATE TYPE "public"."contact_category_enum" AS ENUM('VENDOR', 'INDUVIDUAL');--> statement-breakpoint
CREATE TABLE "contact" (
	"id" text PRIMARY KEY NOT NULL,
	"category" "contact_category_enum",
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"mobile" text NOT NULL,
	"email" text NOT NULL,
	"gstin" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"zipcode" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_customer_id_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."invoice_status_enum";--> statement-breakpoint
CREATE TYPE "public"."invoice_status_enum" AS ENUM('DRAFT', 'EXPECTED', 'PAID', 'ARREARED', 'CANCELLED');--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "status" SET DATA TYPE "public"."invoice_status_enum" USING "status"::"public"."invoice_status_enum";--> statement-breakpoint
DROP INDEX "idx_inv_customer";--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "contact_id" text NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_ct_mobile" ON "contact" USING btree ("mobile");--> statement-breakpoint
CREATE INDEX "idx_ct_slug" ON "contact" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_contact_id_contact_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_inv_contact" ON "invoice" USING btree ("contact_id");--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "customer_id";