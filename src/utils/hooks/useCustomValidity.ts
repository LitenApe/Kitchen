import { type RefObject, useEffect, useRef } from 'react';

type ValidatableElement =
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Uses an error message as the browser's native validation message of a form
 * control, which marks the control as invalid and stops its form from being
 * submitted. Clearing the error makes the control valid again.
 *
 * @param error the error message, if any
 * @returns a ref to attach to the form control
 */
export function useCustomValidity<T extends ValidatableElement>(
  error: string | undefined
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    ref.current?.setCustomValidity(error ?? '');
  }, [error]);

  return ref;
}
