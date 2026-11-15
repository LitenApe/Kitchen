import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DescendantContextValue } from './DescendantContext';
import { getCommonAncestor, sortNodes } from './utils';

/**
 * Keeps track of the registered descendants, sorted in document order, and
 * sorts them again when they are moved.
 *
 * @returns the descendants, and functions to register and unregister them
 */
export function useDescendantRegistry(): DescendantContextValue {
  const [elements, setElements] = useState<ReadonlyArray<HTMLElement>>([]);
  const observerRef = useRef<MutationObserver>(null);

  const register = useCallback((element: HTMLElement) => {
    setElements((current) =>
      current.includes(element) ? current : sortNodes([...current, element])
    );
  }, []);

  const unregister = useCallback((element: HTMLElement) => {
    setElements((current) => current.filter((item) => item !== element));
  }, []);

  // React moves elements without registering them again, such as when it
  // reorders a keyed list, so they are sorted again whenever the nodes around
  // them change. The observer stays connected, as disconnecting it would
  // discard the changes it has not reported yet, so the nodes it watched
  // before are still watched as well.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setElements((current) => {
        // React only unregisters a removed element in a later render, and
        // an element which has left the document can no longer be sorted
        const sorted = sortNodes(
          current.filter((element) => element.isConnected)
        );

        // the same array keeps the descendants from rendering again
        return sorted.length === current.length &&
          sorted.every((element, index) => element === current[index])
          ? current
          : sorted;
      });
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  // React reorders the elements by moving nodes inside the closest node which
  // contains all of them
  useEffect(() => {
    const ancestor = getCommonAncestor(elements);

    if (ancestor !== null) {
      observerRef.current?.observe(ancestor, {
        childList: true,
        subtree: true,
      });
    }
  }, [elements]);

  return useMemo(
    () => ({ elements, register, unregister }),
    [elements, register, unregister]
  );
}
