import { db } from "@/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { financialAccount } from "@/db/schema";
import { getSession } from "@/features/auth/get-session";
import { addAccountApiSchema } from "@/features/accounting/types";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const rows = await db
            .select({
                id: financialAccount.id,
                accountType: financialAccount.accountType,
                title: financialAccount.title,
                slug: financialAccount.slug,
                description: financialAccount.description,
            })
            .from(financialAccount)
            .orderBy(financialAccount.accountType);

        // const accounts = Object.entries(
        //     Object.groupBy(rows, (row) => row.accountType)
        // ).map(([accountType, items]) => ({
        //     accountType,
        //     items: items!.map(({ id, title, slug, description }) => ({ id, title, slug, description })),
        // }));


        return NextResponse.json(
            {
                success: true,
                data: rows,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching financial accounts: ', error);
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
        const validatedData = addAccountApiSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const values = validatedData.data

        const [newAccount] = await db
            .insert(financialAccount)
            .values({
                accountType: values.accountType,
                title: values.title,
                slug: values.slug,
                description: values.description,
                isActive: true,
            })
            .returning({
                id: financialAccount.id
            })

        if (!newAccount) return NextResponse.json({
            success: false,
            message: "Account Addition Failed",
            data: null,
        }, { status: 404 });


        return NextResponse.json(
            {
                success: true,
                message: "Account Added Successfully",
                data: {
                    id: newAccount.id,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating new account: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}