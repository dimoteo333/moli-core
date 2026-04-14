# React Server Components

React Server Components (RSC) run on the server and send rendered output to the client. They can access server-side resources (databases, file system, environment variables) directly without API endpoints.

## Overview

React 19 introduces two types of components:

- **Server Components** (default in RSC-enabled frameworks): Run on the server only. Cannot use state, effects, or browser APIs.
- **Client Components** (marked with `'use client'`): Run on the client (and may also pre-render on the server). Can use hooks, event handlers, and browser APIs.

## Server Components

Server Components are the default in frameworks like Next.js App Router. They:

- Execute on the server at request time or build time
- Can directly `await` async operations
- Can access databases, file systems, and secrets
- Send only the rendered output to the client (no component JavaScript)
- Cannot use `useState`, `useEffect`, `useRef`, or other client hooks
- Cannot use event handlers (`onClick`, `onChange`, etc.)
- Cannot use browser APIs (`window`, `document`, `localStorage`)

```tsx
// app/users/page.tsx — Server Component (default)
import { db } from '@/lib/db';

async function UsersPage() {
  const users = await db.users.findMany();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} — {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersPage;
```

### Async Server Components

Server Components can be async functions:

```tsx
async function ProductDetails({ id }: { id: string }) {
  const product = await fetch(`https://api.example.com/products/${id}`).then(r => r.json());
  const reviews = await fetch(`https://api.example.com/products/${id}/reviews`).then(r => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <ReviewList reviews={reviews} />
    </div>
  );
}
```

### Parallel Data Fetching

```tsx
async function Dashboard() {
  const [users, orders, revenue] = await Promise.all([
    fetchUsers(),
    fetchOrders(),
    fetchRevenue(),
  ]);

  return (
    <div>
      <UserStats count={users.length} />
      <OrderTable orders={orders} />
      <RevenueChart data={revenue} />
    </div>
  );
}
```

## Client Components

Mark a file as a Client Component with `'use client'` at the top:

```tsx
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}

export default Counter;
```

### When to Use Client Components

- Interactive UI (clicks, form input, hover, drag)
- State management (`useState`, `useReducer`)
- Effects and subscriptions (`useEffect`)
- Browser APIs (`window`, `localStorage`, `IntersectionObserver`)
- Custom hooks that use any of the above

## Composition: Server + Client

Server Components can render Client Components. Client Components cannot import Server Components directly, but can receive them as `children` or other `ReactNode` props.

```tsx
// ServerLayout.tsx — Server Component
import ClientSidebar from './ClientSidebar';

async function ServerLayout() {
  const navItems = await db.navItems.findMany();

  return (
    <div className="layout">
      <ClientSidebar items={navItems}>
        {/* Server Component passed as children to Client Component */}
        <ServerContent />
      </ClientSidebar>
    </div>
  );
}
```

```tsx
// ClientSidebar.tsx — Client Component
'use client';

import { useState } from 'react';

function ClientSidebar({ items, children }: { items: NavItem[]; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="sidebar-layout">
      <nav className={isOpen ? 'open' : 'closed'}>
        <button onClick={() => setIsOpen(o => !o)}>Toggle</button>
        {items.map(item => <a key={item.id} href={item.href}>{item.label}</a>)}
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default ClientSidebar;
```

## Server Actions ('use server')

Server Actions are async functions that run on the server, callable from Client Components via form actions or direct invocation.

### Defining Server Actions

```tsx
// actions.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createTodo(formData: FormData) {
  const text = formData.get('text') as string;
  if (!text?.trim()) throw new Error('Text is required');

  await db.todos.create({ data: { text, completed: false } });
  revalidatePath('/todos');
}

export async function toggleTodo(id: string) {
  const todo = await db.todos.findUnique({ where: { id } });
  if (!todo) throw new Error('Todo not found');

  await db.todos.update({
    where: { id },
    data: { completed: !todo.completed },
  });
  revalidatePath('/todos');
}

export async function deleteTodo(id: string) {
  await db.todos.delete({ where: { id } });
  revalidatePath('/todos');
}
```

### Using Server Actions in Forms

```tsx
// TodoForm.tsx — Client Component
'use client';

import { createTodo } from './actions';
import { useActionState } from 'react';

function TodoForm() {
  async function handleAction(prevState: { error?: string }, formData: FormData) {
    try {
      await createTodo(formData);
      return { error: undefined };
    } catch (err) {
      return { error: (err as Error).message };
    }
  }

  const [state, action, isPending] = useActionState(handleAction, {});

  return (
    <form action={action}>
      <input name="text" placeholder="New todo..." required />
      <button disabled={isPending}>{isPending ? 'Adding...' : 'Add'}</button>
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

### Calling Server Actions Directly

```tsx
'use client';

import { toggleTodo, deleteTodo } from './actions';

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}
```

### Server Actions with Validation

```tsx
'use server';

import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const parsed = CreateUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  await db.users.create({ data: parsed.data });
  revalidatePath('/users');
  return { errors: null };
}
```

## Serialization Boundary

Props passed from Server to Client Components must be serializable:

**Allowed**: strings, numbers, booleans, null, arrays, plain objects, Date, Map, Set, FormData, typed arrays, Server Actions (functions marked `'use server'`).

**Not allowed**: functions (except Server Actions), class instances, DOM nodes, symbols.

```tsx
// OK — serializable props
<ClientComponent
  name="Alice"
  count={42}
  items={['a', 'b']}
  onSubmit={serverAction}  // Server Action is serializable
/>

// NOT OK — regular function is not serializable
<ClientComponent onClick={() => console.log('click')} />  // Error
```

## Streaming and Suspense

Server Components support streaming with Suspense:

```tsx
async function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />  {/* Async server component — streams when ready */}
      </Suspense>
      <Suspense fallback={<ChartSkeleton />}>
        <RevenueChart />
      </Suspense>
    </div>
  );
}
```

## Common Pitfalls

- Importing a Client Component hook (`useState`) in a Server Component — add `'use client'` directive.
- Passing non-serializable props (functions, class instances) from Server to Client Components.
- Trying to import a Server Component inside a Client Component — pass as `children` instead.
- Forgetting to `revalidatePath` or `revalidateTag` after a mutation in a Server Action.
- Using `'use server'` at the function level inside a Client Component file — it must be in a separate file or at the top of a file containing only server functions.
- Accessing request-specific data (cookies, headers) outside of a Server Component or Server Action.
