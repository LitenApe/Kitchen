import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '.';

/**
 * A label gives a form control its accessible name. Clicking it also focuses
 * the control, or toggles it in the case of a checkbox or radio.
 *
 * `Label` renders a `label` and passes every prop on to it. Inside a `Field`,
 * it is linked to the field's control automatically, by setting its `htmlFor`
 * to the field's `id`. An explicit `htmlFor` takes precedence, unless it is
 * `undefined`. Unlike the control, the label only takes the `id` from the
 * field, and none of its other props.
 */
const meta = {
  title: 'Atom/Label',
  component: Label,
  parameters: {
    docs: {
      subtitle: 'Names a form control',
    },
  },
  argTypes: {
    children: {
      description: 'The text of the label.',
      table: { type: { summary: 'ReactNode' } },
    },
    htmlFor: {
      description:
        "The id of the control to label. Inside a `Field`, it defaults to the id of the field's control.",
      control: false,
      table: { type: { summary: 'string' } },
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
