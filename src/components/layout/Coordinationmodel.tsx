import { useEffect, useRef, useState } from "react";
import { FileCheck2, ShieldCheck, User } from "lucide-react";
import { gsap } from "gsap";

interface StatRow {
    icon: React.ReactNode;
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
        const animateCount = () => {
            const duration = 1600;
            const target = 15;
            const startTime = performance.now();

            const step = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(easeOut * target));

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    setCount(target);
                }
            };
            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCount();
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!motionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(motionRef.current, {
                y: -6,
                duration: 1.6,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }, motionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="mt-3 flex items-baseline">
            <div ref={motionRef} className="inline-flex items-baseline text-6xl font-extrabold leading-none text-blue-400">
                <span className="tabular-nums">{count}</span>
                <span className="ml-1 text-blue-400 font-extrabold animate-pulse">+</span>
            </div>
        </div>
    );
}

export default function CoordinationModel() {
    return (
        <section className="w-full bg-white px-4 py-10 sm:px-8">
            <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left column — copy */}
                    <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:py-16 lg:pl-14 lg:pr-10">
                        <div className="max-w-xl">
                            <div className="mb-4">
                                <span className="text-xs font-bold tracking-widest text-blue-600">
                                    COORDINATION MODEL
                                </span>
                                <div className="mt-2 h-0.5 w-8 bg-blue-600" />
                            </div>

                            <h2 className="text-4xl font-extrabold leading-[1.15] text-slate-900 sm:text-5xl">
                                One contract. One quality standard. One point of accountability.
                            </h2>

                            <p className="mt-6 text-base leading-relaxed text-slate-600">
                                Forging and CNC machining run across a coordinated network of 15+
                                vetted partner facilities. Every facility works to the same
                                drawing, the same inspection gates, and the same reporting
                                standard — so the part you receive is accountable to one
                                supplier, not several.
                            </p>

                            <p className="mt-6 text-base leading-relaxed text-slate-600">
                                You send one RFQ, sign one contract, and raise any issue with
                                one point of contact. Coordination and quality across the
                                network sit with Solvoka, end to end.
                            </p>

                            <a
                                href="#"
                                className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-blue-600 underline decoration-blue-600 underline-offset-4 transition hover:text-blue-700"
                            >
                                See how we inspect every gate
                                <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right column — framed image with overlay stat card */}
                    <div className="relative py-3 pr-3  lg:py-4 lg:pr-4">
                        <div className="relative h-full w-full overflow-hidden rounded-xl">
                            <img
                                src="/Cordinationmodelgif.gif"
                                alt="CNC machining partner facility"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>

                        <div className="absolute left-4 top-8 w-[280px] max-w-[80%] rounded-md bg-slate-900/95 p-6 text-white shadow-xl sm:left-6 sm:top-10">
                            <span className="text-xs font-bold tracking-widest text-slate-300">
                                PARTNER NETWORK
                            </span>

                            <AnimatedStatNumber />

                            <p className="mt-4 text-sm leading-relaxed text-slate-200">
                                vetted partner facilities, one QC standard
                            </p>

                            <div className="mt-5 flex flex-col divide-y divide-slate-700 border-t border-slate-700">
                                {statRows.map((row) => (
                                    <div key={row.label} className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-200">
                                                {row.icon}
                                            </span>
                                            <span className="text-sm font-medium text-slate-100">{row.label}</span>
                                        </div>
                                        <span className="text-xl font-extrabold text-blue-400">{row.value}</span>
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