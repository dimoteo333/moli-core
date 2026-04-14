# Configuration

Tailwind CSS v4 uses a CSS-first configuration approach. Instead of a JavaScript config file, you configure everything directly in your CSS using the `@theme` directive and other CSS-native features.

## The @theme Directive

The `@theme` directive is the primary way to customize Tailwind v4. It defines design tokens as CSS custom properties that Tailwind uses to generate utility classes.

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-primary-light: #93c5fd;
  --color-primary-dark: #1d4ed8;

  --font-sans: "Inter", "system-ui", sans-serif;
  --font-mono: "Fira Code", monospace;

  --breakpoint-3xl: 1920px;

  --spacing-18: 4.5rem;
  --spacing-128: 32rem;
}
```

This generates utility classes automatically: `bg-primary`, `text-primary-dark`, `font-sans`, `3xl:hidden`, `p-18`, `w-128`, etc.

## Theme Namespaces

Tailwind v4 organizes theme values into namespaces. Each namespace maps to specific utility classes.

### Colors

```css
@theme {
  --color-brand: #6366f1;
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-500: #6366f1;
  --color-brand-900: #312e81;
  --color-surface: #ffffff;
  --color-surface-dark: #1e1e2e;
}
```

Generates: `text-brand`, `bg-brand-50`, `border-brand-500`, `text-surface`, etc.

### Font Family

```css
@theme {
  --font-sans: "Inter", system-ui, sans-serif;
  --font-serif: "Merriweather", Georgia, serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-display: "Cal Sans", sans-serif;
}
```

Generates: `font-sans`, `font-serif`, `font-mono`, `font-display`.

### Font Size

```css
@theme {
  --text-xs: 0.75rem;
  --text-xs--line-height: 1rem;
  --text-base: 1rem;
  --text-base--line-height: 1.5rem;
  --text-hero: 4.5rem;
  --text-hero--line-height: 1;
  --text-hero--letter-spacing: -0.02em;
  --text-hero--font-weight: 800;
}
```

### Spacing

```css
@theme {
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;
  --spacing-128: 32rem;
  --spacing-gutter: 2rem;
}
```

### Breakpoints

```css
@theme {
  --breakpoint-xs: 475px;
  --breakpoint-3xl: 1920px;
}
```

Generates: `xs:flex`, `3xl:hidden`, etc.

### Border Radius

```css
@theme {
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-pill: 9999px;
}
```

Generates: `rounded-pill`, etc.

### Shadows

```css
@theme {
  --shadow-soft: 0 2px 8px -2px rgb(0 0 0 / 0.1);
  --shadow-hard: 0 2px 4px 0 rgb(0 0 0 / 0.25);
  --shadow-glow: 0 0 15px rgb(99 102 241 / 0.4);
}
```

Generates: `shadow-soft`, `shadow-hard`, `shadow-glow`.

### Animations

```css
@theme {
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-slide-up: slide-up 0.4s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

Generates: `animate-fade-in`, `animate-slide-up`.

## Resetting Theme Namespaces

Use the wildcard `initial` pattern to remove all defaults in a namespace:

```css
@theme {
  --color-*: initial;          /* Remove all default colors */
  --color-black: #000;         /* Add back only what you need */
  --color-white: #fff;
  --color-primary: #3b82f6;
  --color-gray-50: #f9fafb;
  --color-gray-900: #111827;
}
```

To reset everything:

```css
@theme {
  --*: initial;                /* Remove ALL default theme values */
}
```

## CSS Variables

Theme values are exposed as CSS custom properties, making them available everywhere:

```css
.custom-element {
  background-color: var(--color-primary);
  font-family: var(--font-sans);
  padding: var(--spacing-4);
}
```

### Using CSS Variables in Utilities

```html
<!-- Reference any CSS variable as an arbitrary value -->
<div class="bg-[var(--sidebar-bg)]">Sidebar</div>

<!-- v4 shorthand for variables -->
<div class="bg-(--sidebar-bg)">Same, shorter syntax</div>
<div class="text-(--heading-color)">Custom text color</div>
```

## The @source Directive

Control which files Tailwind scans for class names:

```css
@import "tailwindcss";

/* Include additional source directories */
@source "../node_modules/@my-org/ui-components/src";
@source "../content/**/*.mdx";

/* Exclude directories */
@source not "./src/legacy";
```

## The @plugin Directive

Load Tailwind plugins directly in CSS:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/container-queries";
```

## The @utility Directive

Define custom utilities in CSS:

```css
@utility text-balance {
  text-wrap: balance;
}

@utility scrollbar-hidden {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

/* Functional utility with a value */
@utility tab-size-* {
  tab-size: --value(--tab-size-*, integer);
}
```

Then use as `text-balance`, `scrollbar-hidden`, `tab-size-4`.

## The @variant Directive

Define custom variants:

```css
@variant hocus (&:hover, &:focus);
@variant supports-grid (@supports (display: grid));
@variant theme-dark (&:where([data-theme="dark"] *));
```

Use them:

```html
<button class="hocus:bg-blue-600">Hover or focus</button>
<div class="theme-dark:bg-gray-900">Dark theme</div>
```

## @layer Directives

Organize custom CSS into Tailwind's cascade layers:

```css
@layer base {
  html {
    font-family: var(--font-sans);
    scroll-behavior: smooth;
  }
  h1, h2, h3 {
    font-weight: 700;
    text-wrap: balance;
  }
}

@layer components {
  .card {
    @apply rounded-xl border border-gray-200 bg-white p-6 shadow-sm;
  }
  .btn {
    @apply inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition;
  }
}

@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

## @apply Directive

Use `@apply` to compose Tailwind utilities within custom CSS:

```css
.btn-primary {
  @apply rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600;
}

.input {
  @apply block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm;
}
```

## Important Modifier

Use `!` prefix to make any utility `!important`:

```html
<div class="!text-red-500">Always red, regardless of specificity</div>
<div class="!mt-0">Always no top margin</div>
```

## Arbitrary Values

Use square brackets for one-off values:

```html
<div class="w-[762px]">Exact width</div>
<div class="bg-[#1da1f2]">Twitter blue</div>
<div class="grid-cols-[1fr_2fr_1fr]">Custom grid</div>
<div class="text-[clamp(1rem,2.5vw,2rem)]">Fluid text</div>
<div class="content-['hello']">CSS content property</div>
<div class="top-[calc(100%-2rem)]">Calc expression</div>
```

## Arbitrary Properties

For any CSS property not covered by a utility:

```html
<div class="[mask-image:linear-gradient(to_bottom,black,transparent)]">
  Fade out mask
</div>
<div class="[writing-mode:vertical-rl]">Vertical text</div>
```

## Prefix Configuration

In v4, add a prefix via the CSS import:

```css
@import "tailwindcss" prefix(tw);
```

Then use classes like `tw:flex`, `tw:bg-blue-500`, `tw:text-center`.
