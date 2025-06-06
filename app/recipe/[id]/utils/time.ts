import { TIME_PAD_LENGTH, TIME_PAD_CHARACTER } from '../constants';
import { RecipeStep } from '@/lib/recipes';

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER)}:${secs
        .toString()
        .padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER)}`;
};

export const calculateProgress = (currentTime: number, totalTime: number): number => {
    if (totalTime === 0) return 0;
    return (currentTime / totalTime) * 100;
};

// 현재 스텝 기준으로 진행률 계산
export const calculateStepProgress = (
    currentTime: number,
    steps: RecipeStep[] | undefined,
    currentStepIndex: number,
): number => {
    if (!steps || steps.length === 0) return 0;

    // 현재 스텝의 시작 시간과 끝 시간 계산
    const currentStepEndTime = steps[currentStepIndex]?.time || 0;
    const currentStepStartTime = currentStepIndex > 0 ? steps[currentStepIndex - 1].time : 0;

    // 현재 스텝의 지속 시간
    const stepDuration = currentStepEndTime - currentStepStartTime;

    if (stepDuration === 0) return 100; // 지속 시간이 0인 스텝은 완료된 것으로 간주

    // 현재 스텝 내에서의 경과 시간
    const timeInCurrentStep = Math.max(0, currentTime - currentStepStartTime);

    // 진행률 계산 (0-100%)
    const progress = Math.min(100, (timeInCurrentStep / stepDuration) * 100);

    return progress;
};
