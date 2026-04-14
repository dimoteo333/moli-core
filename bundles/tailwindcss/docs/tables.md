# Tables

Tailwind CSS v4 provides utilities for styling HTML tables, including table layout, border collapse, border spacing, and caption positioning.

## Table Layout

| Class | CSS |
|-------|-----|
| `table-auto` | `table-layout: auto` (columns sized by content) |
| `table-fixed` | `table-layout: fixed` (columns sized equally or by width) |

```html
<!-- Auto layout: columns adjust to content -->
<table class="table-auto w-full">
  <thead>
    <tr>
      <th class="px-4 py-2 text-left">Name</th>
      <th class="px-4 py-2 text-left">Email</th>
      <th class="px-4 py-2 text-left">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="px-4 py-2">Jane Doe</td>
      <td class="px-4 py-2">jane@example.com</td>
      <td class="px-4 py-2">Admin</td>
    </tr>
  </tbody>
</table>

<!-- Fixed layout: equal column widths -->
<table class="table-fixed w-full">
  <thead>
    <tr>
      <th class="w-1/3 px-4 py-2 text-left">Name</th>
      <th class="w-1/3 px-4 py-2 text-left">Email</th>
      <th class="w-1/3 px-4 py-2 text-left">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="px-4 py-2 truncate">Very Long Name That Would Overflow</td>
      <td class="px-4 py-2 truncate">verylongemail@example.com</td>
      <td class="px-4 py-2">Admin</td>
    </tr>
  </tbody>
</table>
```

## Border Collapse

| Class | CSS |
|-------|-----|
| `border-collapse` | `border-collapse: collapse` |
| `border-separate` | `border-collapse: separate` |

```html
<!-- Collapsed borders (shared borders between cells) -->
<table class="w-full border-collapse border border-gray-300">
  <thead>
    <tr>
      <th class="border border-gray-300 bg-gray-50 px-4 py-2 text-left">Name</th>
      <th class="border border-gray-300 bg-gray-50 px-4 py-2 text-left">Status</th>
      <th class="border border-gray-300 bg-gray-50 px-4 py-2 text-left">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Item 1</td>
      <td class="border border-gray-300 px-4 py-2">Active</td>
      <td class="border border-gray-300 px-4 py-2">Edit</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Item 2</td>
      <td class="border border-gray-300 px-4 py-2">Inactive</td>
      <td class="border border-gray-300 px-4 py-2">Edit</td>
    </tr>
  </tbody>
</table>
```

## Border Spacing

When using `border-separate`, control the gap between cells:

| Class | CSS |
|-------|-----|
| `border-spacing-0` | `border-spacing: 0px` |
| `border-spacing-1` to `border-spacing-12` | Uses spacing scale |
| `border-spacing-px` | `border-spacing: 1px` |
| `border-spacing-x-*` | Horizontal spacing only |
| `border-spacing-y-*` | Vertical spacing only |

```html
<!-- Separated cells with spacing -->
<table class="w-full border-separate border-spacing-2">
  <thead>
    <tr>
      <th class="rounded-lg bg-gray-100 px-4 py-2 text-left">Name</th>
      <th class="rounded-lg bg-gray-100 px-4 py-2 text-left">Email</th>
      <th class="rounded-lg bg-gray-100 px-4 py-2 text-left">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="rounded-lg bg-white px-4 py-2 shadow-sm">Jane Doe</td>
      <td class="rounded-lg bg-white px-4 py-2 shadow-sm">jane@example.com</td>
      <td class="rounded-lg bg-white px-4 py-2 shadow-sm">Admin</td>
    </tr>
    <tr>
      <td class="rounded-lg bg-white px-4 py-2 shadow-sm">John Smith</td>
      <td class="rounded-lg bg-white px-4 py-2 shadow-sm">john@example.com</td>
      <td class="rounded-lg bg-white px-4 py-2 shadow-sm">Editor</td>
    </tr>
  </tbody>
</table>

<!-- Different horizontal and vertical spacing -->
<table class="w-full border-separate border-spacing-x-4 border-spacing-y-2">
  <tbody>
    <tr>
      <td class="rounded bg-gray-100 px-4 py-2">Cell A</td>
      <td class="rounded bg-gray-100 px-4 py-2">Cell B</td>
    </tr>
  </tbody>
</table>
```

## Caption Side

| Class | CSS |
|-------|-----|
| `caption-top` | `caption-side: top` |
| `caption-bottom` | `caption-side: bottom` |

```html
<table class="w-full">
  <caption class="caption-bottom mt-2 text-sm text-gray-500">
    Table 1: User accounts and their roles
  </caption>
  <thead>
    <tr class="border-b border-gray-200">
      <th class="py-3 text-left text-sm font-medium text-gray-500">Name</th>
      <th class="py-3 text-left text-sm font-medium text-gray-500">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-gray-100">
      <td class="py-3">Jane Doe</td>
      <td class="py-3">Administrator</td>
    </tr>
  </tbody>
</table>
```

## Modern Table Styling

### Striped Table with Hover

```html
<div class="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
  <table class="w-full text-sm">
    <thead>
      <tr class="bg-gray-50 dark:bg-gray-800">
        <th class="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Name</th>
        <th class="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Email</th>
        <th class="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
        <th class="px-6 py-3 text-right font-medium text-gray-500 dark:text-gray-400">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
      <tr class="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/50">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Jane Doe</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-400">jane@example.com</td>
        <td class="px-6 py-4">
          <span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</span>
        </td>
        <td class="px-6 py-4 text-right">
          <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400">Edit</button>
        </td>
      </tr>
      <tr class="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/50">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">John Smith</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-400">john@example.com</td>
        <td class="px-6 py-4">
          <span class="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</span>
        </td>
        <td class="px-6 py-4 text-right">
          <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Responsive Table

```html
<!-- Horizontal scroll on mobile -->
<div class="overflow-x-auto rounded-lg border">
  <table class="min-w-full text-sm">
    <thead class="bg-gray-50">
      <tr>
        <th class="whitespace-nowrap px-6 py-3 text-left font-medium">Product</th>
        <th class="whitespace-nowrap px-6 py-3 text-left font-medium">Category</th>
        <th class="whitespace-nowrap px-6 py-3 text-right font-medium">Price</th>
        <th class="whitespace-nowrap px-6 py-3 text-right font-medium">Stock</th>
        <th class="whitespace-nowrap px-6 py-3 text-right font-medium">Revenue</th>
      </tr>
    </thead>
    <tbody class="divide-y">
      <tr>
        <td class="whitespace-nowrap px-6 py-4 font-medium">Widget Pro</td>
        <td class="whitespace-nowrap px-6 py-4">Electronics</td>
        <td class="whitespace-nowrap px-6 py-4 text-right">$29.99</td>
        <td class="whitespace-nowrap px-6 py-4 text-right">142</td>
        <td class="whitespace-nowrap px-6 py-4 text-right">$4,258.58</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Display Utilities for Table Elements

Use display utilities to create table-like layouts without `<table>`:

| Class | CSS |
|-------|-----|
| `table` | `display: table` |
| `table-caption` | `display: table-caption` |
| `table-cell` | `display: table-cell` |
| `table-column` | `display: table-column` |
| `table-column-group` | `display: table-column-group` |
| `table-footer-group` | `display: table-footer-group` |
| `table-header-group` | `display: table-header-group` |
| `table-row-group` | `display: table-row-group` |
| `table-row` | `display: table-row` |
| `inline-table` | `display: inline-table` |

```html
<div class="table w-full">
  <div class="table-header-group bg-gray-50 font-medium">
    <div class="table-row">
      <div class="table-cell px-4 py-2">Name</div>
      <div class="table-cell px-4 py-2">Value</div>
    </div>
  </div>
  <div class="table-row-group">
    <div class="table-row">
      <div class="table-cell border-t px-4 py-2">Width</div>
      <div class="table-cell border-t px-4 py-2">100px</div>
    </div>
  </div>
</div>
```
