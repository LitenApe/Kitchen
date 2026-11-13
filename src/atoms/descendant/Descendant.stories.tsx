import { Meta, StoryFn } from '@storybook/react-vite';
import { createRef } from 'react';
import { Descendant as Component, useDescendant } from '.';
import { useMount } from '../../utils/hooks/useMount';

export default {
  title: 'Atom/Descendant',
  component: Component,
} as Meta;

function TestComponent({ pos }: { pos: number }) {
  const ref = createRef<HTMLParagraphElement>();
  const { index, register } = useDescendant();

  useMount(() => {
    register(ref);
  });

  return (
    <p ref={ref} data-id={pos}>
      Position of element: {index}
    </p>
  );
}

const Template: StoryFn = (args) => (
  <Component {...args}>
    <TestComponent pos={0} />
    <div style={{ padding: 5 }}>
      <TestComponent pos={1} />
    </div>
    <div style={{ padding: 10 }}>
      <div>
        <TestComponent pos={2} />
      </div>
    </div>
    <div style={{ padding: 20 }}>
      <div>
        <div>
          <TestComponent pos={3} />
        </div>
      </div>
    </div>
    <TestComponent pos={4} />
  </Component>
);

export const Descendant = Template.bind({});
Descendant.args = { ...Descendant.args };
