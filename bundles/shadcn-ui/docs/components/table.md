# Table

A styled HTML table for displaying tabular data.

## Installation

```bash
npx shadcn@latest add table
```

## Import

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
```

## Basic Usage

```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$400.00</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

## Sub-Components

| Component | Element | Purpose |
|-----------|---------|---------|
| `Table` | `<table>` | Root table container |
| `TableHeader` | `<thead>` | Table header section |
| `TableBody` | `<tbody>` | Table body section |
| `TableFooter` | `<tfoot>` | Table footer section |
| `TableRow` | `<tr>` | Table row |
| `TableHead` | `<th>` | Header cell |
| `TableCell` | `<td>` | Body cell |
| `TableCaption` | `<caption>` | Table caption/description |

## Dynamic Data

```tsx
const invoices = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: 250 },
  { id: "INV002", status: "Pending", method: "PayPal", amount: 150 },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: 350 },
]

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {invoices.map((invoice) => (
      <TableRow key={invoice.id}>
        <TableCell className="font-medium">{invoice.id}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell>{invoice.method}</TableCell>
        <TableCell className="text-right">
          ${invoice.amount.toFixed(2)}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## With Status Badges

```tsx
<TableCell>
  <Badge variant={status === "Paid" ? "default" : status === "Pending" ? "secondary" : "destructive"}>
    {status}
  </Badge>
</TableCell>
```

## Responsive Table

Wrap the table in a scrollable container:

```tsx
<div className="rounded-md border">
  <div className="overflow-x-auto">
    <Table>
      {/* Wide table content */}
    </Table>
  </div>
</div>
```

## Clickable Rows

```tsx
<TableRow
  className="cursor-pointer"
  onClick={() => router.push(`/invoices/${invoice.id}`)}
>
  <TableCell>{invoice.id}</TableCell>
  <TableCell>{invoice.status}</TableCell>
</TableRow>
```

## Striped Rows

```tsx
{/* Rows have hover:bg-muted/50 by default. Add even/odd striping: */}
<TableRow className="even:bg-muted/50">
  ...
</TableRow>
```

## Empty State

```tsx
<TableBody>
  {data.length > 0 ? (
    data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results found.
      </TableCell>
    </TableRow>
  )}
</TableBody>
```

## TypeScript Props

All table sub-components extend their native HTML element props:

```typescript
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>
```

## Accessibility

- Use `TableCaption` to describe the table's purpose for screen readers.
- Use `TableHead` (renders `<th>`) for header cells — screen readers use this for navigation.
- Ensure proper `scope` attributes are implied through semantic markup.
- For sortable/interactive tables, see [Data Table](./data-table.md).
