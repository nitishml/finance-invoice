import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddItemsToInvoiceDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
        invoiceId: string;
    } | null;
    message?: string | null;
}

const addItem = async (formData: AddItemsToInvoiceDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/invoice/manage/${formData.invoiceId}/add-item`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const useAddItem = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddItemsToInvoiceDTO>({
        mutationFn: addItem,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            queryClient.invalidateQueries({ queryKey: ['finance'] });
            queryClient.invalidateQueries({ queryKey: ['draft-invoice', data.data?.invoiceId] });

        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['add-items'],
    });
};