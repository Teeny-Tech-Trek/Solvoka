import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackQuoteCtaClick } from "../utils/analytics";
import {
    Check,
    ArrowRight,
    Zap,
    ShieldCheck,
    Users,
    ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

interface ProcessRow {
    number: string;
    code: string;
    title: string;
    description: string;
    benefits: string[];
    tag: string;
    gifSrc: string;
}

const processRows: ProcessRow[] = [
    {
        number: "01",
        code: "DED / LMD",
        title: "Additive + Repair for Large Metal Parts",
        description:
            "DED (or LMD) feeds metal powder or wire into a melt pool created by a laser or electron beam. It's ideal for repairing existing parts or building large components with custom geometry.",
        benefits: [
            "Additive repair and part restoration",
            "Builds large parts faster than powder-bed processes",
            "Multi-material capability",
        ],
        tag: "DED / LMD",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Laser_metal_deposition_manufacture.webm",
    },
    {
        number: "02",
        code: "WAAM",
        title: "Cost-Effective 3D Printing for Large-Scale Metal Structures",
        description:
            "WAAM uses an electric arc to melt metal wire, layer by layer, similar to welding. It's suited for large, structural parts with less complexity but high mechanical demands.",
        benefits: [
            "Ideal for very large components (1m+ size)",
            "High deposition rate and low material cost",
        ],
        tag: "WAAM",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Robotic_arm_manufacturing_metal.webm",
    },
    {
        number: "03",
        code: "DMLS",
        title: "Functional Metal Parts with Complex Internal Features",
        description:
            "DMLS uses a high-powered laser to sinter powdered metal, layer by layer, without fully melting it — typically reaching around 95–98% density, with material properties close to wrought metals.",
        benefits: [
            "Complex, organic shapes not possible with machining",
            "Minimal material waste",
        ],
        tag: "DMLS",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/DMLS_Video_Is_Ready_.webm",
    },
    {
        number: "04",
        code: "SLM",
        title: "Fully Melted, High-Strength Metal Components",
        description:
            "SLM is similar to DMLS but fully melts the metal powder using a laser, reaching near-full density and resulting in fully dense parts with excellent mechanical properties and fine microstructure.",
        benefits: [
            "Superior strength and metallurgical properties",
            "Highly complex, load-bearing parts",
            "Excellent surface finish and dimensional accuracy",
        ],
        tag: "SLM",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Metal_3D_printing_process.webm",
    },
    {
        number: "05",
        code: "BINDER JETTING",
        title: "Fast, Scalable Metal Printing at Lower Costs",
        description:
            "Binder Jetting uses a liquid binding agent to selectively join metal powder, which is then sintered in a furnace. Unlike DMLS/SLM, it doesn't use lasers, which removes the layer-by-layer laser-tracing time and allows meaningfully faster build rates.",
        benefits: [
            "Lower cost per part for medium to high volumes",
            "Fast production speed",
            "Smooth surface finish and post-processing flexibility",
        ],
        tag: "BINDER JETTING",
        gifSrc: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Metal_binder_jetting_3D_printing.webm",
    },
];

const coreList = ["Design", "Restore", "Prototype", "Produce", "Scale"];

const rfqFeatures = [
    {
        icon: <Zap className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />,
        title: "Fast Response",
        subtitle: "Typically within 24 hours",
    },
    {
        icon: <ShieldCheck className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />,
        title: "Confidential",
        subtitle: "Your data is safe with us",
    },
    {
        icon: <Users className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />,
        title: "Expert Support",
        subtitle: "We help you find the right solution",
    },
];

/* ------------------------------------------------------------------ */
/* Shared bits                                                          */
/* ------------------------------------------------------------------ */

/** Section kicker: a short hairline rule + mono label — a consistent
 *  running-head device rather than a repeated "eyebrow badge" pattern. */
function SectionMark({ label, tone = "dark" }: { label: string; tone?: "dark" | "light" }) {
    const textTone = tone === "dark" ? "text-slate-500" : "text-slate-400";
    return (
        <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#2563eb]" />
            <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${textTone}`}>
                {label}
            </span>
        </div>
    );
}



/** Custom line-art bracket illustration with dimension callouts —
 *  replaces stock photography with an honest, on-brand technical drawing. */
function BracketWireframe() {
    return (
        <div className="relative aspect-[4/3] w-full">
            <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
                <path
                    d="M60,80 H260 V140 H180 V240 H60 Z"
                    fill="none"
                    stroke="rgba(15,23,42,0.35)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                <circle cx="100" cy="120" r="10" fill="none" stroke="rgba(15,23,42,0.35)" strokeWidth="1.5" />
                <circle cx="100" cy="200" r="10" fill="none" stroke="rgba(15,23,42,0.35)" strokeWidth="1.5" />
                <circle cx="220" cy="100" r="8" fill="none" stroke="rgba(15,23,42,0.35)" strokeWidth="1.5" />

                <line x1="60" y1="266" x2="260" y2="266" stroke="#2563eb" strokeWidth="1" />
                <line x1="60" y1="258" x2="60" y2="274" stroke="#2563eb" strokeWidth="1" />
                <line x1="260" y1="258" x2="260" y2="274" stroke="#2563eb" strokeWidth="1" />

                <line x1="36" y1="80" x2="36" y2="240" stroke="#2563eb" strokeWidth="1" />
                <line x1="28" y1="80" x2="44" y2="80" stroke="#2563eb" strokeWidth="1" />
                <line x1="28" y1="240" x2="44" y2="240" stroke="#2563eb" strokeWidth="1" />
            </svg>

            <span className="absolute left-1/2 top-[91%] -translate-x-1/2 text-[10px] uppercase tracking-wider text-[#2563eb]">
                Overall width
            </span>
            <span className="absolute left-[1%] top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-wider text-[#2563eb]">
                Overall height
            </span>
            <span className="absolute right-0 top-0 text-[10px] uppercase tracking-wider text-slate-400">
                Ref. illustrative — not to scale
            </span>
        </div>
    );
}

/** Custom isometric build-envelope diagram — visualizes the honest
 *  "confirmed against the drawing" claim instead of a vague sentence. */
function BuildEnvelopeDiagram() {
    return (
        <div className="relative aspect-[4/3] w-full">
            <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
                <polygon
                    points="100,120 160,80 280,80 220,120"
                    fill="rgba(255,255,255,0.03)"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1"
                />
                <polygon
                    points="220,120 280,80 280,180 220,220"
                    fill="rgba(255,255,255,0.015)"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="1"
                />
                <polygon
                    points="100,120 220,120 220,220 100,220"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.25"
                />

                <line x1="100" y1="120" x2="160" y2="80" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <line x1="160" y1="80" x2="160" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="160" y1="180" x2="100" y2="220" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="160" y1="180" x2="280" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />

                <line x1="100" y1="248" x2="220" y2="248" stroke="#2563eb" strokeWidth="1" />
                <line x1="100" y1="240" x2="100" y2="256" stroke="#2563eb" strokeWidth="1" />
                <line x1="220" y1="240" x2="220" y2="256" stroke="#2563eb" strokeWidth="1" />

                <line x1="70" y1="120" x2="70" y2="220" stroke="#2563eb" strokeWidth="1" />
                <line x1="62" y1="120" x2="78" y2="120" stroke="#2563eb" strokeWidth="1" />
                <line x1="62" y1="220" x2="78" y2="220" stroke="#2563eb" strokeWidth="1" />

                <line x1="232" y1="108" x2="292" y2="68" stroke="#2563eb" strokeWidth="1" strokeDasharray="2 3" />
            </svg>

            <span className="absolute left-[22%] top-[83%] text-[10px] uppercase tracking-wider text-[#2563eb]">
                X — width
            </span>
            <span className="absolute left-[8%] top-[54%] -translate-y-1/2 text-[10px] uppercase tracking-wider text-[#2563eb]">
                Y — height
            </span>
            <span className="absolute left-[68%] top-[20%] text-[10px] uppercase tracking-wider text-[#2563eb]">
                Z — depth
            </span>
            <span className="absolute right-0 top-0 text-[10px] uppercase tracking-wider text-slate-500">
                Envelope — confirmed per drawing
            </span>
        </div>
    );
}

function ProcessThumb({ label, gifSrc, tag }: { label: string; gifSrc: string; tag: string }) {
    return (
        <div className="group/thumb relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
            <video
                src={gifSrc}
                aria-label={label}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">{tag}</p>
            </div>
        </div>
    );
}

function ProcessRowItem({
    row,
    index,
    innerRef,
}: {
    row: ProcessRow;
    index: number;
    innerRef?: (el: HTMLDivElement | null) => void;
}) {
    return (
        <div
            ref={innerRef}
            data-index={index}
            className="scroll-mt-32 grid grid-cols-1 gap-6 border-t border-slate-200 py-10 first:border-t-0 first:pt-0 lg:grid-cols-[88px_minmax(0,1fr)_minmax(280px,360px)] lg:items-center lg:gap-10"
        >
            <div className="flex items-center gap-3 lg:block">
                <p className="text-4xl font-bold leading-none text-slate-200 lg:text-5xl">
                    {row.number}
                </p>
                <div className="flex items-center gap-1.5 lg:mt-2">
                    <span className="h-px w-3 bg-[#2563eb]" />
                    <p className="text-[10px] font-bold tracking-wider text-slate-400">{row.code}</p>
                </div>
            </div>

            <div className="min-w-0">
                <h3 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl">{row.title}</h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">{row.description}</p>
                <ul className="mt-4 space-y-2">
                    {row.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 h-4 w-4 flex-none text-[#2563eb]" strokeWidth={2.5} />
                            <span className="text-sm leading-relaxed text-slate-600">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <ProcessThumb label={row.title} gifSrc={row.gifSrc} tag={row.tag} />
        </div>
    );
}

/** Sticky scroll-spy index for the five processes — turns a long stacked
 *  list into a navigable section rather than undifferentiated scrolling. */
function ProcessRail({
    rows,
    activeIndex,
    onSelect,
}: {
    rows: ProcessRow[];
    activeIndex: number;
    onSelect: (index: number) => void;
}) {
    return (
        <div className="sticky top-32 hidden flex-col gap-1 lg:flex">
            {rows.map((row, i) => {
                const active = i === activeIndex;
                return (
                    <button
                        key={row.number}
                        type="button"
                        onClick={() => onSelect(i)}
                        aria-current={active}
                        className={`group flex items-baseline gap-3 border-l-2 py-2.5 pl-4 text-left transition-colors ${
                            active ? "border-[#2563eb]" : "border-transparent hover:border-slate-300"
                        }`}
                    >
                        <span
                            className={`text-[11px] font-semibold transition-colors ${
                                active ? "text-[#2563eb]" : "text-slate-400 group-hover:text-slate-600"
                            }`}
                        >
                            {row.number}
                        </span>
                        <span
                            className={`text-xs font-medium leading-snug tracking-wide transition-colors ${
                                active ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                            }`}
                        >
                            {row.code}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */

export default function PrintingPage() {
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeProcess, setActiveProcess] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.index);
                        if (!Number.isNaN(idx)) setActiveProcess(idx);
                    }
                });
            },
            { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
        );

        rowRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleRailSelect = (index: number) => {
        rowRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <main className="w-full bg-white">
            <style>{`
                @keyframes layer-grow {
                    from { transform: scaleX(0); opacity: 0; }
                    to { transform: scaleX(1); opacity: 1; }
                }
            `}</style>

            {/* Hero — Matching Main Project Hero Architecture */}
            <section className="relative flex min-h-[85vh] lg:min-h-[90vh] shrink-0 flex-col justify-center overflow-hidden bg-neutral-950 pt-24 pb-16 lg:pt-28 lg:pb-20">
                {/* Full-bleed Industrial DMLS Motion GIF */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <video
                        src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/DMLS_Video_Is_Ready_.webm"
                        autoPlay
                        loop
                        muted
                        playsInline
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

                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none text-[260px] font-bold leading-none lg:block lg:text-[360px]"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.06)", color: "transparent" }}
                >
                    3D
                </span>

                <div className="relative z-10 mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px]">
                        {/* Breadcrumb */}
                        <div className="mb-5 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <Link to="/" className="transition hover:text-[#2563eb]">
                                Home
                            </Link>
                            <ChevronRight className="h-3 w-3 text-slate-500" />
                            <Link to="/#capabilities" className="transition hover:text-[#2563eb]">
                                Capabilities
                            </Link>
                            <ChevronRight className="h-3 w-3 text-slate-500" />
                            <span className="font-semibold text-slate-200">3D Printing</span>
                        </div>

                        {/* Category Tag with Process Code */}
                        <div className="mb-3 flex items-center gap-2.5">
                            <span className="inline-flex items-center rounded-md bg-[#2563eb]/20 border border-[#2563eb]/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                                PRC-004
                            </span>
                            <span className="h-[2px] w-6 bg-[#2563eb]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                                ADDITIVE MANUFACTURING
                            </span>
                        </div>

                        {/* Headline with Main Project Outline Typography */}
                        <h1 className="font-medium leading-[0.98] tracking-[-0.02em] text-white">
                            <span className="block text-[clamp(28px,5.5vw,58px)] font-bold">
                                Additive Manufacturing.
                            </span>
                            <span
                                className="mt-1 block text-[clamp(24px,4.8vw,50px)] font-extrabold uppercase leading-[1.08] text-[#2563eb]"
                            >
                                Metal Layer by Layer.
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
                            Direct Metal Laser Sintering (DMLS), Selective Laser Melting (SLM), WAAM, and Binder Jetting — engineered for complex internal cooling channels, lightweighting, and rapid part restoration.
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                            <Link
                                to="/#quote"
                                onClick={() => trackQuoteCtaClick("3d_printing_hero")}
                                className="group inline-flex h-12 items-center justify-center gap-2 bg-[#2563eb] px-6 text-[15px] font-semibold text-white shadow-md transition-all hover:bg-blue-600 active:scale-[0.99] text-center"
                            >
                                Request a Quote
                                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                                    →
                                </span>
                            </Link>
                            <a
                                href="#processes"
                                className="inline-flex h-12 items-center justify-center border border-white/70 bg-black/20 px-6 text-[15px] font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white hover:text-navy-900 text-center cursor-pointer"
                            >
                                Explore 5 Additive Processes
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
                                    UP TO 99.8% DENSITY
                                </span>
                                <span className="h-3.5 w-[2px] bg-[#2563eb]/80" aria-hidden="true" />
                            </li>

                            <li className="flex items-center gap-2 sm:gap-4">
                                <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-white">
                                    DMLS / SLM / WAAM
                                </span>
                                <span className="h-3.5 w-[2px] bg-[#2563eb]/80" aria-hidden="true" />
                            </li>

                            <li className="flex items-center gap-2 sm:gap-4">
                                <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-white">
                                    RAPID PROTOTYPE TO RUN
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Capability overview — custom line-art illustration, no card, no stock photo */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                        <div>
                            <SectionMark label="Our capability" />
                            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                Additive Manufacturing, Alongside Our Core Processes
                            </h2>
                            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600">
                                Metal 3D printing complements forging and CNC rather than
                                replacing them — it's the right call for part restoration,
                                complex internal geometries, and low-volume runs where hard
                                tooling doesn't make sense. We run five processes: DED/LMD,
                                WAAM, DMLS, SLM, and Binder Jetting, each suited to a different
                                combination of part size, complexity, and volume.
                            </p>

                            <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3 border-t border-slate-200 pt-6 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                {coreList.map((item, i) => (
                                    <span key={item} className="flex items-center gap-2">
                                        <span className={i === 0 ? "text-slate-900" : ""}>{item}</span>
                                        {i < coreList.length - 1 && (
                                            <ArrowRight className="h-3 w-3 text-[#2563eb]" strokeWidth={2.5} />
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <BracketWireframe />
                            <div className="mt-8 border-t border-slate-200 pt-6">
                                <p className="text-xl font-bold leading-snug text-slate-900">
                                    Same metal.
                                    <br />
                                    <span className="text-[#2563eb]">More freedom.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Five printing processes — sticky index rail + editorial row list */}
            <section id="processes" className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <SectionMark label="Our processes" />
                    <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-12">
                        <ProcessRail rows={processRows} activeIndex={activeProcess} onSelect={handleRailSelect} />
                        <div>
                            {processRows.map((row, i) => (
                                <ProcessRowItem
                                    key={row.number}
                                    row={row}
                                    index={i}
                                    innerRef={(el) => {
                                        rowRefs.current[i] = el;
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Materials & Build Envelope — annotated diagram instead of stock cubes */}
            <section className="bg-slate-950 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
                        <div>
                            <SectionMark label="Materials & build envelope" tone="light" />
                            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                What We Print, and How Big
                            </h2>
                            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-400">
                                3D printing is offered; specific material and build-envelope
                                details are confirmed against the drawing before quotation.
                            </p>

                            <Link
                                to="/#quote"
                                className="mt-9 inline-flex items-center gap-2.5 bg-[#2563eb] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2563eb]"
                            >
                                Discuss Your Part
                                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                            </Link>
                        </div>

                        <BuildEnvelopeDiagram />
                    </div>
                </div>
            </section>

            {/* RFQ — open layout, no card, bookends the hero's spec-strip motif */}
            <section className="border-t border-slate-200 py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
                        <div>
                            <SectionMark label="Ready to build?" />
                            <h2 className="mt-4 text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
                                Get a Quote for
                                <br />
                                3D Printing
                            </h2>
                            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-600">
                                Send the basics now — for material, size, or finish details,
                                use the full request-a-quote form.
                            </p>

                            <Link
                                to="/#quote"
                                onClick={() => trackQuoteCtaClick("3d_printing_bottom")}
                                className="mt-9 inline-flex items-center gap-2.5 bg-slate-900 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-[#2563eb]"
                            >
                                Request a Quote
                                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                            </Link>
                            <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-400">
                                Process pre-selected: 3D Printing
                            </p>
                        </div>

                        <div className="lg:border-l lg:border-slate-200 lg:pl-12">
                            <div className="space-y-7">
                                {rfqFeatures.map((feature, i) => (
                                    <div
                                        key={feature.title}
                                        className={`flex items-center gap-4 ${i > 0 ? "border-t border-slate-100 pt-7" : ""}`}
                                    >
                                        {feature.icon}
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                                            <p className="mt-0.5 text-xs text-slate-500">{feature.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
