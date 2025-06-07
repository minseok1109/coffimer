# Coffimer 앱 전환 구현 가이드

## 시작하기

### 1. 새 프로젝트 생성

```bash
# Tamagui 기반 유니버설 앱 생성
npx create-tamagui-app@latest coffimer-universal

# 또는 Solito 스타터 사용
npx create-solito-app@latest coffimer-universal
```

### 2. 필수 의존성 설치

```bash
# 프로젝트 루트에서
bun add @tamagui/core @tamagui/config @tamagui/animations-react-native
bun add expo-router@latest expo@~52.0.0 solito@latest
bun add expo-notifications expo-av expo-splash-screen expo-font
bun add react-native-gesture-handler react-native-reanimated
```

## 프로젝트 구조 설정

### 모노레포 구조
```
coffimer-universal/
├── apps/
│   ├── expo/                 # React Native 앱
│   │   ├── app/
│   │   │   ├── (tabs)/
│   │   │   │   ├── index.tsx
│   │   │   │   └── recipes/
│   │   │   │       └── [id].tsx
│   │   │   └── _layout.tsx
│   │   ├── app.json
│   │   └── package.json
│   └── next/                 # Next.js 웹앱
│       ├── app/
│       │   ├── page.tsx
│       │   └── recipes/
│       │       └── [id]/
│       │           └── page.tsx
│       ├── next.config.js
│       └── package.json
├── packages/
│   ├── ui/                   # 공유 UI 컴포넌트
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── CurrentStep.tsx
│   │   │   │   ├── TimerDisplay.tsx
│   │   │   │   ├── TimerControls.tsx
│   │   │   │   ├── RecipeInfo.tsx
│   │   │   │   └── StepsOverview.tsx
│   │   │   └── index.ts
│   │   └── package.json
│   ├── app/                  # 공유 앱 로직
│   │   ├── data/
│   │   │   └── recipes.ts
│   │   ├── hooks/
│   │   │   ├── useRecipeTimer.ts
│   │   │   └── useNotification.ts
│   │   ├── utils/
│   │   │   └── time.ts
│   │   └── package.json
│   └── config/               # 공유 설정
│       ├── tamagui.config.ts
│       └── package.json
└── package.json
```

## 핵심 구현

### 1. Tamagui 설정

#### `packages/config/tamagui.config.ts`
```typescript
import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

const tamaguiConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    // 커피 테마 추가
    coffee: {
      background: '#8B4513',
      backgroundHover: '#A0522D',
      color: '#FFFFFF',
      colorHover: '#F5F5DC',
    },
  },
  fonts: {
    ...config.fonts,
    // 한글 폰트 지원
    heading: {
      family: 'NotoSansKR',
      size: config.fonts.heading.size,
      weight: config.fonts.heading.weight,
    },
  },
})

export default tamaguiConfig
```

### 2. 공유 데이터 레이어

#### `packages/app/data/recipes.ts`
```typescript
// 기존 recipes.ts와 동일하지만 플랫폼별 이미지 처리 추가
export interface RecipeStep {
  time: number
  title: string
  description: string
  water: string
  totalWater?: number
}

export interface Recipe {
  id: number
  name: string
  totalTime: number
  coffee: string
  water: string
  waterTemperature: string
  dripper: string
  description: string
  image: string // 플랫폼별 처리 필요
  steps?: RecipeStep[]
}

// 플랫폼별 이미지 경로 처리
export const getImageSource = (imagePath: string) => {
  if (Platform.OS === 'web') {
    return imagePath
  }
  // React Native에서는 require 사용
  return require(`../../assets/images/${imagePath}`)
}
```

### 3. 크로스 플랫폼 타이머 훅

