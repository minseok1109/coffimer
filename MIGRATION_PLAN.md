# Coffimer 앱 전환 마이그레이션 계획

## 개요

현재 Next.js 기반의 Coffimer 웹 애플리케이션을 모바일 앱으로 전환하기 위한 상세 계획입니다. Expo, expo-router, Solito, Tamagui를 활용하여 크로스 플랫폼 유니버설 앱으로 전환합니다.

## 현재 프로젝트 분석

### 기술 스택 (현재)
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript (strict mode)
- **스타일링**: TailwindCSS + ShadCN 컴포넌트
- **아이콘**: Lucide React
- **패키지 매니저**: Bun

### 핵심 기능 분석
- 커피 레시피 타이머 애플리케이션
- 단계별 가이드 및 타이머 기능
- 7개 레시피 데이터 (RecipeStep 인터페이스)
- 커스텀 훅 기반 타이머 로직 (useRecipeTimer)
- 알림 기능 (useNotification)
- 반응형 모바일 우선 디자인

### 마이그레이션 대상 코드
- `/lib/recipes.ts` - 레시피 데이터 및 인터페이스
- `/app/recipe/[id]/hooks/useRecipeTimer.ts` - 타이머 로직
- `/app/recipe/[id]/hooks/useNotification.ts` - 알림 시스템
- 모든 UI 컴포넌트 (CurrentStep, TimerDisplay, etc.)

## 목표 기술 스택 (최신 2024-2025)

### 핵심 프레임워크
- **Expo SDK 52** (2024년 11월 최신)
  - New Architecture 기본 활성화
  - React Native 0.76/0.77 지원
  - React Server Components 프리뷰
- **Expo Router v5** (file-based routing)
  - React Navigation v7 통합
  - Server Functions & API Routes
  - 향상된 웹 통합
- **Solito 4** (2024년 최신)
  - Next.js App Router 지원
  - 크로스 플랫폼 네비게이션
  - 단일 코드베이스
- **Tamagui** (2024년 최신)
  - 30-40% 성능 향상
  - 유니버설 디자인 시스템
  - TypeScript 우선 접근법

## 단계별 마이그레이션 계획

### Phase 1: 개발 환경 설정 (1-2일)

#### 1.1 새 모노레포 구조 생성
```bash
npx create-tamagui-app@latest coffimer-universal
```

#### 1.2 패키지 구조 설정
```
coffimer-universal/
├── apps/
│   ├── expo/          # React Native 앱
│   └── next/          # Next.js 웹앱
├── packages/
│   ├── ui/            # 공유 UI 컴포넌트 (Tamagui)
│   ├── app/           # 공유 앱 로직
│   └── config/        # 공유 설정
└── package.json
```

#### 1.3 핵심 의존성 설치
- Expo SDK 52
- Expo Router v5  
- Solito 4
- Tamagui 최신 버전
- React Native 0.76+

### Phase 2: 공유 로직 마이그레이션 (2-3일)

#### 2.1 데이터 레이어 이전
- `packages/app/data/recipes.ts`로 `lib/recipes.ts` 이전
- TypeScript 인터페이스 유지
- 크로스 플랫폼 호환성 확인

#### 2.2 비즈니스 로직 이전
- `packages/app/hooks/useRecipeTimer.ts` 생성
- React Native와 웹 모두에서 작동하도록 수정
- `useNotification` 훅을 플랫폼별로 분기 처리

#### 2.3 유틸리티 함수 이전
- `packages/app/utils/` 생성
- 시간 변환, 레시피 로직 등 공유

### Phase 3: UI 컴포넌트 변환 (3-4일)

#### 3.1 Tamagui 디자인 시스템 구축
- 기존 ShadCN 컴포넌트를 Tamagui로 변환
- `packages/ui/components/` 구조 생성
- 테마 시스템 설정 (light/dark mode)

#### 3.2 핵심 컴포넌트 변환
```typescript
// 변환할 컴포넌트들
- CurrentStep -> packages/ui/CurrentStep
- TimerDisplay -> packages/ui/TimerDisplay  
- TimerControls -> packages/ui/TimerControls
- RecipeInfo -> packages/ui/RecipeInfo
- StepsOverview -> packages/ui/StepsOverview
```

