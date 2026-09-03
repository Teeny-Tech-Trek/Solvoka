import { useEffect, useRef, useState } from "react";
import UtilityBar from "./UtilityBar";

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Capabilities", href: "/capabilities", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Quality", href: "/quality" },
  { label: "Facility", href: "/facility" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Contact", href: "/contact" },
];

const CAPABILITIES = [
  { code: "PRC-001", name: "Casting", desc: "Investment, sand, die and centrifugal casting", href: "/capabilities/casting" },
  { code: "PRC-002", name: "Forging", desc: "Open-die, closed-die and seamless ring forging", href: "/capabilities/forging" },
  { code: "PRC-003", name: "CNC Machining", desc: "Milling, turning, grinding, EDM and Swiss", href: "/capabilities/cnc-machining" },
  { code: "PRC-004", name: "3D Printing", desc: "DMLS, SLM, WAAM, DED and binder jetting", href: "/capabilities/3d-printing" },
  { code: "PRC-005", name: "Injection Molding", desc: "Prototype, bridge and production tooling", href: "/capabilities/injection-molding" },
  { code: "PRC-006", name: "Sheet Metal Fabrication", desc: "Laser, plasma, waterjet, bending, welding", href: "/capabilities/sheet-metal-fabrication" },
];

const RESOURCES = [
  { name: "Materials guide", href: "/resources/materials-guide" },
  { name: "How we work", href: "/how-we-work" },
  { name: "Gallery", href: "/gallery" },
  { name: "Careers", href: "/careers" },
  // { name: "Become a partner", href: "/become-a-partner" },
];

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <a href="/" className="flex items-center gap-3 shrink-0" aria-label="Solvoka home">
      {/* <svg width="40" height="44" viewBox="0 0 40 44" fill="none" aria-hidden="true">
        <path
          d="M20 2 L36.5 11.5 V30.5 L20 40 L3.5 30.5 V11.5 Z"
          stroke="#E8891C"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M24.4 16.2c-1.3-1.5-3-2.2-5-2.2-2.9 0-4.9 1.5-4.9 3.7 0 2.1 1.6 3.1 4.6 3.7l1.2.2c2.9.6 4.4 1.6 4.4 3.6 0 2.2-2 3.8-5 3.8-2.1 0-3.9-.8-5.2-2.3"
          stroke="#E8891C"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg> */}
      <span
        className={`font-display text-[20px] font-bold tracking-[-0.01em] transition-colors duration-300 sm:text-[26px] ${scrolled ? "text-navy-800" : "text-white"
          }`}
      >
        SOLVOKA
      </span>
    </a>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M1 1.5 L6 6.5 L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerTop, setHeaderTop] = useState(38);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const openDropdown = (label: string) => {
    clearCloseTimeout();
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 120);
  };

  const closeImmediately = () => {
    clearCloseTimeout();
    setOpenMenu(null);
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHeaderTop(Math.max(0, 38 - y));
      setScrolled(y > 38);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImmediately();
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <UtilityBar />

      {/* Backdrop overlay for dropdown menus */}
      {openMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity"
          onMouseEnter={closeImmediately}
          onClick={closeImmediately}
          aria-hidden="true"
        />
      )}

      <header
        className={`fixed inset-x-0 z-50 w-full shrink-0 backdrop-blur-md transition-colors duration-300 ${
          scrolled ? "border-b border-grey-200 bg-white/90" : "border-b border-white/10 bg-transparent"
        }`}
        style={{ top: `${headerTop}px` }}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1672px] items-center justify-between px-6 lg:px-10">
            <Logo scrolled={scrolled} />

            {/* Desktop nav */}
            <nav className="hidden items-center gap-4 xl:flex 2xl:gap-8" aria-label="Main">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.hasDropdown) {
                      openDropdown(item.label);
                    } else {
                      closeImmediately();
                    }
                  }}
                  onMouseLeave={() => {
                    if (item.hasDropdown) {
                      scheduleClose();
                    }
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.hasDropdown) {
                        e.preventDefault();
                        clearCloseTimeout();
                        setOpenMenu((prev) => (prev === item.label ? null : item.label));
                      }
                    }}
                    className={`group flex items-center gap-2 py-2 font-sans text-[15px] font-normal transition-colors hover:text-amber-500 2xl:text-[17px] ${scrolled ? "text-navy-800" : "text-white"
                      }`}
                  >
                    {item.label}
                    {item.hasDropdown && <Chevron open={openMenu === item.label} />}
                  </a>
                  <span
                    className={`pointer-events-none absolute -bottom-0.5 left-0 h-[2px] bg-amber-500 transition-all duration-200 ${openMenu === item.label ? "w-full" : "w-0"
                      }`}
                  />
                </div>
              ))}
            </nav>

            <div className="hidden items-center gap-4 xl:flex 2xl:gap-7">
              <span className={`h-9 w-px transition-colors duration-300 ${scrolled ? "bg-grey-200" : "bg-white/30"}`} aria-hidden="true" />
              <a
                href="/get-a-quote"
                className="group inline-flex h-[52px] items-center gap-3 bg-amber-500 px-6 font-sans text-[15px] font-semibold text-white transition-colors hover:bg-amber-600 2xl:h-[58px] 2xl:px-8 2xl:text-[17px]"
              >
                Get a quote
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="block h-[2px] w-7 bg-amber-500" />
              <span className="block h-[2px] w-7 bg-amber-500" />
              <span className="block h-[2px] w-7 bg-amber-500" />
            </button>
          </div>

        {/* Capabilities mega-menu */}
        {openMenu === "Capabilities" && (
          <div className="pointer-events-none absolute left-0 top-full hidden w-full xl:block">
            <div
              className="pointer-events-auto mx-auto max-h-[calc(100dvh-68px)] max-w-[900px] overflow-y-auto border-t-2 border-amber-500 bg-navy-800 shadow-2xl"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              <div className="flex flex-col px-10 py-6">
                {CAPABILITIES.map((c) => (
                  <a
                    key={c.code}
                    href={c.href}
                    onClick={closeImmediately}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-navy-600 py-4 transition-colors hover:border-amber-500"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="tabular font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-500">
                        {c.code}
                      </span>
                      <span className="font-display text-[19px] font-semibold text-white">
                        {c.name}
                      </span>
                    </span>
                    <span className="font-sans text-[14px] leading-relaxed text-grey-400">
                      {c.desc}
                    </span>
                  </a>
                ))}
              </div>
              <div className="border-t border-navy-600">
                <div className="flex items-center gap-8 px-10 py-4">
                  <a
                    href="/capabilities"
                    onClick={closeImmediately}
                    className="font-sans text-[14px] font-semibold text-amber-500 hover:text-amber-600"
                  >
                    View all capabilities →
                  </a>
                  <a
                    href="/facility"
                    onClick={closeImmediately}
                    className="font-sans text-[14px] font-semibold text-amber-500 hover:text-amber-600"
                  >
                    Our facility →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resources dropdown */}
        {openMenu === "Resources" && (
          <div className="pointer-events-none absolute left-0 top-full hidden w-full xl:block">
            <div
              className="pointer-events-auto mx-auto max-h-[calc(100dvh-68px)] max-w-[900px] flex-col overflow-y-auto border-t-2 border-amber-500 bg-navy-800 px-10 py-6 shadow-2xl"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              {RESOURCES.map((r) => (
                <a
                  key={r.name}
                  href={r.href}
                  onClick={closeImmediately}
                  className="border-b border-navy-600 py-4 font-sans text-[17px] text-white transition-colors hover:text-amber-500"
                >
                  {r.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer — rendered outside <header> deliberately: the header has
          backdrop-blur, and a backdrop-filter/filter/transform ancestor becomes
          the containing block for `position: fixed` descendants instead of the
          viewport, which was collapsing this drawer down to the header's own
          68px box instead of covering the screen. */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-navy-800 px-6 py-8 xl:hidden"
          style={{ top: `${headerTop + 68}px` }}
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="border-b border-navy-600 py-5 font-sans text-[20px] text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/get-a-quote"
            className="mt-8 flex h-[56px] w-full items-center justify-center gap-3 bg-amber-500 font-sans text-[17px] font-semibold text-white"
          >
            Get a quote <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </>
  );
}
