import type { ComponentPropsWithoutRef } from 'react';

/** The props which name, describe or validate a group as a whole. */
export type GroupAttributes = Pick<
  ComponentPropsWithoutRef<'fieldset'>,
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-required'
  | 'aria-invalid'
  | 'aria-errormessage'
>;

type SplitGroupProps<T> = {
  /** The attributes of the group's own element. */
  group: GroupAttributes;
  /** The props to share with every member of the group. */
  shared: Omit<T, keyof GroupAttributes>;
};

/**
 * Separates the props which name, describe or validate a group as a whole
 * from the props it shares with its members. ARIA puts these on the group,
 * as a radio, for example, cannot be required or invalid on its own.
 *
 * @param props the props given to the group
 * @returns the group's own attributes, and the props to share
 */
export function splitGroupProps<T extends GroupAttributes>({
  'aria-label': label,
  'aria-labelledby': labelledBy,
  'aria-describedby': describedBy,
  'aria-required': required,
  'aria-invalid': invalid,
  'aria-errormessage': errorMessage,
  ...shared
}: T): SplitGroupProps<T> {
  return {
    group: {
      'aria-label': label,
      'aria-labelledby': labelledBy,
      'aria-describedby': describedBy,
      'aria-required': required,
      'aria-invalid': invalid,
      'aria-errormessage': errorMessage,
    },
    shared,
  };
}
