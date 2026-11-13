import { Meta, StoryFn } from '@storybook/react-vite';
import { Legend as Component } from '.';

export default {
  title: 'Atom/Legend',
  component: Component,
} as Meta;

const Template: StoryFn = ({ children, ...args }) => (
  <Component {...args}>{children}</Component>
);

export const Legend = Template.bind({});
Legend.args = { ...Legend.args, children: "I'm a legend" };
