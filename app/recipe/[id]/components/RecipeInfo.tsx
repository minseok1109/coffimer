'use client';

import { Recipe } from '@/lib/recipes';

interface RecipeInfoProps {
    recipe: Recipe;
}

export default function RecipeInfo({ recipe }: RecipeInfoProps) {
    return (
        <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
            <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                    <div className="text-xs text-amber-600 mb-1">커피</div>
                    <div className="text-sm font-semibold text-amber-900">{recipe.coffee}</div>
                </div>
                <div>
                    <div className="text-xs text-amber-600 mb-1">물</div>
                    <div className="text-sm font-semibold text-amber-900">{recipe.water}</div>
                </div>
                <div>
                    <div className="text-xs text-amber-600 mb-1">온도</div>
                    <div className="text-sm font-semibold text-amber-900">{recipe.waterTemperature}</div>
                </div>
                <div>
                    <div className="text-xs text-amber-600 mb-1">드리퍼</div>
                    <div className="text-sm font-semibold text-amber-900">{recipe.dripper}</div>
                </div>
            </div>
        </div>
    );
}