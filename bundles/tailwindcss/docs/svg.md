# SVG

Tailwind CSS v4 provides utilities for styling inline SVG elements, including fill, stroke, and stroke-width.

## Fill

Use `fill-{color}` to set the fill color of SVG elements.

| Class | CSS |
|-------|-----|
| `fill-none` | `fill: none` |
| `fill-inherit` | `fill: inherit` |
| `fill-current` | `fill: currentColor` |
| `fill-transparent` | `fill: transparent` |
| `fill-black` | `fill: #000` |
| `fill-white` | `fill: #fff` |
| `fill-{color}-{shade}` | Fill with any Tailwind color |

```html
<!-- Fill with current text color -->
<svg class="h-6 w-6 fill-current text-blue-500" viewBox="0 0 24 24">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
</svg>

<!-- Direct fill color -->
<svg class="h-6 w-6 fill-red-500" viewBox="0 0 24 24">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
</svg>

<!-- Responsive fill -->
<svg class="h-5 w-5 fill-gray-400 hover:fill-red-500 transition-colors" viewBox="0 0 24 24">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
</svg>

<!-- Dark mode fill -->
<svg class="h-6 w-6 fill-gray-900 dark:fill-white" viewBox="0 0 24 24">
  <path d="..." />
</svg>
```

## Stroke

Use `stroke-{color}` to set the stroke (outline) color of SVG elements.

| Class | CSS |
|-------|-----|
| `stroke-none` | `stroke: none` |
| `stroke-inherit` | `stroke: inherit` |
| `stroke-current` | `stroke: currentColor` |
| `stroke-transparent` | `stroke: transparent` |
| `stroke-black` | `stroke: #000` |
| `stroke-white` | `stroke: #fff` |
| `stroke-{color}-{shade}` | Stroke with any Tailwind color |

```html
<!-- Outlined icon using stroke -->
<svg class="h-6 w-6 stroke-current text-gray-700" fill="none" stroke-width="2" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>

<!-- Stroke color changes on hover -->
<svg class="h-6 w-6 stroke-gray-400 hover:stroke-blue-500 transition-colors" fill="none" stroke-width="2" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>
```

## Stroke Width

| Class | CSS |
|-------|-----|
| `stroke-0` | `stroke-width: 0` |
| `stroke-1` | `stroke-width: 1` |
| `stroke-2` | `stroke-width: 2` |

```html
<svg class="h-8 w-8 stroke-blue-500 stroke-1" fill="none" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
</svg>

<svg class="h-8 w-8 stroke-blue-500 stroke-2" fill="none" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
</svg>

<!-- Arbitrary stroke width -->
<svg class="h-8 w-8 stroke-blue-500 stroke-[1.5]" fill="none" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
</svg>
```

## Using currentColor

The most common pattern is using `fill-current` or `stroke-current` with `text-{color}` to set the SVG color via the parent's text color:

```html
<!-- Icon inherits parent text color -->
<button class="flex items-center gap-2 text-blue-600 hover:text-blue-800">
  <svg class="h-5 w-5 fill-current" viewBox="0 0 20 20">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" />
  </svg>
  Add Item
</button>

<!-- Icon with text color -->
<span class="text-green-500">
  <svg class="h-5 w-5 fill-current" viewBox="0 0 20 20">
    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
  </svg>
</span>
```

## Common SVG Icon Patterns

### Icon Button

```html
<button class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
  <svg class="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
  </svg>
</button>
```

### Icon with Badge

```html
<div class="relative inline-flex">
  <svg class="h-6 w-6 fill-none stroke-current stroke-2 text-gray-600" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
  <span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
    3
  </span>
</div>
```

### Loading Spinner

```html
<svg class="h-5 w-5 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
  <circle class="opacity-25 stroke-current" cx="12" cy="12" r="10" stroke-width="4"></circle>
  <path class="opacity-75 fill-current" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
```

### Social Icons with Hover

```html
<div class="flex gap-4">
  <a href="#" class="text-gray-400 transition-colors hover:text-[#1da1f2]">
    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><!-- Twitter icon --></svg>
  </a>
  <a href="#" class="text-gray-400 transition-colors hover:text-[#333]">
    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><!-- GitHub icon --></svg>
  </a>
  <a href="#" class="text-gray-400 transition-colors hover:text-[#0077b5]">
    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24"><!-- LinkedIn icon --></svg>
  </a>
</div>
```

### Dual-Tone Icon (Fill + Stroke)

```html
<svg class="h-8 w-8" viewBox="0 0 24 24">
  <!-- Background shape -->
  <circle cx="12" cy="12" r="10" class="fill-blue-100 dark:fill-blue-900/30" />
  <!-- Foreground icon -->
  <path class="fill-none stroke-blue-600 dark:stroke-blue-400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
</svg>
```

## Opacity with SVG Colors

```html
<svg class="h-6 w-6 fill-blue-500/50" viewBox="0 0 24 24">
  <path d="..." />
</svg>

<svg class="h-6 w-6 stroke-red-500/75" fill="none" stroke-width="2" viewBox="0 0 24 24">
  <path d="..." />
</svg>
```
