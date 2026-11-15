import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Input } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * `Input` lets users enter a single line of text. It renders an `input` with
 * `type="text"` by default, and passes every other prop on to it. Use
 * `Textarea` for longer text instead. Inside a `Field`, it is linked to its
 * `Label`, and also takes the props which the field shares.
 *
 * A `prefix` or `postfix`, such as a currency symbol or a unit, can be shown
 * before or after the input, in which case the two are wrapped in a `div`.
 * The affix is linked to the input through `aria-describedby`, so screen
 * readers read it together with the input. Only one of the two can be used at
 * a time.
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
      description: 'The type of input, such as `email` or `number`.',
      options: [
        'date',
        'datetime-local',
        'email',
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
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'text'" },
      },
    },
    prefix: {
      description:
        'Text or an element shown before the input, such as a currency symbol. Cannot be combined with `postfix`.',
      type: 'string',
      table: { type: { summary: 'string | ReactElement' } },
    },
    postfix: {
      description:
        'Text or an element shown after the input, such as a unit. Cannot be combined with `prefix`.',
      type: 'string',
      table: { type: { summary: 'string | ReactElement' } },
    },
    onChange: {
      description: 'Called whenever the value changes.',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    id: {
      description:
        'The id of the input. Inside a `Field`, set it on the field instead, so that the label keeps pointing to the input.',
      control: false,
      table: { type: { summary: 'string' } },
    },
    'aria-invalid': {
      description:
        'Marks the input as invalid. Describe it with the error message through `aria-describedby`.',
      type: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    'aria-describedby': {
      description:
        'The ids of the elements which describe the input, such as its error message. Combined with the ids which a surrounding `Field` shares, and with the prefix or postfix.',
      control: false,
      table: { type: { summary: 'string' } },
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
