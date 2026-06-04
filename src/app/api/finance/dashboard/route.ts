import { db } from "@/db/drizzle";
import { and, count, desc, eq, gte, lt, sum } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { contact, invoice } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        const [{ expenseCount }] = await db
            .select({ expenseCount: count() })
            .from(invoice)
            .where(and(
                eq(invoice.invoiceType, "EXPENSE"),
                eq(invoice.status, "PAID")
            ));

        const [{ expenseTotal }] = await db
            .select({ expenseTotal: sum(invoice.total) })
            .from(invoice)
            .where(and(
                eq(invoice.invoiceType, "EXPENSE"),
                eq(invoice.status, "PAID")
            ));

        const [{ incomeCount }] = await db
            .select({ incomeCount: count() })
            .from(invoice)
            .where(and(
                eq(invoice.invoiceType, "INCOME"),
                eq(invoice.status, "PAID")
            ));

        const [{ incomeTotal }] = await db
            .select({ incomeTotal: sum(invoice.total) })
            .from(invoice)
            .where(and(
                eq(invoice.invoiceType, "INCOME"),
                eq(invoice.status, "PAID")
            ));

        const [expectedMonthlyIncome] = await db
            .select({
                amount: sum(invoice.total),
                count: count()
            })
            .from(invoice)
            .where(
                and(
                    eq(invoice.invoiceType, "INCOME"),
                    eq(invoice.status, "EXPECTED"),
                    gte(invoice.dueDate, startOfMonth),
                    lt(invoice.dueDate, startOfNextMonth)
                )
            );

        const [expectedMonthlyExpense] = await db
            .select({
                amount: sum(invoice.total),
                count: count()
            })
            .from(invoice)
            .where(
                and(
                    eq(invoice.invoiceType, "EXPENSE"),
                    eq(invoice.status, "EXPECTED"),
                    gte(invoice.dueDate, startOfMonth),
                    lt(invoice.dueDate, startOfNextMonth)
                )
            );

        return NextResponse.json(
            {
                success: true,
                data: {
                    expenseCount,
                    expenseTotal: expenseTotal ? Number(expenseTotal) : 0,
                    incomeCount,
                    incomeTotal: incomeTotal ? Number(incomeTotal) : 0,
                    expectedMonthlyIncome: Number(expectedMonthlyIncome.amount),
                    expectedMonthyIncomeCount: expectedMonthlyIncome.count,
                    expectedMonthlyExpense: Number(expectedMonthlyExpense.amount),
                    expectedMonthyExpenseCount: expectedMonthlyExpense.count,

                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching dashboard stats: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

