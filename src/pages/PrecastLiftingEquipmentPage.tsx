import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Search,
    FileText,
    Anchor,
} from "lucide-react";
import { trackQuoteCtaClick } from "../utils/analytics";

/* ------------------------------------------------------------------ */
/* Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface LiftingItem {
    id: string;
    category: "spherical" | "spread" | "sockets-channels";
    name: string;
    standard: string;
    material: string;
    finish: string;
    wll: string;
    description: string;
    specs: { label: string; val: string }[];
    badge?: string;
}

const liftingItems: LiftingItem[] = [
    {
        id: "spherical-head-anchor",
        category: "spherical",
        name: "Spherical Head Foot Anchors",
        standard: "OSHA 1926.704 / EN 13155 / AS 3850",
        material: "Hot-Forged High-Toughness Carbon Alloy Steel 20Mn2 / Q345D",
        finish: "Self-Color, Black Oxide, or Hot-Dip Galvanized",
        wll: "Working Load Limit: 1.3T, 2.5T, 5.0T, 7.5T, 10.0T, 15.0T, 20.0T, 32.0T",
        description:
            "Hot-forged round lifting head with integral forged foot anchor. The hemispherical head matches precisely into lifting ring clutches for 360-degree crane hoisting without binding or lateral slippage.",
        specs: [
            { label: "Capacity Range", val: "1.3 Ton to 32.0 Ton WLL" },
            { label: "Overall Lengths", val: "65 mm to 500 mm embedment depth" },
            { label: "Design Safety Factor", val: "3:1 in concrete / 5:1 in steel tensile" },
            { label: "Impact Toughness", val: "Charpy V-Notch ≥ 27 J at -20°C" },
        ],
        badge: "Industry Standard",
    },
    {
        id: "lifting-ring-clutch",
        category: "spherical",
        name: "Heavy-Duty Lifting Ring Clutches",
        standard: "EN 13155 / ASME B30.20",
        material: "Cast / Forged High-Alloy Steel with Hardened Locking Latch",
        finish: "Electro-Galvanized with Powder Coated Safety Identification",
        wll: "Proof Loaded to 2.5× WLL (1.3T, 2.5T, 5.0T, 10.0T, 20.0T, 32.0T)",
        description:
            "Quick-release lifting clutch designed to engage spherical head anchors. The forged curved safety latch rotates over the anchor head, ensuring fail-safe positive lock during vertical hoisting, yard transport, and 90° tilting.",
        specs: [
            { label: "Matching Anchor", val: "Spherical Head Anchors 1.3T to 32.0T" },
            { label: "Proof Load Testing", val: "100% individual proof tested to 2.5× WLL" },
            { label: "NDT Inspection", val: "100% Magnetic Particle Inspected (MPI)" },
            { label: "Safety Latch", val: "Drop-forged spring-assisted safety tongue" },
        ],
        badge: "100% Proof Tested",
    },
    {
        id: "rubber-recess-formers",
        category: "spherical",
        name: "Rubber Recess Formers & Magnetic Base Plugs",
        standard: "ISO 9001 / Precast Mould Specs",
        material: "High-Durometer Elastomer Rubber & Neodymium Magnetic Core",
        finish: "Oil-Resistant Vulcanized Rubber with Threaded Steel Core",
        wll: "Fits 1.3T to 32.0T Anchor Heads",
        description:
            "Hemispherical formers mounted directly to timber or steel precast side forms. Creates the exact concave recess in wet concrete required for flush clutch engagement. Magnetic base models allow boltless installation on steel casting beds.",
        specs: [
            { label: "Sizes Available", val: "1.3T, 2.5T, 5.0T, 7.5T/10.0T, 15T/20T, 32T" },
            { label: "Reusability", val: "Up to 50+ casting cycles" },
            { label: "Magnetic Pull Force", val: "Over 120 kg holding power (magnetic models)" },
            { label: "Release Oil Resistance", val: "Chemical-resistant to all commercial form release agents" },
        ],
    },
    {
        id: "two-hole-spread-anchor",
        category: "spread",
        name: "Two-Hole Flat Spread Anchors",
        standard: "DIN EN 13155 / AS 3850",
        material: "High-Tensile Structural Steel Q355B / St52-3",
        finish: "Hot-Dip Galvanized or Zinc Plated",
        wll: "Working Load: 1.4T, 2.5T, 5.0T, 7.5T, 10.0T",
        description:
            "Flat stamped and forged plate anchors engineered for thin precast slabs, concrete panels, pipes, and beams where shallow embedment depth is mandatory. Lower hole accepts supplementary rebar for added shear distribution.",
        specs: [
            { label: "Thickness", val: "6 mm to 20 mm high-yield steel plate" },
            { label: "Embedment Depth", val: "90 mm to 400 mm" },
            { label: "Safety Margin", val: "3:1 concrete cone failure margin" },
            { label: "Applications", val: "Floor slabs, culverts, lightweight wall panels" },
        ],
    },
    {
        id: "tilt-up-erection-anchor",
        category: "spread",
        name: "Tilt-Up Erection Anchors with Shear Notches",
        standard: "OSHA 1926.704 / AS 3850",
        material: "Alloy Steel with Integral Side Shear Notches",
        finish: "Self-Color or Hot-Dip Galvanized",
        wll: "Working Load: 1.4T to 10.0T (Angled & Edge Lift)",
        description:
            "Engineered specifically for tilt-up wall panels that are cast horizontally and rotated 90 degrees during site erection. Dual shear notches engage tension reinforcement to prevent concrete edge spalling during lateral pull.",
        specs: [
            { label: "Lifting Directions", val: "0° to 90° full rotation without capacity drop" },
            { label: "Shear Bar Notch", val: "Pre-formed seat for hairpin rebar tie" },
            { label: "Edge Distance", val: "Rated for thin precast down to 100 mm thickness" },
            { label: "Certification", val: "Batch stamped with WLL and heat ID" },
        ],
        badge: "Tilt-Up Certified",
    },
    {
        id: "plate-spread-anchor",
        category: "spread",
        name: "Plate Spread Anchors with Welded Base",
        standard: "EN 13155",
        material: "Structural Steel with Welded Foot Plate",
        finish: "Zinc Plated or Self-Color",
        wll: "Working Load: 2.5T, 5.0T, 7.5T, 10.0T",
        description:
            "Heavy flat anchor with a welded bottom anchor plate that provides huge bearing area inside low-strength green concrete, enabling early mold stripping without anchor pull-out.",
        specs: [
            { label: "Base Plate", val: "50 × 50 mm to 100 × 100 mm welded foot" },
            { label: "Stripping Strength", val: "Usable in concrete as low as 15 MPa" },
            { label: "Weld Inspection", val: "100% full-penetration fillet weld tested" },
            { label: "Applications", val: "Heavy precast box culverts, retaining wall blocks" },
        ],
    },
    {
        id: "threaded-lifting-sockets",
        category: "sockets-channels",
        name: "Cast-In Threaded Lifting Sockets & Wavy Tail Inserts",
        standard: "DIN 13 / DIN 405 (Rd-Thread)",
        material: "Precision Seamless Steel Tube with Forged End / Rebar Cross-Hole",
        finish: "Zinc Plated or Stainless Steel (SS304 / SS316)",
        wll: "Working Load: 0.5T to 12.5T",
        description:
            "Internal threaded inserts cast flush into precast units. Available with standard Metric (M12–M52) or self-cleaning Round threads (Rd12–Rd52). Used with screw-in lifting loops or wire swivel eye bolts.",
        specs: [
            { label: "Thread System", val: "Metric (M12–M52) & Round (Rd12–Rd52)" },
            { label: "End Configurations", val: "Cross-pin hole, flat foot, wavy crimped tail" },
            { label: "Stainless Option", val: "AISI 316 for architectural exposed facades" },
            { label: "Cap Plugs", val: "Supplied with plastic dust/slurry protection caps" },
        ],
    },
    {
        id: "anchor-c-channels",
        category: "sockets-channels",
        name: "Toothed Cast-In Anchor Channels (C-Channels)",
        standard: "ETA-09/0338 / EN 1992-4",
        material: "Cold-Formed & Hot-Rolled Low Alloy Steel with Welded I-Anchors",
        finish: "Hot-Dip Galvanized (≥ 55 µm) or Stainless Steel A4",
        wll: "Tensile & Shear Capacity: 12 kN to 55 kN per anchor",
        description:
            "Serrated anchor channels cast directly into concrete columns, beams, and slabs. Provides fully adjustable, drilling-free fixing for curtain walls, elevator guide rails, and MEP utility piping.",
        specs: [
            { label: "Profiles", val: "28/15, 38/17, 40/22, 50/30, 52/34, 72/48" },
            { label: "Channel Lengths", val: "150 mm, 300 mm, 350 mm up to 6,000 mm" },
            { label: "Anchor Studs", val: "Welded round I-studs at 200 mm centers" },
            { label: "Toothed Profile", val: "Longitudinal slip resistance for high seismic zones" },
        ],
        badge: "Drill-Free Fixing",
    },
    {
        id: "t-head-bolts-nuts",
        category: "sockets-channels",
        name: "High-Tensile T-Head Bolts for Anchor Channels",
        standard: "ISO 898-1 (Grade 4.6 & 8.8)",
        material: "High-Tensile Alloy Steel / Stainless Steel A2 & A4",
        finish: "Hot-Dip Galvanized, Zinc Flake (Geomet), or Zinc Plated",
        wll: "Matched to channel working loads (M10 to M24)",
        description:
            "Hammer-head and hook-head bolts engineered to slide into cast-in channels and lock securely with a 90-degree twist. Notch on bolt end indicates locked orientation inside channel slot.",
        specs: [
            { label: "Thread Sizes", val: "M10, M12, M16, M20, M24" },
            { label: "Bolt Lengths", val: "30 mm to 150 mm" },
            { label: "Strength Class", val: "Grade 4.6 and Grade 8.8" },
            { label: "Lock Indicator", val: "Alignment notch stamped on shank tail" },
        ],
    },
];

const loadMatrix = [
    { size: "1.3 Ton", anchorLen: "65 – 120 mm", minConc: "15 MPa", wllAxial: "13 kN", wllShear: "10 kN", breakLoad: "65 kN" },
    { size: "2.5 Ton", anchorLen: "85 – 170 mm", minConc: "15 MPa", wllAxial: "25 kN", wllShear: "20 kN", breakLoad: "125 kN" },
    { size: "5.0 Ton", anchorLen: "120 – 240 mm", minConc: "20 MPa", wllAxial: "50 kN", wllShear: "40 kN", breakLoad: "250 kN" },
    { size: "7.5 Ton", anchorLen: "160 – 300 mm", minConc: "25 MPa", wllAxial: "75 kN", wllShear: "60 kN", breakLoad: "375 kN" },
    { size: "10.0 Ton", anchorLen: "200 – 340 mm", minConc: "25 MPa", wllAxial: "100 kN", wllShear: "80 kN", breakLoad: "500 kN" },
    { size: "15.0 Ton", anchorLen: "250 – 400 mm", minConc: "25 MPa", wllAxial: "150 kN", wllShear: "120 kN", breakLoad: "750 kN" },
    { size: "20.0 Ton", anchorLen: "300 – 500 mm", minConc: "30 MPa", wllAxial: "200 kN", wllShear: "160 kN", breakLoad: "1,000 kN" },
    { size: "32.0 Ton", anchorLen: "500 – 700 mm", minConc: "35 MPa", wllAxial: "320 kN", wllShear: "260 kN", breakLoad: "1,600 kN" },
];

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PrecastLiftingEquipmentPage() {
    const [selectedCategory, setSelectedCategory] = useState<"all" | "spherical" | "spread" | "sockets-channels">("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        document.title = "Pre-Casted Lifting Equipments | Spherical Head Anchors & Clutches | Solvoka";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute(
                "content",
                "Certified precast lifting anchors, spherical head foot anchors (1.3T-32T), lifting ring clutches, spread anchors, and cast-in channels compliant with OSHA 1926.704 and EN 13155."
            );
        }
    }, []);

    const filteredItems = useMemo(() => {
        return liftingItems.filter((item) => {
            const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.wll.toLowerCase().includes(searchQuery.toLowerCase());
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
                            PRECAST CONCRETE RIGGING &amp; ERECTION SYSTEMS
                        </span>
                        <span className="h-px w-6 bg-[#2563eb]" />
                    </div>

                    {/* Headline */}
                    <h1 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl lg:text-[52px] lg:leading-[1.12]">
                        Certified Pre-Casted Lifting Equipment{" "}
                        <span className="block text-[#2563eb]">
                            with 5:1 Safety Margins &amp; Full Traceability.
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
                        Focal Point, Ludhiana, India · Heavy Precast Systems Exporter
                    </p>

                    {/* Subheadline */}
                    <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-300 sm:text-[16px] sm:leading-[1.6]">
                        Engineered for the critical handling, tilting, yard storage, and site crane erection of heavy precast concrete elements. Hot-forged spherical head anchors from 1.3T to 32T, proof-tested ring clutches, tilt-up erection anchors, threaded sockets, and cast-in toothed anchor channels compliant with OSHA 1926.704 and EN 13155.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Link
                            to="/#quote"
                            onClick={() => trackQuoteCtaClick("hero_precast_lifting")}
                            className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-6 text-[15px] font-bold text-white shadow-lg shadow-[#2563eb]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-[#2563eb]/40"
                        >
                            <span>Request Lifting Rigging RFQ</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="#products"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 bg-slate-900/60 px-6 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-slate-950"
                        >
                            Explore 1.3T – 32T Systems
                        </a>
                    </div>

                    {/* Trust Chips */}
                    <ul className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>OSHA 1926.704 &amp; EN 13155</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>1.3T to 32.0T Working Load Range</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>100% MPI &amp; 2.5× Proof Load Tested</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>Batch Heat &amp; WLL Stamped Directly</span>
                        </li>
                    </ul>

                    {/* Stats Strip */}
                    <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-4 lg:gap-6">
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">1.3T – 32T</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Standard WLL Capacities</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">5:1 Factor</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Design Safety Margin</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">100% MPI</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Magnetic Particle NDT</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">2.5× Proof</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Load Testing on Clutches</div>
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
                                <Anchor className="h-4 w-4" />
                                <span>RIGGING &amp; ANCHORAGE CATALOGUE</span>
                            </div>
                            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                                Precast Lifting Anchors, Clutches &amp; Inserts
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                Certified lifting hardware for precast beams, bridge girders, tilt-up architectural walls, box culverts, and concrete tunnel segments.
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search anchors, clutches, WLL..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-xs focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                            />
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                        {[
                            { key: "all", label: "All Lifting Equipment", count: liftingItems.length },
                            { key: "spherical", label: "Spherical Head & Clutches", count: liftingItems.filter((i) => i.category === "spherical").length },
                            { key: "spread", label: "Spread & Tilt-Up Anchors", count: liftingItems.filter((i) => i.category === "spread").length },
                            { key: "sockets-channels", label: "Sockets & Cast-In Channels", count: liftingItems.filter((i) => i.category === "sockets-channels").length },
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
                                            <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
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
                                        <div className="text-[11px] font-bold text-[#2563eb]">
                                            {item.wll}
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
                            <p className="text-base font-bold text-slate-700">No lifting components match "{searchQuery}"</p>
                            <p className="mt-1 text-xs text-slate-500">We forge and machine custom lifting eyes, anchors, and brackets to client CAD specifications.</p>
                            <Link
                                to="/#quote"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-600"
                            >
                                Submit Custom Lifting Requirement
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ============================================================== */}
            {/* SPHERICAL ANCHOR LOAD MATRIX TABLE                            */}
            {/* ============================================================== */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                            <FileText className="h-4 w-4" />
                            <span>CERTIFIED LOAD ENVELOPE</span>
                        </div>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                            Spherical Head Foot Anchor Load Chart
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Safe working loads apply across straight vertical hoist and 90-degree shear lifting when installed with proper edge distance and supplementary reinforcement per OSHA 1926.704.
                        </p>
                    </div>

                    <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                        <table className="w-full min-w-[700px] text-left text-xs">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">System Rating</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Embedment Lengths</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Min. Concrete Cube</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Axial Working Load (WLL)</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Shear Working Load (WLL)</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Ultimate Break Proof</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {loadMatrix.map((row, idx) => (
                                    <tr key={row.size} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                                        <td className="py-3 px-4 font-bold text-slate-900">{row.size}</td>
                                        <td className="py-3 px-4 text-slate-600">{row.anchorLen}</td>
                                        <td className="py-3 px-4 font-medium text-slate-700">
                                            <span className="rounded bg-blue-50 px-2 py-0.5 font-semibold text-[#2563eb]">
                                                {row.minConc}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-slate-900 tabular">{row.wllAxial}</td>
                                        <td className="py-3 px-4 font-semibold text-slate-900 tabular">{row.wllShear}</td>
                                        <td className="py-3 px-4 font-bold text-[#2563eb] tabular">{row.breakLoad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* SAFETY & NDT TESTING PROTOCOL                                  */}
            {/* ============================================================== */}
            <section className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                                <ShieldCheck className="h-4 w-4" />
                                <span>CRITICAL RIGGING SAFETY ASSURANCE</span>
                            </div>
                            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                                100% Inspected for High-Consequence Lifting Operations
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-slate-300">
                                Lifting precast panels over workers and active roadways leaves zero margin for metallurgical error. Solvoka enforces strict European and American safety protocols:
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">100% Magnetic Particle Inspection (MPI)</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">Every forged lifting clutch and heavy foot anchor is examined under fluorescent magnetic particle illumination to verify zero surface cracks, seams, or forging laps.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">2.5× WLL Proof Load Test on Every Clutch</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">Before packaging, 100% of lifting clutches are loaded on our calibrated hydraulic test bed to 2.5 times their safe working load limit without permanent deformation.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Direct Steel Stamping &amp; Traceability</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">The manufacturer mark, safe working load limit (e.g. 5.0T), and production heat number are permanently stamped directly into the forged steel body.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Export & Compliance Card */}
                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-xl">
                            <h3 className="text-lg font-bold text-white">Precast Rigging Hardware Compliance</h3>
                            <p className="mt-2 text-xs text-slate-400">
                                Supplied with comprehensive technical documentation for structural project engineers and OSHA site compliance:
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">OSHA 1926.704</div>
                                    <div className="mt-1 text-slate-400">Complies with 3:1 safety factor for anchors and 5:1 for clutches.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">EN 13155 Compliance</div>
                                    <div className="mt-1 text-slate-400">CE marking for non-fixed load lifting attachments.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Batch Proof Certificate</div>
                                    <div className="mt-1 text-slate-400">Individual proof load certificate issued with every shipment.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Export Packaging</div>
                                    <div className="mt-1 text-slate-400">Reinforced steel strapping, moisture-barrier wrapping, ISPM-15 crates.</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-semibold text-slate-400">Direct Export Port</div>
                                    <div className="text-sm font-bold text-white">Mundra Port / Nhava Sheva (JNPT)</div>
                                </div>
                                <Link
                                    to="/#quote"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 transition"
                                >
                                    Inquire Precast Rigging
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
                        Equipping a New Precast Yard or Bridge Girding Project?
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
                        Share your precast element weights, lift angles, and mold types. Solvoka engineers provide full anchor capacity calculations, rubber former sets, and containerized pricing within 24 hours.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/#quote"
                            onClick={() => trackQuoteCtaClick("bottom_cta_precast_lifting")}
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-8 text-sm font-bold text-white shadow-md hover:bg-blue-600 transition"
                        >
                            <span>Request RFQ for Precast Lifting Gear</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            to="/contact-us"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
                        >
                            Speak with Rigging Engineers
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
