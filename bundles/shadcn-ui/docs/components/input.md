# Input

Displays a form input field.

## Installation

```bash
npx shadcn@latest add input
```

## Import

```tsx
import { Input } from "@/components/ui/input"
```

## Basic Usage

```tsx
<Input type="text" placeholder="Enter your name" />
```

## With Label

```tsx
import { Label } from "@/components/ui/label"

<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Email" />
</div>
```

## Input Types

```tsx
<Input type="text" placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="search" placeholder="Search..." />
<Input type="tel" placeholder="Phone" />
<Input type="url" placeholder="https://example.com" />
<Input type="date" />
<Input type="time" />
<Input type="file" />
```

## File Input

```tsx
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="picture">Picture</Label>
  <Input id="picture" type="file" />
</div>
```

## Disabled

```tsx
<Input disabled type="email" placeholder="Email" />
```

## With Default Value

```tsx
<Input type="email" defaultValue="user@example.com" />
```

## Controlled Input

```tsx
function ControlledInput() {
  const [value, setValue] = React.useState("")

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type here..."
    />
  )
}
```

## With Icon

Using absolute positioning to place an icon inside the input:

```tsx
import { Search } from "lucide-react"

<div className="relative">
  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  <Input type="search" placeholder="Search..." className="pl-8" />
</div>
```

Right-side icon:

```tsx
import { Eye } from "lucide-react"

<div className="relative">
  <Input type="password" placeholder="Password" className="pr-10" />
  <button
    type="button"
    className="absolute right-2.5 top-2.5"
    onClick={togglePasswordVisibility}
  >
    <Eye className="h-4 w-4 text-muted-foreground" />
  </button>
</div>
```

## With Button

```tsx
<div className="flex w-full max-w-sm items-center space-x-2">
  <Input type="email" placeholder="Email" />
  <Button type="submit">Subscribe</Button>
</div>
```

## With Helper Text

```tsx
<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="shadcn" />
  <p className="text-sm text-muted-foreground">
    This is your public display name.
  </p>
</div>
```

## With Error State

```tsx
<div className="grid w-full max-w-sm gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="Email"
    className="border-destructive focus-visible:ring-destructive"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <p id="email-error" className="text-sm text-destructive">
    Please enter a valid email address.
  </p>
</div>
```

## TypeScript Props

```typescript
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
```

The component forwards all native `<input>` HTML attributes and a `ref`.

## Accessibility

- Always pair inputs with a `<Label>` using matching `htmlFor`/`id` attributes.
- Use `aria-invalid="true"` for inputs in an error state.
- Use `aria-describedby` to link error messages or helper text.
- The component includes proper focus ring styling via `focus-visible:ring`.
