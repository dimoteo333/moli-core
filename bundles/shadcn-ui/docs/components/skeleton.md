# Skeleton

A placeholder loading animation used to indicate content that is being loaded.

## Installation

```bash
npx shadcn@latest add skeleton
```

## Import

```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

## Basic Usage

```tsx
<Skeleton className="h-4 w-[250px]" />
```

## Common Patterns

### Card Skeleton

```tsx
function CardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

### Profile Skeleton

```tsx
function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

### Table Skeleton

```tsx
function TableSkeleton() {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex space-x-4">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-8 flex-1" />
      </div>
      {/* Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-6 w-[100px]" />
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="h-6 flex-1" />
        </div>
      ))}
    </div>
  )
}
```

### Feed/List Skeleton

```tsx
function FeedSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      ))}
    </div>
  )
}
```

## With Data Loading

```tsx
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUser(userId)

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  )
}
```

## Shapes

```tsx
{/* Rectangle (default) */}
<Skeleton className="h-4 w-[200px]" />

{/* Circle */}
<Skeleton className="h-12 w-12 rounded-full" />

{/* Rounded rectangle */}
<Skeleton className="h-[125px] w-[250px] rounded-xl" />

{/* Full width */}
<Skeleton className="h-4 w-full" />
```

## Custom Animation

The default skeleton uses a pulse animation. You can override via CSS:

```tsx
{/* Slower pulse */}
<Skeleton className="h-4 w-[200px] animate-pulse duration-[2s]" />
```

## TypeScript Props

```typescript
// Skeleton is a simple div with animation styling
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
}
```

## Accessibility

- Skeletons are purely decorative and have no semantic meaning.
- Use `aria-busy="true"` on the parent container while loading.
- Use `aria-live="polite"` on the container so screen readers announce when content loads.

```tsx
<div aria-busy={isLoading} aria-live="polite">
  {isLoading ? <CardSkeleton /> : <ActualCard data={data} />}
</div>
```
