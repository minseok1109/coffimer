import { ApiRecipe, RecipesResponse, RecipeResponse } from '@/types/recipe.types';
import { supabase } from '@/lib/supabase/server';
import { formatRecipe } from '@/lib/utils/recipe-transformer';

// 빌드 타임 또는 서버사이드에서 직접 데이터베이스 접근이 필요한지 확인
function shouldUseDirect(): boolean {
    // Next.js 빌드 중인 경우 직접 데이터베이스 접근
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
        return true;
    }
    
    // 정적 생성 중인 경우 (prerendering)
    if (typeof window === 'undefined' && !global.fetch) {
        return true;
    }
    
    // 서버사이드에서 절대 URL이 없는 경우
    return typeof window === 'undefined' && 
           (!process.env.VERCEL_URL && !process.env.NEXT_PUBLIC_SITE_URL);
}

// 적절한 기본 URL을 얻는 함수
function getBaseUrl(): string {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }
    
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
    }
    
    // 개발 환경 기본값
    return 'http://localhost:3000';
}

// 직접 Supabase에서 모든 레시피 가져오기 (빌드 타임용)
async function fetchRecipesDirectly(): Promise<ApiRecipe[]> {
    try {
        // 모든 공개 레시피 조회 (soft delete된 것 제외)
        const { data: recipes, error } = await supabase
            .from('recipes')
            .select('*')
            .is('deleted_at', null)
            .is('is_public', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching recipes directly:', error);
            return [];
        }

        if (!recipes || recipes.length === 0) {
            return [];
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
            })
        );

        return recipesWithSteps;
    } catch (error) {
        console.error('Unexpected error in fetchRecipesDirectly:', error);
        return [];
    }
}

export async function fetchAllRecipes(): Promise<ApiRecipe[]> {
    // 빌드 타임이나 적절한 URL이 없는 경우 직접 접근
    if (shouldUseDirect()) {
        return fetchRecipesDirectly();
    }

    try {
        // 런타임에서는 API 라우트 사용
        const baseUrl = getBaseUrl();
        const response = await fetch(`${baseUrl}/api/recipes`, {
            next: { revalidate: 60 }, // 1분마다 재검증
        });

        if (!response.ok) {
            // API 호출 실패 시 직접 접근으로 폴백
            console.warn('API call failed, falling back to direct database access');
            return fetchRecipesDirectly();
        }

        const data: RecipesResponse = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        return data.recipes;
    } catch (error) {
        // fetch 자체가 실패한 경우 (URL 파싱 오류 등) 직접 접근으로 폴백
        console.warn('Failed to fetch from API, using direct database access:', error);
        return fetchRecipesDirectly();
    }
}

// 직접 Supabase에서 특정 레시피 가져오기 (빌드 타임용)
async function fetchRecipeDirectly(id: string): Promise<ApiRecipe> {
    try {
        // 특정 레시피 조회
        const { data: recipe, error } = await supabase
            .from('recipes')
            .select('*')
            .eq('id', id)
            .is('deleted_at', null)
            .is('is_public', true)
            .single();

        if (error || !recipe) {
            throw new Error('Recipe not found');
        }

        // 레시피 steps 조회
        const { data: steps } = await supabase
            .from('recipe_steps')
            .select('*')
            .eq('recipe_id', recipe.id)
            .order('step_index', { ascending: true });

        return formatRecipe(recipe, steps || []);
    } catch (error) {
        console.error('Unexpected error in fetchRecipeDirectly:', error);
        throw new Error('Recipe not found');
    }
}

export async function fetchRecipeById(id: string): Promise<ApiRecipe> {
    // 빌드 타임이나 적절한 URL이 없는 경우 직접 접근
    if (shouldUseDirect()) {
        return fetchRecipeDirectly(id);
    }

    try {
        // 런타임에서는 API 라우트 사용
        const baseUrl = getBaseUrl();
        const response = await fetch(`${baseUrl}/api/recipes/${id}`, {
            next: { revalidate: 60 }, // 1분마다 재검증
        });

        if (!response.ok) {
            if (response.status === 404) {
                // API에서 404 응답 시 직접 접근으로 폴백
                try {
                    return await fetchRecipeDirectly(id);
                } catch {
                    throw new Error('Recipe not found');
                }
            }
            // API 호출 실패 시 직접 접근으로 폴백
            console.warn('API call failed, falling back to direct database access');
            return fetchRecipeDirectly(id);
        }

        const data: RecipeResponse = await response.json();
        
        if (data.error || !data.recipe) {
            throw new Error(data.error || 'Recipe not found');
        }

        return data.recipe;
    } catch (error) {
        // fetch 자체가 실패한 경우 (URL 파싱 오류 등) 직접 접근으로 폴백
        console.warn('Failed to fetch from API, using direct database access:', error);
        return fetchRecipeDirectly(id);
    }
}