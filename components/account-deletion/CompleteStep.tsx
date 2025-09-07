'use client';

import { useRouter } from 'next/navigation';

export function CompleteStep() {
  const router = useRouter();

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">계정 삭제 완료</h1>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
        <p className="text-gray-700 mb-2">
          계정이 성공적으로 삭제되었습니다.
        </p>
        <p className="text-sm text-gray-600">
          • 30일 이내에 동일한 이메일로 로그인하면 계정을 복구할 수 있습니다.<br />
          • 30일이 지나면 모든 데이터가 영구적으로 삭제됩니다.
        </p>
      </div>

      <button
        onClick={() => router.push('/')}
        className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}