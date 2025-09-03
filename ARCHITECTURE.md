# Next.js Architecture Guide - MinuteMade

## Overview

This document outlines the proper Next.js architecture implemented in the MinuteMade project, following industry best practices for component organization, loading states, and layouts.

## Project Structure

```
app/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── LoadingSpinner.tsx
│   │   ├── Skeleton.tsx
│   │   ├── ProfileCardSkeleton.tsx
│   │   ├── ProfilePageSkeleton.tsx
│   │   ├── NavbarSkeleton.tsx
│   │   ├── SettingsPageSkeleton.tsx
│   │   └── index.ts     # Re-exports
│   ├── layouts/         # Layout components
│   │   ├── PageLayout.tsx
│   │   ├── CardLayout.tsx
│   │   └── index.ts     # Re-exports
│   └── [other-components].tsx
├── profile/
│   ├── page.tsx         # Profile page
│   ├── loading.tsx      # Route-level loading UI
│   └── setting/
│       ├── page.tsx     # Settings page
│       └── loading.tsx  # Settings loading UI
├── publicprofile/
│   ├── page.tsx         # Public profile page
│   └── loading.tsx      # Public profile loading UI
└── layout.tsx           # Root layout
```

## Architecture Principles

### 1. Component Organization

#### UI Components (`/components/ui/`)

- **Purpose**: Reusable, atomic UI components
- **Characteristics**:
  - No business logic
  - Highly configurable through props
  - Consistent design system
  - TypeScript interfaces for all props

**Examples:**

- `LoadingSpinner`: Configurable spinner with size and color variants
- `Skeleton`: Generic skeleton loader with customizable dimensions
- `ProfileCardSkeleton`: Specialized skeleton for profile cards

#### Layout Components (`/components/layouts/`)

- **Purpose**: Structural components that provide consistent layouts
- **Characteristics**:
  - Handle common layout patterns
  - Configurable spacing, backgrounds, containers
  - Reusable across different pages

**Examples:**

- `PageLayout`: Standard page wrapper with optional back button
- `CardLayout`: Consistent card styling with configurable padding/shadows

### 2. Next.js Loading States

#### Route-Level Loading (`loading.tsx`)

Next.js automatically shows `loading.tsx` when navigating to a route. This provides:

- **Instant feedback** during navigation
- **Consistent UX** across all routes
- **Automatic handling** by Next.js router

```typescript
// app/profile/loading.tsx
import { ProfilePageSkeleton } from "../components/ui";

export default function Loading() {
  return <ProfilePageSkeleton />;
}
```

#### Component-Level Loading

For loading states within components (e.g., form submissions):

```typescript
// Inside a component
if (loading) {
  return <LoadingSpinner size="md" color="gray" />;
}
```

### 3. Benefits of This Architecture

#### Developer Experience

- **Consistent patterns** across the codebase
- **Easy to maintain** - loading logic centralized
- **Type safety** with TypeScript interfaces
- **Reusable components** reduce code duplication

#### User Experience

- **Fast perceived performance** with immediate loading states
- **Consistent visual language** across all loading states
- **Smooth transitions** between states
- **Professional polish** with proper skeleton screens

#### Next.js Best Practices

- **Leverages Next.js features** like automatic loading.tsx handling
- **Server-side rendering friendly** - no hydration mismatches
- **File-based routing** with proper loading boundaries
- **Component co-location** with related loading states

### 4. Usage Examples

#### Using UI Components

```typescript
// Import from centralized index
import { LoadingSpinner, ProfileCardSkeleton } from "./components/ui";

// Configurable usage
<LoadingSpinner size="lg" color="white" />
<ProfileCardSkeleton showBackButton={false} cardSize="lg" />
```

#### Using Layout Components

```typescript
import { PageLayout, CardLayout } from "./components/layouts";

// Consistent page structure
<PageLayout
  showBackButton={true}
  backButtonHref="/dashboard"
  containerMaxWidth="4xl"
>
  <CardLayout padding="lg" shadow="md">
    {content}
  </CardLayout>
</PageLayout>;
```

#### Route-Level Loading

Simply create `loading.tsx` files alongside your `page.tsx`:

```
app/
├── dashboard/
│   ├── page.tsx      # Dashboard content
│   └── loading.tsx   # Shows while page loads
└── profile/
    ├── page.tsx      # Profile content
    └── loading.tsx   # Shows while profile loads
```

## Migration Benefits

### Before (React-style approach):

- Repeated loading logic in every component
- Inconsistent loading states across the app
- Manual handling of all loading scenarios
- Difficult to maintain consistent UX

### After (Next.js-style approach):

- Centralized, reusable loading components
- Automatic route-level loading handling
- Consistent design system
- Easy to maintain and extend

## Best Practices

1. **Always use route-level loading.tsx** for page navigation states
2. **Component-level loading** only for internal state changes
3. **Consistent skeleton shapes** that match final content layout
4. **Configurable components** with sensible defaults
5. **TypeScript interfaces** for all props and configurations
6. **Centralized exports** through index.ts files
7. **Co-locate related components** (loading with pages)

This architecture ensures the MinuteMade project follows modern Next.js patterns while providing an excellent developer and user experience.
