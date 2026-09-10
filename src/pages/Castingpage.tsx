import { Link } from "react-router-dom";
import {
    Settings,
    CircleDot,
    ShieldCheck,
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
        imageSrc: "/images/casting/investment-casting.jpg",
        gifSrc: "/Gif-Assets/Video_on_Investment_Casting_Process.gif",
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
        imageSrc: "/images/casting/centrifugal-casting.jpg",
        gifSrc: "/Gif-Assets/Video_on_Centrifugal_Casting.gif",
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
        imageSrc: "/images/casting/sand-casting.jpg",
        gifSrc: "/Gif-Assets/Steel_Bar_Dipped_in_Water.gif",
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
        imageSrc: "/images/casting/aluminum-casting.jpg",
        gifSrc: "/Gif-Assets/Steel_Bar_Cooling_Video_Link.gif",
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
        imageSrc: "/images/casting/die-casting.jpg",
        gifSrc: "/Gif-Assets/Steel_Die_Casting_Video_Ready.gif",
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
        icon: <Zap className="h-4 w-4 text-[#B5522B]" strokeWidth={2} />,
        title: "Fast Response",
        subtitle: "Typically within 24 hours",
    },
    {
        icon: <Lock className="h-4 w-4 text-[#B5522B]" strokeWidth={2} />,
        title: "Confidential",
        subtitle: "Your data is safe with us",
    },
    {
        icon: <Headphones className="h-4 w-4 text-[#B5522B]" strokeWidth={2} />,
        title: "Expert Support",
        subtitle: "We help you find the right solution",
    },
];

const heroFeatures = [
    { icon: Settings, label: "Multiple Processes" },
    { icon: CircleDot, label: "Wide Material Range" },
    { icon: ShieldCheck, label: "Single Point of Contact" },
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
            <img
                src={gifSrc}
                alt={`Casting process ${number}`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
        </div>
    );
}

