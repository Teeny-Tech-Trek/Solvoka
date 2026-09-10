import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Flame,
    Container,
    Settings,
    Grid3x3,
    Boxes,
    ArrowRight,
    ChevronRight,
    Zap,
    Lock,
    Users,
    Wrench,
    Building2,
    Search,
    SlidersHorizontal,
    CheckCircle2,
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
        note: "Certified sheet thickness range: 1.0 mm to 20.0 mm across cold-rolled & pickled stock.",
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
        note: "No rigid material limit — metallurgy confirmed directly against your native 3D CAD drawing at quote time.",
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

interface ProcessItem {
    name: string;
    badge: string;
    tolerance: string;
    description: string;
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

const processItems: ProcessItem[] = [
    {
        name: "3D Additive Metal Fusion (Binder Jetting / SLS / DED)",
        badge: "Additive",
        tolerance: "Layer: 20–50 µm",
        description:
            "Complex conformal cooling channels, topology-optimized lightweight geometry, and near-zero tooling cost. Ideal for rapid prototyping and low-to-mid volume high-complexity components.",
    },
    {
        name: "Powder Metallurgy & Sintering",
        badge: "Net-Shape",
        tolerance: "IT8 — IT9 Class",
        description:
            "High-volume, repeatable net-shape compaction. Delivers self-lubricating porous bronze/iron bearings, complex gears, and high-density cams with minimal post-machining scrap.",
    },
    {
        name: "CNC EDM Wire Cutting",
        badge: "Sub-Micron",
        tolerance: "± 0.003 mm",
        description:
            "Stress-free electro-discharge erosion for hardened tool steels, carbide dies, and razor-sharp internal radii without inducing thermal warping or mechanical tool deflection.",
    },
];

interface CoatingDetail {
    name: string;
    rating: string;
    thickness: string;
    applications: string;
    colorCode: string;
}

const detailedCoatings: CoatingDetail[] = [
    {
        name: "Hot Dip Galvanizing (HDG)",
        rating: "1,000+ Hrs Salt Spray",
        thickness: "45–85 µm",
        applications: "Marine, outdoor structural scaffolding, solar mounting, civil engineering.",
        colorCode: "bg-slate-400",
    },
    {
        name: "Zinc Electroplating (Clear / Yellow)",
        rating: "120–240 Hrs Salt Spray",
        thickness: "8–15 µm",
        applications: "Internal fasteners, precision electronics, light assembly hardware.",
        colorCode: "bg-blue-300",
    },
    {
        name: "Dacromet & Geomet Coatings",
        rating: "1,500+ Hrs Salt Spray",
        thickness: "5–12 µm",
        applications: "Automotive chassis fasteners, subsea connections, hydrogen-embrittlement-free applications.",
        colorCode: "bg-zinc-500",
    },
    {
        name: "PTFE / Teflon Fluoropolymer",
        rating: "Low Friction & Chem-Resistant",
        thickness: "15–25 µm",
        applications: "Offshore oil & gas flanges, chemical processing valves, easy-breakout studs.",
        colorCode: "bg-amber-600",
    },
    {
        name: "Black Oxide & Phosphating",
        rating: "Oil-Retention & Anti-Galling",
        thickness: "1–3 µm",
        applications: "High-torque machine bolts, internal engine fasteners, hydraulic fittings.",
        colorCode: "bg-slate-900",
    },
];

const rfqFeatures = [
    {
        icon: <Zap className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "24-Hour Engineering DFM",
        subtitle: "Rapid material feasibility analysis",
    },
    {
        icon: <Lock className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "Mutual NDA Protected",
        subtitle: "Your proprietary CAD models stay secure",
    },
    {
        icon: <Users className="h-4 w-4 text-orange-400" strokeWidth={2} />,
        title: "Chief Metallurgist Review",
        subtitle: "Direct grade & heat-treatment advice",
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
            <span className="h-px w-8 bg-orange-500" />
            <span className={`font-mono text-xs font-semibold uppercase tracking-[0.2em] ${textTone}`}>
                {label}
            </span>
        </div>
    );
}

/** Bespoke SVG technical drawing representing metallurgical lattice & grain structure */
function MetallurgyLatticeGraphic() {
    return (
        <div className="relative aspect-[4/3] w-full max-w-lg select-none">
            <svg viewBox="0 0 420 320" className="h-full w-full" aria-hidden="true">
                <defs>
                    <linearGradient id="grid-fade" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
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
                    <line x1="20" y1="80" x2="180" y2="140" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.6" />
                    <line x1="120" y1="80" x2="80" y2="140" stroke="#f97316" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.6" />

                    {/* Atomic nodes */}
                    <circle cx="20" cy="80" r="4.5" fill="#f97316" />
                    <circle cx="120" cy="80" r="4.5" fill="#f97316" />
                    <circle cx="120" cy="180" r="4.5" fill="#f97316" />
                    <circle cx="20" cy="180" r="4.5" fill="#f97316" />
                    <circle cx="80" cy="40" r="3.5" fill="#ffffff" fillOpacity="0.6" />
                    <circle cx="180" cy="40" r="3.5" fill="#ffffff" fillOpacity="0.6" />
                    <circle cx="180" cy="140" r="3.5" fill="#ffffff" fillOpacity="0.6" />
                    <circle cx="80" cy="140" r="3.5" fill="#ffffff" fillOpacity="0.6" />

                    {/* Centered interstitial atom */}
                    <circle cx="100" cy="110" r="6" fill="#fb923c" className="animate-pulse" />
                    <circle cx="100" cy="110" r="10" fill="none" stroke="#f97316" strokeWidth="0.75" strokeDasharray="2 2" />

                    {/* Dimension callout line X */}
                    <line x1="20" y1="196" x2="120" y2="196" stroke="#f97316" strokeWidth="1" />
                    <line x1="20" y1="191" x2="20" y2="201" stroke="#f97316" strokeWidth="1" />
                    <line x1="120" y1="191" x2="120" y2="201" stroke="#f97316" strokeWidth="1" />
                </g>

                {/* Technical Annotation Badges */}
                <text x="140" y="278" fill="#f97316" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="0.1em">
                    LATTICE CONSTANT: a = 3.615 Å (FCC AUSTENITE)
                </text>
                <text x="20" y="35" fill="rgba(255,255,255,0.4)" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.15em">
                    FIG 1.0 — METALLURGICAL GRAIN &amp; ATOMIC SYMMETRY
                </text>
                <text x="310" y="35" fill="#38bdf8" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="0.1em">
                    ASTM E112 / ISO 643
                </text>
            </svg>
        </div>
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
        <main className="w-full bg-[#FAF9F7] text-slate-900 selection:bg-orange-500 selection:text-white">
            {/* ========================================================== */}
            {/* 1. HERO SECTION — Architectural, Dark & Metallurgical     */}
            {/* ========================================================== */}
            <section className="relative overflow-hidden bg-slate-950 pt-28 pb-20 lg:pt-36 lg:pb-28 text-white border-b border-slate-800">
                {/* Subtle technical background grid */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Subtle radial ambient glows */}
                <div
                    aria-hidden="true"
                    className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-orange-600/10 blur-[120px] pointer-events-none"
                />
                <div
                    aria-hidden="true"
                    className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none"
                />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16 w-full">
                    {/* Breadcrumbs with clean engineering markers */}
                    <div className="mb-8 flex items-center gap-2 font-mono text-[11px] text-slate-400">
                        <Link to="/" className="transition-colors hover:text-orange-400">
                            HOME
                        </Link>
                        <ChevronRight className="h-3 w-3 text-slate-600" />
                        <span className="text-orange-500 font-semibold tracking-wider">
                            MATERIALS &amp; METALLURGY
                        </span>
                    </div>

                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Hero text column */}
                        <div className="lg:col-span-7">
                            <SectionMark label="CERTIFIED METALLURGICAL CAPABILITY" tone="light" />

                            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
                                Certified Materials, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-white">
                                    Process By Process.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-slate-300 sm:text-lg">
                                We state our exact certified material scope for each manufacturing process by
                                verified metallurgical grade — not as an ambiguous blanket claim. Where geometries
                                or non-standard alloys require custom qualification, we test and verify directly
                                against your drawing at quote time.
                            </p>

                            {/* Engineering Quick Metrics ribbon */}
                            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-3 sm:gap-6">
                                <div>
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        STANDARDS COMPLIANCE
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-white tabular">
                                        ISO / DIN / ASTM
                                    </span>
                                    <span className="text-[11px] text-slate-400">Enforced mill certs</span>
                                </div>
                                <div>
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        FASTENER THREAD RANGE
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-orange-400 tabular">
                                        M2 — M64
                                    </span>
                                    <span className="text-[11px] text-slate-400">Up to 3m threaded rods</span>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-400">
                                        TRACEABILITY
                                    </span>
                                    <span className="mt-1 block font-display text-lg font-bold text-white tabular">
                                        3.1 Heat Trace
                                    </span>
                                    <span className="text-[11px] text-slate-400">Spectro test reports</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Graphic / Lattice column */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center">
                            <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
                                <MetallurgyLatticeGraphic />

                                <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] font-mono text-slate-400">
                                    <span className="flex items-center gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                        MTR Mill Test Reports Included
                                    </span>
                                    <span className="text-orange-400">DIN 50049 / EN 10204</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 2. THE METALLURGY MATRIX (Materials, By Process)           */}
            {/* Editorial open layout with zero generic card-grid boxes    */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    {/* Section Header */}
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <SectionMark label="MANUFACTURING SCOPE" />
                            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Materials By Manufacturing Process
                            </h2>
                            <p className="mt-2 max-w-2xl font-sans text-sm text-slate-600 sm:text-base">
                                Select any process to examine verified raw stock, alloy grades, and mechanical
                                integrity guarantees.
                            </p>
                        </div>

                        {/* Process Quick Filter Bar */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            <button
                                type="button"
                                onClick={() => setActiveProcessFilter(null)}
                                className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                                    activeProcessFilter === null
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
                                    className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                                        activeProcessFilter === g.process
                                            ? "bg-orange-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {g.process}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Editorial Process Ledger (No generic card grid!) */}
                    <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
                        {displayedMaterialGroups.map((group) => {
                            const IconComponent = group.icon;
                            return (
                                <article
                                    key={group.process}
                                    className="group relative py-10 transition-colors duration-300 hover:bg-[#FAF9F7]/60"
                                >
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
                                        {/* Column 1: Index + Process Identity */}
                                        <div className="lg:col-span-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-mono text-xs font-bold text-orange-600 tabular">
                                                    {group.number}
                                                </span>
                                                <span className="h-px w-6 bg-orange-300" />
                                                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                    PROCESS CLUSTER
                                                </span>
                                            </div>

                                            <div className="mt-2.5 flex items-center gap-3">
                                                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-orange-50 text-orange-600 ring-1 ring-orange-200/60">
                                                    <IconComponent className="h-5 w-5" strokeWidth={1.8} />
                                                </span>
                                                <h3 className="font-display text-2xl font-bold text-slate-900">
                                                    {group.process}
                                                </h3>
                                            </div>

                                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                                {group.tagline}
                                            </p>

                                            <Link
                                                to={group.href}
                                                className="mt-4 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-orange-600 transition-all group-hover:text-orange-700"
                                            >
                                                <span>View Full {group.process} Specs</span>
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                                            </Link>
                                        </div>

                                        {/* Column 2: Metallurgical Grades & Scope */}
                                        <div className="lg:col-span-5">
                                            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                                CONFIRMED ALLOY SCOPE &amp; DESIGNATIONS
                                            </span>

                                            {group.materials.length > 0 ? (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {group.materials.map((m) => (
                                                        <span
                                                            key={m}
                                                            className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs font-semibold text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                                                            {m}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : null}

                                            {group.note ? (
                                                <div className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50/70 p-3 text-xs leading-relaxed text-amber-900">
                                                    <span className="font-semibold">Note: </span>
                                                    {group.note}
                                                </div>
                                            ) : null}

                                            {/* Visual Gauge for Sheet Metal */}
                                            {group.process.toLowerCase().includes("sheet metal") && (
                                                <div className="mt-4 border-t border-dashed border-slate-200 pt-3">
                                                    <div className="flex justify-between font-mono text-[10px] text-slate-500">
                                                        <span>MIN 1.0 mm (Thin Sheet)</span>
                                                        <span className="font-bold text-slate-800">
                                                            THICKNESS CAPABILITY
                                                        </span>
                                                        <span>MAX 20.0 mm (Heavy Plate)</span>
                                                    </div>
                                                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                                                        <div className="h-full w-full bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Column 3: Quality & Process Benchmarks */}
                                        <div className="lg:col-span-3 border-t border-slate-100 pt-4 lg:border-t-0 lg:border-l lg:border-slate-200 lg:pl-8 lg:pt-0">
                                            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                                PROCESS BENCHMARKS
                                            </span>
                                            {group.specs && (
                                                <dl className="mt-3 space-y-3">
                                                    {group.specs.map((sp) => (
                                                        <div key={sp.label}>
                                                            <dt className="text-[11px] font-medium text-slate-500">
                                                                {sp.label}
                                                            </dt>
                                                            <dd className="font-mono text-xs font-semibold text-slate-900 tabular">
                                                                {sp.val}
                                                            </dd>
                                                        </div>
                                                    ))}
                                                </dl>
                                            )}
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
            <section className="py-20 lg:py-28 bg-[#FAF9F7]">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <SectionMark label="ENGINEERED PRODUCT CATALOGUE" />
                            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Fasteners &amp; Scaffolding Hardware
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                                Standard catalog items and precision drawing-based specials with certified
                                metallurgy, dimensions, and testing standards.
                            </p>
                        </div>

                        {/* Clean Tab Segment Switcher */}
                        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                            <button
                                type="button"
                                onClick={() => setCatalogueTab("fasteners")}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold tracking-wide transition-all ${
                                    catalogueTab === "fasteners"
                                        ? "bg-slate-900 text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                <Wrench className="h-3.5 w-3.5" strokeWidth={2} />
                                FASTENERS &amp; HARDWARE
                            </button>
                            <button
                                type="button"
                                onClick={() => setCatalogueTab("scaffolding")}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold tracking-wide transition-all ${
                                    catalogueTab === "scaffolding"
                                        ? "bg-slate-900 text-white shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                <Building2 className="h-3.5 w-3.5" strokeWidth={2} />
                                SCAFFOLDING STEEL
                            </button>
                        </div>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by bolt name, grade (10.9), DIN spec, or material..."
                                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 font-sans text-xs text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-xs"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-slate-400 hover:text-slate-700"
                                >
                                    CLEAR
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-3 font-mono text-xs text-slate-500">
                            <SlidersHorizontal className="h-3.5 w-3.5 text-orange-500" />
                            <span>
                                Showing <strong className="text-slate-900">{activeItems.length}</strong> confirmed items
                            </span>
                        </div>
                    </div>

                    {/* Catalogue Items: Open Spec Sheet Layout (No box-based repetition!) */}
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {activeItems.map((item) => (
                            <div
                                key={item.name}
                                className={`group relative flex flex-col justify-between rounded-xl border bg-white p-6 transition-all duration-300 hover:shadow-lg ${
                                    item.badge
                                        ? "border-orange-300 ring-1 ring-orange-200"
                                        : "border-slate-200/90 hover:border-slate-300"
                                }`}
                            >
                                <div>
                                    {/* Top Metadata Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex flex-col">
                                            {item.code && (
                                                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-orange-600">
                                                    {item.code}
                                                </span>
                                            )}
                                            <h3 className="font-display text-lg font-bold text-slate-900">
                                                {item.name}
                                            </h3>
                                        </div>

                                        {item.badge && (
                                            <span className="flex-none rounded-full bg-orange-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-orange-700">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>

                                    {item.category && (
                                        <span className="mt-1 block font-mono text-[10px] uppercase text-slate-400">
                                            {item.category}
                                        </span>
                                    )}

                                    {/* Spec Matrix List */}
                                    <dl className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
                                        {item.specs.map((spec) => (
                                            <div
                                                key={spec.label}
                                                className="flex flex-col gap-0.5 text-xs sm:flex-row sm:items-baseline sm:justify-between"
                                            >
                                                <dt className="font-mono text-[10px] uppercase tracking-wide text-slate-400 sm:w-28 sm:flex-none">
                                                    {spec.label}
                                                </dt>
                                                <dd className="font-sans text-xs font-medium text-slate-700 sm:text-right">
                                                    {spec.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <span className="font-mono text-[10px] text-slate-400">
                                        BATCH LOT INSPECTION
                                    </span>
                                    <Link
                                        to="/#contact"
                                        className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-800 transition-colors group-hover:text-orange-600"
                                    >
                                        <span>Quote Specs</span>
                                        <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {activeItems.length === 0 && (
                        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center">
                            <p className="font-display text-lg font-bold text-slate-800">
                                No catalogue match for "{searchQuery}"
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                We custom-manufacture non-standard fasteners according to CAD prints.
                            </p>
                            <Link
                                to="/#contact"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 font-mono text-xs font-bold text-white transition hover:bg-orange-600"
                            >
                                Request Custom Feasibility
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ========================================================== */}
            {/* 4. SPECIALIZED PROCESSES FOR CUSTOM COMPONENTS             */}
            {/* Dark industrial band showcasing micro-precision capability */}
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
                    <div className="max-w-2xl">
                        <SectionMark label="ADVANCED NON-TRADITIONAL MACHINING" tone="light" />
                        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Specialized Precision Manufacturing Processes
                        </h2>
                        <p className="mt-3 font-sans text-sm text-slate-300 sm:text-base leading-relaxed">
                            For geometries where conventional chip-forming is physically impossible, Solvoka
                            deploys non-traditional metallurgical machining and additive synthesis.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {processItems.map((item, idx) => (
                            <div
                                key={item.name}
                                className="relative flex flex-col justify-between border-t border-slate-800 pt-8"
                            >
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-xs font-bold text-orange-400">
                                            0{idx + 1}
                                        </span>
                                        <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-slate-300">
                                            {item.badge}
                                        </span>
                                    </div>

                                    <h3 className="mt-4 font-display text-xl font-bold text-white">
                                        {item.name}
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="font-mono text-[10px] text-slate-400">TOLERANCE:</span>
                                        <span className="font-mono text-xs font-semibold text-orange-300 tabular">
                                            {item.tolerance}
                                        </span>
                                    </div>

                                    <p className="mt-4 font-sans text-sm leading-relaxed text-slate-400">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-2 border-t border-slate-800/80 pt-4 font-mono text-xs text-slate-400">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" />
                                    <span>Certified CAD/CAM Workflow</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 5. SURFACE ENGINEERING, COATINGS & FINISHES                */}
            {/* Tactile swatch strip & technical resistance benchmarks      */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <SectionMark label="SURFACE PROTECTION" />
                            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Industrial Coatings &amp; Surface Treatments
                            </h2>
                            <p className="mt-4 font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
                                Component longevity is determined at the interface. We apply certified electroplating,
                                dip immersion, and fluoropolymer barriers formulated to survive extreme marine,
                                chemical, and high-torque mechanical operating environments.
                            </p>

                            <div className="mt-8 rounded-xl border border-slate-200 bg-[#FAF9F7] p-5">
                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    CORROSION TESTING STANDARDS
                                </span>
                                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                                    All plated and coated fasteners undergo continuous neutral salt spray (NSS) testing
                                    per <strong>ASTM B117 / ISO 9227</strong> with verified white-rust and red-rust
                                    prevention hours logged.
                                </p>
                            </div>
                        </div>

                        <div className="lg:col-span-7 space-y-4">
                            {detailedCoatings.map((coating) => (
                                <div
                                    key={coating.name}
                                    className="group rounded-xl border border-slate-200 p-5 transition-all hover:border-orange-300 hover:bg-orange-50/20"
                                >
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`h-3 w-3 rounded-full ${coating.colorCode} ring-2 ring-slate-200`}
                                            />
                                            <h3 className="font-display text-base font-bold text-slate-900">
                                                {coating.name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-3 font-mono text-xs">
                                            <span className="rounded bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                                                {coating.rating}
                                            </span>
                                            <span className="text-slate-400">Thk: {coating.thickness}</span>
                                        </div>
                                    </div>
                                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                                        <strong className="text-slate-700">Primary Applications: </strong>
                                        {coating.applications}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================== */}
            {/* 6. RFQ & CUSTOM MATERIAL FEASIBILITY SECTION               */}
            {/* Drafting-table design console (Preserves quote action)     */}
            {/* ========================================================== */}
            <section className="py-20 lg:py-28 bg-[#FAF9F7]">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-950 px-8 py-12 text-white shadow-2xl lg:px-16 lg:py-16">
                        {/* Background drafting ruler marks */}
                        <div
                            aria-hidden="true"
                            className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600"
                        />

                        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                            <div className="lg:col-span-7">
                                <div className="flex items-center gap-2.5">
                                    <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-400">
                                        CUSTOM ALLOY &amp; DRAWING VALIDATION
                                    </span>
                                </div>

                                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                                    Need A Non-Standard Alloy Or Custom Fastener?
                                </h2>

                                <p className="mt-4 font-sans text-base leading-relaxed text-slate-300">
                                    Upload your 2D engineering drawing (DWG, DXF, PDF) or native 3D CAD model
                                    (STEP, IGES, SLDPRT). Our metallurgy team validates alloy availability,
                                    yield tensile strength, and machine tooling feasibility within 24 hours.
                                </p>

                                <div className="mt-8 flex flex-wrap items-center gap-4">
                                    <Link
                                        to="/#contact"
                                        className="inline-flex items-center gap-3 rounded-lg bg-orange-600 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-950/50 transition-all duration-200 hover:bg-orange-500 hover:shadow-orange-700/40"
                                    >
                                        <span>Request Material Feasibility Quote</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <span className="font-mono text-xs text-slate-400">
                                        No minimum prototype order required
                                    </span>
                                </div>
                            </div>

                            <div className="lg:col-span-5 border-t border-slate-800 pt-8 lg:border-t-0 lg:border-l lg:border-slate-800 lg:pl-10 lg:pt-0">
                                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                    QUOTE GUARANTEES
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
