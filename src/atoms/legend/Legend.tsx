import type { ComponentPropsWithRef, JSX } from 'react';

function Legend(props: ComponentPropsWithRef<'legend'>): JSX.Element {
  return <legend {...props} />;
}

export default Legend;
