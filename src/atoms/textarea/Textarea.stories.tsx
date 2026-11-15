import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Textarea } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * `Textarea` lets users enter longer text, which may span several lines. Use
 * `Input` for a single line of text instead.
 *
 * `Textarea` renders a `textarea` and passes every prop on to it. Inside a
 * `Field`, it is linked to its `Label`, and also takes the props which the
 * field shares.
 *
 * `Textarea` does not show error messages. To show one, mark the textarea as
 * invalid with `aria-invalid`, and point it to the message with
 * `aria-describedby`. `BaseField` does this for you, and also announces the
 * message.
 */
const meta = {
  title: 'Atom/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      subtitle: 'Lets users enter longer text',
    },
  },
  argTypes: {
    rows: {
      description: 'The number of lines of text which are visible at once.',
      type: 'number',
      table: { type: { summary: 'number' } },
    },
    onChange: {
      description: 'Called whenever the value changes.',
      table: {
        type: { summary: '(event: ChangeEvent<HTMLTextAreaElement>) => void' },
      },
    },
    id: {
      description:
        'The id of the textarea. Inside a `Field`, set it on the field instead, so that the label keeps pointing to the textarea.',
      control: false,
      table: { type: { summary: 'string' } },
    },
    'aria-invalid': {
      description:
        'Marks the textarea as invalid. Describe it with the error message through `aria-describedby`.',
      type: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    'aria-describedby': {
      description:
        'The ids of the elements which describe the textarea, such as its error message. Combined with the ids which a surrounding `Field` shares.',
      control: false,
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    onChange: fn(),
  },
  render: (args) => (
    <Field>
      <Label>Textarea label</Label>
      <Textarea {...args} />
    </Field>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
