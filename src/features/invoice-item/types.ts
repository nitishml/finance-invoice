import z from "zod";

export type AddItemsToInvoiceDTO = {
    invoiceId: string;
    order: number;
    title: string;
    description?: string | null;

    rate: number;
    quantity: number;

    gstAmount: number;
    gstRatio: number;
    cgstAmount: number;
    cgstRatio: number;
    sgstAmount: number;
    sgstRatio: number;
    isSymmetricGst?: boolean;

    total: number;
}

export const addItemFormSchema = z.object({
    title: z.string(),
    description: z.string().optional(),

    rate: z.coerce.number(),
    quantity: z.coerce.number(),
    gstRatio: z.coerce.number(),

})

export const addItemApiSchema = z.object({
    order: z.coerce.number(),
    title: z.string(),
    description: z.string().optional(),

    rate: z.coerce.number(),
    quantity: z.coerce.number(),

    gstAmount: z.coerce.number(),
    gstRatio: z.coerce.number(),
    cgstAmount: z.coerce.number(),
    cgstRatio: z.coerce.number(),
    sgstAmount: z.coerce.number(),
    sgstRatio: z.coerce.number(),
    isSymmetricGst: z.boolean(),

    total: z.coerce.number(),
})


