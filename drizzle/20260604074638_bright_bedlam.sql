CREATE TYPE "public"."account_type_enum" AS ENUM('ASSET', 'LIABILITY', 'CAPITAL', 'REVENUE', 'EXPENSE');--> statement-breakpoint
CREATE TABLE "financial_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_type" "account_type_enum" NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"is_active" boolean NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "financial_account_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "transaction" (
	"id" text PRIMARY KEY NOT NULL,
	"handled_by" text NOT NULL,
	"debit_account_id" text NOT NULL,
	"credit_account_id" text NOT NULL,
	"transaction_number" text NOT NULL,
	"transaction_serial" integer NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"cgst" integer DEFAULT 0 NOT NULL,
	"sgst" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"transaction_date" date DEFAULT now() NOT NULL,
	"description" text,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_handled_by_user_id_fk" FOREIGN KEY ("handled_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_debit_account_id_financial_account_id_fk" FOREIGN KEY ("debit_account_id") REFERENCES "public"."financial_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_credit_account_id_financial_account_id_fk" FOREIGN KEY ("credit_account_id") REFERENCES "public"."financial_account"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_fin_acc_title" ON "financial_account" USING btree ("title");--> statement-breakpoint
CREATE INDEX "idx_fin_acc_type" ON "financial_account" USING btree ("account_type");--> statement-breakpoint
CREATE INDEX "idx_tx_dr_acc" ON "transaction" USING btree ("debit_account_id");--> statement-breakpoint
CREATE INDEX "idx_tx_cr_acc" ON "transaction" USING btree ("credit_account_id");--> statement-breakpoint
CREATE INDEX "idx_tx_date" ON "transaction" USING btree ("transaction_date");