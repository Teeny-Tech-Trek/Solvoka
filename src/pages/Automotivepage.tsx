import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Cog,
    Box,
    ArrowRight,
    ChevronRight,
    Check,
    Zap,
    Lock,
    Users,
    Activity,
    Compass,
    Microscope,
    FileCheck2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data Structures & Content (Preserved & Enriched)                   */
/* ------------------------------------------------------------------ */

interface BuildCategory {
    id: string;
    icon: React.ElementType;
    title: string;
    processBadge: string;
    subtitle: string;
    items: string[];
    metallurgy: string;
    tolerances: string;
    typicalApplications: string;
}

const buildCategories: BuildCategory[] = [
    {
        id: "forged",
        icon: ShieldCheck,
        title: "Forged Powertrain & Chassis",
        processBadge: "Closed-Die & Upset Forging",
        subtitle: "Continuous directional grain flow for high-fatigue dynamic cyclic loads",
        items: [
            "Axle components & stub axles",
            "Heavy-duty chassis brackets",
            "Connecting rods & crankshaft blanks",
            "Transmission gear blanks",
            "Suspension control arms & rocker links",
        ],
        metallurgy: "20MnCr5, EN8D, EN9, 42CrMo4, SAE 1045",
        tolerances: "As-forged DIN 7526 / Machined ± 0.010 mm",
        typicalApplications: "Commercial vehicles, passenger EV drivetrain, tractors & heavy earthmovers",
    },
    {
        id: "cnc",
        icon: Cog,
        title: "CNC Precision Machined",
        processBadge: "Multi-Axis CNC Turning & Milling",
        subtitle: "High-speed precision machining for critical mating interfaces and hydraulic seals",
        items: [
            "Drive shafts & splined input shafts",
            "Hardened bronze & steel bushings",
            "Engineered high-tensile threaded fasteners",
            "Transmission & differential housings",
            "Steering knuckles & tie rod ball housings",
        ],
        metallurgy: "High-tensile alloy steel, SS304/316L, 6061-T6 Aluminum, SAE 660 Bronze",
        tolerances: "Cylindricity & Runout < 0.005 mm (5 µm)",
        typicalApplications: "Precision steering racks, automotive transmissions, braking calipers",
    },
    {
        id: "cast",
        icon: Box,
        title: "Engineered Casting",
        processBadge: "High-Density Investment & Sand Casting",
        subtitle: "Near-net-shape structural castings with verified radiographic internal soundess",
        items: [
            "Engine & transmission mounting brackets",
            "Filter & pump housings",
            "Exhaust manifold & turbocharger flanges",
            "Differential carrier cases",
            "Suspension structural spring perches",
        ],
        metallurgy: "Ductile Iron (SG Iron 400/18, 500/7), CF8M Stainless, A356-T6 Aluminum",
        tolerances: "ISO 8062-CT6 to CT8",
        typicalApplications: "Engine mounts, turbo housings, commercial braking assemblies",
    },
];

const automotiveAudits = [
    {
        icon: Microscope,
        label: "METALLURGICAL TESTING",
        title: "3.1 Mill Test Certification",
        desc: "100% optical emission spectrometer chemical heat verification and microscopic grain size evaluation per ASTM E112 before any billet is sheared.",
    },
    {
        icon: Activity,
        label: "PROCESS CAPABILITY",
        title: "Cpk ≥ 1.67 Statistical Control",
        desc: "Controlled SPC data charts on critical-to-quality (CTQ) dimensions. Zero-defect philosophy with gauge R&R repeatability studies under 10%.",
    },
    {
        icon: FileCheck2,
        label: "PRODUCTION SUBMISSION",
        title: "PPAP Level 1 to 5 Packages",
        desc: "Comprehensive documentation including Design & Process FMEA, Control Plans, PSW warrants, and full IMDS material reporting.",
    },
    {
        icon: Compass,
        label: "DIMENSIONAL VERIFICATION",
        title: "Zeiss & Mitutoyo CNC CMM",
        desc: "Automated 3D coordinate measuring with CAD model overlay, surface profile tolerance verification, and sub-micron laser surface roughness testing.",
    },
];

