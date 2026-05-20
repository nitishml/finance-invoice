import { Card } from "@/components/ui/card";
import { formatRupees } from "@/lib/utils";
import { format } from "date-fns";
import { InvoiceDetails } from "../types";

type Props = {
    data: InvoiceDetails
}
export const PrintInvoiceContent = ({ data }: Props) => {
    return (
        <div className="print-container">
            <div className="w-full space-y-8 ">
                <div className="w-full grid grid-cols-2 items-start justify-between">
                    <div className="flex flex-col items-start justify-between gap-4">
                        <h1 className="text-2xl font-bold">Invoice</h1>

                        <div className="w-full flex items-center justify-start gap-4">
                            <p className="w-[150px]">
                                {"Invoice No"}
                            </p>
                            <p className="font-bold">
                                {data.invoiceNumber}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-start gap-4">
                            <p className="w-[150px]">
                                {"Invoice Date"}
                            </p>
                            <p className="font-bold">
                                {format(data.invoiceDate, "MMMM dd, yyyy")}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-start gap-4">
                            <p className="w-[150px]">
                                {"Due Date"}
                            </p>
                            <p className="font-bold">
                                {format(data.dueDate, "MMMM dd, yyyy")}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end justify-end gap-4">


                        {data.paymentDate && (
                            <div className="w-full flex items-center justify-end gap-4">
                                <p className="w-[150px]">
                                    {"Payment Date"}
                                </p>
                                <p className="font-bold">
                                    {format(data.paymentDate, "MMMM dd, yyyy")}
                                </p>
                            </div>
                        )}
                        {data.cancelledDate && (
                            <div className="w-full flex items-center justify-end gap-4">
                                <p className="w-[150px]">
                                    {"Payment Date"}
                                </p>
                                <p className="font-bold">
                                    {format(data.cancelledDate, "MMMM dd, yyyy")}
                                </p>
                            </div>
                        )}

                    </div>
                </div>
                <div className="w-full grid grid-cols-2 items-stretch justify-between gap-4">
                    <Card className="p-4 bg-custom-secondary-200  rounded-sm">
                        <div className="w-full flex flex-col items-start justify-center">
                            <h2 className="text-xl font-bold">Billed By</h2>

                            <p className="font-bold text-base">{"Growsharp Technologies PVT LTD"}</p>
                            <p>{"616, Outer Ring Rd, 7 Block, CG Chinnappa Naidu"}</p>
                            <p>{"Layout, Banashankari 3rd Stage, Banashankari,"}</p>
                            <p>{"Bengaluru" + ", " + "Karnataka"}</p>
                            <p>{"India" + " - " + "560085"}</p>

                        </div>
                    </Card>
                    <Card className="p-4 bg-custom-secondary-200  rounded-sm">
                        <div className="w-full flex flex-col items-start justify-center">
                            <h2 className="text-xl font-bold">Billed To</h2>

                            <p className="font-bold text-base">{data.name}</p>
                            <p>{data.address}</p>
                            {data.address2 && (<p>{data.address2}</p>)}
                            <p>{data.city + ", " + data.state}</p>
                            <p>{data.country + " - " + data.zipcode}</p>

                        </div>
                    </Card>
                </div>
                <div className="w-full flex flex-col items-start justify-between gap-4 bg-custom-secondary-400 rounded-md pb-2 text-sm">
                    <div className="w-full flex items-center justify-start gap-4 bg-custom-secondary-600 text-white px-4 py-2 rounded-t-md">
                        <p className="w-4"></p>
                        <p className="min-w-20">Item</p>
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
                            <p className="min-w-20">{item.title}</p>
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
                <div className="w-full flex items-center justify-end">
                    <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[400px]  border p-4 rounded-md shadow-md shadow-custom-secondary-500">
                        <div className="w-full flex items-center justify-between gap-4 ">
                            <span>{"Amount"}</span>
                            <p>
                                {formatRupees(data.amount)}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between gap-4 ">
                            <span>{"CGST"}</span>
                            <p>
                                {formatRupees(data.cgst)}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between gap-4">
                            <span>{"SGST"}</span>
                            <p>
                                {formatRupees(data.sgst)}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between gap-4  border-x-0 border-y-2 border-foreground py-1">
                            <span className="text-xl">{"Total"}</span>
                            <p className="text-xl font-bold">
                                {formatRupees(data.total)}
                            </p>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
}