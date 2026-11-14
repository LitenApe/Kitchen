type ClassName = string | false | null | undefined;

/**
 * Joins class names into one `className`, skipping any which are missing, so
 * conditional class names can be passed inline:
 * `joinClassNames(styles.affix, isBefore && styles.before)`.
 *
 * @param classNames the class names to join
 * @returns the joined class names, or `undefined` when there are none
 */
export function joinClassNames(
  ...classNames: Array<ClassName>
): string | undefined {
  const present = classNames.filter(
    (className): className is string =>
      typeof className === 'string' && className !== ''
  );

  return present.length === 0 ? undefined : present.join(' ');
}
