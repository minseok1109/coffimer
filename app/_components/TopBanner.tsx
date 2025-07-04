'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import posthog from 'posthog-js';

const APP_STORE_URL = 'https://apps.apple.com/kr/app/coffimer/id6747644924';

export default function TopBanner() {
    const handleDownload = () => {
        posthog.capture('download_app_store');
        window.open(APP_STORE_URL, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 sm:py-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <AppIcon />
                        <div className="flex-1 min-w-0">
                            <h2 className="text-sm sm:text-lg font-bold truncate">
                                Coffimer 앱 스토어 출시!
                            </h2>
                            <p className="text-xs sm:text-sm opacity-90 truncate">
                                바로 다운로드하세요!
                            </p>
                        </div>
                    </div>

                    <DownloadButton onClick={handleDownload} />
                </div>
            </div>
        </div>
    );
}

function AppIcon() {
    return (
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg p-1.5 shadow-lg flex-shrink-0">
            <Image
                src="/images/logo.png"
                alt="Coffimer App Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
            />
        </div>
    );
}

function DownloadButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-105 border border-white/30 flex-shrink-0"
            aria-label="App Store에서 Coffimer 앱 다운로드"
        >
            <AppStoreBadge />
            <span className="hidden sm:inline">App Store</span>
            <span className="sm:hidden">다운로드</span>
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
    );
}

function AppStoreBadge() {
    return (
        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-md flex items-center justify-center">
            <span className="text-xs font-bold text-amber-600">A</span>
        </div>
    );
}
