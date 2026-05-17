import { db } from "@/db/drizzle";
import { contact, invoice, invoiceItem } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { saveDraftApiSchema } from "@/features/invoice/types";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
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

        const [data] = await db
            .select({
                id: contact.id,
                name: contact.name,
                slug: contact.slug,

                mobile: contact.mobile,
                email: contact.email,
                gstin: contact.gstin,

                address: contact.address,
                address2: contact.address2,

                zipcode: contact.zipcode,
                city: contact.city,
                state: contact.state,
                country: contact.country,

                invoiceNumber: invoice.invoiceNumber,
                invoiceDate: invoice.invoiceDate,
                description: invoice.description,

                amount: invoice.amount,
                cgst: invoice.cgst,
                sgst: invoice.sgst,
                total: invoice.total,

                dueDate: invoice.dueDate,
                status: invoice.status,
            })
            .from(invoice)
            .where(eq(invoice.id, invoiceId))
            .innerJoin(contact, eq(contact.id, invoice.contactId))

        const items = await db
            .select()
            .from(invoiceItem)
            .where(eq(invoiceItem.invoiceId, invoiceId))

        if (!data) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        return NextResponse.json(
            {
                success: true,
                data: {
                    invoice: data,
                    items,
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching draft invoice by id: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

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
        const validatedData = saveDraftApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        await db
            .update(invoice)
            .set({
                amount: values.amount,
                cgst: values.cgst,
                sgst: values.sgst,
                total: values.total,
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

