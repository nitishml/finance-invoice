import { db } from "@/db/drizzle";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { contact } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { addEmployeeContactApiSchema } from "@/features/employee/types";
import { employee } from "@/db/schema";

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
                //officialEmail: employee.officialEmail,
                department: employee.department,
                designation: employee.designation,
            })
            .from(contact)
            .where(eq(contact.category, "EMPLOYEE"))
            .innerJoin(employee, eq(employee.id, contact.id))
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
        console.error('Error fetching employee contacts: ', error);
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
        const validatedData = addEmployeeContactApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        const [newContact] = await db
            .insert(contact)
            .values({
                category: "EMPLOYEE",
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
            .insert(employee)
            .values({
                id: newContact.id,
                department: values.department,
                designation: values.designation,

                adhaar: values.adhaar,
                pan: values.pan,

                alternateContact: values.alternateContact,
                officialEmail: values.officialEmail,
                contactAddress: values.contactAddress,
            })

        return NextResponse.json(
            {
                success: true,
                message: "Employee Contact Added Successfully",
                data: {
                    id: newContact.id,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating new employee contact: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}