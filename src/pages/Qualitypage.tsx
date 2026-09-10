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

/** Custom GD&T Feature Control & CMM Inspection Drawing — no card, purely editorial line-art */
function MetrologyCMMDrawing() {
    return (
        <div className="relative aspect-[4/3] w-full select-none">
            <svg viewBox="0 0 420 310" className="h-full w-full" aria-hidden="true">
                {/* Background Drafting Grid lines */}
                <line x1="20" y1="260" x2="400" y2="260" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="20" y1="180" x2="400" y2="180" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="20" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="1" />

                {/* Isometric Machined Bearing Journal Profile */}
                <g transform="translate(110, 50)">
                    {/* Stepped cylindrical shaft */}
                    <path
                        d="M 20,60 L 120,60 L 120,40 L 180,40 L 180,140 L 120,140 L 120,120 L 20,120 Z"
                        fill="none"
                        stroke="rgba(15,23,42,0.35)"
                        strokeWidth="1.5"
                    />

                    {/* Stepped journal lines */}
                    <line x1="60" y1="60" x2="60" y2="120" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="120" y1="60" x2="120" y2="120" stroke="rgba(15,23,42,0.15)" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Center axis centerline */}
                    <line x1="0" y1="90" x2="200" y2="90" stroke="#f97316" strokeWidth="0.75" strokeDasharray="6 2 1 2" />

                    {/* CMM Probe Stylus */}
                    <line x1="90" y1="-10" x2="90" y2="60" stroke="#f97316" strokeWidth="1.8" />
                    <circle cx="90" cy="60" r="4.5" fill="#f97316" />
                    <circle cx="90" cy="60" r="8" fill="none" stroke="#f97316" strokeWidth="0.75" strokeDasharray="2 2" />

                    {/* Runout Dimension indicator */}
                    <line x1="20" y1="165" x2="180" y2="165" stroke="#f97316" strokeWidth="1" />
                    <line x1="20" y1="158" x2="20" y2="172" stroke="#f97316" strokeWidth="1" />
                    <line x1="180" y1="158" x2="180" y2="172" stroke="#f97316" strokeWidth="1" />

                    <text x="75" y="180" fill="#f97316" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.05em">
                        160.00 ± 0.005 mm
                    </text>
                </g>

                {/* Feature Control Frame */}
                <g transform="translate(30, 220)">
                    <rect x="0" y="0" width="140" height="26" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
                    <line x1="30" y1="0" x2="30" y2="26" stroke="#0f172a" strokeWidth="1" />
                    <line x1="88" y1="0" x2="88" y2="26" stroke="#0f172a" strokeWidth="1" />
                    <line x1="114" y1="0" x2="114" y2="26" stroke="#0f172a" strokeWidth="1" />

                    {/* Position symbol */}
                    <circle cx="15" cy="13" r="5.5" fill="none" stroke="#0f172a" strokeWidth="1.2" />
                    <line x1="15" y1="5" x2="15" y2="21" stroke="#0f172a" strokeWidth="1" />
                    <line x1="7" y1="13" x2="23" y2="13" stroke="#0f172a" strokeWidth="1" />

                    {/* Tolerance values */}
                    <text x="36" y="17" fill="#0f172a" fontFamily="JetBrains Mono" fontSize="10" fontWeight="bold">Ø 0.008 M</text>
                    <text x="96" y="17" fill="#f97316" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold">A</text>
                    <text x="122" y="17" fill="#f97316" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold">B</text>
                </g>

                {/* Technical Annotation Callouts */}
                <text x="30" y="35" fill="#f97316" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.15em">
                    CMM PROBE INSPECTION // ZEISS PRISMO
                </text>
                <text x="250" y="35" fill="#64748b" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.1em">
                    REPEATABILITY: 1.5 µm
                </text>
                <text x="210" y="275" fill="#64748b" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.1em">
                    REF. ISO 1101 GD&amp;T SPECIFICATION
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
            {/* 1. HERO — Full-bleed dark, ghost typography, no card pills */}
            {/* ========================================================== */}
            <section className="relative flex min-h-[580px] items-center overflow-hidden bg-slate-950 pb-20 pt-28 lg:min-h-[640px] lg:pb-24 lg:pt-32">
                {/* Subtle radial ambient atmosphere */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Giant Ghost-Type Depth Layer — like '3D' on the 3D printing page */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none font-display text-[220px] font-bold leading-none lg:block lg:text-[320px]"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)", color: "transparent" }}
                >
                    0.001
                </span>

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-16">
                    {/* Clean navigation breadcrumb */}
                    <div className="mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Link to="/" className="transition hover:text-orange-400">
                            Home
                        </Link>
                        <ChevronRight className="h-3 w-3 text-slate-500" />
                        <span className="font-semibold text-slate-200">Quality Governance</span>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
                        <div>
                            <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                                Quality Control &amp; Metrology
                            </span>

                            <h1 className="mt-3 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl text-white">
                                Quality Control &amp; <br />
                                <span className="text-orange-500">Production Governance</span>
                            </h1>

                            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                                Rigid dimensional validation, metallurgical heat isolation, and stage-wise
                                process visibility for international supply chains.
                            </p>

                            {/* Minimal hairline metrics strip — no card containers */}
                            <div className="mt-9 flex flex-wrap items-start gap-x-10 gap-y-5 border-t border-white/10 pt-6">
                                <div>
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        GOVERNANCE GATES
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-white tabular">
                                        3 Mandatory Stages
                                    </span>
                                </div>
                                <div>
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        CMM METROLOGY
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-orange-400 tabular">
                                        ± 0.0015 mm
                                    </span>
                                </div>
                                <div>
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        HEAT TRACEABILITY
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-white tabular">
                                        100% 3.1 MTR
                                    </span>
                                </div>
                            </div>

                            <a
                                href="#inspection-gates"
                                className="group mt-10 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-orange-400"
                            >
                                Explore the three inspection gates
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.25} />
                            </a>
                        </div>

                        {/* Right side focal point callout — exactly like 3D printing page */}
                        <div className="hidden flex-col items-end justify-between gap-10 lg:flex">
                            <div className="flex flex-col items-end gap-3 self-end">
                                <div className="flex items-center gap-3">
                                    <div className="h-24 w-px bg-white/20" />
                                    <div className="text-right font-mono text-xs font-medium uppercase leading-relaxed tracking-[0.2em] text-slate-300">
                                        Zero
                                        <br />
                                        Defect
                                        <br />
                                        Protocol
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Standard</p>
                                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                                    ISO 2859-1 // AQL 0.65
                                </p>
                            </div>
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

                        {/* Open Stacked Rows — NO BOXES OR CARDS! */}
                        <div className="space-y-16 lg:space-y-20">
                            {gates.map((gate, i) => (
                                <div
                                    key={gate.number}
                                    data-index={i}
                                    ref={(el) => {
                                        rowRefs.current[i] = el;
                                    }}
                                    className="relative border-b border-slate-200 pb-16 last:border-b-0 last:pb-0"
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
