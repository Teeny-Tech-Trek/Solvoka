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
    gif: "/Gif-Assets/Steel_Die_Casting_Video_Ready.gif",
    href: "/capabilities/casting",
  },
  {
    code: "PRC-002",
    name: "Forging",
    poster: "/posters/forging.jpg",
    gif: "/Gif-Assets/Video_Ready_Closed_Die_Forging.gif",
    href: "/capabilities/forging",
  },
  {
    code: "PRC-003",
    name: "CNC Machining",
    poster: "/posters/cnc-machining.jpg",
    gif: "/Gif-Assets/CNC_Milling_Machine_Video_Ready.gif",
    href: "/capabilities/cnc-machining",
  },
  {
    code: "PRC-004",
    name: "3D Printing",
    poster: "/posters/3d-printing.jpg",
    gif: "/Gif-Assets/DMLS_Video_Is_Ready_.gif",
    href: "/capabilities/3d-printing",
  },
  {
    code: "PRC-005",
    name: "Injection Molding",
    poster: "/posters/injection-molding.jpg",
    gif: "/Gif-Assets/Video_Link_Ready_Now_.gif",
    href: "/capabilities/injection-molding",
  },
  {
    code: "PRC-006",
    name: "Sheet Metal Fabrication",
    poster: "/posters/sheet-metal.jpg",
    gif: "/Gif-Assets/Video_Link_Ready_Sheet_Metal.gif",
    href: "/capabilities/sheet-metal-fabrication",
  },
];

function CapabilityCard({ item }: { item: Capability }) {
  return (
    <a
      href={item.href}
      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg bg-navy-900 shadow-sm transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      aria-label={`${item.code} — ${item.name}`}
    >
      <img
        src={item.gif}
        alt={item.name}
        loading="lazy"
        decoding="async"
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
        <span className="block font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.16em] text-blue-600 font-semibold">
          {item.code}
        </span>
        <span className="mt-1 flex items-center gap-2.5 font-mono text-[16px] sm:text-[20px] lg:text-[22px] font-bold uppercase tracking-[0.03em] text-white">
          {item.name}
          <span
            className="h-[2px] w-[18px] bg-blue-600 transition-all duration-200 group-hover:w-[32px]"
            aria-hidden="true"
          />
        </span>
      </div>
    </a>
  );
}

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative flex w-full flex-col overflow-hidden bg-grey-50 bg-cover bg-center bg-no-repeat py-12 sm:py-16 lg:py-20"
      style={{ backgroundImage: "url('/Capabilities.png')" }}
      aria-labelledby="capabilities-heading"
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1536px] flex-col px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex shrink-0 flex-col gap-y-3 max-w-[720px]">
          <span className="font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-blue-600">
            02 / Capabilities
          </span>
          <h2
            id="capabilities-heading"
            className="font-display font-bold leading-[1.12] tracking-[-0.02em] text-navy-800"
          >
            <span className="block text-[clamp(26px,3.5vw,44px)]">Six core processes.</span>
            <span className="block text-[clamp(26px,3.5vw,44px)] text-blue-600">Endless possibilities.</span>
            <span className="block text-[clamp(26px,3.5vw,44px)]">One accountable supplier.</span>
          </h2>
        </div>

        {/* Card grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item) => (
            <CapabilityCard key={item.code} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}