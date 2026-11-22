/** The units of a size, each 1000 times the one before it. */
const UNITS = [
  'byte',
  'kilobyte',
  'megabyte',
  'gigabyte',
  'terabyte',
  'petabyte',
] as const;

/**
 * Formats a file's size for people to read, in the largest unit which keeps
 * it at 1 or more, rounded to one decimal, such as "1.5 MB". A kilobyte is
 * 1000 bytes, which is what kB, MB and the other units mean exactly, while
 * some systems count 1024. The number and unit follow the given language,
 * such as "1,5 Mo" in French.
 *
 * @param size the size in bytes, such as a file's `size`
 * @param locales the language to format in, which is the browser's unless
 *   given
 * @returns the formatted size
 */
export function formatFileSize(
  size: number,
  locales?: Intl.LocalesArgument
): string {
  let index = 0;

  // moves up a unit while the size, rounded as it is shown, is 1000 or more,
  // so that 999,950 bytes are shown as 1 MB rather than 1,000 kB
  while (
    index < UNITS.length - 1 &&
    Number((size / 1000 ** index).toFixed(1)) >= 1000
  ) {
    index += 1;
  }

  return new Intl.NumberFormat(locales, {
    style: 'unit',
    unit: UNITS[index],
    maximumFractionDigits: 1,
  }).format(size / 1000 ** index);
}
