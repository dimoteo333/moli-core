# Checkbox

A control that allows the user to toggle between checked and unchecked states.

Built on [Radix UI Checkbox](https://www.radix-ui.com/primitives/docs/components/checkbox).

## Installation

```bash
npx shadcn@latest add checkbox
```

## Import

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

## Basic Usage

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

## With Description

```tsx
<div className="items-top flex space-x-2">
  <Checkbox id="terms1" />
  <div className="grid gap-1.5 leading-none">
    <Label htmlFor="terms1">Accept terms and conditions</Label>
    <p className="text-sm text-muted-foreground">
      You agree to our Terms of Service and Privacy Policy.
    </p>
  </div>
</div>
```

## Controlled

```tsx
function ControlledCheckbox() {
  const [checked, setChecked] = React.useState<boolean>(false)

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="controlled"
        checked={checked}
        onCheckedChange={(value) => setChecked(value as boolean)}
      />
      <Label htmlFor="controlled">
        {checked ? "Checked" : "Unchecked"}
      </Label>
    </div>
  )
}
```

## Default Checked

```tsx
<Checkbox id="default-checked" defaultChecked />
```

## Disabled

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="disabled" disabled />
  <Label htmlFor="disabled" className="text-muted-foreground">
    Disabled option
  </Label>
</div>

<div className="flex items-center space-x-2">
  <Checkbox id="disabled-checked" disabled defaultChecked />
  <Label htmlFor="disabled-checked" className="text-muted-foreground">
    Disabled (checked)
  </Label>
</div>
```

## Indeterminate State

The indeterminate state is useful for "select all" checkboxes:

```tsx
function IndeterminateExample() {
  const [items, setItems] = React.useState([
    { id: "a", label: "Item A", checked: true },
    { id: "b", label: "Item B", checked: false },
    { id: "c", label: "Item C", checked: true },
  ])

  const allChecked = items.every((i) => i.checked)
  const someChecked = items.some((i) => i.checked) && !allChecked

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="select-all"
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={(checked) => {
            setItems(items.map((i) => ({ ...i, checked: !!checked })))
          }}
        />
        <Label htmlFor="select-all">Select All</Label>
      </div>
      <div className="ml-6 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={item.checked}
              onCheckedChange={(checked) => {
                setItems(items.map((i) =>
                  i.id === item.id ? { ...i, checked: !!checked } : i
                ))
              }}
            />
            <Label htmlFor={item.id}>{item.label}</Label>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## Checkbox Group

```tsx
function CheckboxGroup() {
  const [selected, setSelected] = React.useState<string[]>([])

  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ]

  function toggleOption(value: string) {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    )
  }

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={() => toggleOption(option.value)}
          />
          <Label htmlFor={option.value}>{option.label}</Label>
        </div>
      ))}
    </div>
  )
}
```

## With react-hook-form

```tsx
<FormField
  control={form.control}
  name="acceptTerms"
  render={({ field }) => (
    <FormItem className="flex items-center space-x-2">
      <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <FormLabel>Accept terms</FormLabel>
      <FormMessage />
    </FormItem>
  )}
/>
```

## TypeScript Props

```typescript
type CheckedState = boolean | "indeterminate"

interface CheckboxProps {
  checked?: CheckedState
  defaultChecked?: CheckedState
  onCheckedChange?(checked: CheckedState): void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
}
```

## Accessibility

- Toggles with Space key when focused.
- Supports `aria-label` or associated `Label` for screen readers.
- The indeterminate state is announced as "mixed" by screen readers.
- Uses `role="checkbox"` with proper `aria-checked` state.