#### `packages/app/hooks/useRecipeTimer.ts`
```typescript
import { useState, useEffect, useCallback } from 'react'
import { Platform } from 'react-native'
import { Recipe } from '../data/recipes'
import { useNotification } from './useNotification'

const TIMER_INTERVAL_MS = 1000
const INITIAL_TIME = 0
const INITIAL_STEP = 0

interface UseRecipeTimerReturn {
  currentTime: number
  isRunning: boolean
  currentStep: number
  toggleTimer: () => void
  resetTimer: () => void
}

export const useRecipeTimer = (recipe: Recipe): UseRecipeTimerReturn => {
  const [currentTime, setCurrentTime] = useState(INITIAL_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP)
  const { sendNotification, initializeAudio } = useNotification()

  // 백그라운드 타이머 지원
  useEffect(() => {
    if (Platform.OS !== 'web') {
      // React Native에서 BackgroundTimer 사용
      const BackgroundJob = require('react-native-background-job')
      
      if (isRunning) {
        BackgroundJob.start({
          jobKey: 'coffeeTimer',
          period: TIMER_INTERVAL_MS,
        })
      } else {
        BackgroundJob.stop({ jobKey: 'coffeeTimer' })
      }
    }
  }, [isRunning])

  // 기존 타이머 로직 유지하되 플랫폼별 최적화
  useEffect(() => {
    if (!isRunning || currentTime >= recipe.totalTime || !recipe.steps) {
      return
    }

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime + 1

        // 단계 완료 체크 및 알림
        const completedStep = recipe.steps?.find((step) => step.time === newTime)
        if (completedStep) {
          sendNotification(
            `${completedStep.title} 완료`,
            `다음 단계를 진행하세요: ${completedStep.description}`
          )
        }

        // 현재 단계 업데이트
        let newCurrentStep = 0
        if (recipe.steps) {
          const passedSteps = recipe.steps.filter((step) => newTime > step.time).length
          newCurrentStep = Math.min(passedSteps, recipe.steps.length - 1)
        }

        if (newCurrentStep !== currentStep) {
          setCurrentStep(newCurrentStep)
        }

        return newTime
      })
    }, TIMER_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [isRunning, currentTime, recipe, currentStep])

  const toggleTimer = useCallback(() => {
    if (!isRunning) {
      initializeAudio()
    }
    setIsRunning((prev) => !prev)
  }, [isRunning, initializeAudio])

  const resetTimer = useCallback(() => {
    setCurrentTime(INITIAL_TIME)
    setIsRunning(false)
    setCurrentStep(INITIAL_STEP)
  }, [])

  return {
    currentTime,
    isRunning,
    currentStep,
    toggleTimer,
    resetTimer,
  }
}
```

### 4. 플랫폼별 알림 시스템

#### `packages/app/hooks/useNotification.ts`
```typescript
import { useCallback } from 'react'
import { Platform } from 'react-native'

export const useNotification = () => {
  const initializeAudio = useCallback(async () => {
    if (Platform.OS === 'web') {
      // 웹에서 오디오 초기화
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        await audioContext.resume()
      } catch (error) {
        console.warn('Audio initialization failed:', error)
      }
    } else {
      // React Native에서 expo-av 사용
      const { Audio } = require('expo-av')
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        })
      } catch (error) {
        console.warn('Audio setup failed:', error)
      }
    }
  }, [])

  const sendNotification = useCallback(async (title: string, body: string) => {
    if (Platform.OS === 'web') {
      // 웹 알림
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body })
      }
      
      // 오디오 재생
      const audio = new Audio('/alarm.mp3')
      audio.play().catch(console.warn)
    } else {
      // React Native 알림
      const { Notifications } = require('expo-notifications')
      
      await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: null, // 즉시 발송
      })

      // 오디오 재생
      const { Audio } = require('expo-av')
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/alarm.mp3')
      )
      await sound.playAsync()
    }
  }, [])

  return { initializeAudio, sendNotification }
}
```

### 5. Tamagui UI 컴포넌트

