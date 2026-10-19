"use client"

import {
    Stat,
    StatLabel,
    StatValue,
} from "@/components/ui/stat";
import { useGetInvoiceStats } from "./useGetInvoiceStats";
import { DataError, QueryLoading } from "@/components/custom-loaders";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus } from "lucide-react";

type Props = {

}
export const InvoiceStats = ({ }: Props) => {
    const query = useGetInvoiceStats()

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-4  gap-6 items-end">
            <Stat>
                <StatLabel>Total</StatLabel>
                <StatValue>{data.total}</StatValue>

            </Stat>
            <Stat>
                <StatLabel>Expenses</StatLabel>
                <StatValue>{data.expenseCount}</StatValue>

            </Stat>
            <Stat>
                <StatLabel>Incomes</StatLabel>
                <StatValue>{data.incomeCount}</StatValue>

            </Stat>
            <div className="flex flex-col items-center justify-center gap-1">

                <Button className="w-full h-14" asChild>
                    <Link href={`/invoices/add`}>
                        <UserPlus />
                        Add Invoice
                    </Link>
                </Button>
            </div>
        </div>
    );
}