function ProcessRow({ section }: { section: ProcessSection }) {
    const mediaFirst = section.layout === "media-first";

    return (
        <div className="relative border-b border-[#E7E3DC] py-14 first:pt-0 last:border-b-0 last:pb-0 lg:py-16">
            {/* Ghost sequence number — ties to the real ordering of the five processes */}
            <span
                aria-hidden
                className="pointer-events-none absolute -top-3 right-0 select-none font-display text-[96px] font-black leading-none text-[#1B1F23]/[0.035] lg:text-[140px]"
            >
                {section.number}
            </span>

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-6 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}>
                    <MediaCard number={section.number} gifSrc={section.gifSrc} />
                </div>

                <div className={`lg:col-span-6 ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#B5522B]">
                            {section.badgeNumber}
                        </span>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            {section.eyebrow}
                        </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-slate-900 sm:text-[26px]">
                        {section.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
                        {section.description}
                    </p>

                    <div className="mt-6 border-t border-[#E7E3DC] pt-5">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            Key Benefits
                        </span>
                        <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                            {section.benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start gap-2 text-sm text-slate-700">
                                    <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-[#B5522B]" strokeWidth={2.5} />
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
        <main className="w-full bg-[#FAF8F4]">
            {/* 1. Hero Section */}
            <section className="relative overflow-hidden bg-slate-950 min-h-[600px] lg:min-h-[660px] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20">
                <img
                    src="/images/casting/hero.jpg"
                    alt="Molten metal pouring in industrial foundry"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16 w-full">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Link to="/" className="transition hover:text-[#D97C58]">Home</Link>
                        <ChevronRight className="h-3 w-3 text-slate-500" />
                        <span className="text-slate-200 font-semibold">Casting</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-center gap-12">
                        <div>
                            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#D97C58]">
                                CASTING
                            </span>
                            <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Casting
                            </h1>
                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                                Investment, centrifugal, sand, aluminum, and die casting —
                                matched to the part, not forced into one process.
                            </p>

                            {/* 3 Frosted Badges */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                {heroFeatures.map(({ icon: Icon, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md"
                                    >
                                        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/10">
                                            <Icon className="h-4 w-4 text-[#D97C58]" strokeWidth={1.8} />
                                        </span>
                                        <span className="text-xs font-medium leading-tight text-slate-200">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Divider and focal point footer line */}
                            <div className="mt-14 flex items-center gap-4">
                                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                                    PRECISION AS-CAST FORM
                                </span>
                                <span className="h-px w-36 bg-slate-700" />
                            </div>
                        </div>

                        {/* Right column: Vertical Tagline + Focal point */}
                        <div className="flex flex-col items-start lg:items-end justify-between h-full space-y-12">
                            <div className="hidden lg:flex items-center gap-3 self-end">
                                <div className="h-32 w-px bg-white/20" />
                                <div className="font-mono text-xs font-medium tracking-[0.2em] uppercase leading-relaxed text-slate-300">
                                    FROM
                                    <br />
                                    MOLTEN
                                    <br />
                                    TO SOLID
                                    <br />
                                    PRECISION
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

            {/* 2. Capability Overview Section */}
            <section className="border-b border-[#E7E3DC] py-16 lg:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-12 lg:px-16">
                    <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-[#B5522B]">
                            Our Capability
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Five Casting Processes, One Point of Contact
                        </h2>
                        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                            From intricate precision parts to large, complex components, Solvoka
                            coordinates five casting processes to match your exact requirements — with a
                            single, reliable partner.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 border-l-2 border-[#B5522B] bg-white py-5 pl-6 pr-5">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#B5522B]/10">
                            <Share2 className="h-5 w-5 text-[#B5522B]" strokeWidth={2} />
                        </span>
                        <p className="font-display text-sm font-semibold leading-snug text-slate-900">
                            Different processes.
                            <br />
                            Stronger possibilities.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Five Casting Processes Rows (Alternating Layout) */}
            <section className="py-4 lg:py-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    {processSections.map((section) => (
                        <ProcessRow key={section.number} section={section} />
                    ))}
                </div>
            </section>

            {/* 4. Materials & Size Envelope */}
            <section className="border-t border-[#E7E3DC] py-16 lg:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-14 lg:px-16">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-slate-100 ring-1 ring-slate-950/10">
                        <FramedCorners tone="dark" />
                        <img
                            src="/images/casting/materials.jpg"
                            alt="Precision machined and cast metal components"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wide text-[#B5522B]">
                            Materials &amp; Size Envelope
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Materials We Work With
                        </h2>
                        <p className="mt-3 text-[15px] text-slate-600">
                            Materials: carbon steel, stainless steel, aluminum.
                        </p>

                        <div className="mt-7 divide-y divide-[#E7E3DC] border-y border-[#E7E3DC]">
                            {materials.map((mat) => (
                                <div key={mat.label} className="flex items-center gap-3.5 py-3.5">
                                    <MetalCubeIcon gradient={mat.gradient} />
                                    <span className="font-display text-sm font-semibold text-slate-800">
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
                    <div className="relative border border-[#E7E3DC] bg-white p-8 lg:p-14">
                        <FramedCorners tone="dark" />

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:items-center lg:gap-10">
                            <div>
                                <span className="font-mono text-xs font-semibold uppercase tracking-wide text-[#B5522B]">
                                    Ready to Get Started?
                                </span>
                                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                    Get a Quote for Casting
                                </h2>
                                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                                    Send the basics now — for material, size, or finish details,
                                    use the full request-a-quote form.
                                </p>

                                <div className="mt-7 flex flex-col items-start gap-2.5">
                                    <Link
                                        to="/#contact"
                                        className="group inline-flex items-center gap-2 bg-[#B5522B] px-6 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-[#9C4423]"
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

                            <div className="flex flex-col gap-5 border-t border-[#E7E3DC] pt-8 lg:border-t-0 lg:border-l lg:border-[#E7E3DC] lg:pt-0 lg:pl-10">
                                {rfqFeatures.map((feature) => (
                                    <div key={feature.title} className="flex items-center gap-3.5">
                                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#B5522B]/10">
                                            {feature.icon}
                                        </span>
                                        <div className="leading-tight">
                                            <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                                            <p className="text-xs text-slate-500">{feature.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="relative flex flex-col items-center gap-4 border-t border-[#E7E3DC] pt-8 lg:border-t-0 lg:pt-0">
                                <div className="w-full text-left">
                                    <p className="font-serif italic text-lg text-slate-500">
                                        Your
                                        <br />
                                        <span className="text-xl font-medium text-slate-800">Casting Partner</span>
                                        <br />
                                        in India
                                    </p>
                                </div>
                                <div className="relative aspect-square w-full max-w-[220px] overflow-hidden">
                                    <img
                                        src="/images/casting/cad-blueprint.jpg"
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