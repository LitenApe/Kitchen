import type { JSX } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ErrorBoundary } from '.';

/** Rendered in place of the children which failed. */
function Fallback(): JSX.Element {
  return <p>Fallback component rendered</p>;
}

/** Always throws while rendering, to trigger the fallback. */
function ErrorThrower(): JSX.Element {
  throw new Error('Error thrown to trigger fallback');
}

/**
 * An error boundary catches errors thrown while its children render, and
 * shows a fallback instead, so a single failing component does not take down
 * the whole page.
 *
 * After an error, `fallback` is rendered in place of the children until the
 * boundary is remounted, for example by changing its `key`. `logger` is
 * called with the error and React's error info, which includes the component
 * stack, for example to report the error to a tracking service.
 *
 * Like any React error boundary, it does not catch errors thrown in event
 * handlers or asynchronous code. The example below renders a child which
 * always throws, so the fallback is shown and the error is logged in the
 * **Actions** panel.
 */
const meta = {
  title: 'Atom/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      subtitle: 'Shows a fallback when its children fail to render',
    },
  },
  argTypes: {
    children: { control: false },
    fallback: { control: false },
  },
  args: {
    fallback: Fallback,
    logger: fn(),
  },
  render: (args) => (
    <ErrorBoundary {...args}>
      <ErrorThrower />
    </ErrorBoundary>
  ),
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
