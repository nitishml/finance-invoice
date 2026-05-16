import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/generic-props";

type ApiResponse = {
    success: boolean;
    data: {
        maxSerial: number,
    } | null;
    message?: string;
}

async function fetchNumber(): Promise<ApiResponse> {
    const response = await fetch(`/api/invoice/number`, {
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

export function useGetInvoiceNumber() {
    return useQuery({
        queryKey: ['invoice-number'],
        queryFn: () => fetchNumber(),
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