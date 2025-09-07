'use client';

import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailSchema, type EmailFormData } from '@/lib/schemas/account-deletion';

interface EmailStepProps {
  onSubmit: (data: EmailFormData) => void;
  isLoading: boolean;
  error?: string | null;
}

export function EmailStep({ onSubmit, isLoading, error }: EmailStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  return (
    <div>
      <div className="flex items-center mb-6">
        <Mail className="w-8 h-8 text-blue-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">이메일 확인</h1>
      </div>

      <p className="text-gray-600 mb-6">
        계정에 등록된 이메일 주소를 입력해주세요. 인증 코드를 발송해드립니다.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email')}
          type="email"
          placeholder="이메일 주소"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          disabled={isLoading}
        />

        {errors.email && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {errors.email.message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? '발송 중...' : '인증 코드 발송'}
        </button>
      </form>
    </div>
  );
}