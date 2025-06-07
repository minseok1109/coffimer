'use client';

import AppLogo from '@/app/_components/AppLogo';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <AppLogo />
                    <h1 className="text-2xl font-bold text-amber-900">Coffimer</h1>
                </div>
            </div>
        </header>
    );
}
