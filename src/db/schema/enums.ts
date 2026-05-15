import { pgEnum } from "drizzle-orm/pg-core";

export const accountEnum = pgEnum('account_enum', [
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
    'INDUVIDUAL',
    "EMPLOYEE",
]);