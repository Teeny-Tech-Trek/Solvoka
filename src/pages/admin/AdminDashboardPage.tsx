import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService, type DashboardStats } from '../../services/admin.service';
import { useAuth } from '../../context/AuthContext';
import {
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileCheck,
  Zap,
  Activity,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await adminService.getStats();
        setStats(data);
      } catch (err: unknown) {
        setError((err as Error).message || 'Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Welcome banner skeleton */}
        <div className="h-36 rounded-3xl bg-slate-200/70" />

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-slate-200/70" />
          ))}
        </div>

        {/* Chart skeleton */}
        <div className="h-72 rounded-3xl bg-slate-200/70" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center text-rose-700 shadow-sm">
        <AlertCircle className="mx-auto h-10 w-10 text-rose-500 mb-3" />
        <h3 className="font-display text-base font-bold">Failed to load CRM statistics</h3>
        <p className="mt-1 text-xs text-rose-600 max-w-sm mx-auto">{error || 'Please check your connection and try again.'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-700 shadow-sm transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const totalInquiries = stats.contacts.total + stats.rfqs.total;
  const pendingReview = stats.contacts.unread + stats.rfqs.unread;

  // Max value for 7-day trend chart scaling
  const maxTrend = Math.max(
    ...stats.trend.map((t) => Math.max(t.contacts, t.rfqs)),
    4
  );

  return (
    <div className="space-y-8">
      {/* ============================================================ */}
      {/* WELCOME BANNER                                               */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A1124] via-[#0F1D3F] to-[#142654] p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10 border border-slate-800">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 -bottom-16 h-48 w-48 rounded-full bg-indigo-500/15 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 border border-blue-400/25 px-3 py-1 text-[11px] font-semibold text-blue-300">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Manufacturing Lead Operations</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Administrator'} 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Here is your active manufacturing inquiry overview. You have{' '}
              <span className="font-bold text-white underline decoration-blue-400 underline-offset-4">
                {pendingReview} unread {pendingReview === 1 ? 'inquiry' : 'inquiries'}
              </span>{' '}
              requiring engineering attention.
            </p>
          </div>

          {/* Quick Metrics Badge Container */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10 min-w-[120px]">
              <span className="text-[11px] text-slate-300 font-medium block">Total Queries</span>
              <span className="font-display text-2xl font-black text-white">{totalInquiries}</span>
            </div>
            <div className="rounded-2xl bg-blue-500/20 backdrop-blur-md px-4 py-3 border border-blue-400/30 min-w-[120px]">
              <span className="text-[11px] text-blue-300 font-medium block">Action Needed</span>
              <span className="font-display text-2xl font-black text-white flex items-center gap-1.5">
                {pendingReview}
                {pendingReview > 0 && (
                  <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. CONTACT QUERIES STATS                                     */}
      {/* ============================================================ */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 border border-blue-500/20">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 leading-tight">
                Contact Inquiries
              </h3>
              <p className="text-[11px] text-slate-500">General & custom manufacturing queries</p>
            </div>
          </div>

          <Link
            to="/admin/contacts"
            className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-blue-300 hover:text-blue-600"
          >
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 text-slate-400 group-hover:text-blue-600" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                Total Inquiries
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <MessageSquare className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-black text-slate-900">
              {stats.contacts.total}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Activity className="h-3 w-3 text-slate-400" />
              <span>All lifetime submissions</span>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50/50 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider font-mono">
                New / Unread
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Clock className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-black text-blue-900">
              {stats.contacts.unread}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-blue-700 font-medium">
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>Pending initial review</span>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50/40 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider font-mono">
                In Progress
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Zap className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-black text-amber-900">
              {stats.contacts.inProgress}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-700 font-medium">
              <span>Active client dialogue</span>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/40 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider font-mono">
                Resolved
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-black text-emerald-900">
              {stats.contacts.resolved}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
              <span>Successfully closed</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. RFQ QUOTES STATS                                          */}
      {/* ============================================================ */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 border border-purple-500/20">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-slate-900 leading-tight">
                RFQ & Engineering Quotes
              </h3>
              <p className="text-[11px] text-slate-500">Drawings, material specs & quantity requests</p>
            </div>
          </div>

          <Link
            to="/admin/rfqs"
            className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-purple-300 hover:text-purple-600"
          >
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 text-slate-400 group-hover:text-purple-600" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                Total RFQs
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FileText className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-black text-slate-900">
              {stats.rfqs.total}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Activity className="h-3 w-3 text-slate-400" />
              <span>Quotes registered</span>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-200 bg-gradient-to-b from-purple-50/50 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider font-mono">
                New / Unread
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Clock className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-black text-purple-900">
              {stats.rfqs.unread}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-purple-700 font-medium">
              <span className="flex h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse" />
              <span>Pending CAD & costing</span>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-gradient-to-b from-amber-50/40 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider font-mono">
                In Review
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <Clock className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-black text-amber-900">
              {stats.rfqs.inProgress}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-700 font-medium">
              <span>DFM & supplier quotes</span>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50/40 to-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider font-mono">
                Quoted
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-black text-emerald-900">
              {stats.rfqs.resolved}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
              <span>Proposal sent to client</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. 7-DAY INBOUND VOLUME CHART                                */}
      {/* ============================================================ */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>7-Day Inbound Trend</span>
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Daily query submissions across Contact and RFQ channels
            </p>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-5 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md bg-gradient-to-tr from-blue-600 to-blue-500 shadow-2xs" />
              <span className="text-slate-700">Contact Inquiries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-2xs" />
              <span className="text-slate-700">RFQ Quotes</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="grid grid-cols-7 gap-2 sm:gap-6 pt-6 border-t border-slate-100 items-end min-h-[200px]">
          {stats.trend.map((day) => {
            const contactHeightPct = Math.min(100, Math.round((day.contacts / maxTrend) * 100));
            const rfqHeightPct = Math.min(100, Math.round((day.rfqs / maxTrend) * 100));

            return (
              <div key={day.date} className="flex flex-col items-center gap-3 h-full justify-end group">
                <div className="flex items-end gap-1.5 sm:gap-2.5 h-36 w-full justify-center">
                  {/* Contact Bar */}
                  <div
                    style={{ height: `${Math.max(contactHeightPct, 8)}%` }}
                    className="w-3 sm:w-7 rounded-t-lg bg-gradient-to-t from-blue-700 to-blue-500 transition-all duration-200 group-hover:scale-y-105 relative flex justify-center shadow-xs"
                    title={`Contacts: ${day.contacts}`}
                  >
                    {day.contacts > 0 && (
                      <span className="absolute -top-6 text-[10.5px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded-md shadow-2xs">
                        {day.contacts}
                      </span>
                    )}
                  </div>

                  {/* RFQ Bar */}
                  <div
                    style={{ height: `${Math.max(rfqHeightPct, 8)}%` }}
                    className="w-3 sm:w-7 rounded-t-lg bg-gradient-to-t from-purple-700 to-purple-500 transition-all duration-200 group-hover:scale-y-105 relative flex justify-center shadow-xs"
                    title={`RFQs: ${day.rfqs}`}
                  >
                    {day.rfqs > 0 && (
                      <span className="absolute -top-6 text-[10.5px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.2 rounded-md shadow-2xs">
                        {day.rfqs}
                      </span>
                    )}
                  </div>
                </div>

                {/* Date Label */}
                <span className="text-[10px] sm:text-[11px] font-mono font-medium text-slate-500 truncate w-full text-center">
                  {day.date.slice(5)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. RECENT ACTIVITY LISTS                                     */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Contacts */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-display text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span>Recent Contact Messages</span>
            </h4>
            <Link to="/admin/contacts" className="text-xs font-semibold text-blue-600 hover:underline">
              View all
            </Link>
          </div>

          {stats.recentActivity.contacts.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400">No contact queries yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.contacts.map((c) => (
                <Link
                  key={c._id}
                  to={`/admin/contacts?id=${c._id}`}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-100 p-3.5 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-xs"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-bold text-xs">
                      {c.name ? c.name.slice(0, 2).toUpperCase() : 'CO'}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {!c.isRead && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                        <p className="truncate text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {c.name}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono truncate">
                          · {c.company}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-600">{c.message}</p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[10px] font-mono text-slate-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent RFQs */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="font-display text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <span>Recent RFQ Requests</span>
            </h4>
            <Link to="/admin/rfqs" className="text-xs font-semibold text-purple-600 hover:underline">
              View all
            </Link>
          </div>

          {stats.recentActivity.rfqs.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400">No RFQ requests yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.rfqs.map((r) => (
                <Link
                  key={r._id}
                  to={`/admin/rfqs?id=${r._id}`}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-100 p-3.5 transition-all duration-200 hover:border-purple-200 hover:bg-purple-50/30 hover:shadow-xs"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 font-bold text-xs">
                      {r.name ? r.name.slice(0, 2).toUpperCase() : 'RF'}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {!r.isRead && (
                          <span className="h-2 w-2 rounded-full bg-purple-600 shrink-0" />
                        )}
                        <p className="truncate text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                          {r.name}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono truncate">
                          · {r.company}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                        <span className="font-medium">Qty: {r.quantity}</span>
                        {r.material && <span className="truncate">· {r.material}</span>}
                        {r.cadFile && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-purple-100/70 px-1.5 py-0.5 text-[10.5px] text-purple-700 font-bold">
                            <FileCheck className="h-3 w-3" /> CAD
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="shrink-0 text-[10px] font-mono text-slate-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
