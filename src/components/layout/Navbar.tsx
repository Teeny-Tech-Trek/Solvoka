import { useEffect, useRef, useState, useCallback } from "react";

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
];

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <a href="/" className="flex items-center gap-3 shrink-0" aria-label="Solvoka home">
      <span
        className={`font-display text-[22px] font-bold tracking-[-0.01em] transition-colors duration-300 sm:text-[26px] ${
          scrolled ? "text-navy-800" : "text-white"
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

  const clearCloseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const openDropdown = (label: string) => {
    clearCloseTimeout();
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 140);
  };

  const closeImmediately = useCallback(() => {
    clearCloseTimeout();
    setOpenMenu(null);
  }, [clearCloseTimeout]);

  // Scroll listener for sticky header top offset
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setHeaderTop(Math.max(0, 38 - y));
          setScrolled(y > 38);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC key listener to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImmediately();
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeImmediately]);

  // Body scroll lock on mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
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
        className={`fixed inset-x-0 z-50 w-full shrink-0 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "border-b border-grey-200 bg-white/95 shadow-sm"
            : "border-b border-white/10 bg-navy-950/20"
        }`}
        style={{ top: `${headerTop}px` }}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1672px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Logo scrolled={scrolled} />

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-4 xl:flex 2xl:gap-8" aria-label="Main Navigation">
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
                  className={`group flex items-center gap-2 py-2 font-sans text-[15px] font-medium transition-colors hover:text-amber-500 2xl:text-[16px] ${
                    scrolled ? "text-navy-800" : "text-white"
                  }`}
                  aria-expanded={item.hasDropdown ? openMenu === item.label : undefined}
                  aria-haspopup={item.hasDropdown ? "true" : undefined}
                >
                  {item.label}
                  {item.hasDropdown && <Chevron open={openMenu === item.label} />}
                </a>
                <span
                  className={`pointer-events-none absolute -bottom-0.5 left-0 h-[2px] bg-amber-500 transition-all duration-200 ${
                    openMenu === item.label ? "w-full" : "w-0"
                  }`}
                />
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-4 xl:flex 2xl:gap-7">
            <span
              className={`h-9 w-px transition-colors duration-300 ${
                scrolled ? "bg-grey-200" : "bg-white/30"
              }`}
              aria-hidden="true"
            />
            <a
              href="/request-a-quote"
              className="group inline-flex h-[48px] items-center gap-2.5 bg-blue-600 px-6 font-sans text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 2xl:h-[52px] 2xl:px-8 2xl:text-[16px]"
            >
              Get a quote
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] xl:hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block h-[2.5px] w-7 bg-amber-500 transition-transform duration-200 ${mobileOpen ? "translate-y-[8.5px] rotate-45" : ""}`} />
            <span className={`block h-[2.5px] w-7 bg-amber-500 transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2.5px] w-7 bg-amber-500 transition-transform duration-200 ${mobileOpen ? "-translate-y-[8.5px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Capabilities mega-menu */}
        {openMenu === "Capabilities" && (
          <div className="pointer-events-none absolute left-0 top-full hidden w-full xl:block">
            <div
              className="pointer-events-auto mx-auto max-h-[calc(100dvh-68px)] max-w-[900px] overflow-y-auto border-t-2 border-amber-500 bg-navy-900 shadow-2xl"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              <div className="flex flex-col px-10 py-6">
                {CAPABILITIES.map((c) => (
                  <a
                    key={c.code}
                    href={c.href}
                    onClick={closeImmediately}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-navy-700 py-3.5 transition-colors hover:border-amber-500"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="tabular font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-500">
                        {c.code}
                      </span>
                      <span className="font-display text-[18px] font-semibold text-white">
                        {c.name}
                      </span>
                    </span>
                    <span className="font-sans text-[13px] leading-relaxed text-slate-300">
                      {c.desc}
                    </span>
                  </a>
                ))}
              </div>
              <div className="border-t border-navy-700 bg-navy-950/50">
                <div className="flex items-center gap-8 px-10 py-4">
                  <a
                    href="/capabilities"
                    onClick={closeImmediately}
                    className="font-sans text-[14px] font-semibold text-amber-500 hover:text-amber-400"
                  >
                    View all capabilities →
                  </a>
                  <a
                    href="/facility"
                    onClick={closeImmediately}
                    className="font-sans text-[14px] font-semibold text-amber-500 hover:text-amber-400"
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
              className="pointer-events-auto mx-auto max-h-[calc(100dvh-68px)] max-w-[900px] flex-col overflow-y-auto border-t-2 border-amber-500 bg-navy-900 px-10 py-6 shadow-2xl"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              {RESOURCES.map((r) => (
                <a
                  key={r.name}
                  href={r.href}
                  onClick={closeImmediately}
                  className="border-b border-navy-700 py-4 font-sans text-[16px] text-white transition-colors hover:text-amber-500"
                >
                  {r.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-navy-900 px-6 py-8 xl:hidden"
          style={{ top: `${headerTop + 68}px` }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <nav className="flex flex-col divide-y divide-navy-700" aria-label="Mobile Menu Links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 font-sans text-[18px] font-medium text-white transition-colors hover:text-amber-500"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/request-a-quote"
            onClick={() => setMobileOpen(false)}
            className="mt-8 flex h-[52px] w-full items-center justify-center gap-3 bg-amber-500 font-sans text-[16px] font-semibold text-white shadow-md transition-colors hover:bg-amber-600"
          >
            Get a quote <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </>
  );
}
