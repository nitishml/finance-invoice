import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { ContactDashboard } from "@/features/contact/contact-dashboard";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Contacts",
    description: "Contacts Dashboard",
};

export default async function AppPage() {
    // const session = await getSession();
    // if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Contacts" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0">
                <ContactDashboard />
            </Page.Main>
        </Page.Root>
    );
}