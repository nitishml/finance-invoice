import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InvoicePublishDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const publishInvoice = async (formData: InvoicePublishDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/invoice/manage/${formData.invoiceId}/publish`, {
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

export const usePublishInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, InvoicePublishDTO>({
        mutationFn: publishInvoice,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['invoice', data.data?.id] });
            queryClient.invalidateQueries({ queryKey: ['invoices',] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['publish-invoice'],
    });
};