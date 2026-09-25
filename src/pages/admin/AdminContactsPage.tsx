import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  adminService,
  type ContactItem,
} from '../../services/admin.service';
import {
  Search,
  Trash2,
  X,
  MessageSquare,
  Building2,
  Mail,
  Phone,
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  User,
  ArrowRight,
  Tag,
} from 'lucide-react';

/* ─── Status helpers ──────────────────────────────────────────────────────── */
type StatusKey = 'new' | 'in-progress' | 'resolved' | 'closed';

const STATUS_META: Record<StatusKey, { label: string; dot: string; pill: string }> = {
  new:          { label: 'New',         dot: 'bg-[#2563eb]', pill: 'bg-[#2563eb]/8 text-[#2563eb] border-[#2563eb]/20' },
  'in-progress':{ label: 'In Progress', dot: 'bg-zinc-900',  pill: 'bg-zinc-900/8  text-zinc-800  border-zinc-300'      },
  resolved:     { label: 'Resolved',    dot: 'bg-zinc-400',  pill: 'bg-zinc-100    text-zinc-500  border-zinc-200'      },
  closed:       { label: 'Closed',      dot: 'bg-zinc-300',  pill: 'bg-zinc-50     text-zinc-400  border-zinc-200'      },
};

function StatusPill({ status }: { status: string }) {
  const meta = STATUS_META[status as StatusKey] ?? { label: status, pill: 'bg-zinc-100 text-zinc-500 border-zinc-200', dot: 'bg-zinc-300' };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold tracking-wide ${meta.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function AdminContactsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminService.getContacts({ page, limit: 10, search, status: statusFilter });
      setContacts(data.docs);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      // Check URL query param ?id=...
      const queryId = searchParams.get('id');
      if (queryId) {
        const found = data.docs.find((c: ContactItem) => c._id === queryId);
        if (found) handleOpenDetail(found);
        else adminService.getContactById(queryId).then((c) => handleOpenDetail(c)).catch(() => {});
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [page, search, statusFilter, searchParams]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const handleOpenDetail = async (contact: ContactItem) => {
    setSelectedContact(contact);
    // Mark as read in local state
    if (!contact.isRead) {
      setContacts((prev) => prev.map((c) => (c._id === contact._id ? { ...c, isRead: true } : c)));
      try { await adminService.getContactById(contact._id); } catch (err) { console.error(err); }
    }
  };

  const handleCloseDetail = () => {
    setSelectedContact(null);
    if (searchParams.has('id')) { searchParams.delete('id'); setSearchParams(searchParams); }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedContact) return;
    try {
      setActionLoading(true);
      const updated = await adminService.updateContactStatus(selectedContact._id, newStatus);
      setSelectedContact(updated);
      setContacts((prev) => prev.map((c) => (c._id === updated._id ? { ...c, status: updated.status } : c)));
    } catch (err) { console.error(err); }
    finally { setActionLoading(false); }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !noteText.trim()) return;
    try {
      setIsAddingNote(true);
      const updated = await adminService.addContactNote(selectedContact._id, noteText.trim());
      setSelectedContact(updated);
      setNoteText('');
      setContacts((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
    } catch (err) { console.error(err); }
    finally { setIsAddingNote(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionLoading(true);
      await adminService.deleteContact(id);
      setDeleteConfirmId(null);
      if (selectedContact?._id === id) setSelectedContact(null);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) { console.error(err); }
    finally { setActionLoading(false); }
  };

  const TABS = [
    { id: 'all', label: 'All' },
    { id: 'new', label: 'New' },
    { id: 'in-progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
    { id: 'closed', label: 'Closed' },
  ];

  const STATUS_LABELS: Record<string, string> = {
    new: 'New', 'in-progress': 'In Progress', resolved: 'Resolved', closed: 'Closed',
  };

  /* ─── render ──────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-5">

      {/* ── Page title ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[15px] font-bold tracking-tight text-zinc-900">Contact Inquiries</h1>
          <p className="mt-0.5 text-[12px] text-zinc-400">Inbound customer queries &amp; project discussions</p>
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
              <button key={tab.id} type="button" onClick={() => { setStatusFilter(tab.id); setPage(1); }}
                className={`rounded-md px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  active ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'text-zinc-500 hover:text-zinc-800'
                }`}>
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search customer, company…"
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-8 text-[12px] text-zinc-900 placeholder:text-zinc-400 shadow-sm transition focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15"
          />
          {search && (
            <button type="button" onClick={() => { setSearch(''); setPage(1); }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 hover:text-zinc-700 transition">
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
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Project Type</th>
                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Message</th>
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
                    <td colSpan={5} className="py-3.5 px-3"><div className="h-2.5 w-full rounded bg-zinc-100" /></td>
                  </tr>
                ))
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-300">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <p className="text-[13px] font-semibold text-zinc-700">No inquiries found</p>
                    <p className="mt-1 text-[12px] text-zinc-400">Adjust filters or clear your search.</p>
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id} onClick={() => handleOpenDetail(contact)}
                    className={`group cursor-pointer transition-colors duration-100 hover:bg-[#2563eb]/[0.03] ${!contact.isRead ? 'bg-[#2563eb]/[0.025]' : ''}`}>
                    <td className="py-3.5 pl-4 pr-2">
                      {!contact.isRead ? <span className="block h-1.5 w-1.5 rounded-full bg-[#2563eb]" /> : <span className="block h-1.5 w-1.5" />}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-[10px]">
                          {contact.name ? contact.name.slice(0, 2).toUpperCase() : 'CO'}
                        </div>
                        <div>
                          <p className={`font-semibold text-zinc-900 group-hover:text-[#2563eb] transition-colors leading-tight ${!contact.isRead ? 'font-bold' : ''}`}>{contact.name}</p>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{contact.company || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="text-zinc-700 font-medium truncate max-w-[160px]">{contact.email}</p>
                      {contact.phone && <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">{contact.phone}</p>}
                    </td>
                    <td className="py-3.5 px-3">
                      {contact.projectType ? (
                        <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600">
                          <Tag className="h-2.5 w-2.5 text-zinc-400" />{contact.projectType}
                        </span>
                      ) : <span className="text-zinc-300">—</span>}
                    </td>
                    <td className="py-3.5 px-3 max-w-[200px]">
                      <p className="truncate text-[11px] text-zinc-400">{contact.message}</p>
                    </td>
                    <td className="py-3.5 px-3"><StatusPill status={contact.status} /></td>
                    <td className="py-3.5 px-3 text-[11px] text-zinc-400 whitespace-nowrap font-mono">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3.5 pl-2 pr-4 text-right">
                      <div className="inline-flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <button type="button" onClick={() => handleOpenDetail(contact)} className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-[#2563eb] transition" title="Open">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" onClick={() => setDeleteConfirmId(contact._id)} className="rounded-md p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 transition" title="Delete">
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
            {contacts.length} of <span className="font-semibold text-zinc-600">{total}</span> results
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
      {selectedContact && (
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
                  {selectedContact.name ? selectedContact.name.slice(0, 2).toUpperCase() : 'CO'}
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-zinc-900 leading-tight truncate">{selectedContact.name}</p>
                  <div className="mt-1 flex items-center gap-2.5 flex-wrap">
                    <StatusPill status={selectedContact.status} />
                    <span className="text-[10px] font-mono text-zinc-300">#{selectedContact._id.slice(-8).toUpperCase()}</span>
                    <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">{new Date(selectedContact.createdAt).toLocaleString()}</span>
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
                const isActive = selectedContact.status === s;
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

              {/* LEFT — contact details + message */}
              <div className="flex-1 overflow-y-auto border-r border-zinc-100 min-w-0">

                <div className="px-6 py-5 border-b border-zinc-100">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Contact Information</p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      { icon: User,      label: 'Name',    value: selectedContact.name },
                      { icon: Building2, label: 'Company', value: selectedContact.company || '—' },
                      { icon: Mail,      label: 'Email',   value: selectedContact.email, href: `mailto:${selectedContact.email}` },
                      { icon: Phone,     label: 'Phone',   value: selectedContact.phone || 'Not provided' },
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
                  {selectedContact.projectType && (
                    <div className="mt-5 flex items-center gap-2.5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
                      <Tag className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span className="text-[11px] text-zinc-500 font-medium">Project Type</span>
                      <span className="text-[11px] font-bold text-zinc-900 ml-auto">{selectedContact.projectType}</span>
                    </div>
                  )}
                </div>

                {/* Full message */}
                <div className="px-6 py-5">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Message</p>
                    <span className="text-[10px] font-mono text-zinc-400">{selectedContact.message?.length || 0} chars</span>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-[12px] text-zinc-800 whitespace-pre-wrap leading-relaxed">
                    {selectedContact.message}
                  </div>
                  <div className="mt-3">
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: Your Inquiry&body=Hi ${selectedContact.name},%0A%0A`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563eb] px-4 py-2 text-[11px] font-semibold text-white hover:bg-[#1d4ed8] transition"
                    >
                      <Mail className="h-3 w-3" />
                      Reply via Email
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT — internal notes */}
              <div className="w-[320px] shrink-0 flex flex-col overflow-hidden bg-zinc-50/30">
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Internal Notes</p>
                    <span className="rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-[10.5px] font-bold text-zinc-500 shadow-sm">
                      {selectedContact.notes?.length || 0}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {!selectedContact.notes?.length ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Send className="h-6 w-6 text-zinc-200 mb-2" />
                        <p className="text-[11px] text-zinc-400 italic">No notes yet.</p>
                        <p className="text-[10px] text-zinc-300 mt-0.5">Add the first note below.</p>
                      </div>
                    ) : (
                      selectedContact.notes?.map((n) => (
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
                      placeholder="Add an internal note…"
                      className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-[12px] placeholder:text-zinc-400 focus:border-[#2563eb] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]/15 transition"
                    />
                    <button type="submit" disabled={isAddingNote || !noteText.trim()}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50 transition cursor-pointer">
                      {isAddingNote ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                      Add Note
                    </button>
                  </form>
                  <div className="mt-3 text-[10px] font-mono text-zinc-400 space-y-0.5 border-t border-zinc-100 pt-3">
                    <p>Submitted: {new Date(selectedContact.createdAt).toLocaleString()}</p>
                    {selectedContact.ip && <p>IP: {selectedContact.ip}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="shrink-0 border-t border-zinc-100 bg-white px-6 py-3.5 flex items-center justify-between">
              <button type="button" onClick={() => setDeleteConfirmId(selectedContact._id)}
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50 transition border border-transparent hover:border-red-100">
                <Trash2 className="h-3.5 w-3.5" />
                Delete Query
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
            <h4 className="text-[14px] font-bold text-zinc-900">Delete this inquiry?</h4>
            <p className="mt-1.5 text-[12px] text-zinc-500 leading-relaxed">
              This action is permanent and cannot be undone.
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