#### `packages/ui/src/components/TimerDisplay.tsx`
```typescript
import { YStack, Text, Circle, XStack } from '@tamagui/core'
import { formatTime } from '@coffimer/app/utils/time'

interface TimerDisplayProps {
  currentTime: number
  totalTime: number
  isRunning: boolean
}

export const TimerDisplay = ({ currentTime, totalTime, isRunning }: TimerDisplayProps) => {
  const progress = (currentTime / totalTime) * 100

  return (
    <YStack ai="center" jc="center" space="$4">
      {/* 원형 프로그레스 */}
      <Circle
        size="$20"
        borderWidth="$1"
        borderColor="$coffee"
        backgroundColor="$background"
        position="relative"
      >
        <Circle
          size="$19"
          backgroundColor="$coffee"
          opacity={progress / 100}
          position="absolute"
        />
        <Text 
          fontSize="$8" 
          fontWeight="bold" 
          color="$coffee"
          position="absolute"
        >
          {formatTime(currentTime)}
        </Text>
      </Circle>

      {/* 상태 표시 */}
      <XStack ai="center" space="$2">
        <Circle
          size="$1"
          backgroundColor={isRunning ? '$green10' : '$red10'}
        />
        <Text fontSize="$4" color="$color">
          {isRunning ? '진행 중' : '일시 정지'}
        </Text>
      </XStack>
    </YStack>
  )
}
```

#### `packages/ui/src/components/TimerControls.tsx`
```typescript
import { XStack, Button } from '@tamagui/core'
import { Play, Pause, RotateCcw } from '@tamagui/lucide-icons'

interface TimerControlsProps {
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
}

export const TimerControls = ({ isRunning, onToggle, onReset }: TimerControlsProps) => {
  return (
    <XStack space="$4" jc="center">
      <Button
        size="$6"
        theme="coffee"
        icon={isRunning ? Pause : Play}
        onPress={onToggle}
        circular
      >
        {isRunning ? '일시정지' : '시작'}
      </Button>
      
      <Button
        size="$6"
        variant="outlined"
        icon={RotateCcw}
        onPress={onReset}
        circular
      >
        리셋
      </Button>
    </XStack>
  )
}
```

### 6. Expo Router 설정

#### `apps/expo/app/_layout.tsx`
```typescript
import { Slot } from 'expo-router'
import { TamaguiProvider } from '@tamagui/core'
import tamaguiConfig from '@coffimer/config/tamagui.config'

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Slot />
    </TamaguiProvider>
  )
}
```

#### `apps/expo/app/(tabs)/recipes/[id].tsx`
```typescript
import { useLocalSearchParams } from 'expo-router'
import { YStack, ScrollView } from '@tamagui/core'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getRecipeById } from '@coffimer/app/data/recipes'
import { useRecipeTimer } from '@coffimer/app/hooks/useRecipeTimer'
import { 
  TimerDisplay, 
  TimerControls, 
  CurrentStep, 
  RecipeInfo,
  StepsOverview 
} from '@coffimer/ui'

export default function RecipePage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const recipeId = parseInt(id!, 10)
  const recipe = getRecipeById(recipeId)

  const { currentTime, isRunning, currentStep, toggleTimer, resetTimer } = useRecipeTimer(recipe!)

  if (!recipe) {
    return <Text>레시피를 찾을 수 없습니다</Text>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <YStack p="$4" space="$4">
          <RecipeInfo recipe={recipe} />
          <TimerDisplay 
            currentTime={currentTime}
            totalTime={recipe.totalTime}
            isRunning={isRunning}
          />
          <TimerControls
            isRunning={isRunning}
            onToggle={toggleTimer}
            onReset={resetTimer}
          />
          <CurrentStep 
            step={recipe.steps?.[currentStep]}
            stepNumber={currentStep + 1}
          />
          <StepsOverview
            steps={recipe.steps || []}
            currentStep={currentStep}
          />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
```

## 성능 최적화

### 1. Tamagui 컴파일러 설정

#### `apps/expo/babel.config.js`
```javascript
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        components: ['@tamagui/core'],
        config: './packages/config/tamagui.config.ts',
        logTimings: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
```

#### `apps/next/next.config.js`
```javascript
const { withTamagui } = require('@tamagui/next-plugin')

module.exports = withTamagui({
  config: './packages/config/tamagui.config.ts',
  components: ['@tamagui/core'],
  outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
})
```

