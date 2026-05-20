import { db } from "@/db/drizzle";
import { count, desc, ne, or, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { contact } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { addContactApiSchema } from "@/features/contact/types";

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
                city: contact.city,
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

export async function POST(request: NextRequest) {
    try {
        // const session = await getSession();
        // if (!session) return NextResponse.json({
        //     success: false,
        //     message: "Unauthorized",
        //     data: null,
        // }, { status: 401 });

        const body = await request.json();
        const validatedData = addContactApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        const [newContact] = await db
            .insert(contact)
            .values({
                ...values
            })
            .returning({
                id: contact.id
            })

        if (!newContact) return NextResponse.json({
            success: false,
            message: "Contact Addition Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "Contact Added Successfully",
                data: {
                    id: newContact.id,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating new contact: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}