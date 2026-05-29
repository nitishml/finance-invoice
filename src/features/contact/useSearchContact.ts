import { useQuery } from "@tanstack/react-query";
import { ContactListItem } from "./types";


type ApiResponse = {
    success: boolean;
    data: {
        contacts: ContactListItem[],
    } | null;
    message?: string;
}

type ApiRequest = {
    slug?: string;
    name?: string;
    mobile?: string;
}

async function searchContact({
    slug,
    name,
    mobile,
}: ApiRequest): Promise<ApiResponse> {
    const params = new URLSearchParams();

    if (slug) params.set('slug', slug);
    if (name) params.set('name', name);
    if (mobile) params.set('mobile', mobile);
    const response = await fetch(`/api/contact/search?${params.toString()}`, {
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

export function useSearchContact({
    slug,
    name,
    mobile,

}: ApiRequest) {
    return useQuery({
        queryKey: ['contacts', 'search', { slug, name, mobile }],
        queryFn: () => searchContact({

            slug,
            name,
            mobile,
        }),
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 10,
        retry: (failureCount, error) => {
            if (error.message.includes('401') || error.message.includes('403')) {
                return false;
            }
            return failureCount < 3;
        },
        refetchOnWindowFocus: false,
    });
}