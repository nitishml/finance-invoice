import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddCustomerDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createCustomer = async (formData: AddCustomerDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/customer`, {
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

export const useAddCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddCustomerDTO>({
        mutationFn: createCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            // queryClient.invalidateQueries({ queryKey: ['active-postings'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['create-customer'],
    });
};