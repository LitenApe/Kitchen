type ControllableState<T, Args extends unknown[]> = {
  /** The name of the component, used in warnings. */
  name: string;
  /** The value when the component is controlled. */
  value: T | undefined;
  /** The value the component keeps itself, used while it is uncontrolled. */
  internalValue: T;
  /** Called with a requested value, and any extra arguments, when the component is controlled. */
  onChange: ((value: T, ...args: Args) => void) | undefined;
  /** Updates the value the component keeps itself. */
  setInternalValue: (value: T) => void;
};

/**
 * Works out the value of state which is either kept by the component itself
 * or controlled by its user, and what a requested change does, depending on
 * the props it receives:
 *
 * - **Uncontrolled**, without `value` or `onChange`: the component's own
 *   value is used, and a change updates it through `setInternalValue`.
 * - **Controlled**, with both `value` and `onChange`: a change is only
 *   requested through `onChange`, and it is up to the user to update `value`.
 *   Without `onChange`, the value is read-only.
 * - With `onChange` but without `value`, the component cannot be controlled,
 *   so a change is ignored and a warning is logged.
 *
 * @returns the current value, and a function which requests a new value
 */
export function getControllableState<T, Args extends unknown[]>({
  name,
  value,
  internalValue,
  onChange,
  setInternalValue,
}: ControllableState<T, Args>): [T, (value: T, ...args: Args) => void] {
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
