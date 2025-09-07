'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { WarningStep } from '@/components/account-deletion/WarningStep';
import { EmailStep } from '@/components/account-deletion/EmailStep';
import { OtpStep } from '@/components/account-deletion/OtpStep';
import { ConfirmStep } from '@/components/account-deletion/ConfirmStep';
import { CompleteStep } from '@/components/account-deletion/CompleteStep';
import { useRequestDeletion, useVerifyOtp, useConfirmDeletion } from '@/hooks/useAccountDeletion';
import type {
    DeletionStep,
    EmailFormData,
    OtpFormData,
    ConfirmationFormData,
} from '@/lib/schemas/account-deletion';

export default function AccountDeletePage() {
    const router = useRouter();
    const [step, setStep] = useState<DeletionStep>('warning');
    const [email, setEmail] = useState('');

    const requestDeletionMutation = useRequestDeletion();
    const verifyOtpMutation = useVerifyOtp();
    const confirmDeletionMutation = useConfirmDeletion();

    const handleEmailSubmit = async (data: EmailFormData) => {
        try {
            await requestDeletionMutation.mutateAsync(data);
            setEmail(data.email);
            setStep('otp');
        } catch (error) {
            // Error is handled by the mutation
        }
    };

    const handleOtpSubmit = async (data: OtpFormData) => {
        try {
            await verifyOtpMutation.mutateAsync(data);
            setStep('confirm');
        } catch (error) {
            // Error is handled by the mutation
        }
    };

    const handleFinalConfirm = async (data: ConfirmationFormData) => {
        try {
            await confirmDeletionMutation.mutateAsync(data);
            setStep('complete');
        } catch (error) {
            // Error is handled by the mutation
        }
    };

    const handleResendOtp = () => {
        setStep('email');
    };

    const getErrorMessage = (error: unknown): string | undefined => {
        // 에러가 없으면 아무 메시지도 표시하지 않음
        if (!error) return undefined;

        // 안전한 런타임 내로잉으로 메시지 추출 시도
        const maybeError = error as {
            response?: { data?: { error?: unknown } };
            message?: unknown;
        };

        const responseError = maybeError?.response?.data?.error;
        if (typeof responseError === 'string' && responseError.trim() !== '') {
            return responseError;
        }

        const message = maybeError?.message;
        if (typeof message === 'string' && message.trim() !== '') {
            return message;
        }

        // 에러 객체는 있으나 파싱 가능한 메시지가 없을 때만 기본 문구 노출
        return '오류가 발생했습니다.';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    돌아가기
                </button>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    {step === 'warning' && <WarningStep onContinue={() => setStep('email')} />}

                    {step === 'email' && (
                        <EmailStep
                            onSubmit={handleEmailSubmit}
                            isLoading={requestDeletionMutation.isPending}
                            error={getErrorMessage(requestDeletionMutation.error)}
                        />
                    )}

                    {step === 'otp' && (
                        <OtpStep
                            email={email}
                            onSubmit={handleOtpSubmit}
                            onResend={handleResendOtp}
                            isLoading={verifyOtpMutation.isPending}
                            error={getErrorMessage(verifyOtpMutation.error)}
                        />
                    )}

                    {step === 'confirm' && (
                        <ConfirmStep
                            email={email}
                            onSubmit={handleFinalConfirm}
                            isLoading={confirmDeletionMutation.isPending}
                            error={getErrorMessage(confirmDeletionMutation.error)}
                        />
                    )}

                    {step === 'complete' && <CompleteStep />}
                </div>
            </div>
        </div>
    );
}
