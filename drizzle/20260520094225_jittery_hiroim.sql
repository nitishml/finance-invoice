ALTER TABLE "invoice" ALTER COLUMN "invoice_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "invoice_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "due_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "due_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "payment_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "cancelled_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "invoice" ALTER COLUMN "arreared_date" SET DATA TYPE date;