import { Meta, StoryFn } from '@storybook/react-vite';
import { CheckboxField as Component } from '.';

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
  component: Component,
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

const Template: StoryFn = (args) => <Component label="field label" {...args} />;

export const CheckboxField = Template.bind({});
CheckboxField.storyName = 'CheckboxField';
CheckboxField.args = {
  ...CheckboxField.args,
  error: '',
  label: 'field label',
};
