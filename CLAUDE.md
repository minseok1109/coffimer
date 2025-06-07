# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Coffimer is a Next.js coffee brewing timer application that provides step-by-step guides for various professional coffee extraction recipes. The app tracks brewing time, displays current steps, and manages timer states for famous barista recipes.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: TailwindCSS + ShadCN components
- **Icons**: Lucide React
- **Package Manager**: Bun (see bun.lockb)
- **Development**: Uses standalone output for deployment

## Common Commands

```bash
# Development
bun dev                 # Start development server at localhost:3000
bun build              # Build for production
bun start              # Start production server
bun lint               # Run ESLint
bun format             # Format code with Prettier
```

## Project Architecture

### Core Structure
- `/app` - Next.js App Router pages and components
- `/lib` - Shared utilities and data (recipes, utils)
- `/app/_components` - Shared application components
- `/app/recipe/[id]` - Dynamic recipe pages with timer functionality

### Key Data Flow
1. **Recipe Data**: Centralized in `/lib/recipes.ts` with TypeScript interfaces for Recipe and RecipeStep
2. **Timer Logic**: Custom hook `useRecipeTimer` manages timer state, step progression, and time tracking
3. **Step Management**: Each recipe has timed steps with specific water amounts and instructions

### Recipe System
- Recipes contain steps with precise timing (in seconds)
- Each step has: time, title, description, water amount, and optional totalWater
- Timer progresses through steps automatically based on elapsed time
- Current step calculation: counts passed steps based on current time vs step times

### Component Architecture
- Recipe pages use specialized components: CurrentStep, TimerDisplay, TimerControls, RecipeInfo, StepsOverview
- Timer state managed through `useRecipeTimer` hook with start/stop/reset functionality
- Constants defined in `/app/recipe/[id]/constants.ts` for timer intervals and initial values

### State Management
- Local component state with custom hooks
- No global state management currently implemented
- Timer state isolated to recipe pages

### Styling Conventions
- Uses TailwindCSS with custom configuration
- ShadCN component library for UI consistency
- Korean language support (lang="ko" in layout)
- Mobile-first responsive design

### Development Guidelines
- Follow frontend rules in `.cursor/rules/frontend-rules.mdc` for code organization
- Prefer composition over props drilling
- Use descriptive naming for complex conditions and magic numbers
- Organize by feature/domain rather than just code type
- Maintain consistent return types for similar functions