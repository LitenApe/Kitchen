import { Meta, StoryFn } from '@storybook/react-vite';
import { Backdrop as Component } from '.';

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
 */
export default {
  title: 'Atom/Backdrop',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Dims the page to highlight what needs attention',
    },
  },
  argTypes: {
    visible: {
      description: 'Whether the backdrop is shown.',
      type: 'boolean',
    },
  },
} satisfies Meta;

const Template: StoryFn = (args) => <Component {...args} />;

export const Backdrop = Template.bind({});
Backdrop.args = { ...Backdrop.args, visible: true };
