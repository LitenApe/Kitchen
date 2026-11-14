type IdList = string | boolean | undefined | null;

/**
 * Joins space-separated lists of ids, such as the values of
 * `aria-describedby`, into one list without duplicates. Anything which is not
 * a string is ignored, so conditions can be passed inline:
 * `joinIds(hasError && errorId, describedBy)`.
 *
 * @param lists the id lists to join
 * @returns the joined list, or `undefined` when there are no ids
 */
export function joinIds(...lists: Array<IdList>): string | undefined {
  const ids = lists
    .filter((list): list is string => typeof list === 'string')
    .flatMap((list) => list.split(/\s+/))
    .filter((id) => id !== '');

  return ids.length === 0 ? undefined : [...new Set(ids)].join(' ');
}
