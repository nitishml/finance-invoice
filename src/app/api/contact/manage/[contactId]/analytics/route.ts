import { db } from "@/db/drizzle";
import { contact, invoice } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { eq, desc, count, sql, sum } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ contactId: string }> }
) {
    try {
        const { contactId } = await params
        if (!contactId) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const [stats] = await db
            .select({
                total: sum(invoice.amount),
                // expenseCount: sql<number>`count(*) filter (where ${invoice.invoiceType} = 'EXPENSE')`.mapWith(Number),
                // incomeCount: sql<number>`count(*) filter (where ${invoice.invoiceType} = 'INCOME')`.mapWith(Number),
                expenseTotal: sql<string>`coalesce(sum(${invoice.amount}) filter (where ${invoice.invoiceType} = 'EXPENSE'), 0)`,
                incomeTotal: sql<string>`coalesce(sum(${invoice.amount}) filter (where ${invoice.invoiceType} = 'INCOME'), 0)`,
            })
            .from(invoice)
            .where(eq(invoice.contactId, contactId))

        if (!stats) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        return NextResponse.json(
            {
                success: true,
                data: stats
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching contact by id: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

