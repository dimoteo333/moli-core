# How React Rendering Works

## The Render Cycle

React rendering has two phases:

1. **Render phase**: React calls your component functions to compute the virtual DOM (React element tree). This phase is pure -- no side effects.
2. **Commit phase**: React applies changes to the actual DOM. Effects run after the commit.

## When Does a Component Re-render?

A component re-renders when:
- Its state changes (`setState` / `dispatch`)
- Its parent re-renders (and passes new props or the same props without memoization)
- A context it consumes changes

A component does NOT re-render when:
- A ref changes (`ref.current = newValue`)
- A variable outside of state changes
- A sibling re-renders (unless they share a parent that re-renders)

## Virtual DOM and Reconciliation

React maintains a virtual representation of the UI. On re-render, React:

1. Calls your component to produce a new element tree
2. Compares (diffs) the new tree with the previous tree
3. Computes the minimal set of DOM operations needed
4. Applies those operations to the real DOM

### Same Position, Same Type = Update

```tsx
// React updates the existing <input>, preserving its state
function App({ isRed }: { isRed: boolean }) {
  return isRed
    ? <input style={{ color: 'red' }} />
    : <input style={{ color: 'blue' }} />;
  // Same position, same type (<input>) → DOM node is reused, only style changes
}
```

### Different Type = Remount

```tsx
function App({ useTextarea }: { useTextarea: boolean }) {
  return useTextarea
    ? <textarea />   // Switches from input to textarea
    : <input />;     // Different type → old node destroyed, new node created
}
```

## Keys

Keys tell React which element is which across renders. They are critical for lists and for resetting component state.

### Keys in Lists

```tsx
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(todo => (
        // Key identifies each element uniquely
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

Without keys (or with index keys), React cannot correctly identify which items changed, leading to:
- Incorrect state preservation when items reorder
- Unexpected visual glitches
- Broken input focus

### Key Rules

- Use stable, unique identifiers (database IDs, UUIDs).
- Do NOT use array index as key when the list can reorder, insert, or delete items.
- Index keys are acceptable only for static, never-reordered lists.

### Keys to Reset State

Changing the key forces React to unmount and remount the component, resetting all state:

```tsx
function EditProfile({ userId }: { userId: string }) {
  // When userId changes, the form remounts with fresh state
  return <ProfileForm key={userId} userId={userId} />;
}
```

This is cleaner than using `useEffect` to reset state when a prop changes.

## Batching

React 19 automatically batches all state updates, regardless of where they originate:

```tsx
function handleClick() {
  setCount(c => c + 1);    // Does NOT re-render yet
  setFlag(f => !f);         // Does NOT re-render yet
  setText('updated');       // React re-renders ONCE with all three updates
}

// Also batched in React 19 (previously not in React 17):
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Single re-render
}, 1000);

fetch('/api/data').then(() => {
  setData(newData);
  setLoading(false);
  // Single re-render
});
```

### Flushing Updates Synchronously

In rare cases, force React to flush immediately:

```tsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);
  });
  // DOM is updated here
  console.log(document.getElementById('counter')?.textContent);
}
```

## Concurrent Features

React 19 can prepare multiple versions of the UI simultaneously. Concurrent features let React:
- Interrupt rendering to handle urgent updates
- Render in the background without blocking the main thread
- Show stale content while fresh content loads

### useTransition

Mark a state update as non-urgent:

```tsx
function TabContainer() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab); // non-urgent: can be interrupted by typing, clicking, etc.
    });
  }

  return (
    <div>
      <TabBar selected={tab} onSelect={selectTab} />
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        <TabContent tab={tab} />
      </div>
    </div>
  );
}
```

### useDeferredValue

Defer re-rendering of a value:

```tsx
function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  // React renders immediately with old deferredQuery, then re-renders with new one
  const results = useMemo(() => search(deferredQuery), [deferredQuery]);

  return <ResultList results={results} />;
}
```

### Suspense

Suspense enables streaming and lazy rendering:

```tsx
function Page() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <SlowContent /> {/* Renders when ready; shows Skeleton until then */}
      </Suspense>
    </div>
  );
}
```

## Render Optimization Strategies

### 1. Move State Down

Keep state in the lowest component that needs it:

```tsx
// BAD: Entire page re-renders on every keystroke
function Page() {
  const [search, setSearch] = useState('');
  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <ExpensiveList />  {/* Re-renders unnecessarily */}
    </div>
  );
}

// GOOD: Only SearchBar re-renders
function SearchBar() {
  const [search, setSearch] = useState('');
  return <input value={search} onChange={e => setSearch(e.target.value)} />;
}

function Page() {
  return (
    <div>
      <SearchBar />
      <ExpensiveList />
    </div>
  );
}
```

### 2. Lift Content Up (Children Pattern)

```tsx
function ScrollTracker({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div>
      <ScrollIndicator y={scrollY} />
      {children}  {/* children does not re-render when scrollY changes */}
    </div>
  );
}
```

### 3. React.memo

```tsx
const MemoizedList = React.memo(function List({ items }: { items: Item[] }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});
```

### 4. useMemo for Expensive Derived Data

```tsx
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

## React DevTools Profiler

The Profiler helps identify unnecessary re-renders:

1. Open React DevTools > Profiler tab
2. Enable "Record why each component rendered" in settings
3. Record an interaction
4. Review which components re-rendered and why

### Common "Why Did You Render" Reasons

- **Props changed**: Parent created a new object/array/function reference
- **Parent rendered**: Parent re-rendered and child is not memoized
- **Context changed**: A context value the component consumes changed
- **State changed**: The component's own state updated

## Strict Mode Behavior

In development, `<StrictMode>` causes:
- Components to render twice (to detect impure renders)
- Effects to run setup+cleanup+setup (to detect missing cleanup)
- Deprecated API warnings

This does not happen in production builds.

## Common Pitfalls

- Creating new object/array/function references in render and passing them to memoized children.
- Using index as key for dynamic lists.
- Premature optimization: adding `React.memo` everywhere before profiling.
- Confusing "render" (calling the function) with "DOM update" (committing changes). React may call your component but skip the DOM update if nothing changed.
- Expecting `setState` to be synchronous (it schedules a re-render).
