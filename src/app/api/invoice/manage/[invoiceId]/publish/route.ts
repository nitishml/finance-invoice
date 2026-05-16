import { db } from "@/db/drizzle";
import { invoice } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { publishInvoiceApiSchema } from "@/features/invoice/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ invoiceId: string }> }
) {
    try {
        const { invoiceId } = await params
        if (!invoiceId) return NextResponse.json({
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

        const body = await request.json();
        const validatedData = publishInvoiceApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        await db
            .update(invoice)
            .set({
                dueDate: values.expectedPaymentDate,
                status: "EXPECTED",
                remarks: values.remarks
            })
            .where(eq(invoice.id, invoiceId))


        return NextResponse.json(
            {
                success: true,
                message: "Invoice Published Successfully",
                data: {
                    id: invoiceId,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error publishing invoice: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
