import { useMemo, useState, useSyncExternalStore } from 'react';

import type { DescendantContextValue } from './DescendantContext';
import { createDescendantRegistry } from './createDescendantRegistry';

/**
 * Keeps a registry of descendants for as long as the component is mounted,
 * and renders the component again whenever the descendants change.
 *
 * @returns the descendants, and functions to register and unregister them
 */
export function useDescendantRegistry(): DescendantContextValue {
  const [registry] = useState(createDescendantRegistry);
  // the server has no descendants, as refs are only attached in the browser
  const elements = useSyncExternalStore(
    registry.subscribe,
    registry.getElements,
    registry.getElements
  );

  return useMemo(
    () => ({
      elements,
      register: registry.register,
      unregister: registry.unregister,
    }),
    [elements, registry]
  );
}
