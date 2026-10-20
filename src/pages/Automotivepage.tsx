import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Truck,
    Tractor as TractorIcon,
    FileText,
    CheckCircle2,
    Clock,
    Handshake,
    Headphones,
} from "lucide-react";
import { trackQuoteCtaClick } from "../utils/analytics";

/* ------------------------------------------------------------------ */
/* Assets & Data Definitions                                          */
/* ------------------------------------------------------------------ */

const ASSETS = {
    hero: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Industrial%20Vehicles%20and%20Precision%20Components%20%281%29.webp",
    closing: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/cta%20image.webp",
    truckVideo: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/optimized-videos/Automotive-videos/Truck_exploded_parts_visualizati%E2%80%A6_1080p_20261019205938.mp4",
    tractorVideo: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/optimized-videos/Automotive-videos/Red_tractor_on_white_background_20261019184449.mp4",
};

const BLUE = "#2563eb";

const ctaBadges = [
    { icon: CheckCircle2, label: "Quality\nAssured" },
    { icon: Clock, label: "On-Time\nDelivery" },
    { icon: Handshake, label: "Trusted\nPartnership" },
    { icon: Headphones, label: "Dedicated\nSupport" },
];

/* ------------------------------------------------------------------ */
/* Shared components                                                  */
/* ------------------------------------------------------------------ */

/** Clean video player that plays when scrolled into view, has no controls, and stops at end */
function ScrollVideo({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasEndedRef = useRef(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force muted on DOM element for browser autoplay compatibility
        video.muted = true;

        const handleEnded = () => {
            hasEndedRef.current = true;
        };
        video.addEventListener("ended", handleEnded);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!hasEndedRef.current) {
                        video.play().catch(() => {
                            // Suppress browser autoplay policy rejections
                        });
                    }
                } else {
                    if (!hasEndedRef.current && !video.paused) {
                        video.pause();
                    }
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(video);

        return () => {
            video.removeEventListener("ended", handleEnded);
            observer.disconnect();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="auto"
            className="w-full aspect-video object-contain bg-black"
        />
    );
}

/** Section mark with line on the left — responsive for mobile & desktop */
function SectionMark({ label, color = BLUE }: { label: string; color?: string }) {
    return (
        <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="h-px w-7 sm:w-10 shrink-0" style={{ backgroundColor: color }} />
            <span
                className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em]"
                style={{ color }}
            >
                {label}
            </span>
        </div>
    );
}

/** Centered section mark with lines on both sides — responsive for mobile */
function CenteredMark({ label, color = BLUE }: { label: string; color?: string }) {
    return (
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 max-w-full px-2">
            <span className="h-px w-5 sm:w-12 shrink-0" style={{ backgroundColor: color }} />
            <span
                className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.25em] text-center"
                style={{ color }}
            >
                {label}
            </span>
            <span className="h-px w-5 sm:w-12 shrink-0" style={{ backgroundColor: color }} />
        </div>
    );
}

