export type AddItemsToInvoiceDTO = {
    invoiceId: string;
    items: {
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
}

