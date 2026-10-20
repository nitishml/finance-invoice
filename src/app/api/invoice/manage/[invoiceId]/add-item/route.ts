import { db } from "@/db/drizzle";
import { count, desc, ne, or, isNull, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { invoice, invoiceItem } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { addItemApiSchema } from "@/features/invoice-item/types";
import { rupeesToPaise } from "@/lib/utils";

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
        const validatedData = addItemApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        const [newItem] = await db
            .insert(invoiceItem)
            .values({
                invoiceId,
                title: values.title,
                order: values.order,

                description: values.description,
                txnId: values.txnId,

                rate: rupeesToPaise(values.rate),
                quantity: values.quantity,
                amount: rupeesToPaise(values.rate) * values.quantity,
                gstAmount: rupeesToPaise(values.gstAmount),
                gstRatio: values.gstRatio,
                cgstAmount: rupeesToPaise(values.cgstAmount),
                cgstRatio: values.cgstRatio,
                sgstAmount: rupeesToPaise(values.sgstAmount),
                sgstRatio: values.sgstRatio,
                isSymmetricGst: values.isSymmetricGst,

                total: rupeesToPaise(values.total),
            })
            .returning({
                id: invoiceItem.id
            })

        if (!newItem) return NextResponse.json({
            success: false,
            message: "Invoice Item Addition Failed",
            data: null,
        }, { status: 404 });

        await db
            .update(invoice)
            .set({
                amount: sql`${invoice.amount} + ${rupeesToPaise(values.rate) * values.quantity}`,
                cgst: sql`${invoice.cgst} + ${rupeesToPaise(values.cgstAmount)}`,
                sgst: sql`${invoice.sgst} + ${rupeesToPaise(values.sgstAmount)}`,
                total: sql`${invoice.total} + ${rupeesToPaise(values.total)}`,
            })
            .where(eq(invoice.id, invoiceId))

        return NextResponse.json(
            {
                success: true,
                message: "Item Added Successfully",
                data: {
                    id: newItem.id,
                    invoiceId,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error add items to invoice: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}