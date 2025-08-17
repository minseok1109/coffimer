'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Recipe } from '@/lib/recipes';
import { useRecipes } from '@/lib/hooks/useRecipes';
import AppLogo from './_components/AppLogo';
import TopBanner from './_components/TopBanner';

// Magic number를 명명된 상수로 분리
const SECONDS_PER_MINUTE = 60;

// Header 컴포넌트 분리
function AppHeader() {
    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    <AppLogo />
                    <h1 className="text-2xl font-bold text-amber-900">Coffimer</h1>
                </div>
            </div>
        </header>
    );
}

// Recipe Card를 별도 컴포넌트로 분리
interface RecipeCardProps {
    recipe: Recipe;
    onRecipeClick: (recipeId: string) => void;
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
            {/* <RecipeImage /> */}
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
            <p className="text-amber-700 text-sm mb-4 break-keep">{recipe.description}</p>
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
    onRecipeClick: (recipeId: string) => void;
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

// 로딩 스켈레톤 컴포넌트
function RecipeLoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-2xl shadow-lg h-64 animate-pulse"
                >
                    <div className="h-32 bg-gray-200 rounded-t-2xl" />
                    <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                </div>
            ))}
        </div>
    );
}

// 에러 컴포넌트
function RecipeError({ message }: { message: string }) {
    return (
        <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-4">레시피를 불러오는 중 오류가 발생했습니다.</p>
            <p className="text-gray-600">{message}</p>
        </div>
    );
}

// 레시피 목록 컴포넌트 (Suspense 내부에서 사용)
function RecipeList() {
    const router = useRouter();
    const { data: recipes } = useRecipes();

    const handleRecipeClick = (recipeId: string) => {
        router.push(`/recipe/${recipeId}`);
    };

    return <RecipeGrid recipes={recipes} onRecipeClick={handleRecipeClick} />;
}

// 메인 HomePage 컴포넌트 - 단일 책임: 레이아웃과 데이터 관리
export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <TopBanner />
            <AppHeader />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <Suspense fallback={<RecipeLoadingSkeleton />}>
                    <RecipeList />
                </Suspense>
            </main>
        </div>
    );
}
