import { accountEnum, invoiceCategoryEnum, invoiceStatusEnum } from "@/db/schema";
import * as z from "zod";

export type AddInvoiceDTO = {
    contactId: string;
    account: typeof accountEnum.enumValues[number];
    invoiceNumber: string;
    invoiceSerial: number;
    invoiceDate: Date;
    description?: string | null;
}

export const addInvoiceFormSchema = z.object({
    description: z.string().optional(),
    invoiceDate: z.coerce.date(),
})

export const addInvoiceApiSchema = z.object({
    contactId: z.string(),
    account: z.enum(accountEnum.enumValues),

    invoiceNumber: z.string(),
    invoiceSerial: z.coerce.number(),
    description: z.string().optional(),
    invoiceDate: z.coerce.date(),
})

export type InvoiceListItem = {
    id: string;
    account: typeof accountEnum.enumValues[number];
    status: typeof invoiceStatusEnum.enumValues[number];
    invoiceNumber: string;

    total: number;

    dueDate: Date;
    paymentDate: Date | null;
    invoiceCategory: typeof invoiceCategoryEnum.enumValues[number] | null;

    name: string;
    slug: string;
}

export type InvoiceDetails = {
    id: string;
    status: typeof accountEnum.enumValues[number];
    account: typeof invoiceStatusEnum.enumValues[number];
    invoiceNumber: string;

    amount: number;
    cgst: number;
    sgst: number;
    total: number;

    invoiceDate: Date;
    dueDate: Date;
    paymentDate: Date | null;
    cancelledDate: Date | null;
    arrearedDate: Date | null;

    name: string;
    slug: string;
    items: {}
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