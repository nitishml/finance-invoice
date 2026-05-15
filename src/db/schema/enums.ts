import { pgEnum } from "drizzle-orm/pg-core";

export const accountEnum = pgEnum('account_enum', [
    'INCOME',
    'EXPENSE',
]);

export const invoiceStatusEnum = pgEnum('invoice_status_enum', [
    'CREATED',
    'PAID',
    'ARREARED',
    'CANCELLED'
]);