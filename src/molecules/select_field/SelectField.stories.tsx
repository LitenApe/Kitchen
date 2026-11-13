import { Meta, StoryFn } from '@storybook/react-vite';
import { SelectField as Component } from '.';

/**
 * `SelectField` is a ready-made select with a label and an error message,
 * built from `BaseField`, `Select`, `Option` and `Label`.
 *
 * Set the text of the label with `label`, and list the choices in `options`
 * as `{ label, value }` objects, which may also include other props for their
 * option. An entry can also be a component, for example one which renders an
 * `OptionGroup`. Every other prop, such as `value`, `onChange` or `error`, is
 * passed on to the select, which also receives the `ref`.
 */
export default {
  title: 'Molecule/SelectField',
  component: Component,
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
} as Meta;

const Template: StoryFn = (args) => (
  <Component label="field label" options={[]} {...args} />
);

export const SelectField = Template.bind({});
SelectField.storyName = 'SelectField';
SelectField.args = {
  ...SelectField.args,
  error: '',
  label: 'Choose a camera manufacturer',
  options: [
    {
      label: 'Fujifilm',
      value: 'fujifilm',
    },
    {
      label: 'Canon',
      value: 'canon',
    },
    {
      label: 'Nikon',
      value: 'nikon',
    },
  ],
};
