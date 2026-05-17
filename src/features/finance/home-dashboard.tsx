"use client"
import { DataError, QueryLoading } from "@/components/custom-loaders"
import { useGetFinanceDashboard } from "./useGetHomeDashboard"
import { Card, CardTitle } from "@/components/ui/card"
import {
    Stat,
    StatIndicator,
    StatLabel,
    StatValue,
} from "@/components/ui/stat";
import { Banknote, Minus, PlusCircle } from "lucide-react";
import { formatRupees } from "@/lib/utils";
import { format } from "date-fns";

export const HomeDashboard = () => {
    const query = useGetFinanceDashboard()

    const isLoading = query.isLoading || query.isPending || query.isFetching
    if (isLoading) return <QueryLoading />

    if (!query.data || !query.data.data) return <DataError />
    const data = query.data.data

    const balance = data.incomeTotal - data.expenseTotal
    const today = new Date()
    return (
        <div className="w-full flex flex-col items-center justify-center gap-8 pt-10">
            <Card className="p-0 max-w-md border-cyan-500 border-2 w-full">
                <div className="w-full p-8 flex flex-col items-stretch justify-start gap-4">
                    <h2 className="text-xl font-bold">Balance</h2>
                    <span className="text-3xl font-semibold">{formatRupees(balance)}</span>
                </div>
            </Card>
            <div className="w-full flex items-center justify-center gap-8 ">
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
            <Card className="p-8 pt-4  max-w-xl w-full ">
                <CardTitle>{format(today, "MMMM")}</CardTitle>
                <div className="w-full flex items-center justify-center gap-8 ">
                    <Stat className="w-[400px] border-rose-500">
                        <StatLabel>Expected Expense</StatLabel>
                        <StatValue>{formatRupees(data.expectedMonthlyExpense)}</StatValue>
                        <StatIndicator variant="icon" color="warning">
                            {data.expectedMonthyExpenseCount}
                        </StatIndicator>
                    </Stat>
                    <Stat className="w-[400px] border-emerald-500">
                        <StatLabel>Expected Income</StatLabel>
                        <StatValue>{formatRupees(data.expectedMonthlyIncome)}</StatValue>
                        <StatIndicator variant="icon" color="success">
                            {data.expectedMonthyIncomeCount}
                        </StatIndicator>
                    </Stat>

                </div>
            </Card>
        </div>
    );
}