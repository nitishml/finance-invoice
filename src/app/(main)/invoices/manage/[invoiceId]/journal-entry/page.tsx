import { Page } from "@/components/layout/page";
import { JournalEntryDashbord } from "@/features/accounting/components/journal-entry-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JournalEntry",
    description: "Add JournalEntry Form",
};

type Params = Promise<{ invoiceId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params
    return (
        <Page.Root>
            <Page.Header title={"JournalEntry"} />
            <Page.Main className="max-w-7xl">
                <JournalEntryDashbord />
            </Page.Main>
        </Page.Root>
    );
}
