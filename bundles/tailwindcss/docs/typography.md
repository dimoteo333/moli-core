# Typography

Tailwind CSS v4 provides extensive utilities for controlling font family, size, weight, line height, letter spacing, text alignment, decoration, transformation, and more.

## Font Family

| Class | CSS |
|-------|-----|
| `font-sans` | `font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"` |
| `font-serif` | `font-family: ui-serif, Georgia, Cambria, "Times New Roman", serif` |
| `font-mono` | `font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |

```html
<p class="font-sans">Sans-serif text for body copy</p>
<p class="font-serif">Serif text for editorial content</p>
<code class="font-mono text-sm">console.log("monospace")</code>
```

Custom fonts in v4:

```css
@theme {
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Cal Sans", sans-serif;
}
```

## Font Size

| Class | Size | Default Line Height |
|-------|------|-------------------|
| `text-xs` | 0.75rem (12px) | 1rem |
| `text-sm` | 0.875rem (14px) | 1.25rem |
| `text-base` | 1rem (16px) | 1.5rem |
| `text-lg` | 1.125rem (18px) | 1.75rem |
| `text-xl` | 1.25rem (20px) | 1.75rem |
| `text-2xl` | 1.5rem (24px) | 2rem |
| `text-3xl` | 1.875rem (30px) | 2.25rem |
| `text-4xl` | 2.25rem (36px) | 2.5rem |
| `text-5xl` | 3rem (48px) | 1 |
| `text-6xl` | 3.75rem (60px) | 1 |
| `text-7xl` | 4.5rem (72px) | 1 |
| `text-8xl` | 6rem (96px) | 1 |
| `text-9xl` | 8rem (128px) | 1 |

```html
<h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
  Responsive Heading
</h1>
<p class="mt-4 text-lg text-gray-600 sm:text-xl">
  Subtitle with responsive sizing
</p>
<small class="text-xs text-gray-400">Fine print</small>
```

Arbitrary font sizes:

```html
<p class="text-[15px]">15px text</p>
<h1 class="text-[clamp(2rem,5vw,4rem)]">Fluid responsive heading</h1>
```

## Font Weight

| Class | CSS |
|-------|-----|
| `font-thin` | `font-weight: 100` |
| `font-extralight` | `font-weight: 200` |
| `font-light` | `font-weight: 300` |
| `font-normal` | `font-weight: 400` |
| `font-medium` | `font-weight: 500` |
| `font-semibold` | `font-weight: 600` |
| `font-bold` | `font-weight: 700` |
| `font-extrabold` | `font-weight: 800` |
| `font-black` | `font-weight: 900` |

```html
<span class="font-normal">Regular weight</span>
<span class="font-medium">Medium weight (good for labels)</span>
<span class="font-semibold">Semibold (good for subheadings)</span>
<span class="font-bold">Bold (good for headings)</span>
```

## Font Style

| Class | CSS |
|-------|-----|
| `italic` | `font-style: italic` |
| `not-italic` | `font-style: normal` |

## Line Height (Leading)

| Class | CSS |
|-------|-----|
| `leading-none` | `line-height: 1` |
| `leading-tight` | `line-height: 1.25` |
| `leading-snug` | `line-height: 1.375` |
| `leading-normal` | `line-height: 1.5` |
| `leading-relaxed` | `line-height: 1.625` |
| `leading-loose` | `line-height: 2` |
| `leading-3` to `leading-10` | Fixed values (0.75rem to 2.5rem) |

```html
<p class="text-lg leading-relaxed">
  Body text with generous line spacing for comfortable reading.
  This is ideal for long-form content like articles or documentation.
</p>

<h2 class="text-3xl font-bold leading-tight">
  Tight leading for large headings that may span two lines
</h2>
```

## Letter Spacing (Tracking)

| Class | CSS |
|-------|-----|
| `tracking-tighter` | `letter-spacing: -0.05em` |
| `tracking-tight` | `letter-spacing: -0.025em` |
| `tracking-normal` | `letter-spacing: 0em` |
| `tracking-wide` | `letter-spacing: 0.025em` |
| `tracking-wider` | `letter-spacing: 0.05em` |
| `tracking-widest` | `letter-spacing: 0.1em` |

```html
<h1 class="text-5xl font-bold tracking-tight">Tight Tracking for Headlines</h1>
<p class="text-xs font-semibold uppercase tracking-widest text-gray-500">Category Label</p>
```

## Text Alignment

| Class | CSS |
|-------|-----|
| `text-left` | `text-align: left` |
| `text-center` | `text-align: center` |
| `text-right` | `text-align: right` |
| `text-justify` | `text-align: justify` |
| `text-start` | `text-align: start` |
| `text-end` | `text-align: end` |

```html
<div class="text-center md:text-left">
  <h1 class="text-3xl font-bold">Centered on mobile, left-aligned on desktop</h1>
</div>
```

## Text Decoration

| Class | CSS |
|-------|-----|
| `underline` | `text-decoration-line: underline` |
| `overline` | `text-decoration-line: overline` |
| `line-through` | `text-decoration-line: line-through` |
| `no-underline` | `text-decoration-line: none` |

### Decoration Color

```html
<a class="underline decoration-blue-500">Blue underline</a>
<a class="underline decoration-pink-500/50">Semi-transparent underline</a>
```

### Decoration Style

| Class | CSS |
|-------|-----|
| `decoration-solid` | `text-decoration-style: solid` |
| `decoration-double` | `text-decoration-style: double` |
| `decoration-dotted` | `text-decoration-style: dotted` |
| `decoration-dashed` | `text-decoration-style: dashed` |
| `decoration-wavy` | `text-decoration-style: wavy` |

### Decoration Thickness

| Class | CSS |
|-------|-----|
| `decoration-auto` | `text-decoration-thickness: auto` |
| `decoration-from-font` | `text-decoration-thickness: from-font` |
| `decoration-0` to `decoration-8` | `text-decoration-thickness: 0px` to `8px` |

### Underline Offset

| Class | CSS |
|-------|-----|
| `underline-offset-auto` | `text-underline-offset: auto` |
| `underline-offset-0` to `underline-offset-8` | `text-underline-offset: 0px` to `8px` |

```html
<a class="underline decoration-2 underline-offset-4 hover:decoration-blue-500" href="#">
  Styled link with thick offset underline
</a>
```

## Text Transform

| Class | CSS |
|-------|-----|
| `uppercase` | `text-transform: uppercase` |
| `lowercase` | `text-transform: lowercase` |
| `capitalize` | `text-transform: capitalize` |
| `normal-case` | `text-transform: none` |

```html
<span class="text-xs font-bold uppercase tracking-wider text-gray-500">Section Title</span>
<h2 class="capitalize">this will be title case</h2>
```

## Text Overflow

| Class | CSS |
|-------|-----|
| `truncate` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` |
| `text-ellipsis` | `text-overflow: ellipsis` |
| `text-clip` | `text-overflow: clip` |

```html
<!-- Single-line truncation -->
<p class="truncate">
  This very long text will be truncated with an ellipsis when it overflows.
</p>

<!-- Multi-line truncation (line-clamp) -->
<p class="line-clamp-3">
  This text will be clamped to 3 lines. Any content beyond the third line
  will be hidden and an ellipsis will appear at the end of the third line.
  This is useful for card descriptions and previews.
</p>
```

### Line Clamp

| Class | CSS |
|-------|-----|
| `line-clamp-1` to `line-clamp-6` | Truncate to N lines |
| `line-clamp-none` | Remove clamping |

## Text Wrapping

| Class | CSS |
|-------|-----|
| `text-wrap` | `text-wrap: wrap` |
| `text-nowrap` | `text-wrap: nowrap` |
| `text-balance` | `text-wrap: balance` |
| `text-pretty` | `text-wrap: pretty` |

```html
<h1 class="text-4xl font-bold text-balance">
  This heading will have balanced line breaks for a more visually pleasing layout
</h1>

<p class="text-pretty">
  This paragraph uses text-pretty to avoid orphans at the end of paragraphs.
</p>
```

## Whitespace

| Class | CSS |
|-------|-----|
| `whitespace-normal` | `white-space: normal` |
| `whitespace-nowrap` | `white-space: nowrap` |
| `whitespace-pre` | `white-space: pre` |
| `whitespace-pre-line` | `white-space: pre-line` |
| `whitespace-pre-wrap` | `white-space: pre-wrap` |
| `whitespace-break-spaces` | `white-space: break-spaces` |

## Word Break

| Class | CSS |
|-------|-----|
| `break-normal` | `overflow-wrap: normal; word-break: normal` |
| `break-words` | `overflow-wrap: break-word` |
| `break-all` | `word-break: break-all` |
| `break-keep` | `word-break: keep-all` |

## Hyphens

| Class | CSS |
|-------|-----|
| `hyphens-none` | `hyphens: none` |
| `hyphens-manual` | `hyphens: manual` |
| `hyphens-auto` | `hyphens: auto` |

## Text Indent

| Class | CSS |
|-------|-----|
| `indent-0` to `indent-96` | Uses spacing scale |
| `indent-px` | `text-indent: 1px` |

```html
<p class="indent-8">This paragraph has a 2rem first-line indent, common in print typography.</p>
```

## Vertical Align

| Class | CSS |
|-------|-----|
| `align-baseline` | `vertical-align: baseline` |
| `align-top` | `vertical-align: top` |
| `align-middle` | `vertical-align: middle` |
| `align-bottom` | `vertical-align: bottom` |
| `align-text-top` | `vertical-align: text-top` |
| `align-text-bottom` | `vertical-align: text-bottom` |
| `align-sub` | `vertical-align: sub` |
| `align-super` | `vertical-align: super` |

## List Style

| Class | CSS |
|-------|-----|
| `list-none` | `list-style-type: none` |
| `list-disc` | `list-style-type: disc` |
| `list-decimal` | `list-style-type: decimal` |
| `list-inside` | `list-style-position: inside` |
| `list-outside` | `list-style-position: outside` |
| `list-image-none` | `list-style-image: none` |

```html
<ul class="list-disc list-inside space-y-1 text-gray-700">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

<ol class="list-decimal list-inside space-y-1">
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
```

## Complete Typography Example

```html
<article class="mx-auto max-w-2xl">
  <span class="text-sm font-semibold uppercase tracking-wider text-blue-600">
    Tutorial
  </span>
  <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
    Getting Started with Tailwind CSS
  </h1>
  <p class="mt-4 text-xl leading-relaxed text-gray-600">
    Learn how to build modern user interfaces with utility-first CSS.
  </p>
  <div class="mt-8 space-y-4 text-base leading-7 text-gray-700">
    <p>
      Tailwind CSS is a <strong class="font-semibold text-gray-900">utility-first</strong>
      CSS framework that provides low-level utility classes to build custom designs.
    </p>
    <p>
      Unlike traditional frameworks, you build components by composing
      <em class="italic">small, single-purpose classes</em> directly in your markup.
    </p>
  </div>
</article>
```
