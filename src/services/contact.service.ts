import { api } from './api';

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  projectType?: string;
  message: string;
  _hp_website?: string;
}

export const contactService = {
  async submitContact(data: ContactPayload) {
    const response = await api.post('/contact', data);
    return response.data;
  },
};
