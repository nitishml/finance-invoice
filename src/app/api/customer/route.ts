import { db } from "@/db/drizzle";
import { count, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { customer } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { addCustomerApiSchema } from "@/features/customer/types";

export async function GET(request: NextRequest) {
    try {
        // const session = await getSession();
        // if (!session) return NextResponse.json({
        //     success: false,
        //     message: "Unauthorized",
        //     data: null,
        // }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = (page - 1) * limit;

        const [customers, total] = await Promise.all([
            db
                .select({
                    id: customer.id,
                    name: customer.name,
                    slug: customer.slug,
                    mobile: customer.mobile,
                    city: customer.city,
                })
                .from(customer)
                .orderBy(desc(customer.createdAt))
                .limit(limit)
                .offset(offset),

            db
                .select({ count: count() })
                .from(customer)
        ]);

        return NextResponse.json(
            {
                success: true,
                data: {
                    customers,
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
        console.error('Error fetching customers: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // const session = await getSession();
        // if (!session) return NextResponse.json({
        //     success: false,
        //     message: "Unauthorized",
        //     data: null,
        // }, { status: 401 });

        const body = await request.json();
        const validatedData = addCustomerApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        const [newCustomer] = await db
            .insert(customer)
            .values({
                ...values

            })
            .returning({
                id: customer.id
            })

        if (!newCustomer) return NextResponse.json({
            success: false,
            message: "Customer Addition Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Customer Added Successfully",
                data: {
                    id: newCustomer.id,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating new customer: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}