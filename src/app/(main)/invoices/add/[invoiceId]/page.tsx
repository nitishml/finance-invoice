import { Page } from "@/components/layout/page";
import { AddItemsWrapper } from "@/features/invoice-item/add-items-wapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Items",
    description: "Add Items to Invoice",
};

type Params = Promise<{ invoiceId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params
    return (
        <Page.Root>
            <Page.Header title={"Add Items"} />
            <Page.Main className="max-w-7xl">
                <AddItemsWrapper invoiceId={params.invoiceId} />
            </Page.Main>
        </Page.Root>
    );
}
