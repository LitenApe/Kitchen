import { Meta, StoryFn } from '@storybook/react-vite';
import { Checkbox as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';

export default {
  title: 'Atom/Checkbox',
  component: Component,
  parameters: {
    docs: { subtitle: 'Enable users to toggle between to choices' },
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Field {...args}>
    <Component />
    <Label>Checkbox label</Label>
  </Field>
);

export const Checkbox = Template.bind({});
Checkbox.args = { ...Checkbox.args };
