# Installation

## Prerequisites

- **Node.js** 18+ and a package manager (npm, pnpm, yarn, or bun)
- A React framework: **Next.js 13.4+**, **Vite + React**, **Remix**, **Astro**, or **Gatsby**
- **Tailwind CSS v3.4+** (or v4) configured in your project
- **TypeScript** is recommended but not required

## Quick Start with CLI

```bash
npx shadcn@latest init
```

The CLI will prompt you for:

1. **Style** — `new-york` or `default`. New York is the recommended style with smaller, refined components.
2. **Base color** — `slate`, `gray`, `zinc`, `neutral`, or `stone`.
3. **CSS variables** — whether to use CSS variables for theming (recommended: yes).

After initialization, the CLI creates:

- `components.json` — project configuration
- `lib/utils.ts` — the `cn` utility function
- `globals.css` — updated with CSS variable definitions and Tailwind directives

## Framework-Specific Setup

### Next.js (App Router)

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npx shadcn@latest init
```

### Next.js (Pages Router)

Same steps as above. The CLI auto-detects your router setup.

### Vite + React

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init
```

Update `vite.config.ts` to include the path alias:

```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Remix

```bash
npx create-remix@latest my-app
cd my-app
npx shadcn@latest init
```

### Astro

```bash
npm create astro@latest my-app
cd my-app
npx astro add react tailwind
npx shadcn@latest init
```

## Configuration File

The `components.json` file holds configuration for your project:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### Key Configuration Options

| Option | Description |
|--------|-------------|
| `style` | The component style (`default` or `new-york`) |
| `rsc` | Whether to generate React Server Components (Next.js App Router) |
| `tsx` | Use `.tsx` (true) or `.jsx` (false) file extensions |
| `tailwind.config` | Path to your Tailwind config file |
| `tailwind.css` | Path to your global CSS file |
| `tailwind.baseColor` | Base color palette for generated CSS variables |
| `tailwind.cssVariables` | Use CSS variables (true) or Tailwind utility classes (false) |
| `aliases.components` | Import alias for your components directory |
| `aliases.utils` | Import alias for your utility functions |
| `aliases.ui` | Import alias for UI components (where shadcn installs to) |

## Adding Components

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components at once
npx shadcn@latest add button card dialog input

# Add all components
npx shadcn@latest add --all
```

Components are installed into your `components/ui` directory. They are **not** hidden in `node_modules` — you own the code and can modify it freely.

## The cn Utility

The `cn` utility function combines `clsx` and `tailwind-merge` for conditional class merging:

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Usage:

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "flex items-center",
  isActive && "bg-primary text-primary-foreground",
  className
)} />
```

## Dark Mode

### Next.js (with next-themes)

```bash
npm install next-themes
```

Create a theme provider:

```tsx
// components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

Wrap your root layout:

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Vite / Other Frameworks

Use the `class` strategy on the `<html>` element and toggle it manually or with a library:

```tsx
document.documentElement.classList.toggle("dark")
```

## Dependencies

shadcn/ui components are built on these key libraries:

| Library | Purpose |
|---------|---------|
| [Radix UI](https://www.radix-ui.com/) | Headless, accessible UI primitives |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [class-variance-authority](https://cva.style/docs) | Component variant management |
| [clsx](https://github.com/lukeed/clsx) | Conditional className construction |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Intelligent Tailwind class merging |
| [lucide-react](https://lucide.dev/) | Icon library used in examples |

## Updating Components

To check for component updates:

```bash
npx shadcn@latest diff
```

To update a specific component:

```bash
npx shadcn@latest diff button
```

This shows the diff between your local file and the latest version. Apply changes manually since you may have customized the component.
