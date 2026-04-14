# Forms in React

React provides controlled and uncontrolled patterns for forms. React 19 introduces native form actions via `<form action={...}>`, `useActionState`, `useFormStatus`, and `useOptimistic`.

## Controlled Components

State drives the input value. Every keystroke triggers `onChange`.

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Log In</button>
    </form>
  );
}
```

## Uncontrolled Components

Use refs to read values on submit. Simpler for forms where you do not need real-time validation.

```tsx
function SearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    search(inputRef.current!.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
      <button type="submit">Search</button>
    </form>
  );
}
```

## Handling Multiple Inputs

Use a single state object keyed by input `name`:

```tsx
function RegistrationForm() {
  const [form, setForm] = useState({ name: '', email: '', role: 'user' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" type="email" value={form.email} onChange={handleChange} />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </form>
  );
}
```

### Checkboxes and Radio Buttons

```tsx
function Preferences() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <form>
      <label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={e => setNotifications(e.target.checked)}
        />
        Enable notifications
      </label>

      <fieldset>
        <legend>Theme</legend>
        <label>
          <input type="radio" name="theme" value="light"
            checked={theme === 'light'} onChange={() => setTheme('light')} />
          Light
        </label>
        <label>
          <input type="radio" name="theme" value="dark"
            checked={theme === 'dark'} onChange={() => setTheme('dark')} />
          Dark
        </label>
      </fieldset>
    </form>
  );
}
```

## Textarea and Select

```tsx
<textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} />

<select value={country} onChange={e => setCountry(e.target.value)}>
  <option value="">Select country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</select>

{/* Multiple select */}
<select multiple value={skills} onChange={e => {
  const selected = Array.from(e.target.selectedOptions, opt => opt.value);
  setSkills(selected);
}}>
  <option value="react">React</option>
  <option value="vue">Vue</option>
  <option value="angular">Angular</option>
</select>
```

## File Inputs

File inputs are always uncontrolled in React:

```tsx
function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/upload', { method: 'POST', body: formData });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} accept="image/*" />
      {file && <p>Selected: {file.name}</p>}
      <button type="submit" disabled={!file}>Upload</button>
    </form>
  );
}
```

## Form Validation

### Inline Validation

```tsx
function SignupForm() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      submitForm({ email });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
      {errors.email && <span id="email-error" role="alert">{errors.email}</span>}
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### Validation on Blur

```tsx
const [touched, setTouched] = useState<Record<string, boolean>>({});

<input
  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
  aria-invalid={touched.email && !!errors.email}
/>
{touched.email && errors.email && <span>{errors.email}</span>}
```

## React 19 Form Actions

### Basic Server Action Form

```tsx
// actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  await db.posts.create({ title, body });
}
```

```tsx
// PostForm.tsx
import { createPost } from './actions';

function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="body" required />
      <button type="submit">Publish</button>
    </form>
  );
}
```

### useActionState

Combines action execution, pending state, and return value:

```tsx
async function addTodo(prevState: { error?: string }, formData: FormData) {
  const text = formData.get('text') as string;
  if (text.length < 3) return { error: 'Too short' };
  await db.todos.create({ text });
  return { error: undefined };
}

function TodoForm() {
  const [state, action, isPending] = useActionState(addTodo, { error: undefined });

  return (
    <form action={action}>
      <input name="text" />
      {state.error && <p className="error">{state.error}</p>}
      <button disabled={isPending}>{isPending ? 'Adding...' : 'Add'}</button>
    </form>
  );
}
```

### useFormStatus

Access pending state from a child of the form:

```tsx
function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending}>{pending ? 'Saving...' : children}</button>;
}
```

### useOptimistic with Forms

```tsx
function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo: string) => [...state, { id: crypto.randomUUID(), text: newTodo, pending: true }]
  );

  async function handleAdd(formData: FormData) {
    const text = formData.get('text') as string;
    addOptimistic(text);
    await createTodo(text);
  }

  return (
    <>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>{todo.text}</li>
        ))}
      </ul>
      <form action={handleAdd}>
        <input name="text" />
        <SubmitButton>Add</SubmitButton>
      </form>
    </>
  );
}
```

## Custom Form Hook

```tsx
function useForm<T extends Record<string, any>>(initial: T) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function reset() { setValues(initial); setErrors({}); }

  function setFieldError(field: keyof T, message: string) {
    setErrors(prev => ({ ...prev, [field]: message }));
  }

  return { values, errors, handleChange, reset, setFieldError, setValues, setErrors };
}
```

## FormData API

Use the native `FormData` API for simpler extraction:

```tsx
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const values = Object.fromEntries(data.entries());
  console.log(values);
}
```

## Accessibility

- Always associate `<label>` with inputs via `htmlFor` / `id` or nesting.
- Use `aria-invalid` and `aria-describedby` for validation messages.
- Use `role="alert"` on error messages so screen readers announce them.
- Provide `aria-required` or the native `required` attribute.
- Group related inputs with `<fieldset>` and `<legend>`.

## Common Pitfalls

- Forgetting `e.preventDefault()` on submit (causes full page reload).
- Using `value` without `onChange` creates a read-only input (React warns).
- Mutating state objects instead of creating new references.
- Not resetting form state after successful submission.
- Using index as key for dynamic form field lists.
