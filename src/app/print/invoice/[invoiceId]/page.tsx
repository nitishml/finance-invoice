import { Metadata } from "next";
import { PrintInvoiceContent } from "@/features/invoice/print/print-invoice";
import { fetchInvoiceDetails } from "@/features/invoice/print/fetchInvoice";

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
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <style>{`
                    body {
                        background: white;
                        font-family: 'Noto Sans', 'Arial Unicode MS', sans-serif;
                        color: #111;
                    }
                    .print-container { width: 794px;  }
                `}</style>
            </head>
            <body>
                <div className="print-container">
                    <PrintInvoiceContent data={data.data} />
                </div>
            </body>
        </html>
    );
}