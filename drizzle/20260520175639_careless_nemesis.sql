ALTER TABLE "client" RENAME TO "customer";--> statement-breakpoint
ALTER TABLE "customer" DROP CONSTRAINT "client_id_contact_id_fk";
--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."contact_category_enum";--> statement-breakpoint
CREATE TYPE "public"."contact_category_enum" AS ENUM('VENDOR', 'EMPLOYEE', 'CUSTOMER');--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "category" SET DATA TYPE "public"."contact_category_enum" USING "category"::"public"."contact_category_enum";--> statement-breakpoint
ALTER TABLE "customer" ADD CONSTRAINT "customer_id_contact_id_fk" FOREIGN KEY ("id") REFERENCES "public"."contact"("id") ON DELETE no action ON UPDATE no action;