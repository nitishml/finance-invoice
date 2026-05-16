import { db } from "@/db/drizzle";
import { count, desc, ne, or, isNull, max } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { invoice } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const [{ maxSerial }] = await db
            .select({
                maxSerial: max(invoice.invoiceSerial)
            })
            .from(invoice)

        return NextResponse.json(
            {
                success: true,
                data: {
                    maxSerial: maxSerial || 0,
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching invoice number: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
