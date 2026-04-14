# Spacing

Tailwind CSS v4 provides a comprehensive spacing system for padding, margin, gap, and space-between utilities. The default spacing scale uses a linear 4px grid.

## Spacing Scale

| Class suffix | Value |
|-------------|-------|
| `0` | `0px` |
| `px` | `1px` |
| `0.5` | `0.125rem` (2px) |
| `1` | `0.25rem` (4px) |
| `1.5` | `0.375rem` (6px) |
| `2` | `0.5rem` (8px) |
| `2.5` | `0.625rem` (10px) |
| `3` | `0.75rem` (12px) |
| `3.5` | `0.875rem` (14px) |
| `4` | `1rem` (16px) |
| `5` | `1.25rem` (20px) |
| `6` | `1.5rem` (24px) |
| `7` | `1.75rem` (28px) |
| `8` | `2rem` (32px) |
| `9` | `2.25rem` (36px) |
| `10` | `2.5rem` (40px) |
| `11` | `2.75rem` (44px) |
| `12` | `3rem` (48px) |
| `14` | `3.5rem` (56px) |
| `16` | `4rem` (64px) |
| `20` | `5rem` (80px) |
| `24` | `6rem` (96px) |
| `28` | `7rem` (112px) |
| `32` | `8rem` (128px) |
| `36` | `9rem` (144px) |
| `40` | `10rem` (160px) |
| `44` | `11rem` (176px) |
| `48` | `12rem` (192px) |
| `52` | `13rem` (208px) |
| `56` | `14rem` (224px) |
| `60` | `15rem` (240px) |
| `64` | `16rem` (256px) |
| `72` | `18rem` (288px) |
| `80` | `20rem` (320px) |
| `96` | `24rem` (384px) |

In Tailwind v4, you can also use any bare value: `p-[17px]`, `m-[2.5rem]`, or CSS variables: `p-(--my-spacing)`.

## Padding

Use `p-{size}` to apply padding to all sides, or directional variants.

| Prefix | Sides affected |
|--------|---------------|
| `p-` | All sides |
| `px-` | Left and right (inline) |
| `py-` | Top and bottom (block) |
| `pt-` | Top |
| `pr-` | Right |
| `pb-` | Bottom |
| `pl-` | Left |
| `ps-` | Inline-start (logical) |
| `pe-` | Inline-end (logical) |

```html
<!-- All sides -->
<div class="p-6 bg-white rounded-lg shadow">Padded content</div>

<!-- Asymmetric padding -->
<div class="px-4 py-8">Horizontal 1rem, vertical 2rem</div>

<!-- Individual sides -->
<div class="pt-10 pb-6 pl-4 pr-4">Custom padding per side</div>

<!-- Responsive padding -->
<div class="p-4 md:p-6 lg:p-8 xl:p-12">
  Padding increases with screen size
</div>

<!-- Logical properties for RTL support -->
<div class="ps-4 pe-8">Start and end padding (RTL-aware)</div>
```

## Margin

Use `m-{size}` for margins. Supports the same directional prefixes as padding.

| Prefix | Sides affected |
|--------|---------------|
| `m-` | All sides |
| `mx-` | Left and right |
| `my-` | Top and bottom |
| `mt-` | Top |
| `mr-` | Right |
| `mb-` | Bottom |
| `ml-` | Left |
| `ms-` | Inline-start (logical) |
| `me-` | Inline-end (logical) |

```html
<!-- Center a block element -->
<div class="mx-auto max-w-2xl">Centered container</div>

<!-- Stack with consistent vertical spacing -->
<h2 class="mb-4 text-2xl font-bold">Title</h2>
<p class="mb-6">First paragraph</p>
<p class="mb-6">Second paragraph</p>

<!-- Responsive margins -->
<section class="mt-8 md:mt-12 lg:mt-16">Section with responsive top margin</section>
```

### Negative Margins

Prefix with `-` for negative margins. Useful for breaking out of containers or overlapping elements.

```html
<!-- Pull element up to overlap -->
<div class="relative -mt-8 rounded-lg bg-white p-6 shadow-lg">
  This card overlaps the section above by 2rem
</div>

<!-- Extend to edges of parent padding -->
<div class="p-6">
  <div class="-mx-6 bg-gray-100 px-6 py-4">
    This stretches to the full width despite parent padding
  </div>
</div>
```

### Auto Margins

```html
<!-- Push element to the right in a flex container -->
<nav class="flex items-center">
  <span class="text-xl font-bold">Logo</span>
  <button class="ml-auto rounded bg-blue-500 px-4 py-2 text-white">Sign In</button>
</nav>

<!-- Center horizontally -->
<div class="mx-auto w-full max-w-lg">Centered block</div>
```

