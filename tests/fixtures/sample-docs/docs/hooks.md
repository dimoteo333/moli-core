# React Hooks

Hooks let you use state and other React features in function components.

## useState

`useState` is a Hook that lets you add a state variable to your component.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Rules

- Only call Hooks at the top level of your component
- Don't call Hooks inside loops, conditions, or nested functions
- Only call Hooks from React function components or custom Hooks

## useEffect

`useEffect` lets you synchronize a component with an external system.

```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p>Elapsed: {seconds}s</p>;
}
```

### Dependencies

The dependency array controls when the effect runs:
- `[]` - runs only on mount
- `[dep1, dep2]` - runs when dependencies change
- no array - runs after every render

## useContext

`useContext` lets you read and subscribe to context from your component.

```jsx
import { useContext, createContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
```

## Custom Hooks

You can create your own Hooks to reuse stateful logic between components.

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```
