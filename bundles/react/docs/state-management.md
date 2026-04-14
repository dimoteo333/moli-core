# State Management in React

## Local State with useState

The simplest and most common form of state. Use for data that belongs to a single component.

```tsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);
  return <button onClick={() => setIsOn(prev => !prev)}>{isOn ? 'ON' : 'OFF'}</button>;
}
```

### When to Use useState

- Form inputs, toggles, counters
- UI state (open/closed, selected tab, visibility)
- Data that only one component needs

## Complex State with useReducer

Use when state has multiple sub-values or when the next state depends on the previous one in complex ways.

```tsx
type State = {
  items: Item[];
  filter: string;
  sortBy: 'name' | 'date';
  isLoading: boolean;
};

type Action =
  | { type: 'SET_ITEMS'; payload: Item[] }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SORT'; payload: 'name' | 'date' }
  | { type: 'TOGGLE_LOADING' }
  | { type: 'REMOVE_ITEM'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload, isLoading: false };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'TOGGLE_LOADING':
      return { ...state, isLoading: !state.isLoading };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
  }
}

function ItemManager() {
  const [state, dispatch] = useReducer(reducer, {
    items: [], filter: '', sortBy: 'name', isLoading: false,
  });
  // ...
}
```

### useState vs useReducer

| Criteria | useState | useReducer |
|----------|----------|------------|
| Simple values | Preferred | Overkill |
| Related state transitions | Cumbersome | Clean |
| Complex update logic | Scattered | Centralized |
| Testing state logic | Harder | Easy (pure function) |
| Multiple sub-values | Multiple calls | Single dispatch |

## Lifting State Up

When siblings need to share state, move it to their closest common parent:

```tsx
function Parent() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <Sidebar items={items} selected={selected} onSelect={setSelected} />
      <Detail itemId={selected} />
    </div>
  );
}

function Sidebar({ items, selected, onSelect }: {
  items: Item[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          className={item.id === selected ? 'active' : ''}
          onClick={() => onSelect(item.id)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

## Context API for Global State

Use Context to avoid prop drilling for widely-shared state (theme, auth, locale).

### Creating and Providing Context

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value: AuthContextType = {
    user,
    login: (u) => setUser(u),
    logout: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
```

### Usage

```tsx
// App.tsx
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

// Any nested component
function UserMenu() {
  const { user, logout } = useAuth();
  if (!user) return <LoginButton />;
  return <button onClick={logout}>{user.name} — Log out</button>;
}
```

## Separating State and Dispatch Context

Prevents unnecessary re-renders. Components that only dispatch never re-render when state changes.

```tsx
const TodoStateContext = createContext<TodoState | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<TodoAction> | null>(null);

function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

function useTodoState() {
  const ctx = useContext(TodoStateContext);
  if (!ctx) throw new Error('Missing TodoProvider');
  return ctx;
}

function useTodoDispatch() {
  const ctx = useContext(TodoDispatchContext);
  if (!ctx) throw new Error('Missing TodoProvider');
  return ctx;
}
```

## State Colocation

Keep state as close to where it is used as possible. Only lift or globalize when necessary.

```
Component-local state  →  useState / useReducer
Shared between siblings →  Lift to parent
Subtree-wide            →  Context
App-wide / complex      →  External library (Zustand, Redux, Jotai)
Server state            →  TanStack Query / SWR
URL state               →  Router (search params)
```

## External State Libraries

### Zustand

Lightweight store with hooks:

```tsx
import { create } from 'zustand';

interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set(s => ({ count: s.count + 1 })),
  decrement: () => set(s => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));

function Counter() {
  const { count, increment } = useCounterStore();
  return <button onClick={increment}>{count}</button>;
}
```

### Redux Toolkit

For large applications with complex state:

```tsx
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    set: (state, action: PayloadAction<number>) => { state.value = action.payload; },
  },
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });
type RootState = ReturnType<typeof store.getState>;

function App() {
  return <Provider store={store}><Counter /></Provider>;
}

function Counter() {
  const count = useSelector((s: RootState) => s.counter.value);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(counterSlice.actions.increment())}>{count}</button>;
}
```

## Server State with TanStack Query

For data fetched from APIs. Handles caching, refetching, loading/error states:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

function CreateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newUser: NewUser) =>
      fetch('/api/users', { method: 'POST', body: JSON.stringify(newUser) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  return <button onClick={() => mutation.mutate({ name: 'Alice' })}>Add User</button>;
}
```

## Derived State

Avoid storing values that can be computed from existing state:

```tsx
function FilteredList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState('');
  // Derived — not separate state
  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
  // Use useMemo if filtering is expensive
  const expensiveFiltered = useMemo(() => expensiveFilter(items, query), [items, query]);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{filtered.map(i => <li key={i.id}>{i.name}</li>)}</ul>
    </>
  );
}
```

## Common Pitfalls

- **Duplicating state**: Storing derived values as separate state leads to sync bugs.
- **Over-globalizing**: Not every piece of state needs Context or a global store.
- **Prop drilling fear**: 2-3 levels of props is fine. Use Context for 4+ levels.
- **Missing keys in context providers**: Stacking many providers is normal but consider composition.
- **Stale closures**: When using state in callbacks, use functional updates or refs.
