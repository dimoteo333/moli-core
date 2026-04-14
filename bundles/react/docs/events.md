# Event Handling in React

## Basic Event Handling

React events use camelCase and accept functions (not strings):

```tsx
function Button() {
  function handleClick() {
    console.log('Clicked!');
  }

  return <button onClick={handleClick}>Click me</button>;
}

// Inline
<button onClick={() => console.log('Clicked!')}>Click me</button>
```

## Synthetic Events

React wraps native browser events in `SyntheticEvent` objects that have a consistent interface across browsers.

```tsx
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();   // Prevent default browser behavior
  e.stopPropagation();  // Stop event from bubbling up
  console.log(e.clientX, e.clientY);    // Mouse position
  console.log(e.currentTarget);          // The element the handler is on
  console.log(e.target);                 // The element that triggered the event
}
```

### Accessing the Native Event

```tsx
function handleClick(e: React.MouseEvent) {
  const nativeEvent = e.nativeEvent;  // Original DOM event
}
```

## Event Types Reference

### Mouse Events

```tsx
<div
  onClick={(e: React.MouseEvent<HTMLDivElement>) => {}}
  onDoubleClick={(e: React.MouseEvent) => {}}
  onMouseDown={(e: React.MouseEvent) => {}}
  onMouseUp={(e: React.MouseEvent) => {}}
  onMouseEnter={(e: React.MouseEvent) => {}}    // Does not bubble
  onMouseLeave={(e: React.MouseEvent) => {}}    // Does not bubble
  onMouseOver={(e: React.MouseEvent) => {}}     // Bubbles
  onMouseOut={(e: React.MouseEvent) => {}}      // Bubbles
  onMouseMove={(e: React.MouseEvent) => {}}
  onContextMenu={(e: React.MouseEvent) => {}}   // Right-click
/>
```

### Keyboard Events

```tsx
<input
  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
    if (e.key === 'Escape') cancel();
    if (e.key === 'a' && (e.metaKey || e.ctrlKey)) selectAll();
  }}
  onKeyUp={(e: React.KeyboardEvent) => {}}
/>
```

Common `e.key` values: `Enter`, `Escape`, `Tab`, `Backspace`, `Delete`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, ` ` (space).

### Form Events

```tsx
<input
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }}
  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {}}
  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {}}
  onInput={(e: React.FormEvent<HTMLInputElement>) => {}}
/>

<form
  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
  }}
  onReset={(e: React.FormEvent) => {}}
/>

<select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(e.target.value);
}} />

<textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log(e.target.value);
}} />
```

### Touch Events

```tsx
<div
  onTouchStart={(e: React.TouchEvent) => {}}
  onTouchMove={(e: React.TouchEvent) => {}}
  onTouchEnd={(e: React.TouchEvent) => {}}
  onTouchCancel={(e: React.TouchEvent) => {}}
/>
```

### Pointer Events

Unified mouse, touch, and pen events:

```tsx
<div
  onPointerDown={(e: React.PointerEvent) => {
    console.log(e.pointerType); // 'mouse', 'touch', or 'pen'
    console.log(e.pointerId);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }}
  onPointerMove={(e: React.PointerEvent) => {}}
  onPointerUp={(e: React.PointerEvent) => {}}
  onPointerEnter={(e: React.PointerEvent) => {}}
  onPointerLeave={(e: React.PointerEvent) => {}}
/>
```

### Drag Events

```tsx
function DraggableItem({ id }: { id: string }) {
  return (
    <div
      draggable
      onDragStart={(e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragEnd={(e: React.DragEvent) => {
        console.log(e.dataTransfer.dropEffect);
      }}
    >
      Drag me
    </div>
  );
}

function DropZone({ onDrop }: { onDrop: (id: string) => void }) {
  return (
    <div
      onDragOver={(e: React.DragEvent) => {
        e.preventDefault(); // Required to allow drop
        e.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(e: React.DragEvent) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        onDrop(id);
      }}
    >
      Drop here
    </div>
  );
}
```

### Clipboard Events

```tsx
<input
  onCopy={(e: React.ClipboardEvent) => {
    e.preventDefault();
    e.clipboardData.setData('text/plain', 'custom text');
  }}
  onPaste={(e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text/plain');
  }}
  onCut={(e: React.ClipboardEvent) => {}}
/>
```

### Scroll Events

```tsx
<div
  style={{ overflow: 'auto', height: 300 }}
  onScroll={(e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
  }}
>
  {content}
</div>
```

### Other Events

```tsx
// Image/media load events
<img onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
<video onPlay={() => {}} onPause={() => {}} onEnded={() => {}} />

// Animation/transition
<div
  onAnimationStart={() => {}}
  onAnimationEnd={() => {}}
  onTransitionEnd={() => {}}
/>

// Focus within (composition)
<div
  onFocus={() => setFocused(true)}
  onBlur={(e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setFocused(false); // Only when focus leaves the container entirely
    }
  }}
>
  <input />
  <input />
</div>
```

## Passing Arguments to Event Handlers

```tsx
function ItemList({ items, onDelete }: { items: Item[]; onDelete: (id: string) => void }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

## Event Delegation

React uses event delegation automatically. All events are attached to the root DOM node (not individual elements), so you do not need to manually delegate.

For custom delegation on a container:

```tsx
function Grid({ items, onItemClick }: Props) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLElement).closest('[data-item-id]');
    if (target) {
      const id = target.getAttribute('data-item-id')!;
      onItemClick(id);
    }
  }

  return (
    <div onClick={handleClick}>
      {items.map(item => (
        <div key={item.id} data-item-id={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Preventing Default and Stopping Propagation

```tsx
// Prevent form submission page reload
<form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>

// Prevent link navigation
<a href="/page" onClick={e => { e.preventDefault(); navigate('/page'); }}>

// Stop click from reaching parent handlers
<div onClick={handleOuter}>
  <button onClick={e => { e.stopPropagation(); handleInner(); }}>
    Click me
  </button>
</div>
```

## Capture Phase

Handle events during the capture phase (top-down) instead of bubbling (bottom-up):

```tsx
<div onClickCapture={(e) => {
  // Fires before onClick on children
  console.log('Captured!');
}}>
  <button onClick={() => console.log('Clicked!')}>Click</button>
</div>
```

## Common Pitfalls

- Calling the function instead of passing it: `onClick={handleClick()}` executes immediately. Use `onClick={handleClick}` or `onClick={() => handleClick(arg)}`.
- Forgetting `e.preventDefault()` in form `onSubmit` (causes page reload).
- Attaching expensive handlers (like `onMouseMove`) without throttling/debouncing.
- Using `e.target` when you mean `e.currentTarget` (target is the actual clicked element; currentTarget is the element with the handler).
- Not cleaning up manually added event listeners in `useEffect`.
