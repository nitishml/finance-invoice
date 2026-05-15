import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddContactDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createContact = async (formData: AddContactDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/contact`, {
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

export const useAddContact = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddContactDTO>({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['create-contact'],
    });
};