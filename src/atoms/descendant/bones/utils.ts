export function sortNodes(nodes: HTMLElement[]) {
  return nodes.sort((a, b) => {
    const compare = a.compareDocumentPosition(b);

    // nodes which are not in the same document still report an arbitrary
    // order, so they have to be ruled out first
    if (compare & Node.DOCUMENT_POSITION_DISCONNECTED) {
      throw new Error('Cannot sort the given nodes');
    }

    // a < b
    if (
      compare & Node.DOCUMENT_POSITION_FOLLOWING ||
      compare & Node.DOCUMENT_POSITION_CONTAINED_BY
    ) {
      return -1;
    }

    // a > b
    if (
      compare & Node.DOCUMENT_POSITION_PRECEDING ||
      compare & Node.DOCUMENT_POSITION_CONTAINS
    ) {
      return 1;
    }

    return 0;
  });
}

/**
 * Finds the closest node which contains every given node, which can be one of
 * the nodes itself.
 *
 * @returns the node, or `null` when there are no nodes or they share no
 * ancestor
 */
export function getCommonAncestor(nodes: ReadonlyArray<Node>): Node | null {
  let ancestor: Node | null = nodes[0] ?? null;

  while (ancestor !== null) {
    const candidate: Node = ancestor;

    if (nodes.every((node) => candidate.contains(node))) {
      return candidate;
    }

    ancestor = candidate.parentNode;
  }

  return null;
}

export function getNextIndex(
  current: number,
  length: number,
  loop: boolean = true
): number {
  const next = current + 1;

  if (next < length) {
    return next;
  }

  return loop ? 0 : current;
}

export function getPreviousIndex(
  current: number,
  length: number,
  loop: boolean = true
): number {
  const prev = current - 1;

  if (prev >= 0) {
    return prev;
  }

  return loop ? length - 1 : current;
}

type Navigation<T> = {
  /** The element's position, or -1 when it is not one of the elements. */
  index: number;
  /**
   * The next element, which there is none of while the element is not one of
   * the elements. Wraps around to the first unless `loop` is false.
   */
  next: (loop?: boolean) => T | undefined;
  /**
   * The previous element, which there is none of while the element is not one
   * of the elements. Wraps around to the last unless `loop` is false.
   */
  prev: (loop?: boolean) => T | undefined;
  /** The first of the elements. */
  first: () => T | undefined;
  /** The last of the elements. */
  last: () => T | undefined;
};

/**
 * Finds an element among the others, together with the elements which can be
 * moved to from it.
 *
 * @param elements the elements, in order
 * @param element the element to find, or `null` for none
 * @returns the element's position, and functions which return the elements
 * next to it and at either end
 */
export function navigateFrom<T>(
  elements: ReadonlyArray<T>,
  element: T | null
): Navigation<T> {
  const index = element === null ? -1 : elements.indexOf(element);
  // an element without a position, such as one which has not registered yet,
  // has no neighbours
  const isAmong = index !== -1;

  return {
    index,
    next: (loop = true) =>
      isAmong
        ? elements[getNextIndex(index, elements.length, loop)]
        : undefined,
    prev: (loop = true) =>
      isAmong
        ? elements[getPreviousIndex(index, elements.length, loop)]
        : undefined,
    first: () => elements.at(0),
    last: () => elements.at(-1),
  };
}
