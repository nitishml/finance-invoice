import * as schema from "./schema";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-serverless";
import { Logger } from "drizzle-orm/logger";

class MyLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
        if (process.env.NODE_ENV !== "production") {
            console.log('Query:', query);
            console.log('Params:', params);
        }
    }
}

// only polyfill ws in Node runtime (API routes)
// edge runtime has native WebSocket - no polyfill needed
if (typeof WebSocket === 'undefined') {
    const ws = await import('ws');
    neonConfig.webSocketConstructor = ws.default;
}

// Neon recommends these for serverless environments
// use HTTP fetch for single queries for faster cold starts (verify from latest neon docs if this is still needed)
neonConfig.poolQueryViaFetch = true;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    max: 5, // cap connections per serverless instance
});

export const db = drizzle({ client: pool, schema, logger: new MyLogger() });
