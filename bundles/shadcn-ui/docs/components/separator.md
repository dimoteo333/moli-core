# Separator

Visually divides content with a horizontal or vertical line.

Built on [Radix UI Separator](https://www.radix-ui.com/primitives/docs/components/separator).

## Installation

```bash
npx shadcn@latest add separator
```

## Import

```tsx
import { Separator } from "@/components/ui/separator"
```

## Horizontal (Default)

```tsx
<div>
  <div className="space-y-1">
    <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
    <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</div>
```

## Vertical

```tsx
<div className="flex h-5 items-center space-x-4 text-sm">
  <div>Item 1</div>
  <Separator orientation="vertical" />
  <div>Item 2</div>
  <Separator orientation="vertical" />
  <div>Item 3</div>
</div>
```

## With Label

```tsx
<div className="relative">
  <Separator />
  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
    OR
  </span>
</div>
```

## In Lists

```tsx
<div className="space-y-0">
  {items.map((item, index) => (
    <React.Fragment key={item.id}>
      <div className="flex items-center justify-between py-3">
        <span>{item.name}</span>
        <span className="text-muted-foreground">{item.value}</span>
      </div>
      {index < items.length - 1 && <Separator />}
    </React.Fragment>
  ))}
</div>
```

## Custom Styling

```tsx
{/* Thicker */}
<Separator className="h-[2px]" />

{/* Colored */}
<Separator className="bg-primary" />

{/* Dashed (use border instead) */}
<div className="border-b border-dashed" />
```

## TypeScript Props

```typescript
interface SeparatorProps {
  orientation?: "horizontal" | "vertical"  // Default: "horizontal"
  decorative?: boolean  // Default: true
  className?: string
}
```

## Accessibility

- When `decorative` is `true` (default), the separator is hidden from screen readers (`role="none"`).
- When `decorative` is `false`, the separator has `role="separator"` and is announced by screen readers.
- Use `decorative={false}` when the separator conveys meaningful content boundaries.
