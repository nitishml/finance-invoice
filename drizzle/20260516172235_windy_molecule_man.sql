ALTER TABLE "invoice" RENAME COLUMN "price" TO "amount";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "tax_amount" TO "cgst";--> statement-breakpoint
ALTER TABLE "invoice" RENAME COLUMN "gst_amount" TO "sgst";