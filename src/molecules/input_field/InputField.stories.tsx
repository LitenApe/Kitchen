import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputField } from '.';

/**
 * `InputField` is a ready-made text input with a label and an error message,
 * built from `BaseField`, `Input` and `Label`.
 *
 * Set the text of the label with `label`. Every other prop, such as `value`,
 * `onChange` or `postfix`, is passed on to the input, which also receives the
 * `ref`. Use `as` to render another input component in place of `Input`.
 * Like `Input`, that component has to take its props from the field through
 * `useField`. When `error` is set, the message is shown after the input, and
 * the input is marked as invalid and described by it.
 */
const meta = {
  title: 'Molecule/InputField',
  component: InputField,
  parameters: {
    docs: {
      subtitle: 'A text input with a label and an error message',
    },
  },
  argTypes: {
    as: {
      control: false,
      table: { defaultValue: { summary: 'Input' } },
    },
    ref: {
      control: false,
      table: { type: { summary: 'Ref<HTMLInputElement>' } },
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'field label',
    error: '',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Fill in this field',
  },
  // axe checks the story once `play` has finished, so this waits for the
  // message, which the `Alert` holds back after it mounts
  play: async ({ canvas }) => {
    await canvas.findByText('Fill in this field');
  },
};
