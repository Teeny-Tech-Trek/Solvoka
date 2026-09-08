/**
 * SmoothScroll.tsx
 *
 * Central Lenis + GSAP ScrollTrigger integration.
 *
 * Architecture:
 *   User scroll → Lenis (smooth interpolation) → GSAP ticker → ScrollTrigger → animations
 *
 * One global Lenis instance. No duplicate loops. Proper cleanup.
 */

import { useEffect, useReducer, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  LenisContext,
  _setLenisInstance,
  _getLenisInstance,
} from "./LenisContext";

// ────────────────────────────────────────────────────────────────
// Register ScrollTrigger once (module-level, tree-shake safe)
// ────────────────────────────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ────────────────────────────────────────────────────────────────
// SmoothScroll wrapper component
// ────────────────────────────────────────────────────────────────
interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Force a re-render after the Lenis instance is created/destroyed
  // without calling setState inside useEffect (avoids react-hooks/set-state-in-effect).
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    // ── Reduced-motion guard ──────────────────────────────────
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Still let ScrollTrigger work with native scroll —
      // just skip Lenis entirely so scrolling is untouched.
      return;
    }

    // ── Create Lenis ──────────────────────────────────────────
    const lenis = new Lenis({
      // Smooth but responsive — avoids sluggish "floaty" feel
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Touchpad/wheel sensitivity
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      // Infinite scrolling off (standard page)
      infinite: false,
    });

    _setLenisInstance(lenis);
    forceUpdate();

    // ── Sync Lenis → GSAP ticker → ScrollTrigger ─────────────
    // Lenis drives the scroll position; on every GSAP tick we
    // advance Lenis by the elapsed time and tell ScrollTrigger
    // to re-check positions.
    const onTick = (time: number) => {
      lenis.raf(time * 1000); // GSAP passes seconds, Lenis expects ms
    };

    gsap.ticker.add(onTick);

    // Disable GSAP's lag smoothing so the ticker stays in sync
    gsap.ticker.lagSmoothing(0);

    // Connect ScrollTrigger to Lenis' scroll event so
    // ScrollTrigger always knows the true smooth-scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // ── Handle lazy-section resizes ──────────────────────────
    // When lazy-loaded sections mount and expand, the document
    // height changes.  A ResizeObserver on <body> triggers a
    // debounced ScrollTrigger.refresh().
    let refreshTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });
    resizeObserver.observe(document.body);

    // ── Seamless anchor link smooth scrolling ─────────────────
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      try {
        const elem = document.querySelector(href);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem as HTMLElement, { offset: -70 });
        }
      } catch {
        // Ignore invalid selectors like href="#"
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      clearTimeout(refreshTimeout);
      resizeObserver.disconnect();
      document.removeEventListener("click", handleAnchorClick);

      gsap.ticker.remove(onTick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();

      _setLenisInstance(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={_getLenisInstance()}>
      {children}
    </LenisContext.Provider>
  );
}
