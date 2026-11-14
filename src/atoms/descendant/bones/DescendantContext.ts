import {
  type RefCallback,
  createContext,
  use,
  useCallback,
  useState,
} from 'react';

import { getNextIndex, getPreviousIndex } from './utils';

export type DescendantContextValue = {
  /** The registered elements, in document order. */
  readonly elements: ReadonlyArray<HTMLElement>;
  readonly register: (element: HTMLElement) => void;
  readonly unregister: (element: HTMLElement) => void;
};

export const DescendantContext = createContext<DescendantContextValue | null>(
  null
);

type Descendant<T extends HTMLElement> = {
  /** The element's position among the descendants, or -1 until it is registered. */
  index: number;
  /** Attach to the element to register it as a descendant. */
  ref: RefCallback<T>;
  /** The next descendant. Wraps around to the first unless `loop` is false. */
  next: (loop?: boolean) => HTMLElement | undefined;
  /** The previous descendant. Wraps around to the last unless `loop` is false. */
  prev: (loop?: boolean) => HTMLElement | undefined;
};

function useDescendantContext(): DescendantContextValue {
  const context = use(DescendantContext);

  if (context === null) {
    throw new Error('Component must be wrapped by Descendant');
  }

  return context;
}

/**
 * Registers an element as a descendant of the surrounding `Descendant`, which
 * gives it a position in document order and access to its neighbours.
 */
export function useDescendant<T extends HTMLElement>(): Descendant<T> {
  const { elements, register, unregister } = useDescendantContext();
  const [element, setElement] = useState<T | null>(null);

  const ref = useCallback<RefCallback<T>>(
    (node) => {
      if (node === null) {
        return;
      }

      register(node);
      setElement(node);
      return () => unregister(node);
    },
    [register, unregister]
  );

  const index = element === null ? -1 : elements.indexOf(element);

  return {
    index,
    ref,
    next: (loop = true) => elements[getNextIndex(index, elements.length, loop)],
    prev: (loop = true) =>
      elements[getPreviousIndex(index, elements.length, loop)],
  };
}