/** Decorative diagonal shapes for CTA background */
function GeoShapes() {
    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
        >
            <div
                className="absolute -right-24 -top-24 h-[420px] w-[320px] opacity-70 sm:opacity-100"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(29,78,216,0.07) 0%, rgba(29,78,216,0.02) 100%)",
                    transform: "rotate(15deg) skewX(-8deg)",
                    borderRadius: "8px",
                }}
            />
            <div
                className="absolute right-8 sm:right-16 -top-8 h-[240px] sm:h-[300px] w-[160px] sm:w-[200px] opacity-70 sm:opacity-100"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(29,78,216,0.05) 0%, transparent 100%)",
                    transform: "rotate(22deg) skewX(-8deg)",
                    borderRadius: "8px",
                }}
            />
            <div
                className="absolute -bottom-16 -left-16 h-[160px] sm:h-[200px] w-[130px] sm:w-[160px] opacity-60 sm:opacity-100"
                style={{
                    background:
                        "linear-gradient(340deg, rgba(29,78,216,0.04) 0%, transparent 100%)",
                    transform: "rotate(-15deg) skewX(8deg)",
                    borderRadius: "8px",
                }}
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function AutomotivePage() {
    return (
        <main className="w-full bg-white text-slate-900 overflow-x-hidden">
            {/* ========================================================== */}
            {/* 1. HERO SECTION                                            */}
            {/* Pixel-perfect match to reference design                   */}
            {/* ========================================================== */}
            <section className="relative w-full overflow-hidden bg-white pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-28 lg:pb-20 xl:pt-32 xl:pb-24 min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[700px] flex items-center">
                {/* Background Image Container */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                    {/* The Full Panoramic Vehicle & Precision Components Image */}
                    <img
                        src={ASSETS.hero}
                        alt="Commercial Trucks, Tractors, Vehicles and Precision Components"
                        className="absolute inset-0 h-full w-full object-cover object-[78%_center] sm:object-[90%_bottom] md:object-[93%_bottom] lg:object-[95%_bottom] xl:object-[96%_bottom]"
                    />

                    {/* Tech Floor Wedge (soft icy-blue polygon under cards & behind components) */}
                    <div
                        className="hidden lg:block absolute bottom-0 left-[38%] w-[42%] h-[44%] pointer-events-none opacity-85"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(219, 234, 254, 0.55) 0%, rgba(191, 219, 254, 0.15) 100%)",
                            clipPath: "polygon(18% 100%, 100% 0%, 100% 100%, 0% 100%)",
                        }}
                    />

                    {/* Central Diagonal Tech Accent Lines behind car */}
                    <svg
                        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Upper horizontal notch */}
                        <line
                            x1="49%"
                            y1="22%"
                            x2="53%"
                            y2="22%"
                            stroke="#3b82f6"
                            strokeWidth="1.2"
                            strokeOpacity="0.3"
                        />
                        {/* Central diagonal accent line */}
                        <line
                            x1="49%"
                            y1="22%"
                            x2="43%"
                            y2="60%"
                            stroke="#3b82f6"
                            strokeWidth="1.2"
                            strokeOpacity="0.35"
                        />
                        {/* Lower diagonal connect */}
                        <line
                            x1="43%"
                            y1="60%"
                            x2="38%"
                            y2="100%"
                            stroke="#3b82f6"
                            strokeWidth="1"
                            strokeOpacity="0.2"
                        />

                        {/* Top-right diagonal tech accent lines above tractor */}
                        <line
                            x1="82%"
                            y1="8%"
                            x2="94%"
                            y2="26%"
                            stroke="#3b82f6"
                            strokeWidth="1"
                            strokeOpacity="0.3"
                        />
                        <line
                            x1="80%"
                            y1="12%"
                            x2="90%"
                            y2="28%"
                            stroke="#3b82f6"
                            strokeWidth="0.8"
                            strokeDasharray="4 3"
                            strokeOpacity="0.25"
                        />
                    </svg>

                    {/* Mobile-only background overlay to ensure text contrast and clean readability */}
                    <div
                        className="absolute inset-0 pointer-events-none sm:hidden"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 55%, rgba(255,255,255,0.7) 85%, rgba(255,255,255,0.45) 100%)",
                        }}
                    />

                    {/* Left-to-right fade gradient overlay for desktop/tablet to ensure text contrast */}
                    <div
                        className="hidden sm:block absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(90deg, #ffffff 0%, #ffffff 28%, rgba(255,255,255,0.96) 38%, rgba(255,255,255,0.6) 48%, rgba(255,255,255,0.05) 58%, transparent 68%)",
                        }}
                    />

                    {/* Subtle top fade for seamless navbar integration */}
                    <div
                        className="absolute inset-x-0 top-0 h-14 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)",
                        }}
                    />
                </div>

                {/* Top-Right "DRIVING — INDUSTRIES FORWARD" Tech Badge */}
                <div className="hidden lg:block absolute top-20 xl:top-24 right-8 lg:right-12 xl:right-16 z-20 pointer-events-none">
                    <div className="relative pl-6 pr-5 py-3">
                        {/* Angled geometric tech frame */}
                        <svg
                            className="absolute inset-0 w-full h-full"
                            viewBox="0 0 170 82"
                            fill="none"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 28 2 L 168 2 L 168 80 L 2 80 L 2 34 Z"
                                stroke="rgba(59, 130, 246, 0.4)"
                                strokeWidth="1.2"
                                fill="rgba(255, 255, 255, 0.25)"
                            />
                            {/* Blue accent indicator on top */}
                            <line
                                x1="28"
                                y1="2"
                                x2="48"
                                y2="2"
                                stroke="#2563eb"
                                strokeWidth="2.5"
                            />
                        </svg>

                        <div className="relative z-10 text-slate-400">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
                                    DRIVING
                                </span>
                                <span className="h-px w-3 bg-slate-400 inline-block" />
                            </div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 leading-tight">
                                INDUSTRIES
                            </div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400 leading-tight">
                                FORWARD
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Foreground Content - Shifted left matching Navbar max-w-[1536px] */}
                <div className="relative z-10 mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[560px] lg:max-w-[600px]">
                        {/* Eyebrow - Matching Main Hero style */}
                        <div className="flex items-center gap-2.5">
                            <span className="h-[2px] w-7 bg-[#2563eb]" />
                            <span className="text-[12px] sm:text-[14px] uppercase tracking-[0.14em] text-[#2563eb] font-semibold">
                                Automotive &amp; Agricultural
                            </span>
                        </div>

                        {/* Title / Headline - text-4xl font-bold (700) */}
                        <h1 className="mt-3.5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.06]">
                            <span className="block">Components for</span>
                            <span className="block text-[#2563eb]">
                                Commercial Trucks &amp; Tractors
                            </span>
                        </h1>

                        {/* Subheadline - Matching Main Hero font size and leading */}
                        <p className="mt-3.5 max-w-[540px] text-[13px] leading-relaxed text-slate-600 sm:text-[16px] sm:leading-[1.6]">
                            Forged, machined, and cast parts supplied across
                            the commercial automotive and agricultural equipment
                            industries. Drawings quoted within one business day.
                        </p>

                        {/* Action Buttons - Hidden on mobile, visible on sm and up */}
                        <div className="mt-6 hidden sm:flex flex-wrap items-center gap-3.5">
                            {/* Explore Products Button */}
                            <a
                                href="#truck"
                                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-[0.99]"
                            >
                                <span>Explore Products</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </a>

                            {/* Request a Quote Button */}
                            <Link
                                to="/#quote"
                                onClick={() => trackQuoteCtaClick("automotive_hero")}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/95 px-6 text-[15px] font-semibold text-slate-800 shadow-xs transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99]"
                            >
                                <FileText className="h-4 w-4 text-[#2563eb]" strokeWidth={2} />
                                <span>Request a Quote</span>
                            </Link>
                        </div>

                        {/* Quick Navigation Feature Cards - Hidden on mobile, visible on sm and up */}
                        <div className="mt-7 sm:mt-8 hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-[540px]">
                            {/* Trucks Card */}
                            <a
                                href="#truck"
                                className="group relative flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white/95 p-3.5 shadow-2xs backdrop-blur-md transition-all duration-200 hover:border-[#2563eb]/50 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb] border border-blue-100 group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-200">
                                        <Truck className="h-5 w-5" strokeWidth={1.8} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                                            Trucks
                                        </div>
                                        <p className="text-[12px] leading-tight text-slate-500 mt-0.5 truncate">
                                            Heavy-duty parts
                                        </p>
                                    </div>
                                </div>
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 group-hover:border-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-200">
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </div>
                            </a>

                            {/* Tractors Card */}
                            <a
                                href="#tractor"
                                className="group relative flex items-center justify-between gap-3 rounded-xl border border-slate-200/90 bg-white/95 p-3.5 shadow-2xs backdrop-blur-md transition-all duration-200 hover:border-[#2563eb]/50 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563eb] border border-blue-100 group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-200">
                                        <TractorIcon className="h-5 w-5" strokeWidth={1.8} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[14px] font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                                            Tractors
                                        </div>
                                        <p className="text-[12px] leading-tight text-slate-500 mt-0.5 truncate">
                                            Agricultural parts
                                        </p>
                                    </div>
                                </div>
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 group-hover:border-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all duration-200">
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 2. TRUCK VIDEO (Clean, video only, stops at end)           */}
            {/* ========================================================== */}
            <section
                id="truck"
                className="border-b border-slate-100 bg-white py-12 sm:py-16 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mx-auto mb-6 sm:mb-10 max-w-3xl text-center">
                        <CenteredMark label="Commercial Vehicle Parts" color={BLUE} />
                        <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-snug">
                            Heavy-Duty Components for Commercial Trucks
                        </h2>
                    </div>

                    <div className="mx-auto max-w-5xl overflow-hidden rounded-xl sm:rounded-2xl bg-black shadow-xl sm:shadow-2xl ring-1 ring-slate-900/10">
                        <ScrollVideo src={ASSETS.truckVideo} />
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 3. TRACTOR VIDEO (Clean, video only, stops at end)         */}
            {/* ========================================================== */}
            <section
                id="tractor"
                className="border-b border-slate-100 bg-slate-50/50 py-12 sm:py-16 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mx-auto mb-6 sm:mb-10 max-w-3xl text-center">
                        <CenteredMark label="Agricultural Equipment Parts" color={BLUE} />
                        <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-snug">
                            Heavy-Duty Components for Tractors & Harvesters
                        </h2>
                    </div>

                    <div className="mx-auto max-w-5xl overflow-hidden rounded-xl sm:rounded-2xl bg-black shadow-xl sm:shadow-2xl ring-1 ring-slate-900/10">
                        <ScrollVideo src={ASSETS.tractorVideo} />
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 4. CLOSING CTA (Fully responsive layout)                   */}
            {/* ========================================================== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/60 to-[#2563eb]/40 py-14 sm:py-20 lg:py-28">
                <GeoShapes />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                        {/* Left copy */}
                        <div className="lg:col-span-5">
                            <SectionMark label="Your Partner in Precision Parts" />

                            <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl lg:text-[2.75rem] font-bold tracking-tight text-slate-900 leading-snug sm:leading-[1.15]">
                                All automotive and agricultural industry parts{" "}
                                <span className="text-[#2563eb]">
                                    available on request
                                </span>{" "}
                                — contact us for more enquiry.
                            </h2>

                            <div className="mt-6 sm:mt-8">
                                <Link
                                    to="/#quote"
                                    onClick={() => trackQuoteCtaClick("automotive_closing")}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-7 sm:px-8 py-3.5 sm:py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-700 shadow-md hover:shadow-lg"
                                >
                                    <span>Request a Quote</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {/* Trust badges responsive grid */}
                            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 border-t border-slate-200 pt-6 sm:pt-8">
                                {ctaBadges.map((badge) => {
                                    const Icon = badge.icon;
                                    return (
                                        <div
                                            key={badge.label}
                                            className="flex flex-col items-center text-center gap-2 p-2 rounded-lg"
                                        >
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb] bg-white shadow-2xs">
                                                <Icon
                                                    className="h-5 w-5"
                                                    strokeWidth={1.6}
                                                />
                                            </span>
                                            <span className="text-center text-xs font-semibold leading-tight text-slate-700 whitespace-pre-line">
                                                {badge.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right — CTA image */}
                        <div className="lg:col-span-7 flex items-center justify-center mt-4 lg:mt-0">
                            <img
                                src={ASSETS.closing}
                                alt="Automotive parts collage"
                                className="w-full max-w-sm sm:max-w-md lg:max-w-xl object-contain drop-shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
