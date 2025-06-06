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
    description: string;
    image: string;
    steps?: RecipeStep[];
}

export const recipes: Recipe[] = [
    {
        id: 0,
        name: '테츠 카츠야의 V60 클래식 레시피',
        totalTime: 240,
        coffee: '20g',
        water: '320ml',
        description:
            '일본의 유명 바리스타 테츠 카츠야가 개발한 클래식한 V60 레시피입니다. 균형잡힌 맛과 깔끔한 후미가 특징입니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 45,
                title: '블루밍',
                description: '커피 가루에 물을 적셔 30초간 기다리세요',
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
                description: '마지막으로 남은 물을 부어주세요',
                water: '60ml',
                totalWater: 240,
            },
            {
                time: 210,
                title: '완료',
                description: '드리핑이 완료될 때까지 기다리세요',
                water: '60ml',
                totalWater: 300,
            },
        ],
    },
    {
        id: 1,
        name: '제임스 호프만의 케멕스 골드 레시피',
        totalTime: 360,
        coffee: '30g',
        water: '500ml',
        description:
            '세계적인 커피 전문가 제임스 호프만의 케멕스 레시피입니다. 풍부한 바디감과 깊은 풍미를 경험할 수 있습니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 45,
                title: '블루밍',
                description: '커피 가루를 충분히 적셔주세요',
                water: '60ml',
            },
            {
                time: 120,
                title: '1차 추출',
                description: '느린 속도로 물을 부어주세요',
                water: '150ml',
            },
            {
                time: 240,
                title: '2차 추출',
                description: '일정한 속도를 유지하며 부어주세요',
                water: '150ml',
            },
            {
                time: 300,
                title: '3차 추출',
                description: '마지막 물을 부어주세요',
                water: '140ml',
            },
            {
                time: 360,
                title: '완료',
                description: '모든 물이 떨어질 때까지 기다리세요',
                water: '0ml',
            },
        ],
    },
    {
        id: 2,
        name: '팀 웬델보의 에어로프레스 레시피',
        totalTime: 180,
        coffee: '17g',
        water: '250ml',
        description:
            '2005년 월드 바리스타 챔피언 팀 웬델보의 에어로프레스 레시피입니다. 빠르고 간편하면서도 풍부한 맛을 제공합니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 30,
                title: '물 붓기',
                description: '모든 물을 한 번에 부어주세요',
                water: '250ml',
            },
            {
                time: 60,
                title: '저어주기',
                description: '10초간 부드럽게 저어주세요',
                water: '0ml',
            },
            {
                time: 120,
                title: '대기',
                description: '추출이 진행되도록 기다리세요',
                water: '0ml',
            },
            {
                time: 180,
                title: '프레스',
                description: '천천히 일정한 압력으로 눌러주세요',
                water: '0ml',
            },
        ],
    },
    {
        id: 3,
        name: '스콧 라오의 V60 어드밴스드',
        totalTime: 300,
        coffee: '22g',
        water: '350ml',
        description:
            '커피 과학자 스콧 라오의 고급 V60 레시피입니다. 정밀한 추출로 커피의 모든 풍미를 끌어냅니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 45,
                title: '블루밍',
                description: '정밀하게 44ml의 물을 부어 45초간 기다리세요',
                water: '44ml',
            },
            {
                time: 90,
                title: '1차 추출',
                description: '중앙에서 시작해 바깥쪽으로 천천히 부어주세요',
                water: '100ml',
            },
            {
                time: 150,
                title: '2차 추출',
                description: '일정한 속도로 물을 부어주세요',
                water: '100ml',
            },
            {
                time: 210,
                title: '3차 추출',
                description: '마지막 물을 부어주세요',
                water: '106ml',
            },
            {
                time: 300,
                title: '완료',
                description: '모든 물이 떨어질 때까지 기다리세요',
                water: '0ml',
            },
        ],
    },
    {
        id: 4,
        name: '매트 퍼거의 스탬프타운 레시피',
        totalTime: 270,
        coffee: '25g',
        water: '400ml',
        description:
            '스탬프타운 커피의 창립자 매트 퍼거의 시그니처 레시피입니다. 밝고 산뜻한 산미가 특징입니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 30,
                title: '블루밍',
                description: '50ml의 물을 부어 30초간 기다리세요',
                water: '50ml',
            },
            {
                time: 90,
                title: '1차 추출',
                description: '원을 그리며 천천히 부어주세요',
                water: '150ml',
            },
            {
                time: 180,
                title: '2차 추출',
                description: '중앙에서 바깥쪽으로 부어주세요',
                water: '120ml',
            },
            {
                time: 240,
                title: '3차 추출',
                description: '마지막 물을 부어주세요',
                water: '80ml',
            },
            {
                time: 270,
                title: '완료',
                description: '드리핑 완료까지 기다리세요',
                water: '0ml',
            },
        ],
    },
    {
        id: 5,
        name: '조지 하웰의 클래식 드립',
        totalTime: 330,
        coffee: '28g',
        water: '450ml',
        description:
            '스페셜티 커피의 아버지 조지 하웰의 클래식 드립 레시피입니다. 전통적이면서도 완벽한 균형을 자랑합니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 45,
                title: '블루밍',
                description: '커피 가루를 충분히 적셔주세요',
                water: '56ml',
            },
            {
                time: 120,
                title: '1차 추출',
                description: '천천히 물을 부어주세요',
                water: '150ml',
            },
            {
                time: 210,
                title: '2차 추출',
                description: '일정한 속도를 유지해주세요',
                water: '150ml',
            },
            {
                time: 270,
                title: '3차 추출',
                description: '마지막 물을 부어주세요',
                water: '94ml',
            },
            {
                time: 330,
                title: '완료',
                description: '모든 추출이 완료될 때까지 기다리세요',
                water: '0ml',
            },
        ],
    },
    {
        id: 6,
        name: '피트 리치몬드의 칼리타 웨이브',
        totalTime: 285,
        coffee: '21g',
        water: '340ml',
        description:
            '칼리타 웨이브 전문가 피트 리치몬드의 레시피입니다. 안정적이고 일관된 추출이 가능합니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 30,
                title: '블루밍',
                description: '42ml의 물을 부어 30초간 기다리세요',
                water: '42ml',
            },
            {
                time: 90,
                title: '1차 추출',
                description: '중앙에서 시작해 천천히 부어주세요',
                water: '120ml',
            },
            {
                time: 180,
                title: '2차 추출',
                description: '일정한 속도로 부어주세요',
                water: '120ml',
            },
            {
                time: 240,
                title: '3차 추출',
                description: '마지막 물을 부어주세요',
                water: '58ml',
            },
            {
                time: 285,
                title: '완료',
                description: '드리핑 완료까지 기다리세요',
                water: '0ml',
            },
        ],
    },
    {
        id: 7,
        name: '안드레아 안토누치의 이탈리안 스타일',
        totalTime: 255,
        coffee: '24g',
        water: '380ml',
        description:
            '이탈리아의 마스터 바리스타 안드레아 안토누치의 이탈리안 스타일 드립 레시피입니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 30,
                title: '블루밍',
                description: '48ml의 물을 부어 30초간 기다리세요',
                water: '48ml',
            },
            {
                time: 90,
                title: '1차 추출',
                description: '이탈리안 스타일로 빠르게 부어주세요',
                water: '140ml',
            },
            {
                time: 180,
                title: '2차 추출',
                description: '중간 속도로 부어주세요',
                water: '120ml',
            },
            {
                time: 225,
                title: '3차 추출',
                description: '마지막 물을 부어주세요',
                water: '72ml',
            },
            {
                time: 255,
                title: '완료',
                description: '추출 완료까지 기다리세요',
                water: '0ml',
            },
        ],
    },
    {
        id: 8,
        name: '사샤 세스틱의 월드 챔피언 레시피',
        totalTime: 315,
        coffee: '26g',
        water: '420ml',
        description:
            '2015년 월드 바리스타 챔피언 사샤 세스틱의 우승 레시피입니다. 복잡하면서도 조화로운 맛의 층을 경험할 수 있습니다.',
        image: '/api/placeholder/300/200',
        steps: [
            {
                time: 45,
                title: '블루밍',
                description: '정밀하게 52ml의 물을 부어 45초간 기다리세요',
                water: '52ml',
            },
            {
                time: 120,
                title: '1차 추출',
                description: '챔피언급 정밀함으로 부어주세요',
                water: '140ml',
            },
            {
                time: 210,
                title: '2차 추출',
                description: '일정한 리듬을 유지하며 부어주세요',
                water: '140ml',
            },
            {
                time: 270,
                title: '3차 추출',
                description: '마지막 물을 정교하게 부어주세요',
                water: '88ml',
            },
            {
                time: 315,
                title: '완료',
                description: '완벽한 추출 완료까지 기다리세요',
                water: '0ml',
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
