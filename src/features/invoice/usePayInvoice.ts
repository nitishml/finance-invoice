import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InvoicePaymentDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const payInvoice = async (formData: InvoicePaymentDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/invoice/manage/${formData.invoiceId}/payment`, {
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

export const usePayInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, InvoicePaymentDTO>({
        mutationFn: payInvoice,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['invoice', data.data?.id] });
            queryClient.invalidateQueries({ queryKey: ['invoices',] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['pay-invoice'],
    });
};