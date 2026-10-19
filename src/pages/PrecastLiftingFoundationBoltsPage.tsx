import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Search,
    LayoutGrid,
    Table as TableIcon,
    FileText,
    Layers,
    ShieldCheck,
    Settings,
    X,
    Maximize2,
} from "lucide-react";
import { trackQuoteCtaClick } from "../utils/analytics";

interface PrecastFoundationItem {
    id: string;
    name: string;
    category: "all" | "anchors" | "rigging" | "bolts";
    categoryLabel: string;
    image: string;
    application: string;
    features: string[];
    standardFinish: string;
}

const precastFoundationItems: PrecastFoundationItem[] = [
    {
        id: "lifting-eye-anchors",
        name: "Lifting eye anchors",
        category: "anchors",
        categoryLabel: "Lifting Anchors",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Lifting%20Eye%20Anchors.webp",
        application: "Through-bar tension distribution in thin precast panels & beams",
        features: ["Drop-forged base rebar eyelet allows continuous steel keying", "5:1 ultimate safety ratio for overhead hoisting"],
        standardFinish: "Drop-Forged 20Mn2 / Black Oxide or Hot-Dip Galvanised",
    },
    {
        id: "erection-anchors",
        name: "Erection Anchors",
        category: "anchors",
        categoryLabel: "Erection Systems",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Erection%20Anchors.webp",
        application: "Tilt-up wall panel edge lifts and 90° rotation operations",
        features: ["Dual lateral shear notches prevent concrete blowout", "Locked foot geometry seats firmly in edge reinforcement"],
        standardFinish: "Structural Alloy Steel Q345B / Hot-Dip Galvanised",
    },
    {
        id: "anchors",
        name: "Anchors",
        category: "anchors",
        categoryLabel: "Lifting Anchors",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Anchors.webp",
        application: "Cast-in inserts for modular precast boxes, barriers & culverts",
        features: ["Positive mechanical concrete interlock", "Wavy-tail and straight stud embedment profiles"],
        standardFinish: "Electro-Galvanised / Passivated High-Tensile Steel",
    },
    {
        id: "u-anchor",
        name: "U-Anchor",
        category: "anchors",
        categoryLabel: "Lifting Loops",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/U-Anchor.webp",
        application: "Embedded lifting loops for slabs, pipes, and utility culverts",
        features: ["High-tensile wire strand loop with embossed capacity tag", "Flexible geometry allows recessing or bend-down flush"],
        standardFinish: "Zinc Plated High-Tensile Steel Wire",
    },
    {
        id: "spherical-head-lifting-anchor",
        name: "Spherical-Head-Lifting Anchor",
        category: "anchors",
        categoryLabel: "Lifting Anchors",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Spherical-Head-Lifting%20Anchor.webp",
        application: "Rapid crane hook connection with universal ring clutches",
        features: ["Drop-forged spherical hemisphere engagement head", "Spread foot and plate foot options for concrete anchorage"],
        standardFinish: "Hot-Forged High-Strength Alloy 20Mn2",
    },
    {
        id: "hoist-ring",
        name: "Hoist Ring",
        category: "rigging",
        categoryLabel: "Rigging Hardware",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/WhatsApp_Image_2026-10-19_at_3.48.39_PM-removebg-preview.webp",
        application: "Multi-directional crane rigging lifts and 360-degree rotation",
        features: ["360° rotational swivel and 180° pivot bail action", "100% proof-load tested forged alloy steel components"],
        standardFinish: "Heat-Treated Alloy Steel with High-Vis Safety Coating",
    },
    {
        id: "heavy-duty-lifting-anchor-swivel-long-clevis-d",
        name: "Heavy-Duty Lifting Anchor Swivel Long Clevis D",
        category: "rigging",
        categoryLabel: "Rigging Hardware",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Heavy-Duty%20Lifting%20Anchor%20Swivel%20Long%20Clevis%20D.webp",
        application: "Heavy civil precast lifting connections with long clevis pin",
        features: ["Extended throat depth for wide anchor clearance", "Captive high-shear safety pin and secure cotter locking"],
        standardFinish: "Drop-Forged High-Strength Steel / Hot-Dip Galvanised",
    },
    {
        id: "l-bolt",
        name: "L-Bolt",
        category: "bolts",
        categoryLabel: "Foundation Bolts",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Galvanized_L-Bolt_Hardware_on_White-removebg-preview.webp",
        application: "Embedded 90-degree bent hook anchoring for columns & footings",
        features: ["90° mechanical hook leg resists vertical pullout", "Precision cut or rolled threads for heavy nut engagement"],
        standardFinish: "Grade 4.6 / 8.8 Galvanised or Plain Carbon Steel",
    },
    {
        id: "j-bolt",
        name: "J-Bolt",
        category: "bolts",
        categoryLabel: "Foundation Bolts",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/J-Bolt.webp",
        application: "Hooked embedment in structural concrete foundation slabs",
        features: ["Smooth curved J-hook geometry prevents stress concentration", "Supplied with heavy hex nuts and wide flat washers"],
        standardFinish: "Hot-Dip Galvanised / High-Tensile Zinc Plated",
    },
    {
        id: "heavy-duty-foundation-bolt-with-stiffner-plate",
        name: "Heavy-Duty Foundation Bolt with Stiffner Plate",
        category: "bolts",
        categoryLabel: "Foundation Bolts",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Heavy-Duty%20Foundation%20Bolt%20with%20Stiffner%20Plate.webp",
        application: "Structural column bases, transmission towers & bridge piers",
        features: ["Welded bottom stiffener plate for immense tension anchorage", "Complete cage assembly with double leveling nuts"],
        standardFinish: "Hot-Dip Galvanised Structural Grade 8.8 / 10.9",
    },
];

