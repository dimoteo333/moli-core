# Getting Started with React

React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Installation

To start using React, you can use Create React App or set up a project manually.

```bash
npx create-react-app my-app
cd my-app
npm start
```

## Your First Component

React components are JavaScript functions that return markup:

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return <Welcome name="World" />;
}
```

## JSX Syntax

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file.

- You can put any JavaScript expression inside curly braces `{}`
- JSX elements must have a single root element
- Use `className` instead of `class` for CSS classes

```jsx
function ProductCard({ product }) {
  return (
    <div className="card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span>${product.price}</span>
    </div>
  );
}
```

## Next Steps

- Learn about state management with hooks
- Explore component composition patterns
- Understand the React rendering lifecycle
