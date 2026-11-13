import { isDefined } from './isDefined';

namespace Empty {
  export type String = '';
  export type Object = Record<string, never>;
  export type Array = never[];
}

type Bottom<T> = T extends string
  ? Empty.String
  : T extends any[]
    ? Empty.Array
    : T extends object
      ? Empty.Object
      : never;

/**
 * Check if a value is empty or not.
 * undefined and null values will be
 * treated as empty values
 *
 * @param value {T} value to verify
 * @returns {boolean} returns an boolean which says if a given value is empty or not
 */
export function isEmpty<T extends string | any[] | object>(
  value: T | Empty.String | Empty.Object | Empty.Array | undefined | null
): value is Bottom<T> {
  if (!isDefined(value)) {
    return true;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'string') {
    return value === '';
  } else if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  } else {
    return false;
  }
}
