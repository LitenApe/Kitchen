import { useState } from 'react';

type Options<T, Args extends unknown[]> = {
  /** The name of the component, used in warnings. */
  name: string;
  /** The value when the component is controlled. */
  value: T | undefined;
  /** The starting value when the component is uncontrolled. */
  defaultValue: T;
  /** Called with a requested value, and any extra arguments, when the component is controlled. */
  onChange: ((value: T, ...args: Args) => void) | undefined;
};

/**
 * State which is either kept by the component itself or controlled by its
 * user, depending on the props it receives:
 *
 * - **Uncontrolled**, without `value` or `onChange`: the state is kept
 *   internally, starting at `defaultValue`.
 * - **Controlled**, with both `value` and `onChange`: changes are only
 *   requested through `onChange`, and it is up to the user to update `value`.
 *   Without `onChange`, the value is read-only.
 * - With `onChange` but without `value`, the component cannot be controlled,
 *   so changes are ignored and a warning is logged.
 *
 * @returns the current value, and a function which requests a new value
 */
export function useControllableState<T, Args extends unknown[] = []>({
  name,
  value,
  defaultValue,
  onChange,
}: Options<T, Args>): [T, (value: T, ...args: Args) => void] {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;

  function requestChange(next: T, ...args: Args) {
    if (isControlled) {
      onChange?.(next, ...args);
    } else if (onChange === undefined) {
      setInternalValue(next);
    } else {
      console.warn(
        `${name} received a change handler without a value, so the change was ignored. Either remove the handler or also pass the value to control ${name}.`
      );
    }
  }

  return [isControlled ? value : internalValue, requestChange];
}
