# Toast

Displays a brief, temporary notification message.

shadcn/ui uses [Sonner](https://sonner.emilkowal.dev/) by Emil Kowalski as the toast library.

## Installation

```bash
npx shadcn@latest add sonner
```

## Setup

Add the `<Toaster />` component to your root layout:

```tsx
// app/layout.tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

## Import

```tsx
import { toast } from "sonner"
```

## Basic Usage

```tsx
function ToastDemo() {
  return (
    <Button onClick={() => toast("Event has been created")}>
      Show Toast
    </Button>
  )
}
```

## Toast Types

```tsx
// Default
toast("Event has been created")

// Success
toast.success("Successfully saved!")

// Error
toast.error("Something went wrong")

// Warning
toast.warning("Disk space running low")

// Info
toast.info("New update available")

// Loading
toast.loading("Loading data...")
```

## With Description

```tsx
toast("Event created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
})
```

## With Action

```tsx
toast("Event deleted", {
  action: {
    label: "Undo",
    onClick: () => undoDelete(),
  },
})
```

## With Close Button

```tsx
toast("Message sent", {
  closeButton: true,
})

// Or globally on Toaster
<Toaster closeButton />
```

## Custom Duration

```tsx
// Duration in milliseconds
toast("Quick notification", { duration: 2000 })

// Persistent (no auto-dismiss)
toast("Important notice", { duration: Infinity })
```

## Promise Toast

```tsx
toast.promise(saveData(), {
  loading: "Saving...",
  success: "Data saved!",
  error: "Error saving data",
})

// With dynamic messages
toast.promise(fetchData(), {
  loading: "Loading data...",
  success: (data) => `Loaded ${data.length} items`,
  error: (err) => `Error: ${err.message}`,
})
```

## Custom Styling

```tsx
toast("Custom styled toast", {
  style: {
    background: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    border: "none",
  },
})
```

## Dismiss Toast

```tsx
// Dismiss a specific toast
const toastId = toast("Loading...")
toast.dismiss(toastId)

// Dismiss all toasts
toast.dismiss()
```

## Custom JSX Content

```tsx
toast.custom((t) => (
  <div className="flex items-center gap-2 rounded-lg bg-background p-4 shadow-lg border">
    <CheckCircle className="h-5 w-5 text-green-500" />
    <div>
      <p className="font-medium">Upload Complete</p>
      <p className="text-sm text-muted-foreground">File.pdf uploaded successfully</p>
    </div>
    <button onClick={() => toast.dismiss(t)} className="ml-auto">
      <X className="h-4 w-4" />
    </button>
  </div>
))
```

## Toaster Configuration

```tsx
<Toaster
  position="bottom-right"    // Position on screen
  expand={false}             // Expand toasts by default
  richColors                 // Enable rich colors for types
  closeButton                // Show close button on all toasts
  duration={4000}            // Default duration
  theme="system"             // "light" | "dark" | "system"
  toastOptions={{
    className: "my-toast",
    style: { background: "var(--background)" },
  }}
/>
```

### Position Options

```tsx
<Toaster position="top-left" />
<Toaster position="top-center" />
<Toaster position="top-right" />
<Toaster position="bottom-left" />
<Toaster position="bottom-center" />
<Toaster position="bottom-right" />  {/* Default */}
```

## Accessibility

- Toasts are announced by screen readers via `aria-live` regions.
- Action buttons are focusable and keyboard-accessible.
- The close button dismisses the toast.
- Toasts auto-dismiss after a configurable duration; use `Infinity` for critical messages that require user action.
