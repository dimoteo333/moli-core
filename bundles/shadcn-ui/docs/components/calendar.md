# Calendar

A date selection calendar component.

Built on [react-day-picker](https://react-day-picker.js.org/).

## Installation

```bash
npx shadcn@latest add calendar
```

## Import

```tsx
import { Calendar } from "@/components/ui/calendar"
```

## Basic Usage

```tsx
function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}
```

## Selection Modes

### Single Date

```tsx
const [date, setDate] = React.useState<Date | undefined>()

<Calendar mode="single" selected={date} onSelect={setDate} />
```

### Multiple Dates

```tsx
const [dates, setDates] = React.useState<Date[] | undefined>()

<Calendar mode="multiple" selected={dates} onSelect={setDates} />
```

### Date Range

```tsx
import { DateRange } from "react-day-picker"

const [range, setRange] = React.useState<DateRange | undefined>()

<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
```

## Disabled Dates

```tsx
{/* Disable past dates */}
<Calendar
  mode="single"
  disabled={{ before: new Date() }}
  selected={date}
  onSelect={setDate}
/>

{/* Disable future dates */}
<Calendar
  mode="single"
  disabled={{ after: new Date() }}
  selected={date}
  onSelect={setDate}
/>

{/* Disable specific dates */}
<Calendar
  mode="single"
  disabled={[
    new Date(2024, 0, 1),
    new Date(2024, 11, 25),
    { dayOfWeek: [0, 6] }, // Disable weekends
  ]}
  selected={date}
  onSelect={setDate}
/>

{/* Disable date range */}
<Calendar
  mode="single"
  disabled={{ from: new Date(2024, 0, 1), to: new Date(2024, 0, 31) }}
  selected={date}
  onSelect={setDate}
/>
```

## Date Constraints

```tsx
<Calendar
  mode="single"
  fromDate={new Date(2024, 0, 1)}
  toDate={new Date(2024, 11, 31)}
  selected={date}
  onSelect={setDate}
/>

{/* Or use fromYear/toYear */}
<Calendar
  mode="single"
  fromYear={2020}
  toYear={2030}
  selected={date}
  onSelect={setDate}
/>
```

## Multiple Months

```tsx
<Calendar
  mode="single"
  numberOfMonths={2}
  selected={date}
  onSelect={setDate}
/>
```

## Initial Focus

```tsx
<Calendar
  mode="single"
  defaultMonth={new Date(2024, 5)} // June 2024
  selected={date}
  onSelect={setDate}
/>
```

## With Footer

```tsx
function CalendarWithFooter() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <div>
      <Calendar mode="single" selected={date} onSelect={setDate} />
      <p className="mt-2 text-sm text-muted-foreground text-center">
        {date ? date.toLocaleDateString() : "Pick a date"}
      </p>
    </div>
  )
}
```

## TypeScript Props

The Calendar component wraps `react-day-picker`'s `DayPicker`. Key props:

```typescript
interface CalendarProps {
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[] | DateRange
  onSelect?: (value: ...) => void
  disabled?: Matcher | Matcher[]
  fromDate?: Date
  toDate?: Date
  fromYear?: number
  toYear?: number
  numberOfMonths?: number
  defaultMonth?: Date
  showOutsideDays?: boolean
  className?: string
}
```

## Accessibility

- Full keyboard navigation: Arrow keys move between days, Page Up/Down switch months.
- Screen readers announce the selected date and navigation context.
- Disabled dates are announced as unavailable.
- The component uses proper ARIA roles for the calendar grid.

## See Also

- [Date Picker](./date-picker.md) — Calendar combined with a Popover for inline date selection.
