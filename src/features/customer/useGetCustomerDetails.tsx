import { useQuery } from "@tanstack/react-query";
import { CustomerDetails } from "./types";

type ApiResponse = {
    success: boolean;
    data: CustomerDetails | null;
    message?: string;
}

type ApiRequest = {
    customerId: string;
}

async function fetchCustomerDetails({
    customerId,
}: ApiRequest): Promise<ApiResponse> {
    const response = await fetch(`/api/customer/manage/${customerId}`, {
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

export function useGetCustomerDetails({
    customerId,
}: ApiRequest) {
    return useQuery({
        queryKey: ['customer', customerId],
        queryFn: () => fetchCustomerDetails({ customerId }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}