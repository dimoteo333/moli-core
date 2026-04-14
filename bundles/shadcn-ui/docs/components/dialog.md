# Dialog

A modal dialog that interrupts the user with important content and expects a response.

Built on [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog).

## Installation

```bash
npx shadcn@latest add dialog
```

## Import

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
```

## Basic Usage

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">Username</Label>
        <Input id="username" defaultValue="@peduarte" className="col-span-3" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Sub-Components

| Component | Purpose |
|-----------|---------|
| `Dialog` | Root — manages open/closed state |
| `DialogTrigger` | Button/element that opens the dialog |
| `DialogContent` | The modal panel (includes overlay and close button) |
| `DialogHeader` | Container for title and description |
| `DialogTitle` | Modal heading (required for accessibility) |
| `DialogDescription` | Descriptive text below the title |
| `DialogFooter` | Container for action buttons, aligned right |
| `DialogClose` | Explicit close button/element |

## Controlled Dialog

Manage open state externally:

```tsx
function ControlledDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>This dialog's state is controlled externally.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

## Without Trigger (Programmatic)

Open a dialog without a trigger element:

```tsx
function ProgrammaticDialog() {
  const [open, setOpen] = React.useState(false)

  // Open from anywhere
  const showDialog = () => setOpen(true)

  return (
    <>
      <Button onClick={showDialog}>Show Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Programmatic</DialogTitle>
            <DialogDescription>Opened via state, not a trigger.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

## With Form

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Create Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create account</DialogTitle>
      <DialogDescription>Enter your details to create a new account.</DialogDescription>
    </DialogHeader>
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Create</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

## Custom Close Button

```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle>Custom Close</DialogTitle>
  </DialogHeader>
  <p>Content here.</p>
  <DialogFooter>
    <DialogClose asChild>
      <Button variant="outline">Cancel</Button>
    </DialogClose>
    <DialogClose asChild>
      <Button>Done</Button>
    </DialogClose>
  </DialogFooter>
</DialogContent>
```

## Sizing

Control width with `className`:

```tsx
<DialogContent className="sm:max-w-[425px]">Small</DialogContent>
<DialogContent className="sm:max-w-[625px]">Medium</DialogContent>
<DialogContent className="sm:max-w-[825px]">Large</DialogContent>
<DialogContent className="sm:max-w-full">Full width</DialogContent>
```

## Scrollable Content

For long content, add overflow to the content area:

```tsx
<DialogContent className="max-h-[80vh]">
  <DialogHeader>
    <DialogTitle>Terms of Service</DialogTitle>
  </DialogHeader>
  <div className="overflow-y-auto max-h-[60vh] pr-4">
    {/* Long content */}
  </div>
  <DialogFooter>
    <Button>Accept</Button>
  </DialogFooter>
</DialogContent>
```

## Accessibility

- The dialog traps focus within the content when open.
- Pressing `Escape` closes the dialog.
- Clicking the overlay closes the dialog.
- `DialogTitle` is required — it provides an accessible name via `aria-labelledby`.
- `DialogDescription` provides additional context via `aria-describedby`.
- If you must hide the title visually, use the `VisuallyHidden` utility from Radix.

```tsx
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

<DialogHeader>
  <VisuallyHidden>
    <DialogTitle>Hidden but accessible title</DialogTitle>
  </VisuallyHidden>
</DialogHeader>
```
