import { Page } from "@/components/layout/page";
import { InvoiceDetails } from "@/features/invoice/invoice-details";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Invoice Details",
    description: "Invoice Details Page",
};

type Params = Promise<{ invoiceId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params
    return (
        <Page.Root>
            <Page.Header title={"Invoice Details"} />
            <Page.Main className="max-w-7xl">
                <InvoiceDetails invoiceId={params.invoiceId} />
            </Page.Main>
        </Page.Root>
    );
}
