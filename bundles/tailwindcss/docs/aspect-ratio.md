# Aspect Ratio

Tailwind CSS v4 provides utilities for controlling the aspect ratio of elements, using the native CSS `aspect-ratio` property.

## Aspect Ratio Utilities

| Class | CSS |
|-------|-----|
| `aspect-auto` | `aspect-ratio: auto` |
| `aspect-square` | `aspect-ratio: 1 / 1` |
| `aspect-video` | `aspect-ratio: 16 / 9` |

## Square Aspect Ratio

Use `aspect-square` for 1:1 ratio elements like avatars, thumbnails, and icons.

```html
<!-- Avatar -->
<img class="aspect-square w-16 rounded-full object-cover" src="avatar.jpg" alt="User avatar" />

<!-- Thumbnail grid -->
<div class="grid grid-cols-3 gap-2">
  <img class="aspect-square w-full rounded-lg object-cover" src="photo1.jpg" alt="" />
  <img class="aspect-square w-full rounded-lg object-cover" src="photo2.jpg" alt="" />
  <img class="aspect-square w-full rounded-lg object-cover" src="photo3.jpg" alt="" />
  <img class="aspect-square w-full rounded-lg object-cover" src="photo4.jpg" alt="" />
  <img class="aspect-square w-full rounded-lg object-cover" src="photo5.jpg" alt="" />
  <img class="aspect-square w-full rounded-lg object-cover" src="photo6.jpg" alt="" />
</div>

<!-- Color swatch grid -->
<div class="grid grid-cols-5 gap-2">
  <div class="aspect-square rounded-lg bg-blue-500"></div>
  <div class="aspect-square rounded-lg bg-blue-400"></div>
  <div class="aspect-square rounded-lg bg-blue-300"></div>
  <div class="aspect-square rounded-lg bg-blue-200"></div>
  <div class="aspect-square rounded-lg bg-blue-100"></div>
</div>
```

## Video Aspect Ratio

Use `aspect-video` for 16:9 ratio, standard for video content.

```html
<!-- Video embed -->
<div class="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
  <iframe
    class="h-full w-full"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>

<!-- Video placeholder -->
<div class="aspect-video w-full rounded-xl bg-gray-900 flex items-center justify-center">
  <button class="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition">
    <svg class="h-8 w-8 fill-current" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  </button>
</div>

<!-- Responsive video -->
<div class="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
  <video class="h-full w-full object-cover" poster="poster.jpg" controls>
    <source src="video.mp4" type="video/mp4" />
  </video>
</div>
```

## Custom Aspect Ratios

Use arbitrary values for non-standard ratios:

```html
<!-- 4:3 (classic TV / photo) -->
<div class="aspect-[4/3] w-full rounded-lg bg-gray-200">4:3 ratio</div>

<!-- 3:2 (standard photo) -->
<img class="aspect-[3/2] w-full rounded-lg object-cover" src="landscape.jpg" alt="" />

<!-- 21:9 (ultrawide/cinematic) -->
<div class="aspect-[21/9] w-full rounded-lg bg-gray-900">
  <img class="h-full w-full object-cover" src="cinematic.jpg" alt="" />
</div>

<!-- 2:3 (portrait) -->
<div class="aspect-[2/3] w-48 rounded-lg bg-gray-200">Portrait ratio</div>

<!-- 1:1.414 (A4 paper) -->
<div class="aspect-[1/1.414] w-64 rounded-lg border bg-white p-8 shadow">
  A4-proportioned card
</div>

<!-- Golden ratio -->
<div class="aspect-[1.618/1] w-full rounded-lg bg-gradient-to-r from-amber-200 to-yellow-400">
  Golden ratio
</div>
```

## Responsive Aspect Ratios

Change the aspect ratio at different breakpoints:

```html
<!-- Square on mobile, video on desktop -->
<div class="aspect-square md:aspect-video w-full rounded-xl bg-gray-100 overflow-hidden">
  <img class="h-full w-full object-cover" src="photo.jpg" alt="" />
</div>

<!-- Video on mobile, wider on desktop -->
<div class="aspect-video lg:aspect-[21/9] w-full rounded-xl overflow-hidden">
  <img class="h-full w-full object-cover" src="hero.jpg" alt="" />
</div>
```

## Common Patterns

### Image Card with Fixed Ratio

```html
<div class="overflow-hidden rounded-xl border bg-white shadow-sm">
  <div class="aspect-[3/2] overflow-hidden">
    <img class="h-full w-full object-cover transition-transform duration-300 hover:scale-105" src="photo.jpg" alt="" />
  </div>
  <div class="p-4">
    <h3 class="font-semibold text-gray-900">Card Title</h3>
    <p class="mt-1 text-sm text-gray-500">Card description goes here.</p>
  </div>
</div>
```

### Product Grid

```html
<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
  <div class="group">
    <div class="aspect-square overflow-hidden rounded-xl bg-gray-100">
      <img class="h-full w-full object-cover transition duration-300 group-hover:scale-110" src="product.jpg" alt="Product" />
    </div>
    <h3 class="mt-2 text-sm font-medium text-gray-900">Product Name</h3>
    <p class="text-sm text-gray-500">$29.99</p>
  </div>
</div>
```

### Map / Embed Container

```html
<div class="aspect-[4/3] w-full overflow-hidden rounded-xl border sm:aspect-video">
  <iframe
    class="h-full w-full"
    src="https://maps.google.com/maps?output=embed"
    loading="lazy"
  ></iframe>
</div>
```

### Skeleton Loader with Aspect Ratio

```html
<div class="animate-pulse">
  <div class="aspect-video w-full rounded-xl bg-gray-300"></div>
  <div class="mt-3 h-4 w-3/4 rounded bg-gray-300"></div>
  <div class="mt-2 h-4 w-1/2 rounded bg-gray-300"></div>
</div>
```

## Custom Theme Values

Define custom aspect ratios in your theme:

```css
@theme {
  --aspect-photo: 3 / 2;
  --aspect-cinema: 21 / 9;
  --aspect-portrait: 2 / 3;
}
```

Use as: `aspect-photo`, `aspect-cinema`, `aspect-portrait`.

## Note on Object Fit

When using `aspect-ratio` with images, combine with `object-cover` or `object-contain` to control how the image fills the aspect ratio box:

```html
<!-- Cover: fills the box, may crop -->
<img class="aspect-square w-32 rounded-lg object-cover" src="photo.jpg" alt="" />

<!-- Contain: fits inside the box, may letterbox -->
<img class="aspect-square w-32 rounded-lg bg-gray-100 object-contain" src="logo.png" alt="" />
```
