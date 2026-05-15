import { createId } from "@/lib/nanoid-gen";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const account = pgTable("account", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),

    hashedPassword: text("hashed_password"),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index('idx_account_user').on(table.userId),
]);
