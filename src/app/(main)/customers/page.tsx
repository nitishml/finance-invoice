import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { CustomerDashboard } from "@/features/customer/customer-dashboard";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Customers",
    description: "Customers Dashboard",
};

export default async function AppPage() {
    // const session = await getSession();
    // if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Customers" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0">
                <CustomerDashboard />
            </Page.Main>
        </Page.Root>
    );
}