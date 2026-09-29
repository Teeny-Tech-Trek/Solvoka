import { useState, useEffect, useRef, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  id?: string;
}

export function LazySection({
  children,
  fallback,
  rootMargin = "250px",
  minHeight,
  id,
}: LazySectionProps) {
  const isTargetHash = (hash: string, sectionId?: string): boolean => {
    if (!hash) return false;
    const h = hash.toLowerCase();
    // When targeting quote/contact/rfq at the bottom of the page, render all sections immediately
    // to eliminate cumulative layout shifts that cause smooth scrolling to undershoot!
    if (h.includes("quote") || h.includes("contact") || h.includes("rfq")) {
      return true;
    }
    if (!sectionId) return false;
    const s = sectionId.toLowerCase();
    return (
      h === `#${s}` ||
      (s.includes("capabilit") && h.includes("capabilit"))
    );
  };

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!("IntersectionObserver" in window)) return true;
    if (window.location.hash) {
      return isTargetHash(window.location.hash, id);
    }
    return false;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleRenderAll = () => setIsVisible(true);
    const checkHash = () => {
      if (window.location.hash && isTargetHash(window.location.hash, id)) {
        setIsVisible(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("render-all-sections", handleRenderAll);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("render-all-sections", handleRenderAll);
    };
  }, [id]);

  useEffect(() => {
    if (isVisible) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, isVisible]);

  return (
    <div ref={containerRef} id={id ? `${id}-section` : undefined} style={{ minHeight }} className="w-full">
      {isVisible ? children : fallback}
    </div>
  );
}

export default LazySection;
