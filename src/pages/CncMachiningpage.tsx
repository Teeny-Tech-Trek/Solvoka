import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Crosshair,
  Layers,
  Box,
  Play,
  Check,
  ArrowRight,
  Zap,
  Lock,
  Headphones,
  X,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types & Data Definitions                                           */
/* ------------------------------------------------------------------ */

interface ProcessCardData {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  image: string;
  videoGif?: string;
  tolerance?: string;
  materials?: string;
}

const PROCESS_CARDS: ProcessCardData[] = [
  {
    number: "02",
    title: "CNC Milling",
    description:
      "Turn complex designs into reality with unmatched accuracy. We manufacture custom parts from steel, aluminum, brass, and engineering plastics.",
    bullets: [
      "High-precision machining",
      "Scalability from prototypes to production",
      "Material flexibility",
    ],
    image: "/Gif-Assets/CNC_Milling_Machine_Video_Ready.gif",
    videoGif: "/Gif-Assets/CNC_Milling_Machine_Video_Ready.gif",
    tolerance: "± 0.005 mm (± 0.0002 in)",
    materials: "Aluminum (6061, 7075), Stainless Steel, Brass, Delrin",
  },
  {
    number: "03",
    title: "CNC Turning",
    description:
      "High-accuracy cylindrical parts with smooth finishes, consistent dimensions, and efficient turnaround.",
    bullets: [
      "High-speed, high-volume production",
      "Tight tolerance control",
      "Cost-effective for symmetrical parts",
      "Quick prototyping to mass production",
    ],
    image: "/Gif-Assets/CNC_Turning_Machine_Video_Ready.gif",
    videoGif: "/Gif-Assets/CNC_Turning_Machine_Video_Ready.gif",
    tolerance: "± 0.008 mm (± 0.0003 in)",
    materials: "Alloy Steels, Titanium, Copper, Inconel",
  },
  {
    number: "04",
    title: "CNC Drilling",
    description:
      "Exact hole placement, depth, and diameter across all production volumes.",
    bullets: [
      "Uniform drilling across materials",
      "Multiple-hole and deep-hole supported",
      "Ideal for flanges, panels, brackets.",
    ],
    image: "/Gif-Assets/CNC_Drilling_Machine_Video_Ready.gif",
    videoGif: "/Gif-Assets/CNC_Drilling_Machine_Video_Ready.gif",
    tolerance: "± 0.01 mm (± 0.0004 in)",
    materials: "Structural Carbon Steel, Tool Steel, Cast Iron",
  },
  {
    number: "05",
    title: "Wire EDM Machining",
    subtitle: "Extreme Precision for Intricate Cuts",
    description:
      "Machine complex shapes and hardened materials with exceptional accuracy without inducing mechanical stress.",
    bullets: [
      "Excellent for ultra-fine features and hard metals",
      "No tool wear or deformation",
    ],
    image: "/Gif-Assets/working_of_cnc_wire_edm_machine.gif",
    videoGif: "/Gif-Assets/working_of_cnc_wire_edm_machine.gif",
    tolerance: "± 0.002 mm (± 0.00008 in)",
    materials: "Hardened D2/H13 Steel, Carbide, Titanium",
  },
  {
    number: "06",
    title: "CNC Grinding",
    subtitle: "Precision Surface Finishing & Micron-Level Accuracy",
    description:
      "Ultra-precise finishes and tight dimensional tolerances on hardened materials and complex geometries.",
    bullets: [
      "Surface Grinding",
      "Cylindrical Grinding (OD & ID)",
      "Centerless Grinding",
      "Profile Grinding",
    ],
    image: "/Gif-Assets/Video_Link_CNC_Machine.gif",
    videoGif: "/Gif-Assets/Video_Link_CNC_Machine.gif",
    tolerance: "Ra 0.1 µm (4 µin) / ± 0.002 mm",
    materials: "Hardened Bearing Steel, Tool Steel, Tungsten Carbide",
  },
  {
    number: "07",
    title: "CNC Routing",
    subtitle: "Efficient Cutting for Flat Panels and Plastics",
    description:
      "Ideal for cutting, shaping, and engraving sheet materials with speed and reliability.",
    bullets: [
      "Perfect for signage, enclosures, and lightweight parts",
      "Custom shapes with high-speed production",
      "Minimal material wastage",
    ],
    image: "/Gif-Assets/Video_Ready_CNC_Machine.gif",
    videoGif: "/Gif-Assets/Video_Ready_CNC_Machine.gif",
    tolerance: "± 0.05 mm (± 0.002 in)",
    materials: "Engineering Plastics (PEEK, POM), Aluminum Sheets, Composites",
  },
  {
    number: "08",
    title: "Multi-Axis Machining",
    subtitle: "Freedom to Create Complex 3D Parts",
    description:
      "3-axis, 4-axis, and 5-axis machining centers allow highly complex parts in a single setup.",
    bullets: [
      "Fewer setups, tighter tolerances",
      "Handles undercuts, angles, and curves",
    ],
    image: "/Gif-Assets/Video_Link_Provided.gif",
    videoGif: "/Gif-Assets/Video_Link_Provided.gif",
    tolerance: "± 0.005 mm (± 0.0002 in)",
    materials: "Aerospace Grade 7075-T6, Inconel 718, 17-4 PH Stainless",
  },
  {
    number: "09",
    title: "Swiss Machining",
    subtitle: "Micron Precision for Small, Complex Parts",
    description:
      "Ideal for high-volume production of small, intricate components with continuous support from the guide bushing.",
    bullets: [
      "Excellent for tight-tolerance and miniature parts",
      "High-speed, automated production",
    ],
    image: "/Gif-Assets/CNC_Turning_Machine_Video_Ready.gif",
    videoGif: "/Gif-Assets/CNC_Turning_Machine_Video_Ready.gif",
    tolerance: "± 0.003 mm (± 0.0001 in)",
    materials: "Medical 316LVM, Titanium Grade 5, Brass, Nickel Alloys",
  },
];



/* ------------------------------------------------------------------ */
/* 3D Isometric Metallic Cube Component                               */
/* ------------------------------------------------------------------ */

function IsometricMetallicCube({
  type,
  label,
  onClick,
  active,
}: {
  type: "steel" | "aluminum" | "stainless";
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center justify-center p-3 rounded-md transition-all duration-300 cursor-pointer ${
        active
          ? "bg-cyan-400/10 ring-1 ring-cyan-400/50"
          : "bg-white/[0.04] hover:bg-white/[0.08]"
      }`}
    >
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]"
        >
          <defs>
            <linearGradient id={`top-${type}`} x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0%"
                stopColor={type === "aluminum" ? "#f1f5f9" : type === "stainless" ? "#f8fafc" : "#64748b"}
              />
              <stop
                offset="100%"
                stopColor={type === "aluminum" ? "#cbd5e1" : type === "stainless" ? "#94a3b8" : "#334155"}
              />
            </linearGradient>
            <linearGradient id={`left-${type}`} x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0%"
                stopColor={type === "aluminum" ? "#94a3b8" : type === "stainless" ? "#94a3b8" : "#475569"}
              />
              <stop
                offset="100%"
                stopColor={type === "aluminum" ? "#475569" : type === "stainless" ? "#475569" : "#1e293b"}
              />
            </linearGradient>
            <linearGradient id={`right-${type}`} x1="0" y1="0" x2="1" y2="1">
              <stop
                offset="0%"
                stopColor={type === "aluminum" ? "#64748b" : type === "stainless" ? "#64748b" : "#334155"}
              />
              <stop
                offset="100%"
                stopColor={type === "aluminum" ? "#334155" : type === "stainless" ? "#1e293b" : "#0f172a"}
              />
            </linearGradient>
          </defs>
          {/* Isometric Cube Faces */}
          {/* Top Face */}
          <polygon
            points="50,15 85,35 50,55 15,35"
            fill={`url(#top-${type})`}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1"
          />
          {/* Left Face */}
          <polygon
            points="15,35 50,55 50,85 15,65"
            fill={`url(#left-${type})`}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          {/* Right Face */}
          <polygon
            points="50,55 85,35 85,65 50,85"
            fill={`url(#right-${type})`}
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="1"
          />
          {/* Subtle Specular Highlights */}
          <line
            x1="50"
            y1="15"
            x2="50"
            y2="55"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <span
        className={`mt-2 text-xs font-mono font-semibold tracking-wide transition-colors ${
          active ? "text-cyan-400" : "text-slate-300 group-hover:text-white"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function CncMachiningpage() {
  const [selectedProcess, setSelectedProcess] = useState<ProcessCardData | null>(
    null
  );
  const [activeMaterial, setActiveMaterial] = useState<
    "steel" | "aluminum" | "stainless"
  >("aluminum");

  return (
    <div className="min-h-screen w-full bg-[#FFFFFF] font-sans text-slate-900 selection:bg-slate-900 selection:text-white">

      {/* ------------------------------------------------------------ */}
      {/* 2. Hero Section                                               */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-slate-950 min-h-[600px] lg:min-h-[660px] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20">
        {/* Full-bleed Industrial Machining Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cnc/hero-cnc.jpg"
            alt="High-precision CNC milling machine machining complex aluminum aerospace component"
            className="h-full w-full object-cover object-center opacity-45"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16 w-full">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Link to="/" className="transition hover:text-cyan-400">Home</Link>
            <ChevronRight className="h-3 w-3 text-slate-500" />
            <span className="text-slate-200 font-semibold">CNC Machining</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-center gap-12">
            {/* Left Hero Content */}
            <div>
              {/* Category Tag */}
              <div className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                CNC MACHINING
              </div>

              {/* Huge Headline */}
              <h1 className="mt-3 text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white leading-[1.05]">
                Precision <br />
                <span className="text-slate-100">Without Limits</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Advanced machining solutions for high-performance materials,
                tight tolerances, and complex geometries. Built for your most
                demanding projects.
              </p>

              {/* 3 Feature Badges */}
              <div className="mt-8 flex flex-wrap gap-4">
                {/* Badge 1: Tighter Tolerances */}
                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/10 text-cyan-400">
                    <Crosshair className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-xs font-medium leading-tight text-slate-200">
                    Tighter
                    <br />
                    Tolerances
                  </span>
                </div>

                {/* Badge 2: Wide Material Range */}
                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/10 text-cyan-400">
                    <Layers className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-xs font-medium leading-tight text-slate-200">
                    Wide
                    <br />
                    Material Range
                  </span>
                </div>

                {/* Badge 3: From Prototype to Production */}
                <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/10 text-cyan-400">
                    <Box className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-xs font-medium leading-tight text-slate-200">
                    From Prototype
                    <br />
                    to Production
                  </span>
                </div>
              </div>

              {/* Divider and focal point footer line */}
              <div className="mt-14 flex items-center gap-4">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  MICRON-LEVEL REPEATABILITY
                </span>
                <span className="h-px w-36 bg-slate-700" />
              </div>
            </div>

            {/* Right Hero Typographic Column */}
            <div className="flex flex-col items-start lg:items-end justify-between h-full space-y-12">
              <div className="hidden lg:flex items-center gap-3 self-end">
                <div className="h-32 w-px bg-white/20" />
                <div className="font-mono text-xs font-medium tracking-[0.2em] uppercase leading-relaxed text-slate-300">
                  IDEAS
                  <br />
                  INTO
                  <br />
                  PRECISION
                  <br />
                  PARTS
                </div>
              </div>

              <div className="text-left lg:text-right">
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  FOCAL POINT
                </p>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                  LUDHIANA, INDIA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 3. Section 01: ADVANCED MACHINING                             */}
      {/* ------------------------------------------------------------ */}
      <section className="border-b border-slate-100 bg-[#FAFAFC] px-6 py-16 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Content */}
            <div>
              {/* Eyebrow badge */}
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 items-center justify-center rounded border border-slate-300 px-1.5 text-[11px] font-mono font-bold text-slate-700">
                  01
                </span>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-500">
                  ADVANCED MACHINING
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-slate-950 leading-tight">
                For the Most Demanding Projects
              </h2>

              {/* Description */}
              <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                Advanced machining solutions cover high-performance materials,
                tight tolerances, and complex part geometries. Using
                state-of-the-art machinery and experienced engineers, we solve
                your toughest manufacturing challenges.
              </p>

              {/* Checklist */}
              <ul className="mt-6 space-y-3.5">
                {[
                  "Custom solutions tailored to your industry",
                  "Integration of multiple machining technologies",
                  "Optimized performance for critical applications",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-400 text-slate-950 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                    <span className="text-sm font-semibold text-slate-800">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Overview Video Button */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedProcess({
                      number: "01",
                      title: "Advanced CNC Machining Overview",
                      description:
                        "Comprehensive look into Solvoka's high-speed 5-axis centers, wire EDM, and micron-level precision quality inspection facilities.",
                      bullets: [
                        "5-axis continuous milling centers",
                        "Live tooling turning with sub-spindles",
                        "Class-leading CMM & optical inspection",
                      ],
                      image: "/cnc/precision-manifold.jpg",
                      videoGif: "/Gif-Assets/CNC_Milling_Machine_Video_Ready.gif",
                      tolerance: "± 0.002 mm (± 0.00008 in)",
                      materials: "Aerospace Titanium, Inconel, 6061-T6, SS 316L",
                    })
                  }
                  className="inline-flex items-center gap-3 rounded-md bg-slate-950 px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-all duration-200 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-cyan-400/20"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                    <Play className="ml-0.5 h-2.5 w-2.5 fill-current" />
                  </span>
                  Watch Overview Video
                </button>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="relative flex items-center justify-center">
              {/* Soft radial spotlight */}
              <div className="absolute inset-0 rounded-full bg-radial from-slate-200/60 via-slate-100/20 to-transparent blur-2xl" />

              <div className="relative z-10 flex w-full max-w-md items-center justify-between gap-6">
                {/* Machined Manifold Visual */}
                <div className="relative overflow-hidden rounded-lg border border-slate-200/80 bg-white p-2 shadow-2xl shadow-slate-300/40">
                  <img
                    src="/cnc/precision-manifold.jpg"
                    alt="Precision 5-axis CNC machined 6061-T6 aluminum engine block and manifold"
                    className="h-72 w-full object-contain rounded-md sm:h-80"
                  />
                </div>

                {/* Right side typography */}
                <div className="flex flex-col items-start text-left">
                  <p className="font-mono text-[11px] uppercase tracking-widest leading-relaxed text-slate-500">
                    COMPLEX
                    <br />
                    MATERIALS
                    <br />
                    TIGHTER
                    <br />
                    TOLERANCES
                    <br />
                    REAL RESULTS
                  </p>
                  <div className="mt-3 h-[1px] w-8 bg-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 4. Category Header: OUR CNC MACHINING PROCESSES               */}
      {/* ------------------------------------------------------------ */}
      <section className="px-6 pt-14 lg:pt-20 pb-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center">
          {/* Left label with dash */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-cyan-400" />
            <h3 className="font-display text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-900">
              OUR CNC MACHINING PROCESSES
            </h3>
          </div>

          {/* Right subtitle */}
          <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-slate-400">
            DIFFERENT PROCESSES. A WIDER RANGE OF POSSIBILITIES.
          </span>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 5. Process Cards Grid (3x3 Layout)                            */}
      {/* ------------------------------------------------------------ */}
      <section className="px-6 pb-16 lg:px-16 lg:pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PROCESS_CARDS.map((process) => (
            <div
              key={process.number}
              className="group flex flex-col justify-between overflow-hidden rounded-lg border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-xl"
            >
              <div>
                {/* Media Banner */}
                <div
                  onClick={() => setSelectedProcess(process)}
                  className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-md bg-slate-950"
                >
                  <img
                    src={process.image}
                    alt={process.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="pt-5">
                  <h4 className="font-display text-xl font-semibold tracking-tight text-slate-950">
                    {process.title}
                  </h4>

                  {process.subtitle && (
                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {process.subtitle}
                    </p>
                  )}

                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {process.description}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-4 space-y-2">
                    {process.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 flex-none text-slate-800"
                          strokeWidth={2.6}
                        />
                        <span className="text-xs font-medium text-slate-700 leading-snug">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Spec Bar & Action */}
              <div className="mt-6 border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-slate-500">
                  {process.tolerance}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProcess(process)}
                  className="text-xs font-bold text-slate-900 hover:text-cyan-500 transition flex items-center gap-1"
                >
                  Details
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Position 9: Dark Feature / Showcase Tile */}
          <div className="flex flex-col justify-between overflow-hidden rounded-lg border border-slate-800 bg-[#111317] p-6 text-white shadow-xl">
            {/* Top Typography */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest leading-relaxed text-slate-300">
                SAME
                <br />
                MATERIALS.
                <br />
                HIGHER
                <br />
                POSSIBILITIES.
              </p>
              <div className="my-4 h-[1px] w-10 bg-cyan-400" />
            </div>

            {/* Bottom Machined Part Graphic */}
            <div className="relative mt-4 flex items-center justify-center overflow-hidden rounded-md bg-black/40 p-4 border border-white/5">
              <img
                src="/cnc/precision-manifold.jpg"
                alt="Precision machined aerospace manifold"
                className="h-44 w-full object-contain filter contrast-125 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 6. Split Section: Materials & Tolerance + Quality Checks       */}
      {/* ------------------------------------------------------------ */}
      <section className="px-6 pb-20 lg:px-16 lg:pb-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Box: 10 MATERIALS & TOLERANCE (Dark Card) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-lg border border-slate-800 bg-[#111318] p-8 text-white shadow-2xl">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="flex h-5 items-center justify-center rounded border border-cyan-400/30 bg-cyan-400/5 px-1.5 text-[10px] font-mono font-bold text-cyan-400">
                  10
                </span>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-400">
                  MATERIALS &amp; TOLERANCE
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                What We Machine, and How Tight
              </h3>

              <p className="mt-2 font-mono text-xs text-slate-400">
                Materials: steel, aluminum, stainless steel.
              </p>

              {/* 3 Metallic Isometric Cubes Row */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <IsometricMetallicCube
                  type="steel"
                  label="Steel"
                  active={activeMaterial === "steel"}
                  onClick={() => setActiveMaterial("steel")}
                />
                <IsometricMetallicCube
                  type="aluminum"
                  label="Aluminum"
                  active={activeMaterial === "aluminum"}
                  onClick={() => setActiveMaterial("aluminum")}
                />
                <IsometricMetallicCube
                  type="stainless"
                  label="Stainless Steel"
                  active={activeMaterial === "stainless"}
                  onClick={() => setActiveMaterial("stainless")}
                />
              </div>

              {/* Dynamic Material Details Pill */}
              <div className="mt-6 rounded-md bg-white/[0.04] p-3 font-mono text-xs text-slate-300 border border-white/10">
                {activeMaterial === "aluminum" && (
                  <p>
                    <strong className="text-cyan-400">Aluminum Alloys:</strong> 6061-T6, 7075-T651, 2024, 5083. Tolerances down to ± 0.005 mm with high thermal conductivity.
                  </p>
                )}
                {activeMaterial === "steel" && (
                  <p>
                    <strong className="text-cyan-400">Carbon &amp; Alloy Steels:</strong> 1018, 4140 (pre-hardened &amp; annealed), 4340, 8620. High shear strength &amp; fatigue limits.
                  </p>
                )}
                {activeMaterial === "stainless" && (
                  <p>
                    <strong className="text-cyan-400">Stainless Steels:</strong> 304, 316L, 17-4 PH, 420. Superior corrosion resistance &amp; medical biocompatibility.
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Graphic & Typography */}
            <div className="mt-8 flex items-end justify-between gap-6 border-t border-white/10 pt-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest leading-relaxed text-slate-400">
                  THREE
                  <br />
                  MATERIALS,
                  <br />
                  ENDLESS
                  <br />
                  POSSIBILITIES.
                </p>
                <div className="mt-3 h-[1px] w-8 bg-cyan-400/60" />
              </div>

              <div className="relative h-24 w-36 overflow-hidden rounded-md bg-black/40 border border-white/10">
                <img
                  src="/cnc/precision-manifold.jpg"
                  alt="Precision machined manifold"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Box: 11 IN-PROCESS CHECKS (Light Card) */}
          <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-[#F7F8FA] p-8 shadow-sm">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="flex h-5 items-center justify-center rounded border border-slate-300 bg-white px-1.5 text-[10px] font-mono font-bold text-slate-800">
                  11
                </span>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-600">
                  IN-PROCESS CHECKS
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
                Quality, During the Process
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Every run gets manual caliper and gauge checks at fixed hourly
                intervals to catch tool wear or thermal drift before it becomes an
                out-of-tolerance part — see Gate 2 of our inspection process.
              </p>

              {/* Inspection Link */}
              <Link
                to="/quality"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 transition hover:gap-2.5 hover:text-cyan-600"
              >
                Learn about our inspection process
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              </Link>
            </div>

            {/* Caliper Measurement Photo */}
            <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md">
              <img
                src="/cnc/caliper-inspection.jpg"
                alt="Quality inspector using digital vernier caliper to check precision CNC turned part"
                className="h-56 w-full object-cover sm:h-64"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 7. Section 12: RFQ / Ready to Get Started?                     */}
      {/* ------------------------------------------------------------ */}
      <section className="px-6 pb-16 lg:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-slate-800 bg-[#0B0F19] px-8 py-14 text-white shadow-2xl lg:px-12 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
            {/* Left Column: Headline & CTA */}
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 items-center justify-center rounded border border-cyan-400/30 bg-cyan-400/5 px-1.5 text-[10px] font-mono font-bold text-cyan-400">
                  12
                </span>
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-400">
                  READY TO GET STARTED?
                </span>
              </div>

              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-white">
                Get a Quote for CNC Machining
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
                Send the basics now — for material, size, or finish details, use
                the full request-a-quote form.
              </p>

              <div className="mt-6">
                <Link
                  to="/#quote"
                  className="inline-flex items-center gap-2 rounded-md bg-cyan-400 px-7 py-3.5 text-xs font-bold text-slate-950 shadow-lg transition-all duration-200 hover:bg-cyan-300 hover:shadow-xl hover:gap-3"
                >
                  Request a Quote
                  <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                </Link>
                <p className="mt-2.5 text-xs text-slate-400">
                  Process pre-selected:{" "}
                  <strong className="text-white">CNC Machining</strong>
                </p>
              </div>
            </div>

            {/* Middle Column: 3 Trust Indicators */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {/* Indicator 1 */}
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-white/10 text-cyan-400">
                  <Zap className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Fast Response</p>
                  <p className="text-xs text-slate-400">
                    Typically within 24 hours
                  </p>
                </div>
              </div>

              {/* Indicator 2 */}
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-white/10 text-cyan-400">
                  <Lock className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Confidential</p>
                  <p className="text-xs text-slate-400">
                    Your data is safe with us
                  </p>
                </div>
              </div>

              {/* Indicator 3 */}
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-white/10 text-cyan-400">
                  <Headphones className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Expert Support</p>
                  <p className="text-xs text-slate-400">
                    We help you find the right solution
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Circular Hub Graphic & Typography */}
            <div className="flex items-center justify-start gap-5 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0">
              <div className="relative h-32 w-32 flex-none overflow-hidden rounded-full border border-white/20 bg-black/60 shadow-inner">
                <img
                  src="/cnc/flange-hub.jpg"
                  alt="Precision CNC turned and milled circular aerospace flange hub"
                  className="h-full w-full object-cover scale-110"
                />
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-widest leading-relaxed text-slate-300">
                  YOUR
                  <br />
                  IDEAS.
                  <br />
                  OUR
                  <br />
                  PRECISION.
                </p>
                <div className="mt-3 h-[1.5px] w-8 bg-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ------------------------------------------------------------ */}
      {/* Interactive Process Video / Details Modal                     */}
      {/* ------------------------------------------------------------ */}
      {selectedProcess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-slate-800 bg-slate-900 text-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="rounded bg-cyan-400/10 px-2 py-0.5 text-xs font-mono font-bold text-cyan-400">
                  {selectedProcess.number}
                </span>
                <h4 className="font-display text-lg font-semibold">{selectedProcess.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProcess(null)}
                className="rounded-md bg-white/10 p-2 text-slate-400 transition hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video / GIF Player */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={selectedProcess.videoGif || selectedProcess.image}
                alt={selectedProcess.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-6">
              <p className="text-sm leading-relaxed text-slate-300">
                {selectedProcess.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 rounded-md bg-white/5 p-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Typical Tolerance</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {selectedProcess.tolerance || "± 0.005 mm"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Supported Materials</span>
                  <span className="font-mono font-semibold text-white truncate block">
                    {selectedProcess.materials || "Steel, Aluminum, Stainless"}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProcess(null)}
                  className="rounded-md px-5 py-2 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Close
                </button>
                <Link
                  to="/#quote"
                  onClick={() => setSelectedProcess(null)}
                  className="inline-flex items-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Quote this Process
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
