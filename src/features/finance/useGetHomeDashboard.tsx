import { useQuery } from "@tanstack/react-query";
import { FinanceDashboardDTO } from "./types";

type ApiResponse = {
    success: boolean;
    data: FinanceDashboardDTO | null;
    message?: string;
}

async function fetchFinanceDashboard(): Promise<ApiResponse> {
    const response = await fetch(`/api/finance/dashboard`, {
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

    const data = await response.json();
    return data
}

export function useGetFinanceDashboard() {
    return useQuery({
        queryKey: ['finance', 'dashboard'],
        queryFn: () => fetchFinanceDashboard(),
        staleTime: 1000 * 60 * 15, // 15 minutes
        gcTime: 1000 * 60 * 10, // 15 minutes
        retry: (failureCount, error) => {
            if (error.message.includes('401') || error.message.includes('403')) {
                return false;
            }
            return failureCount < 3;
        },
        refetchOnWindowFocus: false,
    });
}