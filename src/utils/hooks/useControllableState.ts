import { useState } from 'react';

import { getControllableState } from '../functions/getControllableState';

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
 * user, as {@link getControllableState} describes. The state the component
 * keeps itself starts at `defaultValue`.
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

  return getControllableState({
    name,
    value,
    internalValue,
    onChange,
    setInternalValue,
  });
}
