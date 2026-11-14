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
