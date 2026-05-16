"use client"
import { DataError, QueryLoading } from "@/components/custom-loaders"
import { useGetFinanceDashboard } from "./useGetHomeDashboard"
import { Card } from "@/components/ui/card"
import {
    Stat,
    StatIndicator,
    StatLabel,
    StatValue,
} from "@/components/ui/stat";
import { Banknote, Minus, PlusCircle } from "lucide-react";
import { formatRupees } from "@/lib/utils";

export const HomeDashboard = () => {
    const query = useGetFinanceDashboard()

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    const balance = data.incomeTotal - data.expenseTotal
    return (
        <div className="w-full flex flex-col items-center justify-center gap-8 pt-10">
            <Card className="p-0 max-w-md border-cyan-500 border-2 w-full">
                <div className="w-full p-8 flex flex-col items-stretch justify-start gap-4">
                    <h2 className="text-xl font-bold">Balance</h2>
                    <span className="text-3xl font-semibold">{formatRupees(balance)}</span>
                </div>
            </Card>
            <div className="w-full flex items-center justify-center gap-8 ">
                <Card className="p-0 max-w-md border-rose-500 border-2">
                    <div className="w-full p-8 flex flex-col items-stretch justify-start gap-4">
                        <h2 className="text-xl font-bold">Expense</h2>
                        <div className="w-full  flex items-stretch justify-start gap-4">
                            <Stat>
                                <StatLabel>Count</StatLabel>
                                <StatValue>{data.expenseCount}</StatValue>
                                <StatIndicator >
                                </StatIndicator>
                            </Stat>
                            <Stat className="w-[400px]">
                                <StatLabel>Total</StatLabel>
                                <StatValue>{formatRupees(data.expenseTotal)}</StatValue>
                                <StatIndicator variant="icon" color="warning">
                                    <Minus />
                                </StatIndicator>
                            </Stat>
                        </div>
                    </div>
                </Card>
                <Card className="p-0 max-w-md border-emerald-500 border-2">
                    <div className="w-full p-8 flex flex-col items-stretch justify-start gap-4">
                        <h2 className="text-xl font-bold">Income</h2>

                        <div className="w-full  flex items-stretch justify-start gap-4">
                            <Stat>
                                <StatLabel>Count</StatLabel>
                                <StatValue>{data.incomeCount}</StatValue>
                                <StatIndicator >
                                </StatIndicator>
                            </Stat>
                            <Stat className="w-[400px]">
                                <StatLabel>Total</StatLabel>
                                <StatValue>{formatRupees(data.incomeTotal)}</StatValue>
                                <StatIndicator variant="icon" color="success">
                                    <PlusCircle />
                                </StatIndicator>
                            </Stat>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}