import React from "react";

// ─── Color tokens (exact from Figma) ────────────────────────────────────────
const TEAL = "#3A8C8C";       // primary teal
const TEAL_DARK = "#2E7070";  // slightly darker teal for depth
const BEIGE = "#C8B89A";      // warm beige / tan accent
const TEXT_PRIMARY = "#1A1A1A";
const TEXT_SECONDARY = "#444444";
const TEXT_MUTED = "#666666";
const DIVIDER = "#3A8C8C";

// ─── Decorative Shapes ───────────────────────────────────────────────────────

/** Top-right corner decoration: overlapping teal + beige parallelograms */
const TopRightDecoration: React.FC = () => (
    <svg
        width="720"
        height="90"
        viewBox="0 0 794 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: "block" }}
    >
        {/* Beige / tan parallelogram — behind */}
        <polygon points="80,0 220,0 220,90 140,90" fill={TEAL} />
        {/* Teal parallelogram — in front, offset left */}
        {/* <polygon points="30,0 160,0 160,90 60,90" fill={BEIGE} opacity="0.92" /> */}
    </svg>
);

/** Divider line accent: small teal parallelogram on the right end of the rule */
const DividerAccent: React.FC = () => (
    <svg
        width="56"
        height="10"
        viewBox="0 0 56 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: "block" }}
    >
        <polygon points="8,0 56,0 48,10 0,10" fill={TEAL} />
    </svg>
);

/** Bottom-right decoration: large overlapping beige + teal parallelograms */
const BottomRightDecoration: React.FC = () => (
    <svg
        width="260"
        height="120"
        viewBox="0 0 260 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: "block" }}
    >
        {/* Beige parallelogram — behind, taller */}
        <polygon points="90,0 260,0 260,120 170,120" fill={BEIGE} />
        {/* Teal parallelogram — in front */}
        <polygon points="30,0 200,0 200,120 90,120" fill={TEAL} opacity="0.92" />
        {/* Small darker teal strip accent inside teal shape */}
        <polygon points="30,90 200,90 200,120 90,120" fill={TEAL_DARK} opacity="0.4" />
    </svg>
);

// ─── Logo SVG (triangular arrow/mountain mark) ───────────────────────────────
const GrowsharpLogo: React.FC<{ size?: number }> = ({ size = 72 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Growsharp Technologies logo"
        role="img"
    >
        {/* Outer teal triangle */}
        <polygon points="36,4 68,64 4,64" fill="none" stroke={TEAL} strokeWidth="3.5" />
        {/* Inner beige filled shape / arrow */}
        <polygon points="36,18 56,56 16,56" fill={BEIGE} />
        {/* Teal arrow/chevron overlay */}
        <polygon points="36,22 52,52 36,44 20,52" fill={TEAL} />
        {/* White cutout to form arrow negative space */}
        <polygon points="36,34 46,52 36,47 26,52" fill="white" />
        {/* Horizontal base line accent */}
        <line x1="10" y1="64" x2="62" y2="64" stroke={TEAL} strokeWidth="2.5" />
    </svg>
);

// ─── Icon primitives ──────────────────────────────────────────────────────────
const IconPin: React.FC = () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="8" cy="6" r="2.5" stroke={TEAL} strokeWidth="1.5" />
        <path d="M8 2C5.79 2 4 3.79 4 6c0 3.5 4 8 4 8s4-4.5 4-8c0-2.21-1.79-4-4-4z" stroke={TEAL} strokeWidth="1.5" fill="none" />
    </svg>
);
const IconPhone: React.FC = () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
        <path d="M3 2h3l1.5 3.5-1.75 1.25a8 8 0 003.5 3.5L10.5 8.5 14 10v3a1 1 0 01-1 1C6.27 14 2 9.73 2 4a1 1 0 011-2z" stroke={TEAL} strokeWidth="1.3" fill="none" />
    </svg>
);
const IconMail: React.FC = () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
        <rect x="2" y="4" width="12" height="8" rx="1" stroke={TEAL} strokeWidth="1.3" fill="none" />
        <path d="M2 5l6 4.5L14 5" stroke={TEAL} strokeWidth="1.3" />
    </svg>
);
const IconGlobe: React.FC = () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
        <circle cx="8" cy="8" r="5.5" stroke={TEAL} strokeWidth="1.3" fill="none" />
        <ellipse cx="8" cy="8" rx="2.5" ry="5.5" stroke={TEAL} strokeWidth="1.3" fill="none" />
        <line x1="2.5" y1="8" x2="13.5" y2="8" stroke={TEAL} strokeWidth="1.3" />
    </svg>
);

