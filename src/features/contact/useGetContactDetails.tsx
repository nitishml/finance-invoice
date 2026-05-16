import { useQuery } from "@tanstack/react-query";
import { ContactDetails } from "./types";

type ApiResponse = {
    success: boolean;
    data: ContactDetails | null;
    message?: string;
}

type ApiRequest = {
    contactId: string;
}

async function fetchContactDetails({
    contactId,
}: ApiRequest): Promise<ApiResponse> {
    const response = await fetch(`/api/contact/manage/${contactId}`, {
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

export function useGetContactDetails({
    contactId,
}: ApiRequest) {
    return useQuery({
        queryKey: ['contact', contactId],
        queryFn: () => fetchContactDetails({ contactId }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}