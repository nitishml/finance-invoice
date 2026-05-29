import { db } from "@/db/drizzle";
import { asc, ilike, eq, lt, and, or, desc, SQL } from "drizzle-orm";
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

        const { searchParams } = new URL(request.url);
        const searchSlug = searchParams.get('slug')
        const searchName = searchParams.get('name')
        const searchMobile = searchParams.get('mobile')

        if (!searchSlug && !searchName && !searchMobile) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        console.log("paaaa: ", searchSlug, searchName, searchMobile)

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
            .where(and(
                searchSlug ? ilike(contact.slug, `%${searchSlug}%`) : undefined,
                searchName ? ilike(contact.name, `%${searchName}%`) : undefined,
                searchMobile ? ilike(contact.mobile, `%${searchMobile}%`) : undefined,
            ))
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