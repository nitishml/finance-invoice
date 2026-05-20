import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { contact } from "./";

export const vendor = pgTable("vendor", {
    id: text("id").primaryKey().notNull().references(() => contact.id),

    pocName: text("poc_name"),
    pocContact: text("poc_contact"),
    pocEmail: text("poc_email"),

    websiteUrl: text("website_url"),

    gstin: text("gstin"),
    cin: text("cin"),
    pan: text("pan"),

    remarks: text("remarks"),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
])

export const vendorRelations = relations(vendor, ({ one, many }) => ({
    contact: one(contact, {
        fields: [vendor.id],
        references: [contact.id],
    }),
}));
