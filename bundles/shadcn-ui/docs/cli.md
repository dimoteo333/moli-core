# CLI Reference

The shadcn/ui CLI is used to initialize projects and add components. It installs components directly into your codebase — you own the code.

## Installation

The CLI runs via `npx` and does not need to be installed globally:

```bash
npx shadcn@latest <command>
```

Or install globally:

```bash
npm install -g shadcn
shadcn <command>
```

## Commands

### init

Initialize a new project with shadcn/ui configuration.

```bash
npx shadcn@latest init
```

Options:

| Flag | Description |
|------|-------------|
| `-y, --yes` | Skip prompts and use defaults |
| `-d, --defaults` | Use default configuration |
| `-f, --force` | Force overwrite of existing configuration |
| `-c, --cwd <path>` | Set the working directory (defaults to current directory) |

Interactive prompts:
1. **Which style?** — `default` or `new-york`
2. **Which base color?** — `slate`, `gray`, `zinc`, `neutral`, `stone`
3. **Use CSS variables for colors?** — `yes` / `no`

What it creates:
- `components.json` — project configuration file
- `lib/utils.ts` — the `cn()` utility function
- Updates `globals.css` with CSS variable definitions
- Installs dependencies: `tailwind-merge`, `clsx`, `class-variance-authority`

```bash
# Non-interactive with defaults
npx shadcn@latest init -y
```

### add

Add components to your project.

```bash
npx shadcn@latest add [component...]
```

Options:

| Flag | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation prompt |
| `-o, --overwrite` | Overwrite existing files |
| `-c, --cwd <path>` | Set the working directory |
| `-a, --all` | Add all available components |
| `-p, --path <path>` | Custom path to install components to |

Examples:

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog input label

# Add all components
npx shadcn@latest add --all

# Overwrite an existing component with latest version
npx shadcn@latest add button --overwrite
```

When adding a component, the CLI:
1. Downloads the component source code
2. Installs required npm dependencies (e.g., `@radix-ui/react-dialog`)
3. Places the file in your configured `components/ui` directory
4. Adds any sub-dependencies (e.g., adding `dialog` also installs the `button` if needed)

### diff

Show changes between your local component and the latest version.

```bash
npx shadcn@latest diff [component]
```

Examples:

```bash
# Check all components for updates
npx shadcn@latest diff

# Check a specific component
npx shadcn@latest diff button
```

Output shows a diff of your local file vs. the latest upstream version, so you can selectively apply updates without losing your customizations.

## components.json Reference

Full schema of the configuration file:

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
    "cssVariables": true,
    "prefix": ""
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

### Configuration Options

| Key | Type | Description |
|-----|------|-------------|
| `style` | `"default" \| "new-york"` | Visual style of components |
| `rsc` | `boolean` | Add `"use client"` directive for React Server Components |
| `tsx` | `boolean` | Generate `.tsx` files (false = `.jsx`) |
| `tailwind.config` | `string` | Path to your Tailwind CSS config file |
| `tailwind.css` | `string` | Path to your global CSS file |
| `tailwind.baseColor` | `string` | Base color palette |
| `tailwind.cssVariables` | `boolean` | Use CSS variables or raw Tailwind colors |
| `tailwind.prefix` | `string` | Prefix for Tailwind classes (e.g., `"tw-"`) |
| `aliases.components` | `string` | Import alias for components |
| `aliases.utils` | `string` | Import alias for utility functions |
| `aliases.ui` | `string` | Import alias for UI components (install target) |
| `aliases.lib` | `string` | Import alias for lib directory |
| `aliases.hooks` | `string` | Import alias for hooks directory |

### Tailwind Prefix

If you use a Tailwind prefix to avoid class name conflicts:

```json
{
  "tailwind": {
    "prefix": "tw-"
  }
}
```

Components will use prefixed classes: `tw-bg-primary`, `tw-flex`, etc.

## Monorepo Setup

For monorepos, set the `cwd` flag to point to your app directory:

```bash
npx shadcn@latest init -c ./apps/web
npx shadcn@latest add button -c ./apps/web
```

Or create a script in your root `package.json`:

```json
{
  "scripts": {
    "ui:add": "npx shadcn@latest add -c ./apps/web"
  }
}
```

## Available Components

Run `add` with no arguments to see an interactive list of all available components:

```bash
npx shadcn@latest add
```

This displays a searchable checkbox list where you can select multiple components to install at once.
