'use client';

import { Recipe } from '@/lib/recipes';

interface RecipeInfoProps {
    recipe: Recipe;
}

export default function RecipeInfo({ recipe }: RecipeInfoProps) {
    return (
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/60 rounded-lg p-2 border border-amber-300 shadow-sm">
                    <div className="text-xs text-amber-600 mb-1">커피</div>
                    <div className="text-sm font-semibold text-amber-900">{recipe.coffee}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 border border-amber-300 shadow-sm">
                    <div className="text-xs text-amber-600 mb-1">물</div>
                    <div className="text-sm font-semibold text-amber-900">{recipe.water}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 border border-amber-300 shadow-sm">
                    <div className="text-xs text-amber-600 mb-1">비율</div>
                    <div className="text-sm font-semibold text-amber-900">{recipe.ratio}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 border border-amber-300 shadow-sm">
                    <div className="text-xs text-amber-600 mb-1">온도</div>
                    <div className="text-sm font-semibold text-amber-900">
                        {recipe.waterTemperature}
                    </div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 border border-amber-300 shadow-sm">
                    <div className="text-xs text-amber-600 mb-1">드리퍼</div>
                    <div className="text-sm font-semibold text-amber-900">{recipe.dripper}</div>
                </div>
                {recipe.filter && (
                    <div className="bg-white/60 rounded-lg p-2 border border-amber-300 shadow-sm">
                        <div className="text-xs text-amber-600 mb-1">필터</div>
                        <div className="text-sm font-semibold text-amber-900">{recipe.filter}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
