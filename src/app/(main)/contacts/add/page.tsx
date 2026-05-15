import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { AddContactForm } from "@/features/contact/add-contact-form";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Add Contact",
    description: "Add Contact Page",
};

export default async function AppPage() {
    // const session = await getSession();
    // if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Add Contact" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0">
                <AddContactForm />
            </Page.Main>
        </Page.Root>
    );
}