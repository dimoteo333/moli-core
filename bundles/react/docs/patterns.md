# React Patterns

Common patterns for building maintainable React applications.

## Custom Hooks

Extract reusable logic into hooks. The most important and versatile pattern.

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}
```

## Compound Components

Components that work together, sharing implicit state. Users compose them freely.

```tsx
interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab components must be used within <Tabs>');
  return ctx;
}

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div role="tablist">{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { activeTab, setActiveTab } = useTabs();
  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const { activeTab } = useTabs();
  if (activeTab !== id) return null;
  return <div role="tabpanel">{children}</div>;
}

// Usage
<Tabs defaultTab="overview">
  <TabList>
    <Tab id="overview">Overview</Tab>
    <Tab id="details">Details</Tab>
  </TabList>
  <TabPanel id="overview"><Overview /></TabPanel>
  <TabPanel id="details"><Details /></TabPanel>
</Tabs>
```

## Controlled vs Uncontrolled Components

### Controlled

Parent owns the state:

```tsx
function Controlled() {
  const [value, setValue] = useState('');
  return <Input value={value} onChange={setValue} />;
}
```

### Uncontrolled

Component owns its own state, optionally notifies parent:

```tsx
function Uncontrolled() {
  return <Input defaultValue="" onCommit={(v) => save(v)} />;
}
```

### Supporting Both (Flexible Pattern)

```tsx
function useControllable<T>(controlledValue: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internal;

  const setValue = useCallback((next: T) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }, [isControlled, onChange]);

  return [value, setValue] as const;
}

function Toggle({ value, defaultValue = false, onChange }: {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const [isOn, setIsOn] = useControllable(value, defaultValue, onChange);
  return <button onClick={() => setIsOn(!isOn)}>{isOn ? 'ON' : 'OFF'}</button>;
}
```

## Render Props

Pass a function as a prop that returns JSX. Useful for sharing behavior while letting the consumer control rendering.

```tsx
interface MousePosition { x: number; y: number; }

function MouseTracker({ render }: { render: (pos: MousePosition) => ReactNode }) {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });

  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {render(pos)}
    </div>
  );
}

// Usage
<MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} />
```

Modern alternative: custom hooks are usually preferred over render props.

```tsx
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}
```

## Higher-Order Components (HOCs)

A function that takes a component and returns an enhanced component. Less common now but still used in some libraries.

```tsx
function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return <Component {...props} />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);
```

**Prefer custom hooks or wrapper components** over HOCs in new code.

## Provider Pattern

Combine context with a provider component to encapsulate related state and logic.

```tsx
interface NotificationContextType {
  notifications: Notification[];
  add: (message: string, type?: 'info' | 'error') => void;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const add = useCallback((message: string, type: 'info' | 'error' = 'info') => {
    const id = crypto.randomUUID();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => dismiss(id), 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, add, dismiss }}>
      {children}
      <NotificationList notifications={notifications} onDismiss={dismiss} />
    </NotificationContext.Provider>
  );
}

function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('Missing NotificationProvider');
  return ctx;
}
```

## Composition with Slots

Use named props for flexible layouts:

```tsx
function Card({ header, footer, children }: {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

<Card
  header={<h2>Title</h2>}
  footer={<Button>Save</Button>}
>
  <p>Card content here</p>
</Card>
```

## Polymorphic Components

Components that render as different HTML elements or other components:

```tsx
type BoxProps<C extends React.ElementType> = {
  as?: C;
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'children'>;

function Box<C extends React.ElementType = 'div'>({ as, children, ...props }: BoxProps<C>) {
  const Component = as || 'div';
  return <Component {...props}>{children}</Component>;
}

// Usage
<Box as="section" id="main">Content</Box>
<Box as="a" href="/about">Link styled as box</Box>
<Box as={Link} to="/about">Router link</Box>
```

## State Machines

For complex UI states with defined transitions:

```tsx
type State = 'idle' | 'loading' | 'success' | 'error';
type Action = { type: 'FETCH' } | { type: 'SUCCESS'; data: Data } | { type: 'ERROR'; error: string } | { type: 'RESET' };

function reducer(state: { status: State; data: Data | null; error: string | null }, action: Action) {
  switch (action.type) {
    case 'FETCH':
      return { status: 'loading' as const, data: null, error: null };
    case 'SUCCESS':
      return { status: 'success' as const, data: action.data, error: null };
    case 'ERROR':
      return { status: 'error' as const, data: null, error: action.error };
    case 'RESET':
      return { status: 'idle' as const, data: null, error: null };
  }
}
```

## Builder / Headless Components

Provide logic and state, let consumers handle rendering entirely:

```tsx
function useSelect<T>(options: T[], config: { getLabel: (item: T) => string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  return {
    isOpen,
    selected,
    highlightedIndex,
    getToggleProps: () => ({
      onClick: () => setIsOpen(o => !o),
      'aria-expanded': isOpen,
    }),
    getOptionProps: (index: number) => ({
      onClick: () => { setSelected(options[index]); setIsOpen(false); },
      'aria-selected': selected === options[index],
      role: 'option' as const,
    }),
    getLabel: (item: T) => config.getLabel(item),
  };
}
```

## Pattern Selection Guide

| Need | Pattern |
|------|---------|
| Reuse logic across components | Custom Hook |
| Flexible layouts with slots | Composition / Children |
| Related components sharing state | Compound Components |
| Global app-wide state/behavior | Provider + Context |
| Configurable rendering | Render Props or Headless Hooks |
| Wrapping with cross-cutting concern | HOC (or wrapper component) |
| Complex state transitions | useReducer / State Machine |
| Supporting controlled + uncontrolled | Controllable Pattern |
