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
  RotateCw,
  Settings,
  Paperclip,
  ArrowRight,
  AlertTriangle,
  Mail,
  Layers,
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
      <div className="space-y-6 animate-pulse select-none">
        {/* Welcome banner skeleton */}
        <div className="h-44 rounded-3xl bg-slate-200/70" />

        {/* Inquiries & Quotes skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-48 rounded-3xl bg-slate-200/70" />
          <div className="h-48 rounded-3xl bg-slate-200/70" />
        </div>

        {/* Activity skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="h-64 rounded-3xl bg-slate-200/70" />
          <div className="h-64 rounded-3xl bg-slate-200/70" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-8 text-center text-rose-700 shadow-xs">
        <AlertCircle className="mx-auto h-10 w-10 text-rose-500 mb-3" />
        <h3 className="font-display text-base font-bold">Failed to load CRM statistics</h3>
        <p className="mt-1 text-xs text-rose-600 max-w-sm mx-auto">
          {error || 'Please check your connection and try again.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-700 shadow-xs transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const totalInquiries = stats.contacts.total + stats.rfqs.total;
  const pendingReview = stats.contacts.unread + stats.rfqs.unread;

  return (
    <div className="space-y-6 select-none">
      {/* ============================================================ */}
      {/* 1. HERO WELCOME BANNER                                       */}
      {/* ============================================================ */}
      {/* 1. HERO WELCOME BANNER                                       */}
      {/* ============================================================ */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, #e8f0fe 0%, #eef3ff 35%, #dde8fb 65%, #c8daf8 100%)',
          boxShadow: '0 2px 24px 0 rgba(59,130,246,0.07)',
          border: '1px solid rgba(147,197,253,0.35)',
        }}
      >
        {/* Large soft radial glow on the right — pure CSS, no image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0"
          style={{
            width: '52%',
            background: 'radial-gradient(ellipse 80% 90% at 90% 50%, rgba(147,197,253,0.45) 0%, rgba(191,219,254,0.22) 50%, transparent 100%)',
          }}
        />
        {/* Subtle top-left ambient light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0"
          style={{
            width: '30%',
            height: '60%',
            background: 'radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.55) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* ── Left: Welcome copy ── */}
          <div className="space-y-2.5 max-w-lg">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200/70 bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#2563eb] shadow-[0_1px_4px_rgba(37,99,235,0.10)] backdrop-blur-sm">
              <Layers className="h-3.5 w-3.5 text-[#2563eb]" />
              <span>Manufacturing Lead Operations</span>
            </div>

            <h1 className="text-[1.65rem] sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
              Welcome back, {user?.name || 'Sumain Singla'} 👋
            </h1>

            <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-sm">
              Here is your active manufacturing inquiry overview. You have{' '}
              <span className="font-semibold text-slate-700">
                {pendingReview} unread {pendingReview === 1 ? 'inquiry' : 'inquiries'}
              </span>{' '}
              requiring engineering attention.
            </p>
          </div>

          {/* ── Right: Metric cards + CSS precision orb ── */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 lg:gap-4 self-start lg:self-center shrink-0">

            {/* Stat Card 1 – Total Queries */}
            <div
              className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3.5 min-w-[138px]"
              style={{ boxShadow: '0 2px 12px rgba(59,130,246,0.10), 0 1px 3px rgba(0,0,0,0.06)', border: '1px solid rgba(219,234,254,0.8)' }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                <MessageSquare className="h-[18px] w-[18px]" />
              </div>
              <div>
                <span className="text-[10.5px] font-medium text-slate-400 block leading-tight tracking-wide">
                  Total Queries
                </span>
                <span className="text-[1.6rem] font-black text-slate-900 leading-none mt-0.5 block">
                  {totalInquiries}
                </span>
              </div>
            </div>

            {/* Stat Card 2 – Action Needed */}
            <div
              className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3.5 min-w-[138px]"
              style={{ boxShadow: '0 2px 12px rgba(239,68,68,0.09), 0 1px 3px rgba(0,0,0,0.06)', border: '1px solid rgba(254,226,226,0.9)' }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
                <AlertTriangle className="h-[18px] w-[18px]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="text-[10.5px] font-medium text-slate-400 tracking-wide">Action Needed</span>
                  <span className="h-[7px] w-[7px] rounded-full bg-rose-500 shrink-0 shadow-[0_0_0_2px_rgba(239,68,68,0.2)]" />
                </div>
                <span className="text-[1.6rem] font-black text-slate-900 leading-none mt-0.5 block">
                  {pendingReview}
                </span>
              </div>
            </div>

            {/* Quote text + CSS-only abstract precision gear orb (no image) */}
            <div className="hidden xl:flex items-center gap-4 pl-1">
              {/* Vertical text block */}
              <div className="text-[10px] text-slate-500 font-semibold leading-[1.35] select-none tracking-wide uppercase">
                Precision<br />Parts<br />Stronger<br />Industries
              </div>

              {/* CSS-only abstract precision component */}
              <div className="relative flex h-[96px] w-[96px] shrink-0 items-center justify-center">
                {/* Outer haze glow */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(147,197,253,0.5) 0%, rgba(191,219,254,0.2) 60%, transparent 100%)',
                    filter: 'blur(10px)',
                  }}
                />
                {/* Outer ring */}
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #bfdbfe 0%, #93c5fd 25%, #dbeafe 50%, #93c5fd 75%, #bfdbfe 100%)',
                    boxShadow: '0 4px 20px rgba(59,130,246,0.22)',
                  }}
                />
                {/* Mid ring */}
                <div
                  className="absolute inset-4 rounded-full"
                  style={{
                    background: 'linear-gradient(145deg, #e8f0fe 0%, #c7d9f8 50%, #dbeafe 100%)',
                    boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.7), 0 2px 8px rgba(59,130,246,0.15)',
                  }}
                />
                {/* Inner polished core */}
                <div
                  className="absolute inset-[22px] rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #eff6ff 45%, #bfdbfe 100%)',
                    boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.9), 0 1px 4px rgba(59,130,246,0.2)',
                  }}
                />
                {/* Gear tooth notches — 8 equally spaced small squares around the edge */}
                {[0,45,90,135,180,225,270,315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute"
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '2px',
                      background: 'linear-gradient(135deg,#93c5fd,#60a5fa)',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%,-50%) rotate(${deg}deg) translateY(-39px)`,
                      boxShadow: '0 1px 3px rgba(59,130,246,0.25)',
                    }}
                  />
                ))}
                {/* Center bore */}
                <div
                  className="absolute inset-[30px] rounded-full z-10"
                  style={{
                    background: 'linear-gradient(135deg,#dbeafe 0%,#bfdbfe 100%)',
                    boxShadow: 'inset 0 2px 6px rgba(59,130,246,0.25)',
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CONTACT INQUIRIES & RFQ STATS CARDS (2-COLUMN GRID)       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Card: Contact Inquiries */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  Contact Inquiries
                </h2>
                <p className="text-xs text-slate-400">General & custom manufacturing queries</p>
              </div>
            </div>

            <Link
              to="/admin/contacts"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:text-blue-700 transition"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* 4 Stat Boxes inside */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Total Inquiries */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                <FileText className="h-3.5 w-3.5 text-blue-600" />
                <span className="truncate">Total Inquiries</span>
              </div>
              <p className="mt-2.5 text-2xl font-black text-slate-900">{stats.contacts.total}</p>
              <span className="mt-1 text-[10px] text-slate-400 block truncate">
                All lifetime submissions
              </span>
            </div>

            {/* New / Unread */}
            <div className="rounded-2xl border border-amber-100/70 bg-amber-50/40 p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800">
                <Mail className="h-3.5 w-3.5 text-amber-600" />
                <span className="truncate">New / Unread</span>
              </div>
              <p className="mt-2.5 text-2xl font-black text-slate-900">{stats.contacts.unread}</p>
              <span className="mt-1 text-[10px] text-slate-400 block truncate">
                Pending initial review
              </span>
            </div>

            {/* In Progress */}
            <div className="rounded-2xl border border-purple-100/70 bg-purple-50/40 p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-800">
                <RotateCw className="h-3.5 w-3.5 text-purple-600" />
                <span className="truncate">In Progress</span>
              </div>
              <p className="mt-2.5 text-2xl font-black text-slate-900">{stats.contacts.inProgress}</p>
              <span className="mt-1 text-[10px] text-slate-400 block truncate">
                Active client dialogue
              </span>
            </div>

            {/* Resolved */}
            <div className="rounded-2xl border border-emerald-100/70 bg-emerald-50/40 p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span className="truncate">Resolved</span>
              </div>
              <p className="mt-2.5 text-2xl font-black text-slate-900">{stats.contacts.resolved}</p>
              <span className="mt-1 text-[10px] text-slate-400 block truncate">
                Successfully closed
              </span>
            </div>
          </div>
        </div>

        {/* Right Card: RFQ & Engineering Quotes */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  RFQ & Engineering Quotes
                </h2>
                <p className="text-xs text-slate-400">Drawings, material specs & quantity requests</p>
              </div>
            </div>

            <Link
              to="/admin/rfqs"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:text-blue-700 transition"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* 4 Stat Boxes inside */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Total RFQs */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                <FileText className="h-3.5 w-3.5 text-blue-600" />
                <span className="truncate">Total RFQs</span>
              </div>
              <p className="mt-2.5 text-2xl font-black text-slate-900">{stats.rfqs.total}</p>
              <span className="mt-1 text-[10px] text-slate-400 block truncate">
                Quotes registered
              </span>
            </div>

            {/* New / Unread */}
            <div className="rounded-2xl border border-amber-100/70 bg-amber-50/40 p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800">
                <Mail className="h-3.5 w-3.5 text-amber-600" />
                <span className="truncate">New / Unread</span>
              </div>
              <p className="mt-2.5 text-2xl font-black text-slate-900">{stats.rfqs.unread}</p>
              <span className="mt-1 text-[10px] text-slate-400 block truncate">
                Pending CAD & costing
              </span>
            </div>

            {/* In Review */}
            <div className="rounded-2xl border border-purple-100/70 bg-purple-50/40 p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-800">
                <Clock className="h-3.5 w-3.5 text-purple-600" />
                <span className="truncate">In Review</span>
              </div>
              <p className="mt-2.5 text-2xl font-black text-slate-900">{stats.rfqs.inProgress}</p>
              <span className="mt-1 text-[10px] text-slate-400 block truncate">
                DFM & supplier quotes
              </span>
            </div>

            {/* Quoted */}
            <div className="rounded-2xl border border-emerald-100/70 bg-emerald-50/40 p-3.5 flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span className="truncate">Quoted</span>
              </div>
              <p className="mt-2.5 text-2xl font-black text-slate-900">{stats.rfqs.resolved}</p>
              <span className="mt-1 text-[10px] text-slate-400 block truncate">
                Proposal sent to client
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. RECENT ACTIVITY LISTS (2-COLUMN GRID)                     */}
      {/* Note: 7-Day Inbound Trend chart has been removed as requested */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Card: Recent Contact Messages */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between pb-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Recent Contact Messages</h3>
            </div>
            <Link
              to="/admin/contacts"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:text-blue-700 transition"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {stats.recentActivity.contacts.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400">No contact queries yet.</p>
          ) : (
            <div className="divide-y divide-slate-50">
              {stats.recentActivity.contacts.map((c, index) => {
                const avatarColors = [
                  'bg-[#dbeafe] text-[#1d4ed8]',
                  'bg-[#f3e8ff] text-[#7e22ce]',
                  'bg-[#dcfce7] text-[#15803d]',
                  'bg-[#ffedd5] text-[#c2410c]',
                ];
                const colorClass = avatarColors[index % avatarColors.length];

                return (
                  <Link
                    key={c._id}
                    to={`/admin/contacts?id=${c._id}`}
                    className="group flex items-center justify-between gap-3 py-3 px-1 transition-colors hover:bg-slate-50/60 rounded-xl"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* Initials Avatar */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-xs ${colorClass}`}
                      >
                        {c.name ? c.name.slice(0, 2).toUpperCase() : 'CO'}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-xs font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                            {c.name}
                          </p>
                          <span className="text-slate-400 text-xs">·</span>
                          <span className="text-[11px] text-slate-500 truncate">{c.company}</span>
                        </div>
                        <p className="truncate text-xs text-slate-400 mt-0.5">{c.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {!c.isRead && (
                        <span className="h-2 w-2 rounded-full bg-[#2563eb]" title="Unread" />
                      )}
                      <span className="text-xs font-normal text-slate-400">
                        {new Date(c.createdAt).toLocaleDateString('en-US', {
                          month: 'numeric',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Card: Recent RFQ Requests */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between pb-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563eb]">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Recent RFQ Requests</h3>
            </div>
            <Link
              to="/admin/rfqs"
              className="group inline-flex items-center gap-1 text-xs font-semibold text-[#2563eb] hover:text-blue-700 transition"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {stats.recentActivity.rfqs.length === 0 ? (
            <p className="py-8 text-center text-xs text-slate-400">No RFQ requests yet.</p>
          ) : (
            <div className="divide-y divide-slate-50">
              {stats.recentActivity.rfqs.map((rfq, index) => {
                const avatarColors = [
                  'bg-[#ffe4e6] text-[#be123c]',
                  'bg-[#dbeafe] text-[#1d4ed8]',
                  'bg-[#ffedd5] text-[#c2410c]',
                  'bg-[#f3e8ff] text-[#7e22ce]',
                ];
                const colorClass = avatarColors[index % avatarColors.length];

                return (
                  <Link
                    key={rfq._id}
                    to={`/admin/rfqs?id=${rfq._id}`}
                    className="group flex items-center justify-between gap-3 py-3 px-1 transition-colors hover:bg-slate-50/60 rounded-xl"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* Initials Avatar */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-xs ${colorClass}`}
                      >
                        {rfq.name ? rfq.name.slice(0, 2).toUpperCase() : 'RF'}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-xs font-bold text-slate-900 group-hover:text-[#2563eb] transition-colors">
                            {rfq.name}
                          </p>
                          <span className="text-slate-400 text-xs">·</span>
                          <span className="text-[11px] text-slate-500 truncate">{rfq.company}</span>
                        </div>
                        <p className="truncate text-xs text-slate-600 mt-0.5">
                          <span className="font-semibold text-slate-800">Qty: {rfq.quantity} pcs</span>
                          {rfq.material ? ` · ${rfq.material}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* CAD Attachment Pill Badge */}
                      {rfq.cadFile && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200/80 px-2 py-0.5 text-[10.5px] font-bold text-[#2563eb]">
                          <Paperclip className="h-3 w-3" />
                          <span>CAD</span>
                        </span>
                      )}

                      {!rfq.isRead && (
                        <span className="h-2 w-2 rounded-full bg-[#2563eb]" title="Unread" />
                      )}
                      <span className="text-xs font-normal text-slate-400">
                        {new Date(rfq.createdAt).toLocaleDateString('en-US', {
                          month: 'numeric',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
