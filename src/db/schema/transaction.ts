import { relations } from "drizzle-orm";
import { boolean, date, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user, financialAccount } from "./";
import { createId } from "@/lib/nanoid-gen";

// invoice number config: GS{serial}-A

export const transaction = pgTable("transaction", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    handledBy: text("handled_by").notNull().references(() => user.id),
    debitAccountId: text("debit_account_id").notNull().references(() => financialAccount.id),
    creditAccountId: text("credit_account_id").notNull().references(() => financialAccount.id),

    transactionNumber: text("transaction_number").notNull(),
    transactionSerial: integer("transaction_serial").notNull(), //used to fetch the next number and sorting

    amount: integer("amount").notNull().default(0), //in paisa

    transactionDate: date('transaction_date', { mode: 'date' }).notNull().defaultNow(),

    description: text("description"),
    remarks: text("remarks"),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index("idx_tx_dr_acc").on(table.debitAccountId),
    index("idx_tx_cr_acc").on(table.creditAccountId),

    // date columns
    index("idx_tx_date").on(table.transactionDate),
])

export const transactionRelations = relations(transaction, ({ one, many }) => ({
    debitAccount: one(financialAccount, {
        fields: [transaction.debitAccountId],
        references: [financialAccount.id],
    }),
    creditAccount: one(financialAccount, {
        fields: [transaction.creditAccountId],
        references: [financialAccount.id],
    }),
}));
