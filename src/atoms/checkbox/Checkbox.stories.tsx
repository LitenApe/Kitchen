import { Meta, StoryFn } from '@storybook/react-vite';
import { Checkbox as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * A checkbox lets users turn a single option on or off, or pick any number of
 * options from a list.
 *
 * `Checkbox` is a `BaseInput` with `type="checkbox"`, so inside a `Field` it
 * is linked to its `Label`, and it supports `error` in the same way. Clicking
 * the label toggles the checkbox.
 */
export default {
  title: 'Atom/Checkbox',
  component: Component,
  parameters: {
    docs: { subtitle: 'Lets users turn an option on or off' },
  },
} satisfies Meta;

const Template: StoryFn = (args) => (
  <Field {...args}>
    <Component />
    <Label>Checkbox label</Label>
  </Field>
);

export const Checkbox = Template.bind({});
Checkbox.args = { ...Checkbox.args };
