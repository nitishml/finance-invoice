ALTER TYPE "public"."contact_category_enum" ADD VALUE 'CUSTOMER';--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "category" SET NOT NULL;