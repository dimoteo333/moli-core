# Testing React Components

## Setup

### Vitest + React Testing Library (Recommended)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

```ts
// vite.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
});
```

```ts
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
```

### Jest + React Testing Library

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

## Rendering Components

```tsx
import { render, screen } from '@testing-library/react';

test('renders greeting', () => {
  render(<Greeting name="Alice" />);
  expect(screen.getByText('Hello, Alice')).toBeInTheDocument();
});
```

### Rendering with Providers

```tsx
function renderWithProviders(ui: React.ReactElement, options?: { user?: User }) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider initialUser={options?.user}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );

  return render(ui, { wrapper: Wrapper });
}

test('shows user name', () => {
  renderWithProviders(<UserMenu />, { user: { name: 'Alice' } });
  expect(screen.getByText('Alice')).toBeInTheDocument();
});
```

## Queries

Queries find elements in the rendered output. Prefer queries by role, label, or text (how users see the page).

### Priority Order (Most to Least Preferred)

1. `getByRole` — accessible role (button, heading, textbox)
2. `getByLabelText` — form inputs by label
3. `getByPlaceholderText` — fallback for inputs
4. `getByText` — non-interactive elements by text content
5. `getByDisplayValue` — inputs by current value
6. `getByAltText` — images by alt text
7. `getByTitle` — elements with title attribute
8. `getByTestId` — last resort, `data-testid` attribute

### Query Variants

| Prefix | 0 matches | 1 match | 1+ matches | Async |
|--------|-----------|---------|------------|-------|
| `getBy` | throw | return | throw | No |
| `queryBy` | null | return | throw | No |
| `findBy` | throw | return | throw | Yes |
| `getAllBy` | throw | array | array | No |
| `queryAllBy` | [] | array | array | No |
| `findAllBy` | throw | array | array | Yes |

### Examples

```tsx
// By role
screen.getByRole('button', { name: 'Submit' });
screen.getByRole('heading', { level: 2 });
screen.getByRole('textbox', { name: 'Email' });
screen.getByRole('checkbox', { checked: true });
screen.getByRole('tab', { selected: true });

// By label (for form elements)
screen.getByLabelText('Email address');

// By text
screen.getByText('Welcome back');
screen.getByText(/welcome/i);  // regex, case-insensitive

// By test ID (last resort)
screen.getByTestId('custom-element');

// Check absence
expect(screen.queryByText('Error')).not.toBeInTheDocument();
```

## User Events

Use `@testing-library/user-event` for realistic user interactions:

```tsx
import userEvent from '@testing-library/user-event';

test('increments counter on click', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  const button = screen.getByRole('button', { name: 'Increment' });
  await user.click(button);

  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

test('types into input', async () => {
  const user = userEvent.setup();
  render(<SearchBar />);

  const input = screen.getByRole('textbox');
  await user.type(input, 'hello world');

  expect(input).toHaveValue('hello world');
});

test('selects from dropdown', async () => {
  const user = userEvent.setup();
  render(<Select options={['Red', 'Blue', 'Green']} />);

  await user.selectOptions(screen.getByRole('combobox'), 'Blue');
  expect(screen.getByRole('combobox')).toHaveValue('Blue');
});

test('toggles checkbox', async () => {
  const user = userEvent.setup();
  render(<Preferences />);

  const checkbox = screen.getByRole('checkbox', { name: 'Enable notifications' });
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('clears and types', async () => {
  const user = userEvent.setup();
  render(<Input defaultValue="old" />);

  const input = screen.getByRole('textbox');
  await user.clear(input);
  await user.type(input, 'new');
  expect(input).toHaveValue('new');
});

test('keyboard interaction', async () => {
  const user = userEvent.setup();
  render(<Modal />);

  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

## Async Testing

### Waiting for Elements

```tsx
test('loads user data', async () => {
  render(<UserProfile userId="1" />);

  // findBy waits for element to appear
  const name = await screen.findByText('Alice');
  expect(name).toBeInTheDocument();
});
```

### waitFor

```tsx
import { waitFor } from '@testing-library/react';

test('submits form and shows success', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  await user.type(screen.getByLabelText('Name'), 'Alice');
  await user.click(screen.getByRole('button', { name: 'Submit' }));

  await waitFor(() => {
    expect(screen.getByText('Message sent!')).toBeInTheDocument();
  });
});
```

### waitForElementToBeRemoved

```tsx
test('loading spinner disappears', async () => {
  render(<DataLoader />);

  await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'));
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});
```

## Mocking

### Mocking API Calls

```tsx
// With vi.fn (Vitest)
import * as api from './api';

vi.mock('./api');

test('displays fetched users', async () => {
  vi.mocked(api.fetchUsers).mockResolvedValue([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ]);

  render(<UserList />);

  expect(await screen.findByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('Bob')).toBeInTheDocument();
});
```

### MSW (Mock Service Worker)

Intercept network requests at the network level:

```tsx
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ]);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and displays users', async () => {
  render(<UserList />);
  expect(await screen.findByText('Alice')).toBeInTheDocument();
});

test('handles error', async () => {
  server.use(
    http.get('/api/users', () => {
      return HttpResponse.json({ error: 'Server error' }, { status: 500 });
    }),
  );

  render(<UserList />);
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});
```

### Mocking Modules

```tsx
// Mock a component
vi.mock('./HeavyChart', () => ({
  default: () => <div data-testid="chart-mock">Chart</div>,
}));

// Mock a hook
vi.mock('./useAuth', () => ({
  useAuth: () => ({ user: { name: 'Alice' }, isAuthenticated: true }),
}));
```

## Testing Custom Hooks

```tsx
import { renderHook, act } from '@testing-library/react';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter(0));

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});

test('useDebounce delays value', async () => {
  vi.useFakeTimers();
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 300),
    { initialProps: { value: 'initial' } }
  );

  expect(result.current).toBe('initial');

  rerender({ value: 'updated' });
  expect(result.current).toBe('initial'); // not yet

  act(() => { vi.advanceTimersByTime(300); });
  expect(result.current).toBe('updated');

  vi.useRealTimers();
});
```

## Testing Forms

```tsx
test('validates required fields', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<RegistrationForm onSubmit={onSubmit} />);

  await user.click(screen.getByRole('button', { name: 'Register' }));

  expect(await screen.findByText('Name is required')).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

test('submits valid form', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<RegistrationForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText('Name'), 'Alice');
  await user.type(screen.getByLabelText('Email'), 'alice@example.com');
  await user.click(screen.getByRole('button', { name: 'Register' }));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Alice', email: 'alice@example.com' });
  });
});
```

## Snapshot Testing

Use sparingly, primarily for small components with stable output:

```tsx
test('renders badge', () => {
  const { container } = render(<Badge variant="success">Active</Badge>);
  expect(container.firstChild).toMatchSnapshot();
});
```

## Accessibility Testing

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('form has no accessibility violations', async () => {
  const { container } = render(<LoginForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Common Pitfalls

- Using `getByTestId` when a more semantic query exists (role, label, text).
- Not using `await` with `user.click()` and other user-event methods.
- Using `fireEvent` instead of `userEvent` — userEvent simulates real browser behavior more accurately.
- Testing implementation details (state values, instance methods) instead of what the user sees.
- Not wrapping state updates in `act()` when testing outside of RTL's built-in wrappers.
- Over-using snapshots — they break often and add little value for complex components.
