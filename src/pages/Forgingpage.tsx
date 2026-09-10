import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Settings,
    BarChart3,
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
        icon: <Layers className="h-5 w-5 text-blue-600" strokeWidth={2} />,
        label: "Materials",
        value: "EN8d, EN9, EN15, 20mnCr5, LC/MS",
    },
    {
        icon: <Weight className="h-5 w-5 text-blue-600" strokeWidth={2} />,
        label: "Open-Die Maximum Part Weight",
        value: "5 kg",
    },
    {
        icon: <Package className="h-5 w-5 text-blue-600" strokeWidth={2} />,
        label: "Closed-Die Part Weight Range",
        value: "5 kg to 10 kg",
    },
    {
        icon: <CircleDot className="h-5 w-5 text-blue-600" strokeWidth={2} />,
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
            <span className="font-mono text-xs uppercase tracking-widest text-blue-600 sm:text-sm font-semibold">
                {children}
            </span>
            <span className="h-px w-5 bg-blue-400" />
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
        <div className="h-full rounded-2xl border border-blue-100/60 bg-[#EFF5FF] p-6 flex flex-col justify-center">
            <h4 className="font-display text-sm font-bold text-slate-900">Benefits</h4>
            <ul className="mt-3.5 space-y-3">
                {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-blue-600" strokeWidth={2.5} />
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
            {/* Hero — full-bleed dark hero matching other capability pages */}
            <section className="relative overflow-hidden bg-slate-950 min-h-[600px] lg:min-h-[660px] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20">
                {/* Hero Background image with dramatic forging press and glowing billet */}
                <img
                    src="/images/forging/hero.jpg"
                    alt="Industrial hydraulic forging press stamping glowing steel billet"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/50" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16 w-full">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Link to="/" className="transition hover:text-blue-400">Home</Link>
                        <ChevronRight className="h-3 w-3 text-slate-500" />
                        <span className="text-slate-200 font-semibold">Forging</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-center gap-12">
                        {/* Left Column */}
                        <div>
                            <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
                                FORGING
                            </span>
                            <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Forging
                            </h1>
                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                                Open-die, closed-die, and ring forging for automotive and
                                heavy industrial components — engineered grain structure,
                                not just shaped metal.
                            </p>

                            {/* 3 Frosted Badges */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/10">
                                        <ShieldCheck className="h-4 w-4 text-white" strokeWidth={1.8} />
                                    </span>
                                    <span className="text-xs font-medium leading-tight text-slate-200">
                                        Stronger
                                        <br />
                                        Components
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/10">
                                        <Settings className="h-4 w-4 text-white" strokeWidth={1.8} />
                                    </span>
                                    <span className="text-xs font-medium leading-tight text-slate-200">
                                        Engineered
                                        <br />
                                        Grain Structure
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/10">
                                        <BarChart3 className="h-4 w-4 text-white" strokeWidth={1.8} />
                                    </span>
                                    <span className="text-xs font-medium leading-tight text-slate-200">
                                        Built for
                                        <br />
                                        Real-World Demands
                                    </span>
                                </div>
                            </div>

                            {/* Divider and focal point footer line */}
                            <div className="mt-14 flex items-center gap-4">
                                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                                    FROM CONCEPT TO COMPONENT
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
                                    HEAT TO
                                    <br />
                                    HIGHER
                                    <br />
                                    POSSIBILITIES
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

            {/* Section 1 — Capability Overview */}
            <section className="py-14 lg:py-18 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:px-16">
                    <div>
                        <Eyebrow>OUR CAPABILITY</Eyebrow>
                        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Forging Is Where Solvoka Starts
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
                            At Solvoka, forging is the foundation. We shape stronger, more
                            reliable components for automotive and heavy industrial
                            applications using proven forging processes and strict quality
                            control.
                        </p>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-[#EFF5FF] px-6 py-5 shadow-xs">
                        <div className="flex items-center gap-3.5">
                            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-blue-200 bg-white shadow-xs">
                                <ShieldCheck className="h-6 w-6 text-blue-600" strokeWidth={2} />
                            </span>
                            <p className="text-sm font-bold leading-snug text-slate-900">
                                Precision. Strength.
                                <br />
                                Longer Life.
                            </p>
                        </div>
                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-xs">
                            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                        </span>
                    </div>
                </div>
            </section>

            {/* Sections 2–4 — Open-Die, Closed-Die, Ring Forging */}
            <section className="pb-16 lg:pb-24 space-y-12 lg:space-y-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-16 space-y-12 lg:space-y-16">
                    {processSections.map((section) => {
                        const textCol = (
                            <div className="flex flex-col justify-center">
                                <div className="mb-2.5 flex items-center gap-2.5">
                                    <span className="flex h-6 w-7 flex-none items-center justify-center rounded-md border border-blue-200 bg-blue-50 font-mono text-xs font-bold text-blue-600">
                                        {section.number}
                                    </span>
                                    <span className="font-mono text-xs uppercase tracking-wider text-blue-600 font-bold">
                                        {section.eyebrow}
                                    </span>
                                </div>
                                <h3 className="font-display text-2xl font-bold leading-tight text-slate-900 sm:text-[26px]">
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

                    <div className="mt-5 grid grid-cols-1 divide-y divide-blue-200/50 rounded-2xl border border-blue-100 bg-[#EFF5FF] sm:grid-cols-4 sm:divide-x sm:divide-y-0 shadow-xs">
                        {specItems.map((item) => (
                            <div key={item.label} className="flex items-center gap-3.5 p-5 lg:p-6">
                                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-blue-200 bg-white shadow-xs">
                                    {item.icon}
                                </span>
                                <div>
                                    <p className="text-xs font-semibold leading-snug text-slate-600">{item.label}</p>
                                    <p className="mt-1 font-display text-sm font-bold text-slate-900">{item.value}</p>
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
                            <span className="flex h-6 w-7 flex-none items-center justify-center rounded-md border border-blue-200 bg-blue-50 font-mono text-xs font-bold text-blue-600">
                                06
                            </span>
                            <span className="font-mono text-xs uppercase tracking-wider text-blue-600 font-bold">
                                TOLERANCE APPROACH
                            </span>
                        </div>
                        <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
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

                    <div className="flex items-center justify-between gap-6 rounded-2xl border border-blue-100 bg-[#EFF5FF] p-6 shadow-xs">
                        <div className="flex items-start gap-3.5">
                            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-blue-200 bg-white shadow-xs">
                                <ShieldCheck className="h-5 w-5 text-blue-600" strokeWidth={2} />
                            </span>
                            <div>
                                <p className="font-display text-sm font-bold text-slate-900">Checked. Then Continued.</p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                    Every first piece is inspected before production continues.
                                </p>
                            </div>
                        </div>
                        <img
                            src="/images/forging/tolerance-pin.jpg"
                            alt="Machined stepped steel pin detail"
                            className="h-16 w-20 flex-none rounded-lg object-contain bg-white/80 p-1 border border-blue-100 shadow-xs"
                        />
                    </div>
                </div>
            </section>

            {/* Section 8 — RFQ Block */}
            <section className="pb-20 lg:pb-28 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="relative overflow-hidden rounded-3xl border border-blue-900/60 bg-gradient-to-r from-[#0C1E3C] via-[#0E2750] to-[#0A1A33] px-8 py-12 lg:px-14 lg:py-16 text-white shadow-xl">
                        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:gap-12">
                            {/* Left Column */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold sm:text-sm">
                                        READY TO START?
                                    </span>
                                    <span className="h-px w-5 bg-blue-400" />
                                </div>
                                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
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
                                    to="/#contact"
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500"
                                >
                                    Request a Quote
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                                </Link>
                                <span className="text-xs text-slate-400">
                                    Process pre-selected: <strong className="text-white">Forging</strong>
                                </span>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-4 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
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