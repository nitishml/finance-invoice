import { relations } from "drizzle-orm";
import { boolean, index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user, accountEnum, invoiceStatusEnum, invoiceItem, contact, invoiceCategoryEnum } from "./";
import { createId } from "@/lib/nanoid-gen";

// invoice number config: GS{serial}-A

export const invoice = pgTable("invoice", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    handledBy: text("handled_by").notNull().references(() => user.id),
    contactId: text("contact_id").notNull().references(() => contact.id),

    account: accountEnum("account").notNull(),
    status: invoiceStatusEnum("status").notNull(),
    invoiceNumber: text("invoice_number").notNull(),
    invoiceSerial: integer("invoice_serial").notNull(), //used to fetch the next number

    amount: integer("amount").notNull().default(0), //in paisa
    cgst: integer("cgst").notNull().default(0), //in paisa
    sgst: integer("sgst").notNull().default(0), //in paisa
    total: integer("total").notNull().default(0), //in paisa

    invoiceDate: timestamp('invoice_date', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
    dueDate: timestamp('due_date', { mode: 'date', withTimezone: true }).notNull().defaultNow(),
    paymentDate: timestamp('payment_date', { mode: 'date', withTimezone: true }),
    cancelledDate: timestamp('cancelled_date', { mode: 'date', withTimezone: true }),
    arrearedDate: timestamp('arreared_date', { mode: 'date', withTimezone: true }),

    invoiceCategory: invoiceCategoryEnum("invoice_category"),
    description: text("description"),
    remarks: text("remarks"),

    referenceInvId: text("reference_inv_id"), // for referring to templated invoices
    isRecurring: boolean("is_recurring").notNull().default(false),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index("idx_inv_contact").on(table.contactId),
    index("idx_inv_no").on(table.invoiceNumber),
    index("idx_inv_account").on(table.account),
    index("idx_inv_status").on(table.status),

    // date columns
    index("idx_inv_date_due").on(table.dueDate),
    index("idx_inv_date_paid").on(table.paymentDate),
])

export const invoiceRelations = relations(invoice, ({ one, many }) => ({
    handler: one(user, {
        fields: [invoice.handledBy],
        references: [user.id],
    }),
    contact: one(contact, {
        fields: [invoice.contactId],
        references: [contact.id],
    }),
    items: many(invoiceItem)
}));
