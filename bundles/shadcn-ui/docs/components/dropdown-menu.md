# Dropdown Menu

Displays a menu of actions or options triggered by a button.

Built on [Radix UI DropdownMenu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu).

## Installation

```bash
npx shadcn@latest add dropdown-menu
```

## Import

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
```

## Basic Usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Settings
        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## With Icons

```tsx
import { User, CreditCard, Settings, LogOut } from "lucide-react"

<DropdownMenuContent>
  <DropdownMenuItem>
    <User className="mr-2 h-4 w-4" />
    Profile
  </DropdownMenuItem>
  <DropdownMenuItem>
    <CreditCard className="mr-2 h-4 w-4" />
    Billing
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Settings className="mr-2 h-4 w-4" />
    Settings
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem>
    <LogOut className="mr-2 h-4 w-4" />
    Log out
  </DropdownMenuItem>
</DropdownMenuContent>
```

## Checkbox Items

```tsx
function CheckboxMenuDemo() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Appearance</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        checked={showStatusBar}
        onCheckedChange={setShowStatusBar}
      >
        Status Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showActivityBar}
        onCheckedChange={setShowActivityBar}
      >
        Activity Bar
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem
        checked={showPanel}
        onCheckedChange={setShowPanel}
      >
        Panel
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  )
}
```

## Radio Group Items

```tsx
function RadioMenuDemo() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  )
}
```

## Sub-Menus

```tsx
<DropdownMenuContent>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <UserPlus className="mr-2 h-4 w-4" />
      Invite users
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuItem>
          <Mail className="mr-2 h-4 w-4" />
          Email
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PlusCircle className="mr-2 h-4 w-4" />
          More...
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</DropdownMenuContent>
```

## Disabled Items

```tsx
<DropdownMenuItem disabled>
  Restricted Action
</DropdownMenuItem>
```

## Item with onSelect

```tsx
<DropdownMenuItem onSelect={() => navigator.clipboard.writeText(id)}>
  Copy ID
</DropdownMenuItem>

{/* Prevent menu from closing on select */}
<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
  Keep Open
</DropdownMenuItem>
```

## Content Alignment

```tsx
<DropdownMenuContent align="start">Left-aligned</DropdownMenuContent>
<DropdownMenuContent align="center">Center-aligned</DropdownMenuContent>
<DropdownMenuContent align="end">Right-aligned</DropdownMenuContent>
```

## Accessibility

- Full keyboard navigation: Arrow keys to move, Enter/Space to select, Escape to close.
- Type-ahead support: typing characters jumps to matching items.
- Items with `disabled` are focusable but not selectable.
- The trigger button should have meaningful text or `aria-label`.
