'use client';

import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmationSchema, type ConfirmationFormData } from '@/lib/schemas/account-deletion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ConfirmStepProps {
  email: string;
  onSubmit: (data: ConfirmationFormData) => void;
  isLoading: boolean;
  error?: string | null;
}

export function ConfirmStep({ email, onSubmit, isLoading, error }: ConfirmStepProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ConfirmationFormData>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      email,
    },
  });

  useEffect(() => {
    setValue('email', email);
  }, [email, setValue]);

  return (
    <div>
      <div className="flex items-center mb-6">
        <Trash2 className="w-8 h-8 text-red-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">최종 확인</h1>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-900 font-semibold mb-2">정말로 계정을 삭제하시겠습니까?</p>
        <p className="text-red-700 text-sm">
          이 작업은 즉시 실행되며, 30일 후에는 복구할 수 없습니다.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          아래 문구를 정확히 입력해주세요:
        </label>
        <p className="font-bold text-lg mb-2">계정을 삭제합니다</p>
        <input
          {...register('confirmText')}
          type="text"
          placeholder="위 문구를 입력하세요"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
          disabled={isLoading}
        />

        {errors.confirmText && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {errors.confirmText.message}
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
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
        >
          {isLoading ? '삭제 중...' : '계정 영구 삭제'}
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full mt-3 text-gray-600 hover:text-gray-900"
        >
          취소
        </button>
      </form>
    </div>
  );
}