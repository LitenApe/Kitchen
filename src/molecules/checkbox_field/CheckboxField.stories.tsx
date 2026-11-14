import { Meta, StoryFn } from '@storybook/react-vite';
import { CheckboxField } from '.';

/**
 * `CheckboxField` is a ready-made checkbox with a label and an error message,
 * built from `BaseField`, `Checkbox` and `Label`.
 *
 * Set the text of the label with `label`. Every other prop, such as
 * `checked`, `onChange` or `error`, is passed on to the checkbox, which also
 * receives the `ref`.
 */
export default {
  title: 'Molecule/CheckboxField',
  component: CheckboxField,
  parameters: {
    docs: {
      subtitle: 'A checkbox with a label and an error message',
    },
  },
  argTypes: {
    label: {
      description: 'The text of the label.',
      type: 'string',
    },
    error: {
      description:
        'An error message to show and announce. Marks the checkbox as invalid.',
      type: 'string',
    },
  },
} satisfies Meta;

const Template: StoryFn = (args) => <CheckboxField label="field label" {...args} />;

export const Component = Template.bind({});
Component.storyName = 'CheckboxField';
Component.args = {
  ...Component.args,
  error: '',
  label: 'field label',
};
