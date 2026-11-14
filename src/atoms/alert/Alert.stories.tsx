import { Meta, StoryFn } from '@storybook/react-vite';
import { Alert as Component } from '.';

/**
 * An alert displays a brief, important message which draws the user's
 * attention without interrupting their task. Alerts which are rendered
 * dynamically are announced by most screen readers.
 *
 * `Alert` uses `aria-live` instead of the `alert` role, so you can choose how
 * urgently each message is announced. It defaults to `assertive`, which
 * interrupts whatever the screen reader is reading. Pass `aria-live="polite"`
 * to wait until the screen reader has finished instead.
 *
 * Screen readers only announce changes to live regions they already know
 * about, so a message rendered together with its container could go
 * unnoticed. `Alert` therefore holds its content back for 100 ms after it
 * mounts, and shows every later change straight away. To announce a message
 * the moment it arrives, render the `Alert` ahead of time and only change its
 * content.
 */
export default {
  title: 'Atom/Alert',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Announces important messages to screen readers',
    },
  },
  argTypes: {
    as: {
      description: 'The element to render. Defaults to `div`.',
    },
    children: {
      description: 'The message to show and announce.',
      type: 'string',
    },
  },
} satisfies Meta;

const Template: StoryFn = (args) => <Component as="p" {...args} />;

export const Alert = Template.bind({});
Alert.args = { ...Alert.args, children: 'Alert message' };
