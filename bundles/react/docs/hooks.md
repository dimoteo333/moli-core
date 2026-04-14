# React Hooks Reference

Hooks let you use state and other React features in function components. All hooks follow the Rules of Hooks: call them at the top level of your component or custom hook, never inside loops, conditions, or nested functions.

## useState

```tsx
const [state, setState] = useState<T>(initialState);
```

Returns a stateful value and a setter function. The setter triggers a re-render with the new value.

### Basic Usage

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Functional Updates

When new state depends on previous state, pass a function to avoid stale closure bugs:

```tsx
setState(prev => prev + 1);

// Batched updates — both increments apply correctly
function handleDoubleIncrement() {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}
```

### Lazy Initialization

Pass a function to compute the initial state only once (not on every render):

```tsx
const [rows, setRows] = useState(() => parseCSV(rawData));
```

### Replacing Object State

`setState` replaces the value entirely. For objects, spread previous state:

```tsx
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prev => ({ ...prev, name: 'Alice' }));
```

### Common Pitfalls

- Calling `setState` with the same value (by reference equality) skips re-render.
- State updates are batched in React 19 — all `setState` calls within an event handler result in a single re-render.
- Do not mutate state directly: `state.push(item)` will not trigger a re-render.

---

## useEffect

```tsx
useEffect(() => {
  // setup
  return () => { /* cleanup */ };
}, [dependencies]);
```

Runs side effects after render. The dependency array controls when the effect re-runs.

### Dependency Array Behavior

```tsx
useEffect(() => { /* runs after every render */ });
useEffect(() => { /* runs once on mount */ }, []);
useEffect(() => { /* runs when a or b change */ }, [a, b]);
```

### Cleanup

Cleanup runs before the effect re-executes and when the component unmounts:

```tsx
useEffect(() => {
  const id = setInterval(() => tick(), 1000);
  return () => clearInterval(id);
}, []);
```

### Data Fetching

```tsx
useEffect(() => {
  let cancelled = false;
  async function load() {
    const res = await fetch(`/api/user/${id}`);
    const data = await res.json();
    if (!cancelled) setUser(data);
  }
  load();
  return () => { cancelled = true; };
}, [id]);
```

### Common Pitfalls

- Missing dependencies cause stale closures. Include all referenced reactive values.
- Avoid setting state unconditionally inside an effect with no dependency array (infinite loop).
- Effects run twice in Strict Mode during development to surface bugs.

---

## useContext

```tsx
const value = useContext(SomeContext);
```

Reads the current value from the nearest `<SomeContext.Provider>` ancestor. Re-renders the component whenever that value changes.

```tsx
const ThemeContext = createContext<'light' | 'dark'>('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

---

## useReducer

```tsx
const [state, dispatch] = useReducer(reducer, initialArg, init?);
```

An alternative to `useState` for complex state logic. The reducer receives the current state and an action, and returns new state.

```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: action.payload };
  }
}

function Counter({ initialCount }: { initialCount: number }) {
  const [state, dispatch] = useReducer(reducer, { count: initialCount });
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>Reset</button>
    </>
  );
}
```

### Lazy Initialization

```tsx
const [state, dispatch] = useReducer(reducer, initialCount, (n) => ({ count: n }));
```

---

## useRef

```tsx
const ref = useRef<T>(initialValue);
```

Returns a mutable object with a `.current` property that persists across renders without triggering re-renders when changed.

```tsx
// DOM ref
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>Focus</button>
    </>
  );
}

// Storing mutable value
function Timer() {
  const intervalRef = useRef<number | null>(null);
  // ...
}
```

---

## useMemo

```tsx
const memoized = useMemo(() => expensiveComputation(a, b), [a, b]);
```

Caches a computed value between re-renders. Only recomputes when dependencies change.

```tsx
function FilteredList({ items, query }: { items: Item[]; query: string }) {
  const filtered = useMemo(
    () => items.filter(item => item.name.includes(query)),
    [items, query]
  );
  return <ul>{filtered.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}
```

---

## useCallback

```tsx
const fn = useCallback((args) => { /* ... */ }, [deps]);
```

Caches a function reference between re-renders. Equivalent to `useMemo(() => fn, deps)`. Useful when passing callbacks to memoized children.

```tsx
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  return <MemoChild onClick={handleClick} />;
}

