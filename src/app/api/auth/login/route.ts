import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { account, session, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { generateSessionToken, SESSION_COOKIE, TTL_SECONDS, verifyPassword } from "@/features/auth/session-utils";
// import { getRequestMetadata } from "@/features/auth/header-utils";

const loginSchema = z.object({
    mobile: z.string().min(10, "Mobile must be at least 8 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const validatedData = loginSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { mobile, password } = validatedData.data

        const [userData] = await db
            .select({
                id: user.id,
                hashedPassword: account.hashedPassword
            })
            .from(user)
            .where(and(
                eq(user.mobile, mobile),
                eq(user.isActive, true)
            ))
            .innerJoin(account, eq(account.userId, user.id),)

        if (!userData || !userData.hashedPassword) return NextResponse.json({
            success: false,
            message: "Invalid Login",
            data: null,
        }, { status: 404 });

        const isMatch = await verifyPassword(password, userData.hashedPassword);

        if (!isMatch) return NextResponse.json({
            success: false,
            message: "Invalid Login",
            data: null,
        }, { status: 404 });

        const token = generateSessionToken();
        const expiresAt = new Date(Date.now() + TTL_SECONDS * 1000);
        // const { ip, userAgent } = await getRequestMetadata(request);

        const cookieStore = await cookies();
        // once we set it, next js will take care of sending it as header
        cookieStore.set(SESSION_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: expiresAt,
        });

        await db
            .insert(session)
            .values({
                userId: userData.id,
                token,
                expiresAt,
                // ipAddress: ip,
                // userAgent,
            })

        return NextResponse.json(
            {
                success: true,
                message: "Login Successful",
                data: {
                    //token,              // for native mobile clients
                    //expiresAt,
                    user: {
                        id: userData.id,
                    },
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error login: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}