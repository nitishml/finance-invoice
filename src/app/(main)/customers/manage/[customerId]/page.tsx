import { Page } from "@/components/layout/page";
import { CustomerDetails } from "@/features/customer/customer-details";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Customer Details",
    description: "Customer Details Page",
};

type Params = Promise<{ customerId: string }>

export default async function AppPage(props: {
    params: Params
}) {
    const params = await props.params
    return (
        <Page.Root>
            <Page.Header title={"Customer Details"} />
            <Page.Main className="max-w-7xl">
                <CustomerDetails customerId={params.customerId} />
            </Page.Main>
        </Page.Root>
    );
}
