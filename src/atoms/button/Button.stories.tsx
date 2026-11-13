import { Meta, StoryFn } from '@storybook/react-vite';
import { Button as Component } from '.';

export default {
  title: 'Atom/Button',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'An element which enable users to trigger events and actions',
      description: {
        component: `
    The button is the most commonly used element for triggering actions
    and events, such as submitting a form, opening a dialog, canceling
    an action, and so on.
        `,
      },
    },
  },
  argTypes: {
    children: {
      name: 'children',
      description: 'The accessible name and the content of the button',
      type: 'string',
    },
  },
} as Meta;

const Template: StoryFn = (args) => <Component {...args} />;

export const Button = Template.bind({});
Button.args = { ...Button.args, children: 'label' };
