import { isDefined } from './isDefined';

type Callback<Args extends unknown[]> = (...args: Args) => unknown;

/**
 * Combines several callbacks into one which calls each of them with the same
 * arguments, skipping any which are missing. Useful when a component and its
 * user both want to handle the same event.
 *
 * @param callbacks the callbacks to combine
 * @returns a callback which calls every given callback in order
 */
export function callAll<Args extends unknown[]>(
  ...callbacks: Array<Callback<Args> | undefined | null>
): (...args: Args) => void {
  const definedCallbacks = callbacks.filter(isDefined);
  return (...args) => {
    definedCallbacks.forEach((callback) => callback(...args));
  };
}
