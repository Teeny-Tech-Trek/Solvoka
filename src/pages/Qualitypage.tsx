import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    ChevronRight,
    Check,
    ShieldCheck,
    Lock,
    Zap,
    Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data (Preserving original copy and expanding technical richness)   */
/* ------------------------------------------------------------------ */

interface GateRow {
    number: string;
    stageCode: string;
    title: string;
    tagline: string;
    description: string;
    protocol: string[];
    instrument: string;
    lockRule: string;
}

const gates: GateRow[] = [
    {
        number: "01",
        stageCode: "GATE 01 // RECEIVING QUARANTINE",
        title: "Material Isolation & MTR Verification",
        tagline: "Zero unverified raw stock enters cutting or forging lines.",
        description:
            "Every batch of raw stock is isolated on arrival and held until its chemical composition is verified against the original Mill Test Report — before production starts. Ingot heats that fail spectrometer optical chemistry or show surface inclusion marks are immediately quarantined and rejected.",
        protocol: [
            "Optical emission spectrometer chemical composition testing",
            "Heat number matching directly against 3.1 mill certificate",
            "Ultrasonic sub-surface flaw & inclusion screening",
            "Grain size verification per ASTM E112",
        ],
        instrument: "Optical Emission Spectrometer, Ultrasonic Flaw Detector",
        lockRule: "Physical quarantine hold until QA sign-off ticket issued",
    },
    {
        number: "02",
        stageCode: "GATE 02 // FIRST-ARTICLE & IN-PROCESS AUDIT",
        title: "First-Article Validation & In-Process Audit Clamps",
        tagline: "Hourly dimension checks to isolate tool wear and thermal drift.",
        description:
            "Before launching a medium or high-volume production run, the initial piece off the forging die or CNC turning line is completely isolated and dimensionally checked against the client's STEP/IGES blueprints. Machinists execute manual caliper and gauge checks at fixed hourly intervals throughout the shift to isolate tool wear or machine thermal drift immediately.",
        protocol: [
            "Complete 3D coordinate CMM dimensional inspection against native STEP CAD",
            "Calibrated Go / No-Go plug and ring gauge verification",
            "Hourly shift check logged to digital SPC control chart",
            "Surface roughness profilometer trace (Ra ≤ 0.8 µm)",
        ],
        instrument: "Zeiss CNC CMM, Mitutoyo Digital Micrometers, Surface Roughness Tester",
        lockRule: "Automatic CNC spindle pause if Cpk drops below 1.33 benchmark",
    },
    {
        number: "03",
        stageCode: "GATE 03 // DISPATCH PRESERVATION & PACKAGING",
        title: "Pre-Export Environmental Protection & Crating",
        tagline: "Zero transit degradation across global maritime container freight.",
        description:
            "Components destined for international maritime freight or long-term warehouse storage undergo a final clean-and-inspect protocol. Finished forgings are treated with custom rust-preventative compounds, vacuum sealed where necessary, and securely packed in reinforced industrial crates to eliminate shipping-induced degradation.",
        protocol: [
            "Final AQL sampling audit per ISO 2859-1 standards",
            "Multi-season VCI (Vapor Corrosion Inhibitor) barrier dip & desiccant packs",
            "Vacuum-sealed foil wrapping for precision ground interfaces",
            "Reinforced ISPM-15 heat-treated timber crating with steel strapping",
        ],
        instrument: "Coating Thickness Gauge, VCI Barrier Enclosures, Impact Data Recorders",
        lockRule: "Expedition docket sealed with signed QA Certificate of Conformance",
    },
];

