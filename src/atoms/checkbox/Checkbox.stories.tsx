import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * A checkbox lets users turn a single option on or off, or pick any number of
 * options from a list.
 *
 * `Checkbox` renders an `input` of type `checkbox`, and passes every prop on
 * to it. Inside a `Field`, it is linked to its `Label`, so clicking the label
 * toggles the checkbox, and it also takes the props which the field shares.
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
  argTypes: {
    id: {
      description:
        'The id of the checkbox. Inside a `Field`, set it on the field instead, so that the label keeps pointing to the checkbox.',
      control: false,
      table: { type: { summary: 'string' } },
    },
    'aria-invalid': {
      description:
        'Marks the checkbox as invalid. Describe it with the error message through `aria-describedby`.',
      type: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    'aria-describedby': {
      description:
        'The ids of the elements which describe the checkbox, such as its error message. Combined with the ids which a surrounding `Field` shares.',
      control: false,
      table: { type: { summary: 'string' } },
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
