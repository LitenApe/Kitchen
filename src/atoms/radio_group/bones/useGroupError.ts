import type { ComponentPropsWithoutRef } from 'react';

import { joinIds } from '../../../utils/functions/joinIds';
import { useField } from '../../field';

type GroupError = Pick<
  ComponentPropsWithoutRef<'fieldset'>,
  'aria-invalid' | 'aria-describedby'
>;

/**
 * Whether a group is invalid, and the ids of what describes it. A group inside
 * a field, such as the one `RadioField` renders, also takes the field's
 * `aria-invalid` and descriptions, as they belong to the group as a whole
 * rather than to any one of its radios. The group's own `aria-invalid` takes
 * precedence over the field's.
 *
 * @param own the group's own `aria-invalid` and descriptions
 * @returns the `aria-invalid` and descriptions of the group
 */
export function useGroupError(own: GroupError): GroupError {
  const field = useField().getFieldProps<GroupError>({});

  return {
    'aria-invalid': own['aria-invalid'] ?? field['aria-invalid'],
    'aria-describedby': joinIds(
      field['aria-describedby'],
      own['aria-describedby']
    ),
  };
}
