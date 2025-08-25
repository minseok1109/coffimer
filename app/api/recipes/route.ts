import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';
import { formatRecipe } from '@/lib/utils/recipe-transformer';
import { RecipesResponse } from '@/types/recipe.types';

export async function GET() {
    try {
        // 모든 공개 레시피 조회 (soft delete된 것 제외)
        const { data: recipes, error } = await supabase
            .from('recipes')
            .select('*')
            .is('deleted_at', null)
            .is('is_public', true)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching recipes:', error);
            return NextResponse.json<RecipesResponse>(
                { recipes: [], error: 'Failed to fetch recipes' },
                { status: 500 },
            );
        }

        if (!recipes || recipes.length === 0) {
            return NextResponse.json<RecipesResponse>({ recipes: [] });
        }

        // 각 레시피의 steps 조회
        const recipesWithSteps = await Promise.all(
            recipes.map(async (recipe) => {
                const { data: steps } = await supabase
                    .from('recipe_steps')
                    .select('*')
                    .eq('recipe_id', recipe.id)
                    .order('step_index', { ascending: true });

                return formatRecipe(recipe, steps || []);
            }),
        );

        return NextResponse.json<RecipesResponse>({
            recipes: recipesWithSteps,
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json<RecipesResponse>(
            { recipes: [], error: 'Internal server error' },
            { status: 500 },
        );
    }
}
