import { useState } from "react";
import {
  ArrowRight,
  Layers,
  Crosshair,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";

interface Gate {
  number: string;
  title: string;
  icon: LucideIcon;
  image: string;
  fallbackImage?: string;
  imageAlt: string;
  description: string;
  tileFrom: string;
  tileTo: string;
}

const gates: Gate[] = [
  {
    number: "1",
    title: "Material Isolation & MTR Verification",
    icon: Layers,
    image: "/qualitypreview-gifassets/Factory_metal_cylinders_checklist_orig.gif",
    fallbackImage: "/QualtiyPreview-GifAssets/Factory_metal_cylinders_checklist_orig.gif",
    imageAlt: "Raw material stock isolated for verification with checklist",
    description:
      "Every batch of raw stock is isolated on arrival and held until its chemical composition is verified against the original Mill Test Report — before production starts.",
    tileFrom: "from-slate-200",
    tileTo: "to-slate-100",
  },
  {
    number: "2",
    title: "First-Article Validation",
    icon: Crosshair,
    image: "/qualitypreview-gifassets/CMM_probe_inspecting_metallic_part_orig.gif",
    fallbackImage: "/QualtiyPreview-GifAssets/CMM_probe_inspecting_metallic_part_orig.gif",
    imageAlt: "CMM probe inspecting metallic part for first-article validation",
    description:
      "The first piece off the die or the line is checked against your STEP/IGES drawing before the run continues. Fixed-interval gauge checks catch tool wear before it becomes a bad part.",
    tileFrom: "from-blue-100",
    tileTo: "to-slate-100",
  },
  {
    number: "3",
    title: "Pre-Export Protection",
    icon: PackageCheck,
    image: "/qualitypreview-gifassets/Machines_packing_parts_in_crate_orig.gif",
    fallbackImage: "/QualtiyPreview-GifAssets/Machines_packing_parts_in_crate_orig.gif",
    imageAlt: "Finished parts packed in a wooden crate for export",
    description:
      "Finished parts receive a final clean-and-inspect pass before packing. Rust-preventative treatment, vacuum sealing where needed, and reinforced crating protect the shipment through weeks of maritime freight.",
    tileFrom: "from-amber-100",
    tileTo: "to-slate-100",
  },
];

function GateCard({ gate }: { gate: Gate }) {
  const Icon = gate.icon;
  const [imgSrc, setImgSrc] = useState(gate.image);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {gate.number}
        </span>
        <h3 className="text-base sm:text-[17px] font-bold leading-snug text-slate-900">
          {gate.title}
        </h3>
      </div>

      <div
        className={`relative mt-3.5 mb-4 aspect-[18/10] w-full overflow-hidden rounded-xl bg-gradient-to-br ${gate.tileFrom} ${gate.tileTo} border border-slate-200`}
      >
        {!imgFailed ? (
          <img
            src={imgSrc}
            alt={gate.imageAlt}
            loading="lazy"
            decoding="async"
            onError={() => {
              if (gate.fallbackImage && imgSrc !== gate.fallbackImage) {
                setImgSrc(gate.fallbackImage);
              } else {
                setImgFailed(true);
              }
            }}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
            <Icon className="h-10 w-10 text-slate-400" strokeWidth={1.5} />
            <span className="font-mono text-xs text-slate-500 font-medium">Stage {gate.number} Active Inspection</span>
          </div>
        )}
      </div>

      <p className="text-[13px] leading-relaxed text-slate-600">
        {gate.description}
      </p>
    </div>
  );
}

export default function QualityPreview() {
  return (
    <section id="quality" className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="mx-auto max-w-3xl text-center pb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 sm:w-14 bg-blue-500/40" />
            <span className="font-mono text-xs sm:text-[13px] font-bold tracking-widest text-blue-600 uppercase">
              QUALITY PREVIEW
            </span>
            <div className="h-px w-8 sm:w-14 bg-blue-500/40" />
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[36px] font-extrabold leading-[1.15] text-slate-900">
            Credibility Built Through Execution,
            <br />
            <span className="text-slate-600">Not Just Badges</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 pt-4 border-t border-slate-200">
          {gates.map((gate) => (
            <GateCard key={gate.number} gate={gate} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="/quality"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow"
          >
            <span>See Our Full Inspection Process</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wide text-slate-400">
          <span>SAME STANDARD AT EVERY STAGE.</span>
          <span>BETTER PARTS. A MORE RELIABLE TOMORROW.</span>
        </div>
      </div>
    </section>
  );
}