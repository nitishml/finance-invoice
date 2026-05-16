"use server"

import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import { db } from "@/db/drizzle";
import { session } from "@/db/schema";
import { SESSION_COOKIE } from './session-utils';

export async function logout() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (token) {
        // Delete session from DB first
        await db.delete(session).where(eq(session.token, token));
    }

    // Clear the cookie regardless
    cookieStore.delete(SESSION_COOKIE);
}