import { Meta, StoryFn } from '@storybook/react-vite';
import { BaseInput } from '../base_input';
import { Label } from '../label';
import { Field as Component } from '.';

export default {
  title: 'Atom/Field',
  component: Component,
} as Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Component {...args}>{children}</Component>
);

export const Field = Template.bind({});
Field.args = {
  children: [
    <Label key="field-label">label</Label>,
    <BaseInput key="field-input" />,
  ],
};
