import { db } from "@/db/drizzle";
import { count, desc, ne, or, isNull, sql, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { contact } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const contacts = await db
            .select({
                id: contact.id,
                name: contact.name,
                slug: contact.slug,
                mobile: contact.mobile,
                email: contact.email,
                category: contact.category
            })
            .from(contact)
            .orderBy(desc(contact.createdAt))

        return NextResponse.json(
            {
                success: true,
                data: {
                    contacts,
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
