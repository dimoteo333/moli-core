# Filters

Tailwind CSS v4 provides utilities for CSS filter and backdrop-filter properties, including blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, sepia, and drop-shadow.

## Blur

| Class | CSS |
|-------|-----|
| `blur-none` | `filter: blur(0)` |
| `blur-sm` | `filter: blur(4px)` |
| `blur` | `filter: blur(8px)` |
| `blur-md` | `filter: blur(12px)` |
| `blur-lg` | `filter: blur(16px)` |
| `blur-xl` | `filter: blur(24px)` |
| `blur-2xl` | `filter: blur(40px)` |
| `blur-3xl` | `filter: blur(64px)` |

```html
<img class="blur-sm" src="photo.jpg" alt="Slightly blurred" />
<img class="blur-lg hover:blur-none transition-all" src="photo.jpg" alt="Hover to reveal" />

<!-- Blurred placeholder while loading -->
<div class="relative">
  <img class="blur-xl scale-110" src="placeholder-small.jpg" alt="" />
  <img class="absolute inset-0" src="full-image.jpg" alt="" loading="lazy" />
</div>
```

## Brightness

| Class | CSS |
|-------|-----|
| `brightness-0` | `filter: brightness(0)` |
| `brightness-50` | `filter: brightness(0.5)` |
| `brightness-75` | `filter: brightness(0.75)` |
| `brightness-90` | `filter: brightness(0.9)` |
| `brightness-95` | `filter: brightness(0.95)` |
| `brightness-100` | `filter: brightness(1)` |
| `brightness-105` | `filter: brightness(1.05)` |
| `brightness-110` | `filter: brightness(1.1)` |
| `brightness-125` | `filter: brightness(1.25)` |
| `brightness-150` | `filter: brightness(1.5)` |
| `brightness-200` | `filter: brightness(2)` |

```html
<img class="brightness-75" src="photo.jpg" alt="Darkened image" />
<img class="brightness-110 hover:brightness-100 transition" src="photo.jpg" alt="" />
```

## Contrast

| Class | CSS |
|-------|-----|
| `contrast-0` | `filter: contrast(0)` |
| `contrast-50` | `filter: contrast(0.5)` |
| `contrast-75` | `filter: contrast(0.75)` |
| `contrast-100` | `filter: contrast(1)` |
| `contrast-125` | `filter: contrast(1.25)` |
| `contrast-150` | `filter: contrast(1.5)` |
| `contrast-200` | `filter: contrast(2)` |

```html
<img class="contrast-125" src="photo.jpg" alt="High contrast" />
```

## Grayscale

| Class | CSS |
|-------|-----|
| `grayscale` | `filter: grayscale(100%)` |
| `grayscale-0` | `filter: grayscale(0)` |

```html
<!-- Grayscale until hover -->
<img class="grayscale hover:grayscale-0 transition duration-300" src="photo.jpg" alt="" />

<!-- Grayscale team photos -->
<div class="flex gap-4">
  <img class="h-24 w-24 rounded-full grayscale hover:grayscale-0 transition" src="team1.jpg" alt="" />
  <img class="h-24 w-24 rounded-full grayscale hover:grayscale-0 transition" src="team2.jpg" alt="" />
  <img class="h-24 w-24 rounded-full grayscale hover:grayscale-0 transition" src="team3.jpg" alt="" />
</div>
```

## Hue Rotate

| Class | CSS |
|-------|-----|
| `hue-rotate-0` | `filter: hue-rotate(0deg)` |
| `hue-rotate-15` | `filter: hue-rotate(15deg)` |
| `hue-rotate-30` | `filter: hue-rotate(30deg)` |
| `hue-rotate-60` | `filter: hue-rotate(60deg)` |
| `hue-rotate-90` | `filter: hue-rotate(90deg)` |
| `hue-rotate-180` | `filter: hue-rotate(180deg)` |

```html
<img class="hue-rotate-90" src="photo.jpg" alt="Hue shifted 90 degrees" />
<div class="-hue-rotate-30">Negative hue rotation</div>
```

## Invert

| Class | CSS |
|-------|-----|
| `invert` | `filter: invert(100%)` |
| `invert-0` | `filter: invert(0)` |

```html
<!-- Invert colors for dark-on-light to light-on-dark -->
<img class="dark:invert" src="logo-dark.svg" alt="Logo" />
```

## Saturate

| Class | CSS |
|-------|-----|
| `saturate-0` | `filter: saturate(0)` |
| `saturate-50` | `filter: saturate(0.5)` |
| `saturate-100` | `filter: saturate(1)` |
| `saturate-150` | `filter: saturate(1.5)` |
| `saturate-200` | `filter: saturate(2)` |

```html
<img class="saturate-150" src="photo.jpg" alt="Vibrant colors" />
<img class="saturate-50" src="photo.jpg" alt="Muted colors" />
```

## Sepia

| Class | CSS |
|-------|-----|
| `sepia` | `filter: sepia(100%)` |
| `sepia-0` | `filter: sepia(0)` |

```html
<img class="sepia" src="photo.jpg" alt="Vintage sepia look" />
```

## Drop Shadow

Unlike `shadow-*` (which uses `box-shadow`), `drop-shadow-*` uses the CSS `filter: drop-shadow()` function, which follows the shape of the element including transparency.

| Class | CSS |
|-------|-----|
| `drop-shadow-sm` | Small drop shadow |
| `drop-shadow` | Default drop shadow |
| `drop-shadow-md` | Medium drop shadow |
| `drop-shadow-lg` | Large drop shadow |
| `drop-shadow-xl` | Extra-large drop shadow |
| `drop-shadow-2xl` | Largest drop shadow |
| `drop-shadow-none` | No drop shadow |

```html
<!-- Drop shadow follows PNG transparency -->
<img class="drop-shadow-lg" src="logo.png" alt="Logo with natural shadow" />

<!-- Drop shadow on SVG -->
<svg class="drop-shadow-md h-12 w-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
  ...
</svg>
```

## Combining Filters

Apply multiple filter utilities to a single element:

```html
<img
  class="brightness-110 contrast-125 saturate-150"
  src="photo.jpg"
  alt="Enhanced photo"
/>

<!-- Vintage effect -->
<img
  class="sepia brightness-90 contrast-110 hue-rotate-15"
  src="photo.jpg"
  alt="Vintage look"
/>

<!-- Dramatic black and white -->
<img
  class="grayscale contrast-150 brightness-110"
  src="photo.jpg"
  alt="High contrast B&W"
/>
```

## Backdrop Filter

Apply filters to the area behind an element. These mirror the regular filter utilities but affect the backdrop.

### Backdrop Blur

| Class | CSS |
|-------|-----|
| `backdrop-blur-none` | `backdrop-filter: blur(0)` |
| `backdrop-blur-sm` | `backdrop-filter: blur(4px)` |
| `backdrop-blur` | `backdrop-filter: blur(8px)` |
| `backdrop-blur-md` | `backdrop-filter: blur(12px)` |
| `backdrop-blur-lg` | `backdrop-filter: blur(16px)` |
| `backdrop-blur-xl` | `backdrop-filter: blur(24px)` |
| `backdrop-blur-2xl` | `backdrop-filter: blur(40px)` |
| `backdrop-blur-3xl` | `backdrop-filter: blur(64px)` |

### Other Backdrop Filters

| Class | Description |
|-------|-------------|
| `backdrop-brightness-*` | Backdrop brightness (same scale as brightness) |
| `backdrop-contrast-*` | Backdrop contrast |
| `backdrop-grayscale` | Backdrop grayscale |
| `backdrop-hue-rotate-*` | Backdrop hue rotation |
| `backdrop-invert` | Backdrop inversion |
| `backdrop-opacity-*` | Backdrop opacity |
| `backdrop-saturate-*` | Backdrop saturation |
| `backdrop-sepia` | Backdrop sepia |

```html
<!-- Frosted glass navigation -->
<nav class="fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
    <span class="text-lg font-bold">Brand</span>
    <div class="flex gap-4 text-sm">
      <a href="#" class="text-gray-700 hover:text-gray-900">Home</a>
      <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
    </div>
  </div>
</nav>

<!-- Frosted glass modal overlay -->
<div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
  <div class="rounded-2xl bg-white p-8 shadow-2xl">
    <h2 class="text-xl font-bold">Confirm Action</h2>
    <p class="mt-2 text-gray-600">Are you sure you want to proceed?</p>
    <div class="mt-6 flex justify-end gap-3">
      <button class="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">Cancel</button>
      <button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Confirm</button>
    </div>
  </div>
</div>

<!-- Card with frosted glass effect -->
<div class="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg backdrop-saturate-150">
  <h3 class="text-lg font-semibold text-white">Glass Card</h3>
  <p class="mt-2 text-white/80">Glassmorphism style card.</p>
</div>
```

## Arbitrary Filter Values

```html
<div class="blur-[2px]">Custom blur amount</div>
<div class="brightness-[1.15]">Custom brightness</div>
<div class="backdrop-blur-[20px]">Custom backdrop blur</div>
<div class="hue-rotate-[270deg]">Custom hue rotation</div>
<div class="drop-shadow-[0_5px_15px_rgba(0,0,0,0.25)]">Custom drop shadow</div>
```
