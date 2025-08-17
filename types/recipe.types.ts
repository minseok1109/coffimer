export interface RecipeStep {
    time: number;
    title: string;
    description: string;
    water: string;
    totalWater?: number;
}

export interface Recipe {
    id: string;
    name: string;
    totalTime: number;
    coffee: string;
    water: string;
    ratio: string;
    filter?: string;
    waterTemperature: string;
    dripper: string;
    description: string;
    image: string;
    youtubeUrl?: string;
    steps?: RecipeStep[];
}

export interface ApiRecipe {
    id: string;
    name: string;
    totalTime: number;
    coffee: string;
    water: string;
    ratio: string;
    filter?: string;
    waterTemperature: string;
    dripper: string;
    description: string;
    image: string;
    youtubeUrl?: string;
    steps?: RecipeStep[];
}

export interface RecipesResponse {
    recipes: ApiRecipe[];
    error?: string;
}

export interface RecipeResponse {
    recipe: ApiRecipe | null;
    error?: string;
}