import { useMutation, useQueryClient } from '@tanstack/react-query';

type ApiRequest = {
    mobile: string;
    password: string;
}

type ApiResponse = {
    success: boolean;
    data: string | null;
    message?: string | null;
}

const login = async (formData: ApiRequest): Promise<ApiResponse> => {
    const response = await fetch('/api/auth/login', {
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

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, ApiRequest>({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
        onError: (error) => {

        },
        mutationKey: ['login'],
    });
};