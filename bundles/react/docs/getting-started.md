# Getting Started with React

## Installation

### Create a New Project

**Vite (recommended):**

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

**Next.js (full-stack framework):**

```bash
npx create-next-app@latest my-app --typescript --app
cd my-app
npm run dev
```

### Add React to an Existing Project

```bash
npm install react react-dom
npm install -D @types/react @types/react-dom  # TypeScript types
```

## Project Structure (Vite)

```
my-app/
  index.html
  src/
    main.tsx          # Entry point
    App.tsx           # Root component
    App.css
    vite-env.d.ts
  package.json
  tsconfig.json
  vite.config.ts
```

## Entry Point

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

`createRoot` is the React 18+ API. `StrictMode` enables extra development checks (effects run twice, deprecated API warnings).

## JSX Basics

JSX is a syntax extension that lets you write HTML-like markup in JavaScript. It compiles to `React.createElement` calls (handled automatically by your bundler).

### Expressions in JSX

Use curly braces `{}` to embed JavaScript expressions:

```tsx
const name = 'World';
const element = <h1>Hello, {name}</h1>;
const computed = <p>{2 + 2}</p>;
const conditional = <p>{isAdmin ? 'Admin' : 'User'}</p>;
```

### JSX Rules

1. **Return a single root element.** Use `<>...</>` (Fragment) to group without extra DOM nodes.
2. **Close all tags.** `<img />`, `<br />`, `<input />`.
3. **Use camelCase for attributes.** `className` not `class`, `htmlFor` not `for`, `onClick` not `onclick`.
4. **Style is an object.** `style={{ color: 'red', fontSize: 14 }}`.

```tsx
function Profile() {
  return (
    <>
      <h1 className="title">Profile</h1>
      <img src="/avatar.png" alt="Avatar" />
      <p style={{ color: 'gray', marginTop: 8 }}>Welcome back</p>
    </>
  );
}
```

### JSX vs HTML Differences

| HTML | JSX |
|------|-----|
| `class` | `className` |
| `for` | `htmlFor` |
| `tabindex` | `tabIndex` |
| `onclick` | `onClick` |
| `style="color: red"` | `style={{ color: 'red' }}` |
| `<!-- comment -->` | `{/* comment */}` |
| `checked` (boolean) | `checked={true}` |

### Rendering Lists

```tsx
const items = ['Apple', 'Banana', 'Cherry'];

function FruitList() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```

### Conditional Rendering

```tsx
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return isLoggedIn ? <Dashboard /> : <LoginPage />;
}

// Render nothing
function MaybeAlert({ message }: { message?: string }) {
  if (!message) return null;
  return <div className="alert">{message}</div>;
}
```

## Your First Component

```tsx
// src/App.tsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter App</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default App;
```

## Importing and Exporting Components

```tsx
// Button.tsx — default export
export default function Button({ label }: { label: string }) {
  return <button>{label}</button>;
}

// utils.tsx — named exports
export function formatDate(d: Date) { return d.toLocaleDateString(); }
export function formatCurrency(n: number) { return `$${n.toFixed(2)}`; }

// App.tsx — importing
import Button from './Button';              // default
import { formatDate, formatCurrency } from './utils';  // named
```

## TypeScript Configuration

Recommended `tsconfig.json` for React:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

The `"jsx": "react-jsx"` setting enables the automatic JSX transform (no need to `import React` in every file).

## Development Tools

- **React DevTools**: Browser extension for inspecting component trees, props, state, and profiling.
- **StrictMode**: Wrap your app to enable extra warnings and double-invocations in development.
- **ESLint**: Use `eslint-plugin-react-hooks` to enforce Rules of Hooks and exhaustive deps.

```bash
npm install -D eslint eslint-plugin-react-hooks
```

## Common Pitfalls for Beginners

- Forgetting that state updates are asynchronous and batched.
- Mutating state directly instead of creating new objects/arrays.
- Missing `key` prop when rendering lists.
- Using `class` instead of `className`.
- Not handling the loading and error states when fetching data.
- Infinite loops from calling `setState` inside `useEffect` without proper dependencies.
