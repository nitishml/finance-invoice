"use client"

import { DataError, QueryLoading } from "@/components/custom-loaders"
import { useGetContactAnalytics } from "../hooks/use-get-contact-analytics"
import { Card } from "@/components/ui/card"
import { formatRupees } from "@/lib/utils"

type Props = {
    contactId: string
}
export const ContactAnalytics = ({ contactId }: Props) => {
    const query = useGetContactAnalytics({ contactId })

    const isDisabled = query.isLoading || query.isPending || query.isFetching
    if (isDisabled) return <QueryLoading />
    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data
    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 ">
            <Card className="p-0 max-w-md border-rose-500 border-2 w-full">
                <div className="w-full p-8 flex flex-col items-stretch justify-start gap-4">
                    <h2 className="text-xl font-bold">Total Expenses</h2>
                    <span className="text-3xl font-semibold">{formatRupees(data.expenseTotal)}</span>
                </div>
            </Card>
            <Card className="p-0 max-w-md border-emerald-500 border-2 w-full">
                <div className="w-full p-8 flex flex-col items-stretch justify-start gap-4">
                    <h2 className="text-xl font-bold">Total Income</h2>
                    <span className="text-3xl font-semibold">{formatRupees(data.incomeTotal)}</span>
                </div>
            </Card>

        </div>
    );
}