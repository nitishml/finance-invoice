import { Page } from "@/components/layout/page";
import { InvoiceDetails } from "@/features/invoice/invoice-details";
import { PrintInvoiceWrapper } from "@/features/invoice/print/print-invoice";
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
        <PrintInvoiceWrapper invoiceId={params.invoiceId} />
    );
}