const MemoChild = React.memo(function Child({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Click</button>;
});
```

---

## useId

```tsx
const id = useId();
```

Generates a unique ID that is stable across server and client renders. Use for accessibility attributes, not for list keys.

```tsx
function LabeledInput({ label }: { label: string }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}
```

---

## useTransition

```tsx
const [isPending, startTransition] = useTransition();
```

Marks a state update as non-urgent, allowing urgent updates (e.g., typing) to interrupt it.

```tsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);           // urgent: update input
    startTransition(() => {
      setResults(filterLargeList(e.target.value)); // non-urgent
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <ResultList items={results} />}
    </>
  );
}
```

---

## useDeferredValue

```tsx
const deferredValue = useDeferredValue(value);
```

Returns a deferred copy of a value. React will first render with the old value, then re-render in the background with the new value.

```tsx
function Search({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <HeavyResultsList query={deferredQuery} />
    </div>
  );
}
```

---

## useSyncExternalStore

```tsx
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
```

Subscribes to an external store (e.g., a global state library or browser API).

```tsx
function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,
    () => true // server snapshot
  );
}
```

---

## useActionState (React 19)

```tsx
const [state, formAction, isPending] = useActionState(action, initialState);
```

Manages form action state. Works with both client and server actions. Returns the current state, a wrapped action to pass to `<form action={...}>`, and a pending flag.

```tsx
async function submitForm(prevState: { message: string }, formData: FormData) {
  const name = formData.get('name') as string;
  if (!name) return { message: 'Name is required' };
  await saveUser(name);
  return { message: `Saved ${name}` };
}

function UserForm() {
  const [state, action, isPending] = useActionState(submitForm, { message: '' });
  return (
    <form action={action}>
      <input name="name" />
      <button disabled={isPending}>Save</button>
      <p>{state.message}</p>
    </form>
  );
}
```

---

## useFormStatus (React 19)

```tsx
const { pending, data, method, action } = useFormStatus();
```

Reads the status of the parent `<form>`. Must be called from a component rendered inside a `<form>`.

```tsx
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>;
}

function Form() {
  return (
    <form action={serverAction}>
      <input name="email" />
      <SubmitButton />
    </form>
  );
}
```

---

## useOptimistic (React 19)

```tsx
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

Shows an optimistic UI state while an async action is pending, then reverts or confirms.

```tsx
function MessageList({ messages, sendMessage }: Props) {
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (current, newMsg: string) => [...current, { text: newMsg, sending: true }]
  );

  async function handleSend(formData: FormData) {
    const text = formData.get('text') as string;
    addOptimistic(text);
    await sendMessage(text);
  }

  return (
    <>
      {optimisticMessages.map((msg, i) => (
        <div key={i} style={{ opacity: msg.sending ? 0.5 : 1 }}>{msg.text}</div>
      ))}
      <form action={handleSend}>
        <input name="text" />
        <button>Send</button>
      </form>
    </>
  );
}
```

---

## use (React 19)

```tsx
const value = use(resource);
```

Reads a resource (Promise or Context) during render. Unlike other hooks, `use` can be called inside conditionals and loops.

### Reading a Promise

```tsx
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  const user = use(userPromise);  // suspends until resolved
  return <h1>{user.name}</h1>;
}

// Wrap in Suspense
<Suspense fallback={<Spinner />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>
```

### Reading Context Conditionally

```tsx
function StatusIcon({ show }: { show: boolean }) {
  if (!show) return null;
  const theme = use(ThemeContext);  // allowed — unlike useContext, use works in conditionals
  return <Icon color={theme.primary} />;
}
```

---

## Custom Hooks

Extract reusable logic into custom hooks. Name must start with `use`.

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

## Rules of Hooks

1. Only call hooks at the top level (not inside conditions, loops, or nested functions).
2. Only call hooks from React function components or custom hooks.
3. Custom hook names must start with `use`.
4. The `use` hook is an exception to rule 1 -- it can be called conditionally.
