CREATE TYPE "public"."account_enum" AS ENUM('INCOME', 'EXPENSE');--> statement-breakpoint
CREATE TYPE "public"."contact_category_enum" AS ENUM('VENDOR', 'INDUVIDUAL', 'EMPLOYEE');--> statement-breakpoint
CREATE TYPE "public"."invoice_category_enum" AS ENUM('SALARY', 'SERVICE', 'RENT', 'UTILITIES', 'MISC', 'INCOME');--> statement-breakpoint
CREATE TYPE "public"."invoice_status_enum" AS ENUM('DRAFT', 'EXPECTED', 'PAID', 'ARREARED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"hashed_password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact" (
	"id" text PRIMARY KEY NOT NULL,
	"category" "contact_category_enum",
	"is_expense_contact" boolean DEFAULT false NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"mobile" text NOT NULL,
	"email" text NOT NULL,
	"gstin" text,
	"address" text NOT NULL,
	"address_2" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"country" text NOT NULL,
	"zipcode" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"mobile" text NOT NULL,
	"email" text NOT NULL,
	"is_active" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_mobile_unique" UNIQUE("mobile"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"device_hash" text,
	"device_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "invoice" (
	"id" text PRIMARY KEY NOT NULL,
	"handled_by" text NOT NULL,
	"contact_id" text NOT NULL,
	"account" "account_enum" NOT NULL,
	"status" "invoice_status_enum" NOT NULL,
	"invoice_number" text NOT NULL,
	"invoice_serial" integer NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"cgst" integer DEFAULT 0 NOT NULL,
	"sgst" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"invoice_date" timestamp with time zone DEFAULT now() NOT NULL,
	"due_date" timestamp with time zone DEFAULT now() NOT NULL,
	"payment_date" timestamp with time zone,
	"cancelled_date" timestamp with time zone,
	"arreared_date" timestamp with time zone,
	"invoice_category" "invoice_category_enum",
	"description" text,
	"remarks" text,
	"reference_inv_id" text,
	"is_recurring" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_item" (
	"id" text PRIMARY KEY NOT NULL,
	"invoice_id" text NOT NULL,
	"order" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"rate" integer NOT NULL,
	"quantity" integer NOT NULL,
	"amount" integer NOT NULL,
	"gst_amount" integer NOT NULL,
	"gst_ratio" real NOT NULL,
	"cgst_amount" integer NOT NULL,
	"cgst_ratio" real NOT NULL,
	"sgst_amount" integer NOT NULL,
	"sgst_ratio" real NOT NULL,
	"is_symmetric_gst" boolean DEFAULT true NOT NULL,
	"total" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_handled_by_user_id_fk" FOREIGN KEY ("handled_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_contact_id_contact_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD CONSTRAINT "invoice_item_invoice_id_invoice_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoice"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_account_user" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_ct_mobile" ON "contact" USING btree ("mobile");--> statement-breakpoint
CREATE INDEX "idx_ct_slug" ON "contact" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_mobile" ON "user" USING btree ("mobile");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_email" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_user_active" ON "user" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_session_user" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_inv_contact" ON "invoice" USING btree ("contact_id");--> statement-breakpoint
CREATE INDEX "idx_inv_no" ON "invoice" USING btree ("invoice_number");--> statement-breakpoint
CREATE INDEX "idx_inv_account" ON "invoice" USING btree ("account");--> statement-breakpoint
CREATE INDEX "idx_inv_status" ON "invoice" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_inv_date_due" ON "invoice" USING btree ("due_date");--> statement-breakpoint
CREATE INDEX "idx_inv_date_paid" ON "invoice" USING btree ("payment_date");--> statement-breakpoint
CREATE INDEX "idx_inv_item_inv" ON "invoice_item" USING btree ("invoice_id");