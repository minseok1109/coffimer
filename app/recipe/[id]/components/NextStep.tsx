'use client';

import { Recipe, RecipeStep } from '@/lib/recipes';

interface NextStepProps {
    recipe: Recipe;
    nextStep: RecipeStep | undefined;
    nextStepIndex: number;
    totalSteps: number;
}

export default function NextStep({ recipe, nextStep, nextStepIndex, totalSteps }: NextStepProps) {
    if (!nextStep) {
        return (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <div className="text-center text-green-600">
                    <h3 className="text-lg font-semibold mb-1">🎉 모든 단계 완료</h3>
                    <p className="text-sm">추출이 완료되었습니다</p>
                </div>
            </div>
        );
    }

    const hasWater = nextStep.water && nextStep.water !== '0ml';
    const totalWaterAmount = parseInt(recipe.water.replace(/[^\d]/g, '')) || 0;
    const nextStepWater = parseInt(nextStep.water?.replace(/[^\d]/g, '') || '0');
    const nextAccumulatedWater = nextStep.totalWater || 0;
    const nextProgressPercentage =
        totalWaterAmount > 0 ? Math.round((nextAccumulatedWater / totalWaterAmount) * 100) : 0;

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-l-4 border-blue-400">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-blue-900">다음: {nextStep.title}</h3>
                <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {nextStepIndex + 1} / {totalSteps}
                </span>
            </div>

            {/* 물의 양 정보 */}
            {hasWater && (
                <div className="space-y-2">
                    {/* 다음 단계 물의 양 */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700">다음 단계</span>
                        <span className="text-base font-semibold text-blue-900">
                            💧 {nextStep.water}
                        </span>
                    </div>

                    {/* 완료 후 예상 진행률 */}
                    <div className="flex justify-between text-xs text-blue-600">
                        <span>완료 후 누적: {nextAccumulatedWater}ml</span>
                        <span>진행률: {nextProgressPercentage}%</span>
                    </div>
                </div>
            )}

            {/* 단계 설명 - 더 간결하게 */}
            {/* <p className="text-blue-700 text-sm mt-2 break-keep line-clamp-2">{nextStep.description}</p> */}
        </div>
    );
}
