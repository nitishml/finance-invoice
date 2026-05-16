import { Page } from "@/components/layout/page";
import { getSession } from "@/features/auth/get-session";
import { HomeDashboard } from "@/features/finance/home-dashboard";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Home Dashboard",
};

export default async function AppPage() {
    const session = await getSession();
    if (!session) return redirect('/auth/login');

    return (
        <Page.Root>
            <Page.Header title="Dashboard" />
            <Page.Main className=" max-w-7xl py-20 md:pt-0">
                <HomeDashboard />
            </Page.Main>
        </Page.Root>
    );
}