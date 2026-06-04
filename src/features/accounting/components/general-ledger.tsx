
"use client"

import { DataError, QueryLoading } from "@/components/custom-loaders"
import { useGetGeneralLedger } from "../hooks/useGetGeneralLedger"
import { InPageHeader } from "@/components/layout/in-page-header"
import { format } from "date-fns"
import { printRupees } from "@/lib/utils"

type Props = {

}
export const GeneralLedger = ({ }: Props) => {
    const query = useGetGeneralLedger()

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data
    return (
        <div className="w-full space-y-4">
            <InPageHeader label="General Ledger" />
            <div className="w-full flex flex-col items-center justify-center gap-2">
                <div className="w-full flex items-center justify-center gap-2 border-b border-foreground ">
                    <div className="w-40 text-left">#</div>
                    <div className="w-50 text-left">Date</div>
                    <div className="w-200 text-left">Particulars</div>
                    <div className="w-100 text-left">Debit</div>
                    <div className="w-100 text-right">Credit</div>
                </div>
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="w-full flex items-center justify-center gap-2">
                        <div className="w-40 text-left">{item.transactionNumber}</div>
                        <div className="w-50 text-left">
                            {format(item.transactionDate, "dd/MM/yyyy")}
                        </div>
                        <div className="w-200 flex flex-col items-center justify-start gap-1">
                            <p className="w-full text-left">{item.debitAccount}</p>
                            <p className="w-full text-left pl-4">{item.creditAccount}</p>
                        </div>
                        <div className="w-200 flex flex-col items-center justify-start gap-1">
                            <p className="w-full text-left">{printRupees(item.amount)}</p>
                            <p className="w-full text-right items-end">{printRupees(item.amount)}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}