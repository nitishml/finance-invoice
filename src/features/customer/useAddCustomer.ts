import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddCustomerContactDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createCustomerContact = async (formData: AddCustomerContactDTO): Promise<ApiResponse> => {
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

export const useAddCustomerContact = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddCustomerContactDTO>({
        mutationFn: createCustomerContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            queryClient.invalidateQueries({ queryKey: ['contacts', 'customer'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['add-customer-contact'],
    });
};