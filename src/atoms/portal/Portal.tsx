import type { ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

import { useIsHydrated } from './bones/useIsHydrated';

export type PortalProps = {
  /** What to render in the container. */
  children?: ReactNode;
  /**
   * The element to render into, which is the page's `body` unless given.
   * While it is `null`, such as before the container has mounted, nothing is
   * rendered.
   */
  container?: Element | DocumentFragment | null;
};

/**
 * Renders its children into another element, by default at the end of the
 * page, while they stay part of the component which renders the portal.
 */
function Portal({ children, container }: PortalProps): ReactPortal | null {
  // the server has no document to render into, and while hydrating, the
  // browser has to render what the server did
  const isHydrated = useIsHydrated();

  if (!isHydrated || container === null) {
    return null;
  }

  return createPortal(children, container ?? document.body);
}

export default Portal;
