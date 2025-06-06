'use client';

import { useRouter } from 'next/navigation';
import { getAllRecipes, Recipe } from '@/lib/recipes';

// Magic number를 명명된 상수로 분리
const SECONDS_PER_MINUTE = 60;

// Header 컴포넌트 분리
function AppHeader() {
    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">☕</span>
                    </div>
                    <h1 className="text-2xl font-bold text-amber-900">Coffimer</h1>
                </div>
                <HeaderActions />
            </div>
        </header>
    );
}

// Header 액션 버튼들을 별도 컴포넌트로 분리
function HeaderActions() {
    return (
        <div className="flex items-center space-x-4">
            <button className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </button>
            <button className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </button>
            <button className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            </button>
        </div>
    );
}

// Hero 섹션을 별도 컴포넌트로 분리
function HeroSection() {
    return (
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
                세계 최고 바리스타들의 레시피
            </h2>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
                검증된 전문가들의 핸드드립 레시피로 완벽한 커피를 만들어보세요
            </p>
        </div>
    );
}

// Recipe Card를 별도 컴포넌트로 분리
interface RecipeCardProps {
    recipe: Recipe;
    onRecipeClick: (recipeId: number) => void;
}

function RecipeCard({ recipe, onRecipeClick }: RecipeCardProps) {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / SECONDS_PER_MINUTE);
        return `${mins}분`;
    };

    return (
        <div
            onClick={() => onRecipeClick(recipe.id)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
        >
            <RecipeImage />
            <RecipeContent recipe={recipe} formatTime={formatTime} />
        </div>
    );
}

// Recipe 이미지 부분을 별도 컴포넌트로 분리
function RecipeImage() {
    return (
        <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
            <div className="text-6xl">☕</div>
        </div>
    );
}

// Recipe 컨텐츠 부분을 별도 컴포넌트로 분리
interface RecipeContentProps {
    recipe: Recipe;
    formatTime: (seconds: number) => string;
}

function RecipeContent({ recipe, formatTime }: RecipeContentProps) {
    return (
        <div className="p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-3 line-clamp-2">{recipe.name}</h3>
            <p className="text-amber-700 text-sm mb-4 line-clamp-3">{recipe.description}</p>
            <RecipeInfo recipe={recipe} formatTime={formatTime} />
            <RecipeStartButton />
        </div>
    );
}

// Recipe 정보 부분을 별도 컴포넌트로 분리
interface RecipeInfoProps {
    recipe: Recipe;
    formatTime: (seconds: number) => string;
}

function RecipeInfo({ recipe, formatTime }: RecipeInfoProps) {
    return (
        <div className="flex items-center justify-between text-sm text-amber-600">
            <div className="flex items-center space-x-4">
                <span>⏱ {formatTime(recipe.totalTime)}</span>
            </div>
            <div className="flex items-center space-x-2">
                <span>☕ {recipe.coffee}</span>
            </div>
        </div>
    );
}

// Recipe 시작 버튼을 별도 컴포넌트로 분리
function RecipeStartButton() {
    return (
        <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors">
            레시피 시작하기
        </button>
    );
}

// Recipe Grid를 별도 컴포넌트로 분리
interface RecipeGridProps {
    recipes: Recipe[];
    onRecipeClick: (recipeId: number) => void;
}

function RecipeGrid({ recipes, onRecipeClick }: RecipeGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onRecipeClick={onRecipeClick} />
            ))}
        </div>
    );
}

// 메인 HomePage 컴포넌트 - 단일 책임: 레이아웃과 데이터 관리
export default function HomePage() {
    const router = useRouter();
    const recipes = getAllRecipes();

    const handleRecipeClick = (recipeId: number) => {
        router.push(`/recipe/${recipeId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <AppHeader />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <HeroSection />
                <RecipeGrid recipes={recipes} onRecipeClick={handleRecipeClick} />
            </main>
        </div>
    );
}
