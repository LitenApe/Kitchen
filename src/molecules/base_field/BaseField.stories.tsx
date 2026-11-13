import { Meta, StoryFn } from '@storybook/react-vite';
import { BaseField as Component } from '.';
import { Input } from '../../atoms/input';
import { Label } from '../../atoms/label';

/**
 * `BaseField` is a `Field` which can also show an error message. It is the
 * foundation of `InputField`, `CheckboxField`, `RadioField` and
 * `SelectField`, and can be used directly to build other kinds of fields.
 *
 * When `error` is set, the message is shown after the field's children in an
 * `Alert`, so screen readers announce it. The control is also marked as
 * invalid, and described by the message through `aria-describedby`, alongside
 * any descriptions it already has.
 *
 * Set `error` from **Controls** to see the message appear.
 */
export default {
  title: 'Molecule/BaseField',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'A field which shows an error message',
    },
  },
  argTypes: {
    error: {
      description:
        'An error message to show and announce. Marks the control as invalid.',
      type: 'string',
    },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Component {...args}>
    <Label>Test Label</Label>
    <Input />
  </Component>
);

export const BaseField = Template.bind({});
BaseField.storyName = 'BaseField';
BaseField.args = {
  ...BaseField.args,
  error: '',
};
