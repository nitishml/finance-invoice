import { db } from "@/db/drizzle";
import { customer } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ customerId: string }> }
) {
    try {
        const { customerId } = await params
        if (!customerId) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        // const session = await getSession();
        // if (!session) return NextResponse.json({
        //     success: false,
        //     message: "Unauthorized",
        //     data: null,
        // }, { status: 401 });

        const [data] = await db
            .select({
                id: customer.id,
                name: customer.name,
                slug: customer.slug,

                mobile: customer.mobile,
                email: customer.email,
                gstin: customer.gstin,

                address: customer.address,
                zipcode: customer.zipcode,
                city: customer.city,
                state: customer.state,
                country: customer.country,
            })
            .from(customer)
            .where(eq(customer.id, customerId))

        if (!data) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        return NextResponse.json(
            {
                success: true,
                data
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching customer by id: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

