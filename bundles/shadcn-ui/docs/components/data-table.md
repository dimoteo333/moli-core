# Data Table

A powerful data table built with [TanStack Table](https://tanstack.com/table/latest) and shadcn/ui Table components.

Data tables are not a single component — they are composed from the Table primitive, TanStack Table for logic, and additional UI components for filtering, sorting, and pagination.

## Installation

```bash
npx shadcn@latest add table
npm install @tanstack/react-table
```

## Column Definitions

```tsx
import { ColumnDef } from "@tanstack/react-table"

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
]
```

## DataTable Component

```tsx
"use client"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
```

## Adding Sorting

```tsx
import { getSortedRowModel, SortingState } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// In column definitions:
{
  accessorKey: "email",
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Email
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
}

// In DataTable component:
const [sorting, setSorting] = React.useState<SortingState>([])

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: setSorting,
  state: { sorting },
})
```

## Adding Filtering

```tsx
import { getFilteredRowModel, ColumnFiltersState } from "@tanstack/react-table"

const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

const table = useReactTable({
  // ...existing config
  getFilteredRowModel: getFilteredRowModel(),
  onColumnFiltersChange: setColumnFilters,
  state: { sorting, columnFilters },
})

// Filter input above the table:
<Input
  placeholder="Filter emails..."
  value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
  className="max-w-sm"
/>
```

## Adding Pagination

```tsx
import { getPaginationRowModel } from "@tanstack/react-table"

const table = useReactTable({
  // ...existing config
  getPaginationRowModel: getPaginationRowModel(),
})

// Pagination controls below the table:
<div className="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    Previous
  </Button>
  <Button
    variant="outline"
    size="sm"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Next
  </Button>
</div>
```

## Row Selection

```tsx
import { Checkbox } from "@/components/ui/checkbox"

// Add a select column:
const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // ...other columns
]

// In useReactTable:
const [rowSelection, setRowSelection] = React.useState({})

const table = useReactTable({
  // ...existing config
  onRowSelectionChange: setRowSelection,
  state: { sorting, columnFilters, rowSelection },
})

// Show selection count:
<div className="text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>
```

## Row Actions

```tsx
import { MoreHorizontal } from "lucide-react"

{
  id: "actions",
  cell: ({ row }) => {
    const payment = row.original
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem>View payment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
```

## Usage

```tsx
// page.tsx
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function PaymentsPage() {
  const data = await getPayments()
  return <DataTable columns={columns} data={data} />
}
```
