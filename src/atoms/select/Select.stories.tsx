import { Meta, StoryFn } from '@storybook/react-vite';
import {
  Select,
  Option,
  OptionGroup,
} from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * A select lets users pick an option, or several with `multiple`, from a
 * list. Add the choices with `Option`, and group related ones under a
 * heading with `OptionGroup`.
 *
 * Inside a `Field`, `Select` is linked to its `Label`. Setting `error` marks
 * it as invalid with `aria-invalid`, and uses the error as the browser's
 * native validation message.
 */
export default {
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
    error: {
      description:
        'An error message. Marks the select as invalid and becomes its native validation message.',
      type: 'string',
    },
  },
} satisfies Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Field>
    <Label>Choose a camera manufacturer</Label>
    <Select {...args}>{children}</Select>
  </Field>
);

export const Component = Template.bind({});
Component.args = {
  ...Component.args,
  children: [
      <OptionGroup key="China" label="China">
        <Option value="dji">DJI</Option>
      </OptionGroup>,
      <OptionGroup key="Denmark" label="Denmark">
        <Option value="phase-one">Phase One</Option>
      </OptionGroup>,
      <OptionGroup key="Japan" label="Japanese">
        <Option value="fujifilm">Fujifilm</Option>
        <Option value="canon">Canon</Option>
        <Option value="nikon">Nikon</Option>
      </OptionGroup>,
      <OptionGroup key="German" label="German">
        <Option value="leica">Leica</Option>
      </OptionGroup>
  ]
};

/**
 * `Option` is a single choice in a `Select`. Its `value` is what the select
 * reports when the option is chosen, and its content is the text shown to the
 * user.
 */
export const ComponentOption = Template.bind({});
ComponentOption.args = {
  ...ComponentOption.args,
  children: <Option>An option</Option>,
};

/**
 * `OptionGroup` groups related options under a heading, which is set through
 * `label` and cannot be selected itself. This example shows an empty group,
 * and the `Select` story above shows groups with options in them.
 */
export const ComponentOptionGroup = Template.bind({});
ComponentOptionGroup.storyName = 'OptionGroup';
ComponentOptionGroup.args = {
  ...ComponentOptionGroup.args,
  children: <OptionGroup label="Option Group" />,
};
