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
 *
 * Other props, such as `onChange` or `disabled`, do not reach the radios,
 * because of the problem described under Project Status in the README. Set
 * them on each of the `options` instead.
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
    required: {
      description: 'Whether one of the options has to be chosen.',
      type: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    ref: {
      description: "Attached to the group's `fieldset`.",
      control: false,
      table: { type: { summary: 'Ref<HTMLFieldSetElement>' } },
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
