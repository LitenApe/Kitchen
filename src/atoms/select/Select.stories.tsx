import type { Meta, StoryObj } from '@storybook/react-vite';

import { Option, OptionGroup, Select } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * A select lets users pick an option, or several with `multiple`, from a
 * list. Add the choices with `Option`, and group related ones under a
 * heading with `OptionGroup`.
 *
 * Inside a `Field`, `Select` is linked to its `Label`.
 *
 * `Select` does not show error messages. To show one, mark the select as
 * invalid with `aria-invalid`, and point it to the message with
 * `aria-describedby`. `SelectField` does this for you, and also announces the
 * message.
 */
const meta = {
  title: 'Atom/Select',
  component: Select,
  parameters: {
    docs: {
      subtitle: 'Lets users pick from a list of options',
    },
  },
  argTypes: {
    multiple: {
      description: 'Lets users pick more than one option.',
      type: 'boolean',
    },
  },
  render: (args) => (
    <Field>
      <Label>Choose a camera manufacturer</Label>
      <Select {...args} />
    </Field>
  ),
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <OptionGroup label="China">
          <Option value="dji">DJI</Option>
        </OptionGroup>
        <OptionGroup label="Denmark">
          <Option value="phase-one">Phase One</Option>
        </OptionGroup>
        <OptionGroup label="Japanese">
          <Option value="fujifilm">Fujifilm</Option>
          <Option value="canon">Canon</Option>
          <Option value="nikon">Nikon</Option>
        </OptionGroup>
        <OptionGroup label="German">
          <Option value="leica">Leica</Option>
        </OptionGroup>
      </>
    ),
  },
};

/**
 * `Option` is a single choice in a `Select`. Its `value` is what the select
 * reports when the option is chosen, and its content is the text shown to the
 * user.
 */
export const SingleOption: Story = {
  args: {
    children: <Option>An option</Option>,
  },
};

/**
 * `OptionGroup` groups related options under a heading, which is set through
 * `label` and cannot be selected itself. This example shows an empty group,
 * and the first example shows groups with options in them.
 */
export const EmptyOptionGroup: Story = {
  args: {
    children: <OptionGroup label="Option Group" />,
  },
};
