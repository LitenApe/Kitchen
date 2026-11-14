import type { Ref, RefCallback } from 'react';

type RefCleanup = () => void;

/**
 * Points a single ref at a value: object refs get it as `current`, and
 * callback refs are called with it.
 *
 * @returns the cleanup function of a callback ref, if it returned one
 */
function assignRef<T>(
  ref: Ref<T> | undefined,
  value: T | null
): RefCleanup | undefined {
  if (typeof ref === 'function') {
    return ref(value) ?? undefined;
  }

  if (ref) {
    ref.current = value;
  }

  return undefined;
}

/**
 * Combines several refs into one callback ref, so that a single element can
 * be shared between, for example, the user of a component and the component
 * itself. Both object refs and callback refs are supported, and missing refs
 * are ignored.
 *
 * When the element is removed, object refs are reset to `null`, and callback
 * refs either have their cleanup function called or, if they did not return
 * one, are called with `null`.
 *
 * @param refs the refs to combine
 * @returns a callback ref which updates every given ref
 */
export function mergeRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> {
  return (value) => {
    const cleanups = refs.map((ref) => assignRef(ref, value));

    return () => {
      refs.forEach((ref, index) => {
        const cleanup = cleanups[index];
        if (cleanup) {
          cleanup();
        } else {
          assignRef(ref, null);
        }
      });
    };
  };
}
