CREATE TYPE "public"."expense_type_enum" AS ENUM('SALARY', 'SERVICE', 'RENT', 'UTILITIES', 'MISC');--> statement-breakpoint
ALTER TABLE "invoice" ADD COLUMN "expense_type" "expense_type_enum";