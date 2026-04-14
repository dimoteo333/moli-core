# Alert Dialog

A modal dialog that interrupts the user with important content and expects a confirmation response.

Unlike `Dialog`, `AlertDialog` requires explicit user action to dismiss — clicking the overlay does not close it.

Built on [Radix UI AlertDialog](https://www.radix-ui.com/primitives/docs/components/alert-dialog).

## Installation

```bash
npx shadcn@latest add alert-dialog
```

## Import

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

## Basic Usage

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## With Destructive Action

```tsx
<AlertDialogFooter>
  <AlertDialogCancel>Cancel</AlertDialogCancel>
  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
    Delete
  </AlertDialogAction>
</AlertDialogFooter>
```

## Controlled

```tsx
function ControlledAlertDialog() {
  const [open, setOpen] = React.useState(false)

  async function handleConfirm() {
    await deleteItem()
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete item?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## Async Confirmation Pattern

```tsx
function AsyncConfirmDialog() {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function handleConfirm(e: React.MouseEvent) {
    e.preventDefault() // Prevent dialog from closing
    setLoading(true)
    try {
      await performAction()
      setOpen(false)
    } catch (error) {
      // Handle error, dialog stays open
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Confirm Action</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={loading}>
            {loading ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## Dialog vs AlertDialog

| Feature | Dialog | AlertDialog |
|---------|--------|-------------|
| Close on overlay click | Yes | No |
| Close on Escape | Yes | Yes |
| Use case | Forms, info panels | Confirmations, destructive actions |
| Required actions | None | Cancel and Action buttons |

## TypeScript Props

```typescript
interface AlertDialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
}
```

## Accessibility

- Focus is trapped within the dialog when open.
- Escape closes the dialog (equivalent to Cancel).
- The overlay does not close the dialog, forcing explicit user choice.
- `AlertDialogTitle` is required for accessible naming.
- `AlertDialogDescription` provides additional context via `aria-describedby`.
- `AlertDialogCancel` receives initial focus by default.
