import { Database } from '@/types/database.types';
import { ApiRecipe, RecipeStep } from '@/types/recipe.types';

type DBRecipe = Database['public']['Tables']['recipes']['Row'];
type DBRecipeStep = Database['public']['Tables']['recipe_steps']['Row'];

export function formatRecipeStep(step: DBRecipeStep): RecipeStep {
    return {
        time: step.time,
        title: step.title || '',
        description: step.description || '',
        water: step.water ? `${step.water}ml` : '0ml',
        totalWater: step.total_water || undefined,
    };
}

export function formatRecipe(
    recipe: DBRecipe,
    steps?: DBRecipeStep[]
): ApiRecipe {
    // ratio 계산: DB에 저장된 ratio가 null이면 coffee와 water로 계산
    let ratioString = '1:15'; // 기본값
    if (recipe.ratio) {
        ratioString = `1:${recipe.ratio}`;
    } else if (recipe.coffee > 0) {
        const calculatedRatio = Math.round(recipe.water / recipe.coffee);
        ratioString = `1:${calculatedRatio}`;
    }

    return {
        id: recipe.id,
        name: recipe.name,
        totalTime: recipe.total_time,
        coffee: `${recipe.coffee}g`,
        water: `${recipe.water}ml`,
        ratio: ratioString,
        filter: recipe.filter || undefined,
        waterTemperature: `${recipe.water_temperature}°C`,
        dripper: recipe.dripper || 'V60',
        description: recipe.description || '',
        image: '/api/placeholder/300/200', // 기본 이미지
        youtubeUrl: recipe.youtube_url || undefined,
        steps: steps
            ?.sort((a, b) => a.step_index - b.step_index)
            .map(formatRecipeStep),
    };
}