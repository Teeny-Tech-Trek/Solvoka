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
    if (!hash || !sectionId) return false;
    const h = hash.toLowerCase();
    const s = sectionId.toLowerCase();
    return (
      h === `#${s}` ||
      (s.includes("quote") && (h === "#quote" || h === "#contact" || h === "#rfq")) ||
      (s.includes("capabilit") && h.includes("capabilit"))
    );
  };

  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!("IntersectionObserver" in window)) return true;
    if (window.location.hash && id) {
      return isTargetHash(window.location.hash, id);
    }
    return false;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash && id && isTargetHash(window.location.hash, id)) {
        setIsVisible(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
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
    <div ref={containerRef} id={id} style={{ minHeight }} className="w-full">
      {isVisible ? children : fallback}
    </div>
  );
}

export default LazySection;
