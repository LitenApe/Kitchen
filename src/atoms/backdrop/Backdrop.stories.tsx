import type { Meta, StoryObj } from '@storybook/react-vite';

import { Backdrop } from '.';

/**
 * A backdrop is a full-screen overlay which dims the page behind it. It is
 * commonly placed behind modals and dialogs, or used to highlight an image
 * or another piece of content which needs the user's attention.
 *
 * The backdrop is fixed to the viewport and placed above the page content
 * (`z-index: 1000`). It is only rendered while `visible` is set. Anything
 * passed as `children` is rendered inside the backdrop. Its look can be
 * adjusted with `className` or `style`, which are applied on top of its own
 * styling.
 *
 * The backdrop only covers the page visually. Keyboard users can still reach
 * whatever is behind it, so use it together with a component which keeps
 * focus inside, such as a modal dialog.
 */
const meta = {
  title: 'Atom/Backdrop',
  component: Backdrop,
  parameters: {
    docs: {
      subtitle: 'Dims the page to highlight what needs attention',
    },
  },
  argTypes: {
    children: {
      description: 'Content to show on top of the backdrop, such as a dialog.',
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    visible: true,
  },
};
