import { Link } from "react-router-dom";
import {
    ArrowRight,
    ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data (Preserving original copy and content)                        */
/* ------------------------------------------------------------------ */

const stats = [
    { label: "Home Base", value: "Focal Point, Ludhiana", sub: "Punjab Heavy-Industrial Belt" },
    { label: "Partner Network", value: "15+ Vetted Facilities", sub: "Forging, CNC, Casting, Sheet Metal, 3D" },
    { label: "Quality Standard", value: "One Standard, Every Order", sub: "Zero-Concession Tolerance Governance" },
];

const whyChooseSolvoka = [
    {
        number: "01",
        title: "Single Point of Contact Across 5 Capabilities",
        desc: "One dedicated engineering account manager coordinates your forgings, CNC turning, investment castings, sheet metal stamping, and additive metal prints.",
    },
    {
        number: "02",
        title: "15+ Vetted Partner Facilities",
        desc: "Each facility is audited for machine capability, toolroom maintenance, and metrology before joining the network — all held to our single quality standard.",
    },
    {
        number: "03",
        title: "Direct Technical Access",
        desc: "You collaborate directly with manufacturing engineers who understand your tolerances and blueprints — no faceless call centers or lost-in-translation handoffs.",
    },
    {
        number: "04",
        title: "Based in Focal Point, Ludhiana",
        desc: "Rooted in one of India's premier metallurgical engineering districts with direct access to certified raw steel stock, serving OEM customers worldwide.",
    },
];

const values = [
    {
        number: "01",
        title: "Quality First",
        description:
            "Every partner facility in our network is vetted and held to the same inspection and quality standards, order after order.",
    },
    {
        number: "02",
        title: "Direct Access",
        description:
            "You work directly with people who understand your project — no faceless call centers, no lost-in-translation handoffs.",
    },
    {
        number: "03",
        title: "Speed & Reliability",
        description:
            "A coordinated network of forging, machining and fabrication partners means faster lead times without cutting corners.",
    },
    {
        number: "04",
        title: "Transparency",
        description:
            "Clear communication on cost, timelines and capability limits — so there are no surprises once production starts.",
    },
];

/* ------------------------------------------------------------------ */
/* Bespoke Visual & Architectural Components                          */
/* ------------------------------------------------------------------ */

/** Section mark: hairline rule + mono uppercase label */
function SectionMark({ label, tone = "dark" }: { label: string; tone?: "dark" | "light" }) {
    const textTone = tone === "dark" ? "text-slate-500" : "text-slate-400";
    return (
        <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-orange-500" />
            <span className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${textTone}`}>
                {label}
            </span>
        </div>
    );
}

/** Bespoke Line-Art Schematic: Network Coordination Topology Diagram */
function NetworkCoordinationSchematic() {
    return (
        <div className="relative aspect-[4/3] w-full select-none">
            <svg viewBox="0 0 420 310" className="h-full w-full" aria-hidden="true">
                {/* Subtle blueprint grid line */}
                <line x1="20" y1="260" x2="400" y2="260" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="20" y1="180" x2="400" y2="180" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="20" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="1" />

                {/* Central Hub: Solvoka QA & Engineering Hub */}
                <g transform="translate(210, 150)">
                    {/* Concentric Signal Rings */}
                    <circle cx="0" cy="0" r="85" fill="none" stroke="rgba(249, 115, 22, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="0" cy="0" r="55" fill="none" stroke="rgba(249, 115, 22, 0.2)" strokeWidth="1" />

                    {/* Central Hub Core */}
                    <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#f97316" strokeWidth="1.5" />
                    <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontFamily="JetBrains Mono" fontSize="8" fontWeight="bold">
                        HUB
                    </text>

                    {/* Vector Lines to Partner Nodes */}
                    {/* Node 1: Forging (Top Left) */}
                    <line x1="-16" y1="-16" x2="-95" y2="-75" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="-105" cy="-85" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
                    <text x="-105" y="-82" textAnchor="middle" fill="#0f172a" fontFamily="JetBrains Mono" fontSize="7" fontWeight="bold">FORGE</text>

                    {/* Node 2: CNC Machining (Top Right) */}
                    <line x1="16" y1="-16" x2="95" y2="-75" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="105" cy="-85" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
                    <text x="105" y="-82" textAnchor="middle" fill="#0f172a" fontFamily="JetBrains Mono" fontSize="7" fontWeight="bold">CNC</text>

                    {/* Node 3: Casting (Bottom Left) */}
                    <line x1="-16" y1="16" x2="-95" y2="75" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="-105" cy="85" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
                    <text x="-105" y="88" textAnchor="middle" fill="#0f172a" fontFamily="JetBrains Mono" fontSize="7" fontWeight="bold">CAST</text>

                    {/* Node 4: Sheet Metal (Bottom Right) */}
                    <line x1="16" y1="16" x2="95" y2="75" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
                    <circle cx="105" cy="85" r="14" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
                    <text x="105" y="88" textAnchor="middle" fill="#0f172a" fontFamily="JetBrains Mono" fontSize="7" fontWeight="bold">SHEET</text>

                    {/* Node 5: 3D Printing (Direct Top) */}
                    <line x1="0" y1="-22" x2="0" y2="-85" stroke="#f97316" strokeWidth="1" />
                    <circle cx="0" cy="-98" r="12" fill="#ffffff" stroke="#f97316" strokeWidth="1.2" />
                    <text x="0" y="-95" textAnchor="middle" fill="#f97316" fontFamily="JetBrains Mono" fontSize="7" fontWeight="bold">3D</text>
                </g>

                {/* Technical Annotation Labels */}
                <text x="24" y="32" fill="#f97316" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.15em">
                    TOPOLOGY // COORDINATED MANUFACTURING NETWORK
                </text>
                <text x="280" y="32" fill="#64748b" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.1em">
                    15+ AUDITED SITES
                </text>
                <text x="120" y="285" fill="#64748b" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.1em">
                    CENTRALIZED DFM &amp; METROLOGY GOVERNANCE
                </text>
            </svg>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function AboutUsPage() {
    return (
        <main className="w-full bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
            {/* ========================================================== */}
            {/* 1. HERO — Cinematic, ghost typography, no card containers  */}
            {/* ========================================================== */}
            <section className="relative flex min-h-[580px] items-center overflow-hidden bg-slate-950 pb-20 pt-28 lg:min-h-[640px] lg:pb-24 lg:pt-32">
                {/* Background image overlay with dark gradient */}
                <img
                    src="/Network-Image.webp"
                    alt="Solvoka precision manufacturing network"
                    className="absolute inset-0 h-full w-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/90 to-slate-950/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                {/* Giant Ghost-Stroke Typographic Layer — like 3D printing page */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-display text-[220px] font-bold leading-none lg:block lg:text-[320px]"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)", color: "transparent" }}
                >
                    15+
                </span>

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-16">
                    {/* Clean navigation breadcrumb */}
                    <div className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Link to="/" className="transition hover:text-orange-400">
                            Home
                        </Link>
                        <ChevronRight className="h-3 w-3 text-slate-500" />
                        <span className="font-semibold text-slate-200">About Solvoka</span>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
                        <div>
                            <SectionMark label="About Solvoka" tone="light" />

                            <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl text-white">
                                Precision Manufacturing, <br />
                                <span className="text-orange-500">A Proven Network</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                                Solvoka operates from Focal Point, Ludhiana — one of Punjab&rsquo;s established
                                forging and machining districts — coordinating a network of 15+ vetted partner
                                facilities under a single quality standard, so automotive OEMs and exporters
                                get one point of contact for forging, CNC machining, casting, sheet metal
                                fabrication and 3D printing.
                            </p>

                            {/* Minimal hairline stats strip — no card containers or round badges */}
                            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                                {stats.map((st) => (
                                    <div key={st.label}>
                                        <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                            {st.label}
                                        </span>
                                        <span className="mt-1 block font-display text-base font-bold text-white">
                                            {st.value}
                                        </span>
                                        <span className="mt-0.5 block text-xs text-slate-400">
                                            {st.sub}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <Link
                                    to="/contact-us"
                                    className="inline-flex items-center gap-2.5 bg-orange-500 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-400 shadow-lg shadow-orange-950/40"
                                >
                                    <span>Talk to Us</span>
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                                </Link>
                                <Link
                                    to="/#capabilities"
                                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-sm font-semibold text-slate-300 transition-colors hover:border-white/40 hover:text-white"
                                >
                                    View Capabilities
                                </Link>
                            </div>
                        </div>

                        {/* Right side focal point callout — like 3D printing page */}
                        <div className="hidden flex-col items-end justify-between gap-10 lg:flex">
                            <div className="flex flex-col items-end gap-3 self-end">
                                <div className="flex items-center gap-3">
                                    <div className="h-24 w-px bg-white/20" />
                                    <div className="text-right font-mono text-xs font-medium uppercase leading-relaxed tracking-[0.2em] text-slate-300">
                                        Single
                                        <br />
                                        Point Of
                                        <br />
                                        Contact
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Focal Point</p>
                                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                                    Ludhiana, Punjab, India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 2. THE SOLVOKA MODEL — Open asymmetric split with line-art */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-center">
                        <div>
                            <SectionMark label="Our Story" />
                            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                One Point of Contact for a Network Built on Industrial Trust
                            </h2>

                            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600">
                                Instead of building a single, capital-heavy factory, Solvoka coordinates a
                                curated network of specialized forging, machining, casting and fabrication
                                partners across Punjab&rsquo;s industrial belt. Each facility is vetted for
                                process capability, equipment and quality systems before it joins the
                                network — and every order is managed under one standard, one timeline and
                                one point of contact.
                            </p>

                            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
                                That means customers get the flexibility of a broad manufacturing base with
                                the accountability of working with a single, dedicated team.
                            </p>

                            {/* Milestone flow ribbon */}
                            <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3 border-t border-slate-200 pt-6 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                {["Single Contact", "15+ Vetted Sites", "Unified Metrology", "Global Export"].map((step, i) => (
                                    <span key={step} className="flex items-center gap-2">
                                        <span className={i === 0 ? "text-slate-900 font-bold" : ""}>{step}</span>
                                        {i < 3 && (
                                            <ArrowRight className="h-3 w-3 text-orange-400" strokeWidth={2.5} />
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <NetworkCoordinationSchematic />
                            <div className="mt-8 border-t border-slate-200 pt-6">
                                <p className="font-display text-xl font-bold leading-snug text-slate-900">
                                    Local industrial roots.
                                    <br />
                                    <span className="text-orange-500">Global export precision.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 3. WHY TEAMS CHOOSE SOLVOKA — Open Ledger Row List         */}
            {/* Replaces the dark rounded container box with open ledger   */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-[#FAF9F7] border-y border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="max-w-2xl">
                        <SectionMark label="The Solvoka Advantage" />
                        <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                            Why Teams Choose Solvoka
                        </h2>
                        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                            A coordination model designed to remove supplier fragmentation, communication
                            delays, and quality variability from your manufacturing procurement.
                        </p>
                    </div>

                    <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
                        {whyChooseSolvoka.map((item) => (
                            <div
                                key={item.number}
                                className="group py-8 transition-colors hover:bg-white/60"
                            >
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-baseline lg:gap-10">
                                    <div className="lg:col-span-2 flex items-baseline gap-3">
                                        <span className="font-mono text-xs font-bold text-orange-600 tabular">
                                            {item.number}
                                        </span>
                                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            ADVANTAGE
                                        </span>
                                    </div>

                                    <div className="lg:col-span-4">
                                        <h3 className="font-display text-xl font-bold text-slate-900">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="lg:col-span-6 text-sm leading-relaxed text-slate-600">
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 4. WHAT WE STAND FOR — Open values ledger, NO 2x2 cards    */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="max-w-2xl">
                        <SectionMark label="What We Stand For" />
                        <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Our Core Operating Values
                        </h2>
                        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                            The non-negotiable principles that govern how we interact with our customers,
                            vet our partners, and audit each production run.
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:gap-16">
                        {values.map((val) => (
                            <div key={val.title} className="relative border-t border-slate-200 pt-8">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs font-bold text-orange-600 tabular">
                                        {val.number}
                                    </span>
                                    <span className="h-px w-6 bg-orange-300" />
                                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                        PRINCIPLE
                                    </span>
                                </div>

                                <h3 className="mt-4 font-display text-2xl font-bold text-slate-900">
                                    {val.title}
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                    {val.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 5. READY TO BUILD — High-End Dark Industrial CTA           */}
            {/* ========================================================== */}
            <section className="bg-slate-950 py-20 lg:py-28 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                        <div>
                            <SectionMark label="Ready to Start" tone="light" />
                            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                Ready to build what&rsquo;s next?
                            </h2>
                            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-400">
                                Share your requirements and get a response from our engineering team —
                                from single prototypes to high-volume production series.
                            </p>

                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <Link
                                    to="/contact-us"
                                    className="inline-flex items-center gap-2.5 bg-orange-500 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-400 shadow-lg shadow-orange-950/40"
                                >
                                    <span>Contact Us</span>
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                                </Link>
                                <Link
                                    to="/#capabilities"
                                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-sm font-semibold text-slate-300 transition-colors hover:border-white/40 hover:text-white"
                                >
                                    View Capabilities
                                </Link>
                            </div>
                        </div>

                        {/* Focal Point regional footprint note with clean hairlines */}
                        <div className="border-t border-slate-800 pt-8 lg:border-t-0 lg:border-l lg:border-slate-800 lg:pl-12 lg:pt-0">
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                MANUFACTURING HUB
                            </span>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                                    <div>
                                        <p className="font-display text-sm font-bold text-white">Focal Point Industrial District</p>
                                        <p className="text-xs text-slate-400">Ludhiana, Punjab, India</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                                    <div>
                                        <p className="font-display text-sm font-bold text-white">Full Process Coverage</p>
                                        <p className="text-xs text-slate-400">Forging, CNC, Casting, Sheet Metal, 3D Metal Additive</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" />
                                    <div>
                                        <p className="font-display text-sm font-bold text-white">Worldwide Sea &amp; Air Freight</p>
                                        <p className="text-xs text-slate-400">Export crating per ISPM-15 with VCI barrier preservation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
