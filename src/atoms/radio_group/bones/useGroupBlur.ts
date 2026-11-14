import { type FocusEvent, type RefObject, useRef } from 'react';

type GroupBlur<T extends HTMLElement> = {
  /** Attach to the element which contains the group. */
  groupRef: RefObject<T | null>;
  /** Attach as the `onBlur` handler of every element in the group. */
  handleBlur: (event: FocusEvent<HTMLInputElement>) => void;
};

/**
 * Calls `onBlur` only when focus leaves a group of elements, and not when it
 * moves between the elements inside the group.
 *
 * @param onBlur called when focus leaves the group
 */
export function useGroupBlur<T extends HTMLElement>(
  onBlur: ((event: FocusEvent<HTMLInputElement>) => void) | undefined
): GroupBlur<T> {
  const groupRef = useRef<T>(null);

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const focusStaysInGroup =
      groupRef.current?.contains(event.relatedTarget) ?? false;

    if (!focusStaysInGroup) {
      onBlur?.(event);
    }
  }

  return { groupRef, handleBlur };
}
