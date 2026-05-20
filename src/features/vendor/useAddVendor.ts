import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddVendorContactDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createVendorContact = async (formData: AddVendorContactDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/vendor`, {
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

export const useAddVendorContact = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddVendorContactDTO>({
        mutationFn: createVendorContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            queryClient.invalidateQueries({ queryKey: ['contacts', 'vendor'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['add-vendor-contact'],
    });
};