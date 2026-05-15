import { Page } from "@/components/layout/page";
import { ContactDetails } from "@/features/contact/contact-details";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Details",
    description: "Contact Details Page",
};

type Params = Promise<{ contactId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params
    return (
        <Page.Root>
            <Page.Header title={"Contact Details"} />
            <Page.Main className="max-w-7xl">
                <ContactDetails contactId={params.contactId} />
            </Page.Main>
        </Page.Root>
    );
}
