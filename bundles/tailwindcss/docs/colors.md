# Colors

Tailwind CSS v4 includes an expertly-crafted default color palette with 22 color groups, each with shades from 50 (lightest) to 950 (darkest).

## Color Palette

### Grayscale Colors

| Name | Description |
|------|-------------|
| `slate` | Cool blue-gray |
| `gray` | Neutral gray |
| `zinc` | Warm neutral gray |
| `neutral` | True neutral gray |
| `stone` | Warm brown-gray |

### Colors

| Name | Description |
|------|-------------|
| `red` | Pure red |
| `orange` | Orange |
| `amber` | Warm amber/gold |
| `yellow` | Yellow |
| `lime` | Yellow-green |
| `green` | Green |
| `emerald` | Blue-green |
| `teal` | Teal |
| `cyan` | Cyan |
| `sky` | Light blue |
| `blue` | Blue |
| `indigo` | Blue-violet |
| `violet` | Violet |
| `purple` | Purple |
| `fuchsia` | Magenta |
| `pink` | Pink |
| `rose` | Rose/red-pink |

### Special Values

| Name | Value |
|------|-------|
| `inherit` | `inherit` |
| `current` | `currentColor` |
| `transparent` | `transparent` |
| `black` | `#000` |
| `white` | `#fff` |

### Shade Scale

Each color has the following shades: `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950`.

- `50` through `400` are light shades (use for backgrounds and light UI)
- `500` through `600` are mid shades (use for primary colors and accents)
- `700` through `950` are dark shades (use for text and dark UI)

## Text Color

Use `text-{color}-{shade}` to set text color.

```html
<p class="text-gray-900">Primary dark text</p>
<p class="text-gray-600">Secondary text</p>
<p class="text-gray-400">Muted/placeholder text</p>
<p class="text-blue-600">Link text</p>
<p class="text-red-600">Error text</p>
<p class="text-green-600">Success text</p>
<p class="text-amber-600">Warning text</p>

<!-- Responsive and state-based -->
<a class="text-blue-600 hover:text-blue-800 dark:text-blue-400" href="#">
  Styled link
</a>
```

## Background Color

Use `bg-{color}-{shade}` to set background color.

```html
<div class="bg-white dark:bg-gray-900">Page background</div>
<div class="bg-gray-50 dark:bg-gray-800">Section background</div>
<div class="bg-blue-500 text-white">Primary button</div>
<div class="bg-red-50 text-red-700 border border-red-200 p-4 rounded">Error alert</div>
<div class="bg-green-50 text-green-700 border border-green-200 p-4 rounded">Success alert</div>
<div class="bg-amber-50 text-amber-700 border border-amber-200 p-4 rounded">Warning alert</div>

<!-- Alert component example -->
<div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
  <div class="flex items-center gap-3">
    <svg class="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">...</svg>
    <p class="text-sm text-blue-700 dark:text-blue-300">
      A new software update is available.
    </p>
  </div>
</div>
```

## Border Color

Use `border-{color}-{shade}` to set border color.

```html
<input class="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />

<div class="border-l-4 border-yellow-500 bg-yellow-50 p-4">
  <p class="text-yellow-700">Warning: Check your settings.</p>
</div>

<div class="divide-y divide-gray-200">
  <div class="py-3">Row 1</div>
  <div class="py-3">Row 2</div>
  <div class="py-3">Row 3</div>
</div>
```

## Color Opacity

Use the `/` modifier to set any color's opacity (alpha).

```html
<!-- Background opacity -->
<div class="bg-black/50">50% black overlay</div>
<div class="bg-blue-500/75">75% opacity blue</div>
<div class="bg-white/90">90% opacity white</div>

<!-- Text opacity -->
<p class="text-black/80">80% black text</p>
<p class="text-white/60">60% white text</p>

<!-- Border opacity -->
<div class="border border-gray-900/10">10% opacity border</div>

<!-- Ring opacity -->
<button class="ring-2 ring-blue-500/50">Button with translucent ring</button>

<!-- Arbitrary opacity values -->
<div class="bg-blue-500/[0.15]">15% opacity blue background</div>

<!-- Responsive and state opacity -->
<button class="bg-blue-500 hover:bg-blue-500/90 active:bg-blue-500/80">
  Button with hover/active opacity
</button>
```

## Gradients

Use gradient utilities to create linear gradient backgrounds.

### Gradient Direction

