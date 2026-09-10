import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useLenis } from "./LenisContext";

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Capabilities", href: "/#capabilities", hasDropdown: true },
  { label: "About", href: "/about-us" },
  { label: "Quality", href: "/quality" },
  // { label: "Facility", href: "/#capabilities" },
  // { label: "Case studies", href: "/#coordination-model" },
  { label: "Resources", href: "/#capabilities", hasDropdown: true },
  { label: "Contact", href: "/contact-us" },
];

const CAPABILITIES = [
  { code: "PRC-001", name: "Casting", desc: "Investment, sand, die and centrifugal casting", href: "/capabilities/casting" },
  { code: "PRC-002", name: "Forging", desc: "Open-die, closed-die and seamless ring forging", href: "/capabilities/forging" },
  { code: "PRC-003", name: "CNC Machining", desc: "Milling, turning, grinding, EDM and Swiss", href: "/capabilities/cnc-machining" },
  { code: "PRC-004", name: "3D Printing", desc: "DMLS, SLM, WAAM, DED and binder jetting", href: "/capabilities/3d-printing" },
  { code: "PRC-005", name: "Sheet Metal Fabrication", desc: "Laser, plasma, waterjet, bending, welding", href: "/capabilities/sheet-metal-fabrication" },
];

const RESOURCES = [
  { name: "Materials guide", href: "/materials" },
  { name: "Automotive", href: "/automotive" },
  // { name: "How we work", href: "/#coordination-model" },
  // { name: "Gallery", href: "/#capabilities" },
  // { name: "Careers", href: "/#contact" },
];

