/**
 * The index of the open accordion in a group once the accordion at `index`
 * asks to open or close. Only one accordion is open at a time, and `-1` means
 * that none is.
 *
 * @param index the index of the accordion which asks
 * @param open whether it asks to open
 * @returns the index of the open accordion
 */
export function getOpenIndex(index: number, open: boolean): number {
  return open ? index : -1;
}
