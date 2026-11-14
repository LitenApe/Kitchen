import { useCallback, useMemo, useState } from 'react';

import type { DescendantContextValue } from './DescendantContext';
import { sortNodes } from './utils';

/**
 * Keeps track of the registered descendants, sorted in document order.
 *
 * @returns the descendants, and functions to register and unregister them
 */
export function useDescendantRegistry(): DescendantContextValue {
  const [elements, setElements] = useState<ReadonlyArray<HTMLElement>>([]);

  const register = useCallback((element: HTMLElement) => {
    setElements((current) =>
      current.includes(element) ? current : sortNodes([...current, element])
    );
  }, []);

  const unregister = useCallback((element: HTMLElement) => {
    setElements((current) => current.filter((item) => item !== element));
  }, []);

  return useMemo(
    () => ({ elements, register, unregister }),
    [elements, register, unregister]
  );
}
