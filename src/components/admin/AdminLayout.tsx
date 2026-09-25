import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/admin.service';
import {
  Home,
  Users,
  FileText,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [unreadCounts, setUnreadCounts] = useState<{ contacts: number; rfqs: number }>({
    contacts: 0,
    rfqs: 0,
  });

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch unread notification badges
  useEffect(() => {
    let isMounted = true;
    const loadCounts = async () => {
      try {
        const stats = await adminService.getStats();
        if (isMounted) {
          setUnreadCounts({
            contacts: stats.contacts.unread,
            rfqs: stats.rfqs.unread,
          });
        }
      } catch {
        // silent fail on badge fetch
      }
    };

    loadCounts();
    const interval = setInterval(loadCounts, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      to: '/admin',
      end: true,
      label: 'Dashboard',
      icon: Home,
      badge: null,
    },
    {
      to: '/admin/contacts',
      end: false,
      label: 'Contacts',
      icon: Users,
      badge: unreadCounts.contacts > 0 ? unreadCounts.contacts : null,
      badgeColor: 'bg-blue-500',
    },
    {
      to: '/admin/rfqs',
      end: false,
      label: 'RFQs',
      icon: FileText,
      badge: unreadCounts.rfqs > 0 ? unreadCounts.rfqs : null,
      badgeColor: 'bg-purple-500',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F7FC] text-slate-900 font-sans selection:bg-[#2563eb] selection:text-white">
      {/* ----------------------------------------------------------- */}
      {/* DESKTOP SIDEBAR: Clean, Modern SaaS Light Aesthetic          */}
      {/* ----------------------------------------------------------- */}
      <aside className="hidden lg:flex w-64 flex-col justify-between bg-white text-zinc-800 border-r border-zinc-200/80 shrink-0 select-none">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-6 pt-6 pb-5 border-b border-zinc-100">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white border border-zinc-200/80 shadow-xs">
              <img src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/solvoka-logo.webp" alt="Solvoka" className="h-full w-full object-contain p-1" />
            </div>
            <div>
              <div className="font-display font-extrabold text-[16px] tracking-tight text-zinc-900 flex items-center gap-1.5 leading-none">
                Solvoka <span className="text-[#2563eb] font-semibold text-xs tracking-wide uppercase px-1.5 py-0.5 rounded-md bg-blue-50">CRM</span>
              </div>
              <span className="block text-[11px] text-zinc-600 tracking-normal mt-1 leading-none font-normal">
                Internal Operations Portal
              </span>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="px-3 pt-5">
            <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
              Management
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-150 ${isActive
                        ? 'bg-[#2563eb] text-white shadow-xs shadow-blue-500/25'
                        : 'text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-950'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && item.badge > 0 && (
                      <span
                        className="flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold bg-[#2563eb] text-white"
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Quick Sign Out / Status */}
        <div className="p-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/60 px-3.5 py-2.5 text-xs font-medium text-zinc-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ----------------------------------------------------------- */}
      {/* MOBILE SIDEBAR DRAWER                                       */}
      {/* ----------------------------------------------------------- */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex w-68 max-w-[82vw] flex-col justify-between bg-white p-5 text-zinc-900 shadow-2xl border-r border-zinc-200 z-10">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white border border-zinc-200 shadow-xs">
                    <img src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/solvoka-logo.webp" alt="Solvoka" className="h-full w-full object-contain p-1" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-base text-zinc-900">
                      Solvoka <span className="text-[#2563eb]">CRM</span>
                    </span>
                    <span className="block text-[10px] text-zinc-600">Internal Operations Portal</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-5 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold ${isActive
                          ? 'bg-[#2563eb] text-white shadow-xs'
                          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && item.badge > 0 && (
                        <span className="rounded-full bg-[#2563eb] px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-zinc-100 pt-4">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 border border-red-200/60 p-2.5 text-xs font-semibold text-red-600 hover:bg-red-100/60"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* MAIN CONTENT AREA                                           */}
      {/* ----------------------------------------------------------- */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Top Bar matching screenshot */}
        <header className="flex h-20 items-center justify-between lg:justify-end px-4 sm:px-8 shrink-0">
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 lg:hidden shadow-2xs"
            aria-label="Open navigation drawer"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* User Profile Widget matching exact screenshot */}
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 py-1.5 px-2.5 rounded-2xl hover:bg-white/70 transition-all cursor-pointer select-none"
            >
              {/* Solvoka Logo Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white border border-slate-200 shadow-xs">
                <img src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/solvoka-logo.webp" alt="Solvoka" className="h-full w-full object-contain" />
              </div>

              {/* Stacked Admin Name & Role */}
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {user?.name || 'Sumain Singla'}
                </div>
                <div className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                  {user?.role === 'superadmin' ? 'Super Admin' : 'Super Admin'}
                </div>
              </div>

              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">
                    {user?.name || 'Sumain Singla'}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono truncate mt-0.5">
                    {user?.email || 'admin@solvoka.com'}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-bold text-[#2563eb]">
                    {user?.role === 'superadmin' ? 'Super Admin' : 'Administrator'}
                  </span>
                </div>

                <div className="p-1 pt-2 space-y-1">
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                    <span>View Public Website</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Page Content with clean scroll */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 pb-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
