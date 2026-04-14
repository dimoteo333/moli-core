# React Performance

## React.memo

Wraps a component to skip re-rendering when its props have not changed (shallow comparison).

```tsx
const ExpensiveList = React.memo(function ExpensiveList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
});
```

### Custom Comparison

```tsx
const Chart = React.memo(
  function Chart({ data, title }: { data: number[]; title: string }) {
    // expensive render
    return <canvas />;
  },
  (prev, next) => {
    return prev.title === next.title && arraysEqual(prev.data, next.data);
  }
);
```

### When to Use React.memo

- Components that render often with the same props
- Components with expensive render logic
- Components that receive stable props from parents

**Do not use** when:
- The component almost always receives different props
- The component is already fast to render
- Props include children (almost always a new reference)

## useMemo

Caches a computed value between re-renders:

```tsx
function ProductList({ products, filter }: Props) {
  const filtered = useMemo(
    () => products.filter(p => p.category === filter).sort((a, b) => a.price - b.price),
    [products, filter]
  );

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}: ${p.price}</li>)}</ul>;
}
```

### When to Use useMemo

- Expensive computations (sorting, filtering, complex math)
- Creating objects/arrays passed to memoized children
- Values used as dependencies in other hooks

```tsx
// Object stability for downstream memo/effects
const style = useMemo(() => ({ color: theme.primary, fontSize }), [theme.primary, fontSize]);
return <MemoizedBox style={style} />;
```

## useCallback

Caches a function reference between re-renders:

```tsx
function Parent() {
  const [items, setItems] = useState<Item[]>([]);

  const handleDelete = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return <MemoizedList items={items} onDelete={handleDelete} />;
}
```

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

### When to Use useCallback

- Passing callbacks to memoized child components
- Callbacks used as dependencies in `useEffect` or `useMemo`
- Callbacks passed to context values

## Code Splitting with React.lazy

Split your bundle so users only download the code they need:

```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
}
```

### Preloading

Trigger loading before navigation:

```tsx
const SettingsPage = lazy(() => import('./pages/Settings'));

// Preload on hover
function NavLink() {
  return (
    <a
      href="/settings"
      onMouseEnter={() => import('./pages/Settings')}
    >
      Settings
    </a>
  );
}
```

## Suspense for Data

React 19 supports Suspense for data fetching with the `use` hook or framework integrations:

```tsx
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}

<Suspense fallback={<Skeleton />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>
```

## Transitions

Mark non-urgent updates so urgent ones (typing) are not blocked:

```tsx
function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => {
      setResults(searchDatabase(value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        <ResultsList results={results} />
      </div>
    </>
  );
}
```

## useDeferredValue

Similar to transitions but for values received as props:

```tsx
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const results = useMemo(() => filterItems(deferredQuery), [deferredQuery]);

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      {results.map(r => <div key={r.id}>{r.name}</div>)}
    </div>
  );
}
```

## Virtualization

For long lists, render only visible items. Use libraries like `@tanstack/react-virtual`:

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
              width: '100%',
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Avoiding Unnecessary Re-renders

### Move State Down

```tsx
// BAD: entire App re-renders on every keystroke
function App() {
  const [text, setText] = useState('');
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ExpensiveTree />
    </div>
  );
}

// GOOD: isolate the input
function SearchInput() {
  const [text, setText] = useState('');
  return <input value={text} onChange={e => setText(e.target.value)} />;
}

function App() {
  return (
    <div>
      <SearchInput />
      <ExpensiveTree />
    </div>
  );
}
```

### Lift Content Up

```tsx
// BAD: ExpensiveTree re-renders when color changes
function App() {
  const [color, setColor] = useState('red');
  return (
    <div style={{ color }}>
      <input value={color} onChange={e => setColor(e.target.value)} />
      <ExpensiveTree />
    </div>
  );
}

// GOOD: pass ExpensiveTree as children
function ColorWrapper({ children }: { children: ReactNode }) {
  const [color, setColor] = useState('red');
  return (
    <div style={{ color }}>
      <input value={color} onChange={e => setColor(e.target.value)} />
      {children}
    </div>
  );
}

function App() {
  return (
    <ColorWrapper>
      <ExpensiveTree />
    </ColorWrapper>
  );
}
```

## Profiling

### React DevTools Profiler

1. Open React DevTools in browser
2. Go to the Profiler tab
3. Record an interaction
4. Review flame chart and ranked view to find slow components

### Profiler Component

```tsx
import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRender: ProfilerOnRenderCallback = (id, phase, actualDuration) => {
  console.log(`${id} ${phase}: ${actualDuration.toFixed(1)}ms`);
};

<Profiler id="MainContent" onRender={onRender}>
  <MainContent />
</Profiler>
```

## Performance Checklist

1. Profile first. Do not optimize without measuring.
2. Move state as close to where it is used as possible.
3. Memoize expensive computations with `useMemo`.
4. Stabilize callback references with `useCallback` when passing to memoized children.
5. Use `React.memo` on components that re-render with identical props.
6. Code-split routes and heavy components with `React.lazy`.
7. Virtualize long lists (1000+ items).
8. Use transitions for non-urgent updates.
9. Avoid creating new objects/arrays/functions in render when passed as props to memoized children.
10. Use the key prop to reset component state instead of effects.
