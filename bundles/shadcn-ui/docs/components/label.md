# Label

Renders an accessible label associated with a form control.

Built on [Radix UI Label](https://www.radix-ui.com/primitives/docs/components/label).

## Installation

```bash
npx shadcn@latest add label
```

## Import

```tsx
import { Label } from "@/components/ui/label"
```

## Basic Usage

```tsx
<Label htmlFor="email">Email</Label>
<Input type="email" id="email" placeholder="Email" />
```

## With Form Controls

```tsx
{/* With Input */}
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="Enter your name" />
</div>

{/* With Textarea */}
<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea id="message" placeholder="Type your message here." />
</div>

{/* With Checkbox */}
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

{/* With Switch */}
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>

{/* With RadioGroup */}
<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
</RadioGroup>
```

## Required Field Indicator

Add a visual required indicator:

```tsx
<Label htmlFor="email">
  Email <span className="text-destructive">*</span>
</Label>
<Input id="email" required />
```

## Disabled State

The label automatically applies `peer-disabled` styles when the associated control is disabled:

```tsx
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="disabled-input" className="text-muted-foreground">
    Disabled field
  </Label>
  <Input id="disabled-input" disabled placeholder="Can't edit this" />
</div>
```

## TypeScript Props

```typescript
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>
```

Extends all native `<label>` HTML attributes.

## Accessibility

- Clicking the label focuses the associated form control (via `htmlFor`/`id` pairing).
- Screen readers announce the label text when the associated control is focused.
- Always use `Label` rather than plain `<label>` to get consistent styling and Radix integration.
