import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user, customer, accountEnum, invoiceStatusEnum, invoiceItem } from "./";
import { createId } from "@/lib/nanoid-gen";

export const invoice = pgTable("invoice", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    handledBy: text("handled_by").notNull().references(() => user.id),
    customerId: text("customer_id").notNull().references(() => customer.id),

    account: accountEnum("account").notNull(),
    status: invoiceStatusEnum("status").notNull(),
    serialNumber: serial("serial").notNull(),

    price: integer("price").notNull(), //in paisa
    taxAmount: integer("tax_amount").notNull(), //in paisa
    gstAmount: integer("gst_amount").notNull(), //in paisa
    total: integer("total").notNull(), //in paisa

    expectedPaymentDate: timestamp('expected_payment_date', { mode: 'date', withTimezone: true }).notNull(),
    paymentDate: timestamp('payment_date', { mode: 'date', withTimezone: true }),
    cancelledDate: timestamp('cancelled_date', { mode: 'date', withTimezone: true }),
    arrearedDate: timestamp('arreared_date', { mode: 'date', withTimezone: true }),

    description: text("description"),
    remarks: text("remarks"),

    isCorrection: boolean("is_correction"), // if this invoice is correction another
    referenceInvId: text("reference_inv_id"), // for referring to corrected invoice

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index("idx_inv_customer").on(table.customerId),
    index("idx_inv_serial").on(table.serialNumber),
    index("idx_inv_account").on(table.account),
    index("idx_inv_status").on(table.status),

    // date columns
    index("idx_inv_date_created").on(table.createdAt),
    index("idx_inv_date_paid").on(table.paymentDate),
])

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
    handler: one(user, {
        fields: [invoice.handledBy],
        references: [user.id],
    }),
    customer: one(customer, {
        fields: [invoice.customerId],
        references: [customer.id],
    }),
    items: many(invoiceItem)
}));
