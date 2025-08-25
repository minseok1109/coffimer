'use client';

import { formatTime, calculateStepProgress } from '../utils/time';
import { PROGRESS_DECIMALS } from '../constants';
import { RecipeStep } from '@/types/recipe.types';

interface TimerDisplayProps {
    currentTime: number;
    totalTime: number;
    steps?: RecipeStep[];
    currentStepIndex: number;
}

export default function TimerDisplay({
    currentTime,
    totalTime,
    steps,
    currentStepIndex,
}: TimerDisplayProps) {
    // 스텝 기준으로 진행률 계산
    const progress = calculateStepProgress(currentTime, steps, currentStepIndex);

    return (
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8">
            <div className="text-center">
                <div className="text-6xl font-mono font-bold text-amber-900 mb-4">
                    {formatTime(currentTime)}
                </div>
                <ProgressBar progress={progress} />
                <StepProgressInfo
                    currentTime={currentTime}
                    steps={steps}
                    currentStepIndex={currentStepIndex}
                    totalTime={totalTime}
                />
            </div>
        </div>
    );
}

// 프로그레스 바 컴포넌트 분리
function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="w-full bg-amber-200 rounded-full h-3 mb-4">
            <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

// 스텝 진행 정보 표시 컴포넌트
function StepProgressInfo({
    currentTime,
    steps,
    currentStepIndex,
    totalTime,
}: {
    currentTime: number;
    steps?: RecipeStep[];
    currentStepIndex: number;
    totalTime: number;
}) {
    if (!steps || steps.length === 0) return null;

    const currentStepEndTime = steps[currentStepIndex]?.time || 0;

    return (
        <div className="text-sm text-amber-700 mt-2">
            <span className="font-medium">{formatTime(currentTime)}</span>
            <span className="mx-1">/</span>
            <span className="font-medium">{formatTime(currentStepEndTime)}</span>
            <span className="text-amber-600 ml-2">(전체: {formatTime(totalTime)})</span>
        </div>
    );
}
