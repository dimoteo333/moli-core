# Lists and Keys in React

## Rendering Lists

Use `Array.map()` to transform data arrays into element arrays:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} — {user.email}
        </li>
      ))}
    </ul>
  );
}
```

## The key Prop

Keys help React identify which items have changed, been added, or been removed. They must be unique among siblings.

### Good Keys

```tsx
// Database ID — best choice
<li key={item.id}>{item.name}</li>

// UUID or stable unique identifier
<li key={item.uuid}>{item.name}</li>

// Composite key from multiple fields
<li key={`${item.category}-${item.slug}`}>{item.name}</li>
```

### Bad Keys

```tsx
// Index — breaks on reorder, insert, or delete
{items.map((item, index) => (
  <li key={index}>{item.name}</li>  // Avoid for dynamic lists
))}

// Random value — different on every render, forces remount
<li key={Math.random()}>{item.name}</li>  // Never do this

// Non-unique values
<li key={item.category}>{item.name}</li>  // Not unique if categories repeat
```

### When Index Keys Are Acceptable

- The list is static and never reordered
- Items have no state or uncontrolled inputs
- Items are never inserted or deleted from the middle

## Filtering Lists

```tsx
function FilteredTodoList({ todos }: { todos: Todo[] }) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
          </li>
        ))}
      </ul>
      {filteredTodos.length === 0 && <p>No items to display.</p>}
    </div>
  );
}
```

## Sorting Lists

Sort derived data, not the original state:

```tsx
function SortableTable({ data }: { data: Row[] }) {
  const [sortKey, setSortKey] = useState<keyof Row>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  function handleSort(key: keyof Row) {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name {sortKey === 'name' && (sortDir === 'asc' ? '↑' : '↓')}</th>
          <th onClick={() => handleSort('date')}>Date {sortKey === 'date' && (sortDir === 'asc' ? '↑' : '↓')}</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## Grouping Lists

```tsx
function GroupedList({ items }: { items: Item[] }) {
  const grouped = useMemo(() => {
    const groups = new Map<string, Item[]>();
    for (const item of items) {
      const group = groups.get(item.category) ?? [];
      group.push(item);
      groups.set(item.category, group);
    }
    return groups;
  }, [items]);

  return (
    <div>
      {Array.from(grouped.entries()).map(([category, categoryItems]) => (
        <section key={category}>
          <h2>{category}</h2>
          <ul>
            {categoryItems.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```

## Dynamic Lists (Add / Remove / Reorder)

```tsx
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  function addTodo() {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: crypto.randomUUID(), text: input, completed: false }]);
    setInput('');
  }

  function removeTodo(id: string) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  function toggleTodo(id: string) {
    setTodos(prev =>
      prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  }

  function moveTodo(id: string, direction: 'up' | 'down') {
    setTodos(prev => {
      const index = prev.findIndex(t => t.id === id);
      if (index === -1) return prev;
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  }

  return (
    <div>
      <div>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()} />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span>{todo.text}</span>
            <button onClick={() => moveTodo(todo.id, 'up')}>Up</button>
            <button onClick={() => moveTodo(todo.id, 'down')}>Down</button>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Rendering Multiple Elements per Item

Use `Fragment` with key:

```tsx
import { Fragment } from 'react';

function DefinitionList({ terms }: { terms: { term: string; definition: string }[] }) {
  return (
    <dl>
      {terms.map(item => (
        <Fragment key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.definition}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

## Empty State

Always handle the case where the list is empty:

```tsx
function UserList({ users }: { users: User[] }) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found.</p>
        <button onClick={onInvite}>Invite a user</button>
      </div>
    );
  }

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

## Pagination

```tsx
function PaginatedList({ items, pageSize = 10 }: { items: Item[]; pageSize?: number }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / pageSize);
  const pageItems = items.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div>
      <ul>
        {pageItems.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      <div>
        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
```

## Infinite Scroll

```tsx
function InfiniteList() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(p => p + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    fetchItems(page).then(newItems => {
      if (newItems.length === 0) setHasMore(false);
      else setItems(prev => [...prev, ...newItems]);
    });
  }, [page]);

  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      {hasMore && <div ref={observerRef}>Loading more...</div>}
    </div>
  );
}
```

## Common Pitfalls

- Using array index as key for lists that change (insert, delete, reorder). This causes incorrect state mapping and subtle bugs.
- Forgetting the key prop entirely (React warns but falls back to index).
- Placing the key on the wrong element. Key must go on the outermost element returned in the `.map()` callback, not a child element inside it.
- Duplicating keys (React warns, and behavior is undefined for duplicates).
- Mutating the array with `.sort()` or `.reverse()` instead of creating a copy (`[...arr].sort()`).
- Not handling empty lists gracefully.
