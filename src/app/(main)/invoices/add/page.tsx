import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { ContactSearch } from "@/features/contact/contact-search";
import { ContactSearchResults } from "@/features/contact/contact-search-results";
import { AddInvoiceForm } from "@/features/invoice/add-invoice-form";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Add Invoice",
    description: "Add Contact Page",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Add Invoice" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0 space-y-4">
                <ContactSearch />
                <ContactSearchResults />
            </Page.Main>
        </Page.Root>
    );
}