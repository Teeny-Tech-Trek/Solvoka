import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { trackEmailClick, trackPhoneClick, trackWhatsAppClick, trackQuoteCtaClick } from "../../utils/analytics";

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28" />
    </svg>
  );
}

const capabilities = [
  { name: "Forging", href: "/capabilities/forging" },
  { name: "CNC Machining", href: "/capabilities/cnc-machining" },
  { name: "Casting", href: "/capabilities/casting" },
  { name: "Sheet Metal Fabrication", href: "/capabilities/sheet-metal-fabrication" },
  { name: "3D Printing", href: "/capabilities/3d-printing" },
];

const companyLinks = [
  { name: "Quality", href: "/quality" },
  { name: "About", href: "/about-us" },
  // { name: "Facility", href: "/#capabilities" },
  { name: "Contact", href: "/contact-us" },
];

const resourceLinks = [
  { name: "Material Guide", href: "/materials" },
  { name: "Automotive", href: "/automotive" },
  // { name: "How We Work", href: "/#coordination-model" },
  // { name: "Export & Shipping", href: "/#capabilities" },
  // { name: "Parts Gallery", href: "/#capabilities" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#ffffff] px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 border-t border-slate-200">
      {/* Decorative dot grid background */}
      <div
        className="pointer-events-none absolute -bottom-4 -right-4 h-40 w-56 opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, #2563eb 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-[1536px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1.4fr_1.3fr]">
        {/* Column 1 — Company */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3" aria-label="Solvoka home">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-navy-900 shadow-sm sm:h-12 sm:w-12">
              <img src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/solvoka-logo.webp" alt="" className="h-full w-full object-contain" />
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              SOLVOKA
            </h3>
          </Link>
          <div className="mt-2 h-0.5 w-8 bg-[#2563eb]" />

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            Precision forging and CNC machining for automotive OEMs and exporters — Focal Point, Ludhiana, India.
          </p>

          {/* <div className="mt-5 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solvoka on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] via-[#2563eb] to-[#2563eb] text-white transition hover:opacity-90 shadow-xs"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solvoka on LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563eb] text-white transition hover:bg-[#2563eb] shadow-xs"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div> */}

          <p className="mt-6 text-xs font-semibold leading-relaxed tracking-widest text-slate-400 uppercase ">
            STRONGER PARTS
            <br />
            BRIGHTER TOMORROW
          </p>
        </div>

        {/* Column 2 — Capabilities */}
        <div className="sm:border-l sm:border-slate-200 sm:pl-6 lg:pl-8">
          <h4 className="text-lg sm:text-xl font-bold text-slate-900">Capabilities</h4>
          <ul className="mt-4 space-y-1.5 ">
            {capabilities.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="inline-flex min-h-[38px] items-center text-sm text-slate-600 transition hover:text-[#2563eb]">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Company / Resources */}
        <div className="sm:border-l sm:border-slate-200 sm:pl-6 lg:pl-8 sm:pr-6 lg:pr-8">
          <h4 className="text-lg sm:text-xl font-bold text-slate-900 text-center">Company</h4>
          <div className="mt-4 grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 ">
            <ul className="space-y-1.5">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="inline-flex min-h-[38px] items-center text-sm text-slate-600 transition hover:text-[#2563eb]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-1.5">
              {resourceLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="inline-flex min-h-[38px] items-center text-sm text-slate-600 transition hover:text-[#2563eb]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 4 — Contact */}
        <div className="sm:border-l sm:border-slate-200 sm:pl-6 lg:pl-8">
          <h4 className="text-lg sm:text-xl font-bold text-slate-900">Contact</h4>

          <ul className="mt-4 space-y-3 ">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" strokeWidth={2} />
              <span className="text-xs sm:text-sm leading-snug text-slate-600 break-words">
                Cabin No. 2, 17-B, Phase-II, Focal Point, Ludhiana, Punjab 141003
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#2563eb]" strokeWidth={2} />
              <a href="mailto:solvoka@gmail.com" onClick={() => trackEmailClick("footer")} className="text-xs sm:text-sm text-slate-600 hover:text-[#2563eb] break-all">
                solvoka@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#2563eb]" strokeWidth={2} />
              <a href="tel:+917087086696" onClick={() => trackPhoneClick("footer")} className="text-xs sm:text-sm text-slate-600 hover:text-[#2563eb] whitespace-nowrap">
                +91 70870-86696
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 shrink-0 text-[#2563eb]" strokeWidth={2} />
              <a
                href="https://wa.me/917087086696"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("footer")}
                className="text-xs sm:text-sm text-slate-600 hover:text-[#2563eb]"
              >
                WhatsApp Business
              </a>
            </li>
          </ul>

          <Link
            to="/#quote"
            onClick={() => trackQuoteCtaClick("footer")}
            className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#2563eb]/25 transition hover:bg-[#2563eb] active:scale-[0.99]"
          >
            <span>Request a Quote</span>
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto mt-12 max-w-[1536px] border-t border-slate-200 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Solvoka Industries. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <a href="/privacy" className="hover:text-[#2563eb] transition">
              Privacy Policy
            </a>
            <span className="h-3.5 w-px bg-slate-300" aria-hidden="true" />
            <a href="/terms" className="hover:text-[#2563eb] transition">
              Terms &amp; Conditions
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-200 text-xs font-bold text-slate-600">
              MI
            </span>
            <p className="text-[10px] leading-tight text-slate-400 text-left ">
              <span className="block font-semibold tracking-widest text-slate-600 uppercase">
                MAKE IN INDIA
              </span>
              FOR A STRONGER TOMORROW
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
