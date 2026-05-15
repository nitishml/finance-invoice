import { createId } from "@/lib/nanoid-gen";
import { pgTable, text, timestamp, boolean, uniqueIndex, index } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey().$defaultFn(() => createId()),

    name: text("name").notNull(),
    mobile: text("mobile").notNull().unique(),
    email: text("email").notNull().unique(),

    isActive: boolean("is_active").notNull(),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    uniqueIndex('idx_user_mobile').on(table.mobile),
    uniqueIndex('idx_user_email').on(table.email),

    index("idx_user_active").on(table.isActive)
]);





