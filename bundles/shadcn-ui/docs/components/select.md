# Select

Displays a dropdown list of options for the user to pick from.

Built on [Radix UI Select](https://www.radix-ui.com/primitives/docs/components/select).

## Installation

```bash
npx shadcn@latest add select
```

## Import

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

## Basic Usage

```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

## With Groups

```tsx
<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
      <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
      <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
      <SelectItem value="cet">Central European Time (CET)</SelectItem>
      <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Controlled Select

```tsx
function ControlledSelect() {
  const [value, setValue] = React.useState("")

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

## Default Value

```tsx
<Select defaultValue="banana">
  <SelectTrigger className="w-[180px]">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

## Disabled

```tsx
{/* Disabled entire select */}
<Select disabled>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Disabled" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>

{/* Disabled individual items */}
<SelectContent>
  <SelectItem value="active">Active</SelectItem>
  <SelectItem value="disabled" disabled>Disabled Option</SelectItem>
  <SelectItem value="another">Another Option</SelectItem>
</SelectContent>
```

## With Label

```tsx
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="framework">Framework</Label>
  <Select>
    <SelectTrigger id="framework">
      <SelectValue placeholder="Select framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="next">Next.js</SelectItem>
      <SelectItem value="remix">Remix</SelectItem>
      <SelectItem value="astro">Astro</SelectItem>
    </SelectContent>
  </Select>
</div>
```

## Content Positioning

```tsx
{/* Popper (dropdown) positioning — default */}
<SelectContent position="popper" sideOffset={4}>
  ...
</SelectContent>

{/* Item-aligned positioning */}
<SelectContent position="item-aligned">
  ...
</SelectContent>
```

## Scrollable Content

For long lists, `SelectContent` handles scrolling automatically. Control the max height:

```tsx
<SelectContent className="max-h-[200px]">
  {items.map((item) => (
    <SelectItem key={item.value} value={item.value}>
      {item.label}
    </SelectItem>
  ))}
</SelectContent>
```

## Multi-Select Pattern

Radix Select does not support multi-select natively. For multi-select, use a Popover with Checkboxes or the Command component:

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

function MultiSelect({ options, selected, onChange }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          {selected.length > 0 ? `${selected.length} selected` : "Select items"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2 p-1">
            <Checkbox
              checked={selected.includes(option.value)}
              onCheckedChange={(checked) => {
                onChange(checked
                  ? [...selected, option.value]
                  : selected.filter((v) => v !== option.value)
                )
              }}
            />
            <label className="text-sm">{option.label}</label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
```

## Accessibility

- Full keyboard navigation: Arrow keys, Home/End, type-ahead search.
- The trigger is focusable and activatable with Enter/Space.
- Screen readers announce the selected value and available options.
- Use `Label` with matching `id` on `SelectTrigger` for accessible labeling.
