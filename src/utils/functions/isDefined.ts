/**
 * Check if the given argument is undefined or null
 *
 * @param value {T | undefined | null} value which we want to verify the presence of
 * @returns {boolean} returns whether or not the value is defined
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return typeof value !== 'undefined' && value !== null;
}
