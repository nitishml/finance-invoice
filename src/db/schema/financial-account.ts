import { createId } from "@/lib/nanoid-gen";
import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { accountTypeEnum } from "./enums";

export const financialAccount = pgTable("financial_account", {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    accountType: accountTypeEnum("account_type").notNull(),

    title: text("title").notNull(), // official name and display name
    slug: text("slug").notNull().unique(), // url friendly

    isActive: boolean("is_active").notNull(),
    description: text("description"),

    createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: 'date', withTimezone: true })
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
}, (table) => [
    index('idx_fin_acc_title').on(table.title),
    index('idx_fin_acc_type').on(table.accountType),
]);





