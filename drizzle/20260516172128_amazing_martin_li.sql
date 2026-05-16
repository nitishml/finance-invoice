ALTER TABLE "invoice_item" ADD COLUMN "rate" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD COLUMN "gst_amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD COLUMN "gst_ratio" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD COLUMN "cgst_amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD COLUMN "cgst_ratio" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD COLUMN "sgst_amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD COLUMN "sgst_ratio" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD COLUMN "is_symmetric_gst" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "invoice_item" DROP COLUMN "price";