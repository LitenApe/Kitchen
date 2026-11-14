import type { Meta, StoryObj } from '@storybook/react-vite';

import { SelectField } from '.';

/**
 * `SelectField` is a ready-made select with a label and an error message,
 * built from `BaseField`, `Select`, `Option` and `Label`.
 *
 * Set the text of the label with `label`, and list the choices in `options`
 * as `{ label, value }` objects, which may also include other props for their
 * option. An entry can also be a component, for example one which renders an
 * `OptionGroup`. Every other prop, such as `value` or `onChange`, is passed on
 * to the select, which also receives the `ref`. When `error` is set, the
 * message is shown after the select, and the select is marked as invalid and
 * described by it.
 */
const meta = {
  title: 'Molecule/SelectField',
  component: SelectField,
  parameters: {
    docs: {
      subtitle: 'A select with a label and an error message',
    },
  },
  argTypes: {
    label: {
      description: 'The text of the label.',
      type: 'string',
    },
    options: {
      description:
        'The choices, as `{ label, value }` objects or components which render options.',
    },
    error: {
      description:
        'An error message to show and announce. Marks the select as invalid.',
      type: 'string',
    },
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose a camera manufacturer',
    error: '',
    options: [
      { label: 'Fujifilm', value: 'fujifilm' },
      { label: 'Canon', value: 'canon' },
      { label: 'Nikon', value: 'nikon' },
    ],
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Choose one of the manufacturers',
  },
  // axe checks the story once `play` has finished, so this waits for the
  // message, which the `Alert` holds back after it mounts
  play: async ({ canvas }) => {
    await canvas.findByText('Choose one of the manufacturers');
  },
};
