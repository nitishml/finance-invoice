import { Page } from "@/components/layout/page";
import { AccountsList } from "@/features/accounting/components/accounts-list";
import { AccountsStats } from "@/features/accounting/components/accounts-stats";
import { getSession } from "@/features/auth/get-session";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Accounting",
    description: "Financial Accounting",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Accounting" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0 space-y-4">
                <AccountsStats />
                <AccountsList />
            </Page.Main>
        </Page.Root>
    );
}