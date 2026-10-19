import { useQuery } from "@tanstack/react-query";
import { InvoiceStatsDTO } from "./types";

type ApiResponse = {
    success: boolean;
    data: InvoiceStatsDTO
    | null;
    message?: string;
}

async function fetchInvoiceStats(): Promise<ApiResponse> {

    const response = await fetch(`/api/invoice/stats`, {
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

export function useGetInvoiceStats() {
    return useQuery({
        queryKey: ['invoices', 'stats'],
        queryFn: () => fetchInvoiceStats(),
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