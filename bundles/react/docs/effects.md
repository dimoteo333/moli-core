# Effects in React

`useEffect` lets you synchronize a component with an external system (DOM, network, third-party library, timer, etc). Effects run after the browser paints.

## Basic Syntax

```tsx
useEffect(() => {
  // Setup: runs after render
  return () => {
    // Cleanup: runs before next effect and on unmount
  };
}, [dependencies]);
```

## Dependency Array

The dependency array controls when the effect re-runs:

```tsx
// Runs after every render
useEffect(() => { /* ... */ });

// Runs once after initial render (mount)
useEffect(() => { /* ... */ }, []);

// Runs when `id` or `query` change
useEffect(() => { /* ... */ }, [id, query]);
```

React uses `Object.is` to compare dependencies. Objects, arrays, and functions are compared by reference.

## Lifecycle Mapping

| Class lifecycle | Hook equivalent |
|----------------|-----------------|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | cleanup function from `useEffect` |

However, think in terms of synchronization, not lifecycle. An effect "synchronizes X with Y", not "runs on mount".

## Cleanup

Cleanup prevents memory leaks and stale behavior. It runs:
1. Before the effect re-runs (when dependencies change)
2. When the component unmounts

### Event Listeners

```tsx
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### Timers

```tsx
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(id);
}, []);
```

### Subscriptions

```tsx
useEffect(() => {
  const unsubscribe = store.subscribe((state) => {
    setData(state.data);
  });
  return unsubscribe;
}, [store]);
```

### WebSocket

```tsx
useEffect(() => {
  const ws = new WebSocket(`wss://api.example.com/ws/${roomId}`);
  ws.onmessage = (event) => {
    setMessages(prev => [...prev, JSON.parse(event.data)]);
  };
  ws.onerror = (error) => setError(error);
  return () => ws.close();
}, [roomId]);
```

## Data Fetching

### Basic Pattern with Cancellation

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/items/${id}`, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItem(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  fetchData();
  return () => controller.abort();
}, [id]);
```

### Race Condition Prevention with Boolean Flag

```tsx
useEffect(() => {
  let cancelled = false;
  fetchUser(userId).then(user => {
    if (!cancelled) setUser(user);
  });
  return () => { cancelled = true; };
}, [userId]);
```

### Custom Data Fetching Hook

```tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}
```

## DOM Manipulation

```tsx
function AutoFocusInput() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return <input ref={ref} />;
}
```

### Measuring DOM Elements

```tsx
function Tooltip({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [children]);

  return <div ref={ref}>{children}</div>;
}
```

## Third-Party Library Integration

```tsx
function Map({ center, zoom }: { center: LatLng; zoom: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new MapLibreMap({
      container: containerRef.current,
      center,
      zoom,
    });
    mapRef.current = map;
    return () => map.remove();
  }, []);

  // Sync props to map instance
  useEffect(() => {
    mapRef.current?.setCenter(center);
  }, [center]);

  useEffect(() => {
    mapRef.current?.setZoom(zoom);
  }, [zoom]);

  return <div ref={containerRef} style={{ width: '100%', height: 400 }} />;
}
```

## Document Title

```tsx
function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => { document.title = prev; };
  }, [title]);
}
```

## useLayoutEffect

Fires synchronously after DOM mutations but before the browser paints. Use for reading layout and synchronously re-rendering to avoid visual flicker.

```tsx
import { useLayoutEffect } from 'react';

function Tooltip({ anchorRef, children }: Props) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!anchorRef.current || !tooltipRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8, left: rect.left });
  }, [anchorRef]);

  return (
    <div ref={tooltipRef} style={{ position: 'fixed', ...position }}>
      {children}
    </div>
  );
}
```

**Rule of thumb**: Use `useEffect` by default. Switch to `useLayoutEffect` only if you see visual flicker from DOM reads/writes.

## Common Pitfalls

### Missing Dependencies

```tsx
// BUG: stale `count` value
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, []); // count is missing

// FIX: include count, or use a ref
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, [count]);
```

### Infinite Loops

```tsx
// BUG: object created every render is a new reference
useEffect(() => {
  fetchData(options);
}, [options]); // options = { page: 1 } created in render — new ref each time

// FIX: memoize the object or destructure primitives
const { page, limit } = options;
useEffect(() => {
  fetchData({ page, limit });
}, [page, limit]);
```

### Setting State on Unmounted Component

Use AbortController or a boolean flag to avoid this (see data fetching examples above).

### Effects That Should Not Be Effects

Not everything needs `useEffect`. Avoid effects for:
- **Transforming data for rendering** — compute during render or use `useMemo`.
- **Handling user events** — use event handlers instead.
- **Resetting state on prop change** — use a `key` to reset the component.
- **Initializing the app** — do it outside the component.

```tsx
// BAD: unnecessary effect
useEffect(() => {
  setFilteredItems(items.filter(i => i.active));
}, [items]);

// GOOD: compute during render
const filteredItems = items.filter(i => i.active);
```

## Strict Mode Double-Invocation

In development with `<StrictMode>`, React runs each effect twice (setup -> cleanup -> setup) to verify cleanup works correctly. This does not happen in production.
