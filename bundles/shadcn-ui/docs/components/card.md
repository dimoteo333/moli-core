# Card

Displays a card with header, content, and footer sections.

## Installation

```bash
npx shadcn@latest add card
```

## Import

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
```

## Basic Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

## Sub-Components

| Component | Element | Purpose |
|-----------|---------|---------|
| `Card` | `<div>` | Outer container with border, rounded corners, shadow |
| `CardHeader` | `<div>` | Top section with padding, contains title/description |
| `CardTitle` | `<h3>` | Main heading, rendered as `font-semibold leading-none` |
| `CardDescription` | `<p>` | Subtitle text, rendered in `text-muted-foreground` |
| `CardContent` | `<div>` | Main body area with horizontal padding |
| `CardFooter` | `<div>` | Bottom section, flex row with items centered |

## With Form

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Name of your project" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="framework">Framework</Label>
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="next">Next.js</SelectItem>
              <SelectItem value="sveltekit">SvelteKit</SelectItem>
              <SelectItem value="astro">Astro</SelectItem>
              <SelectItem value="nuxt">Nuxt.js</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

## Notification Card

```tsx
import { BellRing, Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"

<Card className="w-[380px]">
  <CardHeader>
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardContent className="grid gap-4">
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <BellRing className="h-4 w-4" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Push Notifications</p>
        <p className="text-sm text-muted-foreground">Send to device.</p>
      </div>
      <Switch />
    </div>
    {notifications.map((notification) => (
      <div key={notification.title} className="grid grid-cols-[25px_1fr] items-start pb-4 last:pb-0">
        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{notification.title}</p>
          <p className="text-sm text-muted-foreground">{notification.description}</p>
        </div>
      </div>
    ))}
  </CardContent>
  <CardFooter>
    <Button className="w-full">
      <Check className="mr-2 h-4 w-4" /> Mark all as read
    </Button>
  </CardFooter>
</Card>
```

## Card Grid Layout

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>
    <CardHeader>
      <CardTitle>Revenue</CardTitle>
      <CardDescription>Total revenue this month</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">$15,231.89</p>
      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Subscriptions</CardTitle>
      <CardDescription>Active subscriptions</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">+2,350</p>
      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Active Now</CardTitle>
      <CardDescription>Current online users</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">+573</p>
      <p className="text-xs text-muted-foreground">+201 since last hour</p>
    </CardContent>
  </Card>
</div>
```

## Minimal Card (Content Only)

Not all sub-components are required:

```tsx
{/* Content only */}
<Card>
  <CardContent className="pt-6">
    <p>Simple card with just content.</p>
  </CardContent>
</Card>

{/* Header and content, no footer */}
<Card>
  <CardHeader>
    <CardTitle>Settings</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Adjust your preferences below.</p>
  </CardContent>
</Card>
```

Note: `CardContent` has no top padding by default (it inherits from `CardHeader`). When using `CardContent` without `CardHeader`, add `pt-6` for spacing.

## Interactive Card

Make the entire card clickable:

```tsx
<Card className="cursor-pointer transition-colors hover:bg-accent">
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
    <CardDescription>Click anywhere on this card</CardDescription>
  </CardHeader>
</Card>
```

Or wrap with a link:

```tsx
<a href="/details" className="block">
  <Card className="transition-shadow hover:shadow-lg">
    <CardHeader>
      <CardTitle>Linked Card</CardTitle>
    </CardHeader>
  </Card>
</a>
```

## Custom Styling

```tsx
{/* Bordered variant */}
<Card className="border-2 border-primary">
  <CardContent className="pt-6">Highlighted card</CardContent>
</Card>

{/* No shadow */}
<Card className="shadow-none">
  <CardContent className="pt-6">Flat card</CardContent>
</Card>

{/* With background */}
<Card className="bg-muted/50">
  <CardContent className="pt-6">Tinted card</CardContent>
</Card>
```

## TypeScript Props

All card sub-components extend `React.HTMLAttributes<HTMLDivElement>` and forward refs:

```typescript
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-xl border bg-card text-card-foreground shadow", className)} {...props} />
  )
)
```

You can pass any valid `<div>` attributes including `onClick`, `role`, `aria-*`, and `data-*` attributes.
