import { Link } from "react-router-dom";
import { trackQuoteCtaClick } from "../utils/analytics";
import {
    ShieldCheck,
    ArrowRight,
    Check,
    ChevronRight,
    Layers,
    Weight,
    CircleDot,
    Zap,
    Lock,
    Users,
    Package,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

interface ProcessSection {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    benefits: string[];
    videoLabel: string;
    videoTagline?: string;
    imageSrc: string;
    gifSrc: string;
    layout: "media-right" | "media-left";
}

const processSections: ProcessSection[] = [
    {
        number: "01",
        eyebrow: "OPEN-DIE FORGING",
        title: "Open-Die Forging — Heavy-Duty Strength for Large, Custom Parts",
        description:
            "Our Open-Die Forging is ideal for producing large, custom-shaped components that require superior mechanical properties. Metal is shaped between flat dies without enclosing the workpiece completely — making it perfect for big, simple geometries like shafts, discs, and bars. Billets are heated above the material's recrystallization point before shaping — typically 1,000–1,300°C for steel — which lets the grain reflow instead of fracture.",
        benefits: [
            "Excellent grain flow and structural integrity",
            "Greater flexibility for custom shapes and sizes",
            "Handles large and ultra-heavy forgings with ease",
        ],
        videoLabel: "Open-Die Forging",
        videoTagline: "Watch Process Video",
        imageSrc: "/images/forging/hero.jpg",
        gifSrc: "/Gif-Assets/Video_of_Steel_Rod_Ready.gif",
        layout: "media-right",
    },
    {
        number: "02",
        eyebrow: "CLOSED-DIE FORGING",
        title: "Closed-Die Forging — Precision Shapes with High Strength",
        description:
            "Our Closed-Die Forging process shapes heated metal within custom die cavities, creating highly detailed and near-net-shape parts in a small number of press strikes. This is the go-to choice for high-volume production of complex components like gears, connecting rods, and automotive parts.",
        benefits: [
            "High repeatability and dimensional accuracy",
            "Superior mechanical strength due to controlled grain flow",
            "Minimal post-machining needed",
            "Ideal for medium-to-high volume production with consistent quality",
        ],
        videoLabel: "Closed-Die Forging",
        videoTagline: "Precision shapes. High strength.",
        imageSrc: "/images/forging/closed-die.jpg",
        gifSrc: "/Gif-Assets/Video_Ready_Closed_Die_Forging.gif",
        layout: "media-left",
    },
    {
        number: "03",
        eyebrow: "RING FORGING",
        title: "Ring Forging — Seamless Rings Built to Withstand Pressure",
        description:
            "We offer Seamless Ring Forging for producing strong, fatigue-resistant ring-shaped components. These forged rings are used in critical applications such as bearings, flanges, gear blanks.",
        benefits: [
            "Exceptional strength and toughness",
            "Can be customized in various diameters, thicknesses, and materials",
            "Withstands high pressure, heat, and rotational stress",
        ],
        videoLabel: "Ring Forging",
        videoTagline: "Watch Process Video",
        imageSrc: "/images/forging/ring-forging.jpg",
        gifSrc: "/Gif-Assets/Ring_Forging_Video_Available_Now.gif",
        layout: "media-right",
    },
];

const specItems = [
    {
        icon: <Layers className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />,
        label: "Materials",
        value: "EN8d, EN9, EN15, 20mnCr5, LC/MS",
    },
    {
        icon: <Weight className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />,
        label: "Open-Die Maximum Part Weight",
        value: "5 kg",
    },
    {
        icon: <Package className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />,
        label: "Closed-Die Part Weight Range",
        value: "5 kg to 10 kg",
    },
    {
        icon: <CircleDot className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />,
        label: "Ring Forging Diameter Range",
        value: "15 mm to 60 mm",
    },
];

const rfqFeatures = [
    {
        icon: <Zap className="h-4 w-4 text-white" strokeWidth={2} />,
        title: "Fast Response",
        subtitle: "Typically within 24 hours",
    },
    {
        icon: <Lock className="h-4 w-4 text-white" strokeWidth={2} />,
        title: "Confidential",
        subtitle: "Your data is safe with us",
    },
    {
        icon: <Users className="h-4 w-4 text-white" strokeWidth={2} />,
        title: "Expert Support",
        subtitle: "We help you find the right solution",
    },
];

/* ------------------------------------------------------------------ */
/* Shared Components                                                  */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#2563eb] sm:text-sm font-semibold">
                {children}
            </span>
            <span className="h-px w-5 bg-[#2563eb]" />
        </div>
    );
}

