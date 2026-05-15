"use client";

import Link from "next/link";

const footerLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Cookie Policy", href: "/legal/cookie-policy" },
];

export function GeneralFooter() {
    return (
        <footer className="hidden md:block w-full z-10 self-end">
            <div className="max-w-fit  bg-muted/70 p-6 pb-4 mx-auto rounded-md">
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-base mb-4">
                    {footerLinks.map((link, index) => (
                        <div key={link.href} className="flex items-center gap-2 sm:gap-4">
                            <Link href={link.href} className="hover:underline underline-offset-4">
                                {link.label}
                            </Link>
                            {index < footerLinks.length - 1 && (
                                <span className="text-black/40">|</span>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-xs md:text-sm text-center">
                    © 2026 Growsharp Technologies Pvt.Ltd. All rights reserved.
                </p>
            </div>
        </footer>
    );
}