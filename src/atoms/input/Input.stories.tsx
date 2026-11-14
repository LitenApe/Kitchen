import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Input } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * `Input` lets users enter a single line of text. It renders an `input` with
 * `type="text"` by default. Use `Textarea` for longer text instead. Inside a
 * `Field`, it is linked to its `Label`.
 *
 * A `prefix` or `postfix`, such as a currency symbol or a unit, can be shown
 * before or after the input. It is linked to the input through
 * `aria-describedby`, so screen readers read it together with the input. Only
 * one of the two can be used at a time.
 *
 * `Input` does not show error messages. To show one, mark the input as invalid
 * with `aria-invalid`, and point it to the message with `aria-describedby`.
 * `InputField` does this for you, and also announces the message.
 */
const meta = {
  title: 'Atom/Input',
  component: Input,
  parameters: {
    docs: {
      subtitle: 'Lets users enter text',
    },
  },
  argTypes: {
    type: {
      description: 'The type of input to render. Defaults to `text`.',
      options: [
        'date',
        'datetime-local',
        'email',
        'hidden',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ],
      control: { type: 'select' },
    },
    prefix: {
      description: 'Text or an element shown before the input.',
      type: 'string',
    },
    postfix: {
      description: 'Text or an element shown after the input.',
      type: 'string',
    },
  },
  args: {
    onChange: fn(),
  },
  render: (args) => (
    <Field>
      <Label>Input label</Label>
      <Input {...args} />
    </Field>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
  },
};
