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
} from 'lucide-react';

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
      const data = await adminService.getContacts({
        page,
        limit: 10,
        search,
        status: statusFilter,
      });
      setContacts(data.docs);
      setTotal(data.total);
      setTotalPages(data.totalPages);

      // Check URL query param ?id=...
      const queryId = searchParams.get('id');
      if (queryId) {
        const found = data.docs.find((c: ContactItem) => c._id === queryId);
        if (found) {
          handleOpenDetail(found);
        } else {
          // fetch single
          adminService.getContactById(queryId).then((c) => handleOpenDetail(c)).catch(() => {});
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, searchParams]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleOpenDetail = async (contact: ContactItem) => {
    setSelectedContact(contact);
    // Mark as read in local state
    if (!contact.isRead) {
      setContacts((prev) =>
        prev.map((c) => (c._id === contact._id ? { ...c, isRead: true } : c))
      );
      try {
        await adminService.getContactById(contact._id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCloseDetail = () => {
    setSelectedContact(null);
    if (searchParams.has('id')) {
      searchParams.delete('id');
      setSearchParams(searchParams);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedContact) return;
    try {
      setActionLoading(true);
      const updated = await adminService.updateContactStatus(selectedContact._id, newStatus);
      setSelectedContact(updated);
      setContacts((prev) =>
        prev.map((c) => (c._id === updated._id ? { ...c, status: updated.status } : c))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !noteText.trim()) return;

    try {
      setIsAddingNote(true);
      const updated = await adminService.addContactNote(selectedContact._id, noteText.trim());
      setSelectedContact(updated);
      setNoteText('');
      setContacts((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingNote(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setActionLoading(true);
      await adminService.deleteContact(id);
      setDeleteConfirmId(null);
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200/60">New</span>;
      case 'in-progress':
        return <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200/60">In Progress</span>;
      case 'resolved':
        return <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/60">Resolved</span>;
      case 'closed':
        return <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 border border-slate-200">Closed</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------- */}
      {/* Top Filter & Search Bar                                     */}
      {/* ----------------------------------------------------------- */}
      <div className="space-y-4">
        {/* Status Filter Tabs (Desktop & Tablet) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl bg-slate-200/60 p-1.5 border border-slate-200/80">
            {[
              { id: 'all', label: 'All Inquiries' },
              { id: 'new', label: 'New' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'resolved', label: 'Resolved' },
              { id: 'closed', label: 'Closed' },
            ].map((tab) => {
              const active = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setStatusFilter(tab.id);
                    setPage(1);
                  }}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono font-medium text-slate-500">
            Showing {contacts.length} of {total} queries
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-lg">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by customer name, company, or email..."
            className="w-full rounded-2xl border border-slate-200/90 bg-white py-2.5 pl-10 pr-9 text-xs text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setPage(1);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* Data Table                                                  */}
      {/* ----------------------------------------------------------- */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/80 bg-slate-50/70 font-mono text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-4 pl-5 pr-2 w-8"></th>
                <th className="py-4 px-4 font-bold">Customer</th>
                <th className="py-4 px-4 font-bold">Contact Info</th>
                <th className="py-4 px-4 font-bold">Project Type</th>
                <th className="py-4 px-4 font-bold">Message Preview</th>
                <th className="py-4 px-4 font-bold">Status</th>
                <th className="py-4 px-4 font-bold">Submitted</th>
                <th className="py-4 pr-5 pl-2 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={8} className="py-5 px-5">
                      <div className="h-5 bg-slate-100 rounded-lg w-full" />
                    </td>
                  </tr>
                ))
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <p className="font-bold text-sm text-slate-700">No contact inquiries found</p>
                    <p className="text-xs mt-1">Try clearing your search query or status filter.</p>
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact._id}
                    onClick={() => handleOpenDetail(contact)}
                    className="group hover:bg-blue-50/20 cursor-pointer transition-colors duration-150"
                  >
                    <td className="py-4 pl-5 pr-2">
                      {!contact.isRead ? (
                        <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" title="Unread" />
                      ) : (
                        <span className="flex h-2 w-2 rounded-full bg-transparent" />
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-[11px] shadow-2xs">
                          {contact.name ? contact.name.slice(0, 2).toUpperCase() : 'CO'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {contact.name}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {contact.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-slate-800">{contact.email}</p>
                      {contact.phone && (
                        <p className="text-[11px] text-slate-400 font-mono">{contact.phone}</p>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200/60">
                        {contact.projectType || 'Standard'}
                      </span>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p className="truncate text-slate-600 text-xs">{contact.message}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(contact.status)}
                    </td>
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 pr-5 pl-2 text-right">
                      <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(contact)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition"
                          title="View Details"
                        >
                          <User className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(contact._id)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                          title="Delete Query"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between border-t border-slate-200/80 bg-white px-5 py-3.5 text-xs">
          <span className="text-slate-500 font-medium">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition shadow-2xs"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous</span>
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition shadow-2xs"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* DETAIL DRAWER / MODAL                                       */}
      {/* ----------------------------------------------------------- */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="relative flex w-full max-w-xl flex-col bg-white shadow-2xl h-full overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Contact Query Details
                </h3>
                <span className="font-mono text-[10px] text-slate-400">
                  ID: {selectedContact._id}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseDetail}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 flex-1">
              {/* Status Selector */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider font-mono">
                  Query Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['new', 'in-progress', 'resolved', 'closed'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleStatusChange(s)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition capitalize ${
                        selectedContact.status === s
                          ? 'bg-[#2563eb] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {s.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info Card */}
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 p-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Customer Name</span>
                  <p className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    {selectedContact.name}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Company</span>
                  <p className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    {selectedContact.company}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Email Address</span>
                  <p className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <a href={`mailto:${selectedContact.email}`} className="text-[#2563eb] hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Phone</span>
                  <p className="font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {selectedContact.phone || 'Not provided'}
                  </p>
                </div>
                <div className="col-span-2 border-t border-slate-100 pt-2">
                  <span className="text-slate-400 font-medium">Project Type</span>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedContact.projectType}</p>
                </div>
              </div>

              {/* Full Message */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2">
                  Message Content
                </h4>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2">
                  Internal Notes ({selectedContact.notes?.length || 0})
                </h4>

                <div className="space-y-2.5 mb-3">
                  {selectedContact.notes?.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No notes added yet.</p>
                  ) : (
                    selectedContact.notes?.map((n) => (
                      <div key={n._id} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                        <p className="text-slate-800">{n.note}</p>
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>By: {n.createdBy}</span>
                          <span>{new Date(n.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add an internal note or update..."
                    className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-[#2563eb] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isAddingNote || !noteText.trim()}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1d4ed8] disabled:opacity-50 cursor-pointer"
                  >
                    {isAddingNote ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    <span>Add</span>
                  </button>
                </form>
              </div>

              {/* Metadata */}
              <div className="border-t border-slate-100 pt-4 text-[11px] font-mono text-slate-400 space-y-1">
                <p>Submitted: {new Date(selectedContact.createdAt).toLocaleString()}</p>
                {selectedContact.ip && <p>Client IP: {selectedContact.ip}</p>}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(selectedContact._id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Query</span>
              </button>
              <button
                type="button"
                onClick={handleCloseDetail}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h4 className="font-display text-base font-bold text-slate-900">Delete Contact Query?</h4>
            <p className="mt-2 text-xs text-slate-600">
              This action cannot be undone. Are you sure you want to permanently delete this query?
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleDelete(deleteConfirmId)}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
