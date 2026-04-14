# Interactivity

Tailwind CSS v4 provides utilities for controlling cursor styles, pointer events, resize behavior, scroll behavior, scroll snap, user selection, touch actions, and more.

## Cursor

| Class | CSS |
|-------|-----|
| `cursor-auto` | `cursor: auto` |
| `cursor-default` | `cursor: default` |
| `cursor-pointer` | `cursor: pointer` |
| `cursor-wait` | `cursor: wait` |
| `cursor-text` | `cursor: text` |
| `cursor-move` | `cursor: move` |
| `cursor-help` | `cursor: help` |
| `cursor-not-allowed` | `cursor: not-allowed` |
| `cursor-none` | `cursor: none` |
| `cursor-context-menu` | `cursor: context-menu` |
| `cursor-progress` | `cursor: progress` |
| `cursor-cell` | `cursor: cell` |
| `cursor-crosshair` | `cursor: crosshair` |
| `cursor-vertical-text` | `cursor: vertical-text` |
| `cursor-alias` | `cursor: alias` |
| `cursor-copy` | `cursor: copy` |
| `cursor-no-drop` | `cursor: no-drop` |
| `cursor-grab` | `cursor: grab` |
| `cursor-grabbing` | `cursor: grabbing` |
| `cursor-all-scroll` | `cursor: all-scroll` |
| `cursor-col-resize` | `cursor: col-resize` |
| `cursor-row-resize` | `cursor: row-resize` |
| `cursor-n-resize` | `cursor: n-resize` |
| `cursor-e-resize` | `cursor: e-resize` |
| `cursor-s-resize` | `cursor: s-resize` |
| `cursor-w-resize` | `cursor: w-resize` |
| `cursor-zoom-in` | `cursor: zoom-in` |
| `cursor-zoom-out` | `cursor: zoom-out` |

```html
<button class="cursor-pointer bg-blue-500 px-4 py-2 text-white rounded">Clickable</button>
<button class="cursor-not-allowed opacity-50 bg-gray-400 px-4 py-2 text-white rounded" disabled>
  Disabled
</button>
<div class="cursor-grab active:cursor-grabbing p-4 bg-gray-100 rounded">
  Drag me
</div>

<!-- Custom cursor -->
<div class="cursor-[url('/custom-cursor.png'),auto]">Custom cursor image</div>
```

## Pointer Events

| Class | CSS |
|-------|-----|
| `pointer-events-none` | `pointer-events: none` |
| `pointer-events-auto` | `pointer-events: auto` |

```html
<!-- Overlay that doesn't capture clicks -->
<div class="relative">
  <button class="bg-blue-500 px-4 py-2 text-white rounded">Click through</button>
  <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
</div>

<!-- Disabled form with overlay -->
<fieldset class="pointer-events-none opacity-50">
  <input class="border rounded px-3 py-2" type="text" value="Read only" />
  <button class="bg-blue-500 px-4 py-2 text-white rounded">Submit</button>
</fieldset>
```

## Resize

| Class | CSS |
|-------|-----|
| `resize-none` | `resize: none` |
| `resize` | `resize: both` |
| `resize-x` | `resize: horizontal` |
| `resize-y` | `resize: vertical` |

```html
<textarea class="resize-none border rounded p-3 w-full" rows="4" placeholder="Cannot resize"></textarea>
<textarea class="resize-y border rounded p-3 w-full" rows="4" placeholder="Resize vertically only"></textarea>
<textarea class="resize border rounded p-3 w-full" rows="4" placeholder="Resize both directions"></textarea>
```

## Scroll Behavior

| Class | CSS |
|-------|-----|
| `scroll-smooth` | `scroll-behavior: smooth` |
| `scroll-auto` | `scroll-behavior: auto` |

```html
<html class="scroll-smooth">
  <!-- All anchor links will scroll smoothly -->
  <body>
    <nav>
      <a href="#section-1">Section 1</a>
      <a href="#section-2">Section 2</a>
    </nav>
    <section id="section-1">...</section>
    <section id="section-2">...</section>
  </body>
</html>
```

## Scroll Snap

### Snap Type (on container)

| Class | CSS |
|-------|-----|
| `snap-none` | `scroll-snap-type: none` |
| `snap-x` | `scroll-snap-type: x mandatory` |
| `snap-y` | `scroll-snap-type: y mandatory` |
| `snap-both` | `scroll-snap-type: both mandatory` |
| `snap-mandatory` | `scroll-snap-strictness: mandatory` |
| `snap-proximity` | `scroll-snap-strictness: proximity` |

### Snap Align (on children)

| Class | CSS |
|-------|-----|
| `snap-start` | `scroll-snap-align: start` |
| `snap-end` | `scroll-snap-align: end` |
| `snap-center` | `scroll-snap-align: center` |
| `snap-align-none` | `scroll-snap-align: none` |

### Snap Stop

| Class | CSS |
|-------|-----|
| `snap-normal` | `scroll-snap-stop: normal` |
| `snap-always` | `scroll-snap-stop: always` |

```html
<!-- Horizontal carousel with snap -->
<div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
  <div class="w-80 shrink-0 snap-center rounded-xl bg-white p-6 shadow">
    <h3 class="font-bold">Card 1</h3>
    <p class="mt-2 text-gray-600">First card in the carousel</p>
  </div>
  <div class="w-80 shrink-0 snap-center rounded-xl bg-white p-6 shadow">
    <h3 class="font-bold">Card 2</h3>
    <p class="mt-2 text-gray-600">Second card in the carousel</p>
  </div>
  <div class="w-80 shrink-0 snap-center rounded-xl bg-white p-6 shadow">
    <h3 class="font-bold">Card 3</h3>
    <p class="mt-2 text-gray-600">Third card in the carousel</p>
  </div>
</div>

<!-- Vertical snap scrolling -->
<div class="h-96 snap-y snap-mandatory overflow-y-auto">
  <section class="flex h-96 snap-start items-center justify-center bg-blue-500 text-white">
    <h2 class="text-4xl font-bold">Page 1</h2>
  </section>
  <section class="flex h-96 snap-start items-center justify-center bg-green-500 text-white">
    <h2 class="text-4xl font-bold">Page 2</h2>
  </section>
  <section class="flex h-96 snap-start items-center justify-center bg-purple-500 text-white">
    <h2 class="text-4xl font-bold">Page 3</h2>
  </section>
</div>
```

### Scroll Margin and Padding

Offset the snap position:

```html
<!-- Account for fixed header -->
<section class="snap-start scroll-mt-16" id="section">
  Content offset by 4rem from top when snapping
</section>

<!-- Padding on the scroll container -->
<div class="snap-x overflow-x-auto scroll-pl-6">
  <div class="snap-start">First item has left padding</div>
</div>
```

| Class | CSS |
|-------|-----|
| `scroll-m-*` | `scroll-margin: *` (all sides) |
| `scroll-mt-*` | `scroll-margin-top: *` |
| `scroll-p-*` | `scroll-padding: *` (on container) |
| `scroll-pt-*` | `scroll-padding-top: *` |

## User Select

| Class | CSS |
|-------|-----|
| `select-none` | `user-select: none` |
| `select-text` | `user-select: text` |
| `select-all` | `user-select: all` |
| `select-auto` | `user-select: auto` |

```html
<!-- Prevent selection on UI elements -->
<button class="select-none bg-blue-500 px-4 py-2 text-white rounded">
  Not selectable
</button>

<!-- Select all on click (for copy-paste) -->
<code class="select-all rounded bg-gray-100 px-2 py-1 font-mono text-sm">
  npm install tailwindcss
</code>
```

## Touch Action

| Class | CSS |
|-------|-----|
| `touch-auto` | `touch-action: auto` |
| `touch-none` | `touch-action: none` |
| `touch-pan-x` | `touch-action: pan-x` |
| `touch-pan-left` | `touch-action: pan-left` |
| `touch-pan-right` | `touch-action: pan-right` |
| `touch-pan-y` | `touch-action: pan-y` |
| `touch-pan-up` | `touch-action: pan-up` |
| `touch-pan-down` | `touch-action: pan-down` |
| `touch-pinch-zoom` | `touch-action: pinch-zoom` |
| `touch-manipulation` | `touch-action: manipulation` |

```html
<!-- Custom drag area -->
<div class="touch-none">Only responds to JS-handled gestures</div>

<!-- Map that only pans vertically -->
<div class="touch-pan-y h-64 overflow-auto">Vertical scroll only on touch</div>

<!-- Faster clicks (no 300ms delay) -->
<button class="touch-manipulation">No tap delay on mobile</button>
```

## Appearance

| Class | CSS |
|-------|-----|
| `appearance-none` | `appearance: none` |
| `appearance-auto` | `appearance: auto` |

```html
<!-- Custom styled select -->
<select class="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

## Caret Color

| Class | CSS |
|-------|-----|
| `caret-{color}-{shade}` | Sets the text cursor color |
| `caret-transparent` | Invisible caret |

```html
<input class="caret-blue-500 border rounded px-3 py-2" type="text" />
<input class="caret-pink-500 border rounded px-3 py-2" type="text" />
```

## Accent Color

Style form controls (checkboxes, radio buttons, range sliders):

```html
<label class="flex items-center gap-2">
  <input type="checkbox" class="accent-blue-600" checked />
  Remember me
</label>

<label class="flex items-center gap-2">
  <input type="radio" class="accent-pink-500" name="plan" checked />
  Pro plan
</label>

<input type="range" class="accent-emerald-500 w-full" />
```

## Content Visibility

| Class | CSS |
|-------|-----|
| `content-auto` | `content-visibility: auto` |
| `content-hidden` | `content-visibility: hidden` |
| `content-visible` | `content-visibility: visible` |

```html
<!-- Improve scroll performance for long lists -->
<div class="content-auto contain-intrinsic-size-auto-500px">
  Expensive-to-render content that is off-screen
</div>
```
