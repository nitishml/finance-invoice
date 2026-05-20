import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/types/generic-props";
import { ContactListItem } from "./types";

type ApiResponse = {
    success: boolean;
    data: {
        contacts: ContactListItem[],
        employeeCount: number;
        customerCount: number;
        vendorCount: number;
        pagination: PaginationResponse
    } | null;
    message?: string;
}


type ApiRequest = {
    page?: number;
    limit?: number;
}

async function fetchContacts({
    page = 1,
    limit = 25,
}: ApiRequest): Promise<ApiResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });
    const response = await fetch(`/api/contact?${params.toString()}`, {
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

export function useGetContacts({
    page = 1,
    limit = 25,
}: ApiRequest) {
    return useQuery({
        queryKey: ['contacts', { page, limit }],
        queryFn: () => fetchContacts({ page, limit }),
        retry: (failureCount, error) => {
            if (error.message.includes('401') || error.message.includes('403')) {
                return false;
            }
            return failureCount < 3;
        },
        refetchOnWindowFocus: false,
    });
}