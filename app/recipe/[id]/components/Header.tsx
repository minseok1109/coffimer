'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    const router = useRouter();

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
            <div className="flex items-center justify-center max-w-4xl mx-auto relative">
                <button
                    onClick={() => router.push('/')}
                    className="absolute left-0 p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
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
                <h1 className="text-xl font-bold text-amber-900 break-keep">{title}</h1>
            </div>
        </header>
    );
}
