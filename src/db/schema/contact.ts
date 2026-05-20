import { createId } from "@/lib/nanoid-gen";
import { relations } from "drizzle-orm";
import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { invoice } from "./invoice";
import { contactCategoryEnum } from "./enums";

export const contact = pgTable("contact", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    category: contactCategoryEnum("category").notNull(),

    name: text("name").notNull(),
    slug: text("slug").notNull(),
    mobile: text("mobile").notNull(),
    email: text("email").notNull(),

    gstin: text("gstin"),
    cin: text("cin"),
    pan: text("pan"),

    address: text("address").notNull(),
    address2: text("address_2"),

    city: text("city").notNull(),
    state: text("state").notNull(),
    country: text("country").notNull(),
    zipcode: text("zipcode").notNull(),

    stateCode: text("state_code").notNull(),
    currencyCode: text("currency_code").notNull().default("INR"),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index("idx_ct_mobile").on(table.mobile),
    index("idx_ct_slug").on(table.slug),
])

export const contactRelations = relations(contact, ({ one, many }) => ({
    invoices: many(invoice)
}));
