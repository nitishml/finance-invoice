"use client"
import "@/app/globals.css";
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Poppins } from "next/font/google"
import { useRouter } from "next/navigation";

const siteFont = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})


export default function GlobalNotFound() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const handleForward = () => {
        // Note: router.forward() doesn't exist in Next.js App Router
        // Using window.history.forward() as alternative
        if (typeof window !== 'undefined') {
            window.history.forward();
        }
    };
    return (
        <main className={siteFont.className}>
            <section className='text-custom-primary-500  gap-2 py-10'>
                <div className='pt-20 lg:pt-40 flex flex-col items-center justify-center gap-2'>
                    <h1 className='text-2xl md:text-4xl text-center'>Not Found</h1>
                    <p className='text-center'>The page you are looking for does not exist.</p>

                    <div className="hidden md:flex items-center space-x-2">
                        <Button
                            onClick={handleBack}
                            aria-label="Go back"
                            title="Go back"
                            variant={'default'}
                            size={'lg'}
                        >

                            <ChevronLeft className="w-5 h-5" />
                            Back
                        </Button>
                        <Button asChild variant={'default'} size={'lg'}>
                            <Link href={'/'}><Home /> Home </Link>
                        </Button>

                    </div>
                </div>
            </section>
        </main>
    )
}