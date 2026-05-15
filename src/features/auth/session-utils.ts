
export const SESSION_COOKIE = 'gs_fin.session_token';
export const TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days


const PBKDF2_ITERATIONS = 100_000;

// --- Session Token ---

export function generateSessionToken(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return btoa(String.fromCharCode(...bytes))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// --- Password Hashing (PBKDF2, edge-compatible) ---

const enc = new TextEncoder();

async function pbkdf2(password: string, salt: Uint8Array): Promise<Uint8Array> {
    const key = await crypto.subtle.importKey(
        "raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: salt.buffer as ArrayBuffer, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
        key, 256
    );
    return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const hash = await pbkdf2(password, salt);
    // store as: iterations$salt(hex)$hash(hex)
    const hex = (b: Uint8Array) => [...b].map(x => x.toString(16).padStart(2, '0')).join('');
    return `pbkdf2$${PBKDF2_ITERATIONS}$${hex(salt)}$${hex(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
    const [, , saltHex, hashHex] = stored.split('$');
    const fromHex = (h: string) => new Uint8Array(h.match(/../g)!.map(x => parseInt(x, 16)));

    const salt = fromHex(saltHex);
    const expected = fromHex(hashHex);
    const attempt = await pbkdf2(password, salt);

    // timing-safe compare
    if (attempt.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < attempt.length; i++) diff |= attempt[i] ^ expected[i];
    return diff === 0;
}