export default function PrecastLiftingFoundationBoltsPage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<"all" | "anchors" | "rigging" | "bolts">("all");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const [activeModalItem, setActiveModalItem] = useState<PrecastFoundationItem | null>(null);

    useEffect(() => {
        document.title = "Pre-casted Lifting Equipments and Foundation Bolts | Solvoka";
    }, []);

    const filteredItems = useMemo(() => {
        return precastFoundationItems.filter((item) => {
            const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
            return matchesQuery && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#2563eb] selection:text-white">
            {/* HERO SECTION WITH WHITE FADE STRICTLY BEHIND THE TEXT */}
            <section className="relative overflow-hidden pt-32 pb-20 sm:pb-24 lg:pb-28">
                {/* Full-bleed background image - pure and vivid across the screen */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/Precast%20Slab%20Lift%20at%20Construction%20Site.webp"
                        alt="Precast Slab Lift at Construction Site"
                        className="h-full w-full object-cover object-center"
                    />
                    {/* Soft white gradient fade strictly on the left behind the text, fading to completely 0% transparent before reaching the crane and precast slab on the right */}
                    <div className="absolute inset-y-0 left-0 w-full lg:w-[58%] xl:w-[52%] bg-gradient-to-r from-white/95 via-white/85 to-transparent backdrop-blur-[2px] pointer-events-none" />
                </div>

                <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
                    {/* Breadcrumbs */}
                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500">
                        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                        <span>/</span>
                        <span className="text-slate-500">Infrastructure</span>
                        <span>/</span>
                        <span className="text-[#2563eb] font-bold">Pre-casted Lifting &amp; Foundation Bolts</span>
                    </div>

                    <div className="max-w-3xl">
                        {/* Pill / Line Badge */}
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563eb]">
                            <span className="h-[2px] w-6 bg-[#2563eb]" />
                            <span>INFRASTRUCTURE COMPONENTS</span>
                        </div>

                        {/* Headline */}
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#2563eb] sm:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.06]">
                            Pre-casted Lifting <br />
                            Equipments and <br />
                            <span className="text-[#2563eb]">Foundation Bolts</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-700 max-w-xl font-medium">
                            Heavy-duty certified precast lifting systems, erection anchors, hoist rings, and high-tensile embedded foundation anchor bolts for precast civil construction.
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <a
                                href="#components"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-7 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-600 transition"
                            >
                                <span>Explore Components</span>
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <Link
                                to="/#quote"
                                onClick={() => trackQuoteCtaClick("hero_precast_foundation_bolts")}
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 backdrop-blur-md px-6 text-sm font-semibold text-slate-800 shadow-sm hover:bg-white hover:border-slate-400 transition"
                            >
                                <FileText className="h-4 w-4 text-slate-500" />
                                <span>Request Quotation</span>
                            </Link>
                        </div>

                        {/* Bottom Feature Strip (matching Scaffolding page) */}
                        <div className="mt-12 inline-flex flex-wrap items-center gap-4 sm:gap-6 rounded-2xl border border-white/80 bg-white/85 p-4 sm:p-5 shadow-lg backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-extrabold text-slate-900">Heavy-Duty</div>
                                    <div className="text-xs text-slate-500 font-medium">Certified</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 border-l border-slate-200 pl-4 sm:pl-6">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                                    <Settings className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-extrabold text-slate-900">Engineered</div>
                                    <div className="text-xs text-slate-500 font-medium">for Safety</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 border-l border-slate-200 pl-4 sm:pl-6">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                                    <Layers className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-extrabold text-slate-900">Trusted in</div>
                                    <div className="text-xs text-slate-500 font-medium">Civil Construction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPONENTS CATALOG SECTION */}
            <section id="components" className="pt-16 pb-20 sm:pb-24">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="h-[2px] w-6 bg-[#2563eb]" />
                                <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                                    OUR INVENTORY
                                </span>
                            </div>
                            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Certified Precast Anchors &amp; Anchor Bolts
                            </h2>
                        </div>
                        <div className="lg:max-w-md border-l-2 border-slate-200 pl-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Fully load-tested lifting eye anchors, erection systems, spherical clutches, and structural foundation bolts engineered for high-tension embedment.
                            </p>
                        </div>
                    </div>

                    {/* MODERN CONTROLS BAR: Category Filter Pills + Search + View Switcher */}
                    <div className="mt-8 flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-3 rounded-2xl border border-slate-200 bg-white shadow-xs">
                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { key: "all", label: "All Components" },
                                { key: "anchors", label: "Precast Lifting Anchors" },
                                { key: "rigging", label: "Rigging Hardware" },
                                { key: "bolts", label: "Foundation Anchor Bolts" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setSelectedCategory(tab.key as any)}
                                    className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === tab.key
                                        ? "bg-[#2563eb] text-white shadow-sm"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                        }`}
                                >
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Search Bar & View Mode Toggle */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 sm:w-72">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search anchor or bolt..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-9 text-xs font-medium text-slate-900 placeholder-slate-400 transition focus:border-[#2563eb] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${viewMode === "grid"
                                        ? "bg-white text-slate-900 shadow-xs"
                                        : "text-slate-500 hover:text-slate-800"
                                        }`}
                                    aria-label="Grid view"
                                >
                                    <LayoutGrid className="h-3.5 w-3.5 text-[#2563eb]" />
                                    <span className="hidden sm:inline">Grid</span>
                                </button>
                                <button
                                    onClick={() => setViewMode("table")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${viewMode === "table"
                                        ? "bg-white text-slate-900 shadow-xs"
                                        : "text-slate-500 hover:text-slate-800"
                                        }`}
                                    aria-label="Table view"
                                >
                                    <TableIcon className="h-3.5 w-3.5 text-[#2563eb]" />
                                    <span className="hidden sm:inline">Table</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* GRID VIEW: MODERN STUDIO-LIGHTING PRODUCT CARDS */}
                    {viewMode === "grid" ? (
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:border-[#2563eb]/60 hover:shadow-xl hover:shadow-blue-900/5"
                                >
                                    <div>
                                        {/* Image Showcase Stage with Studio Radial Background */}
                                        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50/80 via-white to-blue-50/20 p-6">
                                            {/* Micro-grid pattern */}
                                            <div
                                                className="pointer-events-none absolute inset-0 opacity-15"
                                                style={{
                                                    backgroundImage: "radial-gradient(#2563eb 1px, transparent 1px)",
                                                    backgroundSize: "16px 16px",
                                                }}
                                            />

                                            {/* Part Number Badge */}
                                            <div className="absolute top-3.5 left-3.5 z-10">
                                                <span className="rounded-lg border border-slate-200/90 bg-white/95 px-2.5 py-1 text-[11px] font-black text-slate-700 shadow-xs backdrop-blur-sm">
                                                    #{String(index + 1).padStart(2, "0")}
                                                </span>
                                            </div>

                                            {/* Category Tag Badge */}
                                            <div className="absolute top-3.5 right-3.5 z-10">
                                                <span className="rounded-lg border border-blue-100 bg-blue-50/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2563eb] backdrop-blur-sm">
                                                    {item.categoryLabel}
                                                </span>
                                            </div>

                                            {/* Product Photography */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="relative z-0 max-h-48 max-w-[85%] object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-108"
                                                loading="lazy"
                                            />

                                            {/* Zoom / Quick View Button Overlay */}
                                            <button
                                                onClick={() => setActiveModalItem(item)}
                                                className="absolute bottom-3.5 right-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb] group-hover:opacity-100 opacity-90"
                                                title="Quick View Specifications"
                                            >
                                                <Maximize2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-5 sm:p-6">
                                            <h3 className="text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-[#2563eb]">
                                                {item.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="p-5 pt-0 sm:p-6 sm:pt-0">
                                        <Link
                                            to="/#quote"
                                            onClick={() => trackQuoteCtaClick(`precast_${item.id}`)}
                                            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] text-sm font-bold text-white shadow-sm transition hover:bg-blue-600 hover:shadow-md"
                                        >
                                            <span>Inquire Item</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* TABLE VIEW (Engineered Procurement Schedule) */
                        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200">
                                    <tr>
                                        <th className="py-4 px-6 w-1/12">#</th>
                                        <th className="py-4 px-6 w-5/12">Components</th>
                                        <th className="py-4 px-6 w-4/12 text-center">Picture</th>
                                        <th className="py-4 px-6 w-2/12 text-right">Inquiry</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredItems.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="py-4 px-6 font-black text-slate-400">
                                                #{String(index + 1).padStart(2, "0")}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="font-extrabold text-slate-900 text-base group-hover:text-[#2563eb] transition-colors">
                                                    {item.name}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-0.5">
                                                    {item.categoryLabel}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex justify-center">
                                                    <div
                                                        onClick={() => setActiveModalItem(item)}
                                                        className="h-24 w-36 cursor-pointer rounded-xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center overflow-hidden transition group-hover:border-blue-400 group-hover:shadow-sm"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Link
                                                    to="/#quote"
                                                    onClick={() => trackQuoteCtaClick(`table_precast_${item.id}`)}
                                                    className="inline-flex h-9 items-center justify-center rounded-xl bg-[#2563eb] px-4 text-xs font-bold text-white hover:bg-blue-600 transition shadow-xs"
                                                >
                                                    Inquire Item
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {filteredItems.length === 0 && (
                        <div className="mt-12 text-center py-16 bg-white rounded-2xl border border-slate-200">
                            <p className="text-slate-500 text-sm">No component found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                }}
                                className="mt-3 text-xs font-bold text-[#2563eb] hover:underline cursor-pointer"
                            >
                                Reset filters
                            </button>
                        </div>
                    )}
                </div>
            </section>



            {/* QUICK SPECS MODAL */}
            {activeModalItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setActiveModalItem(null)}
                >
                    <div
                        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563eb]">
                                    {activeModalItem.categoryLabel}
                                </span>
                                <h3 className="text-xl font-extrabold text-slate-900">
                                    {activeModalItem.name}
                                </h3>
                            </div>
                            <button
                                onClick={() => setActiveModalItem(null)}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-400 hover:text-slate-700 shadow-xs border border-slate-200"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 p-6">
                                <img
                                    src={activeModalItem.image}
                                    alt={activeModalItem.name}
                                    className="max-h-full max-w-full object-contain drop-shadow-md"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
                            <button
                                onClick={() => setActiveModalItem(null)}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100"
                            >
                                Close
                            </button>
                            <Link
                                to="/#quote"
                                onClick={() => {
                                    trackQuoteCtaClick(`modal_precast_${activeModalItem.id}`);
                                    setActiveModalItem(null);
                                }}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2563eb] text-xs font-bold text-white shadow-md hover:bg-blue-600"
                            >
                                <span>Inquire Item</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
