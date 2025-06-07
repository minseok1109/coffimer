'use client';

import { RecipeStep } from '@/lib/recipes';

interface NextStepProps {
    nextStep: RecipeStep | undefined;
    nextStepIndex: number;
    totalSteps: number;
}

export default function NextStep({ nextStep, nextStepIndex, totalSteps }: NextStepProps) {
    if (!nextStep) {
        return (
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-400">
                    <h3 className="text-lg font-semibold mb-2">모든 단계 완료</h3>
                    <p className="text-sm">추출이 완료되었습니다</p>
                </div>
            </div>
        );
    }

    const hasWater = nextStep.water && nextStep.water !== '0ml';

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <NextStepHeader
                title={nextStep.title}
                nextStepNumber={nextStepIndex + 1}
                totalSteps={totalSteps}
            />
            <NextStepContent
                description={nextStep.description}
                water={hasWater ? nextStep.water : undefined}
            />
        </div>
    );
}

function NextStepHeader({
    title,
    nextStepNumber,
    totalSteps,
}: {
    title: string;
    nextStepNumber: number;
    totalSteps: number;
}) {
    return (
        <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-blue-900">다음: {title}</h3>
            <span className="text-sm text-blue-600">
                {nextStepNumber} / {totalSteps}
            </span>
        </div>
    );
}

function NextStepContent({ description, water }: { description: string; water?: string }) {
    return (
        <div className="flex flex-col gap-2">
            {water && <div className="text-lg text-blue-600">💧 {water}</div>}
            <p className="text-blue-700 mb-2">{description}</p>
        </div>
    );
}
