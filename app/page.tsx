'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    const recipes = [
        {
            id: 0,
            name: '테츠 카츠야의 V60 클래식 레시피',
            totalTime: 240,
            difficulty: '초급',
            coffee: '20g',
            water: '320ml',
            description:
                '일본의 유명 바리스타 테츠 카츠야가 개발한 클래식한 V60 레시피입니다. 균형잡힌 맛과 깔끔한 후미가 특징입니다.',
            image: '/api/placeholder/300/200',
        },
        {
            id: 1,
            name: '제임스 호프만의 케멕스 골드 레시피',
            totalTime: 360,
            difficulty: '중급',
            coffee: '30g',
            water: '500ml',
            description:
                '세계적인 커피 전문가 제임스 호프만의 케멕스 레시피입니다. 풍부한 바디감과 깊은 풍미를 경험할 수 있습니다.',
            image: '/api/placeholder/300/200',
        },
        {
            id: 2,
            name: '팀 웬델보의 에어로프레스 레시피',
            totalTime: 180,
            difficulty: '초급',
            coffee: '17g',
            water: '250ml',
            description:
                '2005년 월드 바리스타 챔피언 팀 웬델보의 에어로프레스 레시피입니다. 빠르고 간편하면서도 풍부한 맛을 제공합니다.',
            image: '/api/placeholder/300/200',
        },
        {
            id: 3,
            name: '스콧 라오의 V60 어드밴스드',
            totalTime: 300,
            difficulty: '고급',
            coffee: '22g',
            water: '350ml',
            description:
                '커피 과학자 스콧 라오의 고급 V60 레시피입니다. 정밀한 추출로 커피의 모든 풍미를 끌어냅니다.',
            image: '/api/placeholder/300/200',
        },
        {
            id: 4,
            name: '매트 퍼거의 스탬프타운 레시피',
            totalTime: 270,
            difficulty: '중급',
            coffee: '25g',
            water: '400ml',
            description:
                '스탬프타운 커피의 창립자 매트 퍼거의 시그니처 레시피입니다. 밝고 산뜻한 산미가 특징입니다.',
            image: '/api/placeholder/300/200',
        },
        {
            id: 5,
            name: '조지 하웰의 클래식 드립',
            totalTime: 330,
            difficulty: '중급',
            coffee: '28g',
            water: '450ml',
            description:
                '스페셜티 커피의 아버지 조지 하웰의 클래식 드립 레시피입니다. 전통적이면서도 완벽한 균형을 자랑합니다.',
            image: '/api/placeholder/300/200',
        },
        {
            id: 6,
            name: '피트 리치몬드의 칼리타 웨이브',
            totalTime: 285,
            difficulty: '초급',
            coffee: '21g',
            water: '340ml',
            description:
                '칼리타 웨이브 전문가 피트 리치몬드의 레시피입니다. 안정적이고 일관된 추출이 가능합니다.',
            image: '/api/placeholder/300/200',
        },
        {
            id: 7,
            name: '안드레아 안토누치의 이탈리안 스타일',
            totalTime: 255,
            difficulty: '중급',
            coffee: '24g',
            water: '380ml',
            description:
                '이탈리아의 마스터 바리스타 안드레아 안토누치의 이탈리안 스타일 드립 레시피입니다.',
            image: '/api/placeholder/300/200',
        },
        {
            id: 8,
            name: '사샤 세스틱의 월드 챔피언 레시피',
            totalTime: 315,
            difficulty: '고급',
            coffee: '26g',
            water: '420ml',
            description:
                '2015년 월드 바리스타 챔피언 사샤 세스틱의 우승 레시피입니다. 복잡하면서도 조화로운 맛의 층을 경험할 수 있습니다.',
            image: '/api/placeholder/300/200',
        },
    ];

    const handleRecipeClick = (recipeId: number) => {
        router.push(`/recipe/${recipeId}`);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        return `${mins}분`;
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
            data-oid="7y5.i5m"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4"
                data-oid="fpn7pu3"
            >
                <div
                    className="flex items-center justify-between max-w-7xl mx-auto"
                    data-oid="i0_fts:"
                >
                    <div className="flex items-center space-x-3" data-oid="lqxe93_">
                        <div
                            className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center"
                            data-oid="fc03tqm"
                        >
                            <span className="text-white text-lg" data-oid="7n46-u9">
                                ☕
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-amber-900" data-oid="9:j_b7a">
                            드립마스터
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4" data-oid="qv3_r8v">
                        <button
                            className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            data-oid="inn5wlw"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="og739dy"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    data-oid="3:7nve:"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            data-oid="5uqg0h5"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="fu6po39"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    data-oid="zj7_x63"
                                />

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    data-oid="emsdthe"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            data-oid="voz2_dh"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                data-oid="x3j:3ms"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    data-oid="-mfgh1m"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8" data-oid="iva1620">
                {/* Hero Section */}
                <div className="text-center mb-12" data-oid="1qyv8be">
                    <h2 className="text-4xl font-bold text-amber-900 mb-4" data-oid="c4dzbbz">
                        세계 최고 바리스타들의 레시피
                    </h2>
                    <p className="text-xl text-amber-700 max-w-2xl mx-auto" data-oid="9229r4i">
                        검증된 전문가들의 핸드드립 레시피로 완벽한 커피를 만들어보세요
                    </p>
                </div>

                {/* Recipe Grid */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    data-oid="_fjsm91"
                >
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            onClick={() => handleRecipeClick(recipe.id)}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 overflow-hidden"
                            data-oid="32cnee:"
                        >
                            {/* Recipe Image */}
                            <div
                                className="h-48 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center"
                                data-oid="_0a6u6h"
                            >
                                <div className="text-6xl" data-oid="jb610m9">
                                    ☕
                                </div>
                            </div>

                            {/* Recipe Content */}
                            <div className="p-6" data-oid="hx-lcml">
                                <h3
                                    className="text-xl font-bold text-amber-900 mb-3 line-clamp-2"
                                    data-oid=":pcuv3n"
                                >
                                    {recipe.name}
                                </h3>

                                <p
                                    className="text-amber-700 text-sm mb-4 line-clamp-3"
                                    data-oid="b3mi_y_"
                                >
                                    {recipe.description}
                                </p>

                                {/* Recipe Info */}
                                <div
                                    className="flex items-center justify-between text-sm text-amber-600"
                                    data-oid="c2n.50t"
                                >
                                    <div className="flex items-center space-x-4" data-oid="vqjrrm8">
                                        <span data-oid="t52n8ao">
                                            ⏱ {formatTime(recipe.totalTime)}
                                        </span>
                                        <span data-oid="5tdgdiz">📊 {recipe.difficulty}</span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="li7c_2u">
                                        <span data-oid="m6ttwyd">☕ {recipe.coffee}</span>
                                    </div>
                                </div>

                                {/* Start Button */}
                                <button
                                    className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors"
                                    data-oid="zg4txav"
                                >
                                    레시피 시작하기
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
