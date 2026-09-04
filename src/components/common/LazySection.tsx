import { useState, useEffect, useRef, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  minHeight?: string;
}

export function LazySection({
  children,
  fallback,
  rootMargin = "250px",
  minHeight,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If IntersectionObserver is not available, render immediately
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
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
  }, [rootMargin]);

  return (
    <div ref={containerRef} style={{ minHeight }} className="w-full">
      {isVisible ? children : fallback}
    </div>
  );
}

export default LazySection;
