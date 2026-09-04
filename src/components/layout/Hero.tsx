"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SLIDE_ONE_VIDEO_SRC = "/HeroPage-Video.mp4";
const SLIDE_TWO_VIDEO_SRC = "/Solvoka_Hero.mp4";
const MOBILE_VIDEO_SRC = "/HeroPage-VideoForPhone.mp4";

const SLIDE_COUNT = 2;
const SLIDE_TRANSITION_MS = 700;

const TRUST_CHIPS = [
  "15+ PARTNER FACILITIES",
  "3-GATE INSPECTION",
  "1-BUSINESS-DAY QUOTE",
];

const MATERIALS = [
  "CARBON STEEL",
  "ALLOY STEEL",
  "STAINLESS STEEL",
  "MILD STEEL",
  "ALUMINIUM",
  "BRASS",
  "BRONZE",
  "ENGINEERING PLASTICS",
];

function MaterialItem({ label }: { label: string }) {
  return (
    <span className="flex shrink-0 items-center gap-6">
      <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-navy-800">{label}</span>
      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
    </span>
  );
}

function ShieldCheck() {
  return (
    <svg width="18" height="20" viewBox="0 0 20 22" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M10 1.5 18 4.6v6.1c0 4.6-3.2 8.3-8 9.8-4.8-1.5-8-5.2-8-9.8V4.6L10 1.5Z"
        stroke="#2563eb"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6.4 10.8 9 13.4l4.6-4.8" stroke="#2563eb" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DimensionLine() {
  return (
    <div className="relative my-2 h-3 w-full max-w-[560px]" aria-hidden="true">
      <span className="absolute left-0 top-0 h-3 w-[2px] bg-blue-600" />
      <span className="absolute right-0 top-0 h-3 w-[2px] bg-blue-600" />
      <span className="absolute left-0 right-0 top-[5px] h-[2px] bg-blue-600" />
    </div>
  );
}

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);
  const activeVideoRef = useRef<HTMLVideoElement>(null);

  const slideOneContentRef = useRef<HTMLDivElement>(null);
  const slideTwoContentRef = useRef<HTMLDivElement>(null);
  const slideContentRefs = [slideOneContentRef, slideTwoContentRef];

  // Screen size detection so only the relevant video is mounted
  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen, { passive: true });
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Autoplay and pause video when off-screen to conserve battery/memory
  useEffect(() => {
    const video = activeVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [active, isMobileScreen]);

  // Entrance reveal animation with reduced motion support
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const content = slideContentRefs[active]?.current;
    if (!content) return;

    const targets = content.querySelectorAll<HTMLElement>("[data-hero-reveal]");
    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.08, delay: active === 0 ? 0.15 : 0.05 }
      );
    });
    return () => ctx.revert();
  }, [active]);

  const currentVideoSrc = isMobileScreen
    ? MOBILE_VIDEO_SRC
    : active === 0
    ? SLIDE_ONE_VIDEO_SRC
    : SLIDE_TWO_VIDEO_SRC;

  return (
    <section
      ref={heroSectionRef}
      className="relative flex min-h-[100dvh] shrink-0 flex-col overflow-hidden bg-neutral-950"
    >
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Optimized background video layer — only renders active device stream */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <video
            key={currentVideoSrc}
            ref={activeVideoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={currentVideoSrc} type="video/mp4" />
          </video>

          {/* Unified scrim overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75"
            aria-hidden="true"
          />

          {/* Left-side desktop backdrop blur and high-contrast wash for readability */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[68%] backdrop-blur-sm lg:block"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
              maskImage: "linear-gradient(to right, black 0%, black 65%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[68%] lg:block"
            style={{
              background: "linear-gradient(to right, rgba(7,13,23,0.88) 0%, rgba(7,13,23,0.65) 55%, rgba(7,13,23,0) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Slides carousel container */}
        <div
          className="relative z-10 flex flex-1 ease-in-out"
          style={{
            width: `${SLIDE_COUNT * 100}%`,
            transform: `translateX(-${(active * 100) / SLIDE_COUNT}%)`,
            transitionProperty: "transform",
            transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
          }}
        >
          {/* Slide 1 */}
          <div className="relative flex shrink-0 flex-col overflow-hidden" style={{ width: `${100 / SLIDE_COUNT}%` }}>
            <div className="relative flex flex-1 items-center overflow-hidden py-10 pt-28 sm:pt-32 lg:py-0 lg:pt-20">
              <div className="mx-auto w-full max-w-[1672px] px-4 sm:px-6 lg:px-10">
                <div ref={slideOneContentRef} className="max-w-[720px]">
                  {/* Headline */}
                  <h1 className="font-display font-medium leading-[0.98] tracking-[-0.02em] text-white">
                    <span data-hero-reveal className="block text-[clamp(30px,4.4vw,58px)] font-bold">
                      One Supplier.
                    </span>
                    <span data-hero-reveal className="block text-[clamp(30px,4.4vw,58px)] font-bold">
                      Six Processes.
                    </span>
                    <span
                      data-hero-reveal
                      className="mt-1 block text-[clamp(28px,4vw,50px)] font-extrabold uppercase leading-[1.05] text-transparent"
                      style={{ WebkitTextStroke: "2px #2563eb" }}
                    >
                      One Quality Standard.
                    </span>
                  </h1>

                  <div data-hero-reveal>
                    <DimensionLine />
                  </div>

                  {/* Location */}
                  <p data-hero-reveal className="tabular font-mono text-[13px] sm:text-[15px] uppercase tracking-[0.14em] text-blue-600 font-semibold">
                    Focal Point, Ludhiana, India
                  </p>

                  {/* Subheadline */}
                  <p data-hero-reveal className="mt-3 max-w-[620px] font-sans text-[14px] leading-relaxed text-slate-200 sm:text-[16px] sm:leading-[1.6]">
                    Forging, CNC machining, casting, injection molding, sheet metal fabrication, and 3D printing —
                    coordinated through 15+ vetted facilities in Focal Point, Ludhiana, India, for automotive OEMs and
                    exporters. Drawings quoted within one business day.
                  </p>

                  {/* Legacy tagline */}
                  <p
                    data-hero-reveal
                    className="mt-3 border-l-2 border-blue-600/60 pl-3 font-mono text-[11px] sm:text-[12px] italic uppercase tracking-[0.12em] text-slate-300"
                  >
                    &ldquo;Your Challenge is Our Blueprint&rdquo;
                  </p>

                  {/* CTAs */}
                  <div data-hero-reveal className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
                    <a
                      href="/request-a-quote"
                      className="group inline-flex h-12 items-center gap-2 bg-blue-600 px-6 font-sans text-[15px] font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-[0.99]"
                    >
                      Request a Quote
                      <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </a>
                    <a
                      href="/capabilities"
                      className="inline-flex h-12 items-center border border-white/70 bg-black/20 px-6 font-sans text-[15px] font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white hover:text-navy-900"
                    >
                      View Capabilities
                    </a>
                  </div>

                  {/* Trust chips */}
                  <ul data-hero-reveal className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-6">
                    {TRUST_CHIPS.map((chip, i) => (
                      <li key={chip} className="flex items-center gap-3 sm:gap-4">
                        <span className="tabular flex items-center gap-1.5 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-white">
                          {i === 0 && <ShieldCheck />}
                          {chip}
                        </span>
                        {i < TRUST_CHIPS.length - 1 && <span className="h-3.5 w-[2px] bg-blue-600/80" aria-hidden="true" />}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative flex shrink-0 flex-col overflow-hidden" style={{ width: `${100 / SLIDE_COUNT}%` }}>
            <div className="relative flex flex-1 items-center overflow-hidden py-10 pt-28 sm:pt-32 lg:py-0 lg:pt-20">
              <div className="mx-auto w-full max-w-[1672px] px-4 sm:px-6 lg:px-10">
                <div ref={slideTwoContentRef} className="max-w-[720px]">
                  {/* Headline */}
                  <h1 className="font-display font-medium leading-[0.98] tracking-[-0.02em] text-white">
                    <span data-hero-reveal className="block text-[clamp(30px,3.8vw,56px)] font-bold">
                      Forged and Machined
                    </span>
                    <span data-hero-reveal className="block text-[clamp(30px,3.8vw,56px)] font-bold">
                      Components for Automotive
                    </span>
                    <span
                      data-hero-reveal
                      className="mt-1 block text-[clamp(28px,3.4vw,48px)] font-extrabold uppercase leading-[1.05] text-transparent"
                      style={{ WebkitTextStroke: "2px #2563eb" }}
                    >
                      OEMs and Exporters
                    </span>
                  </h1>

                  <div data-hero-reveal>
                    <DimensionLine />
                  </div>

                  {/* Location */}
                  <p data-hero-reveal className="tabular font-mono text-[13px] sm:text-[15px] uppercase tracking-[0.14em] text-blue-600 font-semibold">
                    Focal Point, Ludhiana, India
                  </p>

                  {/* Subheadline */}
                  <p data-hero-reveal className="mt-3 max-w-[620px] font-sans text-[14px] leading-relaxed text-slate-200 sm:text-[16px] sm:leading-[1.6]">
                    A coordinated network of 15+ vetted facilities in Focal Point, Ludhiana, India — one contract, one quality standard, one point of accountability. Drawings quoted within one business day.
                  </p>

                  {/* Legacy tagline */}
                  <p
                    data-hero-reveal
                    className="mt-3 border-l-2 border-blue-600/60 pl-3 font-mono text-[11px] sm:text-[12px] italic uppercase tracking-[0.12em] text-slate-300"
                  >
                    &ldquo;Your Challenge is Our Blueprint&rdquo;
                  </p>

                  {/* CTAs */}
                  <div data-hero-reveal className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
                    <a
                      href="/request-a-quote"
                      className="group inline-flex h-12 items-center gap-2 bg-blue-600 px-6 font-sans text-[15px] font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-[0.99]"
                    >
                      Request a Quote
                      <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </a>
                    <a
                      href="/capabilities"
                      className="inline-flex h-12 items-center border border-white/70 bg-black/20 px-6 font-sans text-[15px] font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white hover:text-navy-900"
                    >
                      View Capabilities
                    </a>
                  </div>

                  {/* Trust chips */}
                  <ul data-hero-reveal className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-6">
                    {TRUST_CHIPS.map((chip, i) => (
                      <li key={chip} className="flex items-center gap-3 sm:gap-4">
                        <span className="tabular flex items-center gap-1.5 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.06em] text-white">
                          {i === 0 && <ShieldCheck />}
                          {chip}
                        </span>
                        {i < TRUST_CHIPS.length - 1 && <span className="h-3.5 w-[2px] bg-blue-600/80" aria-hidden="true" />}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicator / slide controls */}
        <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 sm:right-6 lg:right-8">
          <button
            type="button"
            onClick={() => setActive((a) => (a === 0 ? 1 : 0))}
            aria-label={active === 0 ? "Switch to slide 2" : "Switch to slide 1"}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-md transition-all hover:border-blue-600 hover:bg-blue-600"
          >
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Material ticker marquee */}
      <div className="group relative z-10 shrink-0 overflow-hidden border-t-2 border-blue-600 bg-white/95 px-4 py-3 backdrop-blur-sm lg:px-10">
        <div className="flex w-max animate-[marquee-right_28s_linear_infinite] items-center gap-6 group-hover:[animation-play-state:paused] motion-reduce:[animation-duration:60s]">
          {[...MATERIALS, ...MATERIALS].map((m, i) => (
            <MaterialItem key={`${m}-${i}`} label={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
