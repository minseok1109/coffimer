'use client';

import { useState, useEffect } from 'react';

export default function Page() {
    const [currentTime, setCurrentTime] = useState(240); // 4분 = 240초
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedRecipe, setSelectedRecipe] = useState(0);

    const recipes = [
        {
            name: '테츠 카츠야의 V60 클래식 레시피',
            totalTime: 240,
            difficulty: '초급',
            coffee: '20g',
            water: '320ml',
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
            name: '제임스 호프만의 케멕스 골드 레시피',
            totalTime: 360,
            difficulty: '중급',
            coffee: '30g',
            water: '500ml',
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
            name: '팀 웬델보의 에어로프레스 레시피',
            totalTime: 180,
            difficulty: '초급',
            coffee: '17g',
            water: '250ml',
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

    const currentRecipe = recipes[selectedRecipe];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && currentTime > 0) {
            interval = setInterval(() => {
                setCurrentTime((time) => {
                    const newTime = time - 1;

                    // 단계 업데이트
                    const elapsed = currentRecipe.totalTime - newTime;
                    const newStep = currentRecipe.steps.findIndex((step) => elapsed <= step.time);
                    if (newStep !== -1 && newStep !== currentStep) {
                        setCurrentStep(newStep);
                    }

                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, currentTime, currentRecipe, currentStep]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgress = () => {
        return ((currentRecipe.totalTime - currentTime) / currentRecipe.totalTime) * 100;
    };

    const resetTimer = () => {
        setCurrentTime(currentRecipe.totalTime);
        setIsRunning(false);
        setCurrentStep(0);
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
            data-oid="1mtft4f"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4"
                data-oid="23mp3t:"
            >
                <div
                    className="flex items-center justify-between max-w-4xl mx-auto"
                    data-oid="q9fib7f"
                >
                    <div className="flex items-center space-x-3" data-oid="b1yvse1">
                        <div
                            className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center"
                            data-oid="qja_u1_"
                        >
                            <span className="text-white text-lg" data-oid="0yp7kmm">
                                ☕
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-amber-900" data-oid="379qy.5">
                            드립마스터
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4" data-oid="lhh8ydj">
                        <button
                            className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            data-oid="hn006rp"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="8h_zrds"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    data-oid="kqnzuon"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    data-oid="en6tmuq"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            data-oid="l8.t2po"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="e2c:_gr"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    data-oid="640c5kt"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-8" data-oid="j3ebnw4">
                {/* Main Timer */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8" data-oid="2vskbpj">
                    <div className="text-center mb-8" data-oid="k9k_:ju">
                        <h2 className="text-3xl font-bold text-amber-900 mb-2" data-oid="g:lm5n_">
                            {currentRecipe.name}
                        </h2>
                        <div
                            className="flex justify-center items-center space-x-6 text-amber-600"
                            data-oid="qe2emk_"
                        >
                            <span data-oid="dif:epi">☕ {currentRecipe.coffee}</span>
                            <span data-oid="dth-jd-">💧 {currentRecipe.water}</span>
                            <span data-oid="7qwua8i">📊 {currentRecipe.difficulty}</span>
                        </div>
                    </div>

                    {/* Timer Display */}
                    <div
                        className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 mb-8"
                        data-oid="xagg.cr"
                    >
                        <div className="text-center" data-oid="o46k.q7">
                            <div
                                className="text-6xl font-mono font-bold text-amber-900 mb-4"
                                data-oid="z76jwnr"
                            >
                                {formatTime(currentTime)}
                            </div>
                            <div
                                className="w-full bg-amber-200 rounded-full h-3 mb-4"
                                data-oid="y6ioe-p"
                            >
                                <div
                                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                                    style={{ width: `${getProgress()}%` }}
                                    data-oid="a2j-w:c"
                                ></div>
                            </div>
                            <div className="text-amber-700" data-oid="uz43jy4">
                                {currentTime === 0 ? '완료!' : `${Math.floor(getProgress())}% 진행`}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center space-x-4 mb-8" data-oid="ebdl6d6">
                        <button
                            onClick={toggleTimer}
                            className={`px-8 py-4 rounded-full font-semibold text-white transition-all transform hover:scale-105 ${
                                isRunning
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700'
                            }`}
                            data-oid="y0mv__3"
                        >
                            {isRunning ? '일시정지' : '시작'}
                        </button>
                        <button
                            onClick={resetTimer}
                            className="px-8 py-4 border-2 border-amber-600 text-amber-700 rounded-full font-semibold hover:bg-amber-50 transition-colors"
                            data-oid="y372z0g"
                        >
                            리셋
                        </button>
                    </div>

                    {/* Current Step */}
                    <div
                        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6"
                        data-oid="7-7tcp1"
                    >
                        <div className="flex items-center justify-between mb-3" data-oid="f0u.fw1">
                            <h3 className="text-lg font-semibold text-amber-900" data-oid="614p1f4">
                                {currentRecipe.steps[currentStep]?.title || '준비'}
                            </h3>
                            <span className="text-sm text-amber-600" data-oid="uej2f3b">
                                {currentStep + 1} / {currentRecipe.steps.length}
                            </span>
                        </div>
                        <p className="text-amber-700 mb-2" data-oid="-vd1obf">
                            {currentRecipe.steps[currentStep]?.description ||
                                '레시피를 선택하고 시작 버튼을 눌러주세요'}
                        </p>
                        {currentRecipe.steps[currentStep]?.water !== '0ml' && (
                            <div className="text-sm text-amber-600" data-oid="x4wy5lo">
                                💧 {currentRecipe.steps[currentStep]?.water}
                            </div>
                        )}
                    </div>
                </div>

                {/* Steps Overview */}
                <div className="bg-white rounded-2xl shadow-lg p-6" data-oid="kjobjm2">
                    <h3 className="text-xl font-semibold text-amber-900 mb-4" data-oid="0i7_k:1">
                        단계별 가이드
                    </h3>
                    <div className="space-y-3" data-oid="-.4xnr8">
                        {currentRecipe.steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-3 rounded-lg transition-colors ${
                                    index === currentStep
                                        ? 'bg-amber-100 border-l-4 border-amber-500'
                                        : index < currentStep
                                          ? 'bg-green-50 border-l-4 border-green-500'
                                          : 'bg-gray-50 border-l-4 border-gray-300'
                                }`}
                                data-oid="8-lkwqw"
                            >
                                <div
                                    className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-semibold mr-4"
                                    data-oid="1l5.6:w"
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-grow" data-oid="maf-6d-">
                                    <div className="font-medium text-amber-900" data-oid="q8ri4p3">
                                        {step.title}
                                    </div>
                                    <div className="text-sm text-amber-600" data-oid="s0d2pqv">
                                        {step.description}
                                    </div>
                                </div>
                                <div className="text-sm text-amber-600" data-oid="015_x9y">
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
