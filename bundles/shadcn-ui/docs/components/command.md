# Command

A command palette / search interface for filtering and selecting from a list of actions.

Built on [cmdk](https://cmdk.paco.me/) by Paco Coursey.

## Installation

```bash
npx shadcn@latest add command
```

## Import

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
```

## Basic Usage

```tsx
<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## Command Dialog (Cmd+K)

```tsx
function CommandPalette() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            Search Emoji
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
```

## With Actions

```tsx
<CommandItem onSelect={() => runCommand("calendar")}>
  <Calendar className="mr-2 h-4 w-4" />
  Open Calendar
</CommandItem>
```

The `onSelect` callback fires when the user selects an item (click or Enter).

## Filtering

cmdk includes built-in fuzzy filtering. Items are automatically filtered as the user types. You can customize filtering:

```tsx
{/* Custom filter */}
<Command filter={(value, search) => {
  if (value.includes(search)) return 1
  return 0
}}>
  ...
</Command>

{/* Disable filtering (for async search) */}
<Command shouldFilter={false}>
  <CommandInput onValueChange={(value) => fetchResults(value)} />
  <CommandList>
    {results.map((result) => (
      <CommandItem key={result.id} value={result.name}>
        {result.name}
      </CommandItem>
    ))}
  </CommandList>
</Command>
```

## As Combobox (with Popover)

```tsx
function Combobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "nuxt", label: "Nuxt" },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

## Accessibility

- Full keyboard navigation with arrow keys, Enter to select, Escape to close.
- Built-in search filtering with screen reader announcements for result counts.
- `CommandDialog` wraps in a Dialog with proper focus trapping.
