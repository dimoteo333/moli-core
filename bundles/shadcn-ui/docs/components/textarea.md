# Textarea

Displays a multi-line text input field.

## Installation

```bash
npx shadcn@latest add textarea
```

## Import

```tsx
import { Textarea } from "@/components/ui/textarea"
```

## Basic Usage

```tsx
<Textarea placeholder="Type your message here." />
```

## With Label

```tsx
import { Label } from "@/components/ui/label"

<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea id="message" placeholder="Type your message here." />
</div>
```

## With Helper Text

```tsx
<div className="grid w-full gap-1.5">
  <Label htmlFor="bio">Bio</Label>
  <Textarea id="bio" placeholder="Tell us a little about yourself" />
  <p className="text-sm text-muted-foreground">
    Your bio will be displayed on your public profile.
  </p>
</div>
```

## Disabled

```tsx
<Textarea placeholder="Disabled" disabled />
```

## Default Value

```tsx
<Textarea defaultValue="This is pre-filled content." />
```

## Controlled

```tsx
function ControlledTextarea() {
  const [value, setValue] = React.useState("")

  return (
    <div className="grid gap-1.5">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
      />
      <p className="text-sm text-muted-foreground">
        {value.length} characters
      </p>
    </div>
  )
}
```

## With Character Count

```tsx
function TextareaWithCounter({ maxLength = 500 }) {
  const [value, setValue] = React.useState("")

  return (
    <div className="grid gap-1.5">
      <Label htmlFor="limited">Message</Label>
      <Textarea
        id="limited"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
        placeholder="Type your message..."
      />
      <p className="text-sm text-muted-foreground text-right">
        {value.length}/{maxLength}
      </p>
    </div>
  )
}
```

## Auto-Resize

Auto-expanding textarea that grows with content:

```tsx
function AutoResizeTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  return (
    <Textarea
      ref={textareaRef}
      className="min-h-[80px] resize-none"
      onInput={adjustHeight}
      {...props}
    />
  )
}
```

## Custom Rows

```tsx
<Textarea rows={3} placeholder="Short area" />
<Textarea rows={10} placeholder="Tall area" />
```

## With Error State

```tsx
<div className="grid gap-1.5">
  <Label htmlFor="comment">Comment</Label>
  <Textarea
    id="comment"
    className="border-destructive focus-visible:ring-destructive"
    aria-invalid="true"
    aria-describedby="comment-error"
  />
  <p id="comment-error" className="text-sm text-destructive">
    Comment is required.
  </p>
</div>
```

## With Button

```tsx
<div className="grid w-full gap-2">
  <Textarea placeholder="Type your message here." />
  <Button>Send message</Button>
</div>
```

## TypeScript Props

```typescript
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
```

Forwards all native `<textarea>` attributes and a `ref`.

## Accessibility

- Always pair with a `<Label>` via `htmlFor`/`id`.
- Use `aria-invalid` and `aria-describedby` for error states.
- Includes focus ring styling via `focus-visible:ring`.
