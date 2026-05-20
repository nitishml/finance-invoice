import { db } from "@/db/drizzle";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { contact } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { customer } from "@/db/schema";
import { addCustomerContactApiSchema } from "@/features/customer/types";

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
                city: contact.city,
            })
            .from(contact)
            .where(eq(contact.category, "CUSTOMER"))
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
        console.error('Error fetching customer contacts: ', error);
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
        const validatedData = addCustomerContactApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        const [newContact] = await db
            .insert(contact)
            .values({
                category: "CUSTOMER",
                name: values.name,
                slug: values.slug,

                mobile: values.mobile,
                email: values.email,

                address: values.address,
                address2: values.address2,

                city: values.city,
                state: values.state,
                country: values.country,
                zipcode: values.zipcode,

                stateCode: values.stateCode,
                currencyCode: values.currencyCode
            })
            .returning({
                id: contact.id
            })

        if (!newContact) return NextResponse.json({
            success: false,
            message: "Contact Addition Failed",
            data: null,
        }, { status: 404 });

        await db
            .insert(customer)
            .values({
                id: newContact.id,

                gstin: values.gstin,
                cin: values.cin,
                pan: values.pan,

                pocName: values.pocName,
                pocContact: values.pocContact,
                pocEmail: values.pocEmail,

                websiteUrl: values.websiteUrl,
                remarks: values.remarks,
            })

        return NextResponse.json(
            {
                success: true,
                message: "Customer Contact Added Successfully",
                data: {
                    id: newContact.id,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating new customer contact: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}