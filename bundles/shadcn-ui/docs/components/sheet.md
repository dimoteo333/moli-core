# Sheet

A panel that slides in from the edge of the screen. Also known as a side panel, drawer, or slide-over.

Built on [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) (uses the same accessibility primitives as Dialog).

## Installation

```bash
npx shadcn@latest add sheet
```

## Import

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
```

## Basic Usage

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input id="name" value="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">Username</Label>
        <Input id="username" value="@peduarte" className="col-span-3" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## Side Positions

```tsx
<SheetContent side="right">Right (default)</SheetContent>
<SheetContent side="left">Left</SheetContent>
<SheetContent side="top">Top</SheetContent>
<SheetContent side="bottom">Bottom</SheetContent>
```

## Controlled

```tsx
function ControlledSheet() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Controlled Sheet</SheetTitle>
        </SheetHeader>
        <p>Content here.</p>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </SheetContent>
    </Sheet>
  )
}
```

## Custom Size

```tsx
{/* Wider */}
<SheetContent className="w-[400px] sm:w-[540px]">
  ...
</SheetContent>

{/* Full width on mobile */}
<SheetContent className="w-full sm:max-w-lg">
  ...
</SheetContent>

{/* For top/bottom, control height */}
<SheetContent side="bottom" className="h-[400px]">
  ...
</SheetContent>
```

## Mobile Navigation Pattern

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle menu</span>
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-[300px]">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <nav className="grid gap-2 py-4">
      <a href="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent">
        <Home className="h-4 w-4" /> Home
      </a>
      <a href="/about" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent">
        <Info className="h-4 w-4" /> About
      </a>
      <a href="/contact" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent">
        <Mail className="h-4 w-4" /> Contact
      </a>
    </nav>
  </SheetContent>
</Sheet>
```

## Filter Panel Pattern

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline" size="sm">
      <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
    </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Filters</SheetTitle>
      <SheetDescription>Narrow down your results.</SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select><SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Price Range</Label>
        <Slider defaultValue={[0, 100]} min={0} max={500} step={10} />
      </div>
    </div>
    <SheetFooter>
      <Button variant="outline">Reset</Button>
      <SheetClose asChild>
        <Button>Apply Filters</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

## TypeScript Props

```typescript
interface SheetContentProps {
  side?: "top" | "right" | "bottom" | "left"  // Default: "right"
  className?: string
  children: React.ReactNode
}
```

## Accessibility

- Focus is trapped within the sheet when open.
- Escape closes the sheet.
- Clicking the overlay closes the sheet.
- `SheetTitle` provides the accessible name (required).
- `SheetDescription` provides additional context via `aria-describedby`.
- The close button (X) is included automatically in `SheetContent`.
