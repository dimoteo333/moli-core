# Error Handling in React

## Error Boundaries

Error boundaries are React components that catch JavaScript errors in their child component tree during rendering, lifecycle methods, and constructors. They display a fallback UI instead of crashing the entire app.

### Implementing an Error Boundary

Error boundaries must be class components (no hook equivalent exists):

```tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo.componentStack);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div role="alert">
          <h2>Something went wrong</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Usage

```tsx
function App() {
  return (
    <ErrorBoundary fallback={<p>The app crashed. Please refresh.</p>}>
      <Header />
      <ErrorBoundary fallback={<p>Failed to load content.</p>}>
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}
```

### Resettable Error Boundary

Allow users to retry after an error:

```tsx
interface ResettableErrorBoundaryProps {
  children: ReactNode;
  fallback: (props: { error: Error; reset: () => void }) => ReactNode;
}

class ResettableErrorBoundary extends Component<
  ResettableErrorBoundaryProps,
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback({ error: this.state.error, reset: this.reset });
    }
    return this.props.children;
  }
}

// Usage
<ResettableErrorBoundary
  fallback={({ error, reset }) => (
    <div role="alert">
      <p>Error: {error.message}</p>
      <button onClick={reset}>Try Again</button>
    </div>
  )}
>
  <Dashboard />
</ResettableErrorBoundary>
```

### react-error-boundary Library

The `react-error-boundary` package provides a ready-made solution:

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => { /* reset app state */ }}
  resetKeys={[userId]}  // auto-reset when userId changes
>
  <UserProfile userId={userId} />
</ErrorBoundary>
```

## What Error Boundaries Do NOT Catch

Error boundaries do not catch errors in:

- Event handlers (use try/catch)
- Asynchronous code (setTimeout, fetch, promises)
- Server-side rendering
- Errors thrown in the error boundary itself

## Event Handler Errors

Use standard try/catch in event handlers:

```tsx
function DeleteButton({ itemId }: { itemId: string }) {
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setError(null);
    try {
      await deleteItem(itemId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
}
```

## Async Error Handling

### Fetch with Error States

```tsx
function useAsync<T>(asyncFn: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{
    data: T | null;
    error: Error | null;
    loading: boolean;
  }>({ data: null, error: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, error: null, loading: true });

    asyncFn()
      .then(data => { if (!cancelled) setState({ data, error: null, loading: false }); })
      .catch(error => { if (!cancelled) setState({ data: null, error, loading: false }); });

    return () => { cancelled = true; };
  }, deps);

  return state;
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const { data: user, error, loading } = useAsync(() => fetchUser(userId), [userId]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <Profile user={user!} />;
}
```

### Error Handling with Server Actions (React 19)

```tsx
async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await saveData(formData);
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

function Form() {
  const [state, action, isPending] = useActionState(submitForm, {
    success: false,
    error: null,
  });

  return (
    <form action={action}>
      <input name="name" required />
      {state.error && <p role="alert" className="error">{state.error}</p>}
      {state.success && <p className="success">Saved!</p>}
      <button disabled={isPending}>Save</button>
    </form>
  );
}
```

## Global Error Handling

### Unhandled Promise Rejections

```tsx
useEffect(() => {
  function handleUnhandledRejection(event: PromiseRejectionEvent) {
    console.error('Unhandled rejection:', event.reason);
    reportError(event.reason);
  }

  window.addEventListener('unhandledrejection', handleUnhandledRejection);
  return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
}, []);
```

### Window Error Handler

```tsx
useEffect(() => {
  function handleError(event: ErrorEvent) {
    console.error('Global error:', event.error);
    reportError(event.error);
  }

  window.addEventListener('error', handleError);
  return () => window.removeEventListener('error', handleError);
}, []);
```

## Error Reporting Pattern

```tsx
function ErrorMessage({ error, retry }: { error: Error; retry?: () => void }) {
  return (
    <div role="alert" className="error-container">
      <h3>An error occurred</h3>
      <p>{error.message}</p>
      {retry && <button onClick={retry}>Retry</button>}
    </div>
  );
}
```

## Error Boundary Placement Strategy

- **App level**: Catches catastrophic errors with a full-page fallback.
- **Route level**: Each page/route gets its own boundary so one page crash does not break others.
- **Feature level**: Individual widgets/features can fail independently.
- **Granular**: Individual data-fetching components wrapped for resilience.

```tsx
function App() {
  return (
    <ErrorBoundary fallback={<AppCrashPage />}>
      <Layout>
        <ErrorBoundary fallback={<SidebarError />}>
          <Sidebar />
        </ErrorBoundary>
        <ErrorBoundary fallback={<ContentError />}>
          <Suspense fallback={<ContentSkeleton />}>
            <MainContent />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  );
}
```

## Common Pitfalls

- Wrapping only the top of the app — a single crash takes down everything. Use multiple boundaries.
- Showing raw error messages to users in production — sanitize and provide user-friendly messages.
- Not logging errors — always report to an error tracking service in `componentDidCatch`.
- Forgetting that error boundaries are class components — there is no hook equivalent.
- Not providing a way to recover (reset the boundary or navigate away).
