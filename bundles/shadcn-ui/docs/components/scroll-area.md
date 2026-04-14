# Scroll Area

Augments native scroll functionality with a custom, styled scrollbar.

Built on [Radix UI ScrollArea](https://www.radix-ui.com/primitives/docs/components/scroll-area).

## Installation

```bash
npx shadcn@latest add scroll-area
```

## Import

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

## Basic Usage (Vertical)

```tsx
<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {tags.map((tag) => (
      <div key={tag} className="text-sm">{tag}</div>
    ))}
  </div>
</ScrollArea>
```

## Horizontal Scrolling

```tsx
<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {items.map((item) => (
      <figure key={item.id} className="shrink-0">
        <div className="overflow-hidden rounded-md">
          <img src={item.image} alt={item.title} className="h-[150px] w-[200px] object-cover" />
        </div>
        <figcaption className="pt-2 text-xs text-muted-foreground">
          {item.title}
        </figcaption>
      </figure>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

## Both Directions

```tsx
<ScrollArea className="h-[300px] w-[400px] rounded-md border p-4">
  <div className="w-[600px]">
    {/* Content wider and taller than container */}
    <table className="w-full">
      {/* Wide table content */}
    </table>
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
```

## Chat / Message List

```tsx
function MessageList({ messages }: { messages: Message[] }) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Scroll to bottom on new messages
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="mb-4">
          <p className="text-sm font-medium">{msg.author}</p>
          <p className="text-sm text-muted-foreground">{msg.content}</p>
        </div>
      ))}
      <div ref={scrollRef} />
    </ScrollArea>
  )
}
```

## Sidebar Navigation

```tsx
<ScrollArea className="h-screen">
  <div className="space-y-4 py-4">
    <div className="px-3 py-2">
      <h2 className="mb-2 px-4 text-lg font-semibold">Navigation</h2>
      <div className="space-y-1">
        {navItems.map((item) => (
          <Button key={item.href} variant="ghost" className="w-full justify-start">
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  </div>
</ScrollArea>
```

## TypeScript Props

```typescript
interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  // Inherits standard div props
}

interface ScrollBarProps {
  orientation?: "vertical" | "horizontal"  // Default: "vertical"
}
```

## Notes

- ScrollArea replaces the browser's native scrollbar with a styled overlay scrollbar.
- The native scrollbar is hidden but scroll behavior is preserved.
- The custom scrollbar only appears when content overflows.
- Touch scrolling works normally on mobile devices.
- Use `ScrollBar orientation="horizontal"` explicitly when you need horizontal scrolling.
