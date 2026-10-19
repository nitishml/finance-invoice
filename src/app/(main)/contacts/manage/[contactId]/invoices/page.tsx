import { Page } from "@/components/layout/page";
import { ContactInvoicesList } from "@/features/contact/components/contact-invoices-list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Invoices",
    description: "Contact Invoices Page",
};

type Params = Promise<{ contactId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params
    return (
        <Page.Root>
            <Page.Header title={"Contact Invoices"} />
            <Page.Main className="max-w-7xl">
                <ContactInvoicesList contactId={params.contactId} />
            </Page.Main>
        </Page.Root>
    );
}
