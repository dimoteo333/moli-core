# Layout Utilities

Tailwind CSS v4 provides comprehensive layout utilities for controlling how elements are displayed, positioned, and arranged on the page.

## Display

Control the display box type of an element.

| Class | CSS |
|-------|-----|
| `block` | `display: block` |
| `inline-block` | `display: inline-block` |
| `inline` | `display: inline` |
| `flex` | `display: flex` |
| `inline-flex` | `display: inline-flex` |
| `grid` | `display: grid` |
| `inline-grid` | `display: inline-grid` |
| `contents` | `display: contents` |
| `hidden` | `display: none` |
| `table` | `display: table` |
| `table-row` | `display: table-row` |
| `table-cell` | `display: table-cell` |
| `flow-root` | `display: flow-root` |
| `list-item` | `display: list-item` |

```html
<div class="flex items-center gap-4">
  <img class="block h-12 w-12 rounded-full" src="avatar.jpg" alt="" />
  <div>
    <span class="block font-bold">Jane Doe</span>
    <span class="block text-sm text-gray-500">Developer</span>
  </div>
</div>
```

### Responsive Display

```html
<!-- Hidden on mobile, block on medium screens and up -->
<div class="hidden md:block">Desktop sidebar</div>

<!-- Block on mobile, hidden on medium screens and up -->
<div class="block md:hidden">Mobile menu</div>
```

## Flexbox

Use `flex` utilities to create flexible one-dimensional layouts.

```html
<div class="flex items-center justify-between gap-4 p-4">
  <div class="flex items-center gap-2">
    <img class="h-10 w-10 rounded-full" src="avatar.jpg" alt="" />
    <span class="font-medium">Username</span>
  </div>
  <button class="rounded-lg bg-blue-500 px-4 py-2 text-white">Follow</button>
</div>
```

### Flex Direction

| Class | CSS |
|-------|-----|
| `flex-row` | `flex-direction: row` |
| `flex-row-reverse` | `flex-direction: row-reverse` |
| `flex-col` | `flex-direction: column` |
| `flex-col-reverse` | `flex-direction: column-reverse` |

```html
<!-- Vertical stack that reverses to horizontal on larger screens -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">Column 1</div>
  <div class="flex-1">Column 2</div>
  <div class="flex-1">Column 3</div>
</div>
```

### Flex Wrap

| Class | CSS |
|-------|-----|
| `flex-wrap` | `flex-wrap: wrap` |
| `flex-wrap-reverse` | `flex-wrap: wrap-reverse` |
| `flex-nowrap` | `flex-wrap: nowrap` |

```html
<div class="flex flex-wrap gap-2">
  <span class="rounded-full bg-gray-200 px-3 py-1">Tag 1</span>
  <span class="rounded-full bg-gray-200 px-3 py-1">Tag 2</span>
  <span class="rounded-full bg-gray-200 px-3 py-1">Tag 3</span>
  <span class="rounded-full bg-gray-200 px-3 py-1">Tag 4</span>
</div>
```

### Align Items

| Class | CSS |
|-------|-----|
| `items-start` | `align-items: flex-start` |
| `items-end` | `align-items: flex-end` |
| `items-center` | `align-items: center` |
| `items-baseline` | `align-items: baseline` |
| `items-stretch` | `align-items: stretch` |

### Justify Content

| Class | CSS |
|-------|-----|
| `justify-start` | `justify-content: flex-start` |
| `justify-end` | `justify-content: flex-end` |
| `justify-center` | `justify-content: center` |
| `justify-between` | `justify-content: space-between` |
| `justify-around` | `justify-content: space-around` |
| `justify-evenly` | `justify-content: space-evenly` |
| `justify-stretch` | `justify-content: stretch` |
| `justify-normal` | `justify-content: normal` |

### Align Content

| Class | CSS |
|-------|-----|
| `content-start` | `align-content: flex-start` |
| `content-end` | `align-content: flex-end` |
| `content-center` | `align-content: center` |
| `content-between` | `align-content: space-between` |
| `content-around` | `align-content: space-around` |
| `content-evenly` | `align-content: space-evenly` |
| `content-stretch` | `align-content: stretch` |

### Align Self

| Class | CSS |
|-------|-----|
| `self-auto` | `align-self: auto` |
| `self-start` | `align-self: flex-start` |
| `self-end` | `align-self: flex-end` |
| `self-center` | `align-self: center` |
| `self-stretch` | `align-self: stretch` |
| `self-baseline` | `align-self: baseline` |

### Justify Items and Justify Self

| Class | CSS |
|-------|-----|
| `justify-items-start` | `justify-items: start` |
| `justify-items-end` | `justify-items: end` |
| `justify-items-center` | `justify-items: center` |
| `justify-items-stretch` | `justify-items: stretch` |
| `justify-self-auto` | `justify-self: auto` |
| `justify-self-start` | `justify-self: start` |
| `justify-self-end` | `justify-self: end` |
| `justify-self-center` | `justify-self: center` |
| `justify-self-stretch` | `justify-self: stretch` |

### Place Content, Items, and Self

| Class | CSS |
|-------|-----|
| `place-content-center` | `place-content: center` |
| `place-content-between` | `place-content: space-between` |
| `place-items-center` | `place-items: center` |
| `place-items-stretch` | `place-items: stretch` |
| `place-self-center` | `place-self: center` |
| `place-self-start` | `place-self: start` |

## Grid

Use CSS Grid for two-dimensional layouts.

```html
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <div class="rounded-lg bg-white p-6 shadow">Card 1</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 2</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 3</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 4</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 5</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 6</div>
</div>
```

### Grid Template Columns

| Class | CSS |
|-------|-----|
| `grid-cols-1` to `grid-cols-12` | `grid-template-columns: repeat(n, minmax(0, 1fr))` |
| `grid-cols-none` | `grid-template-columns: none` |
| `grid-cols-subgrid` | `grid-template-columns: subgrid` |

Use arbitrary values for custom column definitions:

```html
<div class="grid grid-cols-[200px_1fr_200px] gap-4">
  <aside>Sidebar</aside>
  <main>Content</main>
  <aside>Right panel</aside>
</div>
```

### Grid Template Rows

| Class | CSS |
|-------|-----|
| `grid-rows-1` to `grid-rows-12` | `grid-template-rows: repeat(n, minmax(0, 1fr))` |
| `grid-rows-none` | `grid-template-rows: none` |
| `grid-rows-subgrid` | `grid-template-rows: subgrid` |

### Column and Row Spanning

```html
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2 row-span-2 bg-blue-100 p-4">Featured</div>
  <div class="bg-gray-100 p-4">Item 1</div>
  <div class="bg-gray-100 p-4">Item 2</div>
  <div class="bg-gray-100 p-4">Item 3</div>
  <div class="bg-gray-100 p-4">Item 4</div>
</div>
```

| Class | CSS |
|-------|-----|
| `col-span-1` to `col-span-12` | `grid-column: span n / span n` |
| `col-span-full` | `grid-column: 1 / -1` |
| `col-start-1` to `col-start-13` | `grid-column-start: n` |
| `col-end-1` to `col-end-13` | `grid-column-end: n` |
| `row-span-1` to `row-span-12` | `grid-row: span n / span n` |
| `row-span-full` | `grid-row: 1 / -1` |
| `row-start-1` to `row-start-13` | `grid-row-start: n` |
| `row-end-1` to `row-end-13` | `grid-row-end: n` |

### Gap

| Class | CSS |
|-------|-----|
| `gap-0` | `gap: 0px` |
| `gap-1` | `gap: 0.25rem` |
| `gap-2` | `gap: 0.5rem` |
| `gap-4` | `gap: 1rem` |
| `gap-6` | `gap: 1.5rem` |
| `gap-8` | `gap: 2rem` |
| `gap-x-*` | `column-gap: *` |
| `gap-y-*` | `row-gap: *` |

## Position

| Class | CSS |
|-------|-----|
| `static` | `position: static` |
| `fixed` | `position: fixed` |
| `absolute` | `position: absolute` |
| `relative` | `position: relative` |
| `sticky` | `position: sticky` |

### Inset (Top / Right / Bottom / Left)

| Class | CSS |
|-------|-----|
| `inset-0` | `inset: 0px` |
| `inset-x-0` | `left: 0; right: 0` |
| `inset-y-0` | `top: 0; bottom: 0` |
| `top-0`, `right-0`, `bottom-0`, `left-0` | Individual sides |
| `inset-auto` | `inset: auto` |
| `-top-4` | `top: -1rem` (negative values) |

```html
<!-- Sticky header -->
<header class="sticky top-0 z-50 bg-white shadow">
  <nav class="flex items-center justify-between px-6 py-4">
    <span class="text-xl font-bold">Logo</span>
    <div class="flex gap-4">
      <a href="#">Home</a>
      <a href="#">About</a>
    </div>
  </nav>
</header>

<!-- Overlay modal -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="relative rounded-lg bg-white p-8 shadow-xl">
    <button class="absolute right-2 top-2 text-gray-400">X</button>
    <h2 class="text-lg font-bold">Modal Title</h2>
    <p>Modal content here.</p>
  </div>
</div>

<!-- Notification badge -->
<div class="relative inline-block">
  <button class="rounded-lg bg-gray-200 p-2">Inbox</button>
  <span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">3</span>
</div>
```

## Z-Index

| Class | CSS |
|-------|-----|
| `z-0` | `z-index: 0` |
| `z-10` | `z-index: 10` |
| `z-20` | `z-index: 20` |
| `z-30` | `z-index: 30` |
| `z-40` | `z-index: 40` |
| `z-50` | `z-index: 50` |
| `z-auto` | `z-index: auto` |
| `-z-10` | `z-index: -10` |

Use arbitrary values: `z-[100]`, `z-[9999]`.

## Overflow

| Class | CSS |
|-------|-----|
| `overflow-auto` | `overflow: auto` |
| `overflow-hidden` | `overflow: hidden` |
| `overflow-visible` | `overflow: visible` |
| `overflow-scroll` | `overflow: scroll` |
| `overflow-clip` | `overflow: clip` |
| `overflow-x-auto` | `overflow-x: auto` |
| `overflow-y-auto` | `overflow-y: auto` |
| `overflow-x-hidden` | `overflow-x: hidden` |
| `overflow-y-hidden` | `overflow-y: hidden` |
| `overflow-x-scroll` | `overflow-x: scroll` |
| `overflow-y-scroll` | `overflow-y: scroll` |

```html
<!-- Scrollable container -->
<div class="h-64 overflow-y-auto rounded border p-4">
  <p>Long content that scrolls vertically...</p>
</div>

<!-- Horizontal scroll for cards -->
<div class="flex gap-4 overflow-x-auto pb-4">
  <div class="w-64 shrink-0 rounded-lg bg-white p-4 shadow">Card 1</div>
  <div class="w-64 shrink-0 rounded-lg bg-white p-4 shadow">Card 2</div>
  <div class="w-64 shrink-0 rounded-lg bg-white p-4 shadow">Card 3</div>
</div>
```

## Visibility

| Class | CSS |
|-------|-----|
| `visible` | `visibility: visible` |
| `invisible` | `visibility: hidden` |
| `collapse` | `visibility: collapse` |

Note: `invisible` hides the element but preserves its space in the layout. Use `hidden` (`display: none`) to remove it from the flow entirely.

## Container

The `container` class sets the element's `max-width` to match the current breakpoint.

```html
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Centered, responsive content with horizontal padding -->
</div>
```

In Tailwind v4, customize the container via `@theme`:

```css
@theme {
  --container-2xl: 1400px;
}
```

## Box Sizing

| Class | CSS |
|-------|-----|
| `box-border` | `box-sizing: border-box` |
| `box-content` | `box-sizing: content-box` |

## Float and Clear

| Class | CSS |
|-------|-----|
| `float-left` | `float: left` |
| `float-right` | `float: right` |
| `float-none` | `float: none` |
| `float-start` | `float: inline-start` |
| `float-end` | `float: inline-end` |
| `clear-left` | `clear: left` |
| `clear-right` | `clear: right` |
| `clear-both` | `clear: both` |
| `clear-none` | `clear: none` |

## Isolation

| Class | CSS |
|-------|-----|
| `isolate` | `isolation: isolate` |
| `isolation-auto` | `isolation: auto` |

## Object Fit and Position

| Class | CSS |
|-------|-----|
| `object-contain` | `object-fit: contain` |
| `object-cover` | `object-fit: cover` |
| `object-fill` | `object-fit: fill` |
| `object-none` | `object-fit: none` |
| `object-scale-down` | `object-fit: scale-down` |
| `object-center` | `object-position: center` |
| `object-top` | `object-position: top` |
| `object-bottom` | `object-position: bottom` |
| `object-left` | `object-position: left` |
| `object-right` | `object-position: right` |

```html
<img class="h-48 w-full rounded-lg object-cover object-center" src="photo.jpg" alt="" />
```

## Overscroll Behavior

| Class | CSS |
|-------|-----|
| `overscroll-auto` | `overscroll-behavior: auto` |
| `overscroll-contain` | `overscroll-behavior: contain` |
| `overscroll-none` | `overscroll-behavior: none` |
| `overscroll-y-contain` | `overscroll-behavior-y: contain` |
| `overscroll-x-none` | `overscroll-behavior-x: none` |