function Logo({ scrolled, mobileOpen, darkSolid = false, light = false }: { scrolled: boolean; mobileOpen: boolean; darkSolid?: boolean; light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Solvoka home">
      <span
        className={`font-display text-[22px] font-bold tracking-[-0.01em] transition-colors duration-300 sm:text-[26px] ${
          mobileOpen || (!scrolled && !light && !darkSolid) || (darkSolid && !scrolled && !light) ? "text-white" : "text-navy-800"
        }`}
      >
        SOLVOKA
      </span>
    </Link>
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

export default function Navbar({ darkSolid = false, light = false }: { darkSolid?: boolean; light?: boolean } = {}) {
  const lenis = useLenis();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    Capabilities: false,
    Resources: false,
  });
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

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Scroll & resize listener for sticky header top offset synced with UtilityBar
  useEffect(() => {
    let ticking = false;
    const updateHeader = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const uBar = document.getElementById("utility-bar");
          const uBarHeight = uBar ? uBar.offsetHeight : 38;
          const y = window.scrollY;
          setHeaderTop(Math.max(0, uBarHeight - y));
          setScrolled(y > uBarHeight);
          ticking = false;
        });
        ticking = true;
      }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
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

  // Body scroll lock + Lenis stop/start on mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [mobileOpen, lenis]);

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
        className={`fixed inset-x-0 z-50 w-full shrink-0 backdrop-blur-md transition-all duration-300 ${mobileOpen
          ? "border-b border-navy-800 bg-navy-950 text-white shadow-md"
          : scrolled
            ? "border-b border-grey-200 bg-white/95 shadow-sm"
            : light
              ? "border-b border-slate-200 bg-white/95 text-slate-900 shadow-xs"
              : darkSolid
                ? "border-b border-navy-800 bg-navy-950 text-white shadow-md"
                : "border-b border-white/10 bg-navy-950/20"
          }`}
        style={{ top: `${headerTop}px` }}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Logo scrolled={scrolled} mobileOpen={mobileOpen} darkSolid={darkSolid} light={light} />

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
                {item.hasDropdown ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      clearCloseTimeout();
                      setOpenMenu((prev) => (prev === item.label ? null : item.label));
                    }}
                    className={`group flex items-center gap-2 py-2 font-sans text-[15px] font-medium transition-colors hover:text-blue-600 2xl:text-[16px] ${
                      scrolled || light ? "text-slate-800" : "text-white hover:text-amber-400"
                    }`}
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <Chevron open={openMenu === item.label} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={closeImmediately}
                    className={`group flex items-center gap-2 py-2 font-sans text-[15px] font-medium transition-colors hover:text-blue-600 2xl:text-[16px] ${
                      scrolled || light ? "text-slate-800" : "text-white hover:text-amber-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
                <span
                  className={`pointer-events-none absolute -bottom-0.5 left-0 h-[2px] bg-blue-600 transition-all duration-200 ${
                    openMenu === item.label ? "w-full" : "w-0"
                  }`}
                />
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-4 xl:flex 2xl:gap-7">
            <span
              className={`h-9 w-px transition-colors duration-300 ${scrolled || light ? "bg-slate-200" : "bg-white/30"}`}
              aria-hidden="true"
            />
            <Link
              to="/#contact"
              className="group inline-flex h-[44px] items-center gap-2.5 rounded-lg bg-blue-600 px-6 font-sans text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 2xl:h-[48px] 2xl:px-7 2xl:text-[16px]"
            >
              Request a Quote
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
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
              data-lenis-prevent
              className="pointer-events-auto mx-auto max-h-[calc(100dvh-68px)] max-w-[900px] overflow-y-auto border-t-2 border-amber-500 bg-navy-900 shadow-2xl"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              <div className="flex flex-col px-10 py-6">
                {CAPABILITIES.map((c) => (
                  <Link
                    key={c.code}
                    to={c.href}
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
                  </Link>
                ))}
              </div>
              <div className="border-t border-navy-700 bg-navy-950/50">
                <div className="flex items-center gap-8 px-10 py-4">
                  <Link
                    to="/#capabilities"
                    onClick={closeImmediately}
                    className="font-sans text-[14px] font-semibold text-amber-500 hover:text-amber-400"
                  >
                    View all capabilities →
                  </Link>
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
              data-lenis-prevent
              className="pointer-events-auto mx-auto max-h-[calc(100dvh-68px)] max-w-[900px] overflow-y-auto border-t-2 border-amber-500 bg-navy-900 shadow-2xl"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              <div className="flex flex-col px-10 py-6">
                {RESOURCES.map((r) => (
                  <Link
                    key={r.name}
                    to={r.href}
                    onClick={closeImmediately}
                    className="group flex items-center justify-between border-b border-navy-700 py-4 font-sans transition-colors hover:border-amber-500"
                  >
                    <span className="font-display text-[17px] font-medium text-white transition-colors group-hover:text-amber-500">
                      {r.name}
                    </span>
                    <span className="font-sans text-[13px] text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-amber-500">
                      Explore →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-navy-950 px-5 py-6 sm:px-8 xl:hidden border-t border-navy-800/80"
          style={{ top: `${headerTop + 68}px`, height: `calc(100dvh - ${headerTop + 68}px)` }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <nav className="flex flex-col divide-y divide-navy-800/80" aria-label="Mobile Menu Links">
            {NAV_ITEMS.map((item) => {
              const isExpanded = !!mobileExpanded[item.label];

              if (item.hasDropdown) {
                return (
                  <div key={item.label} className="py-1">
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="flex min-h-[48px] w-full items-center justify-between py-2 text-left font-sans text-[17px] font-semibold text-white transition-colors hover:text-amber-500 active:text-amber-400"
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <span className="p-1 text-slate-400">
                        <Chevron open={isExpanded} />
                      </span>
                    </button>

                    {/* Expandable submenu */}
                    {isExpanded && (
                      <div className="mt-1 flex flex-col gap-1 pl-3 pb-2 border-l-2 border-amber-500/40">
                        {item.label === "Capabilities" && (
                          <>
                            <Link
                              to="/#capabilities"
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-[42px] items-center py-2 text-[14px] font-semibold text-amber-500 hover:text-amber-400"
                            >
                              View all capabilities →
                            </Link>
                            {CAPABILITIES.map((c) => (
                              <Link
                                key={c.code}
                                to={c.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex min-h-[44px] flex-col justify-center py-2 text-slate-200 transition-colors hover:text-amber-400"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="tabular font-mono text-[11px] font-bold text-amber-500">
                                    {c.code}
                                  </span>
                                  <span className="font-display text-[15px] font-semibold text-white">
                                    {c.name}
                                  </span>
                                </span>
                                <span className="font-sans text-[12px] text-slate-400 line-clamp-1">
                                  {c.desc}
                                </span>
                              </Link>
                            ))}
                          </>
                        )}

                        {item.label === "Resources" && (
                          <>
                            {RESOURCES.map((r) => (
                              <Link
                                key={r.name}
                                to={r.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex min-h-[44px] items-center py-2 text-[15px] text-slate-200 transition-colors hover:text-amber-400"
                              >
                                {r.name}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[48px] items-center py-3 font-sans text-[17px] font-semibold text-white transition-colors hover:text-amber-500 active:text-amber-400"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 pb-2">
            <Link
              to="/#contact"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[48px] sm:min-h-[52px] w-full items-center justify-center gap-3 bg-blue-600 font-sans text-[16px] font-semibold text-white shadow-md transition-colors hover:bg-blue-700 active:scale-[0.99]"
            >
              Get a quote <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
