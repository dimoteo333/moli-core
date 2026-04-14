# Backgrounds

Tailwind CSS v4 provides utilities for controlling background color, gradients, images, size, position, repeat, and attachment.

## Background Color

Use `bg-{color}-{shade}` to set background colors. See `colors.md` for the full color palette.

```html
<div class="bg-white">White background</div>
<div class="bg-gray-50">Light gray surface</div>
<div class="bg-blue-500 text-white">Primary blue</div>
<div class="bg-black/50">Semi-transparent black overlay</div>

<!-- Responsive background -->
<div class="bg-white dark:bg-gray-900">Adapts to dark mode</div>

<!-- Hover state -->
<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Hover me
</button>
```

## Background Gradient

### Gradient Direction

| Class | Direction |
|-------|-----------|
| `bg-gradient-to-t` | Bottom to top |
| `bg-gradient-to-tr` | To top-right |
| `bg-gradient-to-r` | Left to right |
| `bg-gradient-to-br` | To bottom-right |
| `bg-gradient-to-b` | Top to bottom |
| `bg-gradient-to-bl` | To bottom-left |
| `bg-gradient-to-l` | Right to left |
| `bg-gradient-to-tl` | To top-left |

### Color Stops

```html
<!-- Simple two-color gradient -->
<div class="h-64 bg-gradient-to-r from-cyan-500 to-blue-500"></div>

<!-- Three-color gradient with via -->
<div class="h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

<!-- Gradient from transparent -->
<div class="h-64 bg-gradient-to-t from-black/80 to-transparent">
  <p class="text-white">Text over image with gradient overlay</p>
</div>

<!-- Gradient with custom stop positions -->
<div class="bg-gradient-to-r from-blue-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"></div>
```

### Gradient Use Cases

```html
<!-- Hero section -->
<section class="bg-gradient-to-br from-violet-600 to-indigo-600 py-24 text-center text-white">
  <h1 class="text-5xl font-bold">Welcome</h1>
</section>

<!-- Card with gradient border effect -->
<div class="rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]">
  <div class="rounded-[10px] bg-white p-6 dark:bg-gray-900">
    <h3 class="font-bold">Gradient border card</h3>
  </div>
</div>

<!-- Gradient text -->
<h1 class="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-5xl font-bold text-transparent">
  Gradient Text
</h1>
```

## Background Image

Use `bg-none` to remove background images, or arbitrary values for custom images.

```html
<div class="bg-[url('/hero-pattern.svg')] bg-cover bg-center bg-no-repeat">
  Content with background image
</div>

<div class="bg-none">No background image</div>
```

## Background Size

| Class | CSS |
|-------|-----|
| `bg-auto` | `background-size: auto` |
| `bg-cover` | `background-size: cover` |
| `bg-contain` | `background-size: contain` |

```html
<!-- Cover image that fills the container -->
<div class="h-96 bg-[url('/photo.jpg')] bg-cover bg-center">
  <div class="flex h-full items-end bg-gradient-to-t from-black/60 to-transparent p-8">
    <h2 class="text-3xl font-bold text-white">Article Title</h2>
  </div>
</div>

<!-- Contained background pattern -->
<div class="h-64 bg-[url('/pattern.svg')] bg-contain bg-center bg-no-repeat"></div>
```

## Background Position

| Class | CSS |
|-------|-----|
| `bg-bottom` | `background-position: bottom` |
| `bg-center` | `background-position: center` |
| `bg-left` | `background-position: left` |
| `bg-left-bottom` | `background-position: left bottom` |
| `bg-left-top` | `background-position: left top` |
| `bg-right` | `background-position: right` |
| `bg-right-bottom` | `background-position: right bottom` |
| `bg-right-top` | `background-position: right top` |
| `bg-top` | `background-position: top` |

```html
<div class="h-64 bg-[url('/photo.jpg')] bg-cover bg-top">
  Focused on the top of the image
</div>

<!-- Arbitrary position -->
<div class="h-64 bg-[url('/photo.jpg')] bg-cover bg-[center_25%]">
  Custom focal point
</div>
```

## Background Repeat

| Class | CSS |
|-------|-----|
| `bg-repeat` | `background-repeat: repeat` |
| `bg-no-repeat` | `background-repeat: no-repeat` |
| `bg-repeat-x` | `background-repeat: repeat-x` |
| `bg-repeat-y` | `background-repeat: repeat-y` |
| `bg-repeat-round` | `background-repeat: round` |
| `bg-repeat-space` | `background-repeat: space` |

```html
<!-- Tiling pattern -->
<div class="bg-[url('/dots.svg')] bg-repeat p-12">
  Content with repeating dot pattern
</div>

<!-- Horizontal stripe -->
<div class="bg-[url('/stripe.svg')] bg-repeat-x bg-bottom h-2"></div>
```

## Background Attachment

| Class | CSS |
|-------|-----|
| `bg-fixed` | `background-attachment: fixed` |
| `bg-local` | `background-attachment: local` |
| `bg-scroll` | `background-attachment: scroll` |

```html
<!-- Parallax-style fixed background -->
<section class="h-screen bg-[url('/mountains.jpg')] bg-fixed bg-cover bg-center">
  <div class="flex h-full items-center justify-center bg-black/40">
    <h1 class="text-6xl font-bold text-white">Parallax Effect</h1>
  </div>
</section>
```

## Background Clip

| Class | CSS |
|-------|-----|
| `bg-clip-border` | `background-clip: border-box` |
| `bg-clip-padding` | `background-clip: padding-box` |
| `bg-clip-content` | `background-clip: content-box` |
| `bg-clip-text` | `background-clip: text` |

```html
<!-- Gradient text effect -->
<span class="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-4xl font-extrabold text-transparent">
  Gradient Text Effect
</span>
```

## Background Origin

| Class | CSS |
|-------|-----|
| `bg-origin-border` | `background-origin: border-box` |
| `bg-origin-padding` | `background-origin: padding-box` |
| `bg-origin-content` | `background-origin: content-box` |

## Complete Background Example

```html
<!-- Hero with layered backgrounds -->
<section class="relative overflow-hidden">
  <!-- Background pattern -->
  <div class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

  <!-- Gradient overlay -->
  <div class="relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-8 py-32 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <div class="mx-auto max-w-3xl text-center">
      <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
        Build Faster
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
        A comprehensive toolkit for modern web development.
      </p>
    </div>
  </div>
</section>

<!-- Card with background image -->
<div class="group relative h-80 overflow-hidden rounded-2xl">
  <div class="absolute inset-0 bg-[url('/card-bg.jpg')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/0"></div>
  <div class="relative flex h-full flex-col justify-end p-6">
    <h3 class="text-xl font-bold text-white">Card Title</h3>
    <p class="mt-2 text-sm text-gray-300">Card description here.</p>
  </div>
</div>
```
