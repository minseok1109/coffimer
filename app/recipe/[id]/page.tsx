'use client';

import { useParams } from 'next/navigation';
import { getRecipeById, getAllRecipes } from '@/lib/recipes';
import { DEFAULT_RECIPE_INDEX } from './constants';
import { useRecipeTimer } from './hooks/useRecipeTimer';
import Header from './components/Header';
import RecipeInfo from './components/RecipeInfo';
import TimerDisplay from './components/TimerDisplay';
import TimerControls from './components/TimerControls';
import CurrentStep from './components/CurrentStep';
import StepsOverview from './components/StepsOverview';
import NextStep from './components/NextStep';

export default function RecipeDetailPage() {
    const params = useParams();
    const recipeId = parseInt(params.id as string) || DEFAULT_RECIPE_INDEX;

    // 레시피 데이터 가져오기
    const currentRecipe = getRecipeById(recipeId) || getAllRecipes()[DEFAULT_RECIPE_INDEX];

    // 타이머 훅 사용
    const { currentTime, isRunning, currentStep, toggleTimer, resetTimer } =
        useRecipeTimer(currentRecipe);

    // 현재 단계 정보
    const currentStepData = currentRecipe.steps?.[currentStep];
    const totalSteps = currentRecipe.steps?.length || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* 메인 타이머 섹션 */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <h2 className="text-3xl font-bold text-center text-amber-900 mb-2">
                        {currentRecipe.name}
                    </h2>
                    <TimerDisplay
                        currentTime={currentTime}
                        totalTime={currentRecipe.totalTime}
                        steps={currentRecipe.steps}
                        currentStepIndex={currentStep}
                    />
                    <RecipeInfo recipe={currentRecipe} />
                    <TimerControls
                        isRunning={isRunning}
                        onToggle={toggleTimer}
                        onReset={resetTimer}
                    />
                    <div className="flex flex-col gap-4">
                        <CurrentStep
                            currentStep={currentStepData}
                            currentStepIndex={currentStep}
                            totalSteps={totalSteps}
                        />
                        <NextStep
                            nextStep={currentRecipe.steps?.[currentStep + 1]}
                            nextStepIndex={currentStep + 1}
                            totalSteps={totalSteps}
                        />
                    </div>
                </div>

                {/* 단계별 가이드 섹션 */}
                {currentRecipe.steps && (
                    <StepsOverview
                        steps={currentRecipe.steps}
                        currentTime={currentTime}
                        currentStepIndex={currentStep}
                    />
                )}
            </main>
        </div>
    );
}
