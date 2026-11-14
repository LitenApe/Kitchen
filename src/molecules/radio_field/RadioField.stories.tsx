import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioField } from '.';

/**
 * `RadioField` is a ready-made group of radios with a legend and an error
 * message, built from `BaseField`, `RadioGroup`, `Legend`, `Radio` and
 * `Label`.
 *
 * `label` becomes the legend of the group, and `options` lists the choices
 * as `{ label, value }` objects, which may also include other props for their
 * radio. Every radio shares the same `name`, and `required` makes choosing
 * one of them mandatory, which screen readers announce for the group as a
 * whole. When `error` is set, the message is shown after the group, and the
 * group is marked as invalid and described by it.
 */
const meta = {
  title: 'Molecule/RadioField',
  component: RadioField,
  parameters: {
    docs: {
      subtitle: 'A group of radios with a legend and an error message',
    },
  },
  argTypes: {
    label: {
      description: 'The legend of the group.',
      type: 'string',
    },
    name: {
      description: 'The name shared by every radio in the group.',
      type: 'string',
    },
    options: {
      description:
        'The choices, as `{ label, value }` objects which may include other radio props.',
    },
    required: {
      description: 'Whether one of the options has to be chosen.',
      type: 'boolean',
    },
    error: {
      description:
        'An error message to show after the group. Marks the group as invalid.',
      type: 'string',
    },
  },
} satisfies Meta<typeof RadioField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'os',
    label: 'Preferred Operating System',
    error: '',
    options: [
      { label: 'Linux', value: 'linux' },
      { label: 'Windows', value: 'windows' },
      { label: 'MacOS', value: 'macos' },
    ],
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Choose an operating system',
  },
  // axe checks the story once `play` has finished, so this waits for the
  // message, which the `Alert` holds back after it mounts
  play: async ({ canvas }) => {
    await canvas.findByText('Choose an operating system');
  },
};
