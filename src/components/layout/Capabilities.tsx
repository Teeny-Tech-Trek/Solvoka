import { Link } from "react-router-dom";

type Capability = {
  code: string;
  name: string;
  poster: string;
  gif: string;
  href: string;
};

const CAPABILITIES: Capability[] = [
  {
    code: "PRC-001",
    name: "Casting",
    poster: "/posters/casting.jpg",
    gif: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Steel_Die_Casting_Video_Ready.webm",
    href: "/capabilities/casting",
  },
  {
    code: "PRC-002",
    name: "Forging",
    poster: "/posters/forging.jpg",
    gif: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Video_Ready_Closed_Die_Forging.webm",
    href: "/capabilities/forging",
  },
  {
    code: "PRC-003",
    name: "CNC Machining",
    poster: "/posters/cnc-machining.jpg",
    gif: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/CNC_Milling_Machine_Video_Ready.webm",
    href: "/capabilities/cnc-machining",
  },
  {
    code: "PRC-004",
    name: "3D Printing",
    poster: "/posters/3d-printing.jpg",
    gif: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/DMLS_Video_Is_Ready_.webm",
    href: "/capabilities/3d-printing",
  },
  {
    code: "PRC-005",
    name: "Sheet Metal Fabrication",
    poster: "/posters/sheet-metal.jpg",
    gif: "https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Gif-Assets/Video_Link_Ready_Sheet_Metal.webm",
    href: "/capabilities/sheet-metal-fabrication",
  },
];

function CapabilityCard({ item, className = "" }: { item: Capability; className?: string }) {
  return (
    <Link
      to={item.href}
      className={`group relative block aspect-[16/10] w-full overflow-hidden rounded-lg bg-navy-900 shadow-sm transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${className}`}
      aria-label={`${item.code} — ${item.name}`}
    >
      <video
        src={item.gif}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
      />

      {/* Bottom scrim gradient for high text contrast */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[65%]"
        style={{
          background:
            "linear-gradient(to top, rgba(11,20,32,0.96) 0%, rgba(11,20,32,0.7) 45%, rgba(11,20,32,0) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20">
        <span className="block text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-[#2563eb] font-semibold">
          {item.code}
        </span>
        <span className="mt-1 flex items-center gap-2.5 text-[16px] sm:text-[20px] lg:text-[22px] font-bold uppercase tracking-[0.03em] text-white">
          {item.name}
          <span
            className="h-[2px] w-[18px] bg-[#2563eb] transition-all duration-200 group-hover:w-[32px]"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative flex w-full flex-col overflow-hidden bg-grey-50 bg-cover bg-center bg-no-repeat pt-7 sm:pt-9 lg:pt-11 pb-12 sm:pb-16 lg:pb-20"
      style={{ backgroundImage: "url('https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Capabilities.webp')" }}
      aria-labelledby="capabilities-heading"
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1536px] flex-col px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex shrink-0 flex-col gap-y-2 max-w-[880px]">
          <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
            02 / Capabilities
          </span>
          <h2
            id="capabilities-heading"
            className="font-bold leading-[1.15] tracking-[-0.02em] text-navy-800"
          >
            <span className="block text-[clamp(24px,3.2vw,42px)]">
              Five core processes.{" "}
              <span className="text-[#2563eb]">Endless possibilities.</span>
            </span>
            <span className="block text-[clamp(24px,3.2vw,42px)]">
              One accountable supplier.
            </span>
          </h2>
        </div>

        {/* Row 1: 3 core processes (Casting, Forging, CNC Machining) */}
        <div className="mt-6 sm:mt-7 lg:mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.slice(0, 3).map((item) => (
            <CapabilityCard key={item.code} item={item} className="aspect-[16/10]" />
          ))}
        </div>

        {/* Row 2: 2 core processes (3D Printing, Sheet Metal Fabrication) — Equal width, same height, covering whole row */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CAPABILITIES.slice(3, 5).map((item) => (
            <CapabilityCard
              key={item.code}
              item={item}
              className="aspect-[16/10] lg:aspect-[24/10]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
