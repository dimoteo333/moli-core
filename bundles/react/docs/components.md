# React Components

Components are the fundamental building blocks of React applications. They accept inputs (props) and return React elements that describe what to render.

## Function Components

The standard way to define components in React 19:

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

// Arrow function variant
const Greeting = ({ name }: { name: string }) => <h1>Hello, {name}</h1>;
```

## Props

### Defining Props with TypeScript

```tsx
interface CardProps {
  title: string;
  subtitle?: string;        // optional
  children: React.ReactNode; // slot for nested elements
  onClose: () => void;
  variant?: 'primary' | 'secondary';
}

function Card({ title, subtitle, children, onClose, variant = 'primary' }: CardProps) {
  return (
    <div className={`card card-${variant}`}>
      <div className="card-header">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        <button onClick={onClose}>X</button>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}
```

### Default Props

Use JavaScript default parameters:

```tsx
function Avatar({ src, size = 48, alt = 'User avatar' }: AvatarProps) {
  return <img src={src} width={size} height={size} alt={alt} />;
}
```

### Spreading Props

Forward remaining props to an underlying element:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  return <button className={`btn btn-${variant} ${className ?? ''}`} {...rest} />;
}
```

### Children

`children` is a special prop for nested content:

```tsx
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

**Multiple slots via named props:**

```tsx
function Page({ header, sidebar, children }: {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="page">
      <div className="page-header">{header}</div>
      <div className="page-body">
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
```

## Conditional Rendering

```tsx
// if/else
function Status({ isOnline }: { isOnline: boolean }) {
  if (isOnline) return <span className="online">Online</span>;
  return <span className="offline">Offline</span>;
}

// Ternary
function Greeting({ user }: { user: User | null }) {
  return <h1>{user ? `Welcome, ${user.name}` : 'Please sign in'}</h1>;
}

// Logical AND (render or nothing)
function Notification({ message }: { message?: string }) {
  return <div>{message && <p className="alert">{message}</p>}</div>;
}

// Early return
function Dashboard({ user }: { user: User | null }) {
  if (!user) return <Navigate to="/login" />;
  return <DashboardContent user={user} />;
}
```

## Composition over Inheritance

React uses composition exclusively. Never use inheritance for component relationships.

### Containment

```tsx
function Dialog({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{title}</h2>
        <div className="dialog-body">{children}</div>
      </div>
    </div>
  );
}

function ConfirmDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Dialog title="Are you sure?">
      <p>This action cannot be undone.</p>
      <button onClick={onConfirm}>Confirm</button>
    </Dialog>
  );
}
```

### Specialization

```tsx
function Button(props: ButtonProps) {
  return <button className="btn" {...props} />;
}

function DangerButton(props: Omit<ButtonProps, 'className'>) {
  return <Button className="btn-danger" {...props} />;
}
```

## Error Boundaries

Error boundaries catch JavaScript errors in their child component tree during rendering, lifecycle methods, and constructors. They must be class components.

```tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}
```

Usage:

```tsx
<ErrorBoundary fallback={<p>Failed to load widget.</p>}>
  <UserWidget />
</ErrorBoundary>
```

## Suspense

Suspense lets you show a fallback while children are loading (via `React.lazy`, data fetching with `use`, or frameworks like Next.js).

```tsx
import { Suspense, lazy } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

### Nested Suspense Boundaries

```tsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<SidebarSkeleton />}>
    <Sidebar />
  </Suspense>
  <Suspense fallback={<ContentSkeleton />}>
    <MainContent />
  </Suspense>
</Suspense>
```

## Lazy Loading

`React.lazy` enables code splitting at the component level:

```tsx
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### Named Exports

`lazy` expects a default export. For named exports, re-export or wrap:

```tsx
const MyComponent = lazy(() =>
  import('./components').then(mod => ({ default: mod.MyComponent }))
);
```

## React.memo

Prevents re-renders when props have not changed (shallow comparison):

```tsx
const ExpensiveList = React.memo(function ExpensiveList({ items }: { items: Item[] }) {
  return <ul>{items.map(item => <li key={item.id}>{item.label}</li>)}</ul>;
});
```

Custom comparison:

```tsx
const Chart = React.memo(
  function Chart({ data }: { data: number[] }) { /* render */ },
  (prevProps, nextProps) => prevProps.data.length === nextProps.data.length
);
```

## Fragment

Group elements without adding a DOM node:

```tsx
function Columns() {
  return (
    <>
      <td>First</td>
      <td>Second</td>
    </>
  );
}

// With key (required in lists)
{items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))}
```

## StrictMode

Helps find bugs during development. Does not render any visible UI. In React 19, effects run twice in dev mode to surface missing cleanups.

```tsx
import { StrictMode } from 'react';

<StrictMode>
  <App />
</StrictMode>
```

## Component Organization Best Practices

- One component per file as a general rule.
- Co-locate sub-components, styles, and tests with the component.
- Keep components small and focused on a single responsibility.
- Extract custom hooks when logic is reused across components.
- Prefer composition (children/slots) over deep prop drilling.
- Use TypeScript interfaces for all public component APIs.
- Default to uncontrolled components unless you need to observe or control values externally.
