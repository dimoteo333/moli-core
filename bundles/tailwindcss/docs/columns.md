# Columns

Tailwind CSS v4 provides utilities for CSS multi-column layout, controlling column count, gap, spanning, and break behavior. Multi-column layout is ideal for flowing text and masonry-style card layouts.

## Column Count

| Class | CSS |
|-------|-----|
| `columns-1` | `columns: 1` |
| `columns-2` | `columns: 2` |
| `columns-3` | `columns: 3` |
| `columns-4` | `columns: 4` |
| `columns-5` | `columns: 5` |
| `columns-6` | `columns: 6` |
| `columns-7` | `columns: 7` |
| `columns-8` | `columns: 8` |
| `columns-9` | `columns: 9` |
| `columns-10` | `columns: 10` |
| `columns-11` | `columns: 11` |
| `columns-12` | `columns: 12` |
| `columns-auto` | `columns: auto` |

```html
<!-- Two-column text layout -->
<div class="columns-2 gap-8">
  <p>First paragraph flows into columns automatically. The browser distributes
  content evenly across the columns.</p>
  <p>Second paragraph continues in the columns wherever there is space.</p>
  <p>Third paragraph fills remaining space.</p>
</div>

<!-- Responsive columns -->
<div class="columns-1 sm:columns-2 lg:columns-3 gap-6">
  <p>Content flows into 1 column on mobile, 2 on tablet, 3 on desktop.</p>
  <p>Additional content fills the columns naturally.</p>
  <p>More content here.</p>
</div>
```

## Column Width

Use named width values to set column widths. The browser calculates how many columns fit:

| Class | CSS |
|-------|-----|
| `columns-3xs` | `columns: 16rem` (256px) |
| `columns-2xs` | `columns: 18rem` (288px) |
| `columns-xs` | `columns: 20rem` (320px) |
| `columns-sm` | `columns: 24rem` (384px) |
| `columns-md` | `columns: 28rem` (448px) |
| `columns-lg` | `columns: 32rem` (512px) |
| `columns-xl` | `columns: 36rem` (576px) |
| `columns-2xl` | `columns: 42rem` (672px) |
| `columns-3xl` | `columns: 48rem` (768px) |
| `columns-4xl` | `columns: 56rem` (896px) |
| `columns-5xl` | `columns: 64rem` (1024px) |
| `columns-6xl` | `columns: 72rem` (1152px) |
| `columns-7xl` | `columns: 80rem` (1280px) |

```html
<!-- Columns auto-sized to approximately 20rem each -->
<div class="columns-xs gap-6">
  <p>The browser creates as many ~320px-wide columns as fit in the container.</p>
  <p>Narrower containers get fewer columns automatically.</p>
</div>

<!-- Arbitrary column width -->
<div class="columns-[250px] gap-4">
  Content with 250px target column width
</div>
```

## Column Gap

Use `gap-*` to control the gap between columns:

```html
<div class="columns-3 gap-4">
  <p>Narrow gap between columns.</p>
  <p>Content continues here.</p>
</div>

<div class="columns-3 gap-12">
  <p>Wide gap between columns.</p>
  <p>Content continues here.</p>
</div>

<!-- Arbitrary gap -->
<div class="columns-2 gap-[2.5rem]">
  Custom gap value
</div>
```

## Column Spanning

Use `col-span-all` to make an element span across all columns:

```html
<div class="columns-2 gap-8">
  <p>First column content.</p>
  <h2 class="col-span-all text-2xl font-bold mt-4 mb-2">Section Header Spanning All Columns</h2>
  <p>Content continues below the spanning header.</p>
  <p>More content in the columns.</p>
</div>
```

Note: Browser support for `column-span` is `all` or `none` only.

## Break Utilities

Control how content breaks across columns.

### Break Before

| Class | CSS |
|-------|-----|
| `break-before-auto` | `break-before: auto` |
| `break-before-avoid` | `break-before: avoid` |
| `break-before-all` | `break-before: all` |
| `break-before-avoid-page` | `break-before: avoid-page` |
| `break-before-page` | `break-before: page` |
| `break-before-left` | `break-before: left` |
| `break-before-right` | `break-before: right` |
| `break-before-column` | `break-before: column` |

### Break After

| Class | CSS |
|-------|-----|
| `break-after-auto` | `break-after: auto` |
| `break-after-avoid` | `break-after: avoid` |
| `break-after-all` | `break-after: all` |
| `break-after-avoid-page` | `break-after: avoid-page` |
| `break-after-page` | `break-after: page` |
| `break-after-left` | `break-after: left` |
| `break-after-right` | `break-after: right` |
| `break-after-column` | `break-after: column` |

### Break Inside

| Class | CSS |
|-------|-----|
| `break-inside-auto` | `break-inside: auto` |
| `break-inside-avoid` | `break-inside: avoid` |
| `break-inside-avoid-page` | `break-inside: avoid-page` |
| `break-inside-avoid-column` | `break-inside: avoid-column` |

```html
<!-- Force a new column after this element -->
<div class="columns-2 gap-6">
  <div class="break-after-column">
    <h3 class="font-bold">Section 1</h3>
    <p>This section ends the first column.</p>
  </div>
  <div>
    <h3 class="font-bold">Section 2</h3>
    <p>This starts in the second column.</p>
  </div>
</div>

<!-- Prevent elements from breaking across columns -->
<div class="columns-3 gap-4">
  <div class="break-inside-avoid mb-4 rounded-lg bg-white p-4 shadow">
    <h3 class="font-bold">Card 1</h3>
    <p>This card won't be split across columns.</p>
  </div>
  <div class="break-inside-avoid mb-4 rounded-lg bg-white p-4 shadow">
    <h3 class="font-bold">Card 2</h3>
    <p>This card stays intact too.</p>
  </div>
  <div class="break-inside-avoid mb-4 rounded-lg bg-white p-4 shadow">
    <h3 class="font-bold">Card 3</h3>
    <p>And this one.</p>
  </div>
</div>
```

## Masonry-Style Layout

Multi-column layout is the simplest way to achieve a masonry-like layout:

```html
<div class="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
  <!-- Cards with varying heights, each avoids breaking -->
  <div class="mb-4 break-inside-avoid rounded-xl bg-white p-6 shadow-sm">
    <h3 class="font-bold">Short Card</h3>
    <p class="mt-2 text-gray-600">Brief content.</p>
  </div>

  <div class="mb-4 break-inside-avoid rounded-xl bg-white p-6 shadow-sm">
    <img class="w-full rounded-lg" src="photo.jpg" alt="" />
    <h3 class="mt-3 font-bold">Image Card</h3>
    <p class="mt-2 text-gray-600">Card with an image that takes more space.</p>
  </div>

  <div class="mb-4 break-inside-avoid rounded-xl bg-white p-6 shadow-sm">
    <h3 class="font-bold">Text Card</h3>
    <p class="mt-2 text-gray-600">
      A longer card with more text content that naturally takes up more vertical
      space in the column layout. The columns will balance around varying heights.
    </p>
  </div>

  <div class="mb-4 break-inside-avoid rounded-xl bg-blue-500 p-6 text-white shadow-sm">
    <h3 class="font-bold">Highlighted Card</h3>
    <p class="mt-2 text-blue-100">Featured content with different styling.</p>
  </div>

  <div class="mb-4 break-inside-avoid rounded-xl bg-white p-6 shadow-sm">
    <blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700">
      "A testimonial or quote that fits naturally into the masonry grid."
    </blockquote>
    <p class="mt-3 text-sm text-gray-500">- Author Name</p>
  </div>

  <div class="mb-4 break-inside-avoid rounded-xl bg-white p-6 shadow-sm">
    <h3 class="font-bold">Stats Card</h3>
    <div class="mt-3 grid grid-cols-2 gap-4">
      <div class="text-center">
        <div class="text-2xl font-bold text-blue-600">128</div>
        <div class="text-xs text-gray-500">Projects</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-green-600">99%</div>
        <div class="text-xs text-gray-500">Uptime</div>
      </div>
    </div>
  </div>
</div>
```

## Column Rule

Tailwind does not have built-in utilities for `column-rule`, but you can use arbitrary properties:

```html
<!-- Add a visible rule (line) between columns -->
<div class="columns-3 gap-8 [column-rule:1px_solid_#e5e7eb]">
  <p>Column with a dividing line between each column, similar to a newspaper layout.</p>
  <p>Content in the second column.</p>
  <p>Content in the third column.</p>
</div>

<!-- Dashed column rule -->
<div class="columns-2 gap-8 [column-rule:2px_dashed_#d1d5db]">
  <p>First column content.</p>
  <p>Second column content.</p>
</div>
```

## Column Fill

Control how content fills columns:

```html
<!-- Auto: fill columns sequentially (default) -->
<div class="columns-3 [column-fill:auto] h-96">
  Content fills the first column completely before moving to the next.
</div>

<!-- Balance: distribute content evenly (default for most browsers) -->
<div class="columns-3 [column-fill:balance]">
  Content is balanced across all columns.
</div>
```

## Print Layout with Columns

```html
<!-- Newspaper-style print layout -->
<article class="columns-1 gap-8 print:columns-2 print:text-sm print:leading-snug">
  <h1 class="col-span-all mb-4 text-3xl font-bold print:text-2xl">Article Title</h1>
  <p>Content flows into columns for print layout...</p>
  <p>Additional paragraphs continue in the columns.</p>
</article>
```
