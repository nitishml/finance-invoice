"use client"
import { DataError, QueryLoading } from "@/components/custom-loaders";
import { useGetDraftInvoiceDetails } from "../invoice/useGetDraftInvoiceDetails";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { AddItemForm } from "./add-item-form";
import { formatRupees, printRupees } from "@/lib/utils";
import { useSaveDraftInvoice } from "../invoice/useSaveInvoice";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, SendHorizonal } from "lucide-react";
import { PublishInvoiceForm } from "../invoice/publish-invoice-form";

type Props = {
    invoiceId: string;
}
export const AddItemsWrapper = ({ invoiceId }: Props) => {
    const query = useGetDraftInvoiceDetails({ invoiceId })
    const mutation = useSaveDraftInvoice()
    const [opsLoading, setOpsLoading] = useState(false)

    const isLoading = query.isLoading || query.isPending || query.isFetching || opsLoading
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    function handleSaveDraftClick() {
        //console.log("clicked")
        setOpsLoading(true)
        // mutation.mutate({
        //     invoiceId,
        //     amount: cumulativeAmount,
        //     cgst: cumulativecgst,
        //     sgst: cumulativesgst,
        //     total: cumulativeTotal,
        // }, {
        //     onSuccess: (data) => {
        //         if (data.success && data.data) {
        //             toast.success("invoice Draft Saved")
        //             setOpsLoading(false)
        //         }
        //         else {
        //             toast.error(data.message || "Please try again")
        //             setOpsLoading(false)
        //         }
        //     },
        //     onError: (data) => {
        //         toast.error(data.message || "Please try again")
        //         setOpsLoading(false)
        //     }

        // })
    }


    return (
        <div className="w-full space-y-8 ">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 items-start justify-between">
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
                        {data.invoice.address2 && (<p>{data.invoice.address2}</p>)}
                        <p>{data.invoice.city + ", " + data.invoice.state}</p>
                        <p>{data.invoice.country + " - " + data.invoice.zipcode}</p>

                    </div>
                </Card>
            </div>
            {data.invoice.status === "DRAFT" && (
                <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">

                    <AddItemForm invoiceId={invoiceId} itemLength={data.items.length} />


                    <div className="w-full flex flex-col items-center md:items-end justify-start gap-4">
                        <div className='flex flex-col items-center justify-center w-[200px] border border-foreground rounded-md'>
                            <div className='h-8 w-full bg-cyan-500 text-white rounded-md rounded-b-none text-center text-base py-1'>
                                {"Invoice Amount"}
                            </div>
                            <div className='h-12 w-full  rounded-md rounded-t-none text-center text-xl font-bold pt-1'>
                                {"₹" + (data.invoice.amount / 100 || 0)}
                            </div>

                        </div>
                        <div className='flex flex-col items-center justify-center w-[200px] border border-foreground rounded-md'>
                            <div className='h-8 w-full bg-blue-500 text-white rounded-md rounded-b-none text-center text-base py-1'>
                                {"Invoice Total"}
                            </div>
                            <div className='h-12 w-full  rounded-md rounded-t-none text-center text-xl font-bold pt-1'>
                                {"₹" + (data.invoice.total / 100 || 0)}
                            </div>

                        </div>
                        {/* <Button
                        onClick={handleSaveDraftClick}
                        className="w-[200px] h-10"
                        type="button"
                    >
                        <BookmarkCheck />
                        Save Draft
                    </Button> */}
                        <PublishInvoiceForm invoiceId={invoiceId} expectedPaymentDate={data.invoice.invoiceDate} lg />
                    </div>
                </div>
            )}
            <div className="w-full flex flex-col items-start justify-between gap-4 bg-custom-secondary-400 rounded-md pb-2">
                <div className="w-full flex items-center justify-start gap-4 bg-custom-secondary-600 text-white px-4 py-2 rounded-t-md">
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
                        className="w-full flex items-center justify-start gap-4  text-white px-4 py-2 ">
                        <p className="w-4">{item.order}</p>
                        <p className="flex-1">{item.title}</p>
                        <p className="w-12">{item.gstRatio + "%"}</p>
                        <p className="w-20 text-center">{item.quantity}</p>
                        <p className="w-30">{formatRupees(item.rate)}</p>
                        <p className="w-30">{formatRupees(item.amount)}</p>
                        <p className="w-25">{formatRupees(item.cgstAmount)}</p>
                        <p className="w-25">{formatRupees(item.sgstAmount)}</p>
                        <p className="w-35">{formatRupees(item.total)}</p>
                    </div>
                ))}
            </div>
            {data.invoice.status === "EXPECTED" && (
                <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[400px] mx-auto border p-4 rounded-md shadow-md shadow-custom-secondary-500">
                    <div className="w-full flex items-center justify-between gap-4 ">
                        <span>{"Amount"}</span>
                        <p>
                            {formatRupees(data.invoice.amount)}
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-between gap-4 ">
                        <span>{"CGST"}</span>
                        <p>
                            {formatRupees(data.invoice.cgst)}
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-between gap-4">
                        <span>{"SGST"}</span>
                        <p>
                            {formatRupees(data.invoice.sgst)}
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-between gap-4  border-x-0 border-y-2 border-foreground py-1">
                        <span className="text-xl">{"Total"}</span>
                        <p className="text-xl font-bold">
                            {formatRupees(data.invoice.total)}
                        </p>
                    </div>



                </div>
            )}
        </div>
    );
}