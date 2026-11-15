import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckboxField } from '.';

/**
 * `CheckboxField` is a ready-made checkbox with a label and an error message,
 * built from `BaseField`, `Checkbox` and `Label`.
 *
 * Set the text of the label with `label`. Every other prop, such as
 * `checked` or `onChange`, is passed on to the checkbox, which also receives
 * the `ref`. When `error` is set, the message is shown after the label, and
 * the checkbox is marked as invalid and described by it.
 */
const meta = {
  title: 'Molecule/CheckboxField',
  component: CheckboxField,
  parameters: {
    docs: {
      subtitle: 'A checkbox with a label and an error message',
    },
  },
  argTypes: {
    ref: {
      description: 'Passed on to the checkbox.',
      control: false,
      table: { type: { summary: 'Ref<HTMLInputElement>' } },
    },
  },
} satisfies Meta<typeof CheckboxField>;

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
    error: 'Check this box to continue',
  },
  // axe checks the story once `play` has finished, so this waits for the
  // message, which the `Alert` holds back after it mounts
  play: async ({ canvas }) => {
    await canvas.findByText('Check this box to continue');
  },
};
