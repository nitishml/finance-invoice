import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { user } from "@/db/schema";
import { db } from "@/db/drizzle";
import { hashPassword } from "@/features/auth/session-utils";

//extremely risky API, comment it fully after use

const createUserSchema = z.object({
    mobile: z.string().min(10, "Phone number must be at least 10 digits").max(15),
    name: z.string().min(1, "Name is required").max(100),
    email: z.email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = createUserSchema.safeParse(body);

        if (!validatedData.success) return NextResponse.json({
            success: false,
            message: "Bad Request",
            data: null,
        }, { status: 400 });

        const { mobile, name, email, password } = validatedData.data
        const hashed = await hashPassword(password);
        const [newUser] = await db
            .insert(user)
            .values({
                name,
                mobile,
                email,
                isActive: true,
                hashedPassword: hashed
            })
            .returning({
                id: user.id
            })

        if (!newUser) return NextResponse.json({
            success: false,
            message: "Signup Failed",
            data: null,
        }, { status: 404 });

        return NextResponse.json(
            {
                success: true,
                message: "User Created Successfully",
                data: {
                    user: {
                        id: newUser.id,
                    },
                },
            },
            { status: 200 }
        );


    } catch (error) {
        console.error('Error creating user: ', error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}