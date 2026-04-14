# Switch

A toggle control that switches between on and off states.

Built on [Radix UI Switch](https://www.radix-ui.com/primitives/docs/components/switch).

## Installation

```bash
npx shadcn@latest add switch
```

## Import

```tsx
import { Switch } from "@/components/ui/switch"
```

## Basic Usage

```tsx
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

## Controlled

```tsx
function ControlledSwitch() {
  const [enabled, setEnabled] = React.useState(false)

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="controlled"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <Label htmlFor="controlled">{enabled ? "On" : "Off"}</Label>
    </div>
  )
}
```

## Default Checked

```tsx
<Switch defaultChecked />
```

## Disabled

```tsx
<Switch disabled />
<Switch disabled defaultChecked />
```

## With Description

```tsx
<div className="flex items-center justify-between rounded-lg border p-4">
  <div className="space-y-0.5">
    <Label htmlFor="marketing" className="text-base">Marketing emails</Label>
    <p className="text-sm text-muted-foreground">
      Receive emails about new products, features, and more.
    </p>
  </div>
  <Switch id="marketing" />
</div>
```

## Settings List Pattern

```tsx
<div className="space-y-4">
  {[
    { id: "notifications", label: "Push Notifications", desc: "Receive push notifications on your device." },
    { id: "emails", label: "Email Notifications", desc: "Receive email digests." },
    { id: "sms", label: "SMS Notifications", desc: "Receive text messages." },
  ].map((setting) => (
    <div key={setting.id} className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label htmlFor={setting.id}>{setting.label}</Label>
        <p className="text-sm text-muted-foreground">{setting.desc}</p>
      </div>
      <Switch id={setting.id} />
    </div>
  ))}
</div>
```

## With react-hook-form

```tsx
<FormField
  control={form.control}
  name="darkMode"
  render={({ field }) => (
    <FormItem className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">Dark Mode</FormLabel>
        <FormDescription>Enable dark mode for the application.</FormDescription>
      </div>
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
    </FormItem>
  )}
/>
```

## TypeScript Props

```typescript
interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?(checked: boolean): void
  disabled?: boolean
  required?: boolean
  name?: string
  value?: string
}
```

## Accessibility

- Toggles with Space key when focused.
- Uses `role="switch"` with `aria-checked`.
- Pair with `Label` for screen reader support.
