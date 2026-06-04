import { pgEnum } from "drizzle-orm/pg-core";

export const invoiceTypeEnum = pgEnum('invoice_type_enum', [
    'INCOME',
    'EXPENSE',
]);

export const invoiceStatusEnum = pgEnum('invoice_status_enum', [
    'DRAFT',
    'EXPECTED',
    'PAID',
    'ARREARED',
    'CANCELLED'
]);

export const contactCategoryEnum = pgEnum('contact_category_enum', [
    'VENDOR',
    "EMPLOYEE",
    "CUSTOMER",
]);

export const invoiceCategoryEnum = pgEnum('invoice_category_enum', [
    'SALARY',
    'SERVICE',
    "RENT",
    "UTILITIES",
    "MISC",
    "INCOME"
]);

export const accountTypeEnum = pgEnum('account_type_enum', [
    'ASSET',
    'LIABILITY',
    "CAPITAL",
    "REVENUE",
    "EXPENSE",
]);
