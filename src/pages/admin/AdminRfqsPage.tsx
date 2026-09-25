import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  adminService,
  type RfqItem,
} from '../../services/admin.service';
import {
  Search,
  Trash2,
  X,
  FileText,
  Building2,
  Mail,
  Phone,
  Package,
  Download,
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  User,
  Paperclip,
  Shield,
  ArrowRight,
} from 'lucide-react';

/* ─── Status helpers ──────────────────────────────────────────────────────── */
type StatusKey = 'new' | 'in-progress' | 'resolved' | 'closed';

const STATUS_META: Record<StatusKey, { label: string; dot: string; pill: string; text: string }> = {
  new:          { label: 'New',       dot: 'bg-[#2563eb]', pill: 'bg-[#2563eb]/8 text-[#2563eb] border-[#2563eb]/20', text: 'text-[#2563eb]' },
  'in-progress':{ label: 'In Review', dot: 'bg-zinc-900',  pill: 'bg-zinc-900/8  text-zinc-800  border-zinc-300',     text: 'text-zinc-800'  },
  resolved:    { label: 'Quoted',    dot: 'bg-zinc-400',  pill: 'bg-zinc-100    text-zinc-500  border-zinc-200',     text: 'text-zinc-500'  },
  closed:      { label: 'Closed',    dot: 'bg-zinc-300',  pill: 'bg-zinc-50     text-zinc-400  border-zinc-200',     text: 'text-zinc-400'  },
};

