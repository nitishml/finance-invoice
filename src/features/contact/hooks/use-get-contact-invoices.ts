import { useQuery } from "@tanstack/react-query";
import { ContactInvoiceListItem } from "../types";

type ApiResponse = {
    success: boolean;
    data: {
        invoices: ContactInvoiceListItem[]
    } | null;
    message?: string;
}

type ApiRequest = {
    contactId: string;
}

async function fetchContactInvoices({
    contactId,
}: ApiRequest): Promise<ApiResponse> {
    const response = await fetch(`/api/contact/manage/${contactId}/invoices`, {
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

export function useGetContactInvoices({
    contactId,
}: ApiRequest) {
    return useQuery({
        queryKey: ['contact', contactId, 'invoices'],
        queryFn: () => fetchContactInvoices({ contactId }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}