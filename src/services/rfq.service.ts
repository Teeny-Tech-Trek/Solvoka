import { api } from './api';

export interface RfqPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  material?: string;
  quantity: string;
  ndaRequired?: boolean;
  _hp_website?: string;
}

export const rfqService = {
  async submitRfq(data: RfqPayload, file?: File | null) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('company', data.company);
    formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (data.material) formData.append('material', data.material);
    formData.append('quantity', data.quantity);
    formData.append('ndaRequired', String(data.ndaRequired ?? false));
    if (data._hp_website) formData.append('_hp_website', data._hp_website);

    if (file) {
      formData.append('cadFile', file);
    }

    const response = await api.post('/rfq', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
