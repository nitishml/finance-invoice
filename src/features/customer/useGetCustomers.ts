import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/generic-props";
import { CustomerListItem } from "./types";

type ApiResponse = {
    success: boolean;
    data: {
        customers: CustomerListItem[],
        pagination: PaginationResponse
    } | null;
    message?: string;
}

type ApiRequest = {
    page?: number;
    limit?: number;
}

async function fetchCustomers({
    page = 1,
    limit = 25,
}: ApiRequest): Promise<ApiResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });

    const response = await fetch(`/api/customer?${params.toString()}`, {
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

export function useGetCustomers({
    page = 1,
    limit = 25,
}: ApiRequest) {
    return useQuery({
        queryKey: ['customers', { page, limit }],
        queryFn: () => fetchCustomers({
            page,
            limit,
        }),
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