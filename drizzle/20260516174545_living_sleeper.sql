ALTER TABLE "invoice" ALTER COLUMN "amount" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "cgst" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "sgst" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "total" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "invoice_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "due_date" SET DEFAULT now();