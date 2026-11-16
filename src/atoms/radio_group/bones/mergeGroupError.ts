import type { ComponentPropsWithoutRef } from 'react';

import { joinIds } from '../../../utils/functions/joinIds';

export type GroupError = Pick<
  ComponentPropsWithoutRef<'fieldset'>,
  'aria-invalid' | 'aria-describedby'
>;

/**
 * Combines whether a group is invalid, and the ids of what describes it, with
 * those of a surrounding field, such as the one `RadioField` renders, as they
 * belong to the group as a whole rather than to any one of its radios. The
 * group's own `aria-invalid` takes precedence over the field's, and the
 * descriptions are combined, the field's first.
 *
 * @param own the group's own `aria-invalid` and descriptions
 * @param field the `aria-invalid` and descriptions which the field shares
 * @returns the `aria-invalid` and descriptions of the group
 */
export function mergeGroupError(
  own: GroupError,
  field: GroupError
): GroupError {
  return {
    'aria-invalid': own['aria-invalid'] ?? field['aria-invalid'],
    'aria-describedby': joinIds(
      field['aria-describedby'],
      own['aria-describedby']
    ),
  };
}
