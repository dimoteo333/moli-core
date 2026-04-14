# Badge

Displays a small label or status indicator.

## Installation

```bash
npx shadcn@latest add badge
```

## Import

```tsx
import { Badge } from "@/components/ui/badge"
```

## Basic Usage

```tsx
<Badge>Badge</Badge>
```

## Variants

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
```

| Variant | Description |
|---------|-------------|
| `default` | Solid primary background |
| `secondary` | Muted secondary background |
| `outline` | Bordered with transparent background |
| `destructive` | Solid destructive/red background |

## As Link

```tsx
<Badge asChild>
  <a href="/status">Active</a>
</Badge>
```

## With Icon

```tsx
import { Check, X, AlertCircle } from "lucide-react"

<Badge>
  <Check className="mr-1 h-3 w-3" /> Verified
</Badge>

<Badge variant="destructive">
  <X className="mr-1 h-3 w-3" /> Failed
</Badge>

<Badge variant="outline">
  <AlertCircle className="mr-1 h-3 w-3" /> Pending
</Badge>
```

## Custom Colors

```tsx
{/* Success */}
<Badge className="bg-green-500 hover:bg-green-600">Active</Badge>

{/* Warning */}
<Badge className="bg-yellow-500 text-black hover:bg-yellow-600">Warning</Badge>

{/* Info */}
<Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
```

## Common Patterns

### Status Badges

```tsx
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    error: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {status}
    </Badge>
  )
}
```

### Count Badge

```tsx
<div className="relative inline-block">
  <Bell className="h-6 w-6" />
  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
    3
  </Badge>
</div>
```

### Tag List

```tsx
<div className="flex flex-wrap gap-1">
  {tags.map((tag) => (
    <Badge key={tag} variant="secondary">
      {tag}
      <button onClick={() => removeTag(tag)} className="ml-1">
        <X className="h-3 w-3" />
      </button>
    </Badge>
  ))}
</div>
```

## TypeScript Props

```typescript
interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}
```

## Accessibility

- Badge is a visual-only element by default (no semantic role).
- For interactive badges (links/buttons), use `asChild` with the appropriate element.
- Ensure color is not the only means of conveying information — include text or icons.
