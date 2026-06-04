ALTER TYPE "public"."account_enum" RENAME TO "invoice_type_enum";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "account" TO "invoice_type";--> statement-breakpoint
DROP INDEX "idx_inv_account";--> statement-breakpoint
CREATE INDEX "idx_inv_type" ON "invoice" USING btree ("invoice_type");