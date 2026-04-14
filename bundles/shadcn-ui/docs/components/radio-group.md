# Radio Group

A set of checkable buttons where only one can be checked at a time.

Built on [Radix UI RadioGroup](https://www.radix-ui.com/primitives/docs/components/radio-group).

## Installation

```bash
npx shadcn@latest add radio-group
```

## Import

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
```

## Basic Usage

```tsx
<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>
```

## Controlled

```tsx
function ControlledRadioGroup() {
  const [value, setValue] = React.useState("option-1")

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="opt1" />
        <Label htmlFor="opt1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="opt2" />
        <Label htmlFor="opt2">Option 2</Label>
      </div>
    </RadioGroup>
  )
}
```

## Horizontal Layout

```tsx
<RadioGroup defaultValue="left" className="flex space-x-4">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="left" id="left" />
    <Label htmlFor="left">Left</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="center" id="center" />
    <Label htmlFor="center">Center</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="right" id="right" />
    <Label htmlFor="right">Right</Label>
  </div>
</RadioGroup>
```

## With Description

```tsx
<RadioGroup defaultValue="free">
  <div className="flex items-start space-x-3 rounded-md border p-4">
    <RadioGroupItem value="free" id="free" className="mt-1" />
    <div className="grid gap-1">
      <Label htmlFor="free" className="font-medium">Free</Label>
      <p className="text-sm text-muted-foreground">
        Basic features for personal use.
      </p>
    </div>
  </div>
  <div className="flex items-start space-x-3 rounded-md border p-4">
    <RadioGroupItem value="pro" id="pro" className="mt-1" />
    <div className="grid gap-1">
      <Label htmlFor="pro" className="font-medium">Pro — $9/month</Label>
      <p className="text-sm text-muted-foreground">
        Advanced features for professionals.
      </p>
    </div>
  </div>
  <div className="flex items-start space-x-3 rounded-md border p-4">
    <RadioGroupItem value="enterprise" id="enterprise" className="mt-1" />
    <div className="grid gap-1">
      <Label htmlFor="enterprise" className="font-medium">Enterprise</Label>
      <p className="text-sm text-muted-foreground">
        Custom solutions for large teams.
      </p>
    </div>
  </div>
</RadioGroup>
```

## Disabled

```tsx
<RadioGroup defaultValue="option-1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-1" id="d1" />
    <Label htmlFor="d1">Available</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-2" id="d2" disabled />
    <Label htmlFor="d2" className="text-muted-foreground">Disabled</Label>
  </div>
</RadioGroup>
```

## With react-hook-form

```tsx
<FormField
  control={form.control}
  name="type"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Notification preference</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className="flex flex-col space-y-1"
        >
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="all" />
            </FormControl>
            <FormLabel className="font-normal">All notifications</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="mentions" />
            </FormControl>
            <FormLabel className="font-normal">Mentions only</FormLabel>
          </FormItem>
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value="none" />
            </FormControl>
            <FormLabel className="font-normal">None</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## TypeScript Props

```typescript
interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
  disabled?: boolean
  required?: boolean
  orientation?: "horizontal" | "vertical"
  name?: string
}
```

## Accessibility

- Arrow keys navigate between radio items within the group.
- Space selects the focused item.
- Only one item can be selected at a time.
- The group uses `role="radiogroup"` with proper `aria-checked` on each item.
- Each item should be paired with a `Label` for screen reader support.
