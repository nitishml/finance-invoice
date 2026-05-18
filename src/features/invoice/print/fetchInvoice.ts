import { cookies } from 'next/headers';
import { InvoiceDetails } from '../types';

type ApiResponse = {
    success: boolean;
    data: InvoiceDetails | null;
    message?: string;
}

type ApiRequest = {
    invoiceId: string;
}

export async function fetchInvoiceDetails({
    invoiceId,
}: ApiRequest): Promise<ApiResponse> {
    // Read the cookie store from the incoming request
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; ');

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL!}/api/invoice/manage/${invoiceId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookieHeader, // manually forward all cookies
            },
            cache: 'no-store', // never cache — auth-sensitive data
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
}