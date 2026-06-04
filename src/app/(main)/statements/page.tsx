import { Page } from "@/components/layout/page";
import { GeneralLedger } from "@/features/accounting/components/general-ledger";
import { getSession } from "@/features/auth/get-session";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Statements",
    description: "Statements",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Statements" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0 space-y-4">
                <GeneralLedger />
            </Page.Main>
        </Page.Root>
    );
}