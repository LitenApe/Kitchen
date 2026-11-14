import { Meta, StoryFn } from '@storybook/react-vite';

import { InputField as Component } from '.';

/**
 * `InputField` is a ready-made text input with a label and an error message,
 * built from `BaseField`, `Input` and `Label`.
 *
 * Set the text of the label with `label`. Every other prop, such as `value`,
 * `onChange`, `postfix` or `error`, is passed on to the input, which also
 * receives the `ref`. Use `as` to render another input component in place of
 * `Input`.
 */
export default {
  title: 'Molecule/InputField',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'A text input with a label and an error message',
    },
  },
  argTypes: {
    label: {
      description: 'The text of the label.',
      type: 'string',
    },
    error: {
      description:
        'An error message to show and announce. Marks the input as invalid.',
      type: 'string',
    },
  },
} satisfies Meta;

const Template: StoryFn = (args) => <Component label="field label" {...args} />;

export const InputField = Template.bind({});
InputField.storyName = 'InputField';
InputField.args = {
  ...InputField.args,
  error: '',
  label: 'field label',
};
