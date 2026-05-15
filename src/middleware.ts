import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for API routes, auth routes, static files
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/favicon.ico') ||
        pathname.startsWith('/auth') ||
        pathname.startsWith('/legal')
    ) {
        return NextResponse.next();
    }

    // const sessionCookie = getSessionCookie(request, {
    //     cookiePrefix: "gs_fin.session_token"

    // });

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route

    // if (!sessionCookie) {
    //     return NextResponse.redirect(new URL("/auth/login", request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        '/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)',
    ],
    //runtime: 'nodejs',
};