const rfqFeatures = [
    {
        icon: <Zap className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "Fast Response",
        subtitle: "Typically within 24 hours",
    },
    {
        icon: <Lock className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "Confidential",
        subtitle: "Your proprietary CAD and IP are safe with us",
    },
    {
        icon: <Users className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "Expert Support",
        subtitle: "Direct technical alignment with automotive manufacturing engineers",
    },
];

/* ------------------------------------------------------------------ */
/* Bespoke Visual & Architectural Components                          */
/* ------------------------------------------------------------------ */

/** Clean editorial running-head device */
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

/** Bespoke SVG Engineering Drawing of an Automotive Steering Spindle / Knuckle Assembly */
export function AutomotiveEngineeringSchematic() {
    return (
        <div className="relative aspect-[4/3] w-full max-w-lg select-none">
            <svg viewBox="0 0 440 330" className="h-full w-full" aria-hidden="true">
                <defs>
                    <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.75" />
                    </pattern>
                </defs>

                {/* Drafting Blueprint Grid */}
                <rect width="440" height="330" fill="url(#cad-grid)" />

                {/* Component Schematics: Steering Knuckle & Stub Spindle Profile */}
                <g transform="translate(110, 45)">
                    {/* Central Bearing Spindle Section */}
                    <path
                        d="M 40 80 L 160 80 L 160 65 L 190 65 L 190 145 L 160 145 L 160 130 L 40 130 Z"
                        fill="rgba(249, 115, 22, 0.06)"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth="1.4"
                    />

                    {/* Stepped Diameters */}
                    <line x1="100" y1="80" x2="100" y2="130" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="140" y1="80" x2="140" y2="130" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Threaded Spindle Tip */}
                    <rect x="190" y="75" width="24" height="60" fill="none" stroke="#f97316" strokeWidth="1.2" strokeDasharray="2 3" />

                    {/* Center axis line */}
                    <line x1="10" y1="105" x2="230" y2="105" stroke="#f97316" strokeWidth="0.8" strokeDasharray="8 3 2 3" />

                    {/* Knuckle Caliper Mount Arm */}
                    <path
                        d="M 40 80 L 20 40 L -20 40 L -30 65 L -10 90 L 40 95 Z"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth="1.2"
                    />
                    <circle cx="-10" cy="52" r="5.5" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
                    <circle cx="-10" cy="52" r="1.5" fill="#38bdf8" />

                    {/* Lower Ball Joint Boss */}
                    <path
                        d="M 40 130 L 10 180 L -15 180 L -25 155 L -10 130 L 40 120 Z"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.4)"
                        strokeWidth="1.2"
                    />
                    <circle cx="-5" cy="165" r="6" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
                    <circle cx="-5" cy="165" r="1.5" fill="#38bdf8" />

                    {/* GD&T Datum Target Flags */}
                    <rect x="155" y="160" width="22" height="18" fill="#0f172a" stroke="#f97316" strokeWidth="1" />
                    <text x="162" y="173" fill="#f97316" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">A</text>
                    <line x1="166" y1="145" x2="166" y2="160" stroke="#f97316" strokeWidth="1" />

                    {/* Dimension lines */}
                    <line x1="40" y1="205" x2="190" y2="205" stroke="#f97316" strokeWidth="1" />
                    <line x1="40" y1="198" x2="40" y2="212" stroke="#f97316" strokeWidth="1" />
                    <line x1="190" y1="198" x2="190" y2="212" stroke="#f97316" strokeWidth="1" />

                    <text x="80" y="222" fill="#f97316" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.05em">
                        150.00 ± 0.015
                    </text>
                </g>

                {/* Technical Annotation Headers */}
                <text x="24" y="32" fill="#f97316" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.15em">
                    DWG: SK-4402 // AUTO STEERING KNUCKLE
                </text>
                <text x="24" y="305" fill="rgba(255,255,255,0.45)" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.1em">
                    MATERIAL: 20MnCr5 FORGED // CASE HARDENED 58-62 HRC
                </text>
                <text x="320" y="32" fill="#38bdf8" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.1em">
                    Cpk ≥ 1.67 CONFIRMED
                </text>
            </svg>
        </div>
    );
}

