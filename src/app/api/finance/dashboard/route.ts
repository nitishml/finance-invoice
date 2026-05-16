import { db } from "@/db/drizzle";
import { and, count, desc, eq, sum } from "drizzle-orm";
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


        const [{ expenseCount }] = await db
            .select({ expenseCount: count() })
            .from(invoice)
            .where(and(
                eq(invoice.account, "EXPENSE"),
                eq(invoice.status, "PAID")
            ));

        const [{ expenseTotal }] = await db
            .select({ expenseTotal: sum(invoice.total) })
            .from(invoice)
            .where(and(
                eq(invoice.account, "EXPENSE"),
                eq(invoice.status, "PAID")
            ));

        const [{ incomeCount }] = await db
            .select({ incomeCount: count() })
            .from(invoice)
            .where(and(
                eq(invoice.account, "INCOME"),
                eq(invoice.status, "PAID")
            ));

        const [{ incomeTotal }] = await db
            .select({ incomeTotal: sum(invoice.total) })
            .from(invoice)
            .where(and(
                eq(invoice.account, "INCOME"),
                eq(invoice.status, "PAID")
            ));

        return NextResponse.json(
            {
                success: true,
                data: {
                    expenseCount,
                    expenseTotal: expenseTotal ? Number(expenseTotal) : 0,
                    incomeCount,
                    incomeTotal: incomeTotal ? Number(incomeTotal) : 0,
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

