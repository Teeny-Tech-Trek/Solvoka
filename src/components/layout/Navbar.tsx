import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLenis } from "./LenisContext";
import { trackQuoteCtaClick } from "../../utils/analytics";
import { scrollToElement } from "./SmoothScroll";

type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Capabilities", href: "/#capabilities", hasDropdown: true },
  { label: "Infrastructure", href: "/#infrastructure", hasDropdown: true },
  { label: "About", href: "/about-us" },
  { label: "Quality", href: "/quality" },
  { label: "Automotive", href: "/automotive" },
  { label: "Material Guide", href: "/materials" },
  { label: "Contact", href: "/contact-us" },
];

const CAPABILITIES = [
  { name: "Casting", desc: "Investment, sand, die and centrifugal casting", href: "/capabilities/casting" },
  { name: "Forging", desc: "Open-die, closed-die and cold forging", href: "/capabilities/forging" },
  { name: "CNC Machining", desc: "Milling, turning, grinding, EDM and Swiss", href: "/capabilities/cnc-machining" },
  { name: "3D Printing", desc: "DMLS, SLM, WAAM, DED and binder jetting", href: "/capabilities/3d-printing" },
  { name: "Sheet Metal Fabrication", desc: "Laser, plasma, bending, pneumatic forming", href: "/capabilities/sheet-metal-fabrication" },
];

const INFRASTRUCTURE = [
  {
    name: "Scaffolding Hardware",
    desc: "Adjustable base jacks, couplers, ringlock standards, transoms & beam clamps",
    href: "/infrastructure/scaffolding-hardware",
    image: "/Infrastructure-Assets/Golden Hour Scaffolding Yard.png",
    count: "9 Components",
    badge: "Shoring & Towers",
  },
  {
    name: "Pre-casted Lifting Equipments and Foundation Bolts",
    desc: "Spherical & erection anchors, hoist rings, clevises, L/J foundation bolts",
    href: "/infrastructure/precast-lifting-foundation-bolts",
    image: "/Infrastructure-Assets/Precast Slab Lift at Construction Site.png",
    count: "10 Components",
    badge: "Precast & Civil",
  },
  {
    name: "Formwork Hardware",
    desc: "Dywidag tie rods, wing nuts, water stops, waller plates, wedge & rapid clamps",
    href: "/infrastructure/formwork-hardware",
    image: "/Infrastructure-Assets/Golden-Hour Formwork Over City Skyline.png",
    count: "12 Components",
    badge: "Formwork Systems",
  },
];

