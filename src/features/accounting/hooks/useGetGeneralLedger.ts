import { useQuery } from "@tanstack/react-query";
import { GeneralLedgerListItem } from "../types";

type ApiResponse = {
    success: boolean;
    data: GeneralLedgerListItem[] | null;
    message?: string;
}

async function fetchGeneralLedger(): Promise<ApiResponse> {
    const response = await fetch(`/api/transaction`, {
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

export function useGetGeneralLedger() {
    return useQuery({
        queryKey: ['general-ledger'],
        queryFn: () => fetchGeneralLedger(),
        retry: (failureCount, error) => {
            if (error.message.includes('401') || error.message.includes('403')) {
                return false;
            }
            return failureCount < 3;
        },
        refetchOnWindowFocus: false,
    });
}