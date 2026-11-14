import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Textarea } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * `Textarea` lets users enter longer text, which may span several lines. Use
 * `Input` for a single line of text instead.
 *
 * Inside a `Field`, it is linked to its `Label`.
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
