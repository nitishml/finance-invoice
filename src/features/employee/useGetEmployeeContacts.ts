import { useQuery } from "@tanstack/react-query";
import { EmployeeContactListItem } from "./types";

type ApiResponse = {
    success: boolean;
    data: {
        contacts: EmployeeContactListItem[],
    } | null;
    message?: string;
}

async function fetchEmployeeContacts(): Promise<ApiResponse> {
    const response = await fetch(`/api/employee`, {
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

export function useGetEmployeeContacts() {
    return useQuery({
        queryKey: ['contacts', 'employee'],
        queryFn: () => fetchEmployeeContacts(),
        retry: (failureCount, error) => {
            if (error.message.includes('401') || error.message.includes('403')) {
                return false;
            }
            return failureCount < 3;
        },
        refetchOnWindowFocus: false,
    });
}