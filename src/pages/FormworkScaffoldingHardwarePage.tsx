import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    ArrowRight,
    Layers,
    CheckCircle2,
    Search,
    FileText,
} from "lucide-react";
import { trackQuoteCtaClick } from "../utils/analytics";

/* ------------------------------------------------------------------ */
/* Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface HardwareItem {
    id: string;
    category: "formwork" | "scaffolding" | "shoring";
    name: string;
    standard: string;
    material: string;
    finish: string;
    capacity: string;
    description: string;
    specs: { label: string; val: string }[];
    badge?: string;
}

const hardwareItems: HardwareItem[] = [
    {
        id: "dywidag-tie-rod",
        category: "formwork",
        name: "Dywidag High-Tensile Tie Rods",
        standard: "DIN 18216",
        material: "High-Tensile Carbon Steel (Hot Rolled / Cold Drawn)",
        finish: "Self-Color, Black Oxide, or Electro-Galvanized",
        capacity: "Break Load: 15/17mm (190 kN) · 20/22mm (310 kN)",
        description:
            "Continuous hot-rolled round-threaded tie rods designed to withstand immense hydrostatic wet-concrete pressures in wall and column formwork. Fully weldable with self-cleaning coarse thread profile.",
        specs: [
            { label: "Nominal Diameter", val: "15/17 mm & 20/22 mm" },
            { label: "Working Load (Safety Factor 2:1)", val: "90 kN (15mm) / 160 kN (20mm)" },
            { label: "Steel Grade", val: "PSB830 / Grade 830/1030" },
            { label: "Stock Lengths", val: "1.0 m to 6.0 m (custom cut available)" },
        ],
        badge: "Heavy Civil Essential",
    },
    {
        id: "formwork-wing-nut",
        category: "formwork",
        name: "Drop-Forged Formwork Wing Nuts",
        standard: "DIN 18216 / EN 74",
        material: "Drop-Forged 45# Steel & Ductile Iron QT450-10",
        finish: "Zinc Plated (White/Yellow) or Hot-Dip Galvanized",
        capacity: "Proof Load: 190 kN matching 15/17mm Tie Rod",
        description:
            "Two-wing, three-wing, and combination swivel plate wing nuts engineered for rapid hammer-tightening and strike-off on timber or steel walers without stripping threads.",
        specs: [
            { label: "Thread Engagement", val: "Dywidag 15/17 mm & 20/22 mm" },
            { label: "Base Flange Diameter", val: "70 mm, 100 mm, 120 mm, 130 mm" },
            { label: "Design Options", val: "Solid Nut, Swivel Plate Combo, Hex Nut" },
            { label: "Tensile Strength", val: "≥ 900 MPa" },
        ],
        badge: "Drop Forged",
    },
    {
        id: "water-barrier-stopper",
        category: "formwork",
        name: "Cast Steel Water Stoppers (Water Barriers)",
        standard: "DIN 18216",
        material: "Cast Carbon Steel / Ductile Iron",
        finish: "Self-Color or Zinc Galvanized",
        capacity: "Proof Tested to 190 kN Break Load",
        description:
            "Integral cast water barrier embedded in concrete retaining walls, water treatment tanks, and basements. Prevents moisture capillary migration along the tie rod axis with dual welded/cast stop discs.",
        specs: [
            { label: "Core Thread", val: "Dywidag 15/17 mm Female Both Ends" },
            { label: "Center Water Plate", val: "Ø 65 mm to Ø 120 mm cast disc" },
            { label: "Impermeability Rating", val: "Hydrostatic Head up to 50 meters" },
            { label: "Applications", val: "Basements, Reservoirs, Tunnels, Seawalls" },
        ],
    },
    {
        id: "formwork-coupler-anchor-nut",
        category: "formwork",
        name: "Continuous Tie Rod Couplers & Anchor Nuts",
        standard: "DIN 18216",
        material: "Forged Carbon Steel C45",
        finish: "Electro-Galvanized or Black",
        capacity: "Full Tensile Strength of Dywidag Rod",
        description:
            "Hexagonal extension couplers with internal center stop pins for splicing tie rod lengths, plus heavy-duty square anchor plates with welded nuts for casting into foundation kickers.",
        specs: [
            { label: "Coupler Length", val: "105 mm (15/17mm) / 130 mm (20/22mm)" },
            { label: "Across Flats (AF)", val: "Hex 30 mm / Hex 36 mm" },
            { label: "Anchor Nut Dimensions", val: "120 × 120 × 10 mm plate with forged nut" },
            { label: "Torque Resistance", val: "Exceeds bar yield strength" },
        ],
    },
    {
        id: "rapid-spring-clamps",
        category: "formwork",
        name: "Rapid Spring Clamps & Tensioning Tools",
        standard: "BS EN 12812",
        material: "Ductile Iron Cam with Spring Steel Body",
        finish: "Zinc Plated or Painted",
        capacity: "Working Load: 25 kN per clamp",
        description:
            "Economical clamping system for beam sides, column shuttering, and foundation kickers using standard 6–10 mm wire or rebar, actuated via heavy mechanical lever tensioner.",
        specs: [
            { label: "Wire Bar Compatibility", val: "6 mm, 8 mm, 10 mm smooth or ribbed wire" },
            { label: "Base Plate Size", val: "105 × 75 mm reinforced" },
            { label: "Hardened Teeth Cam", val: "Case-hardened 58 HRC for zero slippage" },
            { label: "Tensioner Weight", val: "2.8 kg heavy-duty forged lever" },
        ],
    },
    {
        id: "drop-forged-right-angle-coupler",
        category: "scaffolding",
        name: "Drop-Forged Right-Angle Couplers (Double Couplers)",
        standard: "EN 74-1 Class B / BS 1139",
        material: "Drop-Forged High-Strength Carbon Steel",
        finish: "Hot-Dip Galvanized (≥ 85 µm) or Zinc Plated",
        capacity: "Slip Resistance: ≥ 15.0 kN · Failure Load: ≥ 30 kN",
        description:
            "Heavy-duty forged coupler for connecting two standard 48.3 mm scaffolding tubes at 90 degrees. Precision forged caps, cold-headed forged T-bolts (8.8 grade), and 21 mm hex flange nuts.",
        specs: [
            { label: "Tube Diameter", val: "48.3 mm OD (1.9 inch)" },
            { label: "Tightening Torque", val: "54 Nm" },
            { label: "T-Bolt Grade", val: "Grade 8.8 High-Tensile with captive nut" },
            { label: "Corrosion Life", val: "25+ years in outdoor maritime environments" },
        ],
        badge: "EN 74-1 Class B Certified",
    },
    {
        id: "drop-forged-swivel-coupler",
        category: "scaffolding",
        name: "Drop-Forged Swivel Couplers",
        standard: "EN 74-1 Class A & B / BS 1139",
        material: "Drop-Forged High-Strength Carbon Steel",
        finish: "Hot-Dip Galvanized or Zinc Plated",
        capacity: "Slip Resistance: ≥ 10.0 kN · Failure Load: ≥ 25 kN",
        description:
            "Dual-forged body connected by a high-shear carbon steel center rivet, enabling 360-degree rotational connection of diagonal braces and structural facade ties on scaffolding towers.",
        specs: [
            { label: "Tube Diameter", val: "48.3 mm OD standard" },
            { label: "Rivet Specification", val: "Ø 16 mm heavy cold-upset rivet" },
            { label: "Nut Size", val: "21 mm / 22 mm / 23 mm cross-flat options" },
            { label: "Weight", val: "1.15 kg ± 0.03 kg" },
        ],
    },
    {
        id: "sleeve-putlog-couplers",
        category: "scaffolding",
        name: "Sleeve & Putlog Couplers",
        standard: "EN 74-1 / BS 1139",
        material: "High-Tensile Pressed & Forged Carbon Steel",
        finish: "Electro-Galvanized or Hot-Dip Galvanized",
        capacity: "Tensile Resistance: 5.5 kN (Sleeve) / Non-load bearing (Putlog)",
        description:
            "External sleeve couplers with center partition locating pin for end-to-end tube jointing, and wrap-around putlog couplers for securing scaffold battens and transoms.",
        specs: [
            { label: "Tube OD", val: "48.3 mm" },
            { label: "Body Length", val: "210 mm (Sleeve joint pin)" },
            { label: "Bolt Assembly", val: "M12 bolt with 21 mm flange nut" },
            { label: "Applications", val: "Linear standard joining & timber board transoms" },
        ],
    },
    {
        id: "adjustable-shoring-props",
        category: "shoring",
        name: "Heavy-Duty Adjustable Shoring Props",
        standard: "DIN EN 1065 (Class C / D / E)",
        material: "Structural Steel Tubes (Inner Ø 48.3mm, Outer Ø 60.3mm)",
        finish: "Hot-Dip Galvanized, Painted, or Powder Coated",
        capacity: "Safe Working Load: 20 kN to 40 kN across all heights",
        description:
            "Telescopic steel props for temporary support of formwork slabs, heavy bridge decks, and precast beams. Features forged steel collar adjusting nuts, captive safety G-pins, and anti-hand-trap clearance.",
        specs: [
            { label: "Extension Ranges", val: "1.5–2.5m, 2.0–3.5m, 2.5–4.0m, 3.0–5.0m" },
            { label: "Base/Top Plates", val: "120 × 120 × 6 mm flat or crowned with rebar slot" },
            { label: "Adjustment Collar", val: "Ductile iron threaded collar with twin welded handles" },
            { label: "Pin Diameter", val: "Ø 14 mm high-shear steel safety pin" },
        ],
        badge: "EN 1065 Class C/D/E",
    },
    {
        id: "scaffold-base-jacks-plates",
        category: "shoring",
        name: "Adjustable Screw Base Jacks & Base Plates",
        standard: "BS 1139 / EN 74",
        material: "Solid Cold-Drawn / Hollow Seamless Structural Steel",
        finish: "Hot-Dip Galvanized or Zinc Plated",
        capacity: "Axial Working Load up to 60 kN",
        description:
            "Heavy-duty threaded screw jacks with welded 150 × 150 mm base plates for leveling scaffold standards and cuplock / ringlock towers on uneven or sloped construction substrates.",
        specs: [
            { label: "Stem Diameter", val: "Ø 38 mm solid bar or Ø 38/48 mm hollow tube" },
            { label: "Length / Adjustment", val: "600 mm, 750 mm, 800 mm length (up to 500 mm lift)" },
            { label: "Base Plate", val: "150 × 150 × 6 mm with 4 anchor holes" },
            { label: "Jack Nut", val: "Heavy ductile iron twin-handle nut" },
        ],
    },
];

const technicalSpecs = [
    { part: "Dywidag Tie Rod 15/17", standard: "DIN 18216", material: "PSB830", finish: "Self / Black / Zinc", yieldLoad: "150 kN", breakLoad: "190 kN" },
    { part: "Dywidag Tie Rod 20/22", standard: "DIN 18216", material: "PSB830", finish: "Self / Black / Zinc", yieldLoad: "250 kN", breakLoad: "310 kN" },
    { part: "Forged Wing Nut (Ø 100mm)", standard: "DIN 18216", material: "Forged 45#", finish: "Yellow Zinc / HDG", yieldLoad: "150 kN", breakLoad: "195 kN" },
    { part: "Water Stopper Barrier", standard: "DIN 18216", material: "Cast Steel", finish: "Self / Zinc", yieldLoad: "140 kN", breakLoad: "190 kN" },
    { part: "Right-Angle Coupler", standard: "EN 74-1 Class B", material: "Forged Q235/45#", finish: "HDG ≥ 85µm", yieldLoad: "Slip: 15 kN", breakLoad: "30 kN" },
    { part: "Swivel Coupler", standard: "EN 74-1 Class B", material: "Forged Q235/45#", finish: "HDG ≥ 85µm", yieldLoad: "Slip: 10 kN", breakLoad: "25 kN" },
    { part: "Shoring Prop (Class D-35)", standard: "DIN EN 1065", material: "S235 / S355", finish: "HDG / Painted", yieldLoad: "20 kN constant", breakLoad: "60 kN" },
    { part: "Adjustable Base Jack", standard: "BS 1139", material: "Solid C45 / S235", finish: "HDG / Zinc", yieldLoad: "Axial: 40 kN", breakLoad: "60 kN" },
];

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function FormworkScaffoldingHardwarePage() {
    const [selectedCategory, setSelectedCategory] = useState<"all" | "formwork" | "scaffolding" | "shoring">("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        document.title = "Formwork & Scaffolding Hardware | Dywidag Tie Rods, Couplers & Shoring | Solvoka";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute(
                "content",
                "Manufacturer and exporter of heavy-duty formwork tie rods, wing nuts, water stoppers, drop-forged scaffolding couplers, and shoring props compliant with EN 74 and DIN 18216."
            );
        }
    }, []);

    const filteredItems = useMemo(() => {
        return hardwareItems.filter((item) => {
            const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.material.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="bg-white text-slate-900">
            {/* ============================================================== */}
            {/* HERO SECTION                                                  */}
            {/* ============================================================== */}
            <section className="relative overflow-hidden bg-slate-950 pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 text-white">
                {/* Background Tech Grids */}
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
                            INFRASTRUCTURE HARDWARE // HEAVY CIVIL &amp; FORMWORK
                        </span>
                        <span className="h-px w-6 bg-[#2563eb]" />
                    </div>

                    {/* Headline */}
                    <h1 className="mt-4 text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl lg:text-[52px] lg:leading-[1.12]">
                        Heavy-Duty Formwork &amp; Scaffolding Hardware{" "}
                        <span className="block text-[#2563eb]">
                            Engineered for High-Pressure Concrete Casting.
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
                        Focal Point, Ludhiana, India · Direct Exporter to Global Ports
                    </p>

                    {/* Subheadline */}
                    <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-300 sm:text-[16px] sm:leading-[1.6]">
                        Drop-forged scaffold couplers, high-yield Dywidag tie rods, ductile wing nuts, cast water stoppers, and heavy-duty adjustable shoring props. Fully manufactured and tested to EN 74-1, BS 1139, and DIN 18216 for demanding infrastructure, bridges, tunnels, and high-rise commercial formwork.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Link
                            to="/#quote"
                            onClick={() => trackQuoteCtaClick("hero_formwork_page")}
                            className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-6 text-[15px] font-bold text-white shadow-lg shadow-[#2563eb]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-[#2563eb]/40"
                        >
                            <span>Request Hardware Quote</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="#products"
                            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 bg-slate-900/60 px-6 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-slate-950"
                        >
                            Explore 10 Core Products
                        </a>
                    </div>

                    {/* Trust Chips */}
                    <ul className="mt-8 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>DIN 18216 &amp; EN 74-1 Compliant</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>Drop-Forged High Tensile 45# Steel</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>Hot-Dip Galvanized ≥ 85µm</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#2563eb]" />
                            <span>1-Business-Day RFQ Turnaround</span>
                        </li>
                    </ul>

                    {/* Stats Strip */}
                    <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-800 pt-8 sm:grid-cols-4 lg:gap-6">
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">Up to 310 kN</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Tie Rod Break Load</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">48.3 mm</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Standard Tube Coupler OD</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">Class C/D/E</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">EN 1065 Shoring Props</div>
                        </div>
                        <div className="border-l-2 border-[#2563eb] pl-4">
                            <div className="text-2xl font-extrabold text-white sm:text-3xl">100%</div>
                            <div className="mt-1 text-xs text-slate-400 uppercase tracking-wider font-medium">Torque &amp; Slip Tested</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* CATALOGUE CONTROLS & FILTERING                                 */}
            {/* ============================================================== */}
            <section id="products" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                                <Layers className="h-4 w-4" />
                                <span>ENGINEERED PRODUCT CATALOGUE</span>
                            </div>
                            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
                                Formwork Retention &amp; Scaffolding Coupler Inventory
                            </h2>
                            <p className="mt-2 max-w-2xl text-sm text-slate-600">
                                Browse our stock sizes and custom manufacturing capabilities. All components are batch stamped and ready for containerized sea shipment.
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, spec, DIN..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-xs focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
                            />
                        </div>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                        {[
                            { key: "all", label: "All Hardware Components", count: hardwareItems.length },
                            { key: "formwork", label: "Formwork Tie Systems", count: hardwareItems.filter((i) => i.category === "formwork").length },
                            { key: "scaffolding", label: "Scaffolding Couplers", count: hardwareItems.filter((i) => i.category === "scaffolding").length },
                            { key: "shoring", label: "Shoring Props & Jacks", count: hardwareItems.filter((i) => i.category === "shoring").length },
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
                                            <span className="rounded-md bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 border border-amber-200/60">
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
                                            {item.capacity}
                                        </div>
                                        <div className="mt-1 text-[10px] text-slate-500">
                                            Material: {item.material}
                                        </div>
                                        <div className="mt-0.5 text-[10px] text-slate-500">
                                            Finish: {item.finish}
                                        </div>
                                    </div>

                                    {/* Detailed Specs list */}
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
                                        <span>Request Quote for {item.name.split(" ")[0]}</span>
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
                            <p className="text-base font-bold text-slate-700">No components match "{searchQuery}"</p>
                            <p className="mt-1 text-xs text-slate-500">We manufacture custom formwork clamps, tie rods, and scaffolding accessories directly to client blueprints.</p>
                            <Link
                                to="/#quote"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-600"
                            >
                                Submit Custom Print
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ============================================================== */}
            {/* TECHNICAL COMPARISON TABLE                                     */}
            {/* ============================================================== */}
            <section className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                            <FileText className="h-4 w-4" />
                            <span>MECHANICAL PROPERTY MATRIX</span>
                        </div>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                            Standards, Yield Loads &amp; Protective Coatings
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            All Solvoka formwork and scaffolding hardware is produced from primary steel billets with rigorous batch spectrometer analysis and mechanical pull testing.
                        </p>
                    </div>

                    <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                        <table className="w-full min-w-[700px] text-left text-xs">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Hardware Component</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Governing Standard</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Material Grade</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Surface Coating</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Yield Load</th>
                                    <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-[11px]">Ultimate Break Load</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {technicalSpecs.map((row, idx) => (
                                    <tr key={row.part} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                                        <td className="py-3 px-4 font-bold text-slate-900">{row.part}</td>
                                        <td className="py-3 px-4 text-slate-600">
                                            <span className="rounded bg-blue-50 px-2 py-0.5 font-semibold text-[#2563eb]">
                                                {row.standard}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-medium text-slate-700">{row.material}</td>
                                        <td className="py-3 px-4 text-slate-600">{row.finish}</td>
                                        <td className="py-3 px-4 font-semibold text-slate-900 tabular">{row.yieldLoad}</td>
                                        <td className="py-3 px-4 font-bold text-[#2563eb] tabular">{row.breakLoad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ============================================================== */}
            {/* QUALITY GATES & METALLURGY                                     */}
            {/* ============================================================== */}
            <section className="py-16 sm:py-20 lg:py-24 bg-slate-900 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                                <ShieldCheck className="h-4 w-4" />
                                <span>ZERO-DEFECT EXPORT PROTOCOL</span>
                            </div>
                            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                                Why Infrastructure Contractors Rely on Solvoka Hardware
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-slate-300">
                                In concrete formwork and scaffolding, hardware failure means catastrophic blowouts and job-site safety hazards. We eliminate risks through rigorous manufacturing controls:
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">True Drop-Forged Steel Couplers</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">Unlike brittle sand-cast or lightweight pressed imitations, our couplers are hot drop-forged from 45# carbon steel to maintain uninterrupted grain flow.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Destructive Pull &amp; Slip Testing Rig</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">Every production lot undergoes mandatory tensile break testing and torque slip verification up to 54 Nm per EN 74-1 standards.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3.5">
                                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-[#2563eb]/20 text-[#2563eb]">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Maritime-Grade Hot-Dip Galvanizing</h4>
                                        <p className="mt-0.5 text-xs text-slate-400">Thick zinc coatings (≥ 85 microns) compliant with ASTM A153 and ISO 1461 protect threaded hardware from aggressive coastal concrete slurries and ocean transport.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual Quality Card */}
                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 shadow-xl">
                            <h3 className="text-lg font-bold text-white">Export Packaging &amp; Logistics Assurance</h3>
                            <p className="mt-2 text-xs text-slate-400">
                                Hardware is packaged for high-density ocean freight and direct tower crane offloading at construction docks:
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Palletized Steel Crates</div>
                                    <div className="mt-1 text-slate-400">1,000 kg heavy-duty wire-mesh or steel-banded timber crates.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Woven Bag Bundles</div>
                                    <div className="mt-1 text-slate-400">25 pcs per moisture-proof woven poly bag with clear barcode labels.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">VCI Anti-Corrosion Wrap</div>
                                    <div className="mt-1 text-slate-400">Desiccant packs and Vapor Corrosion Inhibitor foil seals.</div>
                                </div>
                                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <div className="font-bold text-[#2563eb]">Full Export Dossier</div>
                                    <div className="mt-1 text-slate-400">Certificate of Origin, Bill of Lading, Packing List &amp; Mill Tests.</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-semibold text-slate-400">Export Readiness</div>
                                    <div className="text-sm font-bold text-white">FOB Mundra / Nhava Sheva / CIF Global</div>
                                </div>
                                <Link
                                    to="/#quote"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 transition"
                                >
                                    Get Container Quote
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
                        Need Custom Formwork Ties or Container-Volume Couplers?
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
                        Speak directly with our engineering team in Ludhiana. We quote within 24 hours with certified drawings, material specifications, and landed freight estimates.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/#quote"
                            onClick={() => trackQuoteCtaClick("bottom_cta_formwork")}
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-8 text-sm font-bold text-white shadow-md hover:bg-blue-600 transition"
                        >
                            <span>Request RFQ for Formwork Hardware</span>
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
