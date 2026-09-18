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
export function scrollToElement(
  target: string | HTMLElement,
  offset = -70,
  duration = 1.3
): boolean {
  const lenis = _getLenisInstance();
  let elem: HTMLElement | null = null;

  if (typeof target === "string") {
    const hash = target.startsWith("#") ? target : `#${target}`;
    try {
      elem = document.querySelector(hash);
    } catch {
      // ignore invalid selector
    }
    if (!elem) {
      const cleanId = hash.replace(/^#/, "");
      elem =
        document.getElementById(cleanId) ||
        (cleanId === "quote" || cleanId === "contact" || cleanId === "rfq"
          ? document.getElementById("quote") || document.getElementById("contact") || document.getElementById("rfq")
          : null) ||
        (cleanId === "capabilities" ? document.getElementById("capabilities") : null);
    }
  } else {
    elem = target;
  }

  if (elem) {
    if (lenis) {
      lenis.scrollTo(elem, { offset, duration });
    } else {
      const top = elem.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    return true;
  }
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

        const findElem = (): HTMLElement | null => {
          let el: HTMLElement | null = null;
          try {
            el = document.querySelector(hash);
          } catch {
            // ignore
          }
          if (!el && (hash === "#quote" || hash === "#contact" || hash === "#rfq")) {
            el =
              document.getElementById("quote") ||
              document.getElementById("contact") ||
              document.getElementById("rfq");
          }
          if (!el && hash === "#capabilities") {
            el = document.getElementById("capabilities");
          }
          return el;
        };

        // Notify lazy sections to render immediately if needed
        window.history.pushState(null, "", hash);
        window.dispatchEvent(new Event("hashchange"));

        const elem = findElem();
        if (elem) {
          lenis.scrollTo(elem, { offset: -70, duration: 1.3 });
        } else {
          // If the section is mounting asynchronously, retry for up to 1 second
          let attempts = 0;
          const retryTimer = setInterval(() => {
            const found = findElem();
            if (found) {
              clearInterval(retryTimer);
              lenis.scrollTo(found, { offset: -70, duration: 1.3 });
            }
            attempts++;
            if (attempts >= 20) clearInterval(retryTimer);
          }, 40);
        }
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
