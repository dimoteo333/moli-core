# Form

Form components built on [react-hook-form](https://react-hook-form.com/) and [Zod](https://zod.dev/) for validation.

The Form component provides a `FormField` wrapper that connects shadcn/ui components to react-hook-form with accessible error handling.

## Installation

```bash
npx shadcn@latest add form
npm install zod
```

## Import

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
```

## Basic Form

```tsx
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Sub-Components

| Component | Purpose |
|-----------|---------|
| `Form` | Wraps the form and provides react-hook-form context |
| `FormField` | Connects a field to the form state (uses Controller internally) |
| `FormItem` | Container for a single field (label, control, description, message) |
| `FormLabel` | Label for the field, auto-colored red on error |
| `FormControl` | Wraps the actual input, applies `aria-*` attributes |
| `FormDescription` | Helper text below the input |
| `FormMessage` | Displays validation error messages |

## Full Example with Multiple Fields

```tsx
const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  bio: z.string().min(10).max(160),
  urls: z.object({
    website: z.string().url().optional().or(z.literal("")),
  }),
})

function SettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      urls: { website: "" },
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateProfile(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself" {...field} />
              </FormControl>
              <FormDescription>Max 160 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  )
}
```

## With Select

```tsx
<FormField
  control={form.control}
  name="language"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Language</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
          <SelectItem value="de">German</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

## With Checkbox

```tsx
<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
      <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>Accept terms and conditions</FormLabel>
        <FormDescription>
          You agree to our Terms of Service and Privacy Policy.
        </FormDescription>
      </div>
    </FormItem>
  )}
/>
```

## Zod Schema Patterns

```typescript
// Common field validations
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.coerce.number().min(18, "Must be 18+"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["admin", "user", "editor"]),
  notifications: z.boolean().default(false),
  date: z.date({ required_error: "Please select a date" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
```

## Accessibility

- `FormControl` automatically applies `aria-describedby` linking the input to its description and error message.
- `FormLabel` automatically applies `htmlFor` via the form field context.
- `FormMessage` uses `aria-live="polite"` to announce errors to screen readers.
- Error states automatically set `aria-invalid="true"` on the control.
