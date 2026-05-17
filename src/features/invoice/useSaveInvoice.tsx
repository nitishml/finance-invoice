import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SaveDraftDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const saveDraftInvoice = async (formData: SaveDraftDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/invoice/manage/${formData.invoiceId}/draft`, {
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

export const useSaveDraftInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, SaveDraftDTO>({
        mutationFn: saveDraftInvoice,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['invoice', data.data?.id] });
            queryClient.invalidateQueries({ queryKey: ['draft-invoice', data.data?.id] });

            queryClient.invalidateQueries({ queryKey: ['invoices',] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['draft-invoice'],
    });
};