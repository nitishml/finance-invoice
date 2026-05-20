import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddClientContactDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createClientContact = async (formData: AddClientContactDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/client`, {
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

export const useAddClientContact = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddClientContactDTO>({
        mutationFn: createClientContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            queryClient.invalidateQueries({ queryKey: ['contacts', 'client'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['add-client-contact'],
    });
};