import { accountEnum, invoiceStatusEnum } from "@/db/schema";
import * as z from "zod";

export type AddInvoiceDTO = {
    contactId: string;
    account: typeof accountEnum.enumValues[number];

    price: number;
    taxAmount: number;
    gstAmount: number;
    total: number;

    expectedPaymentDate: Date;
}

export const addInvoiceFormSchema = z.object({
    contactId: z.string(),
    account: z.enum(accountEnum.enumValues),

    price: z.coerce.number(),
    taxAmount: z.coerce.number(),
    gstAmount: z.coerce.number(),
    total: z.coerce.number(),

    expectedPaymentDate: z.coerce.date(),
})

export const addInvoiceApiSchema = z.object({
    contactId: z.string(),
    account: z.enum(accountEnum.enumValues),

    price: z.coerce.number(),
    taxAmount: z.coerce.number(),
    gstAmount: z.coerce.number(),
    total: z.coerce.number(),

    expectedPaymentDate: z.coerce.date(),
})

export type InvoiceListItem = {
    id: string;
    status: typeof accountEnum.enumValues[number];
    account: typeof invoiceStatusEnum.enumValues[number];
    total: number;

    expectedPaymentDate: Date;
    paymentDate: Date | null;
    createdDate: Date;
    cancelledDate: Date | null;

    name: string;
    slug: string;
}

export type InvoiceDetails = {
    id: string;
    status: typeof accountEnum.enumValues[number];
    account: typeof invoiceStatusEnum.enumValues[number];

    price: number;
    total: number;
    taxAmount: number;
    gstAmount: number;

    expectedPaymentDate: Date;
    paymentDate: Date | null;
    createdDate: Date;
    cancelledDate: Date | null;

    name: string;
    slug: string;
}