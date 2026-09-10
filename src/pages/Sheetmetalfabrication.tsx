import { type SVGProps, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/**
 * SheetMetalFabrication
 * ----------------------------------------------------------------------
 * Capability page for Solvoka's Sheet Metal Fabrication service line.
 *
 * All media below points at placeholder local paths under /assets/...
 * Swap `videoSrc` / `posterSrc` / `image` values for your real files —
 * every path is defined once, either inline on the data objects or in
 * the constants near the top, so search-and-replace is straightforward.
 * ----------------------------------------------------------------------
 */

/* ------------------------------------------------------------------ */
/*  Icons (hand-rolled, no external icon package required)             */
/* ------------------------------------------------------------------ */

type IconProps = SVGProps<SVGSVGElement>;

const iconBase = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};


const IconArrowRight = (props: IconProps) => (
    <svg {...iconBase} {...props}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
    </svg>
);

const IconCheck = (props: IconProps) => (
    <svg {...iconBase} strokeWidth={2.25} {...props}>
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

const IconLayers = (props: IconProps) => (
    <svg {...iconBase} {...props}>
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
    </svg>
);

const IconBox = (props: IconProps) => (
    <svg {...iconBase} {...props}>
        <path d="M21 8 12 3 3 8l9 5 9-5Z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
    </svg>
);

const IconSettings = (props: IconProps) => (
    <svg {...iconBase} {...props}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
    </svg>
);

const IconBarChart = (props: IconProps) => (
    <svg {...iconBase} {...props}>
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="6" />
        <rect x="12" y="8" width="3" height="10" />
        <rect x="17" y="5" width="3" height="13" />
    </svg>
);

const IconZap = (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
);

const IconLock = (props: IconProps) => (
    <svg {...iconBase} {...props}>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
);

const IconBell = (props: IconProps) => (
    <svg {...iconBase} {...props}>
        <path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
        <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
);

/* ------------------------------------------------------------------ */
/*  Shared tokens (kept in sync with the Casting capability page)      */
/* ------------------------------------------------------------------ */

const COPPER = "#B5522B";
const COPPER_DARK = "#9C4423";
const GRAPHITE = "#1B1F23";
const PAPER = "#FAF8F4";
const ASH = "#E7E3DC";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

interface HeroFeature {
    icon: (props: IconProps) => ReactNode;
    lineOne: string;
    lineTwo: string;
}

const heroFeatures: HeroFeature[] = [
    { icon: IconLayers, lineOne: "Precision", lineTwo: "Processes" },
    { icon: IconBox, lineOne: "Wide", lineTwo: "Material Range" },
    { icon: IconSettings, lineOne: "From Prototype", lineTwo: "to Production" },
    { icon: IconBarChart, lineOne: "Reliable", lineTwo: "& Scalable" },
];

interface CapabilityItem {
    id: string;
    number: string;
    title: string;
    subtitle: string;
    duration: string;
    bullets: string[];
    gifSrc: string;
}

const capabilities: CapabilityItem[] = [
    {
        id: "sheet-cutting",
        number: "01",
        title: "Sheet Cutting",
        subtitle: "Clean Cuts, Exact Dimensions",
        duration: "01:24",
        bullets: [
            "Smooth cuts with minimal burrs",
            "Ideal for flat patterns and panels",
            "Efficient material utilization",
            "Supports pre-fabrication needs",
        ],
        gifSrc: "/Gif-Assets/Adobe Express - Video_Ready_Sheet_Cutting.gif",
    },
    {
        id: "laser-cutting",
        number: "02",
        title: "Laser Cutting",
        subtitle: "High-Speed Precision",
        duration: "01:32",
        bullets: [
            "Complex shapes with tight tolerances",
            "Rapid turnaround",
            "Cost-efficient production",
            "Design flexibility",
        ],
        gifSrc: "/Gif-Assets/Laser_Cutting_Video_Ready.gif",
    },
    {
        id: "plasma-cutting",
        number: "03",
        title: "Precision Plasma Cutting",
        subtitle: "Fast, Accurate Cutting for Thick Metals",
        duration: "01:18",
        bullets: [
            "Cuts steel, stainless steel, aluminum",
            "Ideal for heavy-duty parts",
            "Faster and more affordable than traditional methods",
            "Smooth edges, minimal post-processing",
        ],
        gifSrc: "/Gif-Assets/Video_Ready_Plasma_Cutting.gif",
    },
    {
        id: "water-jet-cutting",
        number: "04",
        title: "Water Jet Cutting",
        subtitle: "Cold Cutting, Zero Heat Damage",
        duration: "01:26",
        bullets: [
            "Cuts metals, plastics, ceramics & more",
            "No heat-affected zones (HAZ)",
            "Suitable for thick & hard materials",
            "Highly detailed, clean finishes",
        ],
        gifSrc: "/Gif-Assets/Video_Link_Ready_Sheet_Metal.gif",
    },
    {
        id: "sheet-metal-bending",
        number: "05",
        title: "Sheet Metal Bending",
        subtitle: "Perfect Angles, Every Time",
        duration: "01:30",
        bullets: [
            "Accurate, consistent bends",
            "Quick setup for prototyping & volume",
            "Supports multiple materials",
            "Critical for enclosures & chassis",
        ],
        gifSrc: "/Gif-Assets/Video_Link_Ready_Now_.gif",
    },
    {
        id: "pneumatic-metal-forming",
        number: "06",
        title: "Pneumatic Metal Forming",
        subtitle: "High-Precision Forming",
        duration: "01:28",
        bullets: [
            "Uniform forming without distortion",
            "Ideal for automotive parts",
            "Consistent quality in high-volume runs",
            "Minimal tooling wear",
        ],
        gifSrc: "/Gif-Assets/pneumatic_metal_forming.jpg",
    },
    {
        id: "welding-services",
        number: "07",
        title: "Welding Services",
        subtitle: "Strong, Reliable Joints",
        duration: "01:26",
        bullets: [
            "MIG, TIG, Spot & Robotic Welding",
            "Structural and long-lasting strength",
            "Wide range of materials",
            "Full welding & finishing solutions",
        ],
        gifSrc: "/Gif-Assets/Video_Link_Steel_Casting.gif",
    },
    {
        id: "deburring-finishing",
        number: "08",
        title: "Deburring & Finishing",
        subtitle: "Every Detail Refined",
        duration: "01:20",
        bullets: [
            "Improved safety, fit, and assembly",
            "Enhanced surface aesthetics",
            "Better coating and painting adhesion",
            "Increased part lifespan",
        ],
        gifSrc: "/Gif-Assets/Deburring_Video_Is_Ready_.gif",
    },
];

interface Material {
    name: string;
    image: string;
}

const materials: Material[] = [
    { name: "Mild Steel", image: "/images/sheetmetal/materials/mild-steel.jpg" },
    { name: "Stainless Steel (SS304/SS316)", image: "/images/sheetmetal/materials/stainless-steel.jpg" },
    { name: "Aluminum", image: "/images/sheetmetal/materials/aluminum.jpg" },
];

interface CtaFeature {
    icon: (props: IconProps) => ReactNode;
    title: string;
    subtitle: string;
}

const ctaFeatures: CtaFeature[] = [
    { icon: IconZap, title: "Fast Response", subtitle: "Typically within 24 hours" },
    { icon: IconLock, title: "Confidential", subtitle: "Your data is safe with us" },
    { icon: IconBell, title: "Expert Support", subtitle: "We help you find the right solution" },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionKicker({ children }: { children: ReactNode }) {
    return (
        <div
            className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest sm:text-sm"
            style={{ color: COPPER }}
        >
            <span className="h-3.5 w-0.5" style={{ backgroundColor: COPPER }} />
            {children}
        </div>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-950 min-h-[600px] lg:min-h-[660px] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20">
            {/* Full-bleed industrial fiber laser cutting background */}
            <img
                src="/images/sheetmetal/hero.jpg"
                alt="High-precision fiber laser cutting sheet metal with sparks"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16 w-full">
                {/* Breadcrumb */}
                <div className="mb-6 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Link to="/" className="transition hover:text-white" style={{ color: "rgb(148, 163, 184)" }}>Home</Link>
                    <ChevronRight className="h-3 w-3 text-slate-500" />
                    <span className="text-slate-200 font-semibold">Sheet Metal Fabrication</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-center gap-12">
                    {/* Left column */}
                    <div>
                        <SectionKicker>Sheet Metal Fabrication</SectionKicker>
                        <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            From Sheet
                            <br />
                            to <span style={{ color: COPPER }}>Solution</span>
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                            From precise cutting to complex forming and finishing, we deliver
                            high-quality sheet metal solutions for demanding applications.
                        </p>

                        {/* 4 Frosted Badges */}
                        <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                            {heroFeatures.map((f) => (
                                <div
                                    key={f.lineOne}
                                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md"
                                >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/10 text-neutral-300">
                                        <f.icon className="h-4 w-4" />
                                    </span>
                                    <span className="text-xs font-medium leading-tight text-slate-200">
                                        {f.lineOne}
                                        <br />
                                        {f.lineTwo}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Divider and focal point footer line */}
                        <div className="mt-14 flex items-center gap-4">
                            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                                CUT. FORM. FINISH.
                            </span>
                            <span className="h-px w-36 bg-slate-700" />
                        </div>
                    </div>

                    {/* Right column: Vertical Tagline + Focal point */}
                    <div className="flex flex-col items-start lg:items-end justify-between h-full space-y-12">
                        <div className="hidden lg:flex items-center gap-3 self-end">
                            <div className="h-32 w-px bg-white/20" />
                            <div className="font-mono text-xs font-medium tracking-[0.2em] uppercase leading-relaxed text-slate-300">
                                SHEET
                                <br />
                                METAL
                                <br />
                                IDEAS INTO
                                <br />
                                REALITY
                            </div>
                        </div>

                        <div className="text-left lg:text-right">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                FOCAL POINT
                            </p>
                            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                                LUDHIANA, INDIA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function OverviewSection() {
    return (
        <section className="border-b py-14 lg:py-18 bg-white" style={{ borderColor: ASH }}>
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:px-16">
                <div>
                    <SectionKicker>Our Capability</SectionKicker>
                    <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        Integrated Sheet Metal Fabrication, From Raw Sheet to Assembly
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                        From high-speed fiber laser cutting and precision CNC press braking to structural welding and surface finishing, Solvoka delivers tightly toleranced sheet metal assemblies engineered for demanding automotive, industrial, and enclosure applications.
                    </p>
                </div>

                <div className="flex items-center justify-between rounded-2xl border bg-[#FAF8F4] px-6 py-5 shadow-xs" style={{ borderColor: ASH }}>
                    <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border bg-white shadow-xs" style={{ borderColor: ASH, color: COPPER }}>
                            <IconLayers className="h-6 w-6" />
                        </span>
                        <div>
                            <p className="text-sm font-bold leading-snug text-neutral-900">
                                Micron Precision.
                                <br />
                                Flawless Assembly.
                            </p>
                            <p className="mt-0.5 text-xs text-neutral-500">Tight tolerances down to ±0.1 mm</p>
                        </div>
                    </div>
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border bg-white text-neutral-600 shadow-xs" style={{ borderColor: ASH }}>
                        <IconArrowRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
        </section>
    );
}

/**
 * A thin skewed seam used between sections as this page's signature
 * "cut sheet metal" transition. `overflow-hidden` on the wrapper keeps the
 * clip-path shape from ever affecting page layout width on any viewport.
 */
function DiagonalDivider({ from, to }: { from: string; to: string }) {
    return (
        <div className="relative h-8 overflow-hidden lg:h-12" style={{ backgroundColor: to }} aria-hidden="true">
            <div
                className="absolute inset-0"
                style={{ backgroundColor: from, clipPath: "polygon(0 0, 100% 0, 100% 25%, 0 100%)" }}
            />
        </div>
    );
}

function CapabilityCard({ card }: { card: CapabilityItem }) {
    return (
        <article
            className="group flex flex-col border p-3 transition-colors duration-300"
            style={{ borderColor: ASH }}
        >
            <div className="relative overflow-hidden" style={{ backgroundColor: GRAPHITE }}>
                <img
                    src={card.gifSrc}
                    alt={card.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
            </div>

            <h3 className="mt-4 text-base font-bold text-neutral-900">{card.title}</h3>
            <p className="text-sm text-neutral-500">{card.subtitle}</p>

            <ul className="mt-3 flex flex-1 flex-col gap-2">
                {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] leading-snug text-neutral-600">
                        <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-900" />
                        {b}
                    </li>
                ))}
            </ul>

            <Link
                to="/#contact"
                className="group/link mt-4 inline-flex items-center justify-between border-t pt-3 text-xs font-semibold uppercase tracking-wider transition-colors"
                style={{ borderColor: ASH, color: COPPER }}
            >
                <span>Request Quote</span>
                <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
        </article>
    );
}

function CapabilitiesGrid() {
    return (
        <section className="py-16 lg:py-24" style={{ backgroundColor: PAPER }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-16">
                <div className="mb-10 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end lg:mb-14" style={{ borderColor: ASH }}>
                    <div>
                        <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 sm:text-sm">
                            <span className="h-px w-8 bg-neutral-300" />
                            Our Capabilities
                        </div>
                        <h2 className="font-display text-3xl font-semibold text-neutral-900 sm:text-4xl lg:text-5xl">
                            Sheet Metal Fabrication Capabilities
                        </h2>
                    </div>
                    <p className="text-sm italic text-neutral-400">
                        Eight processes. Endless possibilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
                    {capabilities.map((card) => (
                        <CapabilityCard key={card.id} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function MaterialsSection() {
    return (
        <section className="border-t py-16 lg:py-24" style={{ borderColor: ASH, backgroundColor: "#F3F0EA" }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-16">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.2fr_0.95fr] lg:items-center lg:gap-12">
                    {/* Intro */}
                    <div>
                        <SectionKicker>Materials &amp; Specifications</SectionKicker>
                        <h2 className="font-display text-3xl font-semibold text-neutral-900 sm:text-4xl lg:text-5xl">
                            What We Work With
                        </h2>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
                            Materials: mild steel, stainless steel (SS304/SS316), aluminum.
                        </p>
                    </div>

                    {/* Material swatches */}
                    <div className="grid grid-cols-3 gap-4">
                        {materials.map((m) => (
                            <div key={m.name} className="flex flex-col items-center gap-3 text-center">
                                <div className="aspect-square w-full overflow-hidden border bg-white" style={{ borderColor: ASH }}>
                                    <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                                </div>
                                <span className="text-xs font-medium leading-tight text-neutral-600">
                                    {m.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Thickness range */}
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                            Sheet Thickness Range
                        </p>
                        <p className="mt-1 text-3xl font-bold text-neutral-900">1 mm – 20 mm</p>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="relative h-1 flex-1 rounded-full bg-neutral-300">
                                <span className="absolute inset-y-0 left-0 w-1/4 rounded-full" style={{ backgroundColor: COPPER }} />
                                <span
                                    className="absolute -top-1 left-1/4 h-3 w-3 -translate-x-1/2 rounded-full border-2 bg-white"
                                    style={{ borderColor: COPPER }}
                                />
                            </div>
                            <IconArrowRight className="h-4 w-4 shrink-0 text-neutral-400" />
                        </div>

                        <div className="mt-6 aspect-[4/3] w-full overflow-hidden border bg-white" style={{ borderColor: ASH }}>
                            <img
                                src="/images/sheetmetal/materials/thickness-grid.jpg"
                                alt="Sheet metal thickness reference grid"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CtaSection() {
    return (
        <section className="py-20 lg:py-28" style={{ backgroundColor: GRAPHITE }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-16">
                <div
                    className="relative grid gap-10 overflow-hidden border px-8 py-14 lg:grid-cols-[1fr_0.75fr_0.9fr] lg:items-center lg:px-12 lg:py-16"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                    {/* Diagonal kerf accent — same motif as the hero, clipped to this card */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-2/5"
                        style={{
                            background: `linear-gradient(135deg, ${COPPER}12, transparent 70%)`,
                            clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0% 100%)",
                        }}
                    />

                    {/* Copy + CTA */}
                    <div className="relative z-10">
                        <SectionKicker>Get Started Today</SectionKicker>
                        <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                            Get a Quote for
                            <br />
                            Sheet Metal Fabrication
                        </h2>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
                            Share your drawings or requirements — we&apos;ll get back with a
                            competitive quote and expert guidance.
                        </p>
                        <Link
                            to="/#contact"
                            className="group mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors"
                            style={{ backgroundColor: COPPER }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COPPER_DARK)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COPPER)}
                        >
                            Request a Quote
                            <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <p className="mt-6 text-xs text-neutral-500">
                            Process pre-selected:{" "}
                            <span className="font-semibold text-neutral-300">
                                Sheet Metal Fabrication
                            </span>
                        </p>
                    </div>

                    {/* Trust points */}
                    <div className="relative z-10 flex flex-col gap-5 border-t border-white/10 pt-8 lg:border-t-0 lg:border-l lg:border-white/10 lg:pt-0 lg:pl-10">
                        {ctaFeatures.map((f) => (
                            <div key={f.title} className="flex items-start gap-3">
                                <span
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                                    style={{ backgroundColor: `${COPPER}22`, color: COPPER }}
                                >
                                    <f.icon className="h-4 w-4" />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-white">
                                        {f.title}
                                    </span>
                                    <span className="block text-xs text-neutral-500">{f.subtitle}</span>
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="relative z-10 border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0">
                        <div className="aspect-[4/3] w-full overflow-hidden">
                            <img
                                src="/images/sheetmetal/cta-parts.jpg"
                                alt="Finished sheet metal brackets and enclosures"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span className="pointer-events-none absolute -top-4 right-2 -rotate-6 font-serif text-lg italic text-neutral-400">
                            Your Designs.
                            <br />
                            Our Expertise.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Root component                                                     */
/* ------------------------------------------------------------------ */

export default function SheetMetalFabrication() {
    return (
        <main style={{ backgroundColor: PAPER }}>
            <Hero />
            <OverviewSection />
            <CapabilitiesGrid />
            <MaterialsSection />
            <DiagonalDivider from="#F3F0EA" to={GRAPHITE} />
            <CtaSection />
        </main>
    );
}