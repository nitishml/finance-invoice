import { useQuery } from "@tanstack/react-query";
import { ContactSearchListItem } from "./types";

type ApiResponse = {
    success: boolean;
    data: ContactSearchListItem[] | null;
    message?: string;
}

type ApiRequest = {
    searchSlug?: string | undefined;
    searchName?: string | undefined;
}

async function searchContact({
    searchSlug,
    searchName,
}: ApiRequest): Promise<ApiResponse> {
    let url = ''
    if (searchSlug) url = `/api/sis/search/adm/${searchSlug}`
    else url = `/api/sis/search/mobile/${searchName}`

    const response = await fetch(url, {
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

export function useSearchContact({
    searchSlug,
    searchName,
}: ApiRequest) {
    return useQuery({
        queryKey: ['search-contact', { searchSlug, searchName }],
        queryFn: () => searchContact({ searchSlug, searchName }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}