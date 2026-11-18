import type { ComponentPropsWithRef, JSX } from 'react';

export type LegendProps = ComponentPropsWithRef<'legend'>;

function Legend(props: LegendProps): JSX.Element {
  return <legend {...props} />;
}

export default Legend;
