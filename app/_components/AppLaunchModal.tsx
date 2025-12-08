'use client';

import Image from 'next/image';
import { Download, Sparkles, X } from 'lucide-react';
import posthog from 'posthog-js';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const PLAY_STORE_LINK =
    'https://play.google.com/store/apps/details?id=com.bangbangminseok.coffimerapp&pcampaignid=web_share';

interface AppLaunchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onHideForToday: () => void;
}

export default function AppLaunchModal({ isOpen, onClose, onHideForToday }: AppLaunchModalProps) {
    const handleDownload = () => {
        posthog.capture('android_app_download_click');
        window.open(PLAY_STORE_LINK, '_blank', 'noopener,noreferrer');
    };

    const handleHideForToday = () => {
        posthog.capture('android_app_modal_hide_for_today');
        onHideForToday();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-transparent shadow-none [&>button:last-child]:hidden">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 p-6 sm:p-8">
                    {/* 배경 장식 */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full blur-2xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-300 rounded-full blur-3xl" />
                    </div>

                    {/* 닫기 버튼 */}
                    <button
                        onClick={onClose}
                        className="absolute right-3 top-3 z-10 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        aria-label="닫기"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>

                    {/* 콘텐츠 */}
                    <div className="relative flex flex-col items-center text-center text-white">
                        {/* 앱 아이콘 */}
                        <div className="relative mb-5">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-xl p-3 sm:p-4">
                                <Image
                                    src="/images/logo.png"
                                    alt="Coffimer App Logo"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            {/* 뱃지 */}
                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                                NEW
                            </div>
                        </div>

                        {/* 헤더 - 스크린 리더 접근성을 위해 DialogHeader 사용 */}
                        <DialogHeader className="space-y-2 mb-4 items-center sm:text-center">
                            <DialogTitle className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold text-white">
                                <span>🎉</span>
                                <span>안드로이드 앱 출시</span>
                                <span>🎉</span>
                            </DialogTitle>
                            <DialogDescription className="text-amber-100 text-sm sm:text-base text-center keep-all">
                                이제 안드로이드에서도 Coffimer를 더 편하게 사용할 수 있습니다!
                            </DialogDescription>
                        </DialogHeader>

                        {/* 다운로드 버튼 */}
                        <button
                            onClick={handleDownload}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-700 hover:bg-amber-50 rounded-full font-bold text-sm sm:text-base transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                            aria-label="Google Play에서 Coffimer 앱 다운로드"
                        >
                            <GooglePlayIcon />
                            <span>Google Play에서 다운로드</span>
                            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {/* 오늘 하루 안보기 버튼 - 모달 외부에 배치 */}
                <button
                    onClick={handleHideForToday}
                    className="mt-3 mx-auto text-white/80 hover:text-white text-xs sm:text-sm underline underline-offset-2 transition-colors"
                >
                    오늘 하루 안보기
                </button>
            </DialogContent>
        </Dialog>
    );
}

function GooglePlayIcon() {
    return (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
        </svg>
    );
}
