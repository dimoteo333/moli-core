# Progress

Displays a progress bar indicating completion status.

Built on [Radix UI Progress](https://www.radix-ui.com/primitives/docs/components/progress).

## Installation

```bash
npx shadcn@latest add progress
```

## Import

```tsx
import { Progress } from "@/components/ui/progress"
```

## Basic Usage

```tsx
<Progress value={33} />
```

## Controlled

```tsx
function ProgressDemo() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} />
}
```

## Determinate vs Indeterminate

```tsx
{/* Determinate — shows specific progress */}
<Progress value={45} />

{/* Indeterminate — no value, shows loading animation */}
<Progress />
```

## With Label

```tsx
function ProgressWithLabel({ value }: { value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading...</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  )
}
```

## Sizes

```tsx
{/* Thin */}
<Progress value={50} className="h-1" />

{/* Default */}
<Progress value={50} className="h-2" />

{/* Thick */}
<Progress value={50} className="h-4" />
```

## Custom Colors

```tsx
{/* Custom indicator color via CSS */}
<Progress value={75} className="[&>div]:bg-green-500" />
<Progress value={50} className="[&>div]:bg-blue-500" />
<Progress value={25} className="[&>div]:bg-yellow-500" />
<Progress value={90} className="[&>div]:bg-destructive" />
```

## Multi-Step Progress

```tsx
function StepProgress({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>
      <Progress value={(currentStep / totalSteps) * 100} />
    </div>
  )
}
```

## TypeScript Props

```typescript
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number  // 0-100, undefined for indeterminate
}
```

## Accessibility

- Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Indeterminate state (no value) omits `aria-valuenow`.
- Add `aria-label` or a visible label to describe what is in progress.

```tsx
<Progress value={45} aria-label="Upload progress" />
```
