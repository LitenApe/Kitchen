import type { Meta, StoryObj } from '@storybook/react-vite';

import { Legend } from '.';

/**
 * A legend is the caption of a `fieldset`. It gives a group of related form
 * controls, such as the radios in a `RadioGroup`, their accessible name. It
 * must be the first child of the `fieldset` it describes.
 */
const meta = {
  title: 'Atom/Legend',
  component: Legend,
  parameters: {
    docs: {
      subtitle: 'Names a group of form controls',
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
