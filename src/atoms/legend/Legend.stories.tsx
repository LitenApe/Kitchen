import type { Meta, StoryObj } from '@storybook/react-vite';

import { Legend } from '.';

/**
 * A legend is the caption of a `fieldset`. It gives a group of related form
 * controls, such as the radios in a `RadioGroup`, their accessible name. It
 * must be the first child of the `fieldset` it describes.
 *
 * `Legend` renders a `legend` and passes every prop on to it.
 */
const meta = {
  title: 'Atom/Legend',
  component: Legend,
  parameters: {
    docs: {
      subtitle: 'Names a group of form controls',
    },
  },
  argTypes: {
    children: {
      description: 'The text which names the group.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
} satisfies Meta<typeof Legend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "I'm a legend",
  },
};
