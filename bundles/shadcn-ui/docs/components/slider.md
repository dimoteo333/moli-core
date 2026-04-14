# Slider

An input that allows users to select a value from a range by dragging a thumb.

Built on [Radix UI Slider](https://www.radix-ui.com/primitives/docs/components/slider).

## Installation

```bash
npx shadcn@latest add slider
```

## Import

```tsx
import { Slider } from "@/components/ui/slider"
```

## Basic Usage

```tsx
<Slider defaultValue={[50]} max={100} step={1} />
```

## Controlled

```tsx
function ControlledSlider() {
  const [value, setValue] = React.useState([50])

  return (
    <div className="space-y-2">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
    </div>
  )
}
```

## With Label

```tsx
<div className="space-y-2">
  <div className="flex justify-between">
    <Label>Volume</Label>
    <span className="text-sm text-muted-foreground">75%</span>
  </div>
  <Slider defaultValue={[75]} max={100} step={1} />
</div>
```

## Min and Max

```tsx
<Slider defaultValue={[25]} min={0} max={100} step={1} />
```

## Custom Step

```tsx
{/* Step of 10 */}
<Slider defaultValue={[50]} max={100} step={10} />

{/* Step of 0.1 for precision */}
<Slider defaultValue={[0.5]} max={1} step={0.1} />
```

## Range Slider (Two Thumbs)

Pass an array with two values:

```tsx
function RangeSlider() {
  const [range, setRange] = React.useState([25, 75])

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label>Price Range</Label>
        <span className="text-sm text-muted-foreground">
          ${range[0]} - ${range[1]}
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={setRange}
        min={0}
        max={100}
        step={1}
      />
    </div>
  )
}
```

## Disabled

```tsx
<Slider defaultValue={[50]} max={100} disabled />
```

## Custom Sizing

```tsx
<Slider defaultValue={[50]} max={100} className="w-[60%]" />
<Slider defaultValue={[50]} max={100} className="w-full max-w-sm" />
```

## Orientation

```tsx
<Slider
  defaultValue={[50]}
  max={100}
  orientation="vertical"
  className="h-[200px]"
/>
```

## With Tick Marks

```tsx
function SliderWithTicks() {
  const ticks = [0, 25, 50, 75, 100]

  return (
    <div className="space-y-2">
      <Slider defaultValue={[50]} max={100} step={25} />
      <div className="flex justify-between px-1">
        {ticks.map((tick) => (
          <span key={tick} className="text-xs text-muted-foreground">{tick}</span>
        ))}
      </div>
    </div>
  )
}
```

## TypeScript Props

```typescript
interface SliderProps {
  value?: number[]
  defaultValue?: number[]
  onValueChange?(value: number[]): void
  onValueCommit?(value: number[]): void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
  minStepsBetweenThumbs?: number
  name?: string
}
```

Note: `onValueCommit` fires when the user releases the thumb (on pointer up), useful for expensive operations you want to defer.

## Accessibility

- Keyboard navigation: Arrow keys adjust value by one step, Page Up/Down by larger increments, Home/End jump to min/max.
- Each thumb is focusable and has `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow`.
- Use a `Label` or `aria-label` to describe the slider's purpose.
