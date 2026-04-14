# Popover

A floating panel that appears when clicking a trigger element.

Built on [Radix UI Popover](https://www.radix-ui.com/primitives/docs/components/popover).

## Installation

```bash
npx shadcn@latest add popover
```

## Import

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
```

## Basic Usage

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">Max. width</Label>
          <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

## Controlled

```tsx
function ControlledPopover() {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Toggle</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Controlled popover content.</p>
        <Button size="sm" onClick={() => setOpen(false)}>Close</Button>
      </PopoverContent>
    </Popover>
  )
}
```

## Positioning

```tsx
{/* Side */}
<PopoverContent side="top">Above trigger</PopoverContent>
<PopoverContent side="bottom">Below trigger (default)</PopoverContent>
<PopoverContent side="left">Left of trigger</PopoverContent>
<PopoverContent side="right">Right of trigger</PopoverContent>

{/* Alignment */}
<PopoverContent align="start">Left-aligned</PopoverContent>
<PopoverContent align="center">Center-aligned (default)</PopoverContent>
<PopoverContent align="end">Right-aligned</PopoverContent>

{/* Offset */}
<PopoverContent sideOffset={8}>More space from trigger</PopoverContent>
```

## With Arrow

```tsx
import { PopoverArrow } from "@radix-ui/react-popover"

<PopoverContent>
  <PopoverArrow className="fill-popover" />
  Content with arrow
</PopoverContent>
```

## Common Patterns

### Color Picker

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-[220px] justify-start">
      <div className="h-4 w-4 rounded-full mr-2" style={{ backgroundColor: color }} />
      {color}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-3">
    {/* Color picker grid */}
  </PopoverContent>
</Popover>
```

### Settings Panel

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" size="icon">
      <Settings className="h-4 w-4" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-4">
      <h4 className="font-medium">Settings</h4>
      <div className="flex items-center justify-between">
        <Label>Dark Mode</Label>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <Label>Notifications</Label>
        <Switch />
      </div>
    </div>
  </PopoverContent>
</Popover>
```

## TypeScript Props

```typescript
interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  modal?: boolean  // Default: false
}

interface PopoverContentProps {
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  onOpenAutoFocus?(event: Event): void
  onCloseAutoFocus?(event: Event): void
}
```

## Accessibility

- Clicking the trigger toggles the popover.
- Escape closes the popover.
- Focus is managed — first focusable element in content receives focus on open.
- Clicking outside the popover closes it.
- The trigger sets `aria-expanded` and `aria-controls`.
