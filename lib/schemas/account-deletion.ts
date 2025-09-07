import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요'),
});

export const otpSchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .length(6, '6자리 숫자를 입력해주세요')
    .regex(/^\d+$/, '숫자만 입력 가능합니다'),
});

export const confirmationSchema = z.object({
  email: z.string().email(),
  confirmText: z.literal('계정을 삭제합니다', {
    errorMap: () => ({ message: '확인 문구가 일치하지 않습니다' }),
  }),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type ConfirmationFormData = z.infer<typeof confirmationSchema>;

export type DeletionStep = 'warning' | 'email' | 'otp' | 'confirm' | 'complete';

export interface AccountDeletionResponse {
  success: boolean;
  message?: string;
  error?: string;
  scheduledDeletionDate?: string;
}