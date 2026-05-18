import { useQuery } from "@tanstack/react-query";
import { DraftInvoiceDetails } from "./types";

type ApiResponse = {
    success: boolean;
    data: DraftInvoiceDetails | null;
    message?: string;
}

type ApiRequest = {
    invoiceId: string;
}

async function fetchDraftInvoiceDetails({
    invoiceId,
}: ApiRequest): Promise<ApiResponse> {
    const response = await fetch(`/api/invoice/manage/${invoiceId}/draft`, {
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

export function useGetDraftInvoiceDetails({
    invoiceId,
}: ApiRequest) {
    return useQuery({
        queryKey: ['draft-invoice', invoiceId],
        queryFn: () => fetchDraftInvoiceDetails({ invoiceId }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}