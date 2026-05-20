import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { contact } from "./";

export const employee = pgTable("employee", {
    id: text("id").primaryKey().notNull().references(() => contact.id),

    designation: text("designation").notNull(),
    department: text("department").notNull(),

    alternateContact: text("alternate_contact"),
    officialEmail: text("official_email"),

    contactAddress: text("contactAddress"),

    adhaar: text("adhaar"),
    pan: text("pan"),

    isActive: boolean("is_active").notNull().default(true),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
])

export const employeeRelations = relations(employee, ({ one, many }) => ({
    contact: one(contact, {
        fields: [employee.id],
        references: [contact.id],
    }),
}));