// ─── Main Letterhead Component ────────────────────────────────────────────────

export interface LetterheadProps {
    /** Slot for the letter body content */
    children?: React.ReactNode;
}

const Letterhead: React.FC<LetterheadProps> = ({ children }) => {
    return (
        <div
            style={{
                width: "794px",           // A4 @ 96dpi
                minHeight: "1123px",      // A4 @ 96dpi
                backgroundColor: "#ffffff",
                fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                position: "relative",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* ── HEADER ────────────────────────────────────────────────────── */}
            <header style={{ position: "relative", overflow: "hidden", paddingBottom: 0 }}>
                {/* Top-right decoration — absolutely positioned */}
                <div

                    className="w-full absolute top-0 right-0 h-24 border "
                >
                    <TopRightDecoration />
                </div>

                {/* Logo + Company name row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "18px",
                        padding: "22px 36px 0 36px",
                        position: "relative",
                        zIndex: 1,
                    }}
                    className="mt-20"
                >
                    <GrowsharpLogo size={72} />

                    <div>
                        <h1
                            style={{
                                margin: 0,
                                fontSize: "26px",
                                fontWeight: 700,
                                color: TEXT_PRIMARY,
                                letterSpacing: "0.01em",
                                lineHeight: 1.2,
                            }}
                        >
                            Growsharp Technologies Pvt.Ltd
                        </h1>
                        <p
                            style={{
                                margin: "3px 0 0",
                                fontSize: "12.5px",
                                color: TEXT_SECONDARY,
                                fontWeight: 400,
                                letterSpacing: "0.03em",
                            }}
                        >
                            Grow Intelligence, Sharpen Innovation
                        </p>
                    </div>
                </div>

                {/* Divider row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "14px 36px 16px 36px",
                        gap: 0,
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: DIVIDER,
                        }}
                    />
                    <div style={{ marginLeft: "8px", lineHeight: 0 }}>
                        <DividerAccent />
                    </div>
                </div>
            </header>

            {/* ── BODY CONTENT SLOT ─────────────────────────────────────────── */}
            <main
                style={{
                    flex: 1,
                    padding: "8px 36px 24px 36px",
                    fontSize: "13px",
                    color: TEXT_PRIMARY,
                    lineHeight: 1.7,
                }}
            >
                {children}
            </main>

            {/* ── FOOTER ────────────────────────────────────────────────────── */}
            <footer
                style={{
                    position: "relative",
                    overflow: "hidden",
                    marginTop: "auto",
                }}
            >
                {/* Footer content row */}
                <div
                    style={{
                        display: "flex",
                        gap: "40px",
                        padding: "18px 36px 20px 36px",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* Address block */}
                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <IconPin />
                        <p
                            style={{
                                margin: 0,
                                fontSize: "11px",
                                color: TEXT_MUTED,
                                lineHeight: 1.6,
                                maxWidth: "220px",
                            }}
                        >
                            616, Outer Ring Rd, CG Chinnappa Naidu
                            <br />
                            Layout, Banashankari 3rd Stage, Banashankari,
                            <br />
                            Bengaluru, Karnataka 560085
                        </p>
                    </div>

                    {/* Contact block */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                            <IconPhone />
                            <span style={{ fontSize: "11px", color: TEXT_MUTED }}>
                                +91 80885 13215 | 91084 07851
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                            <IconMail />
                            <span style={{ fontSize: "11px", color: TEXT_MUTED }}>
                                support@growsharptech.com
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "7px" }}>
                            <IconGlobe />
                            <span style={{ fontSize: "11px", color: TEXT_MUTED }}>
                                www.growsharptech.com
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom-right decoration */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        lineHeight: 0,
                    }}
                >
                    <BottomRightDecoration />
                </div>
            </footer>
        </div>
    );
};

export default Letterhead;