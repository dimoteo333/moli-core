# Theming

shadcn/ui uses CSS variables for theming, allowing runtime theme switching and full color customization.

## CSS Variables

All color tokens are defined as HSL values in your `globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
```

## Color Token Reference

| Token | Usage |
|-------|-------|
| `--background` / `--foreground` | Default page background and text |
| `--card` / `--card-foreground` | Card backgrounds and text |
| `--popover` / `--popover-foreground` | Popover/dropdown backgrounds and text |
| `--primary` / `--primary-foreground` | Primary buttons and interactive elements |
| `--secondary` / `--secondary-foreground` | Secondary buttons |
| `--muted` / `--muted-foreground` | Muted backgrounds and placeholder text |
| `--accent` / `--accent-foreground` | Hover/focus highlights |
| `--destructive` / `--destructive-foreground` | Destructive/error actions |
| `--border` | Default border color |
| `--input` | Input border color |
| `--ring` | Focus ring color |
| `--radius` | Default border radius |

## Using Tokens in Tailwind

The CSS variables map to Tailwind utility classes:

```tsx
{/* Background colors */}
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="bg-muted text-muted-foreground" />
<div className="bg-destructive text-destructive-foreground" />

{/* Border */}
<div className="border border-border" />
<div className="border border-input" />

{/* Ring (focus) */}
<div className="ring-ring" />

{/* Radius */}
<div className="rounded-lg" /> {/* Uses --radius via Tailwind config */}
```

## Base Colors

shadcn/ui provides five base color palettes. Choose one during `init`:

- **Slate** — cool, blue-gray tones (default)
- **Gray** — neutral gray tones
- **Zinc** — warm gray tones
- **Neutral** — pure neutral tones
- **Stone** — warm, slightly brown tones

## Customizing Colors

Edit the CSS variables in `globals.css` to create a custom theme. Values use the HSL format `H S% L%` (without `hsl()` wrapper):

```css
:root {
  /* Custom brand blue */
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;

  /* Custom green for success states */
  --accent: 142 76% 36%;
  --accent-foreground: 0 0% 100%;
}
```

## Adding Custom Colors

Add new color tokens for additional semantic colors:

```css
:root {
  --success: 142 76% 36%;
  --success-foreground: 0 0% 100%;
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 100%;
  --info: 199 89% 48%;
  --info-foreground: 0 0% 100%;
}
```

Then extend your Tailwind config:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        success: "hsl(var(--success))",
        "success-foreground": "hsl(var(--success-foreground))",
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",
        info: "hsl(var(--info))",
        "info-foreground": "hsl(var(--info-foreground))",
      },
    },
  },
}
```

## Dark Mode

### Using next-themes

```bash
npm install next-themes
```

```tsx
// components/theme-provider.tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

```tsx
// app/layout.tsx
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  </body>
</html>
```

### Theme Toggle Component

```tsx
"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Border Radius

The `--radius` variable controls the default radius used across all components:

```css
:root {
  --radius: 0.5rem;   /* Default */
  /* --radius: 0;     Fully sharp corners */
  /* --radius: 0.75rem; More rounded */
  /* --radius: 1rem;   Very rounded */
}
```

Components use computed values like `rounded-lg` (which maps to `calc(var(--radius) - 2px)`) to maintain proportional rounding across different component sizes.
