CREATE TYPE "public"."account_enum" AS ENUM('INCOME', 'EXPENSE');--> statement-breakpoint
CREATE TYPE "public"."invoice_status_enum" AS ENUM('CREATED', 'PAID', 'ARREARED', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"hashed_password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"mobile" text NOT NULL,
	"email" text NOT NULL,
	"gstin" text NOT NULL,
	"address" text NOT NULL,
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
	"customer_id" text NOT NULL,
	"account" "account_enum" NOT NULL,
	"status" "invoice_status_enum" NOT NULL,
	"serial" serial NOT NULL,
	"price" integer NOT NULL,
	"tax_amount" integer NOT NULL,
	"gst_amount" integer NOT NULL,
	"total" integer NOT NULL,
	"expected_payment_date" timestamp with time zone NOT NULL,
	"payment_date" timestamp with time zone,
	"cancelled_date" timestamp with time zone,
	"arreared_date" timestamp with time zone,
	"description" text,
	"remarks" text,
	"is_correction" boolean,
	"reference_inv_id" text,
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
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	"total" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_handled_by_user_id_fk" FOREIGN KEY ("handled_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customer_id_customer_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoice_item" ADD CONSTRAINT "invoice_item_invoice_id_invoice_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoice"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_account_user" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_cst_mobile" ON "customer" USING btree ("mobile");--> statement-breakpoint
CREATE INDEX "idx_cst_slug" ON "customer" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_mobile" ON "user" USING btree ("mobile");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_user_email" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_user_active" ON "user" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_session_user" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_inv_customer" ON "invoice" USING btree ("customer_id");--> statement-breakpoint
CREATE INDEX "idx_inv_serial" ON "invoice" USING btree ("serial");--> statement-breakpoint
CREATE INDEX "idx_inv_account" ON "invoice" USING btree ("account");--> statement-breakpoint
CREATE INDEX "idx_inv_status" ON "invoice" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_inv_date_created" ON "invoice" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_inv_date_paid" ON "invoice" USING btree ("payment_date");--> statement-breakpoint
CREATE INDEX "idx_inv_item_inv" ON "invoice_item" USING btree ("invoice_id");