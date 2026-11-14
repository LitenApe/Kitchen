import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '.';

/**
 * A label gives a form control its accessible name. Clicking it also focuses
 * the control, or toggles it in the case of a checkbox or radio.
 *
 * Inside a `Field`, `Label` is linked to the field's control automatically,
 * by setting its `htmlFor` to the field's `id`. An explicit `htmlFor` takes
 * precedence.
 */
const meta = {
  title: 'Atom/Label',
  component: Label,
  parameters: {
    docs: {
      subtitle: 'Names a form control',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "I'm a label",
  },
};
