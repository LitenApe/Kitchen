import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field } from '.';
import { Input } from '../input';
import { Label } from '../label';

/**
 * `Field` groups a form control with its label. It generates an `id` and
 * shares it, together with any props passed to the field, with the components
 * inside it:
 *
 * - `Label` uses the `id` for its `htmlFor`
 * - `Input`, `Textarea`, `Checkbox`, `Radio` and `Select` use it as their `id`
 *
 * This links a label to its control without wiring up ids by hand. Props set
 * directly on a component take precedence over the ones shared by the field,
 * so a field-wide prop such as `disabled` or `onChange` can still be overridden
 * for a single control. `aria-describedby` is the exception: the field's and
 * the control's are combined, so that a description shared by the field, such
 * as an error message, is never lost.
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
