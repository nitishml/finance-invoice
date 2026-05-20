import { Metadata } from "next";
import { PrintInvoiceContent } from "@/features/invoice/print/print-invoice";
import { fetchInvoiceDetails } from "@/features/invoice/print/fetchInvoice";
import Letterhead from "@/features/invoice/print/letter-head";

export const metadata: Metadata = {
    title: "Invoice Details",
};

type Params = Promise<{ invoiceId: string }>;

export default async function PrintPage(props: { params: Params }) {
    const { invoiceId } = await props.params;

    // Fetch directly — no React Query, no client fetch
    const data = await fetchInvoiceDetails({ invoiceId });

    if (!data || !data.data) return <p>Invoice not found</p>;

    return (
        <Letterhead>

        </Letterhead>
    );
}