const PLAY_STORE_LINK =
    'https://play.google.com/store/apps/details?id=com.bangbangminseok.coffimerapp&pcampaignid=web_share';
const APP_STORE_LINK = 'https://apps.apple.com/app/coffimer/id6747644924';

const FEATURES = [
    {
        icon: BookPlusIcon,
        title: '나만의 레시피',
        description: '나만의 추출 레시피를 만들고 관리',
    },
    {
        icon: CameraIcon,
        title: 'AI 원두 분석',
        description: '사진 한 장으로 원두 정보 자동 입력',
    },
    {
        icon: BeanIcon,
        title: '내 원두 관리',
        description: '원두 재고와 디개싱 상태 한눈에',
    },
    {
        icon: HeartIcon,
        title: '즐겨찾기',
        description: '좋아하는 레시피를 저장하고 빠르게 접근',
    },
    {
        icon: BellIcon,
        title: '스마트 알림',
        description: '무음 모드에서도 단계별 알림음',
    },
] as const;

export function AppBlockingOverlay() {
    return (
        <div
            className="fixed inset-0 z-[99999] overflow-y-auto bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blocking-overlay-title"
        >
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-orange-500 to-amber-600 p-5 sm:p-8">
                    {/* 배경 장식 블롭 */}
                    <div className="absolute inset-0 opacity-20" aria-hidden="true">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full blur-2xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-300 rounded-full blur-3xl" />
                    </div>

                    <div className="relative flex flex-col items-center text-center text-white">
                        {/* 앱 아이콘 */}
                        <div className="mb-5">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-xl p-3 sm:p-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/logo.png"
                                    alt="Coffimer App Logo"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* 제목 */}
                        <h1
                            id="blocking-overlay-title"
                            className="text-xl sm:text-2xl font-bold mb-1"
                        >
                            Coffimer 앱으로
                        </h1>
                        <p className="text-amber-100 text-sm sm:text-base mb-6">
                            더 많은 기능을 만나보세요
                        </p>

                        {/* 기능 리스트 */}
                        <div className="w-full bg-white/10 rounded-xl p-4 mb-6">
                            {FEATURES.map((feature, index) => (
                                <div key={feature.title}>
                                    <div className="flex items-start gap-3 py-2.5">
                                        <div className="mt-0.5 flex-shrink-0 w-5 h-5 text-amber-200">
                                            <feature.icon />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold text-sm">
                                                {feature.title}
                                            </p>
                                            <p className="text-amber-100 text-xs">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                    {index < FEATURES.length - 1 && (
                                        <div className="border-b border-white/10" />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* 다운로드 버튼 */}
                        <a
                            href={APP_STORE_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-amber-700 hover:bg-amber-50 rounded-full font-bold text-sm sm:text-base transition-colors shadow-lg mb-3"
                        >
                            <AppleIcon />
                            <span>App Store에서 다운로드</span>
                        </a>

                        <a
                            href={PLAY_STORE_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 text-white hover:bg-white/30 rounded-full font-bold text-sm sm:text-base transition-colors"
                        >
                            <GooglePlayIcon />
                            <span>Google Play에서 다운로드</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- 인라인 SVG 아이콘 (Server Component용) ---

function BookPlusIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
        >
            <path d="M12 7v6" />
            <path d="M9 10h6" />
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        </svg>
    );
}

function CameraIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
        >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
        </svg>
    );
}

function BeanIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
        >
            <path d="M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402z" />
            <path d="M22 2 11 13" />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    );
}

function AppleIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    );
}

function GooglePlayIcon() {
    return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
        </svg>
    );
}
