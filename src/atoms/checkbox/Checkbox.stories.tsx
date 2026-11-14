import { Meta, StoryFn } from '@storybook/react-vite';
import { Checkbox } from '.';
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
  component: Checkbox,
  parameters: {
    docs: { subtitle: 'Lets users turn an option on or off' },
  },
} satisfies Meta;

const Template: StoryFn = (args) => (
  <Field {...args}>
    <Checkbox />
    <Label>Checkbox label</Label>
  </Field>
);

export const Component = Template.bind({});
Component.args = { ...Component.args };
