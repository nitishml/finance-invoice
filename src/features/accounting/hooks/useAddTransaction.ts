import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddTransactionDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createTransaction = async (formData: AddTransactionDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/transaction`, {
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

export const useAddTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddTransactionDTO>({
        mutationFn: createTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['general-ledger'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['add-customer-contact'],
    });
};