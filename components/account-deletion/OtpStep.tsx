'use client';

import { Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, type OtpFormData } from '@/lib/schemas/account-deletion';
import { useEffect } from 'react';

interface OtpStepProps {
    email: string;
    onSubmit: (data: OtpFormData) => void;
    onResend: () => void;
    isLoading: boolean;
    error?: string | null;
}

export function OtpStep({ email, onSubmit, onResend, isLoading, error }: OtpStepProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            email,
        },
    });

    useEffect(() => {
        setValue('email', email);
    }, [email, setValue]);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
        e.target.value = value;
    };

    return (
        <div>
            <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-green-500 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">인증 코드 입력</h1>
            </div>

            <p className="text-gray-600 mb-6">{email}로 발송된 6자리 인증 코드를 입력해주세요.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('otp')}
                    type="text"
                    placeholder="6자리 숫자"
                    onChange={handleOtpChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4 text-center text-2xl tracking-widest"
                    maxLength={6}
                    disabled={isLoading}
                />

                {errors.otp && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {errors.otp.message}
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
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                    {isLoading ? '확인 중...' : '인증 확인'}
                </button>

                <button
                    type="button"
                    onClick={onResend}
                    disabled={isLoading}
                    className="w-full mt-3 text-gray-600 hover:text-gray-900"
                >
                    다시 발송
                </button>
            </form>
        </div>
    );
}
