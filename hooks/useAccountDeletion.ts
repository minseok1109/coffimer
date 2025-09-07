import { useMutation } from '@tanstack/react-query';
import { accountDeletionApi } from '@/lib/api/account-deletion';
import type { EmailFormData, OtpFormData, ConfirmationFormData } from '@/lib/schemas/account-deletion';

export function useRequestDeletion() {
  return useMutation({
    mutationFn: (data: EmailFormData) => accountDeletionApi.requestDeletion(data),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: OtpFormData) => accountDeletionApi.verifyOtp(data),
  });
}

export function useConfirmDeletion() {
  return useMutation({
    mutationFn: (data: ConfirmationFormData) => accountDeletionApi.confirmDeletion(data),
  });
}

export function useCancelDeletion() {
  return useMutation({
    mutationFn: (data: { email?: string; userId?: string }) => accountDeletionApi.cancelDeletion(data),
  });
}