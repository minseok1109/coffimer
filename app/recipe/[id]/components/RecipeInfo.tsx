'use client';

import { Recipe } from '@/lib/recipes';

interface RecipeInfoProps {
    recipe: Recipe;
}

export default function RecipeInfo({ recipe }: RecipeInfoProps) {
    return (
        <div className="text-center mb-8">
            <RecipeDetails
                coffee={recipe.coffee}
                water={recipe.water}
                waterTemperature={recipe.waterTemperature}
                dripper={recipe.dripper}
            />
        </div>
    );
}

// 레시피 세부 정보 컴포넌트
function RecipeDetails({
    coffee,
    water,
    waterTemperature,
    dripper,
}: {
    coffee: string;
    water: string;
    waterTemperature: string;
    dripper: string;
}) {
    return (
        <div className="bg-amber-50 rounded-2xl p-4 max-w-2xl mx-auto border border-amber-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
                        <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-2">
                            커피
                        </div>
                        <div className="text-lg font-bold text-amber-900">{coffee}</div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
                        <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-2">
                            물
                        </div>
                        <div className="text-lg font-bold text-amber-900">{water}</div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
                        <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-2">
                            온도
                        </div>
                        <div className="text-lg font-bold text-amber-900">{waterTemperature}</div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-amber-50">
                        <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mb-2">
                            드리퍼
                        </div>
                        <div className="text-lg font-bold text-amber-900">{dripper}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