| Class | CSS |
|-------|-----|
| `bg-gradient-to-t` | `background-image: linear-gradient(to top, ...)` |
| `bg-gradient-to-tr` | `to top right` |
| `bg-gradient-to-r` | `to right` |
| `bg-gradient-to-br` | `to bottom right` |
| `bg-gradient-to-b` | `to bottom` |
| `bg-gradient-to-bl` | `to bottom left` |
| `bg-gradient-to-l` | `to left` |
| `bg-gradient-to-tl` | `to top left` |

### Gradient Color Stops

| Class | Purpose |
|-------|---------|
| `from-{color}` | Starting color |
| `via-{color}` | Middle color |
| `to-{color}` | Ending color |

```html
<!-- Two-color gradient -->
<div class="h-48 bg-gradient-to-r from-blue-500 to-purple-600"></div>

<!-- Three-color gradient -->
<div class="h-48 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>

<!-- Gradient text -->
<h1 class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-6xl font-bold text-transparent">
  Gradient Heading
</h1>

<!-- Gradient button -->
<button class="rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-3 font-medium text-white shadow-lg hover:from-blue-600 hover:to-blue-800">
  Get Started
</button>

<!-- Gradient with opacity stops -->
<div class="bg-gradient-to-b from-black/60 via-black/30 to-transparent">
  Overlay fading from dark to transparent
</div>

<!-- Gradient hero section -->
<section class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-8 py-24 text-white">
  <h1 class="text-5xl font-bold">Welcome</h1>
  <p class="mt-4 text-xl text-white/80">Build something amazing.</p>
</section>
```

### Gradient Stop Positions

Control where each color stop is positioned in the gradient:

```html
<div class="bg-gradient-to-r from-blue-500 from-10% via-purple-500 via-50% to-pink-500 to-90%"></div>
```

## Accent Color

Use `accent-{color}` for form controls like checkboxes and radio buttons.

```html
<input type="checkbox" class="accent-blue-500" checked />
<input type="radio" class="accent-pink-500" checked />
<input type="range" class="accent-emerald-500" />
```

## Caret Color

Use `caret-{color}` to set the text cursor color in inputs.

```html
<input class="caret-blue-500 border rounded px-3 py-2" type="text" placeholder="Blue caret" />
```

## Placeholder Color

Use `placeholder:{color}` to style placeholder text.

```html
<input class="placeholder:text-gray-400 border rounded px-3 py-2" placeholder="Search..." />
```

## Custom Colors in Tailwind v4

In v4, define custom colors using the `@theme` directive in your CSS file. No `tailwind.config.js` needed.

```css
@theme {
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #93c5fd;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  --color-success: #22c55e;
  --color-danger: #ef4444;
  --color-warning: #f97316;
}
```

Use them exactly like built-in colors:

```html
<button class="bg-primary text-white hover:bg-primary-dark">
  Primary Button
</button>
<span class="text-danger">Required field</span>
<div class="border-l-4 border-warning bg-warning/10 p-4">Warning message</div>
```

### Using CSS Variables Directly

You can reference CSS variables with the `var()` syntax or Tailwind v4's shorthand:

```html
<!-- Arbitrary value with CSS variable -->
<div class="bg-[var(--brand-color)]">Custom variable color</div>

<!-- v4 shorthand for theme variables -->
<div class="bg-(--brand-color)">Same result, shorter syntax</div>
```

### Removing Default Colors

In v4, override the entire color palette by redefining it:

```css
@theme {
  --color-*: initial; /* Remove all default colors */
  --color-primary: #3b82f6;
  --color-gray-50: #f9fafb;
  --color-gray-900: #111827;
  --color-white: #ffffff;
  --color-black: #000000;
}
```

## Common Color Patterns

### Semantic Color System

```html
<!-- Status badges -->
<span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Active</span>
<span class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">Inactive</span>
<span class="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">Pending</span>
<span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">Draft</span>

<!-- Card with hover state -->
<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h3>
  <p class="mt-2 text-gray-600 dark:text-gray-300">Card description text.</p>
</div>
```

### Dark Mode Colors

```html
<div class="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
  <h1 class="text-gray-900 dark:text-white">Heading</h1>
  <p class="text-gray-600 dark:text-gray-400">Body text</p>
  <a class="text-blue-600 dark:text-blue-400" href="#">Link</a>
  <div class="border-gray-200 dark:border-gray-700">Bordered section</div>
</div>
```
