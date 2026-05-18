import { useQuery } from "@tanstack/react-query";
import { InvoiceDetails } from "./types";

type ApiResponse = {
    success: boolean;
    data: InvoiceDetails | null;
    message?: string;
}

type ApiRequest = {
    invoiceId: string;
}

async function fetchInvoiceDetails({
    invoiceId,
}: ApiRequest): Promise<ApiResponse> {
    const response = await fetch(`/api/invoice/manage/${invoiceId}`, {
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



export function useGetInvoiceDetails({
    invoiceId,
}: ApiRequest) {
    return useQuery({
        queryKey: ['invoice', invoiceId],
        queryFn: () => fetchInvoiceDetails({ invoiceId }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}
