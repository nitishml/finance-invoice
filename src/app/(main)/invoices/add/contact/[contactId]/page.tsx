import { Page } from "@/components/layout/page";
import { AddItemsWrapper } from "@/features/invoice-item/add-items-wapper";
import { Metadata } from "next";
import { AddInvoiceForm } from "@/features/invoice/add-invoice-form";

export const metadata: Metadata = {
    title: "Create Invoice",
    description: "Create Invoice Page after Contact Selection",
};

type Params = Promise<{ contactId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params
    return (
        <Page.Root>
            <Page.Header title={"Create Invoice"} />
            <Page.Main className="max-w-7xl">
                <AddInvoiceForm contactId={params.contactId} />

            </Page.Main>
        </Page.Root>
    );
}
