# Sizing

Tailwind CSS v4 provides utilities for controlling element dimensions: width, height, min/max dimensions, and aspect ratio.

## Width

### Fixed Widths (Spacing Scale)

| Class | CSS |
|-------|-----|
| `w-0` | `width: 0px` |
| `w-px` | `width: 1px` |
| `w-0.5` | `width: 0.125rem` (2px) |
| `w-1` | `width: 0.25rem` (4px) |
| `w-2` | `width: 0.5rem` (8px) |
| `w-4` | `width: 1rem` (16px) |
| `w-8` | `width: 2rem` (32px) |
| `w-12` | `width: 3rem` (48px) |
| `w-16` | `width: 4rem` (64px) |
| `w-20` | `width: 5rem` (80px) |
| `w-24` | `width: 6rem` (96px) |
| `w-32` | `width: 8rem` (128px) |
| `w-40` | `width: 10rem` (160px) |
| `w-48` | `width: 12rem` (192px) |
| `w-56` | `width: 14rem` (224px) |
| `w-64` | `width: 16rem` (256px) |
| `w-72` | `width: 18rem` (288px) |
| `w-80` | `width: 20rem` (320px) |
| `w-96` | `width: 24rem` (384px) |

### Percentage Widths

| Class | CSS |
|-------|-----|
| `w-1/2` | `width: 50%` |
| `w-1/3` | `width: 33.333333%` |
| `w-2/3` | `width: 66.666667%` |
| `w-1/4` | `width: 25%` |
| `w-2/4` | `width: 50%` |
| `w-3/4` | `width: 75%` |
| `w-1/5` | `width: 20%` |
| `w-2/5` | `width: 40%` |
| `w-3/5` | `width: 60%` |
| `w-4/5` | `width: 80%` |
| `w-1/6` | `width: 16.666667%` |
| `w-5/6` | `width: 83.333333%` |
| `w-1/12` to `w-11/12` | Twelfths |
| `w-full` | `width: 100%` |

### Special Widths

| Class | CSS |
|-------|-----|
| `w-auto` | `width: auto` |
| `w-screen` | `width: 100vw` |
| `w-svw` | `width: 100svw` (small viewport) |
| `w-lvw` | `width: 100lvw` (large viewport) |
| `w-dvw` | `width: 100dvw` (dynamic viewport) |
| `w-min` | `width: min-content` |
| `w-max` | `width: max-content` |
| `w-fit` | `width: fit-content` |

```html
<!-- Responsive width -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Full width on mobile, half on tablet, third on desktop
</div>

<!-- Fixed width sidebar -->
<aside class="w-64 shrink-0">Sidebar</aside>

<!-- Fit content -->
<span class="w-fit rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">Badge</span>

<!-- Arbitrary width -->
<div class="w-[762px]">Exact pixel width</div>
<div class="w-[calc(100%-2rem)]">Calculated width</div>
```

## Height

### Fixed Heights

Uses the same spacing scale as width: `h-0`, `h-px`, `h-1` through `h-96`.

### Special Heights

| Class | CSS |
|-------|-----|
| `h-auto` | `height: auto` |
| `h-full` | `height: 100%` |
| `h-screen` | `height: 100vh` |
| `h-svh` | `height: 100svh` (small viewport) |
| `h-lvh` | `height: 100lvh` (large viewport) |
| `h-dvh` | `height: 100dvh` (dynamic viewport) |
| `h-min` | `height: min-content` |
| `h-max` | `height: max-content` |
| `h-fit` | `height: fit-content` |
| `h-1/2` to `h-5/6` | Percentage heights |

```html
<!-- Full-height page with dynamic viewport -->
<div class="h-dvh flex flex-col">
  <header class="h-16 shrink-0 border-b px-6 flex items-center">Header</header>
  <main class="flex-1 overflow-y-auto p-6">
    Scrollable content area
  </main>
  <footer class="h-14 shrink-0 border-t px-6 flex items-center">Footer</footer>
</div>

<!-- Hero section -->
<section class="h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
  <h1 class="text-6xl font-bold text-white">Hero Section</h1>
</section>
```

## Size (Width and Height)

The `size-*` utility sets both width and height simultaneously.

| Class | CSS |
|-------|-----|
| `size-0` | `width: 0px; height: 0px` |
| `size-4` | `width: 1rem; height: 1rem` |
| `size-8` | `width: 2rem; height: 2rem` |
| `size-12` | `width: 3rem; height: 3rem` |
| `size-16` | `width: 4rem; height: 4rem` |
| `size-full` | `width: 100%; height: 100%` |

```html
<!-- Avatar -->
<img class="size-12 rounded-full" src="avatar.jpg" alt="User" />

<!-- Icon button -->
<button class="flex size-10 items-center justify-center rounded-lg hover:bg-gray-100">
  <svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">...</svg>
</button>

<!-- Color swatch -->
<div class="size-8 rounded-full bg-blue-500 ring-2 ring-white"></div>
```

## Min-Width

| Class | CSS |
|-------|-----|
| `min-w-0` | `min-width: 0px` |
| `min-w-px` | `min-width: 1px` |
| `min-w-1` to `min-w-96` | Uses spacing scale |
| `min-w-full` | `min-width: 100%` |
| `min-w-min` | `min-width: min-content` |
| `min-w-max` | `min-width: max-content` |
| `min-w-fit` | `min-width: fit-content` |

