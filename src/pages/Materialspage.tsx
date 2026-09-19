import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { trackQuoteCtaClick } from "../utils/analytics";
import {
    Flame,
    Container,
    Settings,
    Grid3x3,
    Boxes,
    ArrowRight,
    ChevronRight,
    Wrench,
    Building2,
    Search,
    SlidersHorizontal,
    ShieldCheck,
    Gauge,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data Structures & Content (Preserved & Enriched)                   */
/* ------------------------------------------------------------------ */

interface MaterialGroup {
    number: string;
    icon: React.ElementType;
    process: string;
    tagline: string;
    materials: string[];
    note?: string;
    href: string;
    specs?: { label: string; val: string }[];
}

const materialGroups: MaterialGroup[] = [
    {
        number: "01",
        icon: Flame,
        process: "Forging",
        tagline: "High-integrity grain flow for heavy-duty structural parts",
        materials: ["EN8D", "EN9", "EN15", "20MnCr5", "LC / MS", "Carbon Alloy Steels"],
        href: "/capabilities/forging",
        specs: [
            { label: "Yield Strength", val: "Up to 1100 MPa" },
            { label: "Grain Alignment", val: "Continuous metallurgical flow" },
        ],
    },
    {
        number: "02",
        icon: Container,
        process: "Casting",
        tagline: "Near-net shape density across complex internal geometry",
        materials: ["Carbon Steel", "Stainless Steel (CF8M/CF3M)", "Aluminum Alloys", "Ductile Iron"],
        href: "/capabilities/casting",
        specs: [
            { label: "Tolerance Class", val: "ISO 8062-CT6 to CT9" },
            { label: "Surface Finish", val: "Ra 3.2 – 6.3 µm" },
        ],
    },
    {
        number: "03",
        icon: Settings,
        process: "CNC Machining",
        tagline: "Sub-millimeter multi-axis precision on standard & exotic stock",
        materials: ["Alloy Steels", "Aluminum (6061-T6, 7075)", "Stainless Steel (304, 316L)", "Brass / Bronze"],
        href: "/capabilities/cnc-machining",
        specs: [
            { label: "Positional Accuracy", val: "± 0.005 mm" },
            { label: "Axis Configurations", val: "3-Axis, 4-Axis & 5-Axis Simultaneous" },
        ],
    },
    {
        number: "04",
        icon: Grid3x3,
        process: "Sheet Metal Fabrication",
        tagline: "CNC shearing, fiber laser contouring & precision press brake forming",
        materials: ["Mild Steel", "Stainless Steel (SS304 / SS316)", "Aluminum (5052-H32)"],
        // note: "Certified sheet thickness range: 1.0 mm to 20.0 mm across cold-rolled & pickled stock.",
        href: "/capabilities/sheet-metal-fabrication",
        specs: [
            { label: "Laser Cutting Bed", val: "Up to 4000 × 2000 mm" },
            { label: "Gauge Capability", val: "1.0 mm — 20.0 mm" },
        ],
    },
    {
        number: "05",
        icon: Boxes,
        process: "3D Printing",
        tagline: "Laser powder-bed fusion & binder jetting for parametric metal components",
        materials: ["Stainless Steel (17-4 PH, 316L)", "Inconel 718", "Ti-6Al-4V", "AlSi10Mg"],
        // note: "No rigid material limit — metallurgy confirmed directly against your native 3D CAD drawing at quote time.",
        href: "/capabilities/3d-printing",
        specs: [
            { label: "Density Guarantee", val: "≥ 99.6% relative density" },
            { label: "Layer Resolution", val: "20 µm to 60 µm" },
        ],
    },
];

interface CatalogueSpec {
    label: string;
    value: string;
}

interface CatalogueItem {
    name: string;
    code?: string;
    category?: string;
    badge?: string;
    specs: CatalogueSpec[];
}

const fastenerItems: CatalogueItem[] = [
    {
        name: "Hex Bolts",
        code: "DIN 931 / 933",
        category: "Structural Bolts",
        badge: "High-Tensile Available",
        specs: [
            { label: "Material", value: "Carbon steel, stainless steel (SS304, SS316)" },
            { label: "Grades", value: "4.6, 8.8, 10.9, 12.9" },
            { label: "Thread types", value: "Metric, UNC, UNF" },
            { label: "Sizes available", value: "M4 to M64" },
            { label: "Finishes", value: "Zinc plated, hot dip galvanized, black oxide" },
            { label: "Applications", value: "Construction, machinery, heavy-duty assemblies" },
        ],
    },
    {
        name: "Nuts (Hex, Nylock, Flange)",
        code: "DIN 934 / 985 / 6923",
        category: "Mating Hardware",
        specs: [
            { label: "Types", value: "Hex Nut, Nylock Nut, Flange Nut, Cap Nut" },
            { label: "Material", value: "Carbon steel, stainless steel" },
            { label: "Sizes available", value: "M3 to M64" },
            { label: "Finishes", value: "Zinc plated, HDG" },
        ],
    },
    {
        name: "Washers (Plain, Spring, Lock)",
        code: "DIN 125 / 127 / 6798",
        category: "Load Distribution",
        specs: [
            { label: "Types", value: "Plain Washer, Spring Washer, Lock Washer" },
            { label: "Material", value: "Mild steel, stainless steel" },
            { label: "Standards", value: "DIN 125, DIN 127" },
            { label: "Sizes", value: "M3 to M64" },
            { label: "Finishes", value: "Zinc, HDG, custom coatings" },
        ],
    },
    {
        name: "Screws (Machine, Self-Tapping)",
        code: "ISO 7045 / DIN 7981",
        category: "Fastening Screws",
        specs: [
            { label: "Types", value: "Machine Screw, Self-Tapping Screw, Wood Screw" },
            { label: "Material", value: "Steel, stainless steel" },
            { label: "Sizes", value: "M2 to M12; lengths up to 150 mm" },
            { label: "Drive types", value: "Phillips, Slotted, Hex, Torx" },
            { label: "Finishes", value: "Zinc, nickel, black, trivalent coating" },
        ],
    },
    {
        name: "Eye, Square, Pin & Special Bolts",
        code: "DIN 580 / DIN 478",
        category: "Lifting & Fixturing",
        badge: "Heavy Lifting",
        specs: [
            { label: "Types", value: "Eye Bolts, Square Head Bolts, T-Head Bolts, Pin Bolts" },
            { label: "Material", value: "Carbon steel, alloy steel, stainless steel" },
            { label: "Applications", value: "Lifting, structural connections, industrial machinery" },
            { label: "Finishes", value: "HDG, ZP, custom coatings" },
        ],
    },
    {
        name: "Threaded Bars",
        code: "DIN 975 / 976",
        category: "Continuous Studs",
        specs: [
            { label: "Material", value: "Mild steel, high-tensile steel, stainless steel" },
            { label: "Sizes", value: "M6 to M64; lengths up to 3 meters" },
            { label: "Grades", value: "4.6, 8.8, 10.9" },
            { label: "Finishes", value: "Zinc plated, HDG, black" },
        ],
    },
    {
        name: "Hub, Weld & Flange Bolts",
        code: "OEM Custom",
        category: "Automotive & Heavy Assembly",
        specs: [
            { label: "Types", value: "Hub Bolts, Weld Bolts, Flange Bolts" },
            { label: "Applications", value: "Automotive hubs, fabrication, flange assemblies" },
            { label: "Material", value: "High-tensile steel, stainless steel" },
            { label: "Finishes", value: "Phosphate, HDG, zinc" },
        ],
    },
    {
        name: "U-Bolts",
        code: "DIN 3570",
        category: "Pipe Clamping",
        specs: [
            { label: "Material", value: "Mild steel, stainless steel, galvanized steel" },
            { label: "Sizes", value: "Diameter M6 to M24" },
            { label: "Applications", value: "Pipe supports, automotive, marine" },
            { label: "Finishes", value: "Zinc plated, HDG, black oxide" },
        ],
    },
    {
        name: "Special & Custom Fasteners",
        code: "CAD / Drawing Spec",
        category: "Engineered OEM",
        badge: "100% Drawing-Based",
        specs: [
            { label: "Design", value: "Custom-designed bolts & fasteners — drawings-based manufacturing, CAD/CAM precision" },
            { label: "Material options", value: "High-tensile alloy steel, Duplex SS, Super Duplex, Inconel" },
            { label: "Grades", value: "8.8, 10.9, 12.9, A2-70, A4-80 (high-tensile and stainless-steel variants)" },
            { label: "Surface treatments", value: "Dacromet, Teflon coating, Geomet, Phosphate" },
            { label: "Applications", value: "OEM components, critical infrastructure, defense, subsea" },
            { label: "Industries", value: "Automotive, Railways, Marine, Wind Energy" },
            { label: "Standards", value: "ISO, DIN, ASTM, BS, customer proprietary" },
        ],
    },
];

const scaffoldingItems: CatalogueItem[] = [
    {
        name: "Base Plates",
        code: "BS 1139 / EN 74",
        category: "Ground Stability",
        specs: [
            { label: "Material", value: "Mild steel; cast iron types: fixed" },
            { label: "Adjustable sizes", value: "150 × 150 mm, 120 × 120 mm" },
            { label: "Coatings", value: "Painted, galvanized, electro-plated" },
            { label: "Load rating", value: "Certified static load up to 60 kN" },
        ],
    },
    {
        name: "Couplers (Fixed, Swivel, Sleeve)",
        code: "EN 74 Class A & B",
        category: "Structural Clamping",
        badge: "Drop Forged",
        specs: [
            { label: "Types", value: "Right Angle Coupler, Swivel Coupler, Sleeve Coupler, Putlog" },
            { label: "Material", value: "Drop forged high-strength steel" },
            { label: "Sizes", value: "48.3 mm OD (standard), 40 mm to 60 mm" },
            { label: "Finish", value: "Electro galvanized, Hot Dip Galvanized (HDG)" },
        ],
    },
    {
        name: "Props & Heavy-Duty Jacks",
        code: "DIN EN 1065",
        category: "Shoring & Support",
        specs: [
            { label: "Types", value: "Adjustable Shoring Props, U Jacks, Solid Base Jacks" },
            { label: "Size range", value: "1.0 m to 5.0 m fully extended" },
            { label: "Load capacity", value: "Working load limit up to 40 kN" },
            { label: "Material", value: "High-strength structural steel tubes (Grade S235 / S355)" },
        ],
    },
    {
        name: "Tie Rods & Formwork Accessories",
        code: "DIN 18216",
        category: "Formwork Retention",
        specs: [
            { label: "Components", value: "Dywidag Tie Rod, Wing Nut, Water Stopper, Anchor Nut" },
            { label: "Diameter", value: "15 mm, 20 mm high-tensile hot rolled steel" },
            { label: "Material", value: "EN8, high-tensile carbon steel" },
            { label: "Coatings", value: "Self-color plain, Hot Dip Galvanized" },
        ],
    },
];

/* ------------------------------------------------------------------ */
/* Bespoke Visual & Architectural Components                          */
/* ------------------------------------------------------------------ */

/** Clean editorial section mark matching the high-end industrial design standard */
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

/** Bespoke SVG technical drawing representing metallurgical lattice & grain structure */
export function MetallurgyLatticeGraphic() {
    return (
        <div className="relative aspect-[4/3] w-full max-w-lg select-none">
            <svg viewBox="0 0 420 320" className="h-full w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="grid-fade" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                    </linearGradient>
                    <pattern id="meta-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                    </pattern>
                </defs>

                {/* Drafting grid backdrop */}
                <rect width="420" height="320" fill="url(#meta-grid)" />

                {/* Isometric Crystal Unit Cell (FCC / BCC representation) */}
                <g transform="translate(110, 60)">
                    {/* Rear Cube Lines */}
                    <line x1="80" y1="40" x2="180" y2="40" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                    <line x1="180" y1="40" x2="180" y2="140" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                    <line x1="80" y1="40" x2="80" y2="140" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />

                    {/* Front Cube Body */}
                    <polygon
                        points="20,80 120,80 120,180 20,180"
                        fill="rgba(249, 115, 22, 0.04)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.2"
                    />
                    {/* Top Face */}
                    <polygon
                        points="20,80 80,40 180,40 120,80"
                        fill="rgba(249, 115, 22, 0.08)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1.2"
                    />
                    {/* Right Face */}
                    <polygon
                        points="120,80 180,40 180,140 120,180"
                        fill="rgba(249, 115, 22, 0.02)"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1.2"
                    />

                    {/* Connecting diagonals and internal body center atom */}
                    <line x1="20" y1="80" x2="180" y2="140" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.6" />
                    <line x1="120" y1="80" x2="80" y2="140" stroke="#2563eb" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.6" />

                    {/* Atomic nodes */}
                    <circle cx="20" cy="80" r="4.5" fill="#2563eb" />
                    <circle cx="120" cy="80" r="4.5" fill="#2563eb" />
                    <circle cx="120" cy="180" r="4.5" fill="#2563eb" />
                    <circle cx="20" cy="180" r="4.5" fill="#2563eb" />
                    <circle cx="80" cy="40" r="3.5" fill="#ffffff" fillOpacity="0.6" />
                    <circle cx="180" cy="40" r="3.5" fill="#ffffff" fillOpacity="0.6" />
                    <circle cx="180" cy="140" r="3.5" fill="#ffffff" fillOpacity="0.6" />
                    <circle cx="80" cy="140" r="3.5" fill="#ffffff" fillOpacity="0.6" />

                    {/* Centered interstitial atom */}
                    <circle cx="100" cy="110" r="6" fill="#2563eb" className="animate-pulse" />
                    <circle cx="100" cy="110" r="10" fill="none" stroke="#2563eb" strokeWidth="0.75" strokeDasharray="2 2" />

                    {/* Dimension callout line X */}
                    <line x1="20" y1="196" x2="120" y2="196" stroke="#2563eb" strokeWidth="1" />
                    <line x1="20" y1="191" x2="20" y2="201" stroke="#2563eb" strokeWidth="1" />
                    <line x1="120" y1="191" x2="120" y2="201" stroke="#2563eb" strokeWidth="1" />
                </g>

                {/* Technical Annotation Badges */}
                <text x="140" y="278" fill="#2563eb" fontSize="9" letterSpacing="0.1em">
                    LATTICE CONSTANT: a = 3.615 Å (FCC AUSTENITE)
                </text>
                <text x="20" y="35" fill="rgba(255,255,255,0.4)" fontSize="8" letterSpacing="0.15em">
                    FIG 1.0 — METALLURGICAL GRAIN &amp; ATOMIC SYMMETRY
                </text>
                <text x="310" y="35" fill="#2563eb" fontSize="8" letterSpacing="0.1em">
                    ASTM E112 / ISO 643
                </text>
            </svg>
        </div>
    );
}

/** Custom 3-layer stack icon */
function LayerStackIcon({ className = "h-7 w-7" }: { className?: string }) {
    return (
        <svg
            className={className}
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
    );
}

/** Custom threaded bolt / fastener icon */
function ThreadedFastenerIcon({ className = "h-7 w-7" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="m14.5 4.5 5 5-2.5 2.5-5-5z" />
            <path d="m12 7-8 8 2.5 2.5 8-8" />
            <path d="m10.5 8.5 2 2" />
            <path d="m8.5 10.5 2 2" />
            <path d="m6.5 12.5 2 2" />
            <path d="m4.5 14.5 2 2" />
            <path d="m4 15-1.5 1.5 1 2 2 1L8 18" />
        </svg>
    );
}

/** Custom green verification shield icon */
function VerifiedShieldIcon({ className = "h-7 w-7" }: { className?: string }) {
    return (
        <svg
            className={className}
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
    );
}

/* ------------------------------------------------------------------ */
/* Main Materials Page Component                                      */
/* ------------------------------------------------------------------ */

export default function MaterialsPage() {
    const [catalogueTab, setCatalogueTab] = useState<"fasteners" | "scaffolding">("fasteners");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeProcessFilter, setActiveProcessFilter] = useState<string | null>(null);

    // Filter items dynamically based on user query
    const activeItems = useMemo(() => {
        const pool = catalogueTab === "fasteners" ? fastenerItems : scaffoldingItems;
        if (!searchQuery.trim()) return pool;
        const q = searchQuery.toLowerCase();
        return pool.filter(
            (item) =>
                item.name.toLowerCase().includes(q) ||
                item.code?.toLowerCase().includes(q) ||
                item.category?.toLowerCase().includes(q) ||
                item.specs.some(
                    (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
                )
        );
    }, [catalogueTab, searchQuery]);

    const displayedMaterialGroups = useMemo(() => {
        if (!activeProcessFilter) return materialGroups;
        return materialGroups.filter((g) => g.process.toLowerCase() === activeProcessFilter.toLowerCase());
    }, [activeProcessFilter]);

    return (
        <main className="w-full bg-[#ffffff] text-slate-900 selection:bg-[#2563eb] selection:text-white">
            {/* ========================================================== */}
            {/* 1. HERO — Precise pixel-perfect replica of reference mockup */}
            {/* ========================================================== */}
            <section
                className="relative flex w-full flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat min-h-[680px] sm:min-h-[740px] lg:aspect-[1672/941] lg:min-h-0 pt-20 sm:pt-24 lg:pt-20 xl:pt-24 pb-6 sm:pb-8 lg:pb-8 xl:pb-10"
                style={{ backgroundImage: "url('https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/images/Material-Guide/MaterialGuide-HeroImage.webp')" }}
                aria-label="Certified Materials, Process By Process"
            >
                {/* Desktop Absolute Inscriptions on Pedestal & Dark Block */}
                {/* White round pedestal rim text */}
                <div
                    className="pointer-events-none absolute hidden lg:block select-none z-10"
                    style={{ left: "54.6%", top: "71.6%", transform: "rotate(-1.5deg)" }}
                >
                    <span className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.22em] text-slate-700/80">
                        FROM RAW MATERIAL &nbsp;→&nbsp; VERIFIED QUALITY &nbsp;→&nbsp; FINISHED COMPONENT
                    </span>
                </div>

                {/* Dark block front text */}
                <div
                    className="pointer-events-none absolute hidden lg:block select-none z-10"
                    style={{ left: "53.5%", top: "83.2%" }}
                >
                    <div className="text-[11px] xl:text-[12px] font-semibold uppercase tracking-[0.25em] text-slate-400/90 leading-tight">
                        <div>ENGINEERED</div>
                        <div className="mt-1">AT THE ATOMIC LEVEL</div>
                    </div>
                </div>

                <div className="relative z-10 mx-auto flex w-full max-w-[1560px] flex-1 flex-col justify-between px-6 sm:px-10 lg:px-16 xl:px-20">
                    {/* Top Row: Breadcrumb & Material Science in Action Callout */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        {/* Breadcrumbs */}
                        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
                            <Link to="/" className="transition-colors hover:text-slate-900">
                                Home
                            </Link>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                            <span className="font-semibold text-slate-900">Materials &amp; Metallurgy</span>
                        </nav>

                        {/* Top Right: Material Science in Action with orange vertical accent */}
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <div className="h-10 sm:h-11 w-[2.5px] bg-[#2563eb]" />
                            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 leading-[1.35]">
                                <div>MATERIAL</div>
                                <div>SCIENCE</div>
                                <div>IN ACTION</div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Row: Main Editorial Content */}
                    <div className="relative mt-3 sm:mt-5 lg:mt-6 mb-auto pb-4 max-w-xl lg:max-w-2xl xl:max-w-[620px]">
                        {/* Pure borderless white blur fade behind text */}
                        <div
                            className="pointer-events-none absolute -inset-x-8 -inset-y-10 z-0 overflow-visible select-none"
                            aria-hidden="true"
                        >
                            <div
                                className="h-full w-full"
                                style={{
                                    background:
                                        "radial-gradient(ellipse 90% 80% at 30% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.80) 45%, rgba(255,255,255,0.2) 75%, transparent 100%)",
                                    filter: "blur(36px)",
                                }}
                            />
                        </div>

                        <div className="relative z-10">
                            {/* Eyebrow Kicker */}
                            <div className="flex items-center gap-3">
                                <span className="h-[2.5px] w-7 bg-[#2563eb]" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                                    CERTIFIED METALLURGICAL CAPABILITY
                                </span>
                            </div>

                            {/* Main Title */}
                            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-tight text-[#2563eb] leading-[1.04]">
                                Certified
                                <span className="block">Materials,</span>
                                <span className="block text-[#2563eb]">Process By Process.</span>
                            </h1>

                            {/* Subtext description: backdrop blur specifically behind this text only */}
                            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-900 backdrop-blur-md bg-white/40 rounded-xl p-3 sm:p-4 border border-white/30 shadow-xs">
                                We state our exact certified material scope for each manufacturing process by verified metallurgical grade — not as an ambiguous blanket claim. Where geometries or non-standard alloys require custom qualification, we test and verify directly against your drawing at quote time.
                            </p>

                            {/* The Three Inspection Badges Strip */}
                            <div className="mt-7 flex flex-wrap items-center gap-y-4 sm:gap-y-0">
                                {/* Badge 1: ISO / DIN / ASTM */}
                                <div className="flex items-center gap-3 pr-4 sm:pr-6">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#2563eb]">
                                        <LayerStackIcon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 leading-tight">
                                            ISO / DIN / ASTM
                                        </div>
                                        <div className="mt-0.5 text-[11px] font-medium leading-tight text-slate-500">
                                            <div>International Grade</div>
                                            <div>Compliance</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden h-9 w-px bg-slate-200/90 sm:block" />

                                {/* Badge 2: M2 — M64 */}
                                <div className="flex items-center gap-3 px-0 sm:px-6">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#2563eb]">
                                        <ThreadedFastenerIcon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 leading-tight">
                                            M2 — M64
                                        </div>
                                        <div className="mt-0.5 text-[11px] font-medium leading-tight text-slate-500">
                                            <div>Fastener Thread Range</div>
                                            <div>Up to 3m component size</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden h-9 w-px bg-slate-200/90 sm:block" />

                                {/* Badge 3: 3.1 Heat Trace */}
                                <div className="flex items-center gap-3 pl-0 sm:pl-6">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#2563eb]">
                                        <VerifiedShieldIcon className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900 leading-tight">
                                            3.1 Heat Trace
                                        </div>
                                        <div className="mt-0.5 text-[11px] font-medium leading-tight text-slate-500">
                                            <div>Full Traceability</div>
                                            <div>Spectrum test reports</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-7 flex flex-wrap items-center gap-6 sm:gap-8">
                                <a
                                    href="#materials-matrix"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563eb]/25 transition-all hover:bg-[#2563eb] hover:shadow-[#2563eb]/35 active:translate-y-0.5"
                                >
                                    Explore Material Capabilities
                                    <ArrowRight className="h-4 w-4" />
                                </a>

                                {/* <a
                                    href="#standards-download"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById("standards-table") || document.getElementById("materials-matrix");
                                        el?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="group inline-flex items-center gap-2 text-sm font-bold text-slate-900 transition-colors hover:text-[#2563eb]"
                                >
                                    <span className="border-b border-slate-900 pb-0.5 transition-colors group-hover:border-[#2563eb]">
                                        Download Standards List
                                    </span>
                                    <Download className="h-4 w-4 text-[#2563eb] transition-transform group-hover:translate-y-0.5" />
                                </a> */}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Tagline */}
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <span className="h-px w-8 bg-slate-400/80" />
                        <span>MATERIALS TODAY. STRONGER TOMORROW.</span>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 2. THE METALLURGY MATRIX (Materials, By Process)           */}
            {/* Editorial open layout with bespoke architectural cards     */}
            {/* ========================================================== */}
            <section id="materials-matrix" className="py-20 lg:py-28 bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    {/* Section Header */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <SectionMark label="MANUFACTURING SCOPE" />
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
                                Materials By Manufacturing Process
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base leading-relaxed">
                                Select any manufacturing process cluster to inspect verified raw stock billets,
                                certified alloy grades, and metallurgical integrity guarantees.
                            </p>
                        </div>

                        {/* Process Quick Filter Bar */}
                        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-[#ffffff] p-1.5 shadow-xs">
                            <button
                                type="button"
                                onClick={() => setActiveProcessFilter(null)}
                                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${activeProcessFilter === null
                                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-white"
                                    }`}
                            >
                                All Processes
                            </button>
                            {materialGroups.map((g) => (
                                <button
                                    key={g.process}
                                    type="button"
                                    onClick={() =>
                                        setActiveProcessFilter(
                                            activeProcessFilter === g.process ? null : g.process
                                        )
                                    }
                                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${activeProcessFilter === g.process
                                        ? "bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/20"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-white"
                                        }`}
                                >
                                    {g.process}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Editorial Process Cards */}
                    <div className="mt-12 space-y-6">
                        {displayedMaterialGroups.map((group) => {
                            const IconComponent = group.icon;
                            return (
                                <article
                                    key={group.process}
                                    className="group relative rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.08)] hover:border-[#2563eb] transition-all duration-300 overflow-hidden"
                                >
                                    {/* Top accent line on hover */}
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563eb] via-[#2563eb] to-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
                                        {/* Column 1: Index + Process Identity */}
                                        <div className="lg:col-span-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-[#2563eb] tabular bg-[#2563eb]/10 px-2 py-0.5 rounded border border-[#2563eb]/60">
                                                    {group.number}
                                                </span>
                                                <span className="h-px w-6 bg-[#2563eb]" />
                                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                    PROCESS CLUSTER
                                                </span>
                                            </div>

                                            <div className="mt-3.5 flex items-center gap-3.5">
                                                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#2563eb]/10 text-[#2563eb] ring-1 ring-[#2563eb]/70 group-hover:bg-[#2563eb]/10 group-hover:text-white transition-all duration-300">
                                                    <IconComponent className="h-6 w-6" strokeWidth={1.8} />
                                                </span>
                                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                                                    {group.process}
                                                </h3>
                                            </div>

                                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                                {group.tagline}
                                            </p>

                                            <Link
                                                to={group.href}
                                                className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563eb] transition-all group-hover:text-[#2563eb]"
                                            >
                                                <span>View Full {group.process} Specs</span>
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                                            </Link>
                                        </div>

                                        {/* Column 2: Metallurgical Grades & Scope */}
                                        <div className="lg:col-span-5">
                                            <div className="flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                    CONFIRMED ALLOY SCOPE &amp; DESIGNATIONS
                                                </span>
                                            </div>

                                            {group.materials.length > 0 ? (
                                                <div className="mt-3.5 flex flex-wrap gap-2">
                                                    {group.materials.map((m) => (
                                                        <span
                                                            key={m}
                                                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/90 bg-[#ffffff] px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-[#2563eb] hover:bg-white hover:text-[#2563eb] transition-all"
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                                                            {m}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : null}

                                            {group.note ? (
                                                <div className="mt-4 rounded-xl border border-[#2563eb]/90 bg-[#2563eb]/70 p-3.5 text-xs leading-relaxed text-[#2563eb] flex items-start gap-2.5">
                                                    <span className="font-bold text-[#2563eb] uppercase text-[10px] tracking-wider px-1.5 py-0.5 rounded bg-[#2563eb]/70">
                                                        Note
                                                    </span>
                                                    <span>{group.note}</span>
                                                </div>
                                            ) : null}

                                            {/* Calibrated Visual Gauge for Sheet Metal */}
                                            {group.process.toLowerCase().includes("sheet metal") && (
                                                <div className="mt-5 rounded-xl border border-slate-200/80 bg-[#ffffff] p-4">
                                                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                                                        <span className="font-semibold text-slate-700">1.0 mm (Thin Sheet)</span>
                                                        <span className="font-bold uppercase tracking-wider text-[#2563eb]">
                                                            THICKNESS CAPABILITY RANGE
                                                        </span>
                                                        <span className="font-semibold text-slate-700">20.0 mm (Heavy Plate)</span>
                                                    </div>
                                                    <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                                        <div className="h-full w-full bg-gradient-to-r from-[#2563eb] via-[#2563eb] to-[#2563eb]" />
                                                    </div>
                                                    <div className="mt-2 flex justify-between text-[9px] text-slate-400">
                                                        <span>Laser Cutting</span>
                                                        <span>CNC Punching</span>
                                                        <span>Precision Bending</span>
                                                        <span>Heavy Stamping</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Column 3: Quality & Process Benchmarks */}
                                        <div className="lg:col-span-3">
                                            <div className="rounded-xl border border-slate-200/80 bg-[#ffffff] p-5">
                                                <div className="flex items-center gap-2">
                                                    <Gauge className="h-3.5 w-3.5 text-[#2563eb]" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                                        PROCESS BENCHMARKS
                                                    </span>
                                                </div>
                                                {group.specs && (
                                                    <dl className="mt-3.5 space-y-3 divide-y divide-slate-200/70">
                                                        {group.specs.map((sp) => (
                                                            <div key={sp.label} className="pt-2.5 first:pt-0">
                                                                <dt className="text-[11px] font-medium text-slate-500">
                                                                    {sp.label}
                                                                </dt>
                                                                <dd className="mt-0.5 text-xs font-bold text-slate-900 tabular">
                                                                    {sp.val}
                                                                </dd>
                                                            </div>
                                                        ))}
                                                    </dl>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 3. PRODUCT CATALOGUE: Fasteners & Scaffolding Steel         */}
            {/* High-density architectural spec ledger with search & tabs  */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-[#ffffff]">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <SectionMark label="ENGINEERED PRODUCT CATALOGUE" />
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
                                Fasteners &amp; Scaffolding Hardware
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base leading-relaxed">
                                Standard catalog components and drawing-based custom specials with certified
                                metallurgy, precision dimensions, and stage-wise testing standards.
                            </p>
                        </div>

                        {/* Clean Tab Segment Switcher */}
                        <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
                            <button
                                type="button"
                                onClick={() => setCatalogueTab("fasteners")}
                                className={`inline-flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-bold tracking-wide transition-all ${catalogueTab === "fasteners"
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                <Wrench className="h-4 w-4" strokeWidth={2} />
                                <span>FASTENERS &amp; HARDWARE</span>
                                <span className="ml-1 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-[#2563eb]">
                                    {fastenerItems.length}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setCatalogueTab("scaffolding")}
                                className={`inline-flex items-center gap-2.5 rounded-xl px-5 py-2.5 text-xs font-bold tracking-wide transition-all ${catalogueTab === "scaffolding"
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                <Building2 className="h-4 w-4" strokeWidth={2} />
                                <span>SCAFFOLDING STEEL</span>
                                <span className="ml-1 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-[#2563eb]">
                                    {scaffoldingItems.length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/90 pb-6">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, grade (10.9), DIN spec, or material..."
                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-16 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 shadow-xs"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-slate-700 bg-slate-100 px-2 py-0.5 rounded"
                                >
                                    CLEAR
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                            <SlidersHorizontal className="h-3.5 w-3.5 text-[#2563eb]" />
                            <span>
                                Showing <strong className="text-slate-900 font-bold">{activeItems.length}</strong> confirmed items
                            </span>
                        </div>
                    </div>

                    {/* Catalogue Items: Elevated Spec Sheet Cards */}
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {activeItems.map((item) => (
                            <div
                                key={item.name}
                                className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_16px_36px_-8px_rgba(15,23,42,0.08)] ${item.badge
                                    ? "border-[#2563eb] ring-1 ring-[#2563eb]/60"
                                    : "border-slate-200/90 hover:border-[#2563eb]"
                                    }`}
                            >
                                <div>
                                    {/* Top Metadata Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex flex-col">
                                            {item.code && (
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563eb] bg-[#2563eb]/10 px-2 py-0.5 rounded border border-[#2563eb]/60 w-fit">
                                                    {item.code}
                                                </span>
                                            )}
                                            <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                                                {item.name}
                                            </h3>
                                        </div>

                                        {item.badge && (
                                            <span className="flex-none rounded-full bg-[#2563eb]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#2563eb] shadow-xs">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>

                                    {item.category && (
                                        <span className="mt-1 block text-[10px] uppercase tracking-wider text-slate-400">
                                            {item.category}
                                        </span>
                                    )}

                                    {/* Spec Matrix List */}
                                    <dl className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                                        {item.specs.map((spec) => (
                                            <div
                                                key={spec.label}
                                                className="flex flex-col gap-0.5 rounded-lg p-1.5 transition-colors group-hover:bg-[#ffffff]/70 sm:flex-row sm:items-baseline sm:justify-between"
                                            >
                                                <dt className="text-[10px] uppercase tracking-wide text-slate-400 sm:w-28 sm:flex-none">
                                                    {spec.label}
                                                </dt>
                                                <dd className="text-xs font-semibold text-slate-800 sm:text-right">
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <span className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                                        <ShieldCheck className="h-3.5 w-3.5 text-[#2563eb]" />
                                        MTR 3.1 CERTIFIED
                                    </span>
                                    <Link
                                        to="/#quote"
                                        onClick={() => trackQuoteCtaClick("material_card")}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 transition-colors group-hover:text-[#2563eb]"
                                    >
                                        <span>Quote Specs</span>
                                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {activeItems.length === 0 && (
                        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">
                            <p className="text-lg font-bold text-slate-800">
                                No catalogue match for "{searchQuery}"
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                We custom-manufacture non-standard fasteners and hardware directly according to your CAD prints.
                            </p>
                            <Link
                                to="/#quote"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white transition hover:bg-[#2563eb] shadow-md"
                            >
                                Request Custom Feasibility
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

        </main>
    );
}
