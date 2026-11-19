import { type JSX, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Portal, type PortalProps } from '.';

/** A portal placed above a container, which renders into that container. */
function IntoContainer(args: PortalProps): JSX.Element {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  return (
    <>
      <Portal {...args} container={container} />
      <section ref={setContainer}>
        <h4>Container</h4>
      </section>
    </>
  );
}

/**
 * `Portal` renders its children into another element, by default at the end
 * of the page's `body`, while they stay part of the component which renders
 * the portal. It has no element of its own, so it renders nothing in its own
 * place.
 *
 * Give it a `container` to render into another element, such as a modal
 * `dialog`: content portaled outside an open modal dialog ends up behind it,
 * where it can't be reached. Keep the container in state, such as through
 * `ref={setContainer}`, so that the portal renders as soon as the container
 * has mounted. While `container` is `null`, the portal renders nothing.
 *
 * React can't render portals on the server, so `Portal` renders nothing there,
 * nor while the page hydrates, which keeps the browser's first render in line
 * with the server's HTML. It renders its children once the page has hydrated,
 * while a portal which first mounts in the browser renders them straight
 * away.
 *
 * The children keep the context of the component which renders the portal,
 * and their React events bubble up to that component, even though their
 * elements sit elsewhere. Code which works with the elements, such as
 * `element.contains()`, finds them in the container instead. Changing
 * `container` moves the children, which remounts them, so they lose their
 * state.
 *
 * In the example below, the paragraph comes from a portal placed above the
 * container, and ends up inside it.
 */
const meta = {
  title: 'Atom/Portal',
  component: Portal,
  parameters: {
    docs: {
      subtitle: 'Renders its children into another element',
    },
  },
  argTypes: {
    children: {
      description: 'What to render in the container.',
      control: false,
      table: { type: { summary: 'ReactNode' } },
    },
    container: {
      description:
        "The element to render into, which is the page's `body` unless given. While it is `null`, nothing is rendered.",
      control: false,
      table: {
        type: { summary: 'Element | DocumentFragment | null' },
        defaultValue: { summary: 'document.body' },
      },
    },
  },
  render: (args) => <IntoContainer {...args} />,
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Rendered by a portal placed above the container</p>,
  },
};
