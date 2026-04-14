# Refs in React

Refs provide a way to access DOM nodes or persist mutable values across renders without causing re-renders.

## useRef

```tsx
const ref = useRef<T>(initialValue);
// ref.current — mutable, persists across renders, does not trigger re-render
```

### DOM Refs

Access underlying DOM elements for imperative operations:

```tsx
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.focus();
    inputRef.current?.select();
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus & Select</button>
    </>
  );
}
```

### Common DOM Operations

```tsx
// Scrolling
const listRef = useRef<HTMLDivElement>(null);
listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

// Measuring
const rect = ref.current?.getBoundingClientRect();

// Media playback
const videoRef = useRef<HTMLVideoElement>(null);
videoRef.current?.play();
videoRef.current?.pause();

// Canvas
const canvasRef = useRef<HTMLCanvasElement>(null);
const ctx = canvasRef.current?.getContext('2d');
```

### Mutable Values (Non-DOM)

Store values that should not trigger re-renders:

```tsx
function Timer() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [count, setCount] = useState(0);

  function start() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => setCount(c => c + 1), 1000);
  }

  function stop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => stop, []); // cleanup on unmount
  return (
    <>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
```

### Storing Previous Values

```tsx
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <p>Now: {count}, Before: {prevCount}</p>;
}
```

## Callback Refs

A function ref is called with the DOM node when it mounts and `null` when it unmounts. Use when you need to react to a ref being set or for dynamic lists of refs.

```tsx
function MeasuredBox() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <div ref={measuredRef}>Content that determines height</div>
      <p>Height: {height}px</p>
    </>
  );
}
```

### Refs for Dynamic Lists

```tsx
function ScrollableList({ items }: { items: Item[] }) {
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

  function scrollToItem(id: string) {
    itemRefs.current.get(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          ref={(node) => {
            if (node) itemRefs.current.set(item.id, node);
            else itemRefs.current.delete(item.id);
          }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}
```

## forwardRef

Lets a component expose a DOM node (or custom handle) to a parent via ref.

```tsx
import { forwardRef } from 'react';

interface InputProps {
  label: string;
  type?: string;
}

const LabeledInput = forwardRef<HTMLInputElement, InputProps>(
  function LabeledInput({ label, type = 'text' }, ref) {
    const id = useId();
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} ref={ref} />
      </div>
    );
  }
);

// Usage
function Form() {
  const emailRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <LabeledInput ref={emailRef} label="Email" type="email" />
      <button onClick={() => emailRef.current?.focus()}>Focus Email</button>
    </>
  );
}
```

**React 19 note**: In React 19, `ref` is available as a regular prop on function components. `forwardRef` is no longer strictly required but remains supported:

```tsx
// React 19 — ref as prop
function LabeledInput({ label, ref }: { label: string; ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} placeholder={label} />;
}
```

## useImperativeHandle

Customizes the value exposed via ref. Use with `forwardRef` to restrict or extend the imperative API.

```tsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, { src: string }>(
  function VideoPlayer({ src }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play() { videoRef.current?.play(); },
      pause() { videoRef.current?.pause(); },
      seek(time: number) {
        if (videoRef.current) videoRef.current.currentTime = time;
      },
    }), []);

    return <video ref={videoRef} src={src} />;
  }
);

// Usage — parent only sees play/pause/seek, not the full HTMLVideoElement
function App() {
  const playerRef = useRef<VideoPlayerHandle>(null);
  return (
    <>
      <VideoPlayer ref={playerRef} src="/video.mp4" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.seek(0)}>Restart</button>
    </>
  );
}
```

## Ref Patterns

### Combining Refs

When you need to attach multiple refs to one element:

```tsx
function useMergedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return useCallback((node: T | null) => {
    refs.forEach(ref => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    });
  }, refs);
}

// Usage
const MyInput = forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  const localRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRefs(localRef, forwardedRef);
  return <input ref={mergedRef} {...props} />;
});
```

### Lazy Initialization

```tsx
function useRefWithInit<T>(init: () => T) {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref as React.MutableRefObject<T>;
}

const workerRef = useRefWithInit(() => new Worker('/worker.js'));
```

## Common Pitfalls

- **Reading refs during render**: `ref.current` is not available during the first render for DOM refs. Access it in effects or event handlers.
- **Using refs instead of state**: If changing a value should cause a re-render, use state, not a ref.
- **Overusing imperative patterns**: Prefer declarative props over imperative ref calls. Use refs for focus, scroll, measure, and third-party integrations.
- **Forgetting null checks**: DOM refs start as `null`. Always use optional chaining (`ref.current?.method()`) or null guards.
- **Mutating ref.current in render**: Avoid side effects during render. Mutate refs in effects or event handlers.