const vehiclePrograms = [
    {
        label: "Agricultural equipment",
        title: "Tractor Parts",
        image: "/images/Automotive/TractorGif.gif",
        description: "Driveline, chassis, hitch, and hydraulic components engineered for field-duty loads.",
        accent: "bg-emerald-400",
    },
    {
        label: "Passenger & commercial vehicles",
        title: "Car Parts",
        image: "/images/Automotive/CarGif.gif",
        description: "Production-ready powertrain, steering, braking, and structural components for road vehicles.",
        accent: "bg-orange-400",
    },
];

/* ------------------------------------------------------------------ */
/* Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function AutomotivePage() {
    const [activeTab, setActiveTab] = useState<string>("all");

    const filteredCategories = activeTab === "all"
        ? buildCategories
        : buildCategories.filter((c) => c.id === activeTab);

    return (
        <main className="w-full bg-[#FAF9F7] text-slate-900 selection:bg-orange-500 selection:text-white">
            {/* ========================================================== */}
            {/* 1. HERO SECTION — High-End Industrial Automotive Open      */}
            {/* ========================================================== */}
            <section className="relative overflow-hidden bg-slate-950 pt-28 pb-20 lg:pt-36 lg:pb-28 text-white border-b border-slate-800">
                {/* Subtle drafting grid */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Subtle radial ambient atmosphere */}
                <div
                    aria-hidden="true"
                    className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-orange-600/10 blur-[120px] pointer-events-none"
                />
                <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none"
                />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16 w-full">
                    {/* Clean navigation breadcrumbs */}
                    <div className="mb-8 flex items-center gap-2 font-mono text-[11px] text-slate-400">
                        <Link to="/" className="transition-colors hover:text-orange-400">
                            HOME
                        </Link>
                        <ChevronRight className="h-3 w-3 text-slate-600" />
                        <span className="text-orange-500 font-semibold tracking-wider">
                            AUTOMOTIVE OEM &amp; TIER-1
                        </span>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Hero Text Column */}
                        <div className="lg:col-span-7">
                            <SectionMark label="TIER-1 &amp; OEM MANUFACTURING EXCELLENCE" tone="light" />

                            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
                                Automotive Engineering, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-white">
                                    Proven In Production.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-slate-300 sm:text-lg">
                                Forged, precision-machined, and cast metal assemblies manufactured
                                specifically for automotive OEMs, Tier-1 suppliers, and global export channels.
                                Every production run is backed by PPAP documentation, continuous heat lot
                                traceability, and statistical process stability.
                            </p>

                            {/* Automotive Quality Pillars Ribbon */}
                            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-3 sm:gap-6">
                                <div>
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        STATISTICAL CAPABILITY
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-white tabular">
                                        Cpk ≥ 1.67
                                    </span>
                                    <span className="text-[11px] text-slate-400">Critical dimensions</span>
                                </div>
                                <div>
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        PPAP READINESS
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-orange-400 tabular">
                                        Level 1 — 5
                                    </span>
                                    <span className="text-[11px] text-slate-400">Full PSW &amp; Control Plan</span>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        TRACEABILITY
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-white tabular">
                                        100% Heat Lot
                                    </span>
                                    <span className="text-[11px] text-slate-400">Spectro MTR reports</span>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle program gallery */}
                        <div className="lg:col-span-5">
                            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-sm sm:p-4">
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                    {vehiclePrograms.map((program) => (
                                        <article
                                            key={program.title}
                                            className="group relative min-h-52 overflow-hidden rounded-xl border border-slate-700 bg-slate-950"
                                        >
                                            <img
                                                src={program.image}
                                                alt={`${program.title} manufacturing program`}
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                                            <div className="absolute inset-x-0 bottom-0 p-4">
                                                <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                                                    <span className={`h-1.5 w-1.5 rounded-full ${program.accent}`} />
                                                    {program.label}
                                                </span>
                                                <h2 className="mt-1 font-display text-xl font-bold text-white">
                                                    {program.title}
                                                </h2>
                                                <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-300">
                                                    {program.description}
                                                </p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                                <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] font-mono text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                                        Dedicated Vehicle Programs
                                    </span>
                                    <span className="text-orange-400">IATF-Compliant Quality</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 2. THE EDITORIAL ARGUMENT: Why Automotive, Specifically    */}
            {/* Thoughtful typography, raw steel accents, zero generic box */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
                        <div className="lg:col-span-5">
                            <SectionMark label="THE PROVEN SECTOR" />
                            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[40px] leading-[1.12]">
                                The One Industry We Can Stand Behind Without Qualification.
                            </h2>

                            <div className="mt-8 border-l-2 border-orange-500 pl-4">
                                <p className="font-mono text-xs font-semibold text-slate-800 uppercase tracking-wider">
                                    NO GENERAL-PURPOSE RETROFITTING
                                </p>
                                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                                    Automotive manufacturing cannot tolerate the variable tolerances of job-shop machining.
                                    Our tooling, calibration frequencies, and material custody were engineered around automotive
                                    specifications from day one.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-6 text-slate-600 font-sans leading-relaxed text-base">
                            <p>
                                Solvoka supplies established automotive OEMs, Tier-1 system assemblers, and global
                                component exporters. When we say automotive, we do not mean sporadic one-off brackets.
                                We mean <strong className="text-slate-900 font-semibold">multi-cavity closed-die forging</strong>,
                                <strong className="text-slate-900 font-semibold"> synchronized multi-axis CNC cells</strong>, and
                                <strong className="text-slate-900 font-semibold"> high-integrity ductile casting</strong> calibrated
                                to the rigorous zero-defect PPM benchmarks demanded by vehicle assembly plants.
                            </p>

                            <p>
                                Every component we ship travels with an uncompromised documentation trail: from optical
                                spectrometer verification of the raw ingot's chemical composition, through ultrasonic
                                subsurface crack detection, to final multi-point Zeiss CMM coordinate inspection.
                            </p>

                            {/* Key Highlights Ledger */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-6">
                                <div className="flex items-start gap-3">
                                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md bg-orange-50 text-orange-600 font-mono text-xs font-bold">
                                        01
                                    </span>
                                    <div>
                                        <h3 className="font-display text-sm font-bold text-slate-900">
                                            Export-Ready Preservation
                                        </h3>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            VCI anti-corrosion barrier wrapping &amp; fumigated ISPM-15 wooden crating for sea freight.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md bg-orange-50 text-orange-600 font-mono text-xs font-bold">
                                        02
                                    </span>
                                    <div>
                                        <h3 className="font-display text-sm font-bold text-slate-900">
                                            Scheduled Line Deliveries
                                        </h3>
                                        <p className="mt-0.5 text-xs text-slate-500">
                                            Kanban &amp; buffer stock management to support Just-In-Time (JIT) assembly line schedules.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 3. WHAT WE BUILD: Asymmetric Engineering Ledger            */}
            {/* Replaces generic 3-box card grid with deep process breakdown */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-[#FAF9F7]">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <SectionMark label="COMPONENT CLUSTERS" />
                            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                What We Build for Automotive Systems
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                                Representative production components classified by metallurgical manufacturing process.
                            </p>
                        </div>

                        {/* Interactive Filter Pills */}
                        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
                            <button
                                type="button"
                                onClick={() => setActiveTab("all")}
                                className={`rounded-lg px-4 py-2 font-mono text-xs font-semibold tracking-wide transition-all ${
                                    activeTab === "all"
                                        ? "bg-slate-900 text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                All Components
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("forged")}
                                className={`rounded-lg px-4 py-2 font-mono text-xs font-semibold tracking-wide transition-all ${
                                    activeTab === "forged"
                                        ? "bg-orange-600 text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                Forged
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("cnc")}
                                className={`rounded-lg px-4 py-2 font-mono text-xs font-semibold tracking-wide transition-all ${
                                    activeTab === "cnc"
                                        ? "bg-orange-600 text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                CNC Machined
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("cast")}
                                className={`rounded-lg px-4 py-2 font-mono text-xs font-semibold tracking-wide transition-all ${
                                    activeTab === "cast"
                                        ? "bg-orange-600 text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                Cast
                            </button>
                        </div>
                    </div>

                    {/* Open Engineering Ledger (Fluid, Layered, No Repetitive Box Grids) */}
                    <div className="mt-12 space-y-8">
                        {filteredCategories.map((cat, idx) => {
                            const IconComp = cat.icon;
                            return (
                                <div
                                    key={cat.id}
                                    className="group relative rounded-2xl border border-slate-200/90 bg-white p-8 transition-all duration-300 hover:border-slate-300 hover:shadow-xl"
                                >
                                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
                                        {/* Column 1: Process Profile */}
                                        <div className="lg:col-span-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-xs font-bold text-orange-600 tabular">
                                                    0{idx + 1}
                                                </span>
                                                <span className="h-px w-6 bg-orange-300" />
                                                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-700">
                                                    {cat.processBadge}
                                                </span>
                                            </div>

                                            <div className="mt-3 flex items-center gap-3">
                                                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-200/60">
                                                    <IconComp className="h-5 w-5" strokeWidth={1.8} />
                                                </span>
                                                <h3 className="font-display text-2xl font-bold text-slate-900">
                                                    {cat.title}
                                                </h3>
                                            </div>

                                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                                {cat.subtitle}
                                            </p>

                                            <div className="mt-6 border-t border-slate-100 pt-4 text-xs">
                                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                    PRIMARY APPLICATIONS
                                                </span>
                                                <p className="mt-1 text-slate-700 font-medium">
                                                    {cat.typicalApplications}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Column 2: Specific Components List */}
                                        <div className="lg:col-span-5 border-t border-slate-100 pt-6 lg:border-t-0 lg:border-l lg:border-slate-200 lg:pl-8 lg:pt-0">
                                            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                CONFIRMED PRODUCTION PARTS
                                            </span>

                                            <ul className="mt-4 space-y-3">
                                                {cat.items.map((item) => (
                                                    <li key={item} className="flex items-start gap-3">
                                                        <span className="mt-1 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-orange-50 text-orange-600">
                                                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                                                        </span>
                                                        <span className="text-sm font-medium text-slate-800">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Column 3: Metallurgy & Tight Tolerances */}
                                        <div className="lg:col-span-3 border-t border-slate-100 pt-6 lg:border-t-0 lg:border-l lg:border-slate-200 lg:pl-8 lg:pt-0">
                                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                ENGINEERING METRICS
                                            </span>

                                            <div className="mt-4 space-y-4">
                                                <div>
                                                    <span className="block text-[11px] text-slate-500 font-medium">
                                                        Standard Automotive Alloys
                                                    </span>
                                                    <span className="mt-0.5 block font-mono text-xs font-semibold text-slate-900">
                                                        {cat.metallurgy}
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="block text-[11px] text-slate-500 font-medium">
                                                        Attainable Tolerances
                                                    </span>
                                                    <span className="mt-0.5 block font-mono text-xs font-semibold text-orange-600 tabular">
                                                        {cat.tolerances}
                                                    </span>
                                                </div>

                                                <div className="pt-2">
                                                    <Link
                                                        to="/request-a-quote"
                                                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-slate-900 transition-colors group-hover:text-orange-600"
                                                    >
                                                        <span>Quote This Process</span>
                                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 4. WHAT AUTOMOTIVE BUYERS GET: Traceability & Metrology    */}
            {/* Deep technical assurance matrix replacing the 1-line card  */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(90deg, #ffffff 1px, transparent 0), linear-gradient(180deg, #ffffff 1px, transparent 0)`,
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="max-w-3xl">
                        <SectionMark label="IATF-COMPLIANT TRACEABILITY" tone="light" />
                        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                            End-to-End Traceability from Ingot to Finished Part
                        </h2>
                        <p className="mt-4 font-sans text-base text-slate-300 leading-relaxed">
                            Automotive procurement requires bulletproof assurance. We eliminate risk with continuous
                            digital custody, laser part marking, and rigorous metallurgical laboratory verification.
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {automotiveAudits.map((audit, idx) => {
                            const IconComponent = audit.icon;
                            return (
                                <div
                                    key={audit.title}
                                    className="relative flex flex-col justify-between border-t border-slate-800 pt-6"
                                >
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-xs font-bold text-orange-400">
                                                0{idx + 1}
                                            </span>
                                            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                                                {audit.label}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex items-center gap-3">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-orange-400 ring-1 ring-slate-700">
                                                <IconComponent className="h-4 w-4" strokeWidth={2} />
                                            </span>
                                            <h3 className="font-display text-base font-bold text-white leading-snug">
                                                {audit.title}
                                            </h3>
                                        </div>

                                        <p className="mt-3 font-sans text-xs leading-relaxed text-slate-400">
                                            {audit.desc}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex items-center gap-2 border-t border-slate-800/80 pt-3 font-mono text-[10px] text-slate-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        <span>Full Audit Trail Archived 10 Yrs</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 5. RFQ & AUTOMOTIVE QUOTE CONSOLE                         */}
            {/* Preserves /request-a-quote link & automotive pre-selection */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-[#FAF9F7]">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-950 px-8 py-12 text-white shadow-2xl lg:px-16 lg:py-16">
                        {/* Top drafting hairline ruler accent */}
                        <div
                            aria-hidden="true"
                            className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600"
                        />

                        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                            <div className="lg:col-span-7">
                                <div className="flex items-center gap-2.5">
                                    <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-400">
                                        AUTOMOTIVE RFQ CONSOLE
                                    </span>
                                </div>

                                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
                                    Ready to Onboard a Reliable Tier Supplier?
                                </h2>

                                <p className="mt-4 font-sans text-base leading-relaxed text-slate-300">
                                    Share your component drawing, target annual volume, and required PPAP level.
                                    Our automotive engineering desk provides a comprehensive DFM and tooling feasibility
                                    quotation within 24 hours.
                                </p>

                                <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                                    <Link
                                        to="/request-a-quote"
                                        className="inline-flex items-center justify-center gap-3 rounded-lg bg-orange-600 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-950/50 transition-all duration-200 hover:bg-orange-500 hover:shadow-orange-700/40"
                                    >
                                        <span>Request Automotive Quote</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <span className="font-mono text-xs text-slate-400">
                                        Process pre-selected: <strong className="text-orange-400">Automotive</strong>
                                    </span>
                                </div>
                            </div>

                            <div className="lg:col-span-5 border-t border-slate-800 pt-8 lg:border-t-0 lg:border-l lg:border-slate-800 lg:pl-10 lg:pt-0">
                                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                    SUPPLIER COMMITMENTS
                                </span>
                                <div className="mt-6 space-y-5">
                                    {rfqFeatures.map((feat) => (
                                        <div key={feat.title} className="flex items-start gap-4">
                                            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-900 ring-1 ring-slate-800 text-orange-400">
                                                {feat.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-display text-sm font-bold text-white">
                                                    {feat.title}
                                                </h3>
                                                <p className="mt-0.5 text-xs text-slate-400">
                                                    {feat.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
