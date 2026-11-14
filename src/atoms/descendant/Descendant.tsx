import type { JSX, ReactNode } from 'react';

import { DescendantContext } from './bones/DescendantContext';
import { useDescendantRegistry } from './bones/useDescendantRegistry';

/**
 * Keeps track of the elements inside it which are registered with
 * `useDescendant`, so that each of them knows its position and neighbours.
 */
function Descendant({ children }: { children?: ReactNode }): JSX.Element {
  const registry = useDescendantRegistry();
  return <DescendantContext value={registry}>{children}</DescendantContext>;
}

export default Descendant;
