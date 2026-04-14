# Customization

Tailwind CSS v4 provides multiple ways to customize and extend the framework: arbitrary values, the `@apply` directive, custom utilities, plugins, and CSS layers.

## Arbitrary Values

Use square brackets `[...]` for one-off custom values on any utility:

```html
<!-- Spacing -->
<div class="p-[13px]">13px padding</div>
<div class="mt-[clamp(1rem,5vw,3rem)]">Fluid margin</div>
<div class="gap-[var(--app-gap)]">CSS variable gap</div>

<!-- Sizing -->
<div class="w-[762px]">Exact width</div>
<div class="h-[calc(100vh-4rem)]">Viewport minus header</div>
<div class="max-w-[65ch]">Character-based max-width</div>

<!-- Colors -->
<div class="bg-[#1da1f2]">Hex color</div>
<div class="text-[rgb(59,130,246)]">RGB color</div>
<div class="bg-[hsl(220,90%,56%)]">HSL color</div>
<div class="bg-[oklch(0.7_0.15_250)]">OKLCH color</div>

<!-- Typography -->
<div class="text-[15px]">Custom font size</div>
<div class="leading-[1.7]">Custom line height</div>
<div class="font-[550]">Custom font weight</div>

<!-- Grid -->
<div class="grid-cols-[200px_1fr_200px]">Custom grid template</div>
<div class="grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">Auto-fill grid</div>

<!-- Transforms -->
<div class="rotate-[17deg]">Custom rotation</div>
<div class="translate-x-[calc(100%+1rem)]">Custom translate</div>
```

### Type Hints

When Tailwind cannot infer the type, add a type hint:

```html
<!-- Ambiguous: could be color or size -->
<div class="bg-[length:200px_100px]">Background size</div>
<div class="bg-[url('/image.png')]">Background image</div>
<div class="text-[color:var(--heading)]">Force color interpretation</div>
<div class="text-[length:1.5rem]">Force length interpretation</div>
```

## CSS Variable Shorthand

In v4, reference theme CSS variables using the `(--variable)` shorthand:

```html
<div class="bg-(--brand-color)">Theme variable</div>
<div class="text-(--heading-color)">Heading color from variable</div>
<div class="p-(--section-padding)">Section padding</div>
```

This is equivalent to `bg-[var(--brand-color)]` but shorter.

## Arbitrary Properties

For any CSS property not covered by a utility, use arbitrary properties:

```html
<div class="[mask-image:linear-gradient(to_bottom,black,transparent)]">
  Fade-out mask
</div>
<div class="[writing-mode:vertical-rl]">Vertical text</div>
<div class="[text-wrap:balance]">Balanced text</div>
<div class="[hyphens:auto]">Auto-hyphenated text</div>
<div class="[container-type:inline-size]">Container query target</div>
```

Arbitrary properties support variants:

```html
<div class="hover:[transform:rotateY(180deg)] transition-transform duration-500">
  Flips on hover
</div>
```

## @apply Directive

Compose Tailwind utilities into custom CSS classes:

```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition;
  }

  .btn-primary {
    @apply btn bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600;
  }

  .btn-secondary {
    @apply btn bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50;
  }

  .btn-danger {
    @apply btn bg-red-600 text-white hover:bg-red-700;
  }

  .input {
    @apply block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500;
  }

  .card {
    @apply rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800;
  }
}
```

Usage:

```html
<button class="btn-primary">Save Changes</button>
<button class="btn-secondary">Cancel</button>
<input class="input" placeholder="Enter email" />
<div class="card">Card content</div>
```

**Caution**: Prefer composing utilities in markup over `@apply`. Use `@apply` only for highly reused patterns or when you need to style elements you cannot add classes to (e.g., markdown output).

## @layer Directive

Organize custom CSS into Tailwind's cascade layers:

```css
/* Base: global defaults and resets */
@layer base {
  html {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }

  h1 { @apply text-3xl font-bold; }
  h2 { @apply text-2xl font-bold; }
  h3 { @apply text-xl font-semibold; }

  a { @apply text-blue-600 hover:text-blue-800; }
}

/* Components: reusable multi-class patterns */
@layer components {
  .prose {
    @apply text-gray-700 leading-relaxed;
  }
  .prose h2 {
    @apply mt-8 mb-4 text-2xl font-bold text-gray-900;
  }
  .prose p {
    @apply mb-4;
  }
}

/* Utilities: single-purpose helpers */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .scrollbar-hidden {
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
}
```

### Layer Ordering

1. **base** -- lowest specificity, global defaults
2. **components** -- reusable patterns
3. **utilities** -- highest specificity, always win

## @utility Directive

In v4, define custom utilities that integrate with the variant system:

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

@utility content-auto {
  content-visibility: auto;
}
```

These work with all variants:

```html
<h1 class="md:text-balance">Balanced on desktop</h1>
<div class="scrollbar-hidden overflow-y-auto">Hidden scrollbar</div>
```

### Functional Utilities

Create utilities that accept values:

```css
@utility tab-size-* {
  tab-size: --value(--tab-size-*, integer);
}
```

```html
<pre class="tab-size-4">Code with 4-space tabs</pre>
```

## @variant Directive

Define custom variants:

```css
/* Combine hover and focus */
@variant hocus (&:hover, &:focus);

/* Custom dark mode */
@variant theme-dark (&:where([data-theme="dark"] *));

/* Feature detection */
@variant supports-grid (@supports (display: grid));
@variant supports-container (@supports (container-type: inline-size));

/* Reduced motion */
@variant motion-safe (@media (prefers-reduced-motion: no-preference));
@variant motion-reduce (@media (prefers-reduced-motion: reduce));
```

```html
<button class="hocus:bg-blue-600 hocus:text-white">Hover or focus</button>
<div class="supports-grid:grid supports-grid:grid-cols-3">Grid if supported</div>
```

## Plugins

In v4, load plugins with the `@plugin` directive:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/container-queries";
@plugin "@tailwindcss/aspect-ratio";
```

### @tailwindcss/typography

Adds the `prose` class for styling rendered markdown/HTML:

```html
<article class="prose lg:prose-lg dark:prose-invert max-w-none">
  <h1>Article Title</h1>
  <p>Article content with <a href="#">links</a>, <strong>bold</strong>, and more.</p>
  <pre><code>console.log('hello');</code></pre>
</article>
```

### @tailwindcss/forms

Normalizes form element styles:

```html
<input type="text" class="rounded-lg border-gray-300" />
<select class="rounded-lg border-gray-300">
  <option>Option 1</option>
</select>
<textarea class="rounded-lg border-gray-300" rows="4"></textarea>
```

## Important Modifier

Prefix any utility with `!` to make it `!important`:

```html
<div class="!mt-0">Always zero margin-top</div>
<div class="!text-red-500">Always red text</div>
<div class="sm:!text-center">Important only at sm breakpoint</div>
```

## Prefix

Add a prefix to all Tailwind classes to avoid conflicts:

```css
@import "tailwindcss" prefix(tw);
```

```html
<div class="tw:flex tw:items-center tw:gap-4">
  <span class="tw:text-blue-500">Prefixed classes</span>
</div>
```
