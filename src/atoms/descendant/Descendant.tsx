import type { JSX, ReactNode } from 'react';

import { DescendantContext } from './bones/DescendantContext';
import { useDescendantRegistry } from './bones/useDescendantRegistry';

type DescendantProps = {
  /** The content which holds the elements to keep track of, at any depth. */
  children?: ReactNode;
};

/**
 * Keeps track of the elements inside it which are registered with
 * `useDescendant`, so that each of them knows its position and neighbours.
 */
function Descendant({ children }: DescendantProps): JSX.Element {
  const registry = useDescendantRegistry();
  return <DescendantContext value={registry}>{children}</DescendantContext>;
}

export default Descendant;
