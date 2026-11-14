import { Meta, StoryFn } from '@storybook/react-vite';
import {
  Select as Component,
  Option as ComponentOption,
  OptionGroup as ComponentOptionGroup,
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
  component: Component,
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
    <Component {...args}>{children}</Component>
  </Field>
);

export const Select = Template.bind({});
Select.args = {
  ...Select.args,
  children: (
    <>
      <ComponentOptionGroup label="China">
        <ComponentOption value="dji">DJI</ComponentOption>
      </ComponentOptionGroup>
      <ComponentOptionGroup label="Denmark">
        <ComponentOption value="phase-one">Phase One</ComponentOption>
      </ComponentOptionGroup>
      <ComponentOptionGroup label="Japanese">
        <ComponentOption value="fujifilm">Fujifilm</ComponentOption>
        <ComponentOption value="canon">Canon</ComponentOption>
        <ComponentOption value="nikon">Nikon</ComponentOption>
      </ComponentOptionGroup>
      <ComponentOptionGroup label="German">
        <ComponentOption value="leica">Leica</ComponentOption>
      </ComponentOptionGroup>
    </>
  ),
};

/**
 * `Option` is a single choice in a `Select`. Its `value` is what the select
 * reports when the option is chosen, and its content is the text shown to the
 * user.
 */
export const Option = Template.bind({});
Option.args = {
  ...Option.args,
  children: <ComponentOption>An option</ComponentOption>,
};

/**
 * `OptionGroup` groups related options under a heading, which is set through
 * `label` and cannot be selected itself. This example shows an empty group,
 * and the `Select` story above shows groups with options in them.
 */
export const OptionGroup = Template.bind({});
OptionGroup.storyName = 'OptionGroup';
OptionGroup.args = {
  ...OptionGroup.args,
  children: <ComponentOptionGroup label="Option Group" />,
};
