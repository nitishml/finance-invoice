import { db } from "@/db/drizzle";
import { count, desc, ne, or, isNull, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { invoice, invoiceItem } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { addItemApiSchema } from "@/features/invoice-item/types";

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

                rate: values.rate * 100,
                quantity: values.quantity,
                amount: values.rate * 100 * values.quantity,
                gstAmount: values.gstAmount * 100,
                gstRatio: values.gstRatio,
                cgstAmount: values.cgstAmount * 100,
                cgstRatio: values.cgstRatio,
                sgstAmount: values.sgstAmount * 100,
                sgstRatio: values.sgstRatio,
                isSymmetricGst: values.isSymmetricGst,

                total: values.total * 100,
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
                amount: sql`${invoice.amount} + ${values.rate * 100 * values.quantity}`,
                cgst: sql`${invoice.cgst} + ${values.cgstAmount * 100}`,
                sgst: sql`${invoice.sgst} + ${values.sgstAmount * 100}`,
                total: sql`${invoice.total} + ${values.total * 100}`,
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