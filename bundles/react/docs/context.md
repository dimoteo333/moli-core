# React Context

Context provides a way to pass data through the component tree without prop drilling.

## Creating Context

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Create context with null default
const ThemeContext = createContext<ThemeContextType | null>(null);

// 3. Create a provider component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Create a typed hook with null check
function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

## Using Context

```tsx
// Wrap the tree
function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}

// Consume anywhere in the tree
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

function Card({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <div className={`card card-${theme}`}>
      {children}
    </div>
  );
}
```

## Multiple Contexts

Nest providers for different concerns:

```tsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LocaleProvider>
          <Router />
        </LocaleProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

## Context with useReducer

For complex state managed via context:

```tsx
interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case 'REMOVE_ITEM': {
      const item = state.items.find(i => i.id === action.payload);
      return {
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (item?.price ?? 0),
      };
    }
    case 'CLEAR':
      return { items: [], total: 0 };
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
```

## Avoiding Re-renders

### Problem: All Consumers Re-render

Every component calling `useContext(SomeContext)` re-renders whenever the context value changes, even if the specific field they use did not change.

### Solution 1: Split State and Dispatch Contexts

```tsx
const CartStateContext = createContext<CartState | null>(null);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(null);

function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

function useCartState() {
  const ctx = useContext(CartStateContext);
  if (!ctx) throw new Error('Missing CartProvider');
  return ctx;
}

function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (!ctx) throw new Error('Missing CartProvider');
  return ctx;
}

// AddToCartButton only re-renders when it itself changes, not when cart state changes
function AddToCartButton({ item }: { item: Product }) {
  const dispatch = useCartDispatch();
  return (
    <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}>
      Add to Cart
    </button>
  );
}
```

### Solution 2: Memoize Provider Value

Prevent the provider from creating a new value object on every render:

```tsx
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
```

### Solution 3: Memoize Children

If the provider's parent re-renders for unrelated reasons:

```tsx
function AppWithProviders() {
  const [unrelated, setUnrelated] = useState(0);

  return (
    <ThemeProvider>
      {/* Without memo, all children re-create elements on each render */}
      <MemoizedApp />
    </ThemeProvider>
  );
}

const MemoizedApp = React.memo(App);
```

### Solution 4: Selective Consumption with useSyncExternalStore

For fine-grained subscriptions, consider a store pattern:

```tsx
function useContextSelector<T, S>(context: React.Context<T>, selector: (value: T) => S): S {
  const value = useContext(context);
  return useMemo(() => selector(value), [value, selector]);
}
```

Note: This does not prevent re-renders. For true selector-based subscriptions, use `useSyncExternalStore` or a library like Zustand.

## Context Patterns

### Default Value Factory

```tsx
function createSafeContext<T>(name: string) {
  const Context = createContext<T | null>(null);

  function useContextValue(): T {
    const ctx = useContext(Context);
    if (ctx === null) {
      throw new Error(`use${name} must be used within ${name}Provider`);
    }
    return ctx;
  }

  return [Context.Provider, useContextValue] as const;
}

// Usage
const [AuthProvider, useAuth] = createSafeContext<AuthContextType>('Auth');
```

### Composing Providers

Reduce provider nesting with a utility:

```tsx
function ComposeProviders({ providers, children }: {
  providers: React.FC<{ children: ReactNode }>[];
  children: ReactNode;
}) {
  return providers.reduceRight(
    (child, Provider) => <Provider>{child}</Provider>,
    children
  );
}

function App() {
  return (
    <ComposeProviders providers={[AuthProvider, ThemeProvider, CartProvider]}>
      <Router />
    </ComposeProviders>
  );
}
```

## use Hook with Context (React 19)

The `use` hook can read context and, unlike `useContext`, can be called conditionally:

```tsx
import { use } from 'react';

function StatusIndicator({ showStatus }: { showStatus: boolean }) {
  if (!showStatus) return null;

  // OK with `use` — would be a Rules of Hooks violation with `useContext`
  const { theme } = use(ThemeContext);
  return <div className={`status status-${theme}`} />;
}
```

## When to Use Context

**Good use cases:**
- Theme (light/dark mode)
- Authentication state
- Locale / i18n
- Feature flags
- Toast / notification system

**Avoid for:**
- High-frequency updates (use `useSyncExternalStore` or a state library)
- Data that only a few nearby components need (just pass props)
- Server state (use TanStack Query or SWR)

## Common Pitfalls

- Creating a new object reference on every render as the provider value (causes all consumers to re-render). Use `useMemo`.
- Using context for everything instead of just prop drilling 2-3 levels.
- Putting too much state in a single context (one change re-renders all consumers).
- Forgetting the null check in the custom hook, leading to cryptic errors.
- Not testing components with the required providers.
