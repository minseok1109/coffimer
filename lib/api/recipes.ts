import { ApiRecipe, RecipesResponse, RecipeResponse } from '@/types/recipe.types';

export async function fetchAllRecipes(): Promise<ApiRecipe[]> {
    const response = await fetch('/api/recipes', {
        next: { revalidate: 60 }, // 1분마다 재검증
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recipes');
    }

    const data: RecipesResponse = await response.json();
    
    if (data.error) {
        throw new Error(data.error);
    }

    return data.recipes;
}

export async function fetchRecipeById(id: string): Promise<ApiRecipe> {
    const response = await fetch(`/api/recipes/${id}`, {
        next: { revalidate: 60 }, // 1분마다 재검증
    });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Recipe not found');
        }
        throw new Error('Failed to fetch recipe');
    }

    const data: RecipeResponse = await response.json();
    
    if (data.error || !data.recipe) {
        throw new Error(data.error || 'Recipe not found');
    }

    return data.recipe;
}