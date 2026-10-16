import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Search,
    FileText,
    Building2,
} from "lucide-react";
import { trackQuoteCtaClick } from "../utils/analytics";

/* ------------------------------------------------------------------ */
/* Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface BoltItem {
    id: string;
    category: "hook-bend" | "plate-stud" | "cages";
    name: string;
    standard: string;
    material: string;
    finish: string;
    sizeRange: string;
    description: string;
    specs: { label: string; val: string }[];
    badge?: string;
}

const boltItems: BoltItem[] = [
    {
        id: "type-l-anchor-bolt",
        category: "hook-bend",
        name: "Type L 90° Hook Foundation Bolts",
        standard: "ASTM F1554 (Grades 36, 55, 105) / DIN 529 Form B",
        material: "Carbon Steel, High-Tensile Micro-Alloy, or Alloy Steel",
        finish: "Hot-Dip Galvanized (ASTM A153), Zinc Flake (Geomet), or Black Oxide",
        sizeRange: "M16 to M64 (5/8\" to 2-1/2\" diameter) · Lengths up to 2,500 mm",
        description:
            "Standard 90-degree bent hook anchor bolt for structural column base plates, pre-engineered buildings (PEB), light poles, and machinery footings. Cold-bent or hot-bent with rolled threads for reduced stress notch sensitivity.",
        specs: [
            { label: "Thread Diameter", val: "M16 to M64 (Metric) / 5/8\" to 2-1/2\" (UNC)" },
            { label: "Hook Length", val: "3D to 5D standard bend hook" },
            { label: "Thread Length", val: "100 mm to 300 mm standard (custom available)" },
            { label: "Matching Hardware", val: "Supplied with Grade A/DH Heavy Hex Nuts & F436 Washers" },
        ],
        badge: "Most Specified",
    },
    {
        id: "type-j-anchor-bolt",
        category: "hook-bend",
        name: "Type J Curved Hook Foundation Bolts",
        standard: "ASTM F1554 / DIN 529 Form D",
        material: "Medium Carbon Steel / High-Tensile Alloy",
        finish: "Hot-Dip Galvanized, Zinc Plated, or Self-Color",
        sizeRange: "M16 to M48 (5/8\" to 1-3/4\" diameter) · Lengths up to 2,000 mm",
        description:
            "Curved semicircular hook provides continuous mechanical grip in concrete footings without sharp stress concentrations, ideal for heavy steel portals and industrial crane runways.",
        specs: [
            { label: "Inside Radius", val: "1.5D to 2D smooth radius" },
            { label: "Hook Arc", val: "180-degree continuous return bend" },
            { label: "Yield Strength", val: "36 ksi (250 MPa) to 105 ksi (724 MPa)" },
            { label: "Applications", val: "Crane rails, industrial vibrating equipment, warehouse portals" },
        ],
    },
    {
        id: "plate-welded-anchor-bolt",
        category: "plate-stud",
        name: "Plate-Welded Anchor Studs with Back-Up Nuts",
        standard: "ASTM F1554 (Grade 36, 55, 105) / AWS D1.1",
        material: "High-Strength Structural Steel with Heavy Anchor Plate",
        finish: "Hot-Dip Galvanized (Full Body or Thread-Only HDG)",
        sizeRange: "M20 to M100 (3/4\" to 4\" diameter) · Lengths up to 4,000 mm",
        description:
            "Straight threaded rod with a heavy steel anchor plate welded or double-nutted at the embedment end. Delivers the highest pull-out breakout capacity in shallow concrete foundations where long hook embedment is impossible.",
        specs: [
            { label: "Plate Thickness", val: "12 mm to 50 mm square or circular anchor plate" },
            { label: "Thread Engagement", val: "Double-end threaded with bottom locking nut" },
            { label: "Weld Qualification", val: "CJP / PJP full structural weld per AWS D1.1" },
            { label: "Tensile Range", val: "Up to 1,200 kN ultimate tensile load per bolt" },
        ],
        badge: "Maximum Pull-Out",
    },
    {
        id: "double-end-threaded-studs",
        category: "plate-stud",
        name: "Heavy Double-End Threaded Foundation Studs",
        standard: "ASTM A193 B7 / ISO 898-1 (Grades 8.8, 10.9)",
        material: "Chromium-Molybdenum Alloy Steel (AISI 4140 / 42CrMo4)",
        finish: "Hot-Dip Galvanized, Zinc-Nickel, or Xylan Teflon Coated",
        sizeRange: "M24 to M90 (1\" to 3-1/2\" diameter) · Lengths up to 3,500 mm",
        description:
            "Fully or double-end threaded structural studs for chemical plants, offshore oil & gas modules, and petrochemical pump skids requiring extreme high-temperature and tensile fatigue endurance.",
        specs: [
            { label: "Steel Metallurgy", val: "Quenched & Tempered Cr-Mo Alloy" },
            { label: "Tensile Strength", val: "800 MPa (Grade 8.8) / 1,040 MPa (Grade 10.9 / B7)" },
            { label: "Charpy Toughness", val: "≥ 40 Joules at -40°C" },
            { label: "Coatings", val: "PTFE / Xylan 1070 for severe chemical & salt exposure" },
        ],
    },
    {
        id: "pipe-sleeve-anchor-bolt",
        category: "plate-stud",
        name: "Pipe Sleeve Adjustable Foundation Bolts",
        standard: "AISC Base Plate Guidelines / DIN 529",
        material: "Structural Anchor Stud with Seamless Steel Pipe Sleeve",
        finish: "HDG Anchor Stud with Primer-Coated or Galvanized Sleeve",
        sizeRange: "M20 to M64 diameter · Sleeve ID 2.5× to 3× Bolt Diameter",
        description:
            "Pre-installed foundation assembly with an empty annular sleeve cavity that permits up to 25 mm of lateral bolt adjustment to compensate for concrete pouring shifts before final non-shrink cementitious grouting.",
        specs: [
            { label: "Sleeve Type", val: "Heavy seamless pipe or corrugated corrugated metal tube" },
            { label: "Lateral Adjustment", val: "± 15 mm to ± 30 mm lateral play" },
            { label: "Grout Void", val: "100% fillable with non-shrink structural grout" },
            { label: "Applications", val: "Turbines, heavy rolling mills, precision CNC machine beds" },
        ],
    },
    {
        id: "wind-turbine-bolt-cages",
        category: "cages",
        name: "Pre-Assembled Wind Turbine Foundation Bolt Cages",
        standard: "IEC 61400 / EN 1090-2 / ASTM F1554 Gr 105",
        material: "High-Tensile Grade 10.9 / F1554 Gr 105 Studs with CNC Laser Template Rings",
        finish: "Hot-Dip Galvanized / Dacromet Coated Anchor Assemblies",
        sizeRange: "M36 to M48 diameter · 60 to 180 Bolts per Cage · 2.5m to 4.5m Cage Diameter",
        description:
            "Rigid, factory-assembled circular anchor bolt cages for utility-scale onshore wind turbine towers. Includes CNC-machined top and bottom circular template rings, PVC debonding sleeves, and pre-torqued anchor hardware.",
        specs: [
            { label: "Bolt Quantity", val: "64, 80, 112, 128, 160 bolts per ring cage" },
            { label: "Template Ring Precision", val: "CNC laser cut ± 1.0 mm bolt circle diameter (BCD)" },
            { label: "Debonding Sleeve", val: "HDPE protective sleeve for full free-stretch length" },
            { label: "Pre-Stress Tension", val: "Engineered for 70% proof load hydraulic pre-tensioning" },
        ],
        badge: "Wind Energy Tier-1",
    },
    {
        id: "transmission-tower-cages",
        category: "cages",
        name: "High-Mast & Transmission Tower Anchor Cages",
        standard: "ASCE 10 / TIA-222-H / IS 5624",
        material: "ASTM F1554 Grade 55 & 105 / IS 2062 Structural Steel",
        finish: "100% Hot-Dip Galvanized per ASTM A153",
        sizeRange: "M24 to M56 · 4, 8, 12, or 16-bolt square or octagonal cages",
        description:
            "Pre-fabricated square and octagonal foundation cages for high-voltage power transmission line towers, highway lighting masts, and telecom monopoles designed to resist high overturning moments.",
        specs: [
            { label: "Cage Configurations", val: "4-bolt, 8-bolt, 12-bolt square and polygon templates" },
            { label: "Anchor Studs", val: "F1554 Grade 55 (weldable) with heavy plate foot" },
            { label: "Ground Clearance", val: "Double nut leveling system with heavy baseline washers" },
            { label: "Corrosion Warranty", val: "Heavy HDG coating (≥ 85 µm) for 50-year soil life" },
        ],
    },
    {
        id: "heavy-hex-nuts-washers",
        category: "cages",
        name: "Matching Heavy Hex Nuts & F436 Hardened Washers",
        standard: "ASTM A563 Grade DH / ASTM A194 2H / ASTM F436",
        material: "Heat-Treated Medium Carbon & Quenched Alloy Steel",
        finish: "Hot-Dip Galvanized (Overtapped 0.4 mm per ASTM A563) or Black",
        sizeRange: "M16 to M100 (5/8\" to 4\" thread sizes)",
        description:
            "Heavy structural hex nuts and extra-thick through-hardened flat washers certified to withstand the full proof load of high-tensile anchor bolts without thread stripping or dishing under high torque.",
        specs: [
            { label: "Nut Height", val: "Full heavy hex pattern (height equals nominal bolt diameter)" },
            { label: "Proof Load Stress", val: "175,000 psi (1,200 MPa) proof load rating" },
            { label: "Washer Hardness", val: "Rockwell C 38 to 45 through-hardened" },
            { label: "Overtap Tolerance", val: "Gauged after HDG to prevent thread galling on-site" },
        ],
    },
];

const gradeComparison = [
    { grade: "ASTM F1554 Gr 36", yieldMpa: "248 MPa (36 ksi)", tensileMpa: "400 – 550 MPa", elong: "23%", weldable: "Yes (Standard)", typicalUse: "Light structural columns, signs, small buildings" },
    { grade: "ASTM F1554 Gr 55", yieldMpa: "380 MPa (55 ksi)", tensileMpa: "517 – 655 MPa", elong: "21%", weldable: "Yes (Supp. S1)", typicalUse: "Heavy steel structures, bridges, stadium columns" },
    { grade: "ASTM F1554 Gr 105", yieldMpa: "724 MPa (105 ksi)", tensileMpa: "860 – 1030 MPa", elong: "15%", weldable: "No (Heat Treated)", typicalUse: "Wind towers, seismic retrofits, high uplift columns" },
    { grade: "ISO 898-1 Class 8.8", yieldMpa: "640 MPa", tensileMpa: "800 – 1000 MPa", elong: "12%", weldable: "No", typicalUse: "Industrial machinery, high-tensile anchor plates" },
    { grade: "ISO 898-1 Class 10.9", yieldMpa: "900 MPa", tensileMpa: "1040 – 1200 MPa", elong: "9%", weldable: "No", typicalUse: "Heavy turbine cages, petrochemical reactors" },
    { grade: "Stainless AISI 316", yieldMpa: "240 – 450 MPa", tensileMpa: "600 – 800 MPa", elong: "30%", weldable: "Yes (Austenitic)", typicalUse: "Marine sea jetties, wastewater, chemical footings" },
];

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function FoundationBoltsPage() {
    const [selectedCategory, setSelectedCategory] = useState<"all" | "hook-bend" | "plate-stud" | "cages">("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        document.title = "Foundation Bolts & Anchor Assemblies | ASTM F1554 Gr 36, 55, 105 | Solvoka";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute(
                "content",
                "Manufacturer of heavy-duty foundation anchor bolts, L-type, J-type, plate-welded studs, and wind turbine anchor cages compliant with ASTM F1554, ISO 898-1, and DIN 529."
            );
        }
    }, []);

    const filteredItems = useMemo(() => {
        return boltItems.filter((item) => {
            const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.sizeRange.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="bg-white text-slate-900">
            {/* ============================================================== */}
            {/* HERO SECTION                                                  */}
            {/* ============================================================== */}
            <section className="relative overflow-hidden bg-slate-950 pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 text-white">
                <div
                    className="pointer-events-none absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 0)",
                        backgroundSize: "28px 28px",
                    }}
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[#2563eb]/20 blur-[120px]"
                    aria-hidden="true"
                />

                <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-widest text-[#2563eb] sm:text-sm font-semibold">
                            HEAVY STRUCTURAL ANCHORAGE // EMBEDDED FASTENERS
                        </span>
                        <span className="h-px w-6 bg-[#2563eb]" />
                    </div>

                    {/* Headline */}
                    <h1 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl lg:text-[52px] lg:leading-[1.12]">
                        Industrial Foundation Bolts &amp; Anchor Cages{" "}
                        <span className="block text-[#2563eb]">
                            Engineered for Extreme Shear, Overturning &amp; Uplift.
                        </span>
                    </h1>

                    {/* Dimension Line */}
                    <div className="relative my-4 h-3 w-full max-w-[560px]" aria-hidden="true">
                        <span className="absolute left-0 top-0 h-3 w-[2px] bg-[#2563eb]" />
                        <span className="absolute right-0 top-0 h-3 w-[2px] bg-[#2563eb]" />
                        <span className="absolute left-0 right-0 top-[5px] h-[2px] bg-[#2563eb]" />
                    </div>

                    {/* Location */}
                    <p className="text-[12px] sm:text-[14px] uppercase tracking-[0.14em] text-[#2563eb] font-semibold">
                        Focal Point, Ludhiana, India · Heavy Fastener Exporter
                    </p>

                    {/* Subheadline */}
                    <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-300 sm:text-[16px] sm:leading-[1.6]">
                        Precision-manufactured L-type, J-type, plate-welded anchor studs, and pre-assembled foundation bolt cages for steel buildings, wind turbine foundations, highway gantries, and industrial equipment. Thread sizes from M16 up to M100 in ASTM F1554 Grades 36, 55, and 105.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Link
                            to="/#quote"
                            onClick={() => trackQuoteCtaClick("hero_foundation_bolts")}
                            className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-6 text-[15px] font-bold text-white shadow-lg shadow-[#2563eb]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-[#2563eb]/40"
                        >
                            <span>Request Foundation Bolt RFQ</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="#products"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 bg-slate-900/60 px-6 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-slate-950"
                        >
                            View All Configurations
                        </a>
                    </div>

                    {/* Trust Chips */}
                    <ul className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>ASTM F1554 Gr 36, 55 &amp; 105</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>M16 to M100 (5/8" to 4") Range</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>Lengths up to 4.0 Meters</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>Hot-Dip Galvanized ASTM A153</span>
                        </li>
                    </ul>

                    {/* Stats Strip */}
                    <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-4 lg:gap-6">
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">M16 – M100</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Metric &amp; Imperial Sizes</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">105 ksi</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">High-Yield Alloy Available</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">Up to 4.0 m</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Continuous Anchor Length</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">Rolled Threads</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Enhanced Fatigue Resistance</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* PRODUCT CATALOGUE & FILTERING                                  */}
            {/* ============================================================== */}
            <section id="products" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                                <Building2 className="h-4 w-4" />
                                <span>STRUCTURAL ANCHORAGE CATALOGUE</span>
                            </div>
                            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                                Foundation Anchor Bolts, Studs &amp; Cage Assemblies
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                Custom manufactured to project CAD blueprints, civil engineering schedules, and international ASTM / DIN / ISO standards.
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search L-bolt, cage, F1554..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-xs focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                        {[
                            { key: "all", label: "All Foundation Bolts", count: boltItems.length },
                            { key: "hook-bend", label: "L & J Hook Anchors", count: boltItems.filter((i) => i.category === "hook-bend").length },
                            { key: "plate-stud", label: "Plate-Welded & Studs", count: boltItems.filter((i) => i.category === "plate-stud").length },
                            { key: "cages", label: "Anchor Cages & Hardware", count: boltItems.filter((i) => i.category === "cages").length },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setSelectedCategory(tab.key as any)}
                                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                                    selectedCategory === tab.key
                                        ? "bg-[#2563eb] text-white shadow-sm"
                                        : "bg-white text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200"
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${selectedCategory === tab.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Product Cards Grid */}
                    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-md"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#2563eb]">
                                            {item.standard}
                                        </span>
                                        {item.badge && (
                                            <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 border border-indigo-200/60">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                                        {item.name}
                                    </h3>

                                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                                        {item.description}
                                    </p>

                                    <div className="mt-4 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                                        <div className="text-[11px] font-bold text-slate-900">
                                            {item.sizeRange}
                                        </div>
                                        <div className="mt-1 text-[10px] text-slate-500">
                                            Material: {item.material}
                                        </div>
                                        <div className="mt-0.5 text-[10px] text-slate-500">
                                            Finish: {item.finish}
                                        </div>
                                    </div>

                                    <dl className="mt-4 space-y-2 border-t border-slate-100 pt-3">
                                        {item.specs.map((s) => (
                                            <div key={s.label} className="flex justify-between text-[11px]">
                                                <dt className="text-slate-500">{s.label}</dt>
                                                <dd className="font-semibold text-slate-800 text-right">{s.val}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>

                                <div className="mt-6 flex items-center justify-end border-t border-slate-100 pt-4">
                                    <Link
                                        to="/#quote"
                                        onClick={() => trackQuoteCtaClick(`product_${item.id}`)}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] transition-colors hover:text-blue-700"
                                    >
                                        <span>Quote Specs for {item.name.split(" ")[0]}</span>
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
                            <p className="text-base font-bold text-slate-700">No foundation bolts match "{searchQuery}"</p>
                            <p className="mt-1 text-xs text-slate-500">We bend, weld, and thread custom foundation anchors up to M100 directly from your CAD foundation drawings.</p>
                            <Link
                                to="/#quote"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-600"
                            >
                                Submit Custom Foundation Drawing
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ============================================================== */}
            {/* ASTM F1554 & ISO 898-1 GRADE LEDGER                            */}
            {/* ============================================================== */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                            <FileText className="h-4 w-4" />
                            <span>METALLURGICAL PROPERTY MATRIX</span>
                        </div>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                            ASTM F1554 &amp; ISO 898-1 Anchor Grade Comparison
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            ASTM F1554 is the premier North American structural standard for anchor bolts embedded in concrete. Solvoka manufactures all three F1554 grades alongside ISO 898-1 high-tensile specifications.
                        </p>
                    </div>

                    <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                        <table className="w-full min-w-[750px] text-left text-xs">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Specification Grade</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Min. Yield Strength</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Tensile Strength Range</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Elongation %</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Weldability</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Typical Civil Application</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {gradeComparison.map((row, idx) => (
                                    <tr key={row.grade} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                                        <td className="py-3 px-4 font-bold text-slate-900">
                                            <span className="rounded bg-blue-50 px-2 py-0.5 font-bold text-[#2563eb]">
                                                {row.grade}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-slate-900 tabular">{row.yieldMpa}</td>
                                        <td className="py-3 px-4 text-slate-700 tabular">{row.tensileMpa}</td>
                                        <td className="py-3 px-4 text-slate-600 tabular">{row.elong}</td>
                                        <td className="py-3 px-4 font-medium text-slate-800">{row.weldable}</td>
                                        <td className="py-3 px-4 text-slate-600">{row.typicalUse}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* THREAD ROLLING & ANTI-CORROSION ENGINEERING                    */}
            {/* ============================================================== */}
            <section className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                                <ShieldCheck className="h-4 w-4" />
                                <span>STRUCTURAL INTEGRITY &amp; THREADING</span>
                            </div>
                            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                                Cold-Rolled Threads for Unbroken Metallurgical Grain Flow
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-slate-300">
                                Foundation bolts are subjected to intense cyclical wind overturning and seismic fatigue. Thread production method directly dictates service life:
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Cold Rolled Threads vs Cut Threads</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">Thread rolling displaces rather than cuts steel fibers, producing continuous root grain contour that increases dynamic fatigue endurance by up to 30% over machine-cut threads.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Hot-Dip Galvanizing with Thread Cleanliness</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">Anchor studs are centrifuged post-galvanizing to prevent excess zinc puddling in thread roots. Mating heavy hex nuts are overtapped to ASTM A563 specifications for smooth on-site assembly.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Laser Verified Template Rings</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">Wind turbine and transmission tower bolt cages are pre-assembled using CNC laser cut template plates, guaranteeing exact pitch circle diameter (PCD) alignment before container departure.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cage Specs Card */}
                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-xl">
                            <h3 className="text-lg font-bold text-white">Complete Anchor Assembly Kits</h3>
                            <p className="mt-2 text-xs text-slate-400">
                                Supplied fully assembled or knockdown packed with verified hardware matching:
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Nut &amp; Washer Sets</div>
                                    <div className="mt-1 text-slate-400">2 to 4 heavy hex nuts + 2 F436 hardened flat washers per stud.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Thread Protection</div>
                                    <div className="mt-1 text-slate-400">Heavy-duty plastic thread caps to protect threads during concrete pour.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Template Rigging</div>
                                    <div className="mt-1 text-slate-400">Steel top and bottom template plates for zero-error installation.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Full Export Dossier</div>
                                    <div className="mt-1 text-slate-400">Certificate of Origin, Mill Test Reports, Coating Thickness Certs.</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-semibold text-slate-400">Container Port</div>
                                    <div className="text-sm font-bold text-white">Mundra Port / Nhava Sheva (JNPT)</div>
                                </div>
                                <Link
                                    to="/#quote"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 transition"
                                >
                                    Inquire Foundation Bolts
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* CALL TO ACTION                                                 */}
            {/* ============================================================== */}
            <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
                <div className="mx-auto max-w-5xl px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                        Preparing Base Plate Prints for an Upcoming Heavy Project?
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
                        Send us your foundation bolt schedules, diameter requirements, and delivery schedules. Solvoka provides complete pricing, CAD shop drawings, and export container plans within 24 hours.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/#quote"
                            onClick={() => trackQuoteCtaClick("bottom_cta_foundation_bolts")}
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-8 text-sm font-bold text-white shadow-md hover:bg-blue-600 transition"
                        >
                            <span>Request RFQ for Foundation Bolts</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            to="/contact-us"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
                        >
                            Contact Engineering Desk
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
