import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { AddCustomerForm } from "@/features/customer/add-customer-form";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Onboard Customer",
    description: "Customers Dashboard",
};

export default async function AppPage() {
    // const session = await getSession();
    // if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Onboard Customers" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0">
                <AddCustomerForm />
            </Page.Main>
        </Page.Root>
    );
}