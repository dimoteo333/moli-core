# Accessibility

Tailwind CSS v4 provides utilities for building accessible interfaces, including screen reader utilities, forced colors mode, reduced motion preferences, and focus management.

## Screen Reader Utilities

### sr-only

Visually hides an element while keeping it accessible to screen readers and other assistive technology.

| Class | CSS |
|-------|-----|
| `sr-only` | Clips element to 1x1px, hidden from view but readable by screen readers |
| `not-sr-only` | Reverses `sr-only`, making the element visible again |

```html
<!-- Hidden label for icon button -->
<button class="rounded-lg p-2 hover:bg-gray-100">
  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
  <span class="sr-only">Search</span>
</button>

<!-- Skip navigation link (visible only on focus) -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none">
  Skip to main content
</a>

<!-- Hidden table header for accessibility -->
<table>
  <caption class="sr-only">User account details</caption>
  <thead>
    <tr>
      <th class="sr-only">User avatar</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img class="h-8 w-8 rounded-full" src="avatar.jpg" alt="Jane Doe" /></td>
      <td>Jane Doe</td>
      <td>jane@example.com</td>
    </tr>
  </tbody>
</table>

<!-- Hidden descriptive text -->
<div class="flex items-center gap-1">
  <span class="sr-only">Rating:</span>
  <svg class="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">...</svg>
  <svg class="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">...</svg>
  <svg class="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">...</svg>
  <svg class="h-5 w-5 fill-yellow-400" viewBox="0 0 20 20">...</svg>
  <svg class="h-5 w-5 fill-gray-300" viewBox="0 0 20 20">...</svg>
  <span class="sr-only">4 out of 5 stars</span>
</div>
```

## Focus Management

### focus-visible

Style elements only when they receive keyboard focus (not mouse/touch focus):

```html
<!-- Button with keyboard-only focus ring -->
<button class="rounded-lg bg-blue-600 px-4 py-2 text-white focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
  Accessible Button
</button>

<!-- Link with keyboard focus indicator -->
<a href="#" class="rounded px-1 text-blue-600 hover:text-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:outline-none">
  Accessible Link
</a>

<!-- Card with focus-visible -->
<div tabindex="0" class="rounded-xl border p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
  Focusable card
</div>
```

### focus-within

Style a container when any descendant has focus:

```html
<div class="rounded-lg border border-gray-300 p-4 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
  <label class="block text-sm font-medium text-gray-700">Search</label>
  <div class="mt-1 flex items-center gap-2">
    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input class="w-full border-none bg-transparent focus:outline-none" placeholder="Search..." />
  </div>
</div>
```

## Forced Colors Mode

The `forced-colors:` variant styles elements when the user has enabled forced colors mode (Windows High Contrast Mode):

```html
<button class="rounded-lg bg-blue-600 px-4 py-2 text-white forced-colors:border forced-colors:border-[ButtonText] forced-colors:bg-[ButtonFace] forced-colors:text-[ButtonText]">
  High Contrast Button
</button>

<div class="rounded border border-gray-200 p-4 forced-colors:border-[CanvasText]">
  <h3 class="font-bold forced-colors:text-[CanvasText]">Card Title</h3>
  <p class="text-gray-500 forced-colors:text-[CanvasText]">Card content</p>
</div>
```

### System Colors for Forced Colors

| Color | Purpose |
|-------|---------|
| `Canvas` | Background |
| `CanvasText` | Text on Canvas |
| `LinkText` | Links |
| `ButtonFace` | Button background |
| `ButtonText` | Button text |
| `Field` | Input field background |
| `FieldText` | Input field text |
| `Highlight` | Selected/highlighted background |
| `HighlightText` | Selected/highlighted text |
| `Mark` | Marked/highlighted text |
| `GrayText` | Disabled text |

## Reduced Motion

The `motion-reduce:` and `motion-safe:` variants allow you to adjust animations based on user preferences.

### motion-reduce

Applies styles when the user has enabled "reduce motion" in their OS:

```html
<!-- Remove animations for users who prefer reduced motion -->
<div class="animate-bounce motion-reduce:animate-none">
  Bouncing element (still for reduced motion users)
</div>

<!-- Disable transitions -->
<button class="transition-all duration-300 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100">
  Hover effect (disabled for reduced motion)
</button>

<!-- Simplify a complex animation -->
<div class="animate-slide-up motion-reduce:animate-none motion-reduce:opacity-100">
  Animated entrance
</div>
```

### motion-safe

Applies styles only when the user has NOT enabled reduced motion:

```html
<!-- Only animate when safe to do so -->
<div class="opacity-0 motion-safe:animate-fade-in">
  Fades in only for users OK with motion
</div>

<button class="rounded-lg bg-blue-600 px-4 py-2 text-white motion-safe:transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg">
  Animated only when safe
</button>
```

### Best Practice Pattern

```html
<!-- Prefer motion-safe for progressive enhancement -->
<div class="motion-safe:transition-all motion-safe:duration-300">
  <div class="rounded-xl border p-6 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
    Card with safe motion
  </div>
</div>
```

## Prefers Contrast

The `contrast-more:` and `contrast-less:` variants respond to the user's contrast preference:

```html
<input
  class="border border-gray-300 rounded px-3 py-2 contrast-more:border-2 contrast-more:border-black contrast-more:placeholder:text-gray-600"
  placeholder="Search..."
/>

<p class="text-gray-500 contrast-more:text-gray-800">
  Subtle text that becomes more prominent in high contrast
</p>

<div class="border border-gray-200 contrast-more:border-gray-700 rounded-lg p-4">
  Higher contrast borders when needed
</div>
```

## Accessible Component Patterns

### Accessible Modal

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title" class="fixed inset-0 z-50 flex items-center justify-center">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-black/50" aria-hidden="true"></div>

  <!-- Modal -->
  <div class="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
    <h2 id="modal-title" class="text-lg font-semibold">Confirm Action</h2>
    <p class="mt-2 text-gray-600">Are you sure you want to proceed?</p>
    <div class="mt-6 flex justify-end gap-3">
      <button class="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-400">
        Cancel
      </button>
      <button class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
        Delete
      </button>
    </div>
  </div>
</div>
```

### Accessible Form

```html
<form class="space-y-6">
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">
      Email <span class="text-red-500" aria-hidden="true">*</span>
      <span class="sr-only">(required)</span>
    </label>
    <input
      id="email"
      type="email"
      required
      aria-describedby="email-error"
      class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/20"
    />
    <p id="email-error" class="mt-1 hidden text-sm text-red-500" role="alert">
      Please enter a valid email address.
    </p>
  </div>

  <button type="submit" class="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
    Submit
  </button>
</form>
```

### Accessible Navigation with ARIA

```html
<nav aria-label="Main navigation">
  <ul class="flex gap-1" role="list">
    <li>
      <a href="/" aria-current="page" class="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
        Home
      </a>
    </li>
    <li>
      <a href="/about" class="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900">
        About
      </a>
    </li>
  </ul>
</nav>
```

## ARIA Attribute Variants

Style elements based on ARIA attributes:

```html
<!-- aria-selected tabs -->
<div role="tablist" class="flex gap-1 border-b">
  <button role="tab" aria-selected="true" class="border-b-2 border-transparent px-4 py-2 text-sm aria-selected:border-blue-500 aria-selected:text-blue-600">
    Tab 1
  </button>
  <button role="tab" aria-selected="false" class="border-b-2 border-transparent px-4 py-2 text-sm text-gray-500 aria-selected:border-blue-500 aria-selected:text-blue-600">
    Tab 2
  </button>
</div>

<!-- aria-expanded accordion -->
<button aria-expanded="false" class="flex w-full items-center justify-between p-4 aria-expanded:bg-gray-50">
  <span>Section Title</span>
  <svg class="h-5 w-5 transition-transform aria-expanded:rotate-180" viewBox="0 0 24 24">...</svg>
</button>

<!-- aria-disabled -->
<button aria-disabled="true" class="rounded-lg bg-blue-600 px-4 py-2 text-white aria-disabled:opacity-50 aria-disabled:cursor-not-allowed">
  Submit
</button>
```