```html
<button class="min-w-[120px] rounded bg-blue-500 px-4 py-2 text-white">
  Minimum width button
</button>
```

## Max-Width

| Class | CSS |
|-------|-----|
| `max-w-xs` | `max-width: 20rem` (320px) |
| `max-w-sm` | `max-width: 24rem` (384px) |
| `max-w-md` | `max-width: 28rem` (448px) |
| `max-w-lg` | `max-width: 32rem` (512px) |
| `max-w-xl` | `max-width: 36rem` (576px) |
| `max-w-2xl` | `max-width: 42rem` (672px) |
| `max-w-3xl` | `max-width: 48rem` (768px) |
| `max-w-4xl` | `max-width: 56rem` (896px) |
| `max-w-5xl` | `max-width: 64rem` (1024px) |
| `max-w-6xl` | `max-width: 72rem` (1152px) |
| `max-w-7xl` | `max-width: 80rem` (1280px) |
| `max-w-full` | `max-width: 100%` |
| `max-w-none` | `max-width: none` |
| `max-w-prose` | `max-width: 65ch` |
| `max-w-screen-sm` | `max-width: 640px` |
| `max-w-screen-md` | `max-width: 768px` |
| `max-w-screen-lg` | `max-width: 1024px` |
| `max-w-screen-xl` | `max-width: 1280px` |
| `max-w-screen-2xl` | `max-width: 1536px` |
| `max-w-min` | `max-width: min-content` |
| `max-w-max` | `max-width: max-content` |
| `max-w-fit` | `max-width: fit-content` |

```html
<!-- Centered content container -->
<div class="mx-auto max-w-4xl px-6">Content limited to 896px</div>

<!-- Prose width for readability -->
<article class="mx-auto max-w-prose">
  <p>Text content at a comfortable reading width (~65 characters per line).</p>
</article>

<!-- Responsive max-width -->
<div class="max-w-sm md:max-w-md lg:max-w-lg mx-auto">
  Growing max-width at larger screens
</div>
```

## Min-Height

| Class | CSS |
|-------|-----|
| `min-h-0` | `min-height: 0px` |
| `min-h-full` | `min-height: 100%` |
| `min-h-screen` | `min-height: 100vh` |
| `min-h-svh` | `min-height: 100svh` |
| `min-h-lvh` | `min-height: 100lvh` |
| `min-h-dvh` | `min-height: 100dvh` |
| `min-h-min` | `min-height: min-content` |
| `min-h-max` | `min-height: max-content` |
| `min-h-fit` | `min-height: fit-content` |
| `min-h-1` to `min-h-96` | Uses spacing scale |

```html
<!-- Page that fills at least the full viewport -->
<div class="min-h-dvh flex flex-col">
  <header>...</header>
  <main class="flex-1">Content pushes footer down</main>
  <footer>Always at bottom or below</footer>
</div>
```

## Max-Height

| Class | CSS |
|-------|-----|
| `max-h-0` | `max-height: 0px` |
| `max-h-full` | `max-height: 100%` |
| `max-h-screen` | `max-height: 100vh` |
| `max-h-svh` | `max-height: 100svh` |
| `max-h-dvh` | `max-height: 100dvh` |
| `max-h-min` | `max-height: min-content` |
| `max-h-max` | `max-height: max-content` |
| `max-h-fit` | `max-height: fit-content` |
| `max-h-none` | `max-height: none` |
| `max-h-1` to `max-h-96` | Uses spacing scale |

```html
<!-- Dropdown with max height and scroll -->
<div class="max-h-60 overflow-y-auto rounded-lg border bg-white shadow-lg">
  <ul class="py-1">
    <li class="px-4 py-2 hover:bg-gray-100">Option 1</li>
    <li class="px-4 py-2 hover:bg-gray-100">Option 2</li>
    <!-- many more items... -->
  </ul>
</div>

<!-- Expandable content -->
<div class="max-h-0 overflow-hidden transition-all duration-300 data-[open]:max-h-[500px]">
  Expandable content that animates open
</div>
```

## Aspect Ratio

| Class | CSS |
|-------|-----|
| `aspect-auto` | `aspect-ratio: auto` |
| `aspect-square` | `aspect-ratio: 1 / 1` |
| `aspect-video` | `aspect-ratio: 16 / 9` |

```html
<!-- Video embed -->
<div class="aspect-video w-full overflow-hidden rounded-xl">
  <iframe class="h-full w-full" src="https://youtube.com/embed/..." allowfullscreen></iframe>
</div>

<!-- Square avatar -->
<img class="aspect-square w-20 rounded-lg object-cover" src="photo.jpg" alt="" />

<!-- Custom aspect ratio -->
<div class="aspect-[4/3] w-full bg-gray-200 rounded-lg">4:3 aspect ratio</div>
<div class="aspect-[21/9] w-full bg-gray-200 rounded-lg">Ultra-wide 21:9</div>
```

## Custom Sizing in v4

Extend the sizing scale via `@theme`:

```css
@theme {
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;
  --spacing-128: 32rem;
  --spacing-sidebar: 280px;
}
```

Then use: `w-sidebar`, `h-128`, `max-w-88`, etc.
