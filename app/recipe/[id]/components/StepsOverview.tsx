'use client';

import { RecipeStep } from '@/lib/recipes';

interface StepsOverviewProps {
    steps: RecipeStep[];
    currentTime: number;
    currentStepIndex: number;
}

export default function StepsOverview({
    steps,
    currentTime,
    currentStepIndex,
}: StepsOverviewProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">단계별 가이드</h3>
            <div className="space-y-3">
                {steps.map((step, index) => (
                    <StepItem
                        key={index}
                        step={step}
                        stepNumber={index + 1}
                        isCompleted={currentTime >= step.time}
                        isCurrent={index === currentStepIndex}
                    />
                ))}
            </div>
        </div>
    );
}

// 개별 단계 아이템 컴포넌트
function StepItem({
    step,
    stepNumber,
    isCompleted,
    isCurrent,
}: {
    step: RecipeStep;
    stepNumber: number;
    isCompleted: boolean;
    isCurrent: boolean;
}) {
    // 단계별 스타일 결정
    const stepStyle = getStepStyle(isCompleted, isCurrent);

    return (
        <div className={`flex items-center w-full p-3 rounded-lg transition-colors ${stepStyle}`}>
            <StepNumber number={stepNumber} />
            <StepDetails step={step} />
            <div className="text-sm text-amber-600">{step.water}</div>
        </div>
    );
}

// 단계 스타일 결정 함수
function getStepStyle(isCompleted: boolean, isCurrent: boolean): string {
    if (isCompleted) {
        return 'bg-green-50 border-l-4 border-green-500';
    }
    if (isCurrent) {
        return 'bg-amber-100 border-l-4 border-amber-500';
    }
    return 'bg-gray-50 border-l-4 border-gray-300';
}

// 단계 번호 컴포넌트
function StepNumber({ number }: { number: number }) {
    return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm font-semibold mr-4">
            {number}
        </div>
    );
} // 단계 세부 정보 컴포넌트
function StepDetails({ step }: { step: RecipeStep }) {
    return (
        <div className="flex-1">
            <div className="font-medium text-amber-900">{step.title}</div>
            <div className="text-sm text-amber-600">{step.description}</div>
        </div>
    );
}
