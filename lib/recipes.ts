export interface RecipeStep {
    time: number;
    title: string;
    description: string;
    water: string;
    totalWater?: number;
}

export interface Recipe {
    id: number;
    name: string;
    totalTime: number;
    coffee: string;
    water: string;
    waterTemperature: string;
    dripper: string;
    description: string;
    image: string;
    youtubeUrl?: string;
    steps?: RecipeStep[];
}

export const recipes: Recipe[] = [
    {
        id: 0,
        name: '테츠 카츠야 4:6 레시피',
        totalTime: 210,
        coffee: '20g',
        water: '300ml',
        waterTemperature: '92°C',
        dripper: 'V60',
        description:
            '일본의 유명 바리스타 테츠 카츠야가 개발한 클래식한 V60 레시피입니다. 균형잡힌 맛과 깔끔한 후미가 특징입니다.',
        image: '/api/placeholder/300/200',
        youtubeUrl: 'https://youtu.be/ewqza63GXh0?si=UKTU1rZFZF0y5ZXQ',
        steps: [
            {
                time: 45,
                title: '블루밍',
                description: '커피 가루에 물을 적셔 45초간 기다리세요',
                water: '70ml',
                totalWater: 70,
            },
            {
                time: 90,
                title: '1차 추출',
                description: '천천히 원을 그리며 물을 부어주세요',
                water: '50ml',
                totalWater: 120,
            },
            {
                time: 135,
                title: '2차 추출',
                description: '중앙에서 바깥쪽으로 물을 부어주세요',
                water: '60ml',
                totalWater: 180,
            },
            {
                time: 180,
                title: '3차 추출',
                description: '천천히 원을 그리며 물을 부어주세요',
                water: '60ml',
                totalWater: 240,
            },
            {
                time: 210,
                title: '완료',
                description: '모든 물이 떨어질 때까지 기다리세요',
                water: '60ml',
                totalWater: 300,
            },
        ],
    },
    {
        id: 1,
        name: '안스타 6888 레시피',
        totalTime: 150,
        coffee: '20g',
        water: '300ml',
        waterTemperature: '94°C',
        dripper: 'V60',
        description:
            '안스타님의 6888 레시피입니다. 굵은 분쇄도를 사용해서 향미를 표현한게 특징인 레시피입니다.',
        image: '/api/placeholder/300/200',
        youtubeUrl: 'https://youtu.be/uZs78TPm7ws?si=FUqhmbGwAHV7DjdW',
        steps: [
            {
                time: 30,
                title: '블루밍',
                description: '커피 가루를 충분히 적셔주세요',
                water: '60ml',
                totalWater: 60,
            },
            {
                time: 60,
                title: '1차 추출',
                description: '물이 다 빠질 때까지 기다리세요.',
                water: '80ml',
                totalWater: 140,
            },
            {
                time: 90,
                title: '2차 추출',
                description: '물이 다 빠질 때까지 기다리세요.',
                water: '80ml',
                totalWater: 220,
            },
            {
                time: 120,
                title: '3차 추출',
                description: '물이 다 빠질 때까지 기다리세요.',
                water: '80ml',
                totalWater: 300,
            },
            {
                time: 150,
                title: '완료',
                description: '모든 물이 떨어질 때까지 기다리세요.',
                water: '0ml',
                totalWater: 300,
            },
        ],
    },
    {
        id: 2,
        name: '정인성 4666 레시피 (오리지널)',
        totalTime: 140,
        coffee: '20g',
        water: '320ml',
        waterTemperature: '90°C',
        dripper: 'V60',
        description:
            '정인성 바리스타의 대표 레시피로 40g-60g-60g-60g으로 분할 추출합니다. 약배전 스페셜티 원두의 맛과 향을 표현하는 데 적합합니다.',
        image: '/api/placeholder/300/200',
        youtubeUrl: 'https://youtu.be/ewGLBdY6KOo?si=cmkTpc8TudPQlMNc',
        steps: [
            {
                time: 30,
                title: '뜸들이기',
                description: '원두 가루 전체를 부드럽게 적십니다.',
                water: '40ml',
                totalWater: 40,
            },
            {
                time: 60,
                title: '1차 추출',
                description: '중앙부터 바깥쪽으로 원을 그리며 붓습니다.',
                water: '60ml',
                totalWater: 100,
            },
            {
                time: 90,
                title: '2차 추출',
                description: '1차와 동일한 방식으로 붓습니다.',
                water: '60ml',
                totalWater: 160,
            },
            {
                time: 130,
                title: '3차 추출',
                description: '마지막 물을 붓고 추출을 마칩니다.',
                water: '60ml',
                totalWater: 220,
            },
            {
                time: 140,
                title: '희석',
                description: '추출된 원액에 뜨거운 물을 부어 농도를 조절합니다.',
                water: '100ml',
                totalWater: 320,
            },
        ],
    },
    {
        id: 3,
        name: '정인성 국룰 레시피 Ver 2.0 (HOT)',
        totalTime: 170,
        coffee: '18g',
        water: '300ml',
        waterTemperature: '90°C',
        dripper: 'V60',
        description: '기존 4666 레시피의 개선 버전으로, 뜸들이기 시간을 늘려 안정성을 높였습니다.',
        image: '/api/placeholder/300/200',
        youtubeUrl: 'https://youtu.be/i7Q-pvahrXw?si=5tcZ4azNWHNXFL8j',
        steps: [
            {
                time: 40,
                title: '뜸들이기',
                description: '40초간 충분히 뜸을 들여 가스를 배출합니다.',
                water: '40ml',
                totalWater: 40,
            },
            {
                time: 70,
                title: '1차 추출',
                description: '30초 동안 붓습니다.',
                water: '60ml',
                totalWater: 100,
            },
            {
                time: 100,
                title: '2차 추출',
                description: '30초 동안 붓습니다.',
                water: '60ml',
                totalWater: 160,
            },
            {
                time: 150,
                title: '3차 추출',
                description: '마지막 물을 붓고 추출을 완료합니다.',
                water: '60ml',
                totalWater: 220,
            },
            {
                time: 170,
                title: '희석',
                description: '추출된 원액에 뜨거운 물을 부어 농도를 조절합니다.',
                water: '80ml',
                totalWater: 300,
            },
        ],
    },
    {
        id: 4,
        name: '정인성 국룰 레시피 Ver 2.0 (ICED)',
        totalTime: 170,
        coffee: '18g',
        water: '200ml',
        waterTemperature: '90°C',
        dripper: 'V60',
        description:
            '아이스 커피를 위해 고안된 레시피. 마지막 물 양을 줄여 진한 원액을 추출한 뒤 얼음에 바로 부어 완성합니다.',
        image: '/api/placeholder/300/200',
        youtubeUrl: 'https://youtu.be/i7Q-pvahrXw?si=5tcZ4azNWHNXFL8j',
        steps: [
            {
                time: 40,
                title: '뜸들이기',
                description: '40초간 충분히 뜸을 들입니다.',
                water: '40ml',
                totalWater: 40,
            },
            {
                time: 70,
                title: '1차 추출',
                description: '30초 동안 붓습니다.',
                water: '60ml',
                totalWater: 100,
            },
            {
                time: 100,
                title: '2차 추출',
                description: '30초 동안 붓습니다.',
                water: '60ml',
                totalWater: 160,
            },
            {
                time: 170,
                title: '3차 추출',
                description: '마지막 물 양을 줄여 진하게 추출합니다.',
                water: '40ml',
                totalWater: 200,
            },
        ],
    },
    {
        id: 5,
        name: '용챔 약배전 레시피',
        totalTime: 140,
        coffee: '15g',
        water: '240ml',
        waterTemperature: '95°C',
        dripper: 'V60',
        description:
            '커피 전문 유튜버 용챔의 약배전 원두 전용 레시피입니다. 굵고 빠른 물줄기로 시작하여 후반부에는 가늘고 느린 물줄기로 바꿔 산미와 다채로운 향을 균형 있게 추출합니다.',
        image: '/api/placeholder/300/200',
        youtubeUrl: 'https://youtu.be/bFbMHE59T2I?si=8-3BkuNWoDZ9WmjB',
        steps: [
            {
                time: 40,
                title: '뜸들이기',
                description: '40초 동안 충분히 뜸을 들입니다.',
                water: '45ml',
                totalWater: 45,
            },
            {
                time: 70,
                title: '1차 추출',
                description: '굵고 빠른 물줄기로 중앙부터 원을 그리며 붓습니다.',
                water: '70ml',
                totalWater: 115,
            },
            {
                time: 105,
                title: '2차 추출',
                description: '굵고 빠른 물줄기로 동일하게 붓습니다.',
                water: '75ml',
                totalWater: 190,
            },
            {
                time: 140,
                title: '3차 추출',
                description: '가늘고 느린 물줄기로 중앙 위주로 부어 농도를 조절합니다.',
                water: '50ml',
                totalWater: 240,
            },
        ],
    },
];

export const getRecipeById = (id: number): Recipe | undefined => {
    return recipes.find((recipe) => recipe.id === id);
};

export const getAllRecipes = (): Recipe[] => {
    return recipes;
};
