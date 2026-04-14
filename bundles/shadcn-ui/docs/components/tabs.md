# Tabs

A set of layered content sections, known as tab panels, displayed one at a time.

Built on [Radix UI Tabs](https://www.radix-ui.com/primitives/docs/components/tabs).

## Installation

```bash
npx shadcn@latest add tabs
```

## Import

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

## Basic Usage

```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Make changes to your account here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Change your password here.</p>
  </TabsContent>
</Tabs>
```

## With Cards

```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Make changes to your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  </TabsContent>
  <TabsContent value="password">
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  </TabsContent>
</Tabs>
```

## Controlled

```tsx
function ControlledTabs() {
  const [activeTab, setActiveTab] = React.useState("tab1")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  )
}
```

## Disabled Tab

```tsx
<TabsList>
  <TabsTrigger value="active">Active</TabsTrigger>
  <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
  <TabsTrigger value="another">Another</TabsTrigger>
</TabsList>
```

## Full Width Tabs

```tsx
<TabsList className="w-full">
  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
  <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
  <TabsTrigger value="reports" className="flex-1">Reports</TabsTrigger>
</TabsList>
```

## With Icons

```tsx
import { User, Settings, Bell } from "lucide-react"

<TabsList>
  <TabsTrigger value="profile">
    <User className="mr-2 h-4 w-4" />
    Profile
  </TabsTrigger>
  <TabsTrigger value="settings">
    <Settings className="mr-2 h-4 w-4" />
    Settings
  </TabsTrigger>
  <TabsTrigger value="notifications">
    <Bell className="mr-2 h-4 w-4" />
    Notifications
  </TabsTrigger>
</TabsList>
```

## TypeScript Props

```typescript
interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
  orientation?: "horizontal" | "vertical"
  activationMode?: "automatic" | "manual"
}
```

- `automatic` (default): tabs activate on focus (arrow key navigation selects).
- `manual`: tabs activate on click/Enter only.

## Accessibility

- Arrow keys navigate between tabs.
- Tab content is associated with its trigger via `aria-controls`/`aria-labelledby`.
- Only the active panel is visible; inactive panels are hidden from assistive technology.
- Tab triggers use `role="tab"`, the list uses `role="tablist"`, and panels use `role="tabpanel"`.
