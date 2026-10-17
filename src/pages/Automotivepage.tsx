import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Truck,
    Tractor as TractorIcon,
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
    hero: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/hero%20image.webp",
    closing: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/cta%20image.webp",
    truckVideo: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-videos/Truck_exploded_view_animation_1080p_20261017194656.webm",
    tractorVideo: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-videos/Tractor_explosion_animation_crea%E2%80%A6_1080p_20261017193301.webm",
};

const BLUE = "#2563eb";

const navChips = [
    { icon: Truck, label: "Trucks", href: "#truck" },
    { icon: TractorIcon, label: "Tractors", href: "#tractor" },
];

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
                threshold: 0.25,
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

/** Section mark with line on the left — used for Hero & CTA */
function SectionMark({ label, color = BLUE }: { label: string; color?: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ backgroundColor: color }} />
            <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color }}
            >
                {label}
            </span>
        </div>
    );
}

/** Centered section mark with lines on both sides — used in video headers */
function CenteredMark({ label, color = BLUE }: { label: string; color?: string }) {
    return (
        <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12" style={{ backgroundColor: color }} />
            <span
                className="text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color }}
            >
                {label}
            </span>
            <span className="h-px w-12" style={{ backgroundColor: color }} />
        </div>
    );
}

/** Decorative diagonal shapes for hero & CTA backgrounds */
function GeoShapes() {
    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
        >
            {/* Top-right large shape */}
            <div
                className="absolute -right-24 -top-24 h-[420px] w-[320px]"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(29,78,216,0.07) 0%, rgba(29,78,216,0.02) 100%)",
                    transform: "rotate(15deg) skewX(-8deg)",
                    borderRadius: "8px",
                }}
            />
            {/* Overlapping smaller shape */}
            <div
                className="absolute right-16 -top-8 h-[300px] w-[200px]"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(29,78,216,0.05) 0%, transparent 100%)",
                    transform: "rotate(22deg) skewX(-8deg)",
                    borderRadius: "8px",
                }}
            />
            {/* Subtle bottom-left accent */}
            <div
                className="absolute -bottom-16 -left-16 h-[200px] w-[160px]"
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
        <main className="w-full bg-white text-slate-900">
            {/* ========================================================== */}
            {/* 1. HERO (Restored to original design)                      */}
            {/* ========================================================== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-[#2563eb]/20 py-16 sm:py-24 lg:py-28">
                <GeoShapes />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Left column */}
                        <div className="lg:col-span-5">
                            <SectionMark label="Automotive & Agricultural" />

                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.2rem] leading-[1.1]">
                                Components for{" "}
                                <span className="text-[#2563eb]">
                                    Commercial Trucks & Tractors
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
                                Forged, machined, and cast parts supplied across
                                the commercial automotive and agricultural equipment
                                industries.
                            </p>

                            {/* Nav chips — icon above label, bordered cards */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                {navChips.map((chip) => {
                                    const Icon = chip.icon;
                                    return (
                                        <a
                                            key={chip.label}
                                            href={chip.href}
                                            className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-[#2563eb] hover:text-[#2563eb] hover:shadow-md"
                                        >
                                            <Icon
                                                className="h-5 w-5"
                                                strokeWidth={1.6}
                                            />
                                            {chip.label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right — hero image, flowing naturally */}
                        <div className="lg:col-span-7 flex items-end justify-end">
                            {/* "Driving Industries Forward" label */}
                            <div className="hidden lg:block absolute top-24 right-16 z-20">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 text-right leading-relaxed">
                                    Driving
                                    <br />
                                    Industries
                                    <br />
                                    Forward
                                </p>
                            </div>

                            <img
                                src={ASSETS.hero}
                                alt="Automotive and agricultural vehicle components"
                                className="w-full max-w-2xl object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 2. TRUCK VIDEO (Clean, video only, stops at end)           */}
            {/* ========================================================== */}
            <section
                id="truck"
                className="border-b border-slate-100 bg-white py-16 sm:py-20 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="mx-auto mb-10 max-w-3xl text-center">
                        <CenteredMark label="Commercial Vehicle Parts" color={BLUE} />
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Heavy-Duty Components for Commercial Trucks
                        </h2>
                    </div>

                    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-slate-900/10">
                        <ScrollVideo src={ASSETS.truckVideo} />
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 3. TRACTOR VIDEO (Clean, video only, stops at end)         */}
            {/* ========================================================== */}
            <section
                id="tractor"
                className="border-b border-slate-100 bg-slate-50/50 py-16 sm:py-20 lg:py-24"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="mx-auto mb-10 max-w-3xl text-center">
                        <CenteredMark label="Agricultural Equipment Parts" color={BLUE} />
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Heavy-Duty Components for Tractors & Harvesters
                        </h2>
                    </div>

                    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-slate-900/10">
                        <ScrollVideo src={ASSETS.tractorVideo} />
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 4. CLOSING CTA (Restored to original design)               */}
            {/* ========================================================== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/60 to-[#2563eb]/40 py-20 lg:py-28">
                <GeoShapes />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Left copy */}
                        <div className="lg:col-span-5">
                            <SectionMark label="Your Partner in Precision Parts" />

                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
                                All automotive and agricultural industry parts{" "}
                                <span className="text-[#2563eb]">
                                    available on request
                                </span>{" "}
                                — contact us for more enquiry.
                            </h2>

                            <div className="mt-8">
                                <Link
                                    to="/#quote"
                                    onClick={() => trackQuoteCtaClick("automotive_closing")}
                                    className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-700 shadow-md hover:shadow-lg"
                                >
                                    <span>Request a Quote</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {/* Trust badges row */}
                            <div className="mt-10 flex flex-wrap gap-0 divide-x divide-slate-200 border-t border-slate-200 pt-8">
                                {ctaBadges.map((badge) => {
                                    const Icon = badge.icon;
                                    return (
                                        <div
                                            key={badge.label}
                                            className="flex flex-col items-center gap-2 px-5 first:pl-0"
                                        >
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb]">
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
                        <div className="lg:col-span-7 flex items-center justify-center">
                            <img
                                src={ASSETS.closing}
                                alt="Automotive parts collage"
                                className="w-full max-w-xl object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
