ALTER TABLE "invoice_item" ADD COLUMN "txn_id" text;--> statement-breakpoint
ALTER TABLE "invoice" DROP COLUMN "txn_id";