import { useQuery } from "@tanstack/react-query";
import { Me } from "./types";

type ApiResponse = {
    success: boolean;
    data: Me | null;
    message?: string;
}

async function fetchMe(): Promise<ApiResponse> {
    const response = await fetch(`/api/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

export function useGetMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => fetchMe(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}