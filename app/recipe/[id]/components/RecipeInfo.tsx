'use client';

import { Recipe } from '@/lib/recipes';

interface RecipeInfoProps {
    recipe: Recipe;
}

export default function RecipeInfo({ recipe }: RecipeInfoProps) {
    return (
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-900 mb-2">{recipe.name}</h2>
            <RecipeDetails coffee={recipe.coffee} water={recipe.water} />
        </div>
    );
}

// 레시피 세부 정보 컴포넌트
function RecipeDetails({ coffee, water }: { coffee: string; water: string }) {
    return (
        <div className="flex justify-center items-center space-x-6 text-amber-600">
            <span>☕ {coffee}</span>
            <span>💧 {water}</span>
        </div>
    );
}