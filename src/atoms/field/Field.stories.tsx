import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field } from '.';
import { Input } from '../input';
import { Label } from '../label';

/**
 * `Field` groups a form control with its label. It shares an `id`, which it
 * generates unless it is given one, with the components inside it:
 *
 * - `Label` uses the `id` for its `htmlFor`
 * - `Input`, `Textarea`, `Checkbox`, `Radio` and `Select` use it as their
 *   `id`, and also take every other prop passed to the field, such as
 *   `disabled` or `onChange`
 *
 * This links a label to its control without wiring up ids by hand. Props set
 * directly on the control take precedence over the ones shared by the field,
 * unless they are `undefined`, so set the `id` on the field rather than on
 * the control, or the label no longer points to it. `aria-describedby` is the
 * exception: the field's and the control's are combined, so that a
 * description shared by the field, such as an error message, is never lost.
 *
 * Give each control a field of its own, as every control inside a field gets
 * the same `id`. A control only takes props from its closest field, so a
 * field inside another one hides the outer field's props from the controls
 * inside it.
 *
 * `Field` does not render an element of its own. Use `BaseField` when you also
 * want an error message to be shown.
 */
const meta = {
  title: 'Atom/Field',
  component: Field,
  parameters: {
    docs: {
      subtitle: 'Links a label to its form control',
    },
  },
  argTypes: {
    children: { control: false },
    id: {
      description:
        'The id to give the control, which the label points to. Generated when not set.',
      control: false,
      table: { type: { summary: 'string' } },
    },
  },
  render: (args) => (
    <Field {...args}>
      <Label>label</Label>
      <Input />
    </Field>
  ),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
