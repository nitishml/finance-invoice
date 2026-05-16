import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/generic-props";
import { InvoiceListItem } from "./types";
import { invoiceStatusEnum } from "@/db/schema";

type ApiResponse = {
    success: boolean;
    data: {
        invoices: InvoiceListItem[],
        pagination: PaginationResponse
    } | null;
    message?: string;
}

type ApiRequest = {
    page?: number;
    limit?: number;
    status?: typeof invoiceStatusEnum.enumValues[number];
}

async function fetchInvoices({
    page = 1,
    limit = 25,
    status
}: ApiRequest): Promise<ApiResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });
    if (status) params.set('type', status);

    const response = await fetch(`/api/invoice?${params.toString()}`, {
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

export function useGetInvoices({
    page = 1,
    limit = 25,
    status,
}: ApiRequest) {
    return useQuery({
        queryKey: ['invoices', { page, limit, status }],
        queryFn: () => fetchInvoices({
            page,
            limit,
            status
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