function Logo({ scrolled, mobileOpen, darkSolid = false, light = false }: { scrolled: boolean; mobileOpen: boolean; darkSolid?: boolean; light?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Solvoka home">
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-navy-900 ring-1 ring-white/25 shadow-sm sm:h-10 sm:w-10">
        <img src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/solvoka-logo.webp" alt="" className="h-full w-full object-contain" />
      </span>
      <span
        className={`text-[21px] font-bold tracking-[-0.01em] transition-colors duration-300 sm:text-[24px] ${mobileOpen || (!scrolled && !light && !darkSolid) || (darkSolid && !scrolled && !light) ? "text-white" : "text-navy-800"
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
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    Capabilities: false,
    Infrastructure: false,
  });
  const [scrolled, setScrolled] = useState(false);
  const [headerTop, setHeaderTop] = useState(38);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleQuoteClick = (e: React.MouseEvent, source: "navbar_desktop" | "navbar_mobile") => {
    e.preventDefault();
    trackQuoteCtaClick(source);
    if (mobileOpen) setMobileOpen(false);

    if (location.pathname === "/") {
      if (window.location.hash !== "#quote") {
        window.history.pushState(null, "", "#quote");
      }
      scrollToElement("quote", -72, 1.2);
    } else {
      navigate("/#quote");
    }
  };

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
                    className={`group flex items-center gap-2 py-2 text-[15px] font-medium transition-colors hover:text-[#2563eb] 2xl:text-[16px] ${scrolled || light ? "text-slate-800" : "text-white hover:text-[#2563eb]"
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
                    className={`group flex items-center gap-2 py-2 text-[15px] font-medium transition-colors hover:text-[#2563eb] 2xl:text-[16px] ${scrolled || light ? "text-slate-800" : "text-white hover:text-[#2563eb]"
                      }`}
                  >
                    {item.label}
                  </Link>
                )}
                <span
                  className={`pointer-events-none absolute -bottom-0.5 left-0 h-[2px] bg-[#2563eb] transition-all duration-200 ${openMenu === item.label ? "w-full" : "w-0"
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
            <a
              href="/#quote"
              onClick={(e) => handleQuoteClick(e, "navbar_desktop")}
              onMouseEnter={() => {
                import("./QuickGuote").catch(() => { });
              }}
              className="group inline-flex h-[44px] items-center gap-2.5 rounded-lg bg-[#2563eb] px-6 text-[15px] font-semibold text-white shadow-xs transition-colors hover:bg-[#1d4ed8] 2xl:h-[48px] 2xl:px-7 2xl:text-[16px] cursor-pointer"
            >
              Request a Quote
              <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] xl:hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className={`block h-[2.5px] w-7 bg-[#2563eb] transition-transform duration-200 ${mobileOpen ? "translate-y-[8.5px] rotate-45" : ""}`} />
            <span className={`block h-[2.5px] w-7 bg-[#2563eb] transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[2.5px] w-7 bg-[#2563eb] transition-transform duration-200 ${mobileOpen ? "-translate-y-[8.5px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Capabilities mega-menu */}
        {openMenu === "Capabilities" && (
          <div className="pointer-events-none absolute left-0 top-full hidden w-full xl:block">
            <div
              data-lenis-prevent
              className="pointer-events-auto mx-auto max-h-[calc(100dvh-68px)] max-w-[900px] overflow-y-auto border-t-2 border-[#2563eb] bg-navy-900 shadow-2xl"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              <div className="flex flex-col px-10 py-6">
                {CAPABILITIES.map((c) => (
                  <Link
                    key={c.name}
                    to={c.href}
                    onClick={closeImmediately}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-navy-700 py-3.5 transition-colors hover:border-[#2563eb]"
                  >
                    <span className="text-[18px] font-semibold text-white transition-colors group-hover:text-[#2563eb]">
                      {c.name}
                    </span>
                    <span className="text-[13px] leading-relaxed text-slate-300">
                      {c.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Infrastructure mega-menu */}
        {openMenu === "Infrastructure" && (
          <div className="pointer-events-none absolute left-0 top-full hidden w-full xl:block pt-1">
            <div
              data-lenis-prevent
              className="pointer-events-auto mx-auto max-w-[1120px] overflow-hidden rounded-2xl border border-white/10 bg-navy-950/98 shadow-2xl backdrop-blur-xl border-t-2 border-t-[#2563eb]"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-8 py-3.5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#2563eb] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                    Infrastructure &amp; Shoring Manufacturing
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Precision-engineered components for construction &amp; civil projects
                </span>
              </div>

              {/* 3 Visual Cards */}
              <div className="grid grid-cols-3 gap-6 p-6">
                {INFRASTRUCTURE.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeImmediately}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-all duration-300 hover:border-[#2563eb]/60 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-blue-950/40"
                  >
                    <div>
                      {/* Image Thumbnail with Badges */}
                      <div className="relative h-36 w-full overflow-hidden rounded-lg bg-navy-900 border border-white/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (target.src.includes("Construction%20Site.png")) {
                              target.src = "/Infrastructure-Assets/Precast Slab Lift at Construction aSite.png";
                            } else if (target.src.includes("Construction%20aSite.png")) {
                              target.src = "/Infrastructure-Assets/Precast Slab Lift at Construction Site.png";
                            }
                          }}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-black/20" />

                        <div className="absolute top-2.5 left-2.5">
                          <span className="rounded bg-navy-950/85 px-2 py-0.5 text-[11px] font-semibold text-blue-300 border border-white/15 backdrop-blur-sm">
                            {item.count}
                          </span>
                        </div>

                        <div className="absolute top-2.5 right-2.5">
                          <span className="rounded bg-[#2563eb] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                            {item.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="pt-3.5 pb-2">
                        <h4 className="text-[15px] font-bold text-white transition-colors group-hover:text-blue-400 leading-snug">
                          {item.name}
                        </h4>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-slate-300 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Footer link */}
                    <div className="pt-2 border-t border-white/10 mt-2 flex items-center justify-between text-xs font-semibold text-[#2563eb]">
                      <span>View All Components</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Bottom Quick Info strip */}
              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-8 py-3.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Manufactured in Ludhiana, Punjab</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">Direct Containerized Global Exports</span>
                </div>
                <Link
                  to="/#quote"
                  onClick={closeImmediately}
                  className="font-semibold text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                >
                  Request Bulk Project RFQ →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Resources dropdown */}
        {openMenu === "Resources" && (
          <div className="pointer-events-none absolute left-0 top-full hidden w-full xl:block">
            <div
              data-lenis-prevent
              className="pointer-events-auto mx-auto max-h-[calc(100dvh-68px)] max-w-[900px] overflow-y-auto border-t-2 border-[#2563eb] bg-navy-900 shadow-2xl"
              onMouseEnter={clearCloseTimeout}
              onMouseLeave={closeImmediately}
            >
              <div className="flex flex-col px-10 py-6">
                {[].map((r: { name: string; href: string }) => (
                  <Link
                    key={r.name}
                    to={r.href}
                    onClick={closeImmediately}
                    className="group flex items-center justify-between border-b border-navy-700 py-4 transition-colors hover:border-[#2563eb]"
                  >
                    <span className="text-[17px] font-medium text-white transition-colors group-hover:text-[#2563eb]">
                      {r.name}
                    </span>
                    <span className="text-[13px] text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#2563eb]">
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
                      className="flex min-h-[48px] w-full items-center justify-between py-2 text-left text-[17px] font-semibold text-white transition-colors hover:text-[#2563eb] active:text-[#2563eb]"
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <span className="p-1 text-slate-400">
                        <Chevron open={isExpanded} />
                      </span>
                    </button>

                    {/* Expandable submenu */}
                    {isExpanded && (
                      <div className="mt-1 flex flex-col gap-1 pl-3 pb-2 border-l-2 border-[#2563eb]/40">
                        {item.label === "Capabilities" && (
                          <>

                            {CAPABILITIES.map((c) => (
                              <Link
                                key={c.name}
                                to={c.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex min-h-[44px] flex-col justify-center py-2 text-slate-200 transition-colors hover:text-[#2563eb]"
                              >
                                <span className="text-[15px] font-semibold text-white">
                                  {c.name}
                                </span>
                                <span className="text-[12px] text-slate-400 line-clamp-1">
                                  {c.desc}
                                </span>
                              </Link>
                            ))}
                          </>
                        )}

                        {item.label === "Infrastructure" && (
                          <div className="mt-2 flex flex-col gap-2">
                            {INFRASTRUCTURE.map((inf) => (
                              <Link
                                key={inf.name}
                                to={inf.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-2.5 text-slate-200 transition-colors hover:border-[#2563eb] hover:bg-white/[0.07]"
                              >
                                <img
                                  src={inf.image}
                                  alt={inf.name}
                                  onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    if (target.src.includes("Construction%20Site.png")) {
                                      target.src = "/Infrastructure-Assets/Precast Slab Lift at Construction aSite.png";
                                    } else if (target.src.includes("Construction%20aSite.png")) {
                                      target.src = "/Infrastructure-Assets/Precast Slab Lift at Construction Site.png";
                                    }
                                  }}
                                  className="h-12 w-16 rounded object-cover border border-white/10 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-[13px] font-semibold text-white truncate">
                                      {inf.name}
                                    </span>
                                    <span className="text-[10px] text-blue-400 shrink-0 font-medium">
                                      {inf.count}
                                    </span>
                                  </div>
                                  <span className="text-[11px] text-slate-400 line-clamp-1">
                                    {inf.desc}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}

                        {item.label === "Resources" && (
                          <>
                            {[].map((r: { name: string; href: string }) => (
                              <Link
                                key={r.name}
                                to={r.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex min-h-[44px] items-center py-2 text-[15px] text-slate-200 transition-colors hover:text-[#2563eb]"
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
                  className="flex min-h-[48px] items-center py-3 text-[17px] font-semibold text-white transition-colors hover:text-[#2563eb] active:text-[#2563eb]"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 pb-2">
            <a
              href="/#quote"
              onClick={(e) => handleQuoteClick(e, "navbar_mobile")}
              className="flex min-h-[48px] sm:min-h-[52px] w-full items-center justify-center gap-3 bg-[#2563eb] text-[16px] font-semibold text-white shadow-md transition-colors hover:bg-[#1d4ed8] active:scale-[0.99] cursor-pointer"
            >
              Get a quote <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
