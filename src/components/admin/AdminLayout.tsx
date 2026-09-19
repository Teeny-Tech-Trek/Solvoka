import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminService } from '../../services/admin.service';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<{ contacts: number; rfqs: number }>({
    contacts: 0,
    rfqs: 0,
  });

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
        // silent fail on count badge fetch
      }
    };

    loadCounts();
    const interval = setInterval(loadCounts, 60000); // refresh every minute
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
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/admin/contacts',
      end: false,
      label: 'Contact Inquiries',
      icon: MessageSquare,
      badge: unreadCounts.contacts > 0 ? unreadCounts.contacts : null,
      badgeColor: 'bg-blue-500',
    },
    {
      to: '/admin/rfqs',
      end: false,
      label: 'RFQ & CAD Quotes',
      icon: FileText,
      badge: unreadCounts.rfqs > 0 ? unreadCounts.rfqs : null,
      badgeColor: 'bg-purple-500',
    },
  ];

  const getBreadcrumbs = () => {
    if (location.pathname === '/admin') return ['Portal', 'CRM Dashboard'];
    if (location.pathname.startsWith('/admin/contacts')) return ['Portal', 'Contact Inquiries'];
    if (location.pathname.startsWith('/admin/rfqs')) return ['Portal', 'RFQ & CAD Quotes'];
    return ['Portal', 'Admin'];
  };

  const breadcrumbs = getBreadcrumbs();
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#2563eb] selection:text-white">
      {/* ----------------------------------------------------------- */}
      {/* DESKTOP SIDEBAR: Premium Deep Navy/Slate Styling            */}
      {/* ----------------------------------------------------------- */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-slate-800/60 bg-[#0A1124] text-slate-200 shadow-xl shrink-0">
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="flex h-20 items-center justify-between border-b border-slate-800/80 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#1d4ed8] to-[#3b82f6] text-white shadow-lg shadow-blue-500/25 border border-blue-400/30">
                <Layers className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <div>
                <span className="font-display font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                  SOLVOKA
                  <span className="rounded-md bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-blue-400 border border-blue-500/30">
                    CRM
                  </span>
                </span>
                <span className="block text-[10.5px] font-medium text-slate-400 leading-none tracking-wide">
                  Manufacturing Hub
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="p-4">
            <p className="px-3 pb-2 text-[10.5px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
              Management
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/30 font-bold'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== null && item.badge > 0 && (
                      <span
                        className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10.5px] font-bold text-white shadow-xs ${
                          item.badgeColor || 'bg-blue-500'
                        }`}
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

        {/* Bottom User Card & Actions */}
        <div className="border-t border-slate-800/80 p-4 space-y-3">
          {/* User Info Tile */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-900/90 p-3 border border-slate-800">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-xs">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white leading-tight">
                {user?.name || 'Administrator'}
              </p>
              <p className="truncate text-[10.5px] text-slate-400 font-mono">
                {user?.email || 'admin@example.com'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3.5 py-2.5 text-xs font-semibold text-rose-400 transition-all duration-200 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 cursor-pointer"
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
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex w-72 max-w-[82vw] flex-col justify-between bg-[#0A1124] p-5 text-slate-200 shadow-2xl border-r border-slate-800 z-10 animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md">
                    <Layers className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-base text-white">
                      Solvoka CRM
                    </span>
                    <span className="block text-[10px] text-slate-400">Admin Control</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-5 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
                          isActive
                            ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && item.badge > 0 && (
                        <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex items-center gap-2.5 rounded-lg bg-slate-900 p-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-[11px] font-bold text-white">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-white">{user?.name || 'Admin'}</p>
                  <p className="truncate text-[10px] text-slate-400 font-mono">{user?.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 p-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/20"
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
        {/* Elevated Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-8 backdrop-blur-md shadow-2xs">
          {/* Left: Mobile trigger & Breadcrumbs */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 lg:hidden"
              aria-label="Open sidebar menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <span>{breadcrumbs[0]}</span>
                <span>/</span>
                <span className="font-semibold text-slate-600">{breadcrumbs[1]}</span>
              </div>
              <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {breadcrumbs[1]}
              </h1>
            </div>
          </div>

          {/* Right: Date badge, Live Site CTA & Admin Chip */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Date Pill (Desktop) */}
            <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-slate-200/70 bg-slate-50/70 px-3 py-1.5 text-xs font-medium text-slate-600">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{currentDate}</span>
            </div>

            {/* View Live Website Button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200"
            >
              <span>View Site</span>
              <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600" />
            </a>

            {/* Admin Role Chip */}
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-1.5 text-white shadow-xs">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold">
                {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
