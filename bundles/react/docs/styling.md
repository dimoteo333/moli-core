# Styling in React

## Inline Styles

Pass a JavaScript object to the `style` prop. Property names are camelCase.

```tsx
function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 'bold',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
```

### Dynamic Styles

```tsx
function ProgressBar({ percent }: { percent: number }) {
  return (
    <div style={{ width: '100%', height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 }}>
      <div
        style={{
          width: `${Math.min(100, Math.max(0, percent))}%`,
          height: '100%',
          backgroundColor: percent >= 100 ? '#4caf50' : '#2196f3',
          borderRadius: 4,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}
```

### Typing Inline Styles

```tsx
const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
};
```

### When to Use Inline Styles

- Truly dynamic values (computed at runtime from props/state)
- Simple one-off styles
- Avoid for pseudo-classes, media queries, keyframes (not supported inline)

## CSS Modules

Scoped CSS files that generate unique class names at build time. Supported by Vite, Next.js, and Create React App.

```css
/* Button.module.css */
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.primary {
  background-color: #2196f3;
  color: white;
}

.secondary {
  background-color: transparent;
  color: #2196f3;
  border: 1px solid #2196f3;
}

.button:hover {
  opacity: 0.9;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```tsx
import styles from './Button.module.css';

function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    />
  );
}
```

### TypeScript with CSS Modules

Create a declaration file for type safety:

```tsx
// src/css-modules.d.ts
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

## className Patterns

### Conditional Classes

```tsx
// Manual concatenation
<div className={`card ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`} />

// Filter pattern
<div className={['card', isActive && 'active', isDisabled && 'disabled'].filter(Boolean).join(' ')} />
```

### clsx / classnames Library

```tsx
import clsx from 'clsx';

function Button({ variant, size, isLoading, className }: ButtonProps) {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        { 'btn-loading': isLoading },
        className
      )}
    />
  );
}
```

## Tailwind CSS

Utility-first CSS framework. The most popular styling approach in the React ecosystem.

### Setup with Vite

```bash
npm install -D tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

```css
/* src/index.css */
@import "tailwindcss";
```

### Usage

```tsx
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
```

### Conditional Classes with Tailwind

```tsx
function Button({ variant, disabled }: { variant: 'primary' | 'outline'; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'rounded-md px-4 py-2 text-sm font-medium transition-colors',
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'border border-gray-300 text-gray-700 hover:bg-gray-50': variant === 'outline',
          'cursor-not-allowed opacity-50': disabled,
        }
      )}
    />
  );
}
```

### tailwind-merge

Resolves conflicting Tailwind classes:

```tsx
import { twMerge } from 'tailwind-merge';

function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge('rounded-md bg-blue-600 px-4 py-2 text-white', className)}
      {...props}
    />
  );
}

// className="bg-red-600" correctly overrides bg-blue-600
<Button className="bg-red-600">Danger</Button>
```

### cva (Class Variance Authority)

Define component variants with Tailwind:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={twMerge(buttonVariants({ variant, size }), className)} {...props} />;
}
```

## CSS-in-JS

### styled-components

```tsx
import styled from 'styled-components';

const Card = styled.div<{ $elevated?: boolean }>`
  padding: 16px;
  border-radius: 8px;
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: ${props => props.$elevated ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'};

  &:hover {
    border-color: #2196f3;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

function ProductCard({ product }: { product: Product }) {
  return (
    <Card $elevated>
      <Title>{product.name}</Title>
      <p>{product.description}</p>
    </Card>
  );
}
```

### Emotion

```tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const cardStyle = css`
  padding: 16px;
  border-radius: 8px;
  background: white;
`;

function Card({ children }: { children: React.ReactNode }) {
  return <div css={cardStyle}>{children}</div>;
}
```

## CSS Custom Properties (Variables)

Combine CSS variables with React for theming:

```tsx
function ThemeProvider({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  const style = {
    '--color-primary': theme.primary,
    '--color-secondary': theme.secondary,
    '--font-size-base': `${theme.fontSize}px`,
    '--spacing-unit': `${theme.spacing}px`,
  } as React.CSSProperties;

  return <div style={style}>{children}</div>;
}
```

```css
/* components.css */
.button {
  background-color: var(--color-primary);
  font-size: var(--font-size-base);
  padding: var(--spacing-unit);
}
```

## Global Styles

```tsx
// Import in entry point
import './globals.css';

// Or use CSS reset
import 'modern-normalize';
```

## Styling Approach Comparison

| Approach | Scoping | SSR | Bundle | Dynamic | Learning Curve |
|----------|---------|-----|--------|---------|----------------|
| CSS Modules | File-scoped | Yes | Small | Limited | Low |
| Tailwind | Utility classes | Yes | Small | Via className | Medium |
| styled-components | Component-scoped | Yes (needs setup) | Larger | Full JS | Medium |
| Inline styles | Element-scoped | Yes | Zero | Full JS | Low |

## Common Pitfalls

- Using `class` instead of `className` in JSX.
- Inline styles cannot handle pseudo-classes (`:hover`, `:focus`) or media queries.
- CSS-in-JS libraries add runtime overhead. Consider static extraction or Tailwind for performance-critical apps.
- CSS Modules class names are objects — use `styles.className`, not string literals.
- Tailwind class conflicts when merging — use `tailwind-merge`.
- Forgetting that `style` expects an object with camelCase keys and string/number values.
