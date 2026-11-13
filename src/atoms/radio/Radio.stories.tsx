import { Meta, StoryFn } from '@storybook/react-vite';
import { Radio as Component } from '.';
import { Field } from '../field';
import { Label } from '../label';

export default {
  title: 'Atom/Radio',
  component: Component,
} as Meta;

const Template: StoryFn = (args) => (
  <Field {...args}>
    <Component />
    <Label>Radio label</Label>
  </Field>
);

export const Radio = Template.bind({});
Radio.args = { ...Radio.args };
