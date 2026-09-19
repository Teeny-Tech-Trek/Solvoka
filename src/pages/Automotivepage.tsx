import { Link } from "react-router-dom";
import {
    ArrowRight,
    Car,
    Truck,
    Bike,
    Tractor as TractorIcon,
    Settings,
    ShieldCheck,
    Package,
    Users,
    CheckCircle2,
    Clock,
    Handshake,
    Headphones,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const ASSETS = {
    hero: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/hero%20image.webp",
    tractorImage: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/Tractor%20parts.webp",
    carImage: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/Car%20parts.webp",
    closing: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/cta%20image.webp",
};

const BLUE = "#2563eb";
const GREEN = "#2563eb";

const navChips = [
    { icon: Car, label: "Cars", href: "#road" },
    { icon: Truck, label: "Trucks", href: "#road" },
    { icon: Bike, label: "Two-Wheelers", href: "#road" },
    { icon: TractorIcon, label: "Tractors", href: "#tractor" },
];

const segments = [
    {
        id: "tractor",
        accent: GREEN,
        eyebrow: "Tractor Parts",
        titleBefore: "Components for",
        titleHighlight: "Agricultural Equipment",
        description:
            "Components supplied for tractors and other agricultural equipment:",
        video: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/Tractor%20video.webm",
        image: ASSETS.tractorImage,
        sidebarTitle: "Tractor Parts",
        sidebarDesc:
            "Watch how our precision components power agricultural equipment.",
        features: [
            { icon: Settings, label: "High Precision Manufacturing" },
            { icon: ShieldCheck, label: "Durable & Reliable" },
            { icon: Package, label: "Wide Range of Components" },
            { icon: Users, label: "Trusted by OEMs" },
            // { icon: Leaf, label: "Supporting a Stronger Agricultural Future" },
        ],
    },
    {
        id: "road",
        accent: BLUE,
        eyebrow: "Car, Truck & Two-Wheeler Parts",
        titleBefore: "Components for",
        titleHighlight: "Cars, Trucks, and Two-Wheelers",
        description:
            "Components supplied for cars, trucks, and two-wheelers:",
        video: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Automotive-Assets/Car%20video.webm",
        image: ASSETS.carImage,
        sidebarTitle: "Car, Truck & Two-Wheeler Parts",
        sidebarDesc:
            "Watch how our precision components power cars, trucks, and two-wheelers across the world.",
        features: [
            { icon: Settings, label: "High Precision Manufacturing" },
            { icon: ShieldCheck, label: "Durable & Reliable" },
            { icon: Package, label: "Wide Range of Components" },
            { icon: Users, label: "Trusted by Global OEMs" },
        ],
    },
];

const ctaBadges = [
    { icon: CheckCircle2, label: "Quality\nAssured" },
    { icon: Clock, label: "On-Time\nDelivery" },
    { icon: Handshake, label: "Trusted\nPartnership" },
    { icon: Headphones, label: "Dedicated\nSupport" },
];

/* ------------------------------------------------------------------ */
/* Shared components                                                    */
/* ------------------------------------------------------------------ */

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

/** Centered section mark with lines on both sides — used in segment headers */
function CenteredMark({ label, color }: { label: string; color: string }) {
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
/* Vehicle segment section                                              */
/* ------------------------------------------------------------------ */

function VehicleSegment({
    segment,
    reversed = false,
}: {
    segment: (typeof segments)[number];
    reversed?: boolean;
}) {
    return (
        <div>
            {/* Centered header */}
            <div className="mx-auto mb-10 max-w-3xl text-center">
                <CenteredMark label={segment.eyebrow} color={segment.accent} />
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
                    {segment.titleBefore}{" "}
                    <span style={{ color: segment.accent }}>
                        {segment.titleHighlight}
                    </span>
                </h2>
                <p className="mt-3 text-base text-slate-500">
                    {segment.description}
                </p>
            </div>

            {/* Video + Sidebar */}
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
                {/* Looping video — main area */}
                <div
                    className={`lg:col-span-8 ${
                        reversed ? "lg:order-2" : "lg:order-1"
                    }`}
                >
                    <div className="overflow-hidden rounded-xl">
                        <video
                            src={segment.video}
                            className="w-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                        />
                    </div>
                </div>

                {/* Sidebar: parts image + features */}
                <div
                    className={`lg:col-span-4 space-y-6 ${
                        reversed ? "lg:order-1" : "lg:order-2"
                    }`}
                >
                    {/* Parts diagram image */}
                    <div className="hidden lg:block overflow-hidden rounded-lg bg-white p-3 shadow-sm border border-slate-100">
                        <img
                            src={segment.image}
                            alt={segment.titleHighlight}
                            className="w-full object-contain"
                        />
                    </div>

                    {/* Title & description */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {segment.sidebarTitle}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                            {segment.sidebarDesc}
                        </p>
                    </div>

                    {/* Feature bullets — 2-column grid */}
                    <ul className="grid grid-cols-2 gap-4">
                        {segment.features.map((feat) => {
                            const Icon = feat.icon;
                            return (
                                <li
                                    key={feat.label}
                                    className="flex items-start gap-3"
                                >
                                    <span
                                        className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full"
                                        style={{
                                            backgroundColor: `${segment.accent}12`,
                                        }}
                                    >
                                        <Icon
                                            className="h-[18px] w-[18px]"
                                            style={{ color: segment.accent }}
                                            strokeWidth={1.8}
                                        />
                                    </span>
                                    <span className="pt-1.5 text-sm font-semibold text-slate-800">
                                        {feat.label}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */

export default function AutomotivePage() {
    return (
        <main className="w-full bg-white text-slate-900">
            {/* ========================================================== */}
            {/* 1. HERO                                                     */}
            {/* ========================================================== */}
            <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-white via-slate-50/60 to-[#2563eb]/40">
                <GeoShapes />

                <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-0 lg:px-16 lg:pt-28">
                    <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
                        {/* Left copy */}
                        <div className="lg:col-span-5 pb-10 lg:pb-16">
                            <SectionMark label="Hero" />

                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.2rem] leading-[1.1]">
                                Components for{" "}
                                <span className="text-[#2563eb]">
                                    Cars, Trucks, Two-Wheelers, and Tractors
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
                                Forged, machined, and cast parts supplied across
                                the automotive and agricultural equipment
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
                                            className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-[#2563eb] hover:text-[#2563eb] hover:shadow-md"
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
            {/* 2. TRACTOR PARTS                                            */}
            {/* ========================================================== */}
            <section
                id="tractor"
                className="border-b border-slate-100 py-20 lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <VehicleSegment segment={segments[0]} />
                </div>
            </section>

            {/* ========================================================== */}
            {/* 3. CAR, TRUCK & TWO-WHEELER PARTS                          */}
            {/* ========================================================== */}
            <section
                id="road"
                className="border-b border-slate-100 bg-slate-50/40 py-20 lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <VehicleSegment segment={segments[1]} reversed />
                </div>
            </section>

            {/* ========================================================== */}
            {/* 4. CLOSING CTA                                              */}
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
                                    className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#2563eb]"
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
