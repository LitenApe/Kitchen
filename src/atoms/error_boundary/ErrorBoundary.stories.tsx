import type { JSX } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { ErrorBoundary as Component } from '.';

/**
 * An error boundary catches errors thrown while its children render, and
 * shows a fallback instead, so a single failing component does not take down
 * the whole page.
 *
 * After an error, `fallback` is rendered in place of the children until the
 * boundary is remounted. `logger` is called with the error and React's error
 * info, which includes the component stack, for example to report the error
 * to a tracking service.
 *
 * Like any React error boundary, it does not catch errors thrown in event
 * handlers or asynchronous code. The example below renders a child which
 * always throws, so the fallback is shown.
 */
export default {
  title: 'Atom/ErrorBoundary',
  component: Component,
  parameters: {
    docs: {
      subtitle: 'Shows a fallback when its children fail to render',
    },
  },
  argTypes: {
    fallback: {
      description:
        'A component to render instead of the children after an error.',
    },
    logger: {
      description:
        "Called with the error and React's error info when an error is caught.",
    },
  },
} satisfies Meta;

function ErrorThrower(): JSX.Element {
  throw new Error('Error thrown to trigger fallback');
}

const Template: StoryFn = ({ children, ...rest }) => (
  <Component fallback={() => <p>Fallback component rendered</p>} {...rest}>
    <ErrorThrower />
  </Component>
);

export const ErrorBoundary = Template.bind({});
ErrorBoundary.storyName = 'ErrorBoundary';
ErrorBoundary.args = {
  ...ErrorBoundary.args,
};
