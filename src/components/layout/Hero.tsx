
"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "gsap";

/**
 * PLACEHOLDER PATHS — swap when the real assets are ready.
 * Video: MP4/H.264, ~1920x1080, trimmed to a clean loop point (no hard
 * cut/flash at the seam). Keep it under ~8–10MB if you can — it only
 * plays on lg+ screens (see the mobile note further down).
 */
const SLIDE_ONE_VIDEO_SRC = "/HeroPage-Video.mp4";
const SLIDE_TWO_VIDEO_SRC = "/Solvoka_Hero.mp4";
const MOBILE_VIDEO_SRC = "/HeroPage-VideoForPhone.mp4";

const SLIDE_COUNT = 2;
const SLIDE_TRANSITION_MS = 700;

const TRUST_CHIPS = [
  "15+ PARTNER FACILITIES",
  "3-GATE INSPECTION",
  // "FOCAL POINT, INDIA",
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
      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
    </span>
  );
}

function ShieldCheck() {
  return (
    <svg width="18" height="20" viewBox="0 0 20 22" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M10 1.5 18 4.6v6.1c0 4.6-3.2 8.3-8 9.8-4.8-1.5-8-5.2-8-9.8V4.6L10 1.5Z"
        stroke="#E8891C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6.4 10.8 9 13.4l4.6-4.8" stroke="#E8891C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** CAD-style dimension line with perpendicular end caps — the site's signature device. */
function DimensionLine() {
  return (
    <div className="relative my-2 h-3 w-full max-w-[560px]" aria-hidden="true">
      <span className="absolute left-0 top-0 h-3 w-[2px] bg-amber-500" />
      <span className="absolute right-0 top-0 h-3 w-[2px] bg-amber-500" />
      <span className="absolute left-0 right-0 top-[5px] h-[2px] bg-amber-500" />
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

/** Autoplays a background video reliably, working around React/browser quirks with <source> timing. */
function useAutoplayVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Belt-and-braces: React doesn't always apply the `muted` JSX attribute
    // to the underlying DOM property before the browser evaluates its
    // autoplay policy, which can silently block playback. Setting it
    // imperatively here closes that gap.
    video.muted = true;
    // React attaches the <source> child after the <video> element itself
    // mounts, which can leave the browser's media engine with no source to
    // play. Forcing a reload once the source is in place guarantees it's
    // picked up before we call play().
    video.load();
    video.play().catch((err) => {
      if (import.meta.env.DEV) {
        console.warn("[Hero] video.play() was blocked:", err);
      }
    });
  }, [videoRef]);
}

function HeroBackdrop({
  videoSrc,
  videoRef,
  mobileVideoSrc,
  mobileVideoRef,
}: {
  videoSrc: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  mobileVideoSrc: string;
  mobileVideoRef: RefObject<HTMLVideoElement | null>;
}) {
  return (
    <>
      {/* Background video — lg+ only. See the phone video below for smaller screens. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => {
            if (import.meta.env.DEV) {
              console.error(
                `[Hero] Could not load "${videoSrc}". Confirm the file exists at /public${videoSrc} and the path/case match exactly.`
              );
            }
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Background video — phone screens, a lighter dedicated clip */}
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <video
          ref={mobileVideoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => {
            if (import.meta.env.DEV) {
              console.error(
                `[Hero] Could not load "${mobileVideoSrc}". Confirm the file exists at /public${mobileVideoSrc} and the path/case match exactly.`
              );
            }
          }}
        >
          <source src={mobileVideoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Even wash across the whole frame so text and the amber accent stay legible over any footage */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(6,9,14,0.35) 0%, rgba(6,9,14,0.55) 100%)" }}
        aria-hidden="true"
      />

      {/* Left-side blur, faded out toward the right so the footage stays sharp and visible there */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[64%] backdrop-blur-md lg:block"
        style={{
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 62%, transparent 100%)",
          maskImage: "linear-gradient(to right, black 0%, black 62%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[64%] lg:block"
        style={{
          background: "linear-gradient(to right, rgba(6,9,14,0.82) 0%, rgba(6,9,14,0.6) 45%, rgba(6,9,14,0) 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);

  const slideOneVideoRef = useRef<HTMLVideoElement>(null);
  const slideTwoVideoRef = useRef<HTMLVideoElement>(null);
  const slideOneMobileVideoRef = useRef<HTMLVideoElement>(null);
  const slideTwoMobileVideoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(slideOneVideoRef);
  useAutoplayVideo(slideTwoVideoRef);
  useAutoplayVideo(slideOneMobileVideoRef);
  useAutoplayVideo(slideTwoMobileVideoRef);

  const slideOneContentRef = useRef<HTMLDivElement>(null);
  const slideTwoContentRef = useRef<HTMLDivElement>(null);
  const slideContentRefs = [slideOneContentRef, slideTwoContentRef];

  // Re-run the reveal animation on whichever slide becomes active — on mount
  // for the first slide, and again every time the carousel advances.
  useLayoutEffect(() => {
    const content = slideContentRefs[active]?.current;
    if (!content) return;
    const targets = content.querySelectorAll<HTMLElement>("[data-hero-reveal]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, delay: active === 0 ? 0.2 : 0.1 }
      );
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section className="relative flex h-dvh shrink-0 flex-col overflow-hidden bg-neutral-950">
      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex h-full ease-in-out"
          style={{
            width: `${SLIDE_COUNT * 100}%`,
            transform: `translateX(-${(active * 100) / SLIDE_COUNT}%)`,
            transitionProperty: "transform",
            transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
          }}
        >
          {/* Slide 1 */}
          <div className="relative h-full shrink-0 overflow-hidden bg-neutral-950" style={{ width: `${100 / SLIDE_COUNT}%` }}>
            <HeroBackdrop
              videoSrc={SLIDE_ONE_VIDEO_SRC}
              videoRef={slideOneVideoRef}
              mobileVideoSrc={MOBILE_VIDEO_SRC}
              mobileVideoRef={slideOneMobileVideoRef}
            />

            <div className="relative flex h-full items-center overflow-hidden pt-[68px]">
              <div className="mx-auto w-full max-w-[1672px] px-6 lg:px-10">
                <div ref={slideOneContentRef} className="max-w-[700px]">
                  {/* Eyebrow */}
                  {/* <p
                    data-hero-reveal
                    className="tabular font-mono text-[15px] font-normal uppercase tracking-[0.14em] text-amber-500"
                  >
                    01 / Precision Manufacturing Partner
                  </p> */}

                  {/* Headline */}
                  <h1 className="mt-3 font-display font-medium leading-[0.95] tracking-[-0.02em] text-white">
                    <span data-hero-reveal className="block text-[clamp(32px,4.4vw,60px)]">
                      One Supplier.
                    </span>
                    <span data-hero-reveal className="block text-[clamp(32px,4.4vw,60px)]">
                      Six Processes.
                    </span>
                    <span
                      data-hero-reveal
                      className="mt-1 block text-[clamp(30px,4vw,52px)] font-bold uppercase leading-[1.05] text-transparent"
                      style={{ WebkitTextStroke: "2px #E8891C" }}
                    >
                      One Quality Standard.
                    </span>
                  </h1>

                  <div data-hero-reveal>
                    <DimensionLine />
                  </div>

                  {/* Location */}
                  <p data-hero-reveal className="tabular font-mono text-[15px] uppercase tracking-[0.12em] text-amber-500">
                    Focal Point, Ludhiana, India
                  </p>

                  {/* Subheadline */}
                  <p data-hero-reveal className="mt-3 max-w-[600px] font-sans text-[17px] leading-[1.55] text-slate-200">
                    Forging, CNC machining, casting, injection molding, sheet metal fabrication, and 3D printing —
                    coordinated through 15+ vetted facilities in Focal Point, Ludhiana, India, for automotive OEMs and
                    exporters. Drawings quoted within one business day.
                  </p>

                  {/* Legacy tagline — kept, but demoted: small, quiet, secondary */}
                  <p
                    data-hero-reveal
                    className="mt-4 border-l-2 border-amber-500/40 pl-3 font-mono text-[12px] italic uppercase tracking-[0.12em] text-slate-400"
                  >
                    "Your Challenge is Our Blueprint"
                  </p>

                  {/* CTAs */}
                  <div data-hero-reveal className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href="/request-a-quote"
                      className="group inline-flex h-[52px] items-center gap-2 bg-amber-500 px-7 font-sans text-[16px] font-medium text-white transition-colors hover:bg-amber-600"
                    >
                      Request a Quote
                      <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </a>
                    <a
                      href="/capabilities"
                      className="inline-flex h-[52px] items-center border border-white/60 px-7 font-sans text-[16px] font-medium text-white transition-colors hover:bg-white hover:text-navy-800"
                    >
                      View Capabilities
                    </a>
                  </div>

                  {/* Trust chips — checkable facts only, no certification claims */}
                  <ul data-hero-reveal className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {TRUST_CHIPS.map((chip, i) => (
                      <li key={chip} className="flex items-center gap-5">
                        <span className="tabular flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.06em] text-white">
                          {i === 0 && <ShieldCheck />}
                          {chip}
                        </span>
                        {i < TRUST_CHIPS.length - 1 && <span className="h-4 w-[2px] bg-amber-500/70" aria-hidden="true" />}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative h-full shrink-0 overflow-hidden bg-neutral-950" style={{ width: `${100 / SLIDE_COUNT}%` }}>
            <HeroBackdrop
              videoSrc={SLIDE_TWO_VIDEO_SRC}
              videoRef={slideTwoVideoRef}
              mobileVideoSrc={MOBILE_VIDEO_SRC}
              mobileVideoRef={slideTwoMobileVideoRef}
            />

            <div className="relative flex h-full items-center overflow-hidden pt-[68px]">
              <div className="mx-auto w-full max-w-[1672px] px-6 lg:px-10">
                <div ref={slideTwoContentRef} className="max-w-[700px]">
                  {/* Eyebrow */}
                  {/* <p
                    data-hero-reveal
                    className="tabular font-mono text-[15px] font-normal uppercase tracking-[0.14em] text-amber-500"
                  >
                    01 / Precision Manufacturing Partner
                  </p> */}

                  {/* Headline */}
                  <h1 className="mt-3 font-display font-medium leading-[0.95] tracking-[-0.02em] text-white">
                    <span data-hero-reveal className="block text-[clamp(32px,3.6vw,60px)]">
                     Forged and Machined
                    </span>
                    <span data-hero-reveal className="block text-[clamp(32px,3.6vw,60px)]">
                      Components for Automotive 
                    </span>
                    <span
                      data-hero-reveal
                      className="mt-1 block text-[clamp(30px,3.3vw,52px)] font-bold uppercase leading-[1.05] text-transparent"
                      style={{ WebkitTextStroke: "2px #E8891C" }}
                    >
                      OEMs and Exporters
                    </span>
                  </h1>

                  <div data-hero-reveal>
                    <DimensionLine />
                  </div>

                  {/* Location */}
                  <p data-hero-reveal className="tabular font-mono text-[15px] uppercase tracking-[0.12em] text-amber-500">
                    Focal Point, Ludhiana, India
                  </p>

                  {/* Subheadline */}
                  <p data-hero-reveal className="mt-3 max-w-[600px] font-sans text-[17px] leading-[1.55] text-slate-200">
                   A coordinated network of 15+ vetted facilities in Focal Point, Ludhiana, India — one contract, one quality standard, one point of accountability. Drawings quoted within one business day.

                  </p>

                  {/* Legacy tagline — kept, but demoted: small, quiet, secondary */}
                  <p
                    data-hero-reveal
                    className="mt-4 border-l-2 border-amber-500/40 pl-3 font-mono text-[12px] italic uppercase tracking-[0.12em] text-slate-400"
                  >
                    "Your Challenge is Our Blueprint"
                  </p>

                  {/* CTAs */}
                  <div data-hero-reveal className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href="/request-a-quote"
                      className="group inline-flex h-[52px] items-center gap-2 bg-amber-500 px-7 font-sans text-[16px] font-medium text-white transition-colors hover:bg-amber-600"
                    >
                      Request a Quote
                      <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        →
                      </span>
                    </a>
                    <a
                      href="/capabilities"
                      className="inline-flex h-[52px] items-center border border-white/60 px-7 font-sans text-[16px] font-medium text-white transition-colors hover:bg-white hover:text-navy-800"
                    >
                      View Capabilities
                    </a>
                  </div>

                  {/* Trust chips — checkable facts only, no certification claims */}
                  <ul data-hero-reveal className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {TRUST_CHIPS.map((chip, i) => (
                      <li key={chip} className="flex items-center gap-5">
                        <span className="tabular flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.06em] text-white">
                          {i === 0 && <ShieldCheck />}
                          {chip}
                        </span>
                        {i < TRUST_CHIPS.length - 1 && <span className="h-4 w-[2px] bg-amber-500/70" aria-hidden="true" />}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide navigation arrow — forward only, no way back to slide 1 */}
        {active < SLIDE_COUNT - 1 && (
          <button
            type="button"
            onClick={() => setActive((a) => a + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-colors hover:border-amber-500 hover:bg-amber-500 sm:right-4 sm:h-10 sm:w-10 lg:right-8 lg:h-12 lg:w-12"
          >
            <ArrowIcon className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        )}
      </div>

      {/* Material ticker */}
      <div className="group relative shrink-0 overflow-hidden border-t-2 border-amber-500 bg-white/90 px-6 py-3 backdrop-blur-sm lg:px-10">
        <div className="flex w-max animate-[marquee-right_26s_linear_infinite] items-center gap-6 group-hover:[animation-play-state:paused]">
          {[...MATERIALS, ...MATERIALS].map((m, i) => (
            <MaterialItem key={`${m}-${i}`} label={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
