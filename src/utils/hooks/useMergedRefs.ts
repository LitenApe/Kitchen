import { type Ref, type RefCallback, useMemo } from 'react';

import { mergeRefs } from '../functions/mergeRefs';

/**
 * Combines several refs into one callback ref with {@link mergeRefs}, and
 * keeps it the same between renders for as long as the given refs stay the
 * same. Otherwise React would detach and reattach the element on every render.
 *
 * @param refs the refs to combine
 * @returns a callback ref which updates every given ref
 */
export function useMergedRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> {
  // the refs are the dependencies, and their number never changes for a call site
  return useMemo(() => mergeRefs(...refs), refs);
}
