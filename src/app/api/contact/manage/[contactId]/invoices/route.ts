import { db } from "@/db/drizzle";
import { contact, invoice } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { eq, desc } from "drizzle-orm";
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

        const result = await db
            .select({
                id: invoice.id,
                status: invoice.status,
                invoiceType: invoice.invoiceType,
                invoiceNumber: invoice.invoiceNumber,

                total: invoice.total,

                dueDate: invoice.dueDate,
                paymentDate: invoice.paymentDate,

                invoiceCategory: invoice.invoiceCategory,
            })
            .from(invoice)
            .innerJoin(contact, eq(contact.id, invoice.contactId))
            .orderBy(desc(invoice.invoiceSerial))
            .where(eq(invoice.contactId, contactId))


        if (!result) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    invoices: result
                }
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

