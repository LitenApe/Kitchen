import {
  type RefCallback,
  createContext,
  use,
  useCallback,
  useState,
} from 'react';

import { navigateFrom } from './utils';

export type DescendantContextValue = {
  /** The registered elements, in document order. */
  readonly elements: ReadonlyArray<HTMLElement>;
  readonly register: (element: HTMLElement) => void;
  readonly unregister: (element: HTMLElement) => void;
};

export const DescendantContext = createContext<DescendantContextValue | null>(
  null
);

/** What `useDescendant` returns for an element of type `T`. */
export type UseDescendantResult<T extends HTMLElement> = {
  /**
   * The element's position among the descendants, or -1 until it is
   * registered. In the browser, -1 is replaced before it is painted, but it
   * stays in server-rendered HTML until the page has hydrated.
   */
  index: number;
  /** Attach to the element to register it as a descendant. */
  ref: RefCallback<T>;
  /**
   * The next descendant, which there is none of until the element has
   * registered. Wraps around to the first unless `loop` is false.
   */
  next: (loop?: boolean) => HTMLElement | undefined;
  /**
   * The previous descendant, which there is none of until the element has
   * registered. Wraps around to the last unless `loop` is false.
   */
  prev: (loop?: boolean) => HTMLElement | undefined;
  /** The first descendant, such as for the Home key. */
  first: () => HTMLElement | undefined;
  /** The last descendant, such as for the End key. */
  last: () => HTMLElement | undefined;
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
 * gives it a position in document order, and access to its neighbours and to
 * the first and last descendant.
 */
export function useDescendant<T extends HTMLElement>(): UseDescendantResult<T> {
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

  return { ...navigateFrom<HTMLElement>(elements, element), ref };
}
