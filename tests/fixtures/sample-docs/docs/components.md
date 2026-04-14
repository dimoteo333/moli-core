# React Components

Components are the building blocks of a React application. They let you split the UI into independent, reusable pieces.

## Function Components

The simplest way to define a component is to write a JavaScript function:

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

## Props

Props are the way you pass data from a parent component to a child component.

```jsx
function UserCard({ name, email, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

// Usage
<UserCard name="Alice" email="alice@example.com" avatar="/alice.jpg" />
```

### Default Props

You can specify default values for props:

```jsx
function Button({ variant = 'primary', size = 'md', children }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
}
```

## Children

The `children` prop lets you pass elements as children to a component:

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
<Card title="Welcome">
  <p>This is the card content.</p>
</Card>
```

## Composition vs Inheritance

React recommends using composition instead of inheritance to reuse code between components.

```jsx
function Dialog({ title, children }) {
  return (
    <div className="dialog">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <Dialog title="Are you sure?">
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </Dialog>
  );
}
```
