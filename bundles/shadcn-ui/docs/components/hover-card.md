# Hover Card

A popup card that appears when hovering over a trigger element. Useful for previewing content like user profiles or link previews.

Built on [Radix UI HoverCard](https://www.radix-ui.com/primitives/docs/components/hover-card).

## Installation

```bash
npx shadcn@latest add hover-card
```

## Import

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
```

## Basic Usage

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@nextjs</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework — created and maintained by @vercel.
        </p>
        <div className="flex items-center pt-2">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-xs text-muted-foreground">Joined December 2021</span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

## Link Preview

```tsx
<HoverCard>
  <HoverCardTrigger asChild>
    <a href="https://ui.shadcn.com" className="underline" target="_blank" rel="noopener noreferrer">
      shadcn/ui
    </a>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">shadcn/ui</h4>
      <p className="text-sm text-muted-foreground">
        Beautifully designed components built with Radix UI and Tailwind CSS.
      </p>
    </div>
  </HoverCardContent>
</HoverCard>
```

## Controlled

```tsx
const [open, setOpen] = React.useState(false)

<HoverCard open={open} onOpenChange={setOpen}>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>Controlled content</HoverCardContent>
</HoverCard>
```

## Timing

```tsx
<HoverCard openDelay={200} closeDelay={100}>
  <HoverCardTrigger>Quick hover</HoverCardTrigger>
  <HoverCardContent>Appears faster</HoverCardContent>
</HoverCard>
```

## Content Alignment

```tsx
<HoverCardContent align="start">Left-aligned</HoverCardContent>
<HoverCardContent align="center">Center-aligned</HoverCardContent>
<HoverCardContent align="end">Right-aligned</HoverCardContent>
<HoverCardContent side="top">Above trigger</HoverCardContent>
<HoverCardContent side="right">Right of trigger</HoverCardContent>
```

## TypeScript Props

```typescript
interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  openDelay?: number   // Default: 700ms
  closeDelay?: number  // Default: 300ms
}

interface HoverCardContentProps {
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}
```

## Accessibility

- The hover card is for supplementary content only — do not put essential information or interactive elements inside.
- Content is not accessible to keyboard-only users by default (hover-only trigger).
- For critical content, use a Popover or Tooltip instead.
- The content has `role="tooltip"` and is linked via `aria-describedby`.
