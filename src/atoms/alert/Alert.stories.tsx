import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '.';

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
const meta = {
  title: 'Atom/Alert',
  component: Alert,
  parameters: {
    docs: {
      subtitle: 'Announces important messages to screen readers',
    },
  },
  argTypes: {
    as: {
      description: 'The element to render, such as `p` or `span`.',
      options: ['div', 'p', 'span'],
      control: { type: 'select' },
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: "'div'" },
      },
    },
    children: {
      description: 'The message to show and announce.',
      type: 'string',
      table: { type: { summary: 'ReactNode' } },
    },
    'aria-live': {
      description:
        'How urgently screen readers announce the message. `assertive` interrupts whatever they are reading, while `polite` waits until they have finished.',
      options: ['assertive', 'polite'],
      control: { type: 'inline-radio' },
      table: {
        type: { summary: "'assertive' | 'polite' | 'off'" },
        defaultValue: { summary: "'assertive'" },
      },
    },
  },
} satisfies Meta<typeof Alert<'p'>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    as: 'p',
    children: 'Alert message',
  },
  // axe checks the story once `play` has finished, so this waits for the
  // message, which the `Alert` holds back after it mounts
  play: async ({ canvas }) => {
    await canvas.findByText('Alert message');
  },
};
