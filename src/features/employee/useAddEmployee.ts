import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddEmployeeContactDTO } from './types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const createEmployeeContact = async (formData: AddEmployeeContactDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/employee`, {
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

export const useAddEmployeeContact = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddEmployeeContactDTO>({
        mutationFn: createEmployeeContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
            queryClient.invalidateQueries({ queryKey: ['contacts', 'employee'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        mutationKey: ['add-employee-contact'],
    });
};