import { upload } from '@vercel/blob/client';
import { api } from './api';

export interface RfqCadFile {
  originalName: string;
  blobUrl: string;
  downloadUrl?: string;
  pathname?: string;
  mimeType?: string;
  size: number;
}

export interface RfqPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  material?: string;
  quantity: string;
  ndaRequired?: boolean;
  _hp_website?: string;
  cadFile?: RfqCadFile;
}

export const rfqService = {
  async submitRfq(
    data: RfqPayload,
    file?: File | null,
    onProgress?: (percent: number) => void
  ) {
    let cadFileMetadata: RfqCadFile | undefined = undefined;

    if (file) {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const blobPath = `rfqs/${Date.now()}-${cleanFileName}`;

      const apiBase = api.defaults.baseURL || '/api';
      const handleUploadUrl = apiBase.endsWith('/')
        ? `${apiBase}rfq/blob-upload`
        : `${apiBase}/rfq/blob-upload`;

      const blob = await upload(blobPath, file, {
        access: 'public',
        handleUploadUrl,
        onUploadProgress: (progress) => {
          if (onProgress) {
            onProgress(progress.percentage);
          }
        },
      });

      cadFileMetadata = {
        originalName: file.name,
        blobUrl: blob.url,
        downloadUrl: blob.downloadUrl || blob.url,
        pathname: blob.pathname,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
      };
    }

    const payload: RfqPayload = {
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      material: data.material,
      quantity: data.quantity,
      ndaRequired: data.ndaRequired,
      _hp_website: data._hp_website,
      ...(cadFileMetadata && { cadFile: cadFileMetadata }),
    };

    const response = await api.post('/rfq', payload);
    return response.data;
  },
};
