'use client';

import { Recipe, RecipeStep } from "@/types/recipe.types";



interface CurrentStepProps {
    recipe: Recipe;
    currentStep: RecipeStep | undefined;
    currentStepIndex: number;
    totalSteps: number;
}

export default function CurrentStep({
    recipe,
    currentStep,
    currentStepIndex,
    totalSteps,
}: CurrentStepProps) {
    if (!currentStep) {
        return (
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200">
                <div className="text-center text-gray-500">
                    <h3 className="text-lg font-semibold mb-1">준비</h3>
                    <p className="text-sm">타이머를 시작하세요</p>
                </div>
            </div>
        );
    }

    const title = currentStep.title;
    const hasWater = currentStep.water && currentStep.water !== '0ml';

    // 전체 물의 양에서 숫자만 추출
    const totalWaterAmount = parseInt(recipe.water.replace(/[^\d]/g, '')) || 0;
    const currentStepWater = parseInt(currentStep.water?.replace(/[^\d]/g, '') || '0');
    const accumulatedWater = currentStep.totalWater || 0;
    const remainingWater = totalWaterAmount - accumulatedWater;
    const progressPercentage =
        totalWaterAmount > 0 ? Math.round((accumulatedWater / totalWaterAmount) * 100) : 0;

    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border-l-4 border-amber-500">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
                <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                    {currentStepIndex + 1} / {totalSteps}
                </span>
            </div>

            {/* 물의 양 정보 */}
            {hasWater && (
                <div className="space-y-3">
                    {/* 현재 단계 물의 양 */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-amber-700">이번 단계</span>
                        <span className="text-lg font-bold text-amber-900">
                            💧 {currentStep.water}
                        </span>
                    </div>

                    {/* 진행률 바 */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-amber-700">
                            <span>누적 {accumulatedWater}ml</span>
                            <span>{progressPercentage}%</span>
                            <span>총 {totalWaterAmount}ml</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="text-center text-xs text-amber-600">
                            남은 물: {remainingWater}ml
                        </div>
                    </div>
                </div>
            )}

            {/* 단계 설명 */}
            {/* <p className="text-amber-800 text-sm mt-3 break-keep">{currentStep.description}</p> */}
        </div>
    );
}
