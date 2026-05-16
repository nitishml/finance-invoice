import { accountEnum, expenseTypeEnum, invoiceStatusEnum } from "@/db/schema";
import * as z from "zod";

export type AddInvoiceDTO = {
    contactId: string;
    account: typeof accountEnum.enumValues[number];

    price: number;
    taxAmount: number;
    gstAmount: number;
    total: number;

    expectedPaymentDate: Date;

    description?: string | null;
}

export const addInvoiceFormSchema = z.object({
    // contactId: z.string(),
    // account: z.enum(accountEnum.enumValues),

    price: z.coerce.number(),
    taxAmount: z.coerce.number(),
    gstAmount: z.coerce.number(),

    description: z.string().optional(),
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
    description: z.string().optional()
})

export type InvoiceListItem = {
    id: string;
    account: typeof accountEnum.enumValues[number];
    status: typeof invoiceStatusEnum.enumValues[number];
    total: number;

    expectedPaymentDate: Date;
    createdDate: Date;

    paymentDate: Date | null;
    cancelledDate: Date | null;
    arrearedDate: Date | null;

    expenseType: typeof expenseTypeEnum.enumValues[number];
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

export type InvoicePaymentDTO = {
    invoiceId: string;
    paymentDate: Date;
    remarks?: string | null;
}

export const payInvoiceFormSchema = z.object({
    paymentDate: z.coerce.date(),
    remarks: z.string().optional()
})

export const payInvoiceApiSchema = z.object({
    paymentDate: z.coerce.date(),
    remarks: z.string().optional()
})


export type InvoicePublishDTO = {
    invoiceId: string;
    expectedPaymentDate: Date;
    remarks?: string | null;
}

export const publishInvoiceFormSchema = z.object({
    expectedPaymentDate: z.coerce.date(),
    remarks: z.string().optional()
})

export const publishInvoiceApiSchema = z.object({
    expectedPaymentDate: z.coerce.date(),
    remarks: z.string().optional()
})