/* const metrologyLedger = [
    {
        code: "MET-01",
        tool: "CNC Coordinate Measuring Machine (CMM)",
        precision: "± 0.0015 mm",
        domain: "Full 3D GD&T inspection, concentricity, runout, and surface profile vs. CAD.",
        frequency: "First-article qualification & random batch lot verification",
    },
    {
        code: "MET-02",
        tool: "Optical Profile Projector (100x)",
        precision: "± 0.002 mm",
        domain: "Non-contact contour inspection for thread pitch, chamfers, and root radii.",
        frequency: "Hourly machining shift audit",
    },
    {
        code: "MET-03",
        tool: "Digital Surface Profilometer",
        precision: "Ra 0.01 µm",
        domain: "Roughness measurement for dynamic seal faces and bearing journal finishes.",
        frequency: "100% of critical mating surfaces",
    },
    {
        code: "MET-04",
        tool: "Digital Rockwell & Brinell Hardness Testers",
        precision: "± 0.5 HRC",
        domain: "Through-hardening depth, case-carburizing verification, and core tensile audit.",
        frequency: "Every heat-treatment batch lot",
    },
    {
        code: "MET-05",
        tool: "Ultrasonic Non-Destructive Flaw Detector",
        precision: "ASTM A388 Level 1",
        domain: "Internal void detection, forging cold shuts, and sub-surface porosity.",
        frequency: "100% of structural forged billets",
    },
]; */

const rfqFeatures = [
    {
        icon: <Zap className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "Fast Response",
        subtitle: "Typically within 24 hours",
    },
    {
        icon: <Lock className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "Strict Confidentiality",
        subtitle: "Mutual NDA supported on request",
    },
    {
        icon: <Users className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "Direct Engineering Alignment",
        subtitle: "Direct discussion with QA lead metallurgists",
    },
];

/* ------------------------------------------------------------------ */
/* Bespoke Visual & Architectural Components                          */
/* ------------------------------------------------------------------ */

/** Section kicker: hairline rule + mono label */
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