function VideoCard({
    label,
    gifSrc,
}: {
    label: string;
    gifSrc: string;
}) {
    return (
        <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
            <img
                src={gifSrc}
                alt={label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>
    );
}

function BenefitsCard({ benefits }: { benefits: string[] }) {
    return (
        <div className="h-full rounded-2xl border border-[#2563eb]/60 bg-[#ffffff] p-6 flex flex-col justify-center">
            <h4 className="text-sm font-bold text-slate-900">Benefits</h4>
            <ul className="mt-3.5 space-y-3">
                {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-[#2563eb]" strokeWidth={2.5} />
                        <span className="text-xs sm:text-sm leading-relaxed text-slate-600">{benefit}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function ForgingPage() {
    return (
        <main className="w-full bg-white">
            {/* Hero — Matching Main Project Hero Architecture */}
            <section className="relative flex min-h-[85vh] lg:min-h-[90vh] shrink-0 flex-col justify-center overflow-hidden bg-neutral-950 pt-24 pb-16 lg:pt-28 lg:pb-20">
                {/* Hero Background motion GIF with dramatic closed-die forging press */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <img
                        src="/Gif-Assets/Video_Ready_Closed_Die_Forging.gif"
                        alt="Industrial hydraulic closed die forging press stamping glowing steel billet"
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
                            <span className="text-slate-200 font-semibold">Forging</span>
                        </div>

                        {/* Category Tag with Process Code */}
                        <div className="mb-3 flex items-center gap-2.5">
                            <span className="inline-flex items-center rounded-md bg-[#2563eb]/20 border border-[#2563eb]/40 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                                PRC-002
                            </span>
                            <span className="h-[2px] w-6 bg-[#2563eb]" />
                            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                                PRECISION FORGING
                            </span>
                        </div>

                        {/* Headline with Main Project Outline Typography */}
                        <h1 className="font-medium leading-[0.98] tracking-[-0.02em] text-white">
                            <span className="block text-[clamp(28px,5.5vw,58px)] font-bold">
                                Engineered Grain Flow.
                            </span>
                            <span
                                className="mt-1 block text-[clamp(24px,4.8vw,50px)] font-extrabold uppercase leading-[1.08] text-[#2563eb]"
                            >
                                High-Strength Forging.
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
                            Open-die, closed-die, and seamless ring forging for automotive transmission, powertrain, and heavy industrial equipment — engineered grain structure with continuous fiber integrity, not just cut metal.
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                            <Link
                                to="/#quote"
                                className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-5 text-[15px] font-bold text-white shadow-lg shadow-[#2563eb]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-[#2563eb]/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0"
                            >
                                Start Your Forging RFQ
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
                            </Link>
                            <a
                                href="#forging-processes"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo({ top: 700, behavior: 'smooth' });
                                }}
                                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/50 bg-slate-950/30 px-5 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                View 3 Forging Processes
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
                                    CLOSED & OPEN DIE
                                </span>
                                <span className="h-3.5 w-[2px] bg-[#2563eb]/80" aria-hidden="true" />
                            </li>

                            <li className="flex items-center gap-2 sm:gap-4">
                                <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-white">
                                    SEAMLESS RINGS TO 60MM
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

            {/* Section 1 — Capability Overview */}
            <section className="py-14 lg:py-18 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:px-16">
                    <div>
                        <Eyebrow>OUR CAPABILITY</Eyebrow>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Forging Is Where Solvoka Starts
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                            At Solvoka, forging is the foundation. We shape stronger, more
                            reliable components for automotive and heavy industrial
                            applications using proven forging processes and strict quality
                            control.
                        </p>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-[#2563eb] bg-[#ffffff] px-6 py-5 shadow-xs">
                        <div className="flex items-center gap-3.5">
                            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-[#2563eb] bg-white shadow-xs">
                                <ShieldCheck className="h-6 w-6 text-[#2563eb]" strokeWidth={2} />
                            </span>
                            <p className="text-sm font-bold leading-snug text-slate-900">
                                Precision. Strength.
                                <br />
                                Longer Life.
                            </p>
                        </div>
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#2563eb] bg-white text-[#2563eb] shadow-xs">
                            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                    </div>
                </div>
            </section>

            {/* Sections 2–4 — Open-Die, Closed-Die, Ring Forging */}
            <section id="forging-processes" className="pb-16 lg:pb-24 space-y-12 lg:space-y-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-16 space-y-12 lg:space-y-16">
                    {processSections.map((section) => {
                        const textCol = (
                            <div className="flex flex-col justify-center">
                                <div className="mb-2.5 flex items-center gap-2.5">
                                    <span className="flex h-6 w-7 flex-none items-center justify-center rounded-md border border-[#2563eb] bg-[#2563eb]/10 text-xs font-bold text-[#2563eb]">
                                        {section.number}
                                    </span>
                                    <span className="text-xs uppercase tracking-wider text-[#2563eb] font-bold">
                                        {section.eyebrow}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold leading-tight text-slate-900 sm:text-[26px]">
                                    {section.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600">{section.description}</p>
                            </div>
                        );

                        const benefitsCol = <BenefitsCard benefits={section.benefits} />;
                        const videoCol = (
                            <VideoCard
                                label={section.videoLabel}
                                gifSrc={section.gifSrc}
                            />
                        );

                        return (
                            <div
                                key={section.number}
                                className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.8fr_1fr] lg:items-center lg:gap-8 border-b border-slate-100 pb-12 last:border-b-0"
                            >
                                {section.layout === "media-left" ? (
                                    <>
                                        <div className="lg:order-1">{videoCol}</div>
                                        <div className="lg:order-2">{textCol}</div>
                                        <div className="lg:order-3">{benefitsCol}</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="lg:order-1">{textCol}</div>
                                        <div className="lg:order-2">{benefitsCol}</div>
                                        <div className="lg:order-3">{videoCol}</div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Section 5 — Materials & Size Envelope */}
            <section className="py-14 lg:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <Eyebrow>MATERIALS &amp; SIZE ENVELOPE</Eyebrow>

                    <div className="mt-5 grid grid-cols-1 divide-y divide-blue-200/50 rounded-2xl border border-[#2563eb] bg-[#ffffff] sm:grid-cols-4 sm:divide-x sm:divide-y-0 shadow-xs">
                        {specItems.map((item) => (
                            <div key={item.label} className="flex items-center gap-3.5 p-5 lg:p-6">
                                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-[#2563eb] bg-white shadow-xs">
                                    {item.icon}
                                </span>
                                <div>
                                    <p className="text-xs font-semibold leading-snug text-slate-600">{item.label}</p>
                                    <p className="mt-1 text-sm font-bold text-slate-900">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6 — Tolerance Approach */}
            <section className="py-14 lg:py-20 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:px-16">
                    <div>
                        <div className="mb-2.5 flex items-center gap-2.5">
                            <span className="flex h-6 w-7 flex-none items-center justify-center rounded-md border border-[#2563eb] bg-[#2563eb]/10 text-xs font-bold text-[#2563eb]">
                                06
                            </span>
                            <span className="text-xs uppercase tracking-wider text-[#2563eb] font-bold">
                                TOLERANCE APPROACH
                            </span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Our Tolerance Approach
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                            Open-die forging holds a looser as-forged tolerance by nature,
                            so parts needing tight final dimensions are finish-machined on
                            our CNC line afterward, in the same order. Closed-die forging
                            holds a tighter as-forged tolerance because the die controls
                            the shape directly. Every first piece off the die is isolated
                            and checked against the drawing before the run continues — see
                            Gate 2 of our inspection process.
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-6 rounded-2xl border border-[#2563eb] bg-[#ffffff] p-6 shadow-xs">
                        <div className="flex items-start gap-3.5">
                            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-[#2563eb] bg-white shadow-xs">
                                <ShieldCheck className="h-5 w-5 text-[#2563eb]" strokeWidth={2} />
                            </span>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Checked. Then Continued.</p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                    Every first piece is inspected before production continues.
                                </p>
                            </div>
                        </div>
                        <img
                            src="/images/forging/tolerance-pin.jpg"
                            alt="Machined stepped steel pin detail"
                            className="h-16 w-20 flex-none rounded-lg object-contain bg-white/80 p-1 border border-[#2563eb] shadow-xs"
                        />
                    </div>
                </div>
            </section>

            {/* Section 8 — RFQ Block */}
            <section className="pb-20 lg:pb-28 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-[#172554] px-8 py-12 lg:px-14 lg:py-16 text-white shadow-2xl">
                        <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#2563eb]/25 blur-3xl" />
                        <div aria-hidden="true" className="absolute -bottom-32 left-1/3 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
                        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:gap-12">
                            {/* Left Column */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-blue-300 sm:text-sm">
                                        READY TO START?
                                    </span>
                                    <span className="h-px w-8 bg-blue-300" />
                                </div>
                                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Get a Quote for Forging
                                </h2>
                                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
                                    Send the basics now — for tolerance, finish, or destination
                                    details, use the full request-a-quote form.
                                </p>
                            </div>

                            {/* Middle Column */}
                            <div className="flex flex-col items-start gap-2.5 lg:items-center">
                                <Link
                                    to="/#quote"
                                    onClick={() => trackQuoteCtaClick("forging-rfq")}
                                    className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#2563eb]/35 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Request a Quote
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                                </Link>
                                <span className="text-xs text-slate-400">
                                    Process pre-selected: <strong className="text-white">Forging</strong>
                                </span>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-4 border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                                {rfqFeatures.map((feature) => (
                                    <div key={feature.title} className="flex items-center gap-3.5">
                                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/10 shadow-xs">
                                            {feature.icon}
                                        </span>
                                        <div className="leading-tight">
                                            <p className="text-sm font-semibold text-white">{feature.title}</p>
                                            <p className="text-xs text-slate-400">{feature.subtitle}</p>
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
