# Button

Displays a button or a component that looks like a button.

## Installation

```bash
npx shadcn@latest add button
```

## Import

```tsx
import { Button } from "@/components/ui/button"
```

## Basic Usage

```tsx
export default function ButtonDemo() {
  return <Button>Click me</Button>
}
```

## Variants

The `variant` prop controls the visual style:

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

| Variant | Description |
|---------|-------------|
| `default` | Primary action, solid background with `bg-primary` |
| `destructive` | Dangerous actions like delete, solid `bg-destructive` |
| `outline` | Bordered button with transparent background |
| `secondary` | Secondary action with `bg-secondary` |
| `ghost` | No border or background until hovered |
| `link` | Renders as an underlined text link |

## Sizes

The `size` prop controls the button dimensions:

```tsx
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <ChevronRight className="h-4 w-4" />
</Button>
```

| Size | Dimensions |
|------|-----------|
| `default` | `h-9 px-4 py-2` |
| `sm` | `h-8 px-3 text-xs` |
| `lg` | `h-10 px-8` |
| `icon` | `h-9 w-9` (square, for icon-only buttons) |

## With Icon

Icons are placed as children alongside text. They auto-size within the button:

```tsx
import { Mail, Loader2, ChevronRight } from "lucide-react"

// Icon before text
<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>

// Icon after text
<Button>
  Next <ChevronRight className="ml-2 h-4 w-4" />
</Button>

// Icon only
<Button variant="outline" size="icon">
  <ChevronRight className="h-4 w-4" />
</Button>
```

## Loading State

Disable the button and show a spinner to indicate loading:

```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Please wait
</Button>
```

Pattern for async actions:

```tsx
function SubmitButton() {
  const [loading, setLoading] = React.useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      await saveData()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? "Saving..." : "Save"}
    </Button>
  )
}
```

## As Child (Composition)

Use the `asChild` prop to render the button styles on a different element. This uses Radix UI's `Slot` component to merge props onto the child:

```tsx
import Link from "next/link"

<Button asChild>
  <Link href="/login">Login</Link>
</Button>

<Button asChild variant="link">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>
</Button>
```

## Disabled State

```tsx
<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled Outline</Button>
```

Disabled buttons receive `pointer-events: none` and reduced opacity.

## Button as Submit

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit">Submit</Button>
</form>
```

## Custom Styling

Override or extend styles with `className`:

```tsx
<Button className="w-full">Full Width</Button>
<Button className="rounded-full">Rounded</Button>
<Button className="bg-blue-600 hover:bg-blue-700">Custom Color</Button>
```

## Button Group Pattern

```tsx
<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>Confirm</Button>
</div>

{/* With join style */}
<div className="flex">
  <Button variant="outline" className="rounded-r-none">Left</Button>
  <Button variant="outline" className="rounded-none border-x-0">Center</Button>
  <Button variant="outline" className="rounded-l-none">Right</Button>
</div>
```

## TypeScript Props

```typescript
import { type VariantProps } from "class-variance-authority"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
```

The component forwards all native `<button>` HTML attributes (e.g., `onClick`, `type`, `disabled`, `aria-label`).

## Accessibility

- Uses native `<button>` element by default, which is keyboard focusable and activatable with Enter/Space.
- Always provide a text label or `aria-label` for icon-only buttons.
- The `disabled` attribute is properly forwarded to the native element.
- When using `asChild` with `<a>`, ensure the link has meaningful text for screen readers.

```tsx
// Icon-only button with accessible label
<Button variant="outline" size="icon" aria-label="Go to next page">
  <ChevronRight className="h-4 w-4" />
</Button>
```
