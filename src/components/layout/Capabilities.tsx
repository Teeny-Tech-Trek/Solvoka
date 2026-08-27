    import { useRef, useState } from "react";

type Capability = {
  code: string;
  name: string;
  poster: string;
  video: string;
  href: string;
};

/**
 * TEMP: video/poster fields point at test-videos.co.uk's public royalty-free sample
 * clips as stand-ins so the cards have something to play. Swap these for your real
 * clips and first-frame posters before shipping.
 */

const CAPABILITIES: Capability[] = [
  {
    code: "PRC-001",
    name: "Casting",
    poster: "/posters/casting.jpg",
    video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    href: "/capabilities/casting",
  },
  {
    code: "PRC-002",
    name: "Forging",
    poster: "/posters/forging.jpg",
    video: "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    href: "/capabilities/forging",
  },
  {
    code: "PRC-003",
    name: "CNC Machining",
    poster: "/posters/cnc-machining.jpg",
    video: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4",
    href: "/capabilities/cnc-machining",
  },
  {
    code: "PRC-004",
    name: "3D Printing",
    poster: "/posters/3d-printing.jpg",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    href: "/capabilities/3d-printing",
  },
  {
    code: "PRC-005",
    name: "Injection Molding",
    poster: "/posters/injection-molding.jpg",
    video: "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_5MB.mp4",
    href: "/capabilities/injection-molding",
  },
  {
    code: "PRC-006",
    name: "Sheet Metal Fabrication",
    poster: "/posters/sheet-metal.jpg",
    video: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_5MB.mp4",
    href: "/capabilities/sheet-metal-fabrication",
  },
];

function PlayButton({ playing }: { playing: boolean }) {
  return (
    <span
      className={`absolute left-1/2 top-1/2 z-20 flex h-[clamp(46px,4.4vh,64px)] w-[clamp(46px,4.4vh,64px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white transition-all duration-200 group-hover:scale-110 group-hover:bg-white/15 ${
        playing ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <svg width="16" height="19" viewBox="0 0 16 19" fill="none">
        <path
          d="M15 8.63a1 1 0 0 1 0 1.74L2 18.2a1 1 0 0 1-1.5-.87V1.67A1 1 0 0 1 2 .8l13 7.83Z"
          fill="#fff"
        />
      </svg>
    </span>
  );
}

function CapabilityCard({ item }: { item: Capability }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(true);
  const [playing, setPlaying] = useState(true);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!active) {
      setActive(true);
      setPlaying(true);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <a
      href={item.href}
      onClick={toggle}
      className="group relative block aspect-[16/10] w-full overflow-hidden bg-white lg:aspect-auto lg:h-full"
      aria-label={`${item.code} — ${item.name}`}
    >
      {active ? (
        <video
          ref={videoRef}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onEnded={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={item.video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={item.poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Bottom scrim so the label stays readable */}
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[58%]"
        style={{
          background:
            "linear-gradient(to top, rgba(11,20,32,0.94) 0%, rgba(11,20,32,0.72) 38%, rgba(11,20,32,0) 100%)",
        }}
        aria-hidden="true"
      />

      <PlayButton playing={playing} />

      <div className="absolute bottom-[clamp(16px,2.1vh,26px)] left-[clamp(18px,2vw,28px)] z-20">
        <span className="block font-mono text-[clamp(10px,0.85vh,13px)] uppercase tracking-[0.16em] text-amber-500">
          {item.code}
        </span>
        <span className="mt-[6px] flex items-center gap-3 font-mono text-[clamp(15px,1.85vh,26px)] uppercase tracking-[0.03em] text-white">
          {item.name}
          <span
            className="h-[2px] w-[18px] bg-amber-500 transition-all duration-200 group-hover:w-[34px]"
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
      className="relative flex w-full flex-col overflow-hidden bg-grey-50 bg-cover bg-center bg-no-repeat lg:h-[100svh] lg:max-h-[100svh]"
      style={{ backgroundImage: "url('/Capabilities.png')" }}
      aria-labelledby="capabilities-heading"
    >
      <div className="relative mx-auto flex h-full w-full max-w-[1536px] flex-col px-[clamp(20px,3.2vw,76px)] py-[clamp(20px,3.4vh,44px)]">
        {/* Header */}
        <div className="flex shrink-0 flex-col gap-x-10 gap-y-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[640px]">
            {/* <p className="font-mono text-[clamp(11px,1.15vh,15px)] uppercase tracking-[0.16em] text-amber-500">
              02 / Capabilities
            </p>
            <span className="mt-[10px] block h-[3px] w-[52px] bg-amber-500" aria-hidden="true" /> */}
            <h2
              id="capabilities-heading"
              className="mt-[clamp(10px,1.6vh,20px)] font-display font-bold leading-[1.12] tracking-[-0.02em] text-navy-800"
            >
              <span className="block text-[clamp(22px,3.6vh,42px)]">Six core processes.</span>
              <span className="block text-[clamp(22px,3.6vh,42px)] text-amber-500">Endless possibilities.</span>
              <span className="block text-[clamp(22px,3.6vh,42px)]">One accountable supplier.</span>
            </h2>
          </div>

          {/* <div className="flex max-w-[420px] flex-col gap-[clamp(10px,1.6vh,20px)] lg:pt-[clamp(28px,4.4vh,58px)]">
            <p className="text-[clamp(13px,1.45vh,17px)] leading-[1.6] text-navy-800">
              From a single prototype to scheduled production runs — we manage the
              process, the inspection and the delivery.
            </p>
            <a
              href="/capabilities"
              className="group inline-flex w-fit items-center gap-2 border-b-2 border-amber-500 pb-1 font-mono text-[clamp(12px,1.3vh,16px)] text-amber-500 transition-colors hover:text-amber-600"
            >
              View all capabilities
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </div> */}
        </div>

        {/* Card grid — flexes to fill remaining height, never overflows */}
        <div className="mt-[clamp(16px,2.6vh,32px)] grid min-h-0 grid-cols-1 gap-[clamp(10px,1.1vw,18px)] sm:grid-cols-2 lg:flex-1 lg:grid-cols-3 lg:grid-rows-2">
          {CAPABILITIES.map((item) => (
            <CapabilityCard key={item.code} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}