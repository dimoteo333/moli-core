# Transitions and Animations

Tailwind CSS v4 provides utilities for CSS transitions, animations, and keyframes.

## Transition Property

| Class | Properties Transitioned |
|-------|------------------------|
| `transition-none` | None |
| `transition-all` | All properties |
| `transition` | color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter |
| `transition-colors` | color, background-color, border-color, text-decoration-color, fill, stroke |
| `transition-opacity` | opacity |
| `transition-shadow` | box-shadow |
| `transition-transform` | transform |

```html
<!-- Color transition -->
<button class="transition-colors bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Hover me
</button>

<!-- Opacity transition -->
<div class="transition-opacity opacity-100 hover:opacity-75">
  Fades slightly on hover
</div>

<!-- Transform transition -->
<div class="transition-transform hover:scale-105">
  Scales up on hover
</div>

<!-- Multiple properties (default transition) -->
<button class="transition rounded-lg bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5">
  Animated button
</button>
```

## Transition Duration

| Class | CSS |
|-------|-----|
| `duration-0` | `transition-duration: 0ms` |
| `duration-75` | `transition-duration: 75ms` |
| `duration-100` | `transition-duration: 100ms` |
| `duration-150` | `transition-duration: 150ms` |
| `duration-200` | `transition-duration: 200ms` |
| `duration-300` | `transition-duration: 300ms` |
| `duration-500` | `transition-duration: 500ms` |
| `duration-700` | `transition-duration: 700ms` |
| `duration-1000` | `transition-duration: 1000ms` |

```html
<div class="transition duration-150 hover:scale-105">Fast (150ms)</div>
<div class="transition duration-300 hover:scale-105">Normal (300ms)</div>
<div class="transition duration-700 hover:scale-105">Slow (700ms)</div>
```

## Transition Timing Function

| Class | CSS |
|-------|-----|
| `ease-linear` | `transition-timing-function: linear` |
| `ease-in` | `transition-timing-function: ease-in` (cubic-bezier(0.4, 0, 1, 1)) |
| `ease-out` | `transition-timing-function: ease-out` (cubic-bezier(0, 0, 0.2, 1)) |
| `ease-in-out` | `transition-timing-function: ease-in-out` (cubic-bezier(0.4, 0, 0.2, 1)) |

```html
<div class="transition duration-300 ease-in-out hover:translate-x-4">Smooth ease</div>
<div class="transition duration-300 ease-out hover:translate-x-4">Quick start, slow end</div>

<!-- Custom cubic-bezier -->
<div class="transition duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] hover:translate-x-4">
  Bouncy easing
</div>
```

## Transition Delay

| Class | CSS |
|-------|-----|
| `delay-0` | `transition-delay: 0ms` |
| `delay-75` | `transition-delay: 75ms` |
| `delay-100` | `transition-delay: 100ms` |
| `delay-150` | `transition-delay: 150ms` |
| `delay-200` | `transition-delay: 200ms` |
| `delay-300` | `transition-delay: 300ms` |
| `delay-500` | `transition-delay: 500ms` |
| `delay-700` | `transition-delay: 700ms` |
| `delay-1000` | `transition-delay: 1000ms` |

```html
<!-- Staggered animation on children -->
<div class="flex gap-2">
  <div class="transition delay-0 duration-300 hover:translate-y-1">1</div>
  <div class="transition delay-75 duration-300 hover:translate-y-1">2</div>
  <div class="transition delay-150 duration-300 hover:translate-y-1">3</div>
  <div class="transition delay-300 duration-300 hover:translate-y-1">4</div>
</div>
```

## Animation

Built-in animations:

| Class | Animation |
|-------|-----------|
| `animate-spin` | Continuous 360-degree rotation (1s linear infinite) |
| `animate-ping` | Ping/pulse effect for notifications (1s cubic-bezier infinite) |
| `animate-pulse` | Gentle opacity pulse (2s ease-in-out infinite) |
| `animate-bounce` | Bouncing motion (1s infinite) |
| `animate-none` | Remove animation |

```html
<!-- Loading spinner -->
<svg class="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
</svg>

<!-- Notification ping -->
<span class="relative flex h-3 w-3">
  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
  <span class="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
</span>

<!-- Skeleton loader -->
<div class="animate-pulse space-y-4">
  <div class="h-4 w-3/4 rounded bg-gray-300"></div>
  <div class="h-4 w-full rounded bg-gray-300"></div>
  <div class="h-4 w-5/6 rounded bg-gray-300"></div>
</div>

<!-- Bouncing arrow -->
<div class="animate-bounce">
  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
  </svg>
</div>
```

### Custom Animations in v4

Define custom animations using `@theme` and `@keyframes`:

```css
@theme {
  --animate-fade-in: fade-in 0.5s ease-out;
  --animate-slide-up: slide-up 0.5s ease-out;
  --animate-slide-down: slide-down 0.3s ease-out;
  --animate-scale-in: scale-in 0.2s ease-out;
  --animate-shake: shake 0.5s ease-in-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slide-down {
  from { transform: translateY(-1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
```

Use them as `animate-fade-in`, `animate-slide-up`, etc.

```html
<div class="animate-fade-in">Fades in on mount</div>
<div class="animate-slide-up">Slides up on mount</div>
```

### Arbitrary Animation Values

```html
<div class="animate-[wiggle_1s_ease-in-out_infinite]">
  Custom animation inline
</div>
```

## Transition Patterns

### Hover Card

```html
<div class="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  <h3 class="font-bold text-gray-900 transition-colors group-hover:text-blue-600">
    Card Title
  </h3>
  <p class="mt-2 text-gray-500">Card description</p>
  <span class="mt-4 inline-flex items-center text-sm text-blue-600 transition-transform group-hover:translate-x-1">
    Learn more &rarr;
  </span>
</div>
```

### Accordion / Disclosure

```html
<details class="group rounded-lg border border-gray-200">
  <summary class="flex cursor-pointer items-center justify-between p-4 font-medium">
    Frequently Asked Question
    <svg class="h-5 w-5 transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="px-4 pb-4 text-gray-600">
    The answer to the question goes here.
  </div>
</details>
```

### Button with Loading State

```html
<button class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
  Processing...
</button>
```

## Will-Change

Hint the browser about properties that will animate:

| Class | CSS |
|-------|-----|
| `will-change-auto` | `will-change: auto` |
| `will-change-scroll` | `will-change: scroll-position` |
| `will-change-contents` | `will-change: contents` |
| `will-change-transform` | `will-change: transform` |

```html
<div class="will-change-transform transition-transform hover:scale-110">
  Optimized for transform animations
</div>
```

Use sparingly -- applying `will-change` broadly can consume memory and hurt performance.
