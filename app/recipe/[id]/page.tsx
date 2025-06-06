'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function RecipeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const recipeId = parseInt(params.id as string) || 0;

    const [currentTime, setCurrentTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const recipes = [
        {
            id: 0,
            name: '테츠 카츠야의 V60 클래식 레시피',
            totalTime: 240,
            difficulty: '초급',
            coffee: '20g',
            water: '320ml',
            description: '일본의 유명 바리스타 테츠 카츠야가 개발한 클래식한 V60 레시피입니다.',
            image: '/api/placeholder/300/200',
            steps: [
                {
                    time: 30,
                    title: '블루밍',
                    description: '커피 가루에 물을 적셔 30초간 기다리세요',
                    water: '40ml',
                },
                {
                    time: 60,
                    title: '1차 추출',
                    description: '천천히 원을 그리며 물을 부어주세요',
                    water: '100ml',
                },
                {
                    time: 120,
                    title: '2차 추출',
                    description: '중앙에서 바깥쪽으로 물을 부어주세요',
                    water: '100ml',
                },
                {
                    time: 180,
                    title: '3차 추출',
                    description: '마지막으로 남은 물을 부어주세요',
                    water: '80ml',
                },
                {
                    time: 240,
                    title: '완료',
                    description: '드리핑이 완료될 때까지 기다리세요',
                    water: '0ml',
                },
            ],
        },
        {
            id: 1,
            name: '제임스 호프만의 케멕스 골드 레시피',
            totalTime: 360,
            difficulty: '중급',
            coffee: '30g',
            water: '500ml',
            description: '세계적인 커피 전문가 제임스 호프만의 케멕스 레시피입니다.',
            image: '/api/placeholder/300/200',
            steps: [
                {
                    time: 45,
                    title: '블루밍',
                    description: '커피 가루를 충분히 적셔주세요',
                    water: '60ml',
                },
                {
                    time: 120,
                    title: '1차 추출',
                    description: '느린 속도로 물을 부어주세요',
                    water: '150ml',
                },
                {
                    time: 240,
                    title: '2차 추출',
                    description: '일정한 속도를 유지하며 부어주세요',
                    water: '150ml',
                },
                {
                    time: 300,
                    title: '3차 추출',
                    description: '마지막 물을 부어주세요',
                    water: '140ml',
                },
                {
                    time: 360,
                    title: '완료',
                    description: '모든 물이 떨어질 때까지 기다리세요',
                    water: '0ml',
                },
            ],
        },
        {
            id: 2,
            name: '팀 웬델보의 에어로프레스 레시피',
            totalTime: 180,
            difficulty: '초급',
            coffee: '17g',
            water: '250ml',
            description: '2005년 월드 바리스타 챔피언 팀 웬델보의 에어로프레스 레시피입니다.',
            image: '/api/placeholder/300/200',
            steps: [
                {
                    time: 30,
                    title: '물 붓기',
                    description: '모든 물을 한 번에 부어주세요',
                    water: '250ml',
                },
                {
                    time: 60,
                    title: '저어주기',
                    description: '10초간 부드럽게 저어주세요',
                    water: '0ml',
                },
                {
                    time: 120,
                    title: '대기',
                    description: '추출이 진행되도록 기다리세요',
                    water: '0ml',
                },
                {
                    time: 180,
                    title: '프레스',
                    description: '천천히 일정한 압력으로 눌러주세요',
                    water: '0ml',
                },
            ],
        },
    ];

    const currentRecipe = recipes[recipeId] || recipes[0];

    useEffect(() => {
        setCurrentTime(0);
        setCurrentStep(0);
        setIsRunning(false);
    }, [recipeId]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && currentTime < currentRecipe.totalTime) {
            interval = setInterval(() => {
                setCurrentTime((time) => {
                    const newTime = time + 1;

                    // 단계 완료 체크 및 알림
                    const completedStep = currentRecipe.steps.find((step) => step.time === newTime);
                    if (completedStep) {
                        // 브라우저 알림
                        if (Notification.permission === 'granted') {
                            new Notification(`${completedStep.title} 완료!`, {
                                body: completedStep.description,
                                icon: '/favicon.ico',
                            });
                        }

                        // 사운드 알림 (선택사항)
                        const audio = new Audio(
                            'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
                        );
                        audio.play().catch(() => {}); // 에러 무시
                    }

                    // 현재 단계 업데이트
                    const newStepIndex = currentRecipe.steps.findIndex(
                        (step) => newTime < step.time,
                    );
                    const newCurrentStep =
                        newStepIndex === -1
                            ? currentRecipe.steps.length - 1
                            : Math.max(0, newStepIndex - 1);

                    if (newCurrentStep !== currentStep) {
                        setCurrentStep(newCurrentStep);
                    }

                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentTime, currentRecipe, currentStep]);

    // 알림 권한 요청
    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgress = () => {
        return (currentTime / currentRecipe.totalTime) * 100;
    };

    const resetTimer = () => {
        setCurrentTime(0);
        setIsRunning(false);
        setCurrentStep(0);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
            data-oid="l2f1od3"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4"
                data-oid="a.69chk"
            >
                <div
                    className="flex items-center justify-between max-w-4xl mx-auto"
                    data-oid="ak_8yxd"
                >
                    <div className="flex items-center space-x-3" data-oid="6.0o_fc">
                        <button
                            onClick={() => router.push('/')}
                            className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            data-oid="eowh-mn"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="n3az3cu"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                    data-oid="ejkymq0"
                                />
                            </svg>
                        </button>
                        <div
                            className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center"
                            data-oid="wl4k03-"
                        >
                            <span className="text-white text-lg" data-oid="hzsvlrp">
                                ☕
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-amber-900" data-oid="048xmom">
                            Coffimer
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4" data-oid="rjk8vh0">
                        <button
                            className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            data-oid="llh1ljh"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="swmfv33"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    data-oid="uzashfi"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    data-oid="cmfp.iy"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            data-oid="0jyk-g2"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="u0n-z1i"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    data-oid="-5v4oig"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8" data-oid="0qny7.r">
                {/* Main Timer */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8" data-oid="oahpgq3">
                    <div className="text-center mb-8" data-oid="s.k965h">
                        <h2 className="text-3xl font-bold text-amber-900 mb-2" data-oid="jnrbk2v">
                            {currentRecipe.name}
                        </h2>
                        <div
                            className="flex justify-center items-center space-x-6 text-amber-600"
                            data-oid="m6et-38"
                        >
                            <span data-oid="epgij.h">☕ {currentRecipe.coffee}</span>
                            <span data-oid="ngqk0g-">💧 {currentRecipe.water}</span>
                            <span data-oid="0:k0be8">📊 {currentRecipe.difficulty}</span>
                        </div>
                    </div>

                    {/* Timer Display */}
                    <div
                        className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 mb-8"
                        data-oid="rkc4e-2"
                    >
                        <div className="text-center" data-oid="2pphicz">
                            <div
                                className="text-6xl font-mono font-bold text-amber-900 mb-4"
                                data-oid="b2q8wz-"
                            >
                                {formatTime(currentTime)}
                            </div>
                            <div
                                className="w-full bg-amber-200 rounded-full h-3 mb-4"
                                data-oid="aietby4"
                            >
                                <div
                                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${getProgress()}%` }}
                                    data-oid="04k.f6m"
                                ></div>
                            </div>
                            <div className="text-amber-700" data-oid="vtwddqo">
                                {currentTime >= currentRecipe.totalTime
                                    ? '완료!'
                                    : `${Math.floor(getProgress())}% 진행`}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center space-x-4 mb-8" data-oid="c00-u94">
                        <button
                            onClick={toggleTimer}
                            className={`px-8 py-4 rounded-full font-semibold text-white transition-all transform hover:scale-105 ${
                                isRunning
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                            }`}
                            data-oid="4b14t3k"
                        >
                            {isRunning ? '일시정지' : '시작'}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="px-8 py-4 border-2 border-amber-600 text-amber-700 rounded-full font-semibold hover:bg-amber-50 transition-colors"
                            data-oid="shmbbrf"
                        >
                            리셋
                        </button>
                    </div>

                    {/* Current Step */}
                    <div
                        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6"
                        data-oid="vicq_.o"
                    >
                        <div className="flex items-center justify-between mb-3" data-oid="-nczlnv">
                            <h3 className="text-lg font-semibold text-amber-900" data-oid="0ghhp52">
                                {currentRecipe.steps[currentStep]?.title || '준비'}
                            </h3>
                            <span className="text-sm text-amber-600" data-oid=".444s_k">
                                {currentStep + 1} / {currentRecipe.steps.length}
                            </span>
                        </div>
                        <p className="text-amber-700 mb-2" data-oid="vvavhun">
                            {currentRecipe.steps[currentStep]?.description ||
                                '시작 버튼을 눌러주세요'}
                        </p>
                        {currentRecipe.steps[currentStep]?.water !== '0ml' && (
                            <div className="text-sm text-amber-600" data-oid="1i6ohu5">
                                💧 {currentRecipe.steps[currentStep]?.water}
                            </div>
                        )}
                    </div>
                </div>

                {/* Steps Overview */}
                <div className="bg-white rounded-2xl shadow-lg p-6" data-oid="-j8aorw">
                    <h3 className="text-xl font-semibold text-amber-900 mb-4" data-oid="xsoj2mr">
                        단계별 가이드
                    </h3>
                    <div className="space-y-3" data-oid="imkt6ln">
                        {currentRecipe.steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-3 rounded-lg transition-colors ${
                                    currentTime >= step.time
                                        ? 'bg-green-50 border-l-4 border-green-500'
                                        : index === currentStep
                                          ? 'bg-amber-100 border-l-4 border-amber-500'
                                          : 'bg-gray-50 border-l-4 border-gray-300'
                                }`}
                                data-oid="era8k5_"
                            >
                                <div
                                    className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-semibold mr-4"
                                    data-oid="bt6ui27"
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-grow" data-oid="m8f_bs.">
                                    <div className="font-medium text-amber-900" data-oid="16tet50">
                                        {step.title}
                                    </div>
                                    <div className="text-sm text-amber-600" data-oid="8k_d43y">
                                        {step.description}
                                    </div>
                                </div>
                                <div className="text-sm text-amber-600" data-oid="lbouu_8">
                                    {formatTime(step.time)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