### 2. 번들 크기 최적화

```typescript
// 컴포넌트별 지연 로딩
import { lazy, Suspense } from 'react'

const StepsOverview = lazy(() => import('./StepsOverview'))

// 사용 시
<Suspense fallback={<Text>로딩 중...</Text>}>
  <StepsOverview steps={steps} currentStep={currentStep} />
</Suspense>
```

## 배포 설정

### 1. EAS Build 설정

#### `apps/expo/eas.json`
```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### 2. 앱 설정

#### `apps/expo/app.json`
```json
{
  "expo": {
    "name": "Coffimer",
    "slug": "coffimer",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#8B4513"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.coffimer.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#8B4513"
      },
      "package": "com.coffimer.app"
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router",
      "expo-notifications",
      [
        "expo-av",
        {
          "microphonePermission": false
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

## 테스트 전략

### 1. 유닛 테스트

```typescript
// packages/app/hooks/__tests__/useRecipeTimer.test.ts
import { renderHook, act } from '@testing-library/react-hooks'
import { useRecipeTimer } from '../useRecipeTimer'

describe('useRecipeTimer', () => {
  const mockRecipe = {
    id: 1,
    totalTime: 60,
    steps: [
      { time: 30, title: 'Step 1', description: 'Test', water: '100ml' }
    ]
  }

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useRecipeTimer(mockRecipe))
    
    expect(result.current.currentTime).toBe(0)
    expect(result.current.isRunning).toBe(false)
    expect(result.current.currentStep).toBe(0)
  })

  it('should start and stop timer', () => {
    const { result } = renderHook(() => useRecipeTimer(mockRecipe))
    
    act(() => {
      result.current.toggleTimer()
    })
    
    expect(result.current.isRunning).toBe(true)
  })
})
```

### 2. E2E 테스트

```typescript
// e2e/timer.e2e.ts
import { device, element, by, expect } from 'detox'

describe('Timer functionality', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  it('should navigate to recipe and start timer', async () => {
    await element(by.text('테츠 카츠야의 4:6 레시피')).tap()
    await element(by.text('시작')).tap()
    
    await expect(element(by.text('일시정지'))).toBeVisible()
  })
})
```

## 트러블슈팅

### 1. 일반적인 문제들

#### Metro 번들러 이슈
```bash
# 캐시 클리어
npx expo start --clear

# Metro 설정 리셋
rm -rf node_modules
bun install
```

#### Tamagui 스타일 이슈
```typescript
// 플랫폼별 스타일 폴백
const styles = {
  ...Platform.select({
    web: { cursor: 'pointer' },
    default: {},
  }),
}
```

#### 알림 권한 문제
```typescript
// 앱 시작 시 권한 요청
useEffect(() => {
  (async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') {
      alert('알림 권한이 필요합니다!')
    }
  })()
}, [])
```

### 2. 성능 문제 해결

#### 타이머 지연 문제
```typescript
// 정확한 타이머를 위해 Date 기반 계산 사용
const startTime = useRef<number>()

useEffect(() => {
  if (isRunning && !startTime.current) {
    startTime.current = Date.now() - currentTime * 1000
  }
  
  if (!isRunning) {
    startTime.current = undefined
  }
}, [isRunning])

useEffect(() => {
  if (!isRunning || !startTime.current) return

  const interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime.current!) / 1000)
    setCurrentTime(elapsed)
  }, 100) // 더 자주 업데이트

  return () => clearInterval(interval)
}, [isRunning])
```

## 추가 고려사항

### 1. 접근성
- Screen reader 지원
- 색상 대비 최적화
- 큰 터치 영역

### 2. 국제화
- i18n 설정
- 다국어 폰트 지원
- RTL 레이아웃 지원

### 3. 오프라인 지원
- SQLite 또는 AsyncStorage
- 오프라인 첫 번째 아키텍처
- 동기화 전략

이 가이드를 따라 단계별로 구현하면 고품질의 크로스 플랫폼 Coffimer 앱을 성공적으로 개발할 수 있습니다.