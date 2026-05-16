CREATE TYPE "public"."invoice_category_enum" AS ENUM('SALARY', 'SERVICE', 'RENT', 'UTILITIES', 'MISC', 'INCOME');--> statement-breakpoint
DROP INDEX "idx_inv_serial";--> statement-breakpoint
DROP INDEX "idx_inv_date_created";--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "invoice_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "invoice_date" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "invoice_category" "invoice_category_enum";--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "is_recurring" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_inv_no" ON "invoice" USING btree ("invoice_number");--> statement-breakpoint
CREATE INDEX "idx_inv_date_due" ON "invoice" USING btree ("due_date");--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "serial";--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "expense_type";--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "is_correction";--> statement-breakpoint
DROP TYPE "public"."expense_type_enum";