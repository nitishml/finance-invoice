import { createId } from "@/lib/nanoid-gen";
import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, real, text, timestamp } from "drizzle-orm/pg-core";
import { invoice } from "./";

export const invoiceItem = pgTable("invoice_item", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    invoiceId: text("invoice_id").notNull().references(() => invoice.id),

    order: integer("order").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    txnId: text("txn_id"),

    rate: integer("rate").notNull(), // in paisa
    quantity: integer("quantity").notNull(),
    amount: integer("amount").notNull(),

    gstAmount: integer("gst_amount").notNull(), // in paisa
    gstRatio: real("gst_ratio").notNull(), // out of 100
    cgstAmount: integer("cgst_amount").notNull(), // in paisa
    cgstRatio: real("cgst_ratio").notNull(), // out of 100
    sgstAmount: integer("sgst_amount").notNull(), // in paisa
    sgstRatio: real("sgst_ratio").notNull(), // out of 100
    isSymmetricGst: boolean("is_symmetric_gst").notNull().default(true),

    total: integer("total").notNull(), // in paisa

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
},
    (table) => [
        index('idx_inv_item_inv').on(table.invoiceId),
    ]
)
export const invoiceItemRelations = relations(invoiceItem, ({ many, one }) => ({
    invoice: one(invoice, {
        fields: [invoiceItem.invoiceId],
        references: [invoice.id],
    }),
}))