# Typography

shadcn/ui does not include a dedicated Typography component — instead, use Tailwind CSS utility classes and semantic HTML. This guide covers the conventions used throughout shadcn/ui projects.

## Heading Styles

```tsx
<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  Heading 1
</h1>

<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
  Heading 2
</h2>

<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
  Heading 3
</h3>

<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
  Heading 4
</h4>
```

## Paragraph and Body Text

```tsx
<p className="leading-7 [&:not(:first-child)]:mt-6">
  The king, seeing how much happier his subjects were, realized the error of
  his ways and repealed the onerous taxes.
</p>

{/* Lead paragraph */}
<p className="text-xl text-muted-foreground">
  A large introductory paragraph that sets the tone.
</p>

{/* Small text */}
<small className="text-sm font-medium leading-none">
  Small caption text
</small>

{/* Muted text */}
<p className="text-sm text-muted-foreground">
  Secondary information or descriptions.
</p>
```

## Inline Elements

```tsx
{/* Bold */}
<strong className="font-semibold">Important text</strong>

{/* Inline code */}
<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
  @radix-ui/react-alert-dialog
</code>

{/* Blockquote */}
<blockquote className="mt-6 border-l-2 pl-6 italic">
  "After all," he said, "everyone enjoys a good joke."
</blockquote>
```

## Lists

```tsx
{/* Unordered list */}
<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

{/* Ordered list */}
<ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

## Tables

```tsx
<div className="my-6 w-full overflow-y-auto">
  <table className="w-full">
    <thead>
      <tr className="m-0 border-t p-0 even:bg-muted">
        <th className="border px-4 py-2 text-left font-bold">Prop</th>
        <th className="border px-4 py-2 text-left font-bold">Type</th>
        <th className="border px-4 py-2 text-left font-bold">Default</th>
      </tr>
    </thead>
    <tbody>
      <tr className="m-0 border-t p-0 even:bg-muted">
        <td className="border px-4 py-2 text-left">variant</td>
        <td className="border px-4 py-2 text-left">string</td>
        <td className="border px-4 py-2 text-left">"default"</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Font Configuration

### Using Inter (Recommended)

```tsx
// app/layout.tsx (Next.js App Router)
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

### Using a Custom Font

```tsx
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

Update your Tailwind config:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
}
```

## Prose (for Markdown/CMS Content)

For rendering long-form content (e.g., blog posts, documentation), use the `@tailwindcss/typography` plugin:

```bash
npm install @tailwindcss/typography
```

```javascript
// tailwind.config.js
module.exports = {
  plugins: [require("@tailwindcss/typography")],
}
```

```tsx
<article className="prose dark:prose-invert max-w-none">
  {/* Rendered markdown/HTML content */}
  <h1>Blog Post Title</h1>
  <p>Content with automatic styling...</p>
</article>
```

Customize prose colors to match shadcn/ui tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--primary))",
            "--tw-prose-code": "hsl(var(--foreground))",
          },
        },
      },
    },
  },
}
```

## Responsive Typography

```tsx
<h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

<p className="text-sm sm:text-base lg:text-lg">
  Text that scales with viewport.
</p>
```

## Text Color Utilities

Use semantic color tokens instead of raw Tailwind colors:

```tsx
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary/muted text</p>
<p className="text-primary">Accent/branded text</p>
<p className="text-destructive">Error/warning text</p>
```
