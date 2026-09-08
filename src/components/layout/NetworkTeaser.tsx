import { ArrowRight, Factory, Network, Shield } from "lucide-react";

export default function NetworkTeaser() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-white bg-cover bg-center bg-no-repeat min-h-[480px] sm:min-h-[580px] lg:min-h-[680px] py-12 sm:py-16"
      style={{ backgroundImage: "url('/Network-Image.webp')" }}
      aria-label="Our Base & Network"
    >
      <div className="relative mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-10">
        {/* Content aligned with borderless feathered white blend */}
        <div className="relative max-w-xl lg:max-w-2xl text-left">
          <div
            className="pointer-events-none absolute -inset-4 sm:-inset-8 z-0 overflow-visible"
            aria-hidden="true"
          >
            {/* Dense central white core for text contrast */}
            <div className="absolute inset-2 sm:inset-4 rounded-3xl bg-white/95 blur-2xl" />
            <div className="absolute -inset-2 sm:-inset-6 rounded-full bg-white/80 blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="mb-2">
              <span className="font-mono text-xs sm:text-[13px] font-bold tracking-widest text-blue-600 uppercase">
                OUR BASE &amp; NETWORK
              </span>
              <div className="mt-1.5 h-0.5 w-10 bg-blue-600" />
            </div>

            {/* Main Headline */}
            <h2 className="mt-3 font-display text-[clamp(24px,4vw,42px)] font-extrabold leading-[1.15] tracking-tight text-[#0B1420]">
              Based in One of India’s
              <br />
              Real Forging Clusters
            </h2>

            {/* Description Paragraph */}
            <p className="mt-3 sm:mt-4 font-sans text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl">
              Solvoka operates from Focal Point, Ludhiana — one of Punjab’s established forging and machining districts — coordinating a network of 15+ vetted partner facilities under a single quality standard.
            </p>

            {/* About Solvoka Button */}
            <div className="mt-5 sm:mt-6">
              <a
                href="/about"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/35 active:scale-[0.99]"
              >
                <span>About Solvoka</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </a>
            </div>

            {/* Stats / Value Highlights: 1 column on mobile, 3 columns on tablet/desktop */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 sm:divide-x sm:divide-slate-200/90 border-t border-slate-200/80 pt-5 sm:pt-6">
              {/* Stat 1: Home Base */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 sm:pr-4 lg:pr-6">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/90 text-blue-600 border border-blue-100 shadow-xs">
                  <Factory className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="sm:mt-2.5 font-display text-sm sm:text-[15px] font-bold text-slate-900">
                    Home Base
                  </h3>
                  <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 uppercase leading-tight sm:leading-snug">
                    FOCAL POINT, LUDHIANA
                  </p>
                </div>
              </div>

              {/* Stat 2: 15+ Facilities */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 sm:px-4 lg:px-6">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/90 text-blue-600 border border-blue-100 shadow-xs">
                  <Network className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="sm:mt-2.5 font-display text-sm sm:text-[15px] font-bold text-slate-900">
                    15+
                  </h3>
                  <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 uppercase leading-tight sm:leading-snug">
                    VETTED PARTNER FACILITIES
                  </p>
                </div>
              </div>

              {/* Stat 3: One Standard */}
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 sm:pl-4 lg:pl-6">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/90 text-blue-600 border border-blue-100 shadow-xs">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="sm:mt-2.5 font-display text-sm sm:text-[15px] font-bold text-slate-900 uppercase">
                    ONE STANDARD
                  </h3>
                  <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-slate-500 uppercase leading-tight sm:leading-snug">
                    QUALITY ACROSS THE NETWORK
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
