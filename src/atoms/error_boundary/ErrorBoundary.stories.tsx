import type { JSX } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { ErrorBoundary as Component } from '.';

export default {
  title: 'Atom/ErrorBoundary',
  component: Component,
  argTypes: {
    fallback: {
      name: 'fallback',
      description: 'ReactElement to render if children throws an Error',
    },
  },
} as Meta;

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
