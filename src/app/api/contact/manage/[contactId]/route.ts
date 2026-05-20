import { db } from "@/db/drizzle";
import { contact } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { eq } from "drizzle-orm";
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

        const [data] = await db
            .select({
                id: contact.id,
                category: contact.category,

                name: contact.name,
                slug: contact.slug,
                mobile: contact.mobile,
                email: contact.email,

                gstin: contact.gstin,
                cin: contact.cin,
                pan: contact.pan,

                address: contact.address,
                address2: contact.address2,

                zipcode: contact.zipcode,
                city: contact.city,
                state: contact.state,
                country: contact.country,

                stateCode: contact.stateCode,
                currencyCode: contact.currencyCode,
            })
            .from(contact)
            .where(eq(contact.id, contactId))

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
        console.error('Error fetching contact by id: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

