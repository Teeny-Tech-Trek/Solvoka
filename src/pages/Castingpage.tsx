import { Link } from "react-router-dom";
import { trackQuoteCtaClick } from "../utils/analytics";
import {
    ArrowRight,
    Check,
    Share2,
    Zap,
    Lock,
    Headphones,
    ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

interface ProcessSection {
    number: string;
    badgeNumber: string;
    eyebrow: string;
    title: string;
    description: string;
    benefits: string[];
    imageSrc: string;
    gifSrc: string;
    layout: "media-first" | "info-first";
}

const processSections: ProcessSection[] = [
    {
        number: "01",
        badgeNumber: "01",
        eyebrow: "INVESTMENT CASTING (LOST WAX CASTING)",
        title: "Investment Casting — Intricate Parts with Superb Detail",
        description:
            "Investment Casting uses wax patterns and ceramic molds to create complex, detailed components with excellent surface quality. Ideal for precision parts with tight tolerances — the finest detail and tightest as-cast tolerance of our five casting processes.",
        benefits: [
            "Excellent for complex geometries",
            "Superior surface finish and accuracy",
            "Reduces need for machining",
            "Suitable for small-to-medium runs",
        ],
        imageSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/images/casting/investment-casting.webp",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Video_on_Investment_Casting_Process.webm",
        layout: "media-first",
    },
    {
        number: "02",
        badgeNumber: "02",
        eyebrow: "CENTRIFUGAL CASTING",
        title: "Centrifugal Casting — Seamless, Dense Cylindrical Components",
        description:
            "In Centrifugal Casting, molten metal is spun inside a rotating mold, forcing impurities outward and creating dense, defect-free cylindrical components.",
        benefits: [
            "High-density, fine-grain structure",
            "Ideal for pressure-resilient parts",
            "Minimal porosity and excellent mechanical strength",
            "Suitable for steel, bronze, and other alloys",
        ],
        imageSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/images/casting/centrifugal-casting.webp",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Video_on_Centrifugal_Casting.webm",
        layout: "info-first",
    },
    {
        number: "03",
        badgeNumber: "03",
        eyebrow: "SAND CASTING",
        title: "Sand Casting — Flexible, Economical Casting for Large & Complex Shapes",
        description:
            "Sand Casting is a traditional and versatile method that uses sand molds to form metal parts, ideal for both ferrous and non-ferrous metals, it allows for complex geometries at a lower cost.",
        benefits: [
            "Cost-effective for low to medium volumes",
            "Handles large and heavy components",
            "Ideal for complex internal cavities",
            "Supports a wide range of materials",
        ],
        imageSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/images/casting/sand-casting.webp",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Steel_Bar_Dipped_in_Water.webm",
        layout: "media-first",
    },
    {
        number: "04",
        badgeNumber: "04",
        eyebrow: "ALUMINUM CASTING",
        title: "Aluminum Casting — Lightweight Strength with Excellent Corrosion Resistance",
        description:
            "Our Aluminum Casting services deliver strong, lightweight, and corrosion-resistant parts, ideal for industries requiring a balance of strength and performance.",
        benefits: [
            "Lightweight yet durable",
            "Excellent thermal and electrical conductivity",
            "Resistant to corrosion",
            "Good surface finish and machinability",
        ],
        imageSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/images/casting/aluminum-casting.webp",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Steel_Bar_Cooling_Video_Link.webm",
        layout: "info-first",
    },
    {
        number: "05",
        badgeNumber: "05",
        eyebrow: "DIE CASTING",
        title: "Die Casting — High-Volume, High-Precision Metal Components",
        description:
            "Die Casting involves forcing molten metal into steel molds under high pressure — perfect for producing high-volume, tightly-toleranced parts with smooth surfaces.",
        benefits: [
            "Excellent dimensional accuracy",
            "Smooth finishes and minimal machining",
            "High-speed production",
            "Ideal for zinc, aluminum, and magnesium alloys",
        ],
        imageSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/images/casting/die-casting.webp",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Steel_Die_Casting_Video_Ready.webm",
        layout: "media-first",
    },
];

const materials = [
    {
        label: "Carbon Steel",
        gradient: "from-slate-700 via-slate-800 to-slate-950",
    },
    {
        label: "Stainless Steel",
        gradient: "from-slate-400 via-slate-500 to-slate-600",
    },
    {
        label: "Aluminum",
        gradient: "from-slate-300 via-slate-400 to-slate-500",
    },
];

const rfqFeatures = [
    {
        icon: <Zap className="h-4 w-4 text-[#2563eb]" strokeWidth={2} />,
        title: "Fast Response",
        subtitle: "Typically within 24 hours",
    },
    {
        icon: <Lock className="h-4 w-4 text-[#2563eb]" strokeWidth={2} />,
        title: "Confidential",
        subtitle: "Your data is safe with us",
    },
    {
        icon: <Headphones className="h-4 w-4 text-[#2563eb]" strokeWidth={2} />,
        title: "Expert Support",
        subtitle: "We help you find the right solution",
    },
];

/* ------------------------------------------------------------------ */
/* Shared Components                                                  */
/* ------------------------------------------------------------------ */

/** Small engineering-drawing registration crosshair, used at frame corners. */
function RegMark({ tone = "light" }: { tone?: "light" | "dark" }) {
    const color = tone === "light" ? "bg-white/35" : "bg-slate-300";
    return (
        <span className="relative block h-3.5 w-3.5">
            <span className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${color}`} />
            <span className={`absolute top-1/2 left-0 h-px w-full -translate-y-1/2 ${color}`} />
        </span>
    );
}

function FramedCorners({ tone = "light" }: { tone?: "light" | "dark" }) {
    return (
        <>
            <span className="pointer-events-none absolute left-3 top-3 z-10"><RegMark tone={tone} /></span>
            <span className="pointer-events-none absolute right-3 top-3 z-10"><RegMark tone={tone} /></span>
            <span className="pointer-events-none absolute bottom-3 left-3 z-10"><RegMark tone={tone} /></span>
            <span className="pointer-events-none absolute bottom-3 right-3 z-10"><RegMark tone={tone} /></span>
        </>
    );
}

function MetalCubeIcon({ gradient }: { gradient: string }) {
    return (
        <div
            className={`relative h-7 w-7 flex-none rounded-md bg-gradient-to-br ${gradient} shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]`}
        >
            <div className="absolute inset-0 m-auto h-3 w-3 rotate-45 border border-white/40" />
        </div>
    );
}

function MediaCard({ number, gifSrc }: { number: string; gifSrc: string }) {
    return (
        <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-md bg-slate-900 ring-1 ring-slate-950/10">
            <FramedCorners tone="light" />
            <video
                src={gifSrc}
                aria-label={`Casting process ${number}`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
        </div>
    );
}

function ProcessRow({ section }: { section: ProcessSection }) {
    const mediaFirst = section.layout === "media-first";

    return (
        <div className="relative border-b border-[#ffffff] py-14 first:pt-0 last:border-b-0 last:pb-0 lg:py-16">
            {/* Ghost sequence number — ties to the real ordering of the five processes */}
            <span
                aria-hidden
                className="pointer-events-none absolute -top-3 right-0 select-none text-[96px] font-black leading-none text-[#000000]/[0.035] lg:text-[140px]"
            >
                {section.number}
            </span>

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-6 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}>
                    <MediaCard number={section.number} gifSrc={section.gifSrc} />
                </div>

                <div className={`lg:col-span-6 ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-[#2563eb]">
                            {section.badgeNumber}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            {section.eyebrow}
                        </span>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold leading-snug text-slate-900 sm:text-[26px]">
                        {section.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
                        {section.description}
                    </p>

                    <div className="mt-6 border-t border-[#ffffff] pt-5">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Key Benefits
                        </span>
                        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                            {section.benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start gap-2 text-sm text-slate-700">
                                    <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-[#2563eb]" strokeWidth={2.5} />
                                    <span className="leading-snug">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function CastingPage() {
    return (
        <main className="w-full bg-[#ffffff]">
            {/* 1. Hero Section (Matching Main Project Hero Architecture) */}
            <section className="relative flex min-h-[85vh] lg:min-h-[90vh] shrink-0 flex-col justify-center overflow-hidden bg-neutral-950 pt-24 pb-16 lg:pt-28 lg:pb-20">
                {/* Full-bleed Industrial Foundry Background Motion GIF */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <video
                        src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Steel_Die_Casting_Video_Ready.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover object-center filter contrast-110"
                    />

                    {/* Unified dark scrim overlay matching main hero */}
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/80"
                        aria-hidden="true"
                    />

                    {/* Left-side desktop backdrop blur and high-contrast wash for text readability */}
                    <div
                        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[72%] backdrop-blur-sm lg:block"
                        style={{
                            WebkitMaskImage: "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
                            maskImage: "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
                        }}
                        aria-hidden="true"
                    />
                    <div
                        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[72%] lg:block"
                        style={{
                            background: "linear-gradient(to right, rgba(7,13,23,0.92) 0%, rgba(7,13,23,0.72) 55%, rgba(7,13,23,0) 100%)",
                        }}
                        aria-hidden="true"
                    />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px]">
                        {/* Breadcrumb */}
                        <div className="mb-5 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <Link to="/" className="transition hover:text-[#2563eb]">Home</Link>
                            <ChevronRight className="h-3 w-3 text-slate-500" />
                            <Link to="/#capabilities" className="transition hover:text-[#2563eb]">Capabilities</Link>
                            <ChevronRight className="h-3 w-3 text-slate-500" />
                            <span className="text-slate-200 font-semibold">Casting</span>
                        </div>

                        {/* Category Tag with Process Code */}
                        <div className="mb-3 flex items-center gap-2.5">
                            <span className="inline-flex items-center rounded-md bg-[#2563eb]/20 border border-[#2563eb]/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                                PRC-001
                            </span>
                            <span className="h-[2px] w-6 bg-[#2563eb]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                                CASTING SERVICES
                            </span>
                        </div>

                        {/* Headline with Main Project Outline Typography */}
                        <h1 className="font-medium leading-[0.98] tracking-[-0.02em] text-white">
                            <span className="block text-[clamp(28px,5.5vw,58px)] font-bold">
                                Precision Casting.
                            </span>
                            <span
                                className="mt-1 block text-[clamp(24px,4.8vw,50px)] font-extrabold uppercase leading-[1.08] text-[#2563eb]"
                            >
                                From Molten to Solid.
                            </span>
                        </h1>

                        {/* Dimension Line matching main project */}
                        <div className="relative my-3 h-3 w-full max-w-[560px]" aria-hidden="true">
                            <span className="absolute left-0 top-0 h-3 w-[2px] bg-[#2563eb]" />
                            <span className="absolute right-0 top-0 h-3 w-[2px] bg-[#2563eb]" />
                            <span className="absolute left-0 right-0 top-[5px] h-[2px] bg-[#2563eb]" />
                        </div>

                        {/* Location */}
                        <p className="text-[12px] sm:text-[14px] uppercase tracking-[0.14em] text-[#2563eb] font-semibold">
                            Focal Point, Ludhiana, India
                        </p>

                        {/* Subheadline */}
                        <p className="mt-3 max-w-[640px] text-[13px] leading-relaxed text-slate-200 sm:text-[16px] sm:leading-[1.6]">
                            Investment, centrifugal, sand, aluminum, and high-pressure die casting — matched precisely to your part's geometry and metallurgy. Complete in-house heat treatment, fettling, and CNC machining coordination.
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                            <Link
                                to="/#quote"
                                className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-5 text-[15px] font-bold text-white shadow-lg shadow-[#2563eb]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-[#2563eb]/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
                            >
                                Start Your Casting RFQ
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
                            </Link>
                            <a
                                href="#casting-methods"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo({ top: 700, behavior: 'smooth' });
                                }}
                                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/50 bg-slate-950/30 px-5 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                View 5 Casting Methods
                                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
                            </a>
                        </div>

                        {/* Trust chips */}
                        <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
                            <li className="flex items-center gap-2 sm:gap-4">
                                <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-white">
                                    <svg width="18" height="20" viewBox="0 0 20 22" fill="none" aria-hidden="true" className="shrink-0">
                                        <path
                                            d="M10 1.5 18 4.6v6.1c0 4.6-3.2 8.3-8 9.8-4.8-1.5-8-5.2-8-9.8V4.6L10 1.5Z"
                                            stroke="#2563eb"
                                            strokeWidth="1.5"
                                            strokeLinejoin="round"
                                        />
                                        <path d="M6.4 10.8 9 13.4l4.6-4.8" stroke="#2563eb" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    5 CASTING METHODS
                                </span>
                                <span className="h-3.5 w-[2px] bg-[#2563eb]/80" aria-hidden="true" />
                            </li>

                            <li className="flex items-center gap-2 sm:gap-4">
                                <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-white">
                                    FERROUS & NON-FERROUS
                                </span>
                                <span className="h-3.5 w-[2px] bg-[#2563eb]/80" aria-hidden="true" />
                            </li>

                            <li className="flex items-center gap-2 sm:gap-4">
                                <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-white">
                                    1-BUSINESS-DAY QUOTE
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 2. Capability Overview Section */}
            <section className="border-b border-[#ffffff] py-16 lg:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12 lg:px-16">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                            Our Capability
                        </span>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Five Casting Processes, One Point of Contact
                        </h2>
                        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                            From intricate precision parts to large, complex components, Solvoka
                            coordinates five casting processes to match your exact requirements — with a
                            single, reliable partner.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 border-l-2 border-[#2563eb] bg-white py-5 pl-6 pr-5">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#2563eb]/10">
                            <Share2 className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />
                        </span>
                        <p className="text-sm font-semibold leading-snug text-slate-900">
                            Different processes.
                            <br />
                            Stronger possibilities.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Five Casting Processes Rows (Alternating Layout) */}
            <section id="casting-methods" className="py-4 lg:py-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    {processSections.map((section) => (
                        <ProcessRow key={section.number} section={section} />
                    ))}
                </div>
            </section>

            {/* 4. Materials & Size Envelope */}
            <section className="border-t border-[#ffffff] py-16 lg:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-14 lg:px-16">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-slate-100 ring-1 ring-slate-950/10">
                        <FramedCorners tone="dark" />
                        <img
                            src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/images/casting/materials.webp"
                            alt="Precision machined and cast metal components"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                            Materials &amp; Size Envelope
                        </span>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Materials We Work With
                        </h2>
                        <p className="mt-3 text-[15px] text-slate-600">
                            Materials: carbon steel, stainless steel, aluminum.
                        </p>

                        <div className="mt-7 divide-y divide-[#ffffff] border-y border-[#ffffff]">
                            {materials.map((mat) => (
                                <div key={mat.label} className="flex items-center gap-3.5 py-3.5">
                                    <MetalCubeIcon gradient={mat.gradient} />
                                    <span className="text-sm font-semibold text-slate-800">
                                        {mat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. RFQ Block */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-8 shadow-xl shadow-slate-900/5 lg:p-14">
                        <FramedCorners tone="dark" />

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:items-center lg:gap-10">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                                    Ready to Get Started?
                                </span>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Get a Quote for Casting
                                </h2>
                                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                                    Send the basics now — for material, size, or finish details,
                                    use the full request-a-quote form.
                                </p>

                                <div className="mt-7 flex flex-col items-start gap-2.5">
                                    <Link
                                        to="/#quote"
                                        onClick={() => trackQuoteCtaClick("casting-rfq")}
                                        className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2563eb]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
                                    >
                                        Request a Quote
                                        <ArrowRight
                                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                            strokeWidth={2.2}
                                        />
                                    </Link>
                                    <span className="text-xs text-slate-500">
                                        Process pre-selected: <strong className="font-semibold text-slate-700">Casting</strong>
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 border-t border-slate-200 pt-8 lg:border-l lg:border-t-0 lg:border-slate-200 lg:pl-10 lg:pt-0">
                                {rfqFeatures.map((feature) => (
                                    <div key={feature.title} className="flex items-center gap-3.5">
                                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#2563eb]/10">
                                            {feature.icon}
                                        </span>
                                        <div className="leading-tight">
                                            <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                                            <p className="text-xs text-slate-500">{feature.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="relative flex flex-col items-center gap-4 border-t border-slate-200 pt-8 lg:border-t-0 lg:pt-0">
                                <div className="w-full text-left">
                                    <p className="italic text-lg text-slate-500">
                                        Your
                                        <br />
                                        <span className="text-xl font-medium text-slate-800">Casting Partner</span>
                                        <br />
                                        in India
                                    </p>
                                </div>
                                <div className="relative aspect-square w-full max-w-[220px] overflow-hidden">
                                    <img
                                        src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/images/casting/cad-blueprint.webp"
                                        alt="CAD assembly illustration"
                                        className="h-full w-full object-contain mix-blend-multiply opacity-90"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
