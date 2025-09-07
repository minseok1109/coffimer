import axios from 'axios';
import type { EmailFormData, OtpFormData, ConfirmationFormData, AccountDeletionResponse } from '@/lib/schemas/account-deletion';

const api = axios.create({
  baseURL: '/api/account/delete',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const accountDeletionApi = {
  async requestDeletion(data: EmailFormData): Promise<AccountDeletionResponse> {
    const response = await api.post<AccountDeletionResponse>('/request', data);
    return response.data;
  },

  async verifyOtp(data: OtpFormData): Promise<AccountDeletionResponse> {
    const response = await api.post<AccountDeletionResponse>('/verify', data);
    return response.data;
  },

  async confirmDeletion(data: ConfirmationFormData): Promise<AccountDeletionResponse> {
    const response = await api.post<AccountDeletionResponse>('/confirm', data);
    return response.data;
  },

  async cancelDeletion(data: { email?: string; userId?: string }): Promise<AccountDeletionResponse> {
    const response = await api.post<AccountDeletionResponse>('/cancel', data);
    return response.data;
  },
};