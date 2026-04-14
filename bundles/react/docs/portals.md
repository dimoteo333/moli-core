# React Portals

Portals render children into a DOM node that exists outside the parent component's DOM hierarchy, while preserving React's event bubbling and context.

## createPortal

```tsx
import { createPortal } from 'react-dom';

function Portal({ children }: { children: React.ReactNode }) {
  return createPortal(children, document.body);
}
```

### Syntax

```tsx
createPortal(children, domNode, key?)
```

- `children` — Any valid React node (JSX, string, fragment, array)
- `domNode` — The target DOM node to render into
- `key` — Optional unique key for the portal

## Modal Dialog

The most common portal use case:

```tsx
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          background: 'white',
          borderRadius: 8,
          padding: 24,
          maxWidth: 500,
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close">X</button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
```

### Usage

```tsx
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm">
        <p>Are you sure you want to proceed?</p>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button onClick={handleConfirm}>Confirm</button>
      </Modal>
    </div>
  );
}
```

## Tooltip

```tsx
interface TooltipProps {
  content: string;
  anchorRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
}

function Tooltip({ content, anchorRef, isVisible }: TooltipProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isVisible || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 8 + window.scrollY,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  }, [isVisible, anchorRef]);

  if (!isVisible) return null;

  return createPortal(
    <div
      role="tooltip"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transform: 'translateX(-50%)',
        background: '#333',
        color: 'white',
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 12,
        whiteSpace: 'nowrap',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {content}
    </div>,
    document.body
  );
}

// Usage
function WithTooltip({ text, tooltip }: { text: string; tooltip: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {text}
      </span>
      <Tooltip content={tooltip} anchorRef={ref} isVisible={show} />
    </>
  );
}
```

## Dropdown Menu

```tsx
function Dropdown({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={() => setIsOpen(o => !o)}>
        {trigger}
      </div>
      {isOpen && createPortal(
        <div
          ref={menuRef}
          role="menu"
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            minWidth: 160,
          }}
        >
          {children}
        </div>,
        document.body
      )}
    </>
  );
}

function DropdownItem({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      style={{
        display: 'block', width: '100%', padding: '8px 12px',
        border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
```

### Usage

```tsx
<Dropdown trigger={<button>Options</button>}>
  <DropdownItem onClick={() => edit()}>Edit</DropdownItem>
  <DropdownItem onClick={() => duplicate()}>Duplicate</DropdownItem>
  <DropdownItem onClick={() => remove()}>Delete</DropdownItem>
</Dropdown>
```

## Toast / Notification Container

```tsx
const TOAST_ROOT_ID = 'toast-root';

function ensureToastRoot() {
  let root = document.getElementById(TOAST_ROOT_ID);
  if (!root) {
    root = document.createElement('div');
    root.id = TOAST_ROOT_ID;
    root.style.cssText = 'position:fixed;top:16px;right:16px;z-index:9999;display:flex;flex-direction:column;gap:8px;';
    document.body.appendChild(root);
  }
  return root;
}

function ToastContainer({ toasts, onDismiss }: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return createPortal(
    <>
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`} role="alert">
          <span>{toast.message}</span>
          <button onClick={() => onDismiss(toast.id)} aria-label="Dismiss">X</button>
        </div>
      ))}
    </>,
    ensureToastRoot()
  );
}
```

## Event Bubbling Through Portals

Events from portals bubble through the React tree (not the DOM tree). This means a click inside a portal will bubble to React ancestors, even though the portal is rendered in a different DOM subtree.

```tsx
function Parent() {
  return (
    <div onClick={() => console.log('Parent clicked — even from portal!')}>
      <ChildWithPortal />
    </div>
  );
}

function ChildWithPortal() {
  return createPortal(
    <button onClick={() => console.log('Portal button clicked')}>
      Click in portal
    </button>,
    document.body
  );
  // Clicking this button logs both "Portal button clicked" AND "Parent clicked"
}
```

Context also works across portals — a portal can `useContext` from a provider above it in the React tree.

## Custom Portal Target

Render into a specific container element:

```tsx
function App() {
  return (
    <div>
      <main>
        <Content />
      </main>
      <div id="overlay-root" />
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  const container = document.getElementById('overlay-root');
  if (!container) return null;
  return createPortal(children, container);
}
```

## Common Pitfalls

- Forgetting that portal events bubble through the React tree, not the DOM tree. A `stopPropagation()` in a portal stops propagation in the React tree.
- Not cleaning up portal container nodes created dynamically.
- Not handling SSR — `document.body` is not available during server rendering. Guard with `typeof document !== 'undefined'` or use `useEffect` to set the target.
- Accessibility issues: modals need focus trapping, `aria-modal`, and `role="dialog"`. Tooltips need `role="tooltip"` and proper `aria-describedby`.
- Z-index conflicts when multiple portals overlap. Use a consistent z-index scale.
- Forgetting to prevent body scroll when showing fullscreen overlays like modals.
