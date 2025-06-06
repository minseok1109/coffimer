'use client';

import { RecipeStep } from '@/lib/recipes';

interface CurrentStepProps {
    currentStep: RecipeStep | undefined;
    currentStepIndex: number;
    totalSteps: number;
}

export default function CurrentStep({ currentStep, currentStepIndex, totalSteps }: CurrentStepProps) {
    const title = currentStep?.title || '준비';
    const description = currentStep?.description || '시작 버튼을 눌러주세요';
    const hasWater = currentStep?.water && currentStep.water !== '0ml';

    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
            <StepHeader 
                title={title} 
                currentStepNumber={currentStepIndex + 1} 
                totalSteps={totalSteps} 
            />
            <StepContent description={description} water={hasWater ? currentStep.water : undefined} />
        </div>
    );
}

// 단계 헤더 컴포넌트
function StepHeader({ 
    title, 
    currentStepNumber, 
    totalSteps 
}: { 
    title: string; 
    currentStepNumber: number; 
    totalSteps: number;
}) {
    return (
        <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
            <span className="text-sm text-amber-600">
                {currentStepNumber} / {totalSteps}
            </span>
        </div>
    );
}

// 단계 내용 컴포넌트
function StepContent({ description, water }: { description: string; water?: string }) {
    return (
        <>
            <p className="text-amber-700 mb-2">{description}</p>
            {water && (
                <div className="text-sm text-amber-600">💧 {water}</div>
            )}
        </>
    );
}