# TypeScript with React

## Typing Component Props

```tsx
// Interface (preferred for props)
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

function Button({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

## Children Types

```tsx
// Any renderable content
interface LayoutProps {
  children: React.ReactNode;
}

// Single element only
interface WrapperProps {
  children: React.ReactElement;
}

// Function as children (render prop)
interface DataProps<T> {
  children: (data: T) => React.ReactNode;
}

// String only
interface TitleProps {
  children: string;
}
```

## Event Types

```tsx
function Form() {
  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.clientX, e.clientY);
  };

  // Keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit();
  };

  // Focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {};

  // Drag
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {};

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
```

## Typing Hooks

### useState

```tsx
// Inferred
const [count, setCount] = useState(0);              // number
const [name, setName] = useState('');                // string

// Explicit (needed for complex types or unions)
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<Item[]>([]);
const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
```

### useReducer

```tsx
interface State {
  count: number;
  error: string | null;
}

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_ERROR'; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 };
    case 'DECREMENT': return { ...state, count: state.count - 1 };
    case 'SET_ERROR': return { ...state, error: action.payload };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, error: null });
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET_ERROR', payload: 'Something failed' });
```

### useRef

```tsx
// DOM ref — initialize with null, type the element
const inputRef = useRef<HTMLInputElement>(null);
const divRef = useRef<HTMLDivElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);

// Mutable value ref
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
const countRef = useRef(0);  // inferred as number
```

### useContext

```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

### useMemo and useCallback

```tsx
// Types are inferred from the return value
const sorted = useMemo(() => items.sort((a, b) => a.name.localeCompare(b.name)), [items]);

// Explicit when needed
const handleDelete = useCallback((id: string) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []);
```

## Extending HTML Element Props

```tsx
// Extend button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

function Button({ variant = 'primary', isLoading, children, ...rest }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} disabled={isLoading} {...rest}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
}

// Extend input props
interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (query: string) => void;
}
```

## Generic Components

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
}

function List<T>({ items, renderItem, getKey }: ListProps<T>) {
  return <ul>{items.map(item => <li key={getKey(item)}>{renderItem(item)}</li>)}</ul>;
}

// Usage — T is inferred
<List
  items={users}
  getKey={(user) => user.id}
  renderItem={(user) => <span>{user.name}</span>}
/>
```

### Generic Select Component

```tsx
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel, getValue }: SelectProps<T>) {
  return (
    <select
      value={getValue(value)}
      onChange={e => {
        const selected = options.find(o => getValue(o) === e.target.value);
        if (selected) onChange(selected);
      }}
    >
      {options.map(option => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}
```

## forwardRef with TypeScript

```tsx
interface InputProps {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, ...rest }, ref) {
    const id = useId();
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input id={id} ref={ref} aria-invalid={!!error} {...rest} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);
```

## Discriminated Unions for Props

```tsx
type AlertProps =
  | { variant: 'success'; message: string }
  | { variant: 'error'; message: string; retryAction: () => void }
  | { variant: 'loading' };

function Alert(props: AlertProps) {
  switch (props.variant) {
    case 'success':
      return <div className="alert-success">{props.message}</div>;
    case 'error':
      return (
        <div className="alert-error">
          {props.message}
          <button onClick={props.retryAction}>Retry</button>
        </div>
      );
    case 'loading':
      return <div className="alert-loading"><Spinner /></div>;
  }
}
```

## Utility Types for React

```tsx
// Extract props from a component
type ButtonProps = React.ComponentProps<typeof Button>;
type InputProps = React.ComponentProps<'input'>;

// Props with ref
type DivPropsWithRef = React.ComponentPropsWithRef<'div'>;

// Props without ref
type DivProps = React.ComponentPropsWithoutRef<'div'>;

// CSS properties
const style: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

// HTML attributes
type Attrs = React.HTMLAttributes<HTMLDivElement>;

// Key type
type Key = React.Key;

// Element type
type Element = React.ReactElement;

// Node type (anything renderable)
type Node = React.ReactNode;
```

## Typing Context with No Default

```tsx
// Pattern: use null default + assertion hook
const MyContext = createContext<MyContextType | null>(null);

function useMyContext() {
  const ctx = useContext(MyContext);
  if (ctx === null) {
    throw new Error('useMyContext must be used within MyContextProvider');
  }
  return ctx; // type is MyContextType, not MyContextType | null
}
```

## Type-Safe Event Emitter Hook

```tsx
type EventMap = {
  select: { itemId: string };
  delete: { itemId: string; confirmed: boolean };
  search: { query: string };
};

function useEventHandler<K extends keyof EventMap>(
  event: K,
  handler: (payload: EventMap[K]) => void
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (e: CustomEvent<EventMap[K]>) => handlerRef.current(e.detail);
    window.addEventListener(event, listener as EventListener);
    return () => window.removeEventListener(event, listener as EventListener);
  }, [event]);
}
```

## Common Pitfalls

- Forgetting to type `useState` with `null` union: `useState<User | null>(null)`.
- Using `any` for event handlers instead of specific `React.ChangeEvent<HTMLInputElement>`.
- Not using `as const` with `useState` tuple returns in custom hooks.
- Typing `children` as `JSX.Element` instead of `React.ReactNode` (excludes strings, numbers, null).
- Missing the generic parameter on `forwardRef<ElementType, Props>`.
