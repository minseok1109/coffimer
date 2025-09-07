'use client';

import { AlertCircle } from 'lucide-react';

interface WarningStepProps {
    onContinue: () => void;
}

export function WarningStep({ onContinue }: WarningStepProps) {
    return (
        <div>
            <div className="flex items-center mb-6">
                <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">계정 삭제</h1>
            </div>

            <div className="space-y-4 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">주의사항</h3>
                    <ul className="text-sm text-red-700 space-y-1">
                        <li>• 모든 레시피와 저장된 데이터가 삭제됩니다</li>
                    </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2">삭제되는 데이터</h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• 생성한 모든 레시피</li>
                        <li>• 저장한 레시피 목록</li>
                        <li>• 좋아요 및 활동 기록</li>
                        <li>• 프로필 정보</li>
                    </ul>
                </div>
            </div>

            <button
                onClick={onContinue}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition"
            >
                계속 진행
            </button>
        </div>
    );
}
