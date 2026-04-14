# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

Built on [Radix UI Accordion](https://www.radix-ui.com/primitives/docs/components/accordion).

## Installation

```bash
npx shadcn@latest add accordion
```

## Import

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
```

## Basic Usage (Single)

Only one item open at a time:

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match your theme.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It's animated by default, but you can disable it.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Multiple Items Open

Allow multiple items to be open simultaneously:

```tsx
<Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Section 3</AccordionTrigger>
    <AccordionContent>Content 3</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Default Open Item

```tsx
{/* Single mode */}
<Accordion type="single" collapsible defaultValue="item-2">
  ...
</Accordion>

{/* Multiple mode */}
<Accordion type="multiple" defaultValue={["item-1", "item-3"]}>
  ...
</Accordion>
```

## Controlled

```tsx
function ControlledAccordion() {
  const [value, setValue] = React.useState<string | undefined>("item-1")

  return (
    <Accordion type="single" collapsible value={value} onValueChange={setValue}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## Collapsible

In `type="single"` mode, the `collapsible` prop allows all items to be closed. Without it, one item must always be open:

```tsx
{/* Can close all items */}
<Accordion type="single" collapsible>...</Accordion>

{/* One item must always remain open */}
<Accordion type="single">...</Accordion>
```

## Disabled Item

```tsx
<AccordionItem value="disabled-item" disabled>
  <AccordionTrigger>Disabled Section</AccordionTrigger>
  <AccordionContent>This cannot be opened.</AccordionContent>
</AccordionItem>
```

## FAQ Pattern

```tsx
const faqs = [
  { question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, and PayPal." },
  { question: "How long does shipping take?", answer: "Standard shipping takes 5-7 business days." },
  { question: "Can I return my order?", answer: "Yes, within 30 days of purchase." },
]

<Accordion type="single" collapsible className="w-full">
  {faqs.map((faq, index) => (
    <AccordionItem key={index} value={`item-${index}`}>
      <AccordionTrigger>{faq.question}</AccordionTrigger>
      <AccordionContent>{faq.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
```

## TypeScript Props

```typescript
// Single mode
interface AccordionSingleProps {
  type: "single"
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
  collapsible?: boolean
  disabled?: boolean
}

// Multiple mode
interface AccordionMultipleProps {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onValueChange?(value: string[]): void
  disabled?: boolean
}
```

## Accessibility

- Enter/Space toggles the focused item.
- Arrow keys navigate between triggers.
- Home/End jump to the first/last trigger.
- Triggers use `aria-expanded` and `aria-controls` to indicate state.
- Content regions use `role="region"` with `aria-labelledby`.
