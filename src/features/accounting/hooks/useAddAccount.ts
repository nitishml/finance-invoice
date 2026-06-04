import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddAccountDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createAccount = async (formData: AddAccountDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/financial-account`, {
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

export const useAddAccount = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddAccountDTO>({
        mutationFn: createAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['add-customer-contact'],
    });
};