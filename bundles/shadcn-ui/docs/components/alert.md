# Alert

Displays a callout message to attract user attention.

## Installation

```bash
npx shadcn@latest add alert
```

## Import

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
```

## Basic Usage

```tsx
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>
```

## Variants

### Default

```tsx
<Alert>
  <Terminal className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>
```

### Destructive

```tsx
<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

| Variant | Description |
|---------|-------------|
| `default` | Neutral alert with border, suitable for information |
| `destructive` | Red-tinted alert for errors and warnings |

## With Icon

Icons are placed as direct children of `Alert`, before the title:

```tsx
import { Terminal, AlertCircle, Info, CheckCircle2 } from "lucide-react"

{/* Info */}
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is an informational message.</AlertDescription>
</Alert>

{/* Success (custom styling) */}
<Alert className="border-green-500/50 text-green-600 [&>svg]:text-green-600">
  <CheckCircle2 className="h-4 w-4" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

{/* Warning (custom styling) */}
<Alert className="border-yellow-500/50 text-yellow-600 [&>svg]:text-yellow-600">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Your account is nearing its storage limit.</AlertDescription>
</Alert>
```

## Description Only

```tsx
<Alert>
  <AlertDescription>
    A simple alert without a title.
  </AlertDescription>
</Alert>
```

## With Action

```tsx
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Update available</AlertTitle>
  <AlertDescription className="flex items-center justify-between">
    <span>A new version is available for download.</span>
    <Button size="sm" variant="outline" className="ml-4">Update</Button>
  </AlertDescription>
</Alert>
```

## Dismissible Alert

```tsx
function DismissibleAlert() {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  return (
    <Alert className="relative">
      <Info className="h-4 w-4" />
      <AlertTitle>Notice</AlertTitle>
      <AlertDescription>This alert can be dismissed.</AlertDescription>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 top-2 rounded-md p-1 hover:bg-accent"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  )
}
```

## TypeScript Props

```typescript
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}
```

All sub-components extend `React.HTMLAttributes<HTMLElement>` with the appropriate element type.

## Accessibility

- Alert uses `role="alert"` which causes screen readers to announce the content immediately.
- For non-urgent messages, consider using `role="status"` instead via `className` override.
- Ensure icons have `aria-hidden="true"` (Lucide icons do this by default).
