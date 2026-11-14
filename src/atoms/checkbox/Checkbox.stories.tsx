import { Meta, StoryFn } from '@storybook/react-vite';
import { Checkbox as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';

/**
 * A checkbox lets users turn a single option on or off, or pick any number of
 * options from a list.
 *
 * Inside a `Field`, `Checkbox` is linked to its `Label`, so clicking the label
 * toggles the checkbox. Setting `error` marks it as invalid with
 * `aria-invalid`, and uses the error as the browser's native validation
 * message.
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