/** Sticky Gate Index Rail for the three inspection stages — same mechanic as 3D printing page */
function GateRail({
    gatesList,
    activeIndex,
    onSelect,
}: {
    gatesList: GateRow[];
    activeIndex: number;
    onSelect: (index: number) => void;
}) {
    return (
        <div className="sticky top-32 hidden flex-col gap-1 lg:flex">
            {gatesList.map((g, i) => {
                const active = i === activeIndex;
                return (
                    <button
                        key={g.number}
                        type="button"
                        onClick={() => onSelect(i)}
                        aria-current={active}
                        className={`group flex items-baseline gap-3 border-l-2 py-3 pl-4 text-left transition-colors ${active ? "border-orange-500" : "border-transparent hover:border-slate-300"
                            }`}
                    >
                        <span
                            className={`font-mono text-[11px] font-semibold transition-colors ${active ? "text-orange-600" : "text-slate-400 group-hover:text-slate-600"
                                }`}
                        >
                            {g.number}
                        </span>
                        <div className="flex flex-col">
                            <span
                                className={`text-xs font-semibold leading-snug tracking-wide transition-colors ${active ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                                    }`}
                            >
                                Gate {g.number}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                                {i === 0 ? "Receiving" : i === 1 ? "In-Process" : "Dispatch"}
                            </span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

/** Custom GD&T Feature Control & CMM Inspection Drawing — collision-free, fully responsive technical vector */
function MetrologyCMMDrawing() {
    return (
        <div className="relative aspect-[4/3] w-full max-w-lg mx-auto select-none rounded-2xl border border-slate-200/80 bg-[#FAF9F7]/60 p-2 sm:p-4 shadow-xs">
            <svg viewBox="0 0 440 280" className="h-full w-full" aria-hidden="true">
                <defs>
                    {/* Arrowhead marker for CAD leader line */}
                    <marker
                        id="cad-arrow"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                    >
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ea580c" />
                    </marker>
                    {/* Dimension line arrowheads */}
                    <marker
                        id="dim-arrow-start"
                        viewBox="0 0 10 10"
                        refX="2"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto"
                    >
                        <path d="M 8 1.5 L 0 5 L 8 8.5 z" fill="#ea580c" />
                    </marker>
                    <marker
                        id="dim-arrow-end"
                        viewBox="0 0 10 10"
                        refX="6"
                        refY="5"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto"
                    >
                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ea580c" />
                    </marker>
                </defs>

                {/* Subtle Technical Blueprint Grid Lines */}
                <line x1="20" y1="60" x2="420" y2="60" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="20" y1="120" x2="420" y2="120" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="20" y1="180" x2="420" y2="180" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="120" y1="30" x2="120" y2="250" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="220" y1="30" x2="220" y2="250" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="4 4" />
                <line x1="320" y1="30" x2="320" y2="250" stroke="#e2e8f0" strokeWidth="0.8" strokeDasharray="4 4" />

                {/* Technical Annotation Callouts - Top Row */}
                <text x="24" y="26" fill="#ea580c" fontFamily="JetBrains Mono" fontSize="9" fontWeight="bold" letterSpacing="0.12em">
                    CMM PROBE INSPECTION // ZEISS PRISMO
                </text>
                <text x="416" y="26" textAnchor="end" fill="#64748b" fontFamily="JetBrains Mono" fontSize="9" fontWeight="600" letterSpacing="0.08em">
                    REPEATABILITY: 1.5 µm
                </text>

                {/* Center Axis Centerline */}
                <line x1="40" y1="110" x2="400" y2="110" stroke="#ea580c" strokeWidth="0.75" strokeDasharray="8 3 1.5 3" />

                {/* Isometric Machined Bearing Journal Profile */}
                <g>
                    {/* Outer profile */}
                    <path
                        d="M 80,90 L 150,90 L 150,70 L 290,70 L 290,90 L 360,90 L 360,130 L 290,130 L 290,150 L 150,150 L 150,130 L 80,130 Z"
                        fill="#ffffff"
                        stroke="#0f172a"
                        strokeWidth="1.6"
                    />

                    {/* Internal shoulder transition lines */}
                    <line x1="150" y1="90" x2="150" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="290" y1="90" x2="290" y2="130" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Center machined core hatch indication */}
                    <line x1="220" y1="70" x2="220" y2="150" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />

                    {/* CMM Probe Stylus scanning center collar */}
                    <line x1="220" y1="12" x2="220" y2="70" stroke="#ea580c" strokeWidth="2" />
                    <circle cx="220" cy="70" r="4.5" fill="#ea580c" />
                    <circle cx="220" cy="70" r="8.5" fill="none" stroke="#ea580c" strokeWidth="0.8" strokeDasharray="2 2" />
                </g>

                {/* Linear Dimension 160.00 ± 0.005 mm (Cleanly below the shaft, zero collision) */}
                <g>
                    {/* Extension witness lines */}
                    <line x1="80" y1="135" x2="80" y2="185" stroke="#94a3b8" strokeWidth="0.9" />
                    <line x1="360" y1="135" x2="360" y2="185" stroke="#94a3b8" strokeWidth="0.9" />

                    {/* Main dimension line with arrowheads */}
                    <line
                        x1="80"
                        y1="175"
                        x2="360"
                        y2="175"
                        stroke="#ea580c"
                        strokeWidth="1"
                        markerStart="url(#dim-arrow-start)"
                        markerEnd="url(#dim-arrow-end)"
                    />

                    {/* Dimension readout pill */}
                    <rect x="160" y="166" width="120" height="18" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" rx="4" />
                    <text
                        x="220"
                        y="179"
                        textAnchor="middle"
                        fill="#ea580c"
                        fontFamily="JetBrains Mono"
                        fontSize="9.5"
                        fontWeight="bold"
                        letterSpacing="0.04em"
                    >
                        160.00 ± 0.005 mm
                    </text>
                </g>

                {/* GD&T Feature Control Frame (Cleanly placed at bottom-left, zero collision) */}
                <g transform="translate(24, 215)">
                    {/* Background frame box */}
                    <rect x="0" y="0" width="144" height="26" fill="#ffffff" stroke="#0f172a" strokeWidth="1.3" rx="2" />
                    {/* Dividing lines */}
                    <line x1="28" y1="0" x2="28" y2="26" stroke="#0f172a" strokeWidth="1.1" />
                    <line x1="92" y1="0" x2="92" y2="26" stroke="#0f172a" strokeWidth="1.1" />
                    <line x1="118" y1="0" x2="118" y2="26" stroke="#0f172a" strokeWidth="1.1" />

                    {/* Compartment 1: Position Symbol ⌖ */}
                    <circle cx="14" cy="13" r="5.5" fill="none" stroke="#0f172a" strokeWidth="1.2" />
                    <line x1="14" y1="5" x2="14" y2="21" stroke="#0f172a" strokeWidth="1" />
                    <line x1="6" y1="13" x2="22" y2="13" stroke="#0f172a" strokeWidth="1" />

                    {/* Compartment 2: Tolerance with MMC modifier */}
                    <text x="35" y="17" fill="#0f172a" fontFamily="JetBrains Mono" fontSize="9.5" fontWeight="bold">
                        Ø 0.008 M
                    </text>

                    {/* Compartment 3: Primary Datum A */}
                    <text x="101" y="17" fill="#ea580c" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold">
                        A
                    </text>

                    {/* Compartment 4: Secondary Datum B */}
                    <text x="127" y="17" fill="#ea580c" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold">
                        B
                    </text>
                </g>

                {/* Authentic CAD Leader line from Feature Control Frame pointing to journal datum */}
                <path
                    d="M 70,215 L 70,140 L 95,133"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="1.2"
                    markerEnd="url(#cad-arrow)"
                />

                {/* Technical Annotation Callouts - Bottom Right */}
                <text x="416" y="235" textAnchor="end" fill="#64748b" fontFamily="JetBrains Mono" fontSize="8.5" letterSpacing="0.08em">
                    REF. ISO 1101 GD&amp;T SPECIFICATION
                </text>
                <text x="416" y="250" textAnchor="end" fill="#94a3b8" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.06em">
                    100% CMM FIRST-ARTICLE VERIFIED
                </text>
            </svg>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function QualityPage() {
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeGate, setActiveGate] = useState(0);

    // Scroll-spy observer for the 3 gates
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.index);
                        if (!Number.isNaN(idx)) setActiveGate(idx);
                    }
                });
            },
            { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
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
        <main className="w-full bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
            {/* ========================================================== */}
            {/* 1. HERO — Precise replica of reference design              */}
            {/* ========================================================== */}
            <section
                className="relative flex w-full flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat min-h-[680px] sm:min-h-[740px] lg:aspect-[1672/941] lg:min-h-0 pt-20 sm:pt-24 lg:pt-20 xl:pt-24 pb-6 sm:pb-8 lg:pb-10 xl:pb-12"
                style={{ backgroundImage: "url('/images/QualityPage/QualityPage-HeroImage.png')" }}
                aria-label="Quality Control and Production Governance"
            >
                <div className="relative z-10 mx-auto flex w-full max-w-[1560px] flex-1 flex-col justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
                    {/* Top Row: Breadcrumb & Protocol Callout */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Breadcrumbs */}
                        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Link to="/" className="transition-colors hover:text-slate-900">
                                Home
                            </Link>
                            <ChevronRight className="h-3 w-3 text-slate-400" />
                            <span className="font-semibold text-slate-900">Quality Governance</span>
                        </nav>

                        {/* Top Right: Zero Defect Protocol with orange vertical accent */}
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <div className="h-10 sm:h-11 w-[2.5px] bg-[#ff5500]" />
                            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 leading-[1.35]">
                                <div>ZERO</div>
                                <div>DEFECT</div>
                                <div>PROTOCOL</div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Row: Main Editorial Content */}
                    <div className="relative mt-3 sm:mt-5 lg:mt-6 mb-auto pb-4 max-w-2xl lg:max-w-3xl">
                        {/* Pure borderless white blur fade behind text */}
                        <div
                            className="pointer-events-none absolute -inset-x-8 -inset-y-10 z-0 overflow-visible select-none"
                            aria-hidden="true"
                        >
                            <div
                                className="h-full w-full"
                                style={{
                                    background:
                                        "radial-gradient(ellipse 90% 80% at 30% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 45%, rgba(255,255,255,0.2) 75%, transparent 100%)",
                                    filter: "blur(36px)",
                                }}
                            />
                        </div>

                        <div className="relative z-10">
                            {/* Eyebrow Kicker */}
                            <div className="flex items-center gap-3">
                                <span className="h-[2.5px] w-7 bg-[#ff5500]" />
                                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                                    QUALITY CONTROL &amp; METROLOGY
                                </span>
                            </div>

                            {/* Main Title */}
                            <h1 className="mt-4 font-display text-[32px] sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[72px] font-extrabold tracking-tight text-[#0a1128] leading-[1.06] break-words">
                                Quality Control &
                                <span className="block text-[#ff5500]">Production</span>
                                <span className="block text-[#ff5500]">Governance</span>
                            </h1>

                            {/* Subtext description: backdrop blur specifically behind this text only */}
                            <p className="mt-4 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-slate-900 backdrop-blur-md bg-white/40 rounded-xl p-3 sm:p-4 border border-white/30 shadow-xs">
                                Rigid dimensional validation, metallurgical heat isolation, and stage-wise process visibility for international supply chains.
                            </p>

                            {/* The Three Inspection Badges Strip */}
                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-y-0">
                                {/* Metric 1: 3 Mandatory Stages */}
                                <div className="flex items-center gap-3.5 pr-0 sm:pr-7">
                                    <div className="flex h-10 w-10 items-center justify-center text-[#0284c7]">
                                        <svg
                                            className="h-7 w-7"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.9"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                                            <path d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L2 12.5" />
                                            <path d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L2 17.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                                            3
                                        </div>
                                        <div className="mt-1 text-xs font-medium leading-tight text-slate-500">
                                            <div>Mandatory</div>
                                            <div>Stages</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden h-9 w-px bg-slate-200/90 sm:block" />

                                {/* Metric 2: CMM Metrology */}
                                <div className="flex items-center gap-3.5 px-0 sm:px-7">
                                    <div className="flex h-10 w-10 items-center justify-center text-[#0284c7]">
                                        <svg
                                            className="h-7 w-7"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.9"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <circle cx="12" cy="12" r="7.5" />
                                            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
                                            <line x1="12" y1="1.5" x2="12" y2="4.5" />
                                            <line x1="12" y1="19.5" x2="12" y2="22.5" />
                                            <line x1="1.5" y1="12" x2="4.5" y2="12" />
                                            <line x1="19.5" y1="12" x2="22.5" y2="12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-display text-base sm:text-lg font-bold text-slate-900 leading-none">
                                            ± 0.0015 mm
                                        </div>
                                        <div className="mt-1 text-xs font-medium leading-tight text-slate-500">
                                            CMM Metrology
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden h-9 w-px bg-slate-200/90 sm:block" />

                                {/* Metric 3: Heat Traceability */}
                                <div className="flex items-center gap-3.5 pl-0 sm:pl-7">
                                    <div className="flex h-10 w-10 items-center justify-center text-[#0284c7]">
                                        <svg
                                            className="h-7 w-7"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.9"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-display text-base sm:text-lg font-bold text-slate-900 leading-none">
                                            100% 3.1 MTR
                                        </div>
                                        <div className="mt-1 text-xs font-medium leading-tight text-slate-500">
                                            Heat Traceability
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="mt-9 sm:mt-11 flex flex-wrap items-center gap-6 sm:gap-8">
                                {/* <a
                                    href="#inspection-gates"
                                    className="group inline-flex items-center gap-2.5 rounded-lg bg-[#ff5500] px-6 sm:px-7 py-3.5 sm:py-4 font-sans text-sm sm:text-[15px] font-bold text-white shadow-lg shadow-[#ff5500]/30 transition-all hover:bg-[#e04b00] hover:shadow-xl hover:shadow-[#ff5500]/40 active:scale-[0.98]"
                                >
                                    <span>Explore the Three Inspection Gates</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                                </a> */}

                                <a
                                    href="#inspection-gates"
                                    className="group inline-flex flex-col items-start font-sans text-sm sm:text-[15px] font-semibold text-slate-900 transition-colors hover:text-[#ff5500]"
                                >
                                    <span>Learn More</span>
                                    <span className="mt-1.5 h-[3px] w-7 rounded-full bg-[#2563eb] transition-all group-hover:w-full" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Left Tagline & Right Step Counter */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200/40 sm:border-0">
                        {/* Precision Today. Stronger Tomorrow. */}
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-slate-400/80" />
                            <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                                PRECISION TODAY. STRONGER TOMORROW.
                            </span>
                        </div>

                        {/* 01 Counter */}
                        <div className="flex items-center gap-4">
                            <span className="h-px w-10 sm:w-16 bg-slate-300" />
                            <span className="font-display text-xl sm:text-3xl font-light text-slate-400">
                                01
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 2. OUR COMMITMENT — Open editorial split with line-art SVG */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-center">
                        <div>
                            <SectionMark label="Our Commitment" />
                            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                Credibility Built Through Execution, Not Just Badges
                            </h2>

                            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600">
                                At Solvoka, we define quality by absolute drawing compliance,
                                geometric accuracy, and physical batch consistency. We recognize
                                that international exporters demand bulletproof reliability. While
                                we are aggressively expanding our formal administrative framework,
                                our day-to-day workshop floor operates under strict, documented
                                quality gates that ensure no non-conforming part leaves our network.
                            </p>

                            {/* Chronological Milestone ribbon */}
                            <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-3 border-t border-slate-200 pt-6 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                {["Material Isolated", "First-Article CMM", "Hourly In-Process", "Pre-Export VCI"].map((step, i) => (
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
                            <MetrologyCMMDrawing />
                            <div className="mt-8 border-t border-slate-200 pt-6">
                                <p className="font-display text-xl font-bold leading-snug text-slate-900">
                                    Zero concessions.
                                    <br />
                                    <span className="text-orange-500">Zero unverified parts.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 3. THREE-GATE INSPECTION PIPELINE — Sticky Rail + Open Row */}
            {/* ========================================================== */}
            <section id="inspection-gates" className="py-20 lg:py-28 bg-[#FAF9F7] border-y border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <SectionMark label="The Inspection Process" />
                    <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                        Three-Gate Inspection Pipeline
                    </h2>

                    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[176px_minmax(0,1fr)] lg:gap-14">
                        {/* Sticky Rail on Desktop */}
                        <GateRail
                            gatesList={gates}
                            activeIndex={activeGate}
                            onSelect={handleRailSelect}
                        />

                        {/* Mobile Gate Tab Selector (Visible on < lg) */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:hidden no-scrollbar">
                            {gates.map((g, i) => (
                                <button
                                    key={g.number}
                                    type="button"
                                    onClick={() => handleRailSelect(i)}
                                    className={`flex-none rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${activeGate === i
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    Gate {g.number}: {i === 0 ? "Receiving" : i === 1 ? "In-Process" : "Dispatch"}
                                </button>
                            ))}
                        </div>

                        {/* Open Stacked Rows — NO BOXES OR CARDS! */}
                        <div className="space-y-16 lg:space-y-20">
                            {gates.map((gate, i) => (
                                <div
                                    key={gate.number}
                                    data-index={i}
                                    ref={(el) => {
                                        rowRefs.current[i] = el;
                                    }}
                                    className="relative border-b border-slate-200 pb-16 last:border-b-0 last:pb-0 overflow-hidden"
                                >
                                    {/* Large ghost sequence number floating behind */}
                                    <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -top-8 right-0 select-none font-display text-[100px] font-black leading-none text-slate-900/[0.04] lg:text-[140px]"
                                    >
                                        {gate.number}
                                    </span>

                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs font-bold text-orange-600">
                                            {gate.number}
                                        </span>
                                        <span className="h-px w-6 bg-orange-300" />
                                        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                            {gate.stageCode}
                                        </span>
                                    </div>

                                    <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                                        {gate.title}
                                    </h3>

                                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-orange-600 font-mono">
                                        {gate.tagline}
                                    </p>

                                    <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-slate-600">
                                        {gate.description}
                                    </p>

                                    {/* Verification Checklist — clean hairline list */}
                                    <div className="mt-8 border-t border-slate-200 pt-6">
                                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            MANDATORY PHYSICAL AUDIT ITEMS
                                        </span>
                                        <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                                            {gate.protocol.map((item) => (
                                                <li key={item} className="flex items-start gap-2.5">
                                                    <Check className="mt-0.5 h-4 w-4 flex-none text-orange-500" strokeWidth={2.5} />
                                                    <span className="text-sm leading-relaxed text-slate-700 font-medium">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Apparatus and Mandate strip */}
                                    <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-dashed border-slate-200 pt-4 font-mono text-xs">
                                        <div>
                                            <span className="text-slate-400">PRIMARY TOOLING: </span>
                                            <span className="font-semibold text-slate-900">{gate.instrument}</span>
                                        </div>
                                        <div className="text-orange-600 font-semibold">
                                            <span>MANDATE: {gate.lockRule}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 4. WORKSHOP METROLOGY — Open spec ledger table             */}
            {/* ========================================================== */}
            {/* <section className="py-20 lg:py-28 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="max-w-2xl">
                        <SectionMark label="Workshop Metrology" />
                        <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            What We Physically Inspect With
                        </h2>
                        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                            Our workshop floor is equipped with calibrated contact and non-contact metrology
                            tools to ensure sub-millimeter precision on every single shipment.
                        </p>
                    </div> */}

            {/* Open Ledger Table — no cards, clean horizontal dividers */}
            {/* <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
                        {metrologyLedger.map((item) => (
                            <div
                                key={item.code}
                                className="group py-6 transition-colors hover:bg-slate-50/50"
                            >
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-baseline lg:gap-8">
                                    <div className="lg:col-span-2 flex items-baseline gap-3">
                                        <span className="font-mono text-xs font-bold text-orange-600">
                                            {item.code}
                                        </span>
                                        <span className="font-mono text-xs text-slate-400 font-semibold tabular">
                                            {item.precision}
                                        </span>
                                    </div>

                                    <div className="lg:col-span-4">
                                        <h3 className="font-display text-base font-bold text-slate-900">
                                            {item.tool}
                                        </h3>
                                    </div>

                                    <div className="lg:col-span-4 text-xs leading-relaxed text-slate-600">
                                        {item.domain}
                                    </div>

                                    <div className="lg:col-span-2 text-right font-mono text-[11px] text-slate-400">
                                        {item.frequency}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> */}
            {/* </div>
            </section> */}

            {/* ========================================================== */}
            {/* 5. IP SECURITY NOTE — Open editorial guarantee             */}
            {/* ========================================================== */}
            <section className="py-12 bg-[#FAF9F7] border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-orange-500" strokeWidth={2} />
                            <span className="font-display text-sm font-bold text-slate-900">
                                Strict IP Confidentiality · 256-Bit Encrypted · Mutual NDA Supported
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 max-w-lg">
                            Projects requiring a signed Mutual NDA before sharing full manufacturing
                            drawings are supported on request during RFQ.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 6. RFQ CONSOLE — High-end dark industrial conclusion       */}
            {/* ========================================================== */}
            <section className="bg-slate-950 py-20 lg:py-28 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                        <div>
                            <SectionMark label="Ready to Start" tone="light" />
                            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                Get a Quote, Backed by This Process
                            </h2>
                            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-400">
                                Every quote is backed by the same three-gate inspection pipeline,
                                from raw material to export crate.
                            </p>

                            <div className="mt-9">
                                <Link
                                    to="/request-a-quote"
                                    className="inline-flex items-center gap-2.5 bg-orange-500 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-400 shadow-lg shadow-orange-950/40"
                                >
                                    Request a Quote
                                    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                                </Link>
                            </div>
                        </div>

                        {/* Supplier commitments with clean hairlines — no bloated gradient boxes */}
                        <div className="border-t border-slate-800 pt-8 lg:border-t-0 lg:border-l lg:border-slate-800 lg:pl-12 lg:pt-0">
                            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                QUALITY GUARANTEES
                            </span>
                            <div className="mt-6 space-y-6">
                                {rfqFeatures.map((feat) => (
                                    <div key={feat.title} className="flex items-start gap-4">
                                        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-slate-900 ring-1 ring-slate-800 text-orange-400">
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
            </section>
        </main>
    );
}
