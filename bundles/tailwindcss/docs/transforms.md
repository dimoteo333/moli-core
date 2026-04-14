# Transforms

Tailwind CSS v4 provides utilities for scaling, rotating, translating, and skewing elements, as well as setting transform origins and perspective.

## Scale

| Class | CSS |
|-------|-----|
| `scale-0` | `transform: scale(0)` |
| `scale-50` | `transform: scale(0.5)` |
| `scale-75` | `transform: scale(0.75)` |
| `scale-90` | `transform: scale(0.9)` |
| `scale-95` | `transform: scale(0.95)` |
| `scale-100` | `transform: scale(1)` |
| `scale-105` | `transform: scale(1.05)` |
| `scale-110` | `transform: scale(1.1)` |
| `scale-125` | `transform: scale(1.25)` |
| `scale-150` | `transform: scale(1.5)` |
| `scale-x-*` | Scale horizontally only |
| `scale-y-*` | Scale vertically only |

```html
<!-- Scale up on hover -->
<div class="transition duration-300 hover:scale-105">
  Grows slightly on hover
</div>

<!-- Scale down when active (pressed) -->
<button class="transition active:scale-95 rounded-lg bg-blue-600 px-4 py-2 text-white">
  Click me
</button>

<!-- Flip horizontally -->
<img class="-scale-x-100" src="arrow.svg" alt="Flipped arrow" />

<!-- Scale individual axes -->
<div class="scale-x-110 scale-y-90">Stretched horizontally, compressed vertically</div>
```

## Rotate

| Class | CSS |
|-------|-----|
| `rotate-0` | `transform: rotate(0deg)` |
| `rotate-1` | `transform: rotate(1deg)` |
| `rotate-2` | `transform: rotate(2deg)` |
| `rotate-3` | `transform: rotate(3deg)` |
| `rotate-6` | `transform: rotate(6deg)` |
| `rotate-12` | `transform: rotate(12deg)` |
| `rotate-45` | `transform: rotate(45deg)` |
| `rotate-90` | `transform: rotate(90deg)` |
| `rotate-180` | `transform: rotate(180deg)` |
| `-rotate-*` | Negative rotation (counter-clockwise) |

```html
<!-- Spin icon on hover -->
<button class="group">
  <svg class="h-5 w-5 transition-transform duration-300 group-hover:rotate-90">...</svg>
  Settings
</button>

<!-- Subtle tilt effect -->
<div class="transition hover:-rotate-2 hover:scale-105">
  Card with tilt on hover
</div>

<!-- Rotate 180 for chevron toggle -->
<svg class="h-5 w-5 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path d="M19 9l-7 7-7-7" />
</svg>

<!-- Arbitrary rotation -->
<div class="rotate-[17deg]">Custom rotation angle</div>
```

## Translate

| Class | CSS |
|-------|-----|
| `translate-x-0` | `transform: translateX(0px)` |
| `translate-x-1` to `translate-x-96` | Uses spacing scale |
| `translate-x-px` | `transform: translateX(1px)` |
| `translate-x-full` | `transform: translateX(100%)` |
| `translate-x-1/2` | `transform: translateX(50%)` |
| `translate-y-*` | Vertical translation (same scale) |
| `-translate-x-*` | Negative translation |
| `-translate-y-*` | Negative vertical translation |

```html
<!-- Slide up on hover -->
<div class="transition-transform hover:-translate-y-1">
  Lifts up on hover
</div>

<!-- Center an absolute element -->
<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
  Centered element
</div>

<!-- Slide-in from right -->
<div class="translate-x-full transition-transform data-[open]:translate-x-0">
  Slide-in panel
</div>

<!-- Arbitrary translation -->
<div class="translate-x-[calc(100%+1rem)]">Custom translation</div>
```

## Skew

| Class | CSS |
|-------|-----|
| `skew-x-0` | `transform: skewX(0deg)` |
| `skew-x-1` | `transform: skewX(1deg)` |
| `skew-x-2` | `transform: skewX(2deg)` |
| `skew-x-3` | `transform: skewX(3deg)` |
| `skew-x-6` | `transform: skewX(6deg)` |
| `skew-x-12` | `transform: skewX(12deg)` |
| `skew-y-*` | Same scale for Y axis |
| `-skew-x-*` | Negative skew |

```html
<div class="skew-x-6 bg-blue-500 px-6 py-3 text-white">Skewed element</div>

<!-- Skewed background, unskewed content -->
<div class="-skew-y-3 bg-blue-500 py-12">
  <div class="skew-y-3 mx-auto max-w-4xl px-4">
    <h2 class="text-3xl font-bold text-white">Content stays level</h2>
  </div>
</div>
```

## Transform Origin

| Class | CSS |
|-------|-----|
| `origin-center` | `transform-origin: center` |
| `origin-top` | `transform-origin: top` |
| `origin-top-right` | `transform-origin: top right` |
| `origin-right` | `transform-origin: right` |
| `origin-bottom-right` | `transform-origin: bottom right` |
| `origin-bottom` | `transform-origin: bottom` |
| `origin-bottom-left` | `transform-origin: bottom left` |
| `origin-left` | `transform-origin: left` |
| `origin-top-left` | `transform-origin: top left` |

```html
<!-- Dropdown that scales from top -->
<div class="origin-top scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
  Dropdown menu content
</div>

<!-- Tooltip that grows from bottom-center -->
<div class="origin-bottom scale-0 transition hover:scale-100">
  Tooltip content
</div>

<!-- Custom origin -->
<div class="origin-[25%_75%] rotate-12">Custom origin point</div>
```

## 3D Transforms

### Perspective

Use `perspective-*` on a parent to set the 3D perspective for children.

```html
<div class="perspective-[1000px]">
  <div class="transition-transform duration-500 hover:[transform:rotateY(180deg)]">
    Card that flips in 3D
  </div>
</div>
```

### Backface Visibility

| Class | CSS |
|-------|-----|
| `backface-visible` | `backface-visibility: visible` |
| `backface-hidden` | `backface-visibility: hidden` |

```html
<!-- 3D card flip -->
<div class="group perspective-[1000px]">
  <div class="relative h-64 w-48 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    <!-- Front -->
    <div class="absolute inset-0 backface-hidden rounded-xl bg-blue-500 p-6 text-white">
      <h3 class="font-bold">Front</h3>
    </div>
    <!-- Back -->
    <div class="absolute inset-0 backface-hidden rounded-xl bg-gray-800 p-6 text-white [transform:rotateY(180deg)]">
      <h3 class="font-bold">Back</h3>
    </div>
  </div>
</div>
```

## Combining Transforms

Multiple transform utilities can be combined on the same element:

```html
<div class="translate-x-4 rotate-3 scale-105">
  Translated, rotated, and scaled
</div>

<!-- Interactive card effect -->
<div class="transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:scale-[1.02] hover:shadow-xl">
  <div class="rounded-xl bg-white p-6">
    <h3 class="font-bold">Interactive Card</h3>
    <p class="mt-2 text-gray-600">Hover for a subtle 3D lift effect.</p>
  </div>
</div>

<!-- Button press effect -->
<button class="transform transition active:translate-y-0.5 active:scale-[0.98] rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl">
  Press Me
</button>
```

## GPU Acceleration

Use `transform-gpu` to force GPU acceleration for smoother animations:

```html
<div class="transform-gpu transition-transform hover:scale-105">
  GPU-accelerated transform
</div>
```

Use `transform-cpu` to force CPU rendering (useful to prevent blurry text):

```html
<div class="transform-cpu translate-x-4">
  CPU-rendered for crisp text
</div>
```

## Complete Transform Examples

```html
<!-- Image gallery with zoom -->
<div class="grid grid-cols-3 gap-2 overflow-hidden rounded-xl">
  <div class="overflow-hidden">
    <img class="h-full w-full object-cover transition duration-500 hover:scale-110" src="1.jpg" alt="" />
  </div>
  <div class="overflow-hidden">
    <img class="h-full w-full object-cover transition duration-500 hover:scale-110" src="2.jpg" alt="" />
  </div>
  <div class="overflow-hidden">
    <img class="h-full w-full object-cover transition duration-500 hover:scale-110" src="3.jpg" alt="" />
  </div>
</div>

<!-- Floating action button with rotate icon -->
<button class="group fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:shadow-xl hover:bg-blue-700">
  <svg class="h-6 w-6 transition-transform duration-200 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
  </svg>
</button>
```
