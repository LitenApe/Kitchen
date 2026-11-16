import type { AriaAttributes } from 'react';

import { joinIds } from '../../../utils/functions/joinIds';

type ErrorProps = Pick<AriaAttributes, 'aria-invalid' | 'aria-describedby'>;

/**
 * Marks a field's control as invalid while there is an error, and describes
 * it with the error ahead of its other descriptions. A field given an
 * `aria-invalid` of its own keeps it, unless it is `undefined`, as a component
 * which forwards its props would pass it.
 *
 * @param error the error message, where an empty one counts as no error
 * @param errorId the id of the element which shows the error
 * @param own the field's own `aria-invalid` and descriptions
 * @returns the `aria-invalid` and descriptions to give the control
 */
export function getErrorProps(
  error: string | undefined,
  errorId: string,
  own: ErrorProps
): ErrorProps {
  const hasError = Boolean(error);

  return {
    'aria-invalid': own['aria-invalid'] ?? hasError,
    'aria-describedby': joinIds(hasError && errorId, own['aria-describedby']),
  };
}
