import { db } from "@/db/drizzle";
import { count, desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { contact, invoice, invoiceStatusEnum } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";

const VALID_STATUSES = invoiceStatusEnum.enumValues

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        // const total = await db
        //     .select({ count: count() })
        //     .from(invoice)

        // const expenses = await db
        //     .select()
        //     .from(invoice)
        //     .where(eq(invoice.invoiceType, "EXPENSE"))

        // const incomes = await db
        //     .select()
        //     .from(invoice)
        //     .where(eq(invoice.invoiceType, "INCOME"))

        const [stats] = await db
            .select({
                total: count(),
                expenseCount: sql<number>`count(*) filter (where ${invoice.invoiceType} = 'EXPENSE')`.mapWith(Number),
                incomeCount: sql<number>`count(*) filter (where ${invoice.invoiceType} = 'INCOME')`.mapWith(Number),
                // expenseTotal: sql<string>`coalesce(sum(${invoice.amount}) filter (where ${invoice.invoiceType} = 'EXPENSE'), 0)`,
                // incomeTotal: sql<string>`coalesce(sum(${invoice.amount}) filter (where ${invoice.invoiceType} = 'INCOME'), 0)`,
            })
            .from(invoice);


        // const expenseCount = data.invoices.filter((i) => i.invoiceType === "EXPENSE").length
        // const incomeCount = data.invoices.filter((i) => i.invoiceType === "INCOME").length

        return NextResponse.json(
            {
                success: true,
                data: stats
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching contacts: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

