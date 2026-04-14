# Avatar

An image element with a fallback for representing the user.

Built on [Radix UI Avatar](https://www.radix-ui.com/primitives/docs/components/avatar).

## Installation

```bash
npx shadcn@latest add avatar
```

## Import

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
```

## Basic Usage

```tsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

## With Fallback

The fallback displays while the image is loading, or if the image fails to load:

```tsx
{/* Initials fallback */}
<Avatar>
  <AvatarImage src="/broken-image.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

{/* Icon fallback */}
<Avatar>
  <AvatarFallback>
    <User className="h-4 w-4" />
  </AvatarFallback>
</Avatar>
```

## Sizes

The default Avatar is `h-10 w-10`. Customize with `className`:

```tsx
{/* Small */}
<Avatar className="h-6 w-6">
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback className="text-xs">U</AvatarFallback>
</Avatar>

{/* Default */}
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>U</AvatarFallback>
</Avatar>

{/* Large */}
<Avatar className="h-14 w-14">
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback className="text-lg">U</AvatarFallback>
</Avatar>

{/* Extra large */}
<Avatar className="h-20 w-20">
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback className="text-2xl">U</AvatarFallback>
</Avatar>
```

## Avatar Group

```tsx
<div className="flex -space-x-4">
  <Avatar className="border-2 border-background">
    <AvatarImage src="/user1.jpg" alt="User 1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="/user2.jpg" alt="User 2" />
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarImage src="/user3.jpg" alt="User 3" />
    <AvatarFallback>U3</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>+3</AvatarFallback>
  </Avatar>
</div>
```

## With Name and Info

```tsx
<div className="flex items-center gap-3">
  <Avatar>
    <AvatarImage src="/avatar.jpg" alt="Sofia Davis" />
    <AvatarFallback>SD</AvatarFallback>
  </Avatar>
  <div>
    <p className="text-sm font-medium leading-none">Sofia Davis</p>
    <p className="text-sm text-muted-foreground">sofia@example.com</p>
  </div>
</div>
```

## With Status Indicator

```tsx
<div className="relative">
  <Avatar>
    <AvatarImage src="/avatar.jpg" alt="User" />
    <AvatarFallback>U</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
</div>
```

## Fallback Colors

```tsx
<Avatar>
  <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback className="bg-blue-500 text-white">CD</AvatarFallback>
</Avatar>
```

## TypeScript Props

```typescript
// Avatar extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
// AvatarImage extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
// AvatarFallback extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
```

`AvatarImage` accepts an `onLoadingStatusChange` callback:

```tsx
<AvatarImage
  src="/avatar.jpg"
  onLoadingStatusChange={(status) => {
    // status: "idle" | "loading" | "loaded" | "error"
  }}
/>
```

## Accessibility

- Always provide `alt` text on `AvatarImage`.
- The component renders as a `<span>` with `role="img"` when only a fallback is shown.
- Fallback text (e.g., initials) is accessible to screen readers.
