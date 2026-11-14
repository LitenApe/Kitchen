import type { ElementType, JSX, ReactNode } from 'react';

import type { PolymorphicProps } from '../../utils/types/PolymorphicProps';
import { useHasElapsed } from './bones/useHasElapsed';

/**
 * Screen readers only announce changes to live regions they already know
 * about, so the content is held back until the alert has existed for this
 * long. Later changes are shown straight away. A single frame is not enough:
 * React Aria waits just as long, having found shorter delays unreliable in
 * Safari.
 */
const ANNOUNCEMENT_DELAY_MS = 100;

export type AlertProps<T extends ElementType> = PolymorphicProps<
  T,
  { children?: ReactNode }
>;

function Alert<T extends ElementType = 'div'>({
  as,
  children,
  ...props
}: AlertProps<T>): JSX.Element {
  const Component: ElementType = as ?? 'div';
  const isReady = useHasElapsed(ANNOUNCEMENT_DELAY_MS);

  return (
    <Component aria-live="assertive" aria-atomic="true" {...props}>
      {isReady ? children : null}
    </Component>
  );
}

export default Alert;