function StatusPill({ status }: { status: string }) {
  const meta = STATUS_META[status as StatusKey] ?? { label: status, pill: 'bg-zinc-100 text-zinc-500 border-zinc-200', dot: 'bg-zinc-300', text: 'text-zinc-500' };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${meta.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function AdminRfqsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rfqs, setRfqs] = useState<RfqItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedRfq, setSelectedRfq] = useState<RfqItem | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState(false);

  const fetchRfqs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminService.getRfqs({ page, limit: 10, search, status: statusFilter });
      setRfqs(data.docs);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      const queryId = searchParams.get('id');
      if (queryId) {
        const found = data.docs.find((r: RfqItem) => r._id === queryId);
        if (found) handleOpenDetail(found);
        else adminService.getRfqById(queryId).then((r) => handleOpenDetail(r)).catch(() => {});
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [page, search, statusFilter, searchParams]);

  useEffect(() => { fetchRfqs(); }, [fetchRfqs]);

  const handleOpenDetail = async (rfq: RfqItem) => {
    setSelectedRfq(rfq);
    if (!rfq.isRead) {
      setRfqs((prev) => prev.map((r) => (r._id === rfq._id ? { ...r, isRead: true } : r)));
      try { await adminService.getRfqById(rfq._id); } catch (err) { console.error(err); }
    }
  };

  const handleCloseDetail = () => {
    setSelectedRfq(null);
    if (searchParams.has('id')) { searchParams.delete('id'); setSearchParams(searchParams); }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedRfq) return;
    try {
      setActionLoading(true);
      const updated = await adminService.updateRfqStatus(selectedRfq._id, newStatus);
      setSelectedRfq(updated);
      setRfqs((prev) => prev.map((r) => (r._id === updated._id ? { ...r, status: updated.status } : r)));
    } catch (err) { console.error(err); }
    finally { setActionLoading(false); }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRfq || !noteText.trim()) return;
    try {
      setIsAddingNote(true);
      const updated = await adminService.addRfqNote(selectedRfq._id, noteText.trim());
      setSelectedRfq(updated);
      setNoteText('');
      setRfqs((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
    } catch (err) { console.error(err); }
    finally { setIsAddingNote(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionLoading(true);
      await adminService.deleteRfq(id);
      setDeleteConfirmId(null);
      if (selectedRfq?._id === id) setSelectedRfq(null);
      setRfqs((prev) => prev.filter((r) => r._id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) { console.error(err); }
    finally { setActionLoading(false); }
  };

  const handleDownloadCad = async (rfqId: string, filename: string) => {
    try {
      setDownloadingFile(true);
      await adminService.downloadCadFile(rfqId, filename);
    } catch (err) {
      alert('Failed to download CAD file: ' + ((err as Error).message || 'Server error'));
    } finally { setDownloadingFile(false); }
  };

  const TABS = [
    { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'in-progress', label: 'In Review' },
    { id: 'resolved', label: 'Quoted' },
    { id: 'closed', label: 'Closed' },
  ];

  const STATUS_LABELS: Record<string, string> = {
    new: 'New', 'in-progress': 'In Review', resolved: 'Quoted', closed: 'Closed',
  };

  /* ─── render ──────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-5">

      {/* ── Page title ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-bold tracking-tight text-zinc-900">Quote Requests</h1>
          <p className="mt-0.5 text-[12px] text-zinc-400">Inbound engineering RFQs &amp; project specifications</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3.5 py-1.5 shadow-sm">
          <span className="text-[11px] font-medium text-zinc-400">Total</span>
          <span className="text-sm font-bold text-zinc-900">{total}</span>
        </div>
      </div>

      {/* ── Controls bar ───────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 gap-0.5">
          {TABS.map((tab) => {
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setStatusFilter(tab.id); setPage(1); }}
                className={`rounded-md px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  active ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search customer, material…"
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-8 text-[12px] text-zinc-900 placeholder:text-zinc-400 shadow-sm transition focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15"
          />
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(''); setPage(1); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 hover:text-zinc-700 transition"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead className="border-b border-zinc-100 bg-zinc-50">
              <tr>
                <th className="w-5 py-3 pl-4 pr-2" />
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Customer</th>
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Contact</th>
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Material</th>
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Qty</th>
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Files</th>
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Date</th>
                <th className="py-3 pl-2 pr-4 text-right text-[10px] font-bold uppercase tracking-widest text-zinc-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {loading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-3.5 pl-4 pr-2"><div className="h-2 w-2 rounded-full bg-zinc-100" /></td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-zinc-100 shrink-0" />
                        <div className="space-y-1.5">
                          <div className="h-2.5 w-20 rounded bg-zinc-100" />
                          <div className="h-2 w-14 rounded bg-zinc-100" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="space-y-1.5">
                        <div className="h-2.5 w-28 rounded bg-zinc-100" />
                        <div className="h-2 w-16 rounded bg-zinc-100" />
                      </div>
                    </td>
                    <td colSpan={6} className="py-3.5 px-3"><div className="h-2.5 w-full rounded bg-zinc-100" /></td>
                  </tr>
                ))
              ) : rfqs.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-20 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-300">
                      <FileText className="h-6 w-6" />
                    </div>
                    <p className="text-[13px] font-semibold text-zinc-700">No RFQ requests found</p>
                    <p className="mt-1 text-[12px] text-zinc-400">Adjust filters or clear your search.</p>
                  </td>
                </tr>
              ) : (
                rfqs.map((rfq) => (
                  <tr
                    key={rfq._id}
                    onClick={() => handleOpenDetail(rfq)}
                    className={`group cursor-pointer transition-colors duration-100 hover:bg-[#2563eb]/[0.03] ${!rfq.isRead ? 'bg-[#2563eb]/[0.025]' : ''}`}
                  >
                    <td className="py-3.5 pl-4 pr-2">
                      {!rfq.isRead ? <span className="block h-1.5 w-1.5 rounded-full bg-[#2563eb]" /> : <span className="block h-1.5 w-1.5" />}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-[10px]">
                          {rfq.name ? rfq.name.slice(0, 2).toUpperCase() : 'RF'}
                        </div>
                        <div>
                          <p className={`font-semibold text-zinc-900 group-hover:text-[#2563eb] transition-colors leading-tight ${!rfq.isRead ? 'font-bold' : ''}`}>{rfq.name}</p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{rfq.company || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="text-zinc-700 font-medium truncate max-w-[160px]">{rfq.email}</p>
                      {rfq.phone && <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">{rfq.phone}</p>}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-block rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600">
                        {rfq.material || 'Standard'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="font-bold text-zinc-900">{rfq.quantity}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1">
                        {rfq.cadFile && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-[#2563eb]/20 bg-[#2563eb]/8 px-1.5 py-0.5 text-[10.5px] font-bold text-[#2563eb]">
                            <Paperclip className="h-2.5 w-2.5" />CAD
                          </span>
                        )}
                        {rfq.ndaRequired && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 text-[10.5px] font-bold text-zinc-600">NDA</span>
                        )}
                        {!rfq.cadFile && !rfq.ndaRequired && <span className="text-zinc-300">—</span>}
                      </div>
                    </td>
                    <td className="py-3.5 px-3"><StatusPill status={rfq.status} /></td>
                    <td className="py-3.5 px-3 text-[11px] text-zinc-400 whitespace-nowrap font-mono">
                      {new Date(rfq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 pl-2 pr-4 text-right">
                      <div className="inline-flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <button type="button" onClick={() => handleOpenDetail(rfq)} className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-[#2563eb] transition" title="Open">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" onClick={() => setDeleteConfirmId(rfq._id)} className="rounded-md p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition" title="Delete">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/60 px-4 py-2.5">
          <span className="text-[11px] text-zinc-400">
            {rfqs.length} of <span className="font-semibold text-zinc-600">{total}</span> results
            &nbsp;·&nbsp; page <span className="font-semibold text-zinc-600">{page}</span> / {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button type="button" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm">
              <ChevronLeft className="h-3.5 w-3.5" />Prev
            </button>
            <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm">
              Next<ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Centered Modal ─────────────────────────────────────────────── */}
      {selectedRfq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" onClick={handleCloseDetail} />

          {/* modal box */}
          <div
            className="relative z-10 flex w-full max-w-4xl flex-col bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 64px)' }}
          >
            {/* top blue accent bar */}
            <div className="h-[3px] w-full bg-[#2563eb] shrink-0" />

            {/* header */}
            <div className="flex items-center justify-between gap-4 border-b border-zinc-100 px-6 py-4 shrink-0">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white font-bold text-sm tracking-wide">
                  {selectedRfq.name ? selectedRfq.name.slice(0, 2).toUpperCase() : 'RF'}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-zinc-900 leading-tight truncate">{selectedRfq.name}</p>
                  <div className="mt-1 flex items-center gap-2.5 flex-wrap">
                    <StatusPill status={selectedRfq.status} />
                    <span className="text-[10px] font-mono text-zinc-300">#{selectedRfq._id.slice(-8).toUpperCase()}</span>
                    <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">{new Date(selectedRfq.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button type="button" onClick={handleCloseDetail}
                className="shrink-0 rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* status bar */}
            <div className="border-b border-zinc-100 bg-zinc-50/70 px-6 py-3 shrink-0 flex items-center gap-2.5 flex-wrap">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mr-1">Status</p>
              {(['new', 'in-progress', 'resolved', 'closed'] as StatusKey[]).map((s) => {
                const isActive = selectedRfq.status === s;
                return (
                  <button key={s} type="button" disabled={actionLoading} onClick={() => handleStatusChange(s)}
                    className={`rounded-md border px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 ${
                      isActive ? 'border-[#2563eb] bg-[#2563eb] text-white shadow-sm' : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                    }`}>
                    {STATUS_LABELS[s]}
                  </button>
                );
              })}
              {actionLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-400 ml-1" />}
            </div>

            {/* two-column body */}
            <div className="flex flex-1 overflow-hidden min-h-0">

              {/* LEFT — customer details + CAD */}
              <div className="flex-1 overflow-y-auto border-r border-zinc-100 min-w-0">

                <div className="px-6 py-5 border-b border-zinc-100">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Customer Details</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      { icon: User,      label: 'Name',     value: selectedRfq.name },
                      { icon: Building2, label: 'Company',  value: selectedRfq.company || '—' },
                      { icon: Mail,      label: 'Email',    value: selectedRfq.email, href: `mailto:${selectedRfq.email}` },
                      { icon: Phone,     label: 'Phone',    value: selectedRfq.phone || 'Not provided' },
                      { icon: Package,   label: 'Quantity', value: selectedRfq.quantity ? `${selectedRfq.quantity} units` : '—' },
                      { icon: FileText,  label: 'Material', value: selectedRfq.material || 'Not specified' },
                    ].map(({ icon: Icon, label, value, href }) => (
                      <div key={label}>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-[12px] font-semibold text-[#2563eb] hover:underline flex items-center gap-1.5 leading-snug">
                            <Icon className="h-3 w-3 shrink-0" />{value}
                          </a>
                        ) : (
                          <p className="text-[12px] font-semibold text-zinc-900 flex items-center gap-1.5 leading-snug">
                            <Icon className="h-3 w-3 text-zinc-300 shrink-0" />{value}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-600">
                      <Shield className="h-3.5 w-3.5 text-zinc-400" />
                      Mutual NDA Required
                    </span>
                    <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold border ${
                      selectedRfq.ndaRequired
                        ? 'bg-[#2563eb]/8 text-[#2563eb] border-[#2563eb]/20'
                        : 'bg-zinc-100 text-zinc-500 border-zinc-200'
                    }`}>
                      {selectedRfq.ndaRequired ? 'Yes — Required' : 'No'}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">CAD / Spec Drawing</p>
                  {selectedRfq.cadFile ? (
                    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#2563eb] text-white">
                          <Paperclip className="h-4.5 w-4.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-zinc-900 truncate max-w-[220px]">{selectedRfq.cadFile.originalName}</p>
                          <p className="text-[10.5px] text-zinc-400 font-mono mt-0.5">
                            {(selectedRfq.cadFile.size / (1024 * 1024)).toFixed(2)} MB &middot; {selectedRfq.cadFile.mimeType || 'CAD'}
                          </p>
                        </div>
                      </div>
                      <button type="button" disabled={downloadingFile}
                        onClick={() => handleDownloadCad(selectedRfq._id, selectedRfq.cadFile!.originalName)}
                        className="flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-4 py-2 text-[11px] font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50 transition cursor-pointer shrink-0">
                        {downloadingFile ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                        Download
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 py-10 text-center">
                      <Paperclip className="h-6 w-6 text-zinc-200 mb-2" />
                      <p className="text-[11px] text-zinc-400">No CAD file attached</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT — internal notes */}
              <div className="w-[320px] shrink-0 flex flex-col overflow-hidden bg-zinc-50/30">
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Internal Notes</p>
                    <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[10.5px] font-bold text-zinc-500 shadow-sm">
                      {selectedRfq.notes?.length || 0}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {!selectedRfq.notes?.length ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Send className="h-6 w-6 text-zinc-200 mb-2" />
                        <p className="text-[11px] text-zinc-400 italic">No notes yet.</p>
                        <p className="text-[10px] text-zinc-300 mt-0.5">Add the first note below.</p>
                      </div>
                    ) : (
                      selectedRfq.notes?.map((n) => (
                        <div key={n._id} className="rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                          <p className="text-[12px] text-zinc-800 leading-relaxed">{n.note}</p>
                          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                            <span className="font-semibold text-zinc-500">{n.createdBy}</span>
                            <span>{new Date(n.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* note input pinned to bottom */}
                <div className="shrink-0 border-t border-zinc-200 bg-white px-5 py-4">
                  <form onSubmit={handleAddNote} className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add an engineering note…"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-[12px] placeholder:text-zinc-400 focus:border-[#2563eb] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15 transition"
                    />
                    <button type="submit" disabled={isAddingNote || !noteText.trim()}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50 transition cursor-pointer">
                      {isAddingNote ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                      Add Note
                    </button>
                  </form>
                  <div className="mt-3 text-[10px] font-mono text-zinc-400 space-y-0.5 border-t border-zinc-100 pt-3">
                    <p>Submitted: {new Date(selectedRfq.createdAt).toLocaleString()}</p>
                    {selectedRfq.ip && <p>IP: {selectedRfq.ip}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="shrink-0 border-t border-zinc-100 bg-white px-6 py-3.5 flex items-center justify-between">
              <button type="button" onClick={() => setDeleteConfirmId(selectedRfq._id)}
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50 transition border border-transparent hover:border-red-100">
                <Trash2 className="h-3.5 w-3.5" />
                Delete RFQ
              </button>
              <button type="button" onClick={handleCloseDetail}
                className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-50 transition shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ──────────────────────────────────────────────── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-[3px] p-4">
          <div className="w-full max-w-[360px] rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-red-100 bg-red-50">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <h4 className="text-[14px] font-bold text-zinc-900">Delete RFQ?</h4>
            <p className="mt-1.5 text-[12px] text-zinc-500 leading-relaxed">
              This action is permanent. The RFQ and any attached CAD file will be removed from storage.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button type="button" onClick={() => setDeleteConfirmId(null)}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-50 transition">
                Cancel
              </button>
              <button type="button" disabled={actionLoading} onClick={() => handleDelete(deleteConfirmId)}
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-red-700 disabled:opacity-50 transition">
                {actionLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                {actionLoading ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
