import { db } from "@/db/drizzle";
import { count, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { contact, invoice, invoiceStatusEnum } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { addInvoiceApiSchema } from "@/features/invoice/types";
import { rupeesToPaisa } from "@/lib/utils";

const VALID_STATUSES = invoiceStatusEnum.enumValues

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const rawStatus = searchParams.get('status')
        const statusFilter = VALID_STATUSES.includes(rawStatus as typeof VALID_STATUSES[number])
            ? rawStatus as typeof VALID_STATUSES[number]
            : null
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = (page - 1) * limit;



        const [invoices, total] = await Promise.all([
            db
                .select({
                    id: invoice.id,
                    status: invoice.status,
                    account: invoice.account,
                    total: invoice.total,

                    expectedPaymentDate: invoice.expectedPaymentDate,
                    paymentDate: invoice.paymentDate,
                    createdDate: invoice.createdAt,
                    cancelledDate: invoice.cancelledDate,
                    arrearedDate: invoice.arrearedDate,

                    expenseType: invoice.expenseType,
                    name: contact.name,
                    slug: contact.slug,

                })
                .from(invoice)
                .innerJoin(contact, eq(contact.id, invoice.contactId))
                .orderBy(desc(invoice.createdAt))
                .where(statusFilter ? eq(
                    invoice.status, statusFilter
                ) : undefined)
                .limit(limit)
                .offset(offset),

            db
                .select({ count: count() })
                .from(invoice)
        ]);

        return NextResponse.json(
            {
                success: true,
                data: {
                    invoices,
                    pagination: {
                        page,
                        limit,
                        total: total[0].count,
                        pages: Math.ceil(total[0].count / limit),
                    },
                }
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

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const body = await request.json();
        const validatedData = addInvoiceApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        const [newInvoice] = await db
            .insert(invoice)
            .values({
                contactId: values.contactId,
                handledBy: session.userId,
                account: values.account,
                status: "DRAFT",

                price: rupeesToPaisa(values.price),
                taxAmount: rupeesToPaisa(values.taxAmount),
                gstAmount: rupeesToPaisa(values.gstAmount),
                total: rupeesToPaisa(values.total),

                expectedPaymentDate: values.expectedPaymentDate

            })
            .returning({
                id: contact.id
            })

        if (!newInvoice) return NextResponse.json({
            success: false,
            message: "Invoice Creation Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Invoice Created Successfully",
                data: {
                    id: newInvoice.id,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating invoice: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}