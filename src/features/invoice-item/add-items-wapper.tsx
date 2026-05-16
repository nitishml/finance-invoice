"use client"
import { DataError, QueryLoading } from "@/components/custom-loaders";
import { useGetDraftInvoiceDetails } from "../invoice/useGetDraftInvoiceDetails";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

type Props = {
    invoiceId: string;
}
export const AddItemsWrapper = ({ invoiceId }: Props) => {
    const query = useGetDraftInvoiceDetails({ invoiceId })

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data
    return (
        <div className="w-full space-y-8 ">
            <div className="w-full grid grid-cols-2 items-start justify-between">
                <div className="flex flex-col items-start justify-between gap-4">
                    <h1 className="text-2xl font-bold">Invoice</h1>

                    <div className="w-full flex items-center justify-start gap-4">
                        <p className="w-[150px]">
                            {"Invoice No"}
                        </p>
                        <p className="font-bold">
                            {data.invoice.invoiceNumber}
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-start gap-4">
                        <p className="w-[150px]">
                            {"Invoice Date"}
                        </p>
                        <p className="font-bold">
                            {format(data.invoice.invoiceDate, "MMMM dd, yyyy")}
                        </p>
                    </div>

                </div>
                <Card className="p-4 bg-custom-secondary-200  rounded-sm">
                    <div className="w-full flex flex-col items-start justify-center">
                        <h2 className="text-xl font-bold">Contact</h2>

                        <p className="font-bold text-base">{data.invoice.name}</p>
                        <p>{data.invoice.address}</p>
                        {data.invoice.address2 && (<p>{data.invoice.address}</p>)}
                        <p>{data.invoice.city + ", " + data.invoice.state}</p>
                        <p>{data.invoice.country + " - " + data.invoice.zipcode}</p>

                    </div>
                </Card>
            </div>
            <div className="w-full flex flex-col items-start justify-between gap-4 bg-custom-secondary-200 rounded-md">
                <div className="w-full flex items-center justify-start gap-4 bg-custom-secondary-500 text-white px-4 py-2 rounded-t-md">
                    <p className="w-4"></p>
                    <p className="flex-1">Item</p>
                    <p className="w-12">GST Rate</p>
                    <p className="w-20">Quantity</p>
                    <p className="w-30">Rate</p>
                    <p className="w-30">Amount</p>
                    <p className="w-25">CGST</p>
                    <p className="w-25">SGST</p>
                    <p className="w-35">Total</p>
                </div>
                {data.items.map((item) => (
                    <div
                        key={item.id}
                        className="w-full flex items-center justify-start gap-4 bg-custom-secondary-500 text-white px-4 py-2 rounded-t-md">
                        <p className="w-4">{item.order}</p>
                        <p className="flex-1">{item.title}</p>
                        <p className="w-12">{item.gstRatio}</p>
                        <p className="w-20">{item.quantity}</p>
                        <p className="w-30">{item.rate}</p>
                        <p className="w-30">{item.rate + item.quantity}</p>
                        <p className="w-25">{item.cgstAmount}</p>
                        <p className="w-25">{item.sgstAmount}</p>
                        <p className="w-35">{item.total}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}