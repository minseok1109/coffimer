'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchAllRecipes, fetchRecipeById } from '@/lib/api/recipes';

export function useRecipes() {
    return useSuspenseQuery({
        queryKey: ['recipes'],
        queryFn: fetchAllRecipes,
    });
}

export function useRecipe(id: string) {
    return useSuspenseQuery({
        queryKey: ['recipe', id],
        queryFn: () => fetchRecipeById(id),
    });
}