## Space Between

Add spacing between child elements without applying margin to each one.

| Class | Effect |
|-------|--------|
| `space-x-{size}` | Horizontal spacing between children |
| `space-y-{size}` | Vertical spacing between children |
| `space-x-reverse` | Reverse horizontal spacing order |
| `space-y-reverse` | Reverse vertical spacing order |

```html
<!-- Horizontal spacing -->
<div class="flex space-x-4">
  <button class="rounded bg-blue-500 px-4 py-2 text-white">Save</button>
  <button class="rounded bg-gray-200 px-4 py-2">Cancel</button>
  <button class="rounded border px-4 py-2">Reset</button>
</div>

<!-- Vertical spacing for a form -->
<form class="space-y-6">
  <div>
    <label class="block text-sm font-medium">Name</label>
    <input class="mt-1 block w-full rounded border p-2" type="text" />
  </div>
  <div>
    <label class="block text-sm font-medium">Email</label>
    <input class="mt-1 block w-full rounded border p-2" type="email" />
  </div>
  <button class="rounded bg-blue-600 px-6 py-2 text-white" type="submit">Submit</button>
</form>
```

Note: In most cases, prefer `gap-*` with flex or grid over `space-*`, as gap handles wrapping and edge cases better.

## Gap

Use `gap-{size}` with flex, grid, or multi-column layouts.

```html
<!-- Grid with gap -->
<div class="grid grid-cols-3 gap-6">
  <div class="rounded bg-white p-4 shadow">Item 1</div>
  <div class="rounded bg-white p-4 shadow">Item 2</div>
  <div class="rounded bg-white p-4 shadow">Item 3</div>
</div>

<!-- Flex with gap -->
<div class="flex flex-wrap gap-2">
  <span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">React</span>
  <span class="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">Vue</span>
  <span class="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">Svelte</span>
</div>

<!-- Different horizontal and vertical gaps -->
<div class="grid grid-cols-2 gap-x-8 gap-y-4">
  <div>Wide horizontal gap</div>
  <div>Narrow vertical gap</div>
  <div>Between rows</div>
  <div>And columns</div>
</div>
```

## Width

See also: `sizing.md` for comprehensive width, height, and dimension utilities.

| Class | CSS |
|-------|-----|
| `w-0` | `width: 0px` |
| `w-px` | `width: 1px` |
| `w-1` to `w-96` | Uses spacing scale |
| `w-auto` | `width: auto` |
| `w-full` | `width: 100%` |
| `w-screen` | `width: 100vw` |
| `w-svw` | `width: 100svw` |
| `w-lvw` | `width: 100lvw` |
| `w-dvw` | `width: 100dvw` |
| `w-min` | `width: min-content` |
| `w-max` | `width: max-content` |
| `w-fit` | `width: fit-content` |
| `w-1/2` | `width: 50%` |
| `w-1/3` | `width: 33.333%` |
| `w-2/3` | `width: 66.667%` |
| `w-1/4` | `width: 25%` |
| `w-3/4` | `width: 75%` |
| `w-1/5` to `w-4/5` | Fifths |
| `w-1/6` to `w-5/6` | Sixths |
| `w-1/12` to `w-11/12` | Twelfths |

## Height

| Class | CSS |
|-------|-----|
| `h-0` | `height: 0px` |
| `h-px` | `height: 1px` |
| `h-1` to `h-96` | Uses spacing scale |
| `h-auto` | `height: auto` |
| `h-full` | `height: 100%` |
| `h-screen` | `height: 100vh` |
| `h-svh` | `height: 100svh` |
| `h-lvh` | `height: 100lvh` |
| `h-dvh` | `height: 100dvh` |
| `h-min` | `height: min-content` |
| `h-max` | `height: max-content` |
| `h-fit` | `height: fit-content` |

```html
<!-- Full-height page layout -->
<div class="flex h-dvh flex-col">
  <header class="h-16 shrink-0 border-b">Header</header>
  <main class="flex-1 overflow-y-auto p-6">Scrollable content</main>
  <footer class="h-12 shrink-0 border-t">Footer</footer>
</div>
```

## Customizing Spacing in v4

In Tailwind v4, extend the spacing scale using the `@theme` directive in your CSS:

```css
@theme {
  --spacing-18: 4.5rem;
  --spacing-128: 32rem;
}
```

Then use as `p-18`, `m-128`, `w-128`, etc.

You can also use arbitrary values inline:

```html
<div class="p-[13px]">13px padding</div>
<div class="mt-[clamp(1rem,5vw,3rem)]">Responsive clamp margin</div>
<div class="gap-[var(--app-gutter)]">CSS variable gap</div>
```
