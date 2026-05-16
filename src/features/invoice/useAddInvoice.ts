import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddInvoiceDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createInvoice = async (formData: AddInvoiceDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/invoice`, {
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

export const useAddInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddInvoiceDTO>({
        mutationFn: createInvoice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] });
            queryClient.invalidateQueries({ queryKey: ['finance'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['add-invoice'],
    });
};