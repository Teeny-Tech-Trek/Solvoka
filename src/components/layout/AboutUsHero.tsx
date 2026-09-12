import { Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Custom Factory / Network Icon for Card 2                           */
/* ------------------------------------------------------------------ */
function FactoryNetworkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M18 18h.01" />
      <path d="M12 18h.01" />
      <path d="M6 18h.01" />
    </svg>
  );
}

export default function AboutUsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-28 lg:pb-16 min-h-[640px] xl:min-h-[720px] flex items-center">
      {/* ============================================================ */}
      {/* BACKGROUND ARTWORK: AboutUs-Image.png + Luminous Left Gradient*/}
      {/* ============================================================ */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
        {/* Full resolution AboutUs-Image background artwork */}
        <img
          src="/AboutUs-Image.png"
          alt="Solvoka Precision Manufacturing Network"
          className="h-full w-full object-cover object-[72%_center] lg:object-[68%_center] xl:object-[65%_center]"
        />

        {/* Left-only gradient wash: 100% transparent across the right side and parts */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.88) 28%, rgba(255,255,255,0.3) 38%, rgba(255,255,255,0) 46%)",
          }}
        />

      </div>

      {/* ============================================================ */}
      {/* FOREGROUND CONTENT: Clean Left Column                        */}
      {/* ============================================================ */}
      <div className="relative z-20 mx-auto w-full max-w-[1560px] px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Link to="/" className="transition-colors hover:text-[#ff5500]">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-900">About Solvoka</span>
          </nav>

          {/* Eyebrow: Orange bar + ABOUT SOLVOKA */}
          <div className="mt-5 flex items-center gap-2.5">
            <span className="h-[2px] w-7 bg-[#ff5500]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#ff5500]">
              ABOUT SOLVOKA
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-3.5 font-display text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl lg:text-[56px] xl:text-[62px] leading-[1.06]">
            Precision
            <br />
            Manufacturing,
            <br />
            <span className="text-[#ff5500]">A Proven Network</span>
          </h1>

          {/* Subheading Description: backdrop blur specifically behind this text only */}
          <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-900 max-w-xl backdrop-blur-md bg-white/40 rounded-xl p-3 sm:p-4 border border-white/30 shadow-xs">
            Solvoka operates from Focal Point, Ludhiana — one of Punjab&rsquo;s established forging and machining districts — coordinating a network of 15+ vetted partner facilities under a single quality standard, so automotive OEMs and exporters get one point of contact for forging, CNC machining, casting, sheet metal fabrication and 3D printing.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff5500] px-7 py-3 font-sans text-sm font-semibold text-white shadow-md shadow-[#ff5500]/25 transition-all hover:bg-[#e04b00] active:scale-[0.98]"
            >
              <span>Talk to Us</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>

            <Link
              to="/#capabilities"
              className="inline-flex items-center rounded-xl border border-slate-300/90 bg-white/90 px-6 py-3 font-sans text-sm font-semibold text-slate-800 shadow-xs transition-colors hover:bg-white hover:border-slate-400"
            >
              View Capabilities
            </Link>
          </div>

          {/* 3 Feature / Stat Cards */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3.5 max-w-xl lg:max-w-2xl">
            {/* Card 1: Home Base */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-sm backdrop-blur-xs transition-transform duration-200 hover:-translate-y-0.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e0effe] text-[#0066cc]">
                <MapPin className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 leading-tight">
                  HOME BASE
                </span>
                <span className="block font-display text-[13px] font-bold text-slate-900 leading-tight mt-0.5 truncate">
                  Focal Point, Ludhiana
                </span>
                <span className="block text-[10.5px] text-slate-500 leading-snug mt-0.5 truncate">
                  Punjab Heavy-Industrial Belt
                </span>
              </div>
            </div>

            {/* Card 2: Partner Network */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-sm backdrop-blur-xs transition-transform duration-200 hover:-translate-y-0.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e0effe] text-[#0066cc]">
                <FactoryNetworkIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 leading-tight">
                  PARTNER NETWORK
                </span>
                <span className="block font-display text-[13px] font-bold text-slate-900 leading-tight mt-0.5 truncate">
                  15+ Vetted Facilities
                </span>
                <span className="block text-[10.5px] text-slate-500 leading-snug mt-0.5 truncate">
                  Forging, CNC, Casting, Sheet Metal, 3D
                </span>
              </div>
            </div>

            {/* Card 3: Quality Standard */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3.5 shadow-sm backdrop-blur-xs transition-transform duration-200 hover:-translate-y-0.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e0effe] text-[#0066cc]">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 leading-tight">
                  QUALITY STANDARD
                </span>
                <span className="block font-display text-[13px] font-bold text-slate-900 leading-tight mt-0.5 truncate">
                  One Standard, Every Order
                </span>
                <span className="block text-[10.5px] text-slate-500 leading-snug mt-0.5 truncate">
                  Zero-Concession Tolerance Governance
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Hairline + Tagline */}
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            <span className="font-mono text-[10px] sm:text-[10.5px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
              FROM LUDHIANA TO THE WORLD &mdash; ONE NETWORK, HIGHER STANDARDS.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
