/**
 * SmoothScroll.tsx
 *
 * Central Lenis + GSAP ScrollTrigger integration with guaranteed smooth anchor scrolling.
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

// Register ScrollTrigger once (module-level, tree-shake safe)
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

/** Global smooth scroll helper callable from anywhere */
/** Helper to find targeted section or form element */
function findTargetElement(target: string | HTMLElement): HTMLElement | null {
  if (typeof target !== "string") return target;
  const hash = target.startsWith("#") ? target : `#${target}`;
  const cleanId = hash.replace(/^#/, "").toLowerCase();

  let elem: HTMLElement | null = null;
  try {
    elem = document.querySelector(hash);
  } catch {
    // ignore
  }

  if (!elem) {
    if (cleanId === "quote" || cleanId === "contact" || cleanId === "rfq") {
      elem =
        document.getElementById("quote") ||
        document.querySelector("section#quote") ||
        document.getElementById("quote-section") ||
        document.getElementById("contact") ||
        document.getElementById("rfq");
    } else if (cleanId === "capabilities") {
      elem = document.getElementById("capabilities") || document.getElementById("capabilities-section");
    } else {
      elem = document.getElementById(cleanId);
    }
  }

  return elem;
}

/** Global smooth scroll helper callable from anywhere */
export function scrollToElement(
  target: string | HTMLElement,
  offset = -72,
  duration = 1.2
): boolean {
  // Notify all lazy sections to render immediately if target is quote/rfq/contact
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("hashchange"));
    window.dispatchEvent(new CustomEvent("render-all-sections"));
  }

  const lenis = _getLenisInstance();
  const elem = findTargetElement(target);

  if (elem) {
    if (lenis) {
      lenis.scrollTo(elem, { offset, duration });
    } else {
      const top = elem.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    // Continuous settling verification: As asynchronous components, fonts, or images render,
    // re-verify alignment so the user lands EXACTLY at the form!
    let checks = 0;
    const settleTimer = setInterval(() => {
      checks++;
      const current = findTargetElement(target);
      if (!current) return;
      const currentTop = current.getBoundingClientRect().top;
      const expectedTop = -offset; // e.g. 72px from top

      // Re-adjust smoothly if layout shifted while scrolling
      if (checks === 12 || checks === 22 || checks === 32) {
        if (Math.abs(currentTop - expectedTop) > 15) {
          if (lenis) {
            lenis.scrollTo(current, { offset, duration: 0.35 });
          } else {
            const top = current.getBoundingClientRect().top + window.scrollY + offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }
      if (checks >= 36) clearInterval(settleTimer);
    }, 45);

    return true;
  }

  // If element is not yet in DOM, retry for up to 1.5 seconds
  let attempts = 0;
  const retryTimer = setInterval(() => {
    attempts++;
    const found = findTargetElement(target);
    if (found) {
      clearInterval(retryTimer);
      scrollToElement(found, offset, duration);
    }
    if (attempts >= 30) clearInterval(retryTimer);
  }, 50);

  return false;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    // Prevent browser from restoring scroll position or jumping on hash navigation
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // ── Create Lenis instance ──────────────────────────────────
    // Always active to guarantee smooth anchor scrolling and rich physics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    _setLenisInstance(lenis);
    forceUpdate();

    // ── Sync Lenis → GSAP ticker → ScrollTrigger ─────────────
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    // ── Handle lazy-section resizes ──────────────────────────
    let refreshTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });
    resizeObserver.observe(document.body);

    // ── Seamless in-page anchor link smooth scrolling ─────────
    const handleAnchorClick = (e: MouseEvent) => {
      // Don't intercept modifier keys (ctrl+click, cmd+click, etc.)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const targetAnchor = (e.target as HTMLElement)?.closest<HTMLAnchorElement>("a");
      if (!targetAnchor) return;

      const href = targetAnchor.getAttribute("href");
      if (!href || href === "#") return;

      // Check if this anchor points to a section on the current page
      const isHashOnly = href.startsWith("#");
      const isRootHashOnRoot = href.startsWith("/#") && window.location.pathname === "/";

      if (isHashOnly || isRootHashOnRoot) {
        const hash = isRootHashOnRoot ? href.slice(1) : href;
        if (hash === "#") return;

        // Prevent full page reload / redirect jump
        e.preventDefault();
        e.stopPropagation();

        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        }

        scrollToElement(hash, -72, 1.2);
      }
    };

    // Attach with capture phase to guarantee interception before React Router or native jump
    window.addEventListener("click", handleAnchorClick, { capture: true });

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      clearTimeout(refreshTimeout);
      resizeObserver.disconnect();
      window.removeEventListener("click", handleAnchorClick, { capture: true });

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
