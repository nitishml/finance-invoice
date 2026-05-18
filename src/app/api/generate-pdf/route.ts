import { NextRequest, NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

// Required for Vercel — gives the function enough time to spin up Chromium
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// Hosted zip of Chromium binaries (use this exact URL or self-host on S3)
const CHROMIUM_REMOTE_EXEC_PATH =
    'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar';

async function getBrowser() {
    //   const isDev = process.env.NODE_ENV === 'development';

    //   if (isDev) {
    //     // Locally, use your installed Chrome
    //     const puppeteerDev = await import('puppeteer');
    //     return puppeteerDev.default.launch({ headless: true });
    //   }

    // Production: use chromium-min
    const executablePath = await chromium.executablePath(CHROMIUM_REMOTE_EXEC_PATH);

    return puppeteer.launch({
        args: chromium.args,
        // defaultViewport: chromium.defaultViewport,
        executablePath,
        // headless: chromium.headless,
    });
}

export async function POST(req: NextRequest) {
    let browser = null;

    try {
        const { url, filename = 'document.pdf', format = 'A4' } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'url is required' }, { status: 400 });
        }

        // Only allow rendering internal URLs
        const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL;
        if (!url.startsWith(allowedOrigin)) {
            return NextResponse.json({ error: 'URL not allowed' }, { status: 403 });
        }

        browser = await getBrowser();
        const page = await browser.newPage();

        await page.setViewport({ width: 794, height: 1123 }); // A4 at 96dpi

        // Forward auth cookies so protected routes work
        const cookieHeader = req.headers.get('cookie');
        if (cookieHeader) {
            const parsed = cookieHeader.split(';').map((c) => {
                const [name, ...rest] = c.trim().split('=');
                return {
                    name: name.trim(),
                    value: rest.join('=').trim(),
                    domain: new URL(url).hostname,
                };
            });
            await page.setCookie(...parsed);
        }

        await page.goto(url, {
            waitUntil: 'networkidle0', // waits for all network requests to finish
            timeout: 30000,
        });

        // Optional: wait for a sentinel element to confirm render is complete
        // await page.waitForSelector('[data-pdf-ready]', { timeout: 10000 });

        const pdf = await page.pdf({
            format: format as 'A4' | 'Letter',
            printBackground: true,
            margin: { top: '24px', right: '24px', bottom: '24px', left: '24px' },
        });

        // Convert Uint8Array → Buffer for NextResponse compatibility
        const pdfBuffer = Buffer.from(pdf);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'no-store',
            },
        });
    } catch (err) {
        console.error('[generate-pdf]', err);
        return NextResponse.json(
            { error: 'Failed to generate PDF', detail: (err as Error).message },
            { status: 500 }
        );
    } finally {
        if (browser) await browser.close();
    }
}