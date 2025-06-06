'use client';

import { formatTime, calculateProgress } from '../utils/time';
import { PROGRESS_DECIMALS } from '../constants';

interface TimerDisplayProps {
    currentTime: number;
    totalTime: number;
}

export default function TimerDisplay({ currentTime, totalTime }: TimerDisplayProps) {
    const progress = calculateProgress(currentTime, totalTime);
    const isCompleted = currentTime >= totalTime;
    const progressText = isCompleted 
        ? '완료!' 
        : `${Math.floor(progress)}% 진행`;

    return (
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 mb-8">
            <div className="text-center">
                <div className="text-6xl font-mono font-bold text-amber-900 mb-4">
                    {formatTime(currentTime)}
                </div>
                <ProgressBar progress={progress} />
                <div className="text-amber-700">{progressText}</div>
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