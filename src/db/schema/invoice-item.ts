import { createId } from "@/lib/nanoid-gen";
import { relations } from "drizzle-orm";
import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { invoice } from "./";

export const invoiceItem = pgTable("invoice_item", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    invoiceId: text("invoice_id").notNull().references(() => invoice.id),

    order: integer("order").notNull(),
    title: text("title").notNull(),
    description: text("description"),

    price: integer("price").notNull(), //in paisa
    quantity: integer("quantity").notNull(),
    total: integer("total").notNull(), //in paisa

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