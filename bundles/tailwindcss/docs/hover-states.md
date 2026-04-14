# Hover, Focus, and Other States

Tailwind CSS v4 lets you conditionally apply any utility class using state variants like `hover:`, `focus:`, `active:`, and many more. These compose with responsive and dark mode variants.

## Pseudo-Class Variants

### Hover

```html
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
  Hover me
</button>

<a href="#" class="text-blue-600 hover:text-blue-800 hover:underline">
  Hover link
</a>

<div class="border border-gray-200 hover:border-blue-300 hover:shadow-md rounded-xl p-6 transition-all">
  Hover card
</div>
```

### Focus

```html
<input
  class="border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
  placeholder="Focus me"
/>

<button class="bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Focusable button
</button>
```

### Focus-Visible

Applies only when the element receives focus via keyboard navigation (not mouse click):

```html
<button class="rounded-lg bg-blue-600 px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
  Keyboard focus only
</button>

<a href="#" class="rounded px-2 py-1 focus-visible:ring-2 focus-visible:ring-blue-500">
  Keyboard-accessible link
</a>
```

### Focus-Within

Applies when the element or any descendant has focus:

```html
<div class="rounded-lg border border-gray-300 p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
  <label class="block text-sm font-medium text-gray-700">Search</label>
  <input class="mt-1 w-full border-none bg-transparent focus:outline-none" placeholder="Type to search..." />
</div>
```

### Active

Applies when the element is being pressed:

```html
<button class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 active:scale-95 text-white px-4 py-2 rounded-lg transition">
  Press me
</button>
```

### Disabled

```html
<button class="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  Disabled button
</button>

<input class="border rounded px-3 py-2 disabled:bg-gray-100 disabled:text-gray-400" disabled value="Disabled input" />
```

### Visited

```html
<a href="#" class="text-blue-600 visited:text-purple-600">Visited link turns purple</a>
```

### Checked

```html
<label class="flex cursor-pointer items-center gap-3">
  <input type="checkbox" class="peer sr-only" />
  <div class="h-5 w-5 rounded border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition"></div>
  <span class="peer-checked:text-blue-600">Custom checkbox</span>
</label>
```

### Required, Invalid, Valid

```html
<input
  type="email"
  required
  class="border rounded px-3 py-2 invalid:border-red-500 invalid:text-red-600 valid:border-green-500 focus:outline-none focus:ring-2 focus:invalid:ring-red-500/20 focus:valid:ring-green-500/20"
  placeholder="Email address"
/>
```

### Placeholder Shown

```html
<div class="relative">
  <input
    type="text"
    class="peer w-full rounded-lg border px-4 pt-6 pb-2 placeholder-shown:pt-4 placeholder-shown:pb-4 focus:outline-none"
    placeholder="Email"
  />
  <label class="absolute left-4 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
    Email
  </label>
</div>
```

## Group Variants

Style an element based on a parent's state. Add `group` to the parent.

### group-hover

```html
<div class="group rounded-xl border p-6 transition-all hover:border-blue-300 hover:shadow-lg">
  <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
    Card Title
  </h3>
  <p class="mt-2 text-gray-500">Card description.</p>
  <span class="mt-4 inline-flex items-center text-sm text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
    Read more &rarr;
  </span>
</div>
```

### group-focus, group-active

```html
<button class="group flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white">
  <svg class="h-5 w-5 transition-transform group-active:scale-90">...</svg>
  <span class="group-focus:underline">Button</span>
</button>
```

### Named Groups

Use named groups to target specific ancestors:

```html
<div class="group/card rounded-xl border p-6">
  <h3 class="group-hover/card:text-blue-600">Card Title</h3>
  <div class="group/button mt-4">
    <button class="rounded bg-blue-500 px-3 py-1 text-white group-hover/button:bg-blue-600">
      <span class="group-hover/card:font-bold">Action</span>
    </button>
  </div>
</div>
```

## Peer Variants

Style an element based on a sibling's state. Add `peer` to the sibling.

### peer-checked

```html
<!-- Toggle switch -->
<label class="relative inline-flex cursor-pointer items-center">
  <input type="checkbox" class="peer sr-only" />
  <div class="h-6 w-11 rounded-full bg-gray-200 transition peer-checked:bg-blue-600">
    <div class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"></div>
  </div>
</label>
```

