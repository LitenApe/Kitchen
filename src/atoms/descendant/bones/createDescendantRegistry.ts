import { getCommonAncestor, sortNodes } from './utils';

export type DescendantRegistry = {
  /** The registered elements, in document order. */
  readonly getElements: () => ReadonlyArray<HTMLElement>;
  readonly register: (element: HTMLElement) => void;
  readonly unregister: (element: HTMLElement) => void;
  /**
   * Calls `listener` whenever the elements change. The elements are only
   * sorted again after they are moved while something is subscribed.
   *
   * @returns a function which stops calling `listener`
   */
  readonly subscribe: (listener: () => void) => () => void;
};

/**
 * Keeps track of registered elements, sorted in document order, and sorts
 * them again when they are moved.
 *
 * @returns the registry, which starts without elements
 */
export function createDescendantRegistry(): DescendantRegistry {
  let elements: ReadonlyArray<HTMLElement> = [];
  const listeners = new Set<() => void>();
  let observer: MutationObserver | null = null;

  // React reorders the elements by moving nodes inside the closest node which
  // contains all of them. The observer stays connected, as disconnecting it
  // would discard the changes it has not reported yet, so the nodes it
  // watched before are still watched as well.
  function observe() {
    const ancestor = getCommonAncestor(elements);

    if (observer !== null && ancestor !== null) {
      observer.observe(ancestor, { childList: true, subtree: true });
    }
  }

  function setElements(next: ReadonlyArray<HTMLElement>) {
    if (next === elements) {
      return;
    }

    elements = next;
    observe();
    listeners.forEach((listener) => listener());
  }

  // React moves elements without registering them again, such as when it
  // reorders a keyed list, so they are sorted again whenever the nodes around
  // them change
  function sortAgain() {
    // React only unregisters a removed element in a later render, and an
    // element which has left the document can no longer be sorted
    const sorted = sortNodes(elements.filter((element) => element.isConnected));
    const isUnchanged =
      sorted.length === elements.length &&
      sorted.every((element, index) => element === elements[index]);

    // the same array keeps the descendants from rendering again
    setElements(isUnchanged ? elements : sorted);
  }

  return {
    getElements: () => elements,
    register: (element) => {
      if (!elements.includes(element)) {
        setElements(sortNodes([...elements, element]));
      }
    },
    unregister: (element) => {
      setElements(elements.filter((item) => item !== element));
    },
    subscribe: (listener) => {
      listeners.add(listener);

      if (observer === null) {
        observer = new MutationObserver(sortAgain);
        observe();
      }

      return () => {
        listeners.delete(listener);

        if (listeners.size === 0) {
          observer?.disconnect();
          observer = null;
        }
      };
    },
  };
}
