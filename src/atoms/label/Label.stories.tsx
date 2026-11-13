import { Meta, StoryFn } from '@storybook/react-vite';
import { Label as Component } from '.';

export default {
  title: 'Atom/Label',
  component: Component,
} as Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Component {...args}>{children}</Component>
);

export const Label = Template.bind({});
Label.args = { ...Label.args, children: "I'm a label" };
