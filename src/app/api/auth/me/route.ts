
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/features/auth/get-session";

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session) return NextResponse.json({
            success: false,
            message: "Unauthorized",
            data: null,
        }, { status: 401 });

        const [userData] = await db
            .select({
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            })
            .from(user)
            .where(eq(user.id, session.userId))

        if (!userData) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        return NextResponse.json(
            {
                success: true,
                message: "User Data",
                data: userData
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error fetching user Data', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}