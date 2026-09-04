import { useEffect, useRef, useState, type ReactNode } from "react";
import { FileCheck2, ShieldCheck, User } from "lucide-react";
import { gsap } from "gsap";

interface StatRow {
  icon: ReactNode;
  label: string;
  value: string;
}

const statRows: StatRow[] = [
  { icon: <FileCheck2 className="h-5 w-5" strokeWidth={1.75} />, label: "Contract", value: "1" },
  { icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />, label: "QC standard", value: "1" },
  { icon: <User className="h-5 w-5" strokeWidth={1.75} />, label: "Point of contact", value: "1" },
];

function AnimatedStatNumber() {
  const [count, setCount] = useState(0);
  const motionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hasAnimated = false;
    let animFrame: number;

    const animateCount = () => {
      const duration = 1500;
      const target = 15;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(easeOut * target));

        if (progress < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          setCount(target);
        }
      };
      animFrame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCount();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrame);
    };
  }, []);

  useEffect(() => {
    if (!motionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(motionRef.current, {
        y: -5,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, motionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mt-3 flex items-baseline">
      <div ref={motionRef} className="inline-flex items-baseline text-5xl sm:text-6xl font-extrabold leading-none text-blue-400">
        <span className="tabular-nums">{count}</span>
        <span className="ml-1 text-blue-400 font-extrabold animate-pulse">+</span>
      </div>
    </div>
  );
}

export default function CoordinationModel() {
  return (
    <section id="coordination-model" className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left column — copy */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:py-14 lg:pl-12 lg:pr-10">
            <div className="max-w-xl">
              <div className="mb-4">
                <span className="font-mono text-xs font-bold tracking-widest text-blue-600 uppercase">
                  COORDINATION MODEL
                </span>
                <div className="mt-2 h-0.5 w-8 bg-blue-600" />
              </div>

              <h2 className="font-display text-3xl font-extrabold leading-[1.15] text-slate-900 sm:text-4xl lg:text-[44px]">
                One contract. One quality standard. One point of accountability.
              </h2>

              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600">
                Forging and CNC machining run across a coordinated network of 15+
                vetted partner facilities. Every facility works to the same
                drawing, the same inspection gates, and the same reporting
                standard — so the part you receive is accountable to one
                supplier, not several.
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                You send one RFQ, sign one contract, and raise any issue with
                one point of contact. Coordination and quality across the
                network sit with Solvoka, end to end.
              </p>

              <a
                href="#quality"
                className="mt-6 inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 underline decoration-blue-600 underline-offset-4 transition hover:text-blue-700"
              >
                <span>See how we inspect every gate</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right column — framed image with overlay stat card */}
          <div className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] p-3 sm:p-4">
            <div className="relative h-full w-full min-h-[360px] sm:min-h-[440px] overflow-hidden rounded-xl bg-slate-900">
              <img
                src="/Cordinationmodelgif.gif"
                alt="CNC machining partner facility"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Floating stat card */}
            <div className="absolute left-6 top-8 sm:left-8 sm:top-10 w-[270px] sm:w-[290px] max-w-[85%] rounded-xl bg-slate-900/95 p-5 sm:p-6 text-white shadow-2xl backdrop-blur-md border border-slate-800">
              <span className="font-mono text-[11px] font-bold tracking-widest text-slate-300 uppercase">
                PARTNER NETWORK
              </span>

              <AnimatedStatNumber />

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300">
                vetted partner facilities, one QC standard
              </p>

              <div className="mt-4 flex flex-col divide-y divide-slate-800 border-t border-slate-800">
                {statRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-200">
                        {row.icon}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-200">{row.label}</span>
                    </div>
                    <span className="text-lg font-bold text-blue-400">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}