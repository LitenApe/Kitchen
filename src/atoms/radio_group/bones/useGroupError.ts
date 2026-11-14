import { joinIds } from '../../../utils/functions/joinIds';
import { useField } from '../../field';

type GroupError = {
  error?: string;
  'aria-describedby'?: string;
};

/**
 * The error of a group, and the ids of what describes it. A group inside a
 * field, such as the one `RadioField` renders, also takes the field's error
 * and descriptions, as they belong to the group as a whole rather than to any
 * one of its radios.
 *
 * @param own the group's own error and descriptions
 * @returns the error and descriptions of the group
 */
export function useGroupError(own: GroupError): GroupError {
  const field = useField().getFieldProps<GroupError>({});

  return {
    error: own.error ?? field.error,
    'aria-describedby': joinIds(
      field['aria-describedby'],
      own['aria-describedby']
    ),
  };
}
