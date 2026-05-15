import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { InvoiceDashboard } from "@/features/invoice/invoice-dashboard";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Invoices",
    description: "Invoices Dashboard",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Invoices" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0">
                <InvoiceDashboard />
            </Page.Main>
        </Page.Root>
    );
}