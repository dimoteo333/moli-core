# Responsive Design

Tailwind CSS v4 uses a mobile-first responsive design system. Every utility class can be applied conditionally at different breakpoints using responsive prefixes.

## Default Breakpoints

| Prefix | Min-width | CSS |
|--------|-----------|-----|
| `sm:` | 640px | `@media (min-width: 640px)` |
| `md:` | 768px | `@media (min-width: 768px)` |
| `lg:` | 1024px | `@media (min-width: 1024px)` |
| `xl:` | 1280px | `@media (min-width: 1280px)` |
| `2xl:` | 1536px | `@media (min-width: 1536px)` |

## Mobile-First Approach

Unprefixed utilities apply at all screen sizes. Prefixed utilities apply at that breakpoint **and above**.

```html
<!-- Full width on mobile, half on medium, third on large -->
<div class="w-full md:w-1/2 lg:w-1/3">Responsive width</div>

<!-- Stack vertically on mobile, horizontal on medium+ -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">Column 1</div>
  <div class="flex-1">Column 2</div>
  <div class="flex-1">Column 3</div>
</div>

<!-- Font size increases at each breakpoint -->
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
  Responsive Heading
</h1>
```

## Responsive Layout Patterns

### Responsive Grid

```html
<!-- 1 column mobile, 2 tablet, 3 desktop, 4 wide -->
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <div class="rounded-lg bg-white p-6 shadow">Card 1</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 2</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 3</div>
  <div class="rounded-lg bg-white p-6 shadow">Card 4</div>
</div>
```

### Responsive Navigation

```html
<nav class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4">
  <div class="flex items-center justify-between">
    <span class="text-xl font-bold">Logo</span>
    <button class="sm:hidden rounded p-2 hover:bg-gray-100">
      <svg class="h-6 w-6">...</svg>
    </button>
  </div>
  <div class="hidden sm:flex sm:items-center sm:gap-6">
    <a href="#" class="text-gray-700 hover:text-gray-900">Home</a>
    <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
    <a href="#" class="text-gray-700 hover:text-gray-900">Contact</a>
  </div>
</nav>
```

### Responsive Sidebar Layout

```html
<div class="flex min-h-screen flex-col lg:flex-row">
  <!-- Sidebar: full width on mobile, fixed width on desktop -->
  <aside class="w-full border-b lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
    <nav class="flex gap-2 overflow-x-auto p-4 lg:flex-col lg:overflow-visible">
      <a href="#" class="whitespace-nowrap rounded-lg bg-blue-50 px-3 py-2 text-blue-700">Dashboard</a>
      <a href="#" class="whitespace-nowrap rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">Settings</a>
      <a href="#" class="whitespace-nowrap rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">Profile</a>
    </nav>
  </aside>

  <!-- Main content -->
  <main class="flex-1 p-6 lg:p-8">
    <h1 class="text-2xl font-bold">Dashboard</h1>
  </main>
</div>
```

### Responsive Padding and Spacing

```html
<section class="px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-24">
  <div class="mx-auto max-w-4xl">
    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold">Section Title</h2>
    <p class="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600">Description text</p>
  </div>
</section>
```

## Hiding and Showing

```html
<!-- Show only on mobile -->
<div class="block sm:hidden">Mobile only</div>

<!-- Show only on tablet and up -->
<div class="hidden sm:block">Tablet and up</div>

<!-- Show only on specific range (md to lg) -->
<div class="hidden md:block lg:hidden">Tablet only</div>

<!-- Show only on desktop -->
<div class="hidden lg:block">Desktop only</div>
```

## Max-Width Breakpoints

In v4, use `max-*:` for max-width media queries:

```html
<!-- Apply only below medium breakpoint -->
<div class="max-md:text-center">Centered on small screens only</div>

<!-- Apply only below large breakpoint -->
<div class="max-lg:flex-col flex">Column on mobile/tablet, row on desktop</div>
```

## Custom Breakpoints

In Tailwind v4, add custom breakpoints via `@theme`:

```css
@theme {
  --breakpoint-xs: 475px;
  --breakpoint-3xl: 1920px;
}
```

Then use as `xs:flex`, `3xl:grid-cols-6`, etc.

## Container

The `container` utility sets `max-width` to the current breakpoint:

```html
<div class="container mx-auto px-4">
  <!-- Max-width matches breakpoints: sm=640px, md=768px, lg=1024px, etc. -->
</div>
```

## Container Queries

Tailwind v4 supports container queries with the `@container` variants. Install the official plugin:

```css
@plugin "@tailwindcss/container-queries";
```

```html
<!-- Define a container -->
<div class="@container">
  <!-- Respond to container width, not viewport -->
  <div class="flex flex-col @md:flex-row @lg:grid @lg:grid-cols-3 gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
</div>

<!-- Named container -->
<div class="@container/sidebar">
  <div class="@md/sidebar:flex-row flex flex-col">
    Responds to the sidebar container width
  </div>
</div>
```

### Container Query Breakpoints

| Prefix | Min-width |
|--------|-----------|
| `@xs:` | 320px (20rem) |
| `@sm:` | 384px (24rem) |
| `@md:` | 448px (28rem) |
| `@lg:` | 512px (32rem) |
| `@xl:` | 576px (36rem) |
| `@2xl:` | 672px (42rem) |
| `@3xl:` | 768px (48rem) |
| `@4xl:` | 896px (56rem) |
| `@5xl:` | 1024px (64rem) |

## Print Styles

Use the `print:` variant for print-specific styles:

```html
<nav class="print:hidden">Navigation hidden when printing</nav>
<article class="print:text-black print:bg-white">
  <h1 class="text-blue-600 print:text-black">Title</h1>
  <a href="#" class="text-blue-500 print:text-black print:underline">Link</a>
</article>
```

## Responsive Design Best Practices

```html
<!-- Complete responsive page layout -->
<div class="min-h-dvh bg-gray-50">
  <!-- Header -->
  <header class="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-lg">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <span class="text-lg font-bold sm:text-xl">Brand</span>
      <nav class="hidden md:flex md:gap-6">
        <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Products</a>
        <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
        <a href="#" class="text-sm text-gray-600 hover:text-gray-900">Docs</a>
      </nav>
      <button class="md:hidden rounded-lg p-2 hover:bg-gray-100">Menu</button>
    </div>
  </header>

  <!-- Hero -->
  <section class="px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div class="mx-auto max-w-3xl text-center">
      <h1 class="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        Build Amazing Products
      </h1>
      <p class="mt-4 text-base text-gray-600 sm:mt-6 sm:text-lg lg:text-xl">
        The platform for modern teams.
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <a href="#" class="rounded-lg bg-blue-600 px-6 py-3 text-center text-white">Get Started</a>
        <a href="#" class="rounded-lg border px-6 py-3 text-center">Learn More</a>
      </div>
    </div>
  </section>
</div>
```
