import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * A checkbox lets users turn a single option on or off, or pick any number of
 * options from a list.
 *
 * Inside a `Field`, `Checkbox` is linked to its `Label`, so clicking the label
 * toggles the checkbox.
 *
 * `Checkbox` does not show error messages. To show one, mark the checkbox as
 * invalid with `aria-invalid`, and point it to the message with
 * `aria-describedby`. `CheckboxField` does this for you, and also announces
 * the message.
 */
const meta = {
  title: 'Atom/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      subtitle: 'Lets users turn an option on or off',
    },
  },
  render: (args) => (
    <Field>
      <Checkbox {...args} />
      <Label>Checkbox label</Label>
    </Field>
  ),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
