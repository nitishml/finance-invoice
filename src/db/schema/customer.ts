import { createId } from "@/lib/nanoid-gen";
import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { invoice } from "./invoice";

export const customer = pgTable("customer", {
    id: text("id").primaryKey().$defaultFn(() => createId()),

    name: text("name").notNull(),
    slug: text("slug").notNull(),
    mobile: text("mobile").notNull(),

    email: text("email").notNull(),
    gstin: text("gstin").notNull(),
    address: text("address").notNull(),

    city: text("city").notNull(),
    state: text("state").notNull(),
    country: text("country").notNull(),
    zipcode: text("zipcode").notNull(),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index("idx_cst_mobile").on(table.mobile),
    index("idx_cst_slug").on(table.slug),
])

export const customerRelations = relations(customer, ({ one, many }) => ({
    invoices: many(invoice)
}));
