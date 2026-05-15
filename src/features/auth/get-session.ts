"use server"
import { headers } from 'next/headers';
import { session } from '@/db/schema';
import { and, eq, gt } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import { SESSION_COOKIE } from './session-utils';

export async function getSession() {
    const headerStore = await headers();
    const cookieHeader = headerStore.get('cookie') ?? '';

    // parsing session_token out of the cookie string
    const token = cookieHeader
        .split(';')
        .map(c => c.trim())
        .find(c => c.startsWith(SESSION_COOKIE + "="))
        ?.split('=')[1];

    //console.log(token)

    if (!token) return null;

    const [currentSession] = await db
        .select({
            userId: session.userId
        })
        .from(session)
        .where(and(
            eq(session.token, token),
            gt(session.expiresAt, new Date())   // not expired
        ))
        .limit(1);

    if (!currentSession) return null;

    return currentSession;  // has user_id, ip, device_hash, expires_at etc.
}