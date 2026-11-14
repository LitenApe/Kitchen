import type { Meta, StoryObj } from '@storybook/react-vite';

import { BaseField } from '.';
import { Input } from '../../atoms/input';
import { Label } from '../../atoms/label';

/**
 * `BaseField` is a `Field` which can also show an error message. It is the
 * foundation of `InputField`, `CheckboxField`, `RadioField` and
 * `SelectField`, and can be used directly to build other kinds of fields.
 *
 * When `error` is set, the message is shown after the field's children in an
 * `Alert`, which screen readers announce. The `Alert` is rendered even while
 * there is no error, so screen readers already know about it when a message
 * arrives. The control is also marked as invalid with `aria-invalid`, and
 * described by the message through `aria-describedby`, alongside any
 * descriptions it already has.
 *
 * Unlike the browser's own checks, such as `required`, an error does not stop
 * the form from being submitted. Errors which are only cleared when the form
 * is submitted again, such as the ones a form action returns, therefore never
 * lock the form. It does mean that focus does not move to the field, so move
 * focus to the first invalid field yourself after a failed submit.
 *
 * Set `error` from **Controls** to see the message appear.
 */
const meta = {
  title: 'Molecule/BaseField',
  component: BaseField,
  parameters: {
    docs: {
      subtitle: 'A field which shows an error message',
    },
  },
  argTypes: {
    error: {
      description:
        'An error message to show and announce. Marks the control as invalid.',
      type: 'string',
    },
  },
  render: (args) => (
    <BaseField {...args}>
      <Label>Test Label</Label>
      <Input />
    </BaseField>
  ),
} satisfies Meta<typeof BaseField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: '',
  },
};

export const WithError: Story = {
  args: {
    error: 'Fill in this field',
  },
  // axe checks the story once `play` has finished, so this waits for the
  // message, which the `Alert` holds back after it mounts
  play: async ({ canvas }) => {
    await canvas.findByText('Fill in this field');
  },
};
