import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';
import { formatRecipe } from '@/lib/utils/recipe-transformer';
import { RecipeResponse } from '@/types/recipe.types';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const recipeId = params.id;

        // UUID 형식 검증
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(recipeId)) {
            return NextResponse.json<RecipeResponse>(
                { recipe: null, error: 'Invalid recipe ID format' },
                { status: 400 }
            );
        }

        // 레시피 조회
        const { data: recipe, error: recipeError } = await supabase
            .from('recipes')
            .select('*')
            .eq('id', recipeId)
            .is('deleted_at', null)
            .is('is_public', true)
            .single();

        if (recipeError || !recipe) {
            return NextResponse.json<RecipeResponse>(
                { recipe: null, error: 'Recipe not found' },
                { status: 404 }
            );
        }

        // 레시피 스텝 조회
        const { data: steps, error: stepsError } = await supabase
            .from('recipe_steps')
            .select('*')
            .eq('recipe_id', recipeId)
            .order('step_index', { ascending: true });

        if (stepsError) {
            console.error('Error fetching recipe steps:', stepsError);
            // 스텝 조회 실패 시에도 레시피는 반환
            return NextResponse.json<RecipeResponse>({
                recipe: formatRecipe(recipe, []),
            });
        }

        const formattedRecipe = formatRecipe(recipe, steps || []);

        return NextResponse.json<RecipeResponse>({
            recipe: formattedRecipe,
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json<RecipeResponse>(
            { recipe: null, error: 'Internal server error' },
            { status: 500 }
        );
    }
}