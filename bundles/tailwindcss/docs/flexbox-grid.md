# Flexbox and Grid Deep Dive

This guide covers advanced flexbox and grid utilities in Tailwind CSS v4, including flex sizing, ordering, grid auto-flow, subgrid, and responsive layout patterns.

## Flex Grow and Shrink

### Flex Grow

| Class | CSS |
|-------|-----|
| `grow` | `flex-grow: 1` |
| `grow-0` | `flex-grow: 0` |

```html
<!-- First item grows to fill space -->
<div class="flex gap-4">
  <div class="grow rounded bg-blue-100 p-4">Grows to fill</div>
  <div class="w-48 rounded bg-gray-100 p-4">Fixed width</div>
</div>

<!-- Only middle item grows -->
<div class="flex gap-4">
  <div class="w-20 shrink-0 rounded bg-gray-100 p-4">Fixed</div>
  <div class="grow rounded bg-blue-100 p-4">Fills remaining space</div>
  <div class="w-20 shrink-0 rounded bg-gray-100 p-4">Fixed</div>
</div>
```

### Flex Shrink

| Class | CSS |
|-------|-----|
| `shrink` | `flex-shrink: 1` |
| `shrink-0` | `flex-shrink: 0` |

```html
<!-- Prevent sidebar from shrinking -->
<div class="flex gap-4">
  <aside class="w-64 shrink-0 rounded bg-gray-100 p-4">Sidebar (never shrinks)</aside>
  <main class="grow rounded bg-white p-4">Main content</main>
</div>

<!-- Horizontal scroll with no-shrink items -->
<div class="flex gap-4 overflow-x-auto">
  <div class="w-72 shrink-0 rounded-lg bg-white p-4 shadow">Card 1</div>
  <div class="w-72 shrink-0 rounded-lg bg-white p-4 shadow">Card 2</div>
  <div class="w-72 shrink-0 rounded-lg bg-white p-4 shadow">Card 3</div>
</div>
```

## Flex Basis

| Class | CSS |
|-------|-----|
| `basis-0` | `flex-basis: 0px` |
| `basis-1` to `basis-96` | Uses spacing scale |
| `basis-auto` | `flex-basis: auto` |
| `basis-full` | `flex-basis: 100%` |
| `basis-1/2` | `flex-basis: 50%` |
| `basis-1/3` | `flex-basis: 33.333%` |
| `basis-2/3` | `flex-basis: 66.667%` |
| `basis-1/4` | `flex-basis: 25%` |
| `basis-3/4` | `flex-basis: 75%` |
| `basis-1/5` to `basis-4/5` | Fifths |
| `basis-1/6` to `basis-5/6` | Sixths |
| `basis-1/12` to `basis-11/12` | Twelfths |

```html
<!-- Two-column layout with sidebar -->
<div class="flex gap-8">
  <main class="basis-2/3">Main content area</main>
  <aside class="basis-1/3">Sidebar</aside>
</div>

<!-- Equal-width columns that can wrap -->
<div class="flex flex-wrap gap-4">
  <div class="basis-full sm:basis-1/2 lg:basis-1/3 rounded bg-white p-4 shadow">
    Responsive column
  </div>
  <div class="basis-full sm:basis-1/2 lg:basis-1/3 rounded bg-white p-4 shadow">
    Responsive column
  </div>
  <div class="basis-full sm:basis-1/2 lg:basis-1/3 rounded bg-white p-4 shadow">
    Responsive column
  </div>
</div>
```

## Flex Shorthand

| Class | CSS |
|-------|-----|
| `flex-1` | `flex: 1 1 0%` (grow and shrink, ignore initial size) |
| `flex-auto` | `flex: 1 1 auto` (grow and shrink, based on initial size) |
| `flex-initial` | `flex: 0 1 auto` (only shrink) |
| `flex-none` | `flex: none` (don't grow or shrink) |

```html
<!-- Equal-width columns -->
<div class="flex gap-4">
  <div class="flex-1 rounded bg-blue-100 p-4">Equal</div>
  <div class="flex-1 rounded bg-blue-200 p-4">Equal</div>
  <div class="flex-1 rounded bg-blue-300 p-4">Equal</div>
</div>

<!-- Auto-sized based on content -->
<div class="flex gap-4">
  <div class="flex-auto rounded bg-green-100 p-4">Short</div>
  <div class="flex-auto rounded bg-green-200 p-4">Longer content gets more space</div>
</div>

<!-- Fixed item among flexible ones -->
<div class="flex gap-4">
  <div class="flex-1 rounded bg-blue-100 p-4">Flexible</div>
  <div class="flex-none w-48 rounded bg-gray-100 p-4">Fixed 12rem</div>
  <div class="flex-1 rounded bg-blue-100 p-4">Flexible</div>
</div>
```

## Order

| Class | CSS |
|-------|-----|
| `order-first` | `order: -9999` |
| `order-last` | `order: 9999` |
| `order-none` | `order: 0` |
| `order-1` to `order-12` | `order: 1` to `order: 12` |
| `-order-1` | `order: -1` |

```html
<!-- Reorder for mobile: image first, then text -->
<div class="flex flex-col md:flex-row gap-6">
  <div class="order-2 md:order-1 flex-1">
    <h2 class="text-2xl font-bold">Content First on Desktop</h2>
    <p class="mt-2 text-gray-600">Text content appears first on desktop.</p>
  </div>
  <div class="order-1 md:order-2 flex-1">
    <img class="rounded-lg" src="photo.jpg" alt="" />
  </div>
</div>
```

## Grid Auto Flow

| Class | CSS |
|-------|-----|
| `grid-flow-row` | `grid-auto-flow: row` |
| `grid-flow-col` | `grid-auto-flow: column` |
| `grid-flow-dense` | `grid-auto-flow: dense` |
| `grid-flow-row-dense` | `grid-auto-flow: row dense` |
| `grid-flow-col-dense` | `grid-auto-flow: column dense` |

```html
<!-- Auto-place items in columns -->
<div class="grid grid-flow-col grid-rows-3 gap-4">
  <div>1</div> <div>2</div> <div>3</div>
  <div>4</div> <div>5</div> <div>6</div>
</div>

<!-- Dense packing to fill gaps -->
<div class="grid grid-cols-3 grid-flow-dense gap-4">
  <div class="col-span-2 bg-blue-100 p-4">Wide item</div>
  <div class="bg-gray-100 p-4">Item</div>
  <div class="bg-gray-100 p-4">Item (fills gap)</div>
  <div class="col-span-2 bg-blue-100 p-4">Wide item</div>
</div>
```

## Grid Auto Columns and Rows

| Class | CSS |
|-------|-----|
| `auto-cols-auto` | `grid-auto-columns: auto` |
| `auto-cols-min` | `grid-auto-columns: min-content` |
| `auto-cols-max` | `grid-auto-columns: max-content` |
| `auto-cols-fr` | `grid-auto-columns: minmax(0, 1fr)` |
| `auto-rows-auto` | `grid-auto-rows: auto` |
| `auto-rows-min` | `grid-auto-rows: min-content` |
| `auto-rows-max` | `grid-auto-rows: max-content` |
| `auto-rows-fr` | `grid-auto-rows: minmax(0, 1fr)` |

```html
<div class="grid grid-flow-col auto-cols-fr gap-4">
  <div class="bg-blue-100 p-4">Auto 1fr</div>
  <div class="bg-blue-200 p-4">Auto 1fr</div>
  <div class="bg-blue-300 p-4">Auto 1fr</div>
</div>
```

## Auto-Fill and Auto-Fit

Use arbitrary grid-template-columns for responsive grids without breakpoints:

```html
<!-- auto-fill: creates as many columns as fit, empty columns remain -->
<div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
  <div class="rounded-lg bg-white p-6 shadow">Card 1</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 2</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 3</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 4</div>
</div>

<!-- auto-fit: same as auto-fill, but empty columns collapse -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
  <div class="rounded-lg bg-white p-6 shadow">Card 1</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 2</div>
</div>
```

The difference: `auto-fill` keeps empty columns at their minimum size, while `auto-fit` collapses empty columns to zero, allowing items to stretch.

## Subgrid

Tailwind v4 supports CSS subgrid for aligning nested grid items:

```html
<div class="grid grid-cols-3 gap-4">
  <!-- This child spans 3 columns and uses subgrid for its own columns -->
  <div class="col-span-3 grid grid-cols-subgrid gap-4">
    <div class="bg-blue-100 p-4">Aligned to parent column 1</div>
    <div class="bg-blue-200 p-4">Aligned to parent column 2</div>
    <div class="bg-blue-300 p-4">Aligned to parent column 3</div>
  </div>
</div>

<!-- Row subgrid -->
<div class="grid grid-rows-3 gap-4">
  <div class="row-span-3 grid grid-rows-subgrid gap-4">
    <div class="bg-green-100 p-4">Row 1</div>
    <div class="bg-green-200 p-4">Row 2</div>
    <div class="bg-green-300 p-4">Row 3</div>
  </div>
</div>
```

### Subgrid for Card Alignment

```html
<!-- Cards with aligned headers, content, and footers -->
<div class="grid grid-cols-3 gap-6">
  <div class="grid grid-rows-subgrid row-span-3 gap-0 rounded-xl border bg-white p-6">
    <h3 class="font-bold">Card 1 Title</h3>
    <p class="text-gray-600">Short description.</p>
    <button class="self-end rounded bg-blue-500 px-4 py-2 text-white">Action</button>
  </div>
  <div class="grid grid-rows-subgrid row-span-3 gap-0 rounded-xl border bg-white p-6">
    <h3 class="font-bold">Card 2 Longer Title Here</h3>
    <p class="text-gray-600">A much longer description that takes up more vertical space.</p>
    <button class="self-end rounded bg-blue-500 px-4 py-2 text-white">Action</button>
  </div>
  <div class="grid grid-rows-subgrid row-span-3 gap-0 rounded-xl border bg-white p-6">
    <h3 class="font-bold">Card 3</h3>
    <p class="text-gray-600">Medium description text.</p>
    <button class="self-end rounded bg-blue-500 px-4 py-2 text-white">Action</button>
  </div>
</div>
```

## Common Layout Patterns

### Holy Grail Layout

```html
<div class="grid min-h-dvh grid-rows-[auto_1fr_auto]">
  <header class="border-b bg-white px-6 py-4">Header</header>
  <div class="grid grid-cols-1 md:grid-cols-[240px_1fr_200px]">
    <nav class="border-r bg-gray-50 p-4 hidden md:block">Sidebar</nav>
    <main class="p-6">Main Content</main>
    <aside class="border-l bg-gray-50 p-4 hidden lg:block">Aside</aside>
  </div>
  <footer class="border-t bg-white px-6 py-4">Footer</footer>
</div>
```

### Masonry-Like with Grid

```html
<div class="columns-1 gap-4 sm:columns-2 lg:columns-3">
  <div class="mb-4 break-inside-avoid rounded-lg bg-white p-4 shadow">
    <p>Short content</p>
  </div>
  <div class="mb-4 break-inside-avoid rounded-lg bg-white p-4 shadow">
    <p>Much longer content that takes up more vertical space in the layout.</p>
  </div>
  <div class="mb-4 break-inside-avoid rounded-lg bg-white p-4 shadow">
    <p>Medium content here</p>
  </div>
</div>
```

### Sticky Sidebar with Scrollable Content

```html
<div class="flex h-dvh">
  <aside class="w-64 shrink-0 overflow-y-auto border-r bg-gray-50 p-4">
    <nav class="sticky top-0 space-y-2">
      <a href="#" class="block rounded px-3 py-2 hover:bg-gray-200">Link 1</a>
      <a href="#" class="block rounded px-3 py-2 hover:bg-gray-200">Link 2</a>
    </nav>
  </aside>
  <main class="flex-1 overflow-y-auto p-8">
    Main scrollable content
  </main>
</div>
```
