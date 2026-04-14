# Tooltip

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

Built on [Radix UI Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip).

## Installation

```bash
npx shadcn@latest add tooltip
```

## Setup

Wrap your app with `TooltipProvider`:

```tsx
// app/layout.tsx or root component
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  )
}
```

## Import

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
```

## Basic Usage

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon">
      <Plus className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
```

## With Text Trigger

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <span className="underline decoration-dotted cursor-help">
      hover me
    </span>
  </TooltipTrigger>
  <TooltipContent>
    <p>Helpful information about this term.</p>
  </TooltipContent>
</Tooltip>
```

## Positioning

```tsx
<TooltipContent side="top">Above (default)</TooltipContent>
<TooltipContent side="bottom">Below</TooltipContent>
<TooltipContent side="left">Left</TooltipContent>
<TooltipContent side="right">Right</TooltipContent>

{/* Alignment */}
<TooltipContent align="start">Left-aligned</TooltipContent>
<TooltipContent align="center">Center-aligned (default)</TooltipContent>
<TooltipContent align="end">Right-aligned</TooltipContent>

{/* Offset */}
<TooltipContent sideOffset={8}>More space from trigger</TooltipContent>
```

## Delay

Configure delay on the `TooltipProvider`:

```tsx
<TooltipProvider delayDuration={200}>
  {/* Tooltips inside will appear after 200ms */}
</TooltipProvider>

{/* Or per-tooltip */}
<Tooltip delayDuration={0}>
  <TooltipTrigger>Instant</TooltipTrigger>
  <TooltipContent>No delay</TooltipContent>
</Tooltip>
```

## Skip Delay Group

When hovering between multiple tooltips quickly, use `skipDelayDuration` to show subsequent tooltips immediately:

```tsx
<TooltipProvider delayDuration={700} skipDelayDuration={300}>
  {/* First tooltip has 700ms delay, subsequent ones show faster */}
</TooltipProvider>
```

## Controlled

```tsx
const [open, setOpen] = React.useState(false)

<Tooltip open={open} onOpenChange={setOpen}>
  <TooltipTrigger>Controlled</TooltipTrigger>
  <TooltipContent>Controlled tooltip</TooltipContent>
</Tooltip>
```

## Common Patterns

### Icon Button Tooltips

```tsx
<div className="flex gap-2">
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon"><Bold className="h-4 w-4" /></Button>
    </TooltipTrigger>
    <TooltipContent>Bold (Ctrl+B)</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon"><Italic className="h-4 w-4" /></Button>
    </TooltipTrigger>
    <TooltipContent>Italic (Ctrl+I)</TooltipContent>
  </Tooltip>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon"><Underline className="h-4 w-4" /></Button>
    </TooltipTrigger>
    <TooltipContent>Underline (Ctrl+U)</TooltipContent>
  </Tooltip>
</div>
```

### Truncated Text with Tooltip

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <p className="max-w-[200px] truncate">
      This is a very long text that will be truncated
    </p>
  </TooltipTrigger>
  <TooltipContent>
    This is a very long text that will be truncated
  </TooltipContent>
</Tooltip>
```

## TypeScript Props

```typescript
interface TooltipProviderProps {
  delayDuration?: number        // Default: 700ms
  skipDelayDuration?: number    // Default: 300ms
  disableHoverableContent?: boolean
}

interface TooltipProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  delayDuration?: number
}

interface TooltipContentProps {
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}
```

## Accessibility

- Tooltip appears on hover and keyboard focus, hides on blur and mouse leave.
- Content is linked to trigger via `aria-describedby`.
- Tooltip does not trap focus — it is supplementary information only.
- Do not put interactive content (buttons, links) inside tooltips.
- For interactive floating content, use a `Popover` instead.
- Escape key dismisses the tooltip.
