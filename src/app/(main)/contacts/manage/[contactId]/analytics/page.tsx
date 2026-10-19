import { Page } from "@/components/layout/page";
import { ContactAnalytics } from "@/features/contact/components/contact-analytics";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Analytics",
    description: "Contact Analytics Page",
};

type Params = Promise<{ contactId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params
    return (
        <Page.Root>
            <Page.Header title={"Contact Analytics"} />
            <Page.Main className="max-w-7xl">
                <ContactAnalytics contactId={params.contactId} />
            </Page.Main>
        </Page.Root>
    );
}
