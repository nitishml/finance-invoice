import { useQuery } from "@tanstack/react-query";
import { ContactAnalyticsDTO } from "../types";

type ApiResponse = {
    success: boolean;
    data: ContactAnalyticsDTO | null;
    message?: string;
}

type ApiRequest = {
    contactId: string;
}

async function fetchContactAnalytics({
    contactId,
}: ApiRequest): Promise<ApiResponse> {
    const response = await fetch(`/api/contact/manage/${contactId}/analytics`, {
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

export function useGetContactAnalytics({
    contactId,
}: ApiRequest) {
    return useQuery({
        queryKey: ['contact', contactId, 'analytics'],
        queryFn: () => fetchContactAnalytics({ contactId }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}