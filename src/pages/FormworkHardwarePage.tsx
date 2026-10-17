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
    Building2,
    X,
    Maximize2,
} from "lucide-react";
import { trackQuoteCtaClick } from "../utils/analytics";

interface FormworkItem {
    id: string;
    name: string;
    category: "all" | "ties" | "clamps" | "accessories";
    categoryLabel: string;
    image: string;
    application: string;
    features: string[];
    standardFinish: string;
}

const formworkItems: FormworkItem[] = [
    {
        id: "tie-rod",
        name: "Tie Rod",
        category: "ties",
        categoryLabel: "Tie Systems",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Diagonal%20Galvanised%20Threaded%20Steel%20Rods.webp",
        application: "Wall, column & core concrete shoring",
        features: ["Continuous Dywidag coarse self-cleaning pitch", "High yield hydrostatic pull-out capacity"],
        standardFinish: "Hot-Rolled / Galvanised PSB830 Steel",
    },
    {
        id: "tie-nut",
        name: "Tie Nut",
        category: "ties",
        categoryLabel: "Tie Systems",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Galvanised%20Hexagonal%20Formwork%20Tie%20Nut.webp",
        application: "Heavy waler channel & soldier beam anchoring",
        features: ["Hexagonal & round heavy-duty bearing face", "Vibration strip-proof thread lock"],
        standardFinish: "Electro-Galvanised QT450 Ductile Iron",
    },
    {
        id: "wing-nut",
        name: "Wing Nut",
        category: "ties",
        categoryLabel: "Tie Systems",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Industrial%20Wing%20Nut%20on%20White%20Background.webp",
        application: "Fast hammer-tightening on concrete panel forms",
        features: ["Dual-wing ergonomic hammer driving lugs", "Integrated circular swivel bearing flange"],
        standardFinish: "Zinc Plated Ductile Cast Iron",
    },
    {
        id: "water-stop-tie-rod",
        name: "Water Stop Tie Rod",
        category: "ties",
        categoryLabel: "Tie Systems",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Industrial%20Water%20Stop%20Tie%20Rod%20Components.webp",
        application: "Basement walls, water tanks & culvert structures",
        features: ["Integrated impermeable central water-stop disc", "Dual internal Dywidag coarse threads"],
        standardFinish: "Watertight Cast Ductile Core",
    },
    {
        id: "coupler-nut",
        name: "Coupler Nut",
        category: "ties",
        categoryLabel: "Tie Systems",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Galvanised%20Hex%20Coupler%20Nut%20Stack.webp",
        application: "Continuous tie rod length splicing on deep pours",
        features: ["Extended thread engagement length", "High-torque heavy hex profile"],
        standardFinish: "Electro-Galvanised Structural Carbon Steel",
    },
    {
        id: "waller-plate",
        name: "Waller Plate",
        category: "ties",
        categoryLabel: "Tie Systems",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Nine-Metal%20Plate%20Hardware%20Grid.webp",
        application: "Spreading tie tension across timber walers & soldiers",
        features: ["Pressed structural dish with central embossed hole", "Distributes immense point-load forces evenly"],
        standardFinish: "Hot-Dip Galvanised / Zinc Plated",
    },
    {
        id: "stub-and-wedge-pin",
        name: "Stub & Wedge Pin",
        category: "accessories",
        categoryLabel: "Pins & Accessories",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Iridescent%20Zinc%20Formwork%20Hardware%20Set.webp",
        application: "Fast interlocking of modular aluminum & steel panels",
        features: ["Tapered wedge for rapid single-stroke locking", "High-shear alloy steel pin shaft"],
        standardFinish: "Iridescent Zinc Plated High-Tensile Steel",
    },
    {
        id: "wedge-clamp",
        name: "Wedge Clamp",
        category: "clamps",
        categoryLabel: "Clamps & Couplers",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Galvanised%20Wedge%20Clamp%20Product%20Shot.webp",
        application: "Secure clamping of timber & steel formwork walers",
        features: ["Captive drop-forged drive wedge mechanism", "High-friction clamping jaw against concrete pressure"],
        standardFinish: "Galvanised Forged Structural Steel",
    },
    {
        id: "rapid-clamp",
        name: "Rapid Clamp",
        category: "clamps",
        categoryLabel: "Clamps & Couplers",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Galvanised%20Steel%20Scaffold%20Clamp%20Assembly.webp",
        application: "Instant spring cam tie rod locking without nuts",
        features: ["Hardened high-grip spring cam tooth", "Rapid tension lever engagement"],
        standardFinish: "Galvanised Stamped & Forged Assembly",
    },
    {
        id: "deck-slab-accessories",
        name: "Deck Slab Accessories",
        category: "accessories",
        categoryLabel: "Pins & Accessories",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Galvanised%20Crown-Head%20Deck%20Support.webp",
        application: "Supporting slab drop-heads & primary decking beams",
        features: ["Crown-head four-way beam locating socket", "Direct vertical shoring load transfer"],
        standardFinish: "Galvanised High-Strength Cast Steel",
    },
    {
        id: "flange-clamps",
        name: "Flange Clamps",
        category: "clamps",
        categoryLabel: "Clamps & Couplers",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Galvanised%20Twin-Bolt%20Pipe%20Clamp.webp",
        application: "Rigidly securing H20 timber beams to steel walers",
        features: ["Dual high-tensile clamping bolts & nuts", "Prevents beam slipping during concrete vibration"],
        standardFinish: "Hot-Dip Galvanised Forged Body",
    },
    {
        id: "tekko-clips",
        name: "Tekko Clips",
        category: "accessories",
        categoryLabel: "Pins & Accessories",
        image: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/background-removed/Galvanised%20Tekko%20Hook%20Clip.webp",
        application: "Modular formwork panel alignment & joint latching",
        features: ["Hook-profile swift joint connection", "Resilient alloy spring steel flex"],
        standardFinish: "Zinc Plated High-Tensile Steel",
    },
];

export default function FormworkHardwarePage() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<"all" | "ties" | "clamps" | "accessories">("all");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const [activeModalItem, setActiveModalItem] = useState<FormworkItem | null>(null);

    useEffect(() => {
        document.title = "Formwork Hardware | Components & Pictures | Solvoka";
    }, []);

    const filteredItems = useMemo(() => {
        return formworkItems.filter((item) => {
            const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
            return matchesQuery && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#2563eb] selection:text-white">
            {/* HERO SECTION WITH GOLDEN-HOUR FORMWORK OVER CITY SKYLINE BACKGROUND */}
            <section className="relative overflow-hidden pt-32 pb-24 sm:pb-28 lg:pb-36 bg-slate-900 text-slate-900">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Infrastructure-Assets/Golden-Hour%20Formwork%20Over%20City%20Skyline.webp"
                        alt="Golden-Hour Formwork Over City Skyline"
                        className="h-full w-full object-cover object-center"
                    />
                    {/* Semi-transparent gradient overlay for text readability while letting the visual shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent/30 lg:from-white/95 lg:via-white/75 lg:to-transparent" />
                </div>

                <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
                    {/* Breadcrumbs */}
                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                        <span>/</span>
                        <span className="text-slate-500">Infrastructure</span>
                        <span>/</span>
                        <span className="text-[#2563eb] font-bold">Formwork Hardware</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8">
                            {/* Pill Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1 text-xs font-bold text-[#2563eb] shadow-xs">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
                                <span>INFRASTRUCTURE COMPONENTS</span>
                                <span className="text-blue-300">—</span>
                            </div>

                            {/* Headline */}
                            <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
                                Formwork <br />
                                <span className="text-[#2563eb]">Hardware</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl font-medium">
                                Heavy civil concrete formwork hardware, tie systems, clamping mechanisms, and form accessories engineered for high-pressure wall and slab shoring.
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
                                    onClick={() => trackQuoteCtaClick("hero_formwork_hardware")}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 backdrop-blur-md px-6 text-sm font-semibold text-slate-800 shadow-sm hover:bg-white hover:border-slate-400 transition"
                                >
                                    <FileText className="h-4 w-4 text-slate-500" />
                                    <span>Request Quotation</span>
                                </Link>
                            </div>
                        </div>

                        {/* Top-Right Floating Glassmorphic Card */}
                        <div className="hidden lg:flex lg:col-span-4 justify-end">
                            <div className="w-full max-w-xs rounded-2xl border border-white/80 bg-white/80 p-5 shadow-xl backdrop-blur-md">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                                                BUILT FOR
                                            </span>
                                            <span className="h-[2px] w-5 bg-[#2563eb]" />
                                        </div>
                                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                                            Stronger Structures
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                                            Precision hardware for high-performance formwork systems.
                                        </p>
                                    </div>
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100/90 text-[#2563eb]">
                                        <Building2 className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FLOATING METRICS / FEATURE STRIP (Overlapping Hero) */}
            <div className="relative z-20 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 -mt-12 sm:-mt-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                            <Layers className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">View all</div>
                            <div className="text-xs font-semibold text-slate-500">Component Types</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-l border-slate-100 pl-4 sm:pl-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">Heavy-Duty</div>
                            <div className="text-xs font-semibold text-slate-500">Systems</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-l border-slate-100 pl-4 sm:pl-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                            <Settings className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">Engineered</div>
                            <div className="text-xs font-semibold text-slate-500">For Site-Performance</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-l border-slate-100 pl-4 sm:pl-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900">Trusted</div>
                            <div className="text-xs font-semibold text-slate-500">Across Infrastructure Projects</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPONENTS CATALOG SECTION */}
            <section id="components" className="pt-16 pb-20 sm:pb-24">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
                    {/* Header matching screenshot reference */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="h-[2px] w-6 bg-[#2563eb]" />
                                <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                                    OUR COMPONENTS
                                </span>
                            </div>
                            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Complete Formwork Hardware Solutions
                            </h2>
                        </div>
                        <div className="lg:max-w-md border-l-2 border-slate-200 pl-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                From tie systems to clamping mechanisms, we provide reliable formwork components that ensure safety, strength, and efficiency on every project.
                            </p>
                        </div>
                    </div>

                    {/* MODERN CONTROLS BAR: Category Filter Pills + Search + View Switcher */}
                    <div className="mt-8 flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-3 rounded-2xl border border-slate-200 bg-white shadow-xs">
                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap items-center gap-2">
                            {[
                                { key: "all", label: "All Components" },
                                { key: "ties", label: "Tie Systems" },
                                { key: "clamps", label: "Clamps & Couplers" },
                                { key: "accessories", label: "Pins & Accessories" },
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
                                    placeholder="Search tie rod, wing nut, clamp..."
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

                    {/* GRID VIEW: MODERN INDUSTRIAL HARDWARE CARDS */}
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
                                            {/* Micro-grid decorative pattern */}
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
                                            onClick={() => trackQuoteCtaClick(`formwork_${item.id}`)}
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
                                                    onClick={() => trackQuoteCtaClick(`table_formwork_${item.id}`)}
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
                                    trackQuoteCtaClick(`modal_formwork_${activeModalItem.id}`);
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
