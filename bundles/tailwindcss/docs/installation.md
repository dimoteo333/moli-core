# Installation

Tailwind CSS v4 is a major evolution with a CSS-first configuration approach. It uses a new high-performance engine written in Rust and eliminates the need for `tailwind.config.js` in most cases.

## Using Vite (Recommended)

Install the Tailwind CSS Vite plugin:

```bash
npm install tailwindcss @tailwindcss/vite
```

Add the plugin to your `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

Import Tailwind in your main CSS file:

```css
@import "tailwindcss";
```

## Using PostCSS

Install Tailwind CSS and the PostCSS plugin:

```bash
npm install tailwindcss @tailwindcss/postcss
```

Add to your `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Import Tailwind in your CSS:

```css
@import "tailwindcss";
```

## Using the CLI

For projects without a build tool:

```bash
npm install tailwindcss @tailwindcss/cli
```

Create your CSS file (`src/input.css`):

```css
@import "tailwindcss";
```

Build your CSS:

```bash
npx @tailwindcss/cli -i src/input.css -o dist/output.css --watch
```

For production, add the `--minify` flag:

```bash
npx @tailwindcss/cli -i src/input.css -o dist/output.css --minify
```

## Framework-Specific Setup

### Next.js

```bash
npm install tailwindcss @tailwindcss/postcss
```

`postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Import in your `app/globals.css`:

```css
@import "tailwindcss";
```

### React (Vite)

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Replace `src/index.css` contents with:

```css
@import "tailwindcss";
```

### Nuxt

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `nuxt.config.ts`:

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
});
```

Create `assets/css/main.css`:

```css
@import "tailwindcss";
```

### SvelteKit

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `vite.config.ts`:

```ts
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
```

Create `src/app.css`:

```css
@import "tailwindcss";
```

Import in `src/routes/+layout.svelte`:

```svelte
<script>
  import "../app.css";
</script>

<slot />
```

### Astro

```bash
npx astro add tailwind
```

Or manually:

```bash
npm install tailwindcss @tailwindcss/vite
```

Update `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

## CDN / Play CDN

For prototyping or quick experiments, use the Play CDN (not for production):

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1 class="text-3xl font-bold text-blue-600">Hello, Tailwind!</h1>
</body>
</html>
```

Note: The Play CDN uses Tailwind v3 syntax. For v4, use one of the build tool methods above.

## CSS File Structure in v4

A typical Tailwind v4 CSS entry point:

```css
@import "tailwindcss";

/* Custom theme configuration */
@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
  --breakpoint-3xl: 1920px;
}

/* Custom base styles */
@layer base {
  body {
    @apply bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100;
  }
}

/* Custom component classes */
@layer components {
  .btn {
    @apply rounded-lg px-4 py-2 font-medium transition;
  }
  .btn-primary {
    @apply btn bg-primary text-white hover:bg-primary/90;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## Content Detection

Tailwind v4 uses automatic content detection -- it scans your project for template files and only generates the CSS for classes you actually use. No `content` configuration is needed in most cases.

If you need to explicitly include files or directories, use the `@source` directive:

```css
@import "tailwindcss";
@source "../node_modules/my-ui-library/src";
```

To exclude files:

```css
@source not "../src/legacy";
```

## Migrating from v3

Key differences from Tailwind CSS v3 to v4:

- **No `tailwind.config.js`**: Use `@theme` in CSS instead
- **No `@tailwind` directives**: Use `@import "tailwindcss"` instead
- **No `content` array**: Automatic content detection
- **CSS-first configuration**: Everything is configured in CSS
- **Native CSS cascade layers**: Built on `@layer`
- **Lightning CSS**: New engine for faster builds

Tailwind provides a migration tool:

```bash
npx @tailwindcss/upgrade
```

This will automatically convert your `tailwind.config.js` to CSS `@theme` directives and update your templates.
