# Toggle

A two-state button that can be toggled on or off.

Built on [Radix UI Toggle](https://www.radix-ui.com/primitives/docs/components/toggle).

## Installation

```bash
npx shadcn@latest add toggle
```

## Import

```tsx
import { Toggle } from "@/components/ui/toggle"
```

## Basic Usage

```tsx
<Toggle aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>
```

## Variants

```tsx
<Toggle variant="default" aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle variant="outline" aria-label="Toggle italic">
  <Italic className="h-4 w-4" />
</Toggle>
```

| Variant | Description |
|---------|-------------|
| `default` | Transparent background, accent on press |
| `outline` | Bordered button style |

## Sizes

```tsx
<Toggle size="default" aria-label="Toggle">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle size="sm" aria-label="Toggle">
  <Bold className="h-4 w-4" />
</Toggle>

<Toggle size="lg" aria-label="Toggle">
  <Bold className="h-4 w-4" />
</Toggle>
```

## With Text

```tsx
<Toggle aria-label="Toggle italic">
  <Italic className="mr-2 h-4 w-4" />
  Italic
</Toggle>
```

## Controlled

```tsx
function ControlledToggle() {
  const [pressed, setPressed] = React.useState(false)

  return (
    <Toggle
      pressed={pressed}
      onPressedChange={setPressed}
      aria-label="Toggle bold"
    >
      <Bold className="h-4 w-4" />
    </Toggle>
  )
}
```

## Default Pressed

```tsx
<Toggle defaultPressed aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>
```

## Disabled

```tsx
<Toggle disabled aria-label="Toggle">
  <Italic className="h-4 w-4" />
</Toggle>
```

## Toggle Group

For mutually exclusive or multi-select toggle groups, use `ToggleGroup`:

```bash
npx shadcn@latest add toggle-group
```

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

{/* Single selection */}
<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>

{/* Multiple selection */}
<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold" aria-label="Toggle bold">
    <Bold className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Toggle italic">
    <Italic className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Toggle underline">
    <Underline className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>
```

## Toolbar Pattern

```tsx
<div className="flex items-center gap-1 rounded-md border p-1">
  <ToggleGroup type="multiple" className="gap-0">
    <ToggleGroupItem value="bold" size="sm"><Bold className="h-4 w-4" /></ToggleGroupItem>
    <ToggleGroupItem value="italic" size="sm"><Italic className="h-4 w-4" /></ToggleGroupItem>
    <ToggleGroupItem value="underline" size="sm"><Underline className="h-4 w-4" /></ToggleGroupItem>
  </ToggleGroup>
  <Separator orientation="vertical" className="h-6" />
  <ToggleGroup type="single" defaultValue="left" className="gap-0">
    <ToggleGroupItem value="left" size="sm"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
    <ToggleGroupItem value="center" size="sm"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
    <ToggleGroupItem value="right" size="sm"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
  </ToggleGroup>
</div>
```

## TypeScript Props

```typescript
interface ToggleProps {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?(pressed: boolean): void
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  disabled?: boolean
}
```

## Accessibility

- Uses `aria-pressed` to indicate toggle state.
- Always provide `aria-label` for icon-only toggles.
- Activatable with Enter/Space when focused.
- In a ToggleGroup with `type="single"`, Arrow keys navigate between items.
