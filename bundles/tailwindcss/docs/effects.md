# Effects

Tailwind CSS v4 provides utilities for box shadow, opacity, mix-blend-mode, and backdrop filters.

## Box Shadow

| Class | Description |
|-------|-------------|
| `shadow-sm` | Small shadow |
| `shadow` | Default shadow |
| `shadow-md` | Medium shadow |
| `shadow-lg` | Large shadow |
| `shadow-xl` | Extra-large shadow |
| `shadow-2xl` | Largest shadow |
| `shadow-inner` | Inset shadow |
| `shadow-none` | No shadow |

```html
<div class="shadow-sm rounded-lg bg-white p-4">Subtle shadow</div>
<div class="shadow rounded-lg bg-white p-4">Default shadow</div>
<div class="shadow-md rounded-lg bg-white p-4">Medium shadow</div>
<div class="shadow-lg rounded-lg bg-white p-4">Large shadow</div>
<div class="shadow-xl rounded-lg bg-white p-4">Extra-large shadow</div>
<div class="shadow-2xl rounded-lg bg-white p-4">Largest shadow</div>
<div class="shadow-inner rounded-lg bg-gray-100 p-4">Inset shadow</div>
```

### Shadow Color

Change the shadow color with `shadow-{color}`:

```html
<div class="shadow-lg shadow-blue-500/50 rounded-lg bg-blue-500 p-6 text-white">
  Blue glow shadow
</div>

<div class="shadow-lg shadow-red-500/25 rounded-lg bg-white p-6">
  Red-tinted shadow
</div>

<button class="rounded-lg bg-indigo-500 px-6 py-3 text-white shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/40 transition-shadow">
  Glowing button
</button>
```

### Custom Shadows in v4

```css
@theme {
  --shadow-soft: 0 2px 15px -3px rgb(0 0 0 / 0.07), 0 10px 20px -2px rgb(0 0 0 / 0.04);
  --shadow-glow: 0 0 20px rgb(99 102 241 / 0.3);
  --shadow-brutal: 4px 4px 0px 0px rgb(0 0 0);
}
```

Use as `shadow-soft`, `shadow-glow`, `shadow-brutal`.

### Arbitrary Shadow Values

```html
<div class="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">Custom shadow</div>
<div class="shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">Custom inset shadow</div>
```

## Opacity

| Class | CSS |
|-------|-----|
| `opacity-0` | `opacity: 0` |
| `opacity-5` | `opacity: 0.05` |
| `opacity-10` | `opacity: 0.1` |
| `opacity-15` | `opacity: 0.15` |
| `opacity-20` | `opacity: 0.2` |
| `opacity-25` | `opacity: 0.25` |
| `opacity-30` | `opacity: 0.3` |
| `opacity-35` | `opacity: 0.35` |
| `opacity-40` | `opacity: 0.4` |
| `opacity-45` | `opacity: 0.45` |
| `opacity-50` | `opacity: 0.5` |
| `opacity-55` | `opacity: 0.55` |
| `opacity-60` | `opacity: 0.6` |
| `opacity-65` | `opacity: 0.65` |
| `opacity-70` | `opacity: 0.7` |
| `opacity-75` | `opacity: 0.75` |
| `opacity-80` | `opacity: 0.8` |
| `opacity-85` | `opacity: 0.85` |
| `opacity-90` | `opacity: 0.9` |
| `opacity-95` | `opacity: 0.95` |
| `opacity-100` | `opacity: 1` |

```html
<!-- Disabled state -->
<button class="opacity-50 cursor-not-allowed bg-blue-500 px-4 py-2 text-white rounded" disabled>
  Disabled
</button>

<!-- Hover opacity -->
<img class="opacity-80 hover:opacity-100 transition-opacity" src="photo.jpg" alt="" />

<!-- Loading overlay -->
<div class="relative">
  <div class="opacity-50 pointer-events-none">Content behind overlay</div>
  <div class="absolute inset-0 flex items-center justify-center">
    <span class="text-lg font-medium">Loading...</span>
  </div>
</div>
```

### Color Opacity Modifier

Instead of `opacity-*` on the whole element, use the `/` modifier for individual color opacity:

```html
<!-- Only the background is semi-transparent, not the text -->
<div class="bg-blue-500/75 text-white p-4">
  The background is 75% opaque but text is fully visible
</div>
```

## Mix Blend Mode

| Class | CSS |
|-------|-----|
| `mix-blend-normal` | `mix-blend-mode: normal` |
| `mix-blend-multiply` | `mix-blend-mode: multiply` |
| `mix-blend-screen` | `mix-blend-mode: screen` |
| `mix-blend-overlay` | `mix-blend-mode: overlay` |
| `mix-blend-darken` | `mix-blend-mode: darken` |
| `mix-blend-lighten` | `mix-blend-mode: lighten` |
| `mix-blend-color-dodge` | `mix-blend-mode: color-dodge` |
| `mix-blend-color-burn` | `mix-blend-mode: color-burn` |
| `mix-blend-hard-light` | `mix-blend-mode: hard-light` |
| `mix-blend-soft-light` | `mix-blend-mode: soft-light` |
| `mix-blend-difference` | `mix-blend-mode: difference` |
| `mix-blend-exclusion` | `mix-blend-mode: exclusion` |
| `mix-blend-hue` | `mix-blend-mode: hue` |
| `mix-blend-saturation` | `mix-blend-mode: saturation` |
| `mix-blend-color` | `mix-blend-mode: color` |
| `mix-blend-luminosity` | `mix-blend-mode: luminosity` |
| `mix-blend-plus-lighter` | `mix-blend-mode: plus-lighter` |

```html
<!-- Multiply blend for image overlay -->
<div class="relative">
  <img src="photo.jpg" alt="" />
  <div class="absolute inset-0 bg-blue-600 mix-blend-multiply"></div>
</div>

<!-- Screen blend for light effect -->
<div class="relative bg-gray-900">
  <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 mix-blend-screen"></div>
</div>
```

## Background Blend Mode

| Class | CSS |
|-------|-----|
| `bg-blend-normal` | `background-blend-mode: normal` |
| `bg-blend-multiply` | `background-blend-mode: multiply` |
| `bg-blend-screen` | `background-blend-mode: screen` |
| `bg-blend-overlay` | `background-blend-mode: overlay` |
| `bg-blend-darken` | `background-blend-mode: darken` |
| `bg-blend-lighten` | `background-blend-mode: lighten` |

```html
<div class="bg-blue-600 bg-[url('/texture.jpg')] bg-blend-multiply h-64"></div>
```

## Backdrop Filter

Apply filters to the area behind an element.

```html
<!-- Frosted glass effect -->
<div class="backdrop-blur-md bg-white/30 rounded-xl p-6 border border-white/20">
  <h3 class="font-bold">Frosted Glass Card</h3>
  <p>Content visible through blurred background</p>
</div>

<!-- Navigation with glass effect -->
<nav class="fixed top-0 w-full backdrop-blur-lg bg-white/80 border-b border-gray-200/50 z-50">
  <div class="flex items-center justify-between px-6 py-3">
    <span class="font-bold">Logo</span>
    <div class="flex gap-6">
      <a href="#">Home</a>
      <a href="#">About</a>
    </div>
  </div>
</nav>
```

See `filters.md` for a full reference of all backdrop filter utilities.

## Complete Effects Example

```html
<!-- Pricing card with shadows and effects -->
<div class="group relative rounded-2xl bg-white p-8 shadow-lg shadow-gray-900/5 ring-1 ring-gray-900/5 transition-shadow hover:shadow-xl hover:shadow-gray-900/10">
  <!-- Popular badge -->
  <div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-500/25">
    Most Popular
  </div>

  <h3 class="text-lg font-semibold text-gray-900">Pro Plan</h3>
  <p class="mt-2 text-sm text-gray-500">For growing teams</p>

  <div class="mt-6">
    <span class="text-4xl font-bold text-gray-900">$49</span>
    <span class="text-sm text-gray-500">/month</span>
  </div>

  <ul class="mt-8 space-y-3 text-sm text-gray-600">
    <li class="flex items-center gap-2">
      <svg class="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">...</svg>
      Unlimited projects
    </li>
    <li class="flex items-center gap-2">
      <svg class="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">...</svg>
      Priority support
    </li>
  </ul>

  <button class="mt-8 w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white shadow-sm shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    Get Started
  </button>
</div>
```