### peer-focus

```html
<div>
  <input type="text" class="peer w-full rounded border px-3 py-2 focus:border-blue-500" placeholder="Email" />
  <p class="mt-1 hidden text-sm text-gray-500 peer-focus:block">
    Enter your email address
  </p>
</div>
```

### peer-invalid

```html
<div>
  <input type="email" required class="peer w-full rounded border px-3 py-2" placeholder="Email" />
  <p class="mt-1 hidden text-sm text-red-500 peer-invalid:block">
    Please enter a valid email address
  </p>
</div>
```

### Named Peers

```html
<input type="email" class="peer/email border rounded px-3 py-2" />
<input type="password" class="peer/password border rounded px-3 py-2" />
<p class="hidden peer-invalid/email:block text-red-500 text-sm">Invalid email</p>
<p class="hidden peer-invalid/password:block text-red-500 text-sm">Invalid password</p>
```

## First, Last, Odd, Even

```html
<ul class="divide-y">
  <!-- first:, last:, odd:, even: -->
  <li class="py-3 first:pt-0 last:pb-0">Item 1</li>
  <li class="py-3 first:pt-0 last:pb-0">Item 2</li>
  <li class="py-3 first:pt-0 last:pb-0">Item 3</li>
</ul>

<!-- Zebra striping -->
<table>
  <tbody>
    <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
      <td class="py-3 px-4">Row content</td>
    </tr>
  </tbody>
</table>
```

## Before and After Pseudo-Elements

```html
<!-- Decorative line -->
<h2 class="relative pl-4 text-xl font-bold before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded before:bg-blue-500 before:content-['']">
  Section Title
</h2>

<!-- Required field indicator -->
<label class="text-sm font-medium after:ml-0.5 after:text-red-500 after:content-['*']">
  Email
</label>

<!-- Badge with count -->
<span class="relative inline-flex">
  <button class="rounded-lg bg-gray-200 px-3 py-2">Notifications</button>
  <span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
    3
  </span>
</span>
```

## Selection

```html
<p class="selection:bg-blue-200 selection:text-blue-900">
  Select this text to see custom selection colors.
</p>
```

## Open (for details/dialog)

```html
<details class="group rounded-lg border">
  <summary class="flex cursor-pointer items-center justify-between p-4 font-medium">
    FAQ Question
    <svg class="h-5 w-5 transition group-open:rotate-180">...</svg>
  </summary>
  <div class="border-t p-4 text-gray-600">
    The answer to the FAQ question.
  </div>
</details>
```

## Data Attributes

Use `data-*:` to style based on data attributes:

```html
<div data-state="active" class="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded px-3 py-1">
  Active tab
</div>

<div data-loading class="data-[loading]:animate-pulse data-[loading]:opacity-50">
  Content area
</div>
```

## Aria Attributes

```html
<button aria-expanded="true" class="aria-expanded:bg-gray-100 aria-expanded:rotate-180 rounded p-2">
  Toggle
</button>

<div role="tab" aria-selected="true" class="aria-selected:border-b-2 aria-selected:border-blue-500 aria-selected:text-blue-600 px-4 py-2">
  Tab
</div>
```

## Composing Variants

Variants can be stacked:

```html
<!-- Dark mode + hover -->
<button class="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
  Composed
</button>

<!-- Responsive + dark + hover -->
<div class="text-gray-600 md:text-gray-700 dark:text-gray-400 dark:md:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
  Multiple variants
</div>

<!-- Group hover + focus-visible in dark mode -->
<div class="group">
  <a href="#" class="text-gray-600 group-hover:text-blue-600 focus-visible:ring-2 dark:text-gray-400 dark:group-hover:text-blue-400">
    Link
  </a>
</div>
```

## has: Variant

Style a parent based on the state of a descendant:

```html
<label class="has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 flex items-center gap-3 rounded-lg border p-4 transition">
  <input type="radio" name="plan" class="accent-blue-600" />
  <div>
    <span class="font-medium">Pro Plan</span>
    <p class="text-sm text-gray-500">$49/month</p>
  </div>
</label>
```
