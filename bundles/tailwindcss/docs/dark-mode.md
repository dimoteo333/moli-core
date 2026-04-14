# Dark Mode

Tailwind CSS v4 has built-in support for dark mode using the `dark:` variant. By default, it respects the user's system preference via `prefers-color-scheme`.

## Basic Usage

Prefix any utility with `dark:` to apply it only in dark mode:

```html
<div class="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
  <h1 class="text-gray-900 dark:text-white">Heading</h1>
  <p class="text-gray-600 dark:text-gray-400">Body text</p>
  <a href="#" class="text-blue-600 dark:text-blue-400">Link</a>
</div>
```

## Dark Mode Strategies

### System Preference (Default)

By default, Tailwind v4 uses `@media (prefers-color-scheme: dark)`. No extra configuration needed.

```html
<!-- Automatically adapts to OS dark mode setting -->
<div class="bg-white dark:bg-gray-900">
  Content adapts to system preference
</div>
```

### Manual Toggle with Class/Selector

To control dark mode manually (e.g., with a toggle button), configure the dark mode variant in your CSS:

```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));
```

Then add the `dark` class to the `<html>` or a parent element:

```html
<html class="dark">
  <body class="bg-white dark:bg-gray-950">
    <!-- Dark mode is active -->
  </body>
</html>
```

### Using Data Attributes

```css
@import "tailwindcss";

@variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

```html
<html data-theme="dark">
  <body class="bg-white dark:bg-gray-950">
    Content
  </body>
</html>
```

## JavaScript Toggle

```html
<button id="theme-toggle" class="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
  <svg class="hidden h-5 w-5 dark:block" fill="currentColor"><!-- sun icon --></svg>
  <svg class="block h-5 w-5 dark:hidden" fill="currentColor"><!-- moon icon --></svg>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  });

  // On page load, check preference
  if (localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

## Common Dark Mode Patterns

### Page Layout

```html
<body class="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
  <header class="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <span class="font-bold text-gray-900 dark:text-white">Logo</span>
    </nav>
  </header>
  <main class="mx-auto max-w-7xl px-6 py-12">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Page Title</h1>
    <p class="mt-4 text-gray-600 dark:text-gray-400">Description</p>
  </main>
</body>
```

### Cards

```html
<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
  <h3 class="font-semibold text-gray-900 dark:text-white">Card Title</h3>
  <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Card description</p>
  <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
    Action
  </button>
</div>
```

### Form Inputs

```html
<input
  type="text"
  class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-400"
  placeholder="Enter text..."
/>
```

### Alerts

```html
<!-- Info alert -->
<div class="rounded-lg bg-blue-50 p-4 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
  <p class="text-sm font-medium">New update available.</p>
</div>

<!-- Error alert -->
<div class="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-300">
  <p class="text-sm font-medium">Something went wrong.</p>
</div>
```

### Tables

```html
<table class="w-full text-sm">
  <thead>
    <tr class="border-b border-gray-200 dark:border-gray-700">
      <th class="py-3 text-left font-medium text-gray-500 dark:text-gray-400">Name</th>
      <th class="py-3 text-left font-medium text-gray-500 dark:text-gray-400">Status</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
    <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td class="py-3 text-gray-900 dark:text-gray-100">Item 1</td>
      <td class="py-3">
        <span class="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</span>
      </td>
    </tr>
  </tbody>
</table>
```

### Images and Media

```html
<!-- Different image for dark mode -->
<img class="dark:hidden" src="logo-light.svg" alt="Logo" />
<img class="hidden dark:block" src="logo-dark.svg" alt="Logo" />

<!-- Invert a dark logo for dark backgrounds -->
<img class="dark:invert" src="logo-dark.svg" alt="Logo" />

<!-- Dim images in dark mode -->
<img class="dark:brightness-90 dark:contrast-[1.05]" src="photo.jpg" alt="" />
```

## Color Token Pattern

Define semantic color tokens that adapt to dark mode:

```css
@theme {
  --color-surface: #ffffff;
  --color-surface-secondary: #f9fafb;
  --color-on-surface: #111827;
  --color-on-surface-secondary: #6b7280;
  --color-border: #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #030712;
    --color-surface-secondary: #111827;
    --color-on-surface: #f9fafb;
    --color-on-surface-secondary: #9ca3af;
    --color-border: #374151;
  }
}
```

```html
<!-- Uses semantic tokens, no dark: prefix needed -->
<div class="bg-surface text-on-surface border-border border rounded-lg p-6">
  <p class="text-on-surface-secondary">Automatically adapts</p>
</div>
```

## Nested Dark Mode

Dark mode applies to the element and all descendants:

```html
<div class="dark">
  <!-- Everything inside is dark -->
  <div class="bg-white dark:bg-gray-900">
    <p class="text-gray-900 dark:text-gray-100">Dark content</p>
  </div>
</div>
```

## Combining with Other Variants

```html
<!-- Dark mode + hover -->
<button class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700">
  Button
</button>

<!-- Dark mode + focus -->
<input class="border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400" />

<!-- Dark mode + responsive -->
<div class="bg-white md:bg-gray-50 dark:bg-gray-900 dark:md:bg-gray-800">
  Responsive dark mode
</div>
```