#### 3.3 반응형 레이아웃 구현
- Tamagui의 반응형 시스템 활용
- 모바일/웹 최적화

### Phase 4: 네비게이션 시스템 (2일)

#### 4.1 Expo Router 구조 설정
```
apps/expo/app/
├── (tabs)/
│   ├── index.tsx      # 홈 화면
│   └── recipes/
│       └── [id].tsx   # 레시피 상세
└── _layout.tsx
```

#### 4.2 Solito 통합
- 공유 네비게이션 로직 구현
- 웹과 모바일 간 동일한 라우팅

### Phase 5: 플랫폼별 기능 구현 (2-3일)

#### 5.1 알림 시스템 개선
- React Native: expo-notifications 활용
- 웹: Web Push API 또는 브라우저 알림
- 오디오 재생: expo-av (모바일), Web Audio API (웹)

#### 5.2 백그라운드 타이머
- React Native: expo-background-fetch
- 웹: Service Worker 활용

#### 5.3 앱 아이콘 및 스플래시 스크린
- Expo 설정을 통한 네이티브 앱 브랜딩

### Phase 6: 성능 최적화 및 테스트 (2일)

#### 6.1 번들 최적화
- Tamagui 컴파일러 활성화
- Tree shaking 설정
- 플랫폼별 코드 분할

#### 6.2 테스트 환경 구축
- Jest + React Native Testing Library
- E2E 테스트 (Detox)
- 웹 테스트 환경 유지

### Phase 7: 배포 준비 (1-2일)

#### 7.1 빌드 설정
- EAS Build 설정
- 웹 배포 설정 (Vercel/Netlify)

#### 7.2 앱스토어 준비
- iOS App Store Connect 설정
- Google Play Console 설정
- 메타데이터 및 스크린샷 준비

## 주요 고려사항

### 기술적 도전과제

1. **상태 관리**
   - 현재: 로컬 state + 커스텀 훅
   - 제안: Zustand 또는 Jotai로 통합된 상태 관리

2. **스타일링 마이그레이션**
   - TailwindCSS → Tamagui 변환
   - CSS Variables → Tamagui 테마 시스템

3. **타이머 정확성**
   - 백그라운드 실행 보장
   - 플랫폼별 타이머 동기화

### 성능 최적화

1. **번들 크기**
   - Tamagui 컴파일러로 30-40% 성능 향상 기대
   - 플랫폼별 코드 분할

2. **메모리 사용량**
   - 타이머 최적화
   - 불필요한 리렌더 방지

### 사용자 경험

1. **네이티브 느낌**
   - 플랫폼별 네이티브 컴포넌트 활용
   - 햅틱 피드백 (진동) 추가

2. **오프라인 지원**
   - 레시피 데이터 로컬 저장
   - 오프라인 타이머 기능

## 위험 요소 및 대응책

### 높은 위험도
1. **Tamagui 러닝 커브**
   - 대응: 단계적 마이그레이션, 기존 TailwindCSS와 병행

2. **New Architecture 호환성**
   - 대응: 라이브러리 호환성 사전 검증

### 중간 위험도
1. **알림 시스템 복잡성**
   - 대응: 플랫폼별 폴백 구현

2. **성능 회귀**
   - 대응: 각 단계별 성능 벤치마크

## 예상 일정

- **총 기간**: 2-3주
- **개발자**: 1명 (풀타임)
- **주요 마일스톤**:
  - Week 1: 환경 설정 + 로직 마이그레이션
  - Week 2: UI 컴포넌트 + 네비게이션
  - Week 3: 최적화 + 배포 준비

## 성공 지표

1. **기능성**: 모든 기존 기능 동일하게 작동
2. **성능**: 로딩 시간 30% 개선 (Tamagui 컴파일러)
3. **사용성**: 네이티브 앱 경험 제공
4. **유지보수성**: 단일 코드베이스로 개발 효율성 향상

## 결론

이 마이그레이션 계획은 최신 2024-2025 기술 스택을 활용하여 Coffimer를 고성능 크로스 플랫폼 앱으로 전환하는 체계적인 로드맵을 제공합니다. 단계별 접근을 통해 리스크를 최소화하고 안정적인 전환을 보장합니다.