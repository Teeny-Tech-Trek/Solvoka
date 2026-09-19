import { api } from './api';

export interface Note {
  _id: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

export interface ContactItem {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  isRead: boolean;
  notes: Note[];
  ip?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RfqItem {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  material: string;
  quantity: string;
  ndaRequired: boolean;
  cadFile?: {
    originalName: string;
    filename: string;
    size: number;
    mimeType: string;
  };
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  isRead: boolean;
  notes: Note[];
  ip?: string;
  userAgent?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  contacts: {
    total: number;
    unread: number;
    new: number;
    inProgress: number;
    resolved: number;
  };
  rfqs: {
    total: number;
    unread: number;
    new: number;
    inProgress: number;
    resolved: number;
  };
  trend: Array<{
    date: string;
    contacts: number;
    rfqs: number;
  }>;
  recentActivity: {
    contacts: ContactItem[];
    rfqs: RfqItem[];
  };
}

export const adminService = {
  // Stats
  async getStats(): Promise<DashboardStats> {
    const res = await api.get('/admin/dashboard/stats');
    return res.data.data;
  },

  // Contacts
  async getContacts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const res = await api.get('/admin/contacts', { params });
    return res.data.data;
  },

  async getContactById(id: string): Promise<ContactItem> {
    const res = await api.get(`/admin/contacts/${id}`);
    return res.data.data;
  },

  async updateContactStatus(id: string, status: string): Promise<ContactItem> {
    const res = await api.patch(`/admin/contacts/${id}/status`, { status });
    return res.data.data;
  },

  async addContactNote(id: string, note: string): Promise<ContactItem> {
    const res = await api.patch(`/admin/contacts/${id}/notes`, { note });
    return res.data.data;
  },

  async deleteContact(id: string): Promise<{ id: string }> {
    const res = await api.delete(`/admin/contacts/${id}`);
    return res.data.data;
  },

  // RFQs
  async getRfqs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const res = await api.get('/admin/rfqs', { params });
    return res.data.data;
  },

  async getRfqById(id: string): Promise<RfqItem> {
    const res = await api.get(`/admin/rfqs/${id}`);
    return res.data.data;
  },

  async updateRfqStatus(id: string, status: string): Promise<RfqItem> {
    const res = await api.patch(`/admin/rfqs/${id}/status`, { status });
    return res.data.data;
  },

  async addRfqNote(id: string, note: string): Promise<RfqItem> {
    const res = await api.patch(`/admin/rfqs/${id}/notes`, { note });
    return res.data.data;
  },

  async deleteRfq(id: string): Promise<{ id: string }> {
    const res = await api.delete(`/admin/rfqs/${id}`);
    return res.data.data;
  },

  async downloadCadFile(id: string, fileName = 'attachment') {
    const res = await api.get(`/admin/rfqs/${id}/file`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
