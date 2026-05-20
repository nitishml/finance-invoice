ALTER TABLE "contact" ADD COLUMN "cin" text NOT NULL;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "pan" text NOT NULL;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "state_code" text NOT NULL;--> statement-breakpoint
ALTER TABLE "contact" ADD COLUMN "currency_code" text DEFAULT 'INR' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact" DROP COLUMN "is_expense_contact";