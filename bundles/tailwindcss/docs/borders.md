# Borders

Tailwind CSS v4 provides utilities for controlling border width, color, radius, style, ring, outline, and dividers.

## Border Width

| Class | CSS |
|-------|-----|
| `border` | `border-width: 1px` |
| `border-0` | `border-width: 0px` |
| `border-2` | `border-width: 2px` |
| `border-4` | `border-width: 4px` |
| `border-8` | `border-width: 8px` |
| `border-t` | `border-top-width: 1px` |
| `border-r` | `border-right-width: 1px` |
| `border-b` | `border-bottom-width: 1px` |
| `border-l` | `border-left-width: 1px` |
| `border-t-2` | `border-top-width: 2px` |
| `border-x` | `border-left-width: 1px; border-right-width: 1px` |
| `border-y` | `border-top-width: 1px; border-bottom-width: 1px` |
| `border-s` | `border-inline-start-width: 1px` (logical) |
| `border-e` | `border-inline-end-width: 1px` (logical) |

```html
<div class="border border-gray-300 rounded-lg p-4">Default 1px border</div>
<div class="border-2 border-blue-500 rounded-lg p-4">2px blue border</div>
<div class="border-l-4 border-red-500 bg-red-50 p-4">Left accent border</div>
<div class="border-b border-gray-200 py-4">Bottom border only</div>
```

## Border Color

Use `border-{color}-{shade}` to set border color. See `colors.md` for full palette.

```html
<input class="border border-gray-300 focus:border-blue-500 rounded px-3 py-2" />
<div class="border-2 border-dashed border-gray-400 p-4">Dashed gray border</div>
<div class="border border-transparent hover:border-gray-300 transition p-4">
  Border appears on hover
</div>
```

### Border Opacity

```html
<div class="border border-black/10 p-4">10% opacity border</div>
<div class="border-2 border-blue-500/50 p-4">50% opacity blue border</div>
```

## Border Style

| Class | CSS |
|-------|-----|
| `border-solid` | `border-style: solid` |
| `border-dashed` | `border-style: dashed` |
| `border-dotted` | `border-style: dotted` |
| `border-double` | `border-style: double` |
| `border-hidden` | `border-style: hidden` |
| `border-none` | `border-style: none` |

```html
<div class="border-2 border-dashed border-gray-300 p-6 text-center">
  <p class="text-gray-500">Drop files here</p>
</div>
```

## Border Radius

| Class | CSS |
|-------|-----|
| `rounded-none` | `border-radius: 0px` |
| `rounded-sm` | `border-radius: 0.125rem` (2px) |
| `rounded` | `border-radius: 0.25rem` (4px) |
| `rounded-md` | `border-radius: 0.375rem` (6px) |
| `rounded-lg` | `border-radius: 0.5rem` (8px) |
| `rounded-xl` | `border-radius: 0.75rem` (12px) |
| `rounded-2xl` | `border-radius: 1rem` (16px) |
| `rounded-3xl` | `border-radius: 1.5rem` (24px) |
| `rounded-full` | `border-radius: 9999px` |

### Per-Corner Radius

| Class | Corners |
|-------|---------|
| `rounded-t-lg` | Top-left and top-right |
| `rounded-r-lg` | Top-right and bottom-right |
| `rounded-b-lg` | Bottom-left and bottom-right |
| `rounded-l-lg` | Top-left and bottom-left |
| `rounded-tl-lg` | Top-left only |
| `rounded-tr-lg` | Top-right only |
| `rounded-br-lg` | Bottom-right only |
| `rounded-bl-lg` | Bottom-left only |
| `rounded-s-lg` | Start corners (logical) |
| `rounded-e-lg` | End corners (logical) |
| `rounded-ss-lg` | Start-start corner (logical) |
| `rounded-se-lg` | Start-end corner (logical) |
| `rounded-es-lg` | End-start corner (logical) |
| `rounded-ee-lg` | End-end corner (logical) |

```html
<img class="rounded-full h-16 w-16" src="avatar.jpg" alt="Avatar" />
<div class="rounded-xl bg-white p-6 shadow-lg">Rounded card</div>
<div class="rounded-t-2xl bg-blue-500 p-4 text-white">Rounded top only</div>
<button class="rounded-lg bg-blue-600 px-4 py-2 text-white">Rounded button</button>
```

## Ring

Ring utilities add a box-shadow-based outline. Useful for focus indicators.

| Class | CSS |
|-------|-----|
| `ring` | `box-shadow: 0 0 0 3px ...` (3px ring) |
| `ring-0` | No ring |
| `ring-1` | 1px ring |
| `ring-2` | 2px ring |
| `ring-4` | 4px ring |
| `ring-8` | 8px ring |
| `ring-inset` | Ring is inside the element |

### Ring Color

```html
<button class="rounded-lg bg-white px-4 py-2 ring-2 ring-blue-500">
  Blue ring
</button>

<!-- Focus ring -->
<input class="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />

<!-- Ring with opacity -->
<button class="ring-2 ring-blue-500/50 rounded-lg px-4 py-2">
  Translucent ring
</button>
```

### Ring Offset

Creates a gap between the element and its ring.

| Class | CSS |
|-------|-----|
| `ring-offset-0` | `--tw-ring-offset-width: 0px` |
| `ring-offset-1` | `--tw-ring-offset-width: 1px` |
| `ring-offset-2` | `--tw-ring-offset-width: 2px` |
| `ring-offset-4` | `--tw-ring-offset-width: 4px` |
| `ring-offset-8` | `--tw-ring-offset-width: 8px` |

```html
<button class="rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-white px-4 py-2">
  Ring with offset
</button>
```

## Outline

| Class | CSS |
|-------|-----|
| `outline` | `outline-style: solid` |
| `outline-none` | `outline: 2px solid transparent; outline-offset: 2px` |
| `outline-dashed` | `outline-style: dashed` |
| `outline-dotted` | `outline-style: dotted` |
| `outline-double` | `outline-style: double` |
| `outline-0` to `outline-8` | Sets outline width |
| `outline-offset-0` to `outline-offset-8` | Sets outline offset |

```html
<button class="outline outline-2 outline-blue-500 outline-offset-2 rounded-lg px-4 py-2">
  Outlined button
</button>

<!-- Accessible focus style -->
<a class="rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" href="#">
  Keyboard-accessible focus ring
</a>
```

### Outline Color

```html
<button class="outline outline-2 outline-red-500">Red outline</button>
<input class="focus:outline focus:outline-2 focus:outline-blue-500 rounded border px-3 py-2" />
```

## Divide

Add borders between child elements.

| Class | CSS |
|-------|-----|
| `divide-x` | Vertical dividers between horizontal children |
| `divide-y` | Horizontal dividers between stacked children |
| `divide-x-2` | 2px vertical dividers |
| `divide-y-2` | 2px horizontal dividers |
| `divide-x-reverse` | Reverse divider direction |
| `divide-y-reverse` | Reverse divider direction |

### Divide Color and Style

```html
<!-- List with dividers -->
<ul class="divide-y divide-gray-200 rounded-lg border border-gray-200">
  <li class="px-4 py-3">Item 1</li>
  <li class="px-4 py-3">Item 2</li>
  <li class="px-4 py-3">Item 3</li>
</ul>

<!-- Horizontal dividers with color -->
<div class="flex divide-x divide-gray-300">
  <div class="px-4">Section A</div>
  <div class="px-4">Section B</div>
  <div class="px-4">Section C</div>
</div>

<!-- Dashed dividers -->
<div class="divide-y divide-dashed divide-gray-300">
  <div class="py-3">Row 1</div>
  <div class="py-3">Row 2</div>
</div>
```

## Complete Border Example

```html
<!-- Form input group -->
<div class="mx-auto max-w-md space-y-4">
  <div>
    <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      class="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800"
      placeholder="you@example.com"
    />
  </div>
  <div>
    <label class="mb-1 block text-sm font-medium text-gray-700">Password</label>
    <input
      type="password"
      class="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      placeholder="Enter password"
    />
  </div>
  <button class="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
    Sign In
  </button>
</div>

<!-- Card with sections -->
<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
  <div class="border-b border-gray-200 px-6 py-4">
    <h3 class="text-lg font-semibold">Card Header</h3>
  </div>
  <div class="divide-y divide-gray-100 px-6">
    <div class="py-4">Section 1 content</div>
    <div class="py-4">Section 2 content</div>
    <div class="py-4">Section 3 content</div>
  </div>
  <div class="border-t border-gray-200 bg-gray-50 px-6 py-3 text-right">
    <button class="text-sm text-blue-600 hover:text-blue-800">View all</button>
  </div>
</div>
```
