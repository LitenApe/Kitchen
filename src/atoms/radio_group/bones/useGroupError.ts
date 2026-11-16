import { useField } from '../../field';
import { type GroupError, mergeGroupError } from './mergeGroupError';

/**
 * Whether a group is invalid, and the ids of what describes it, combined with
 * those of a surrounding field as {@link mergeGroupError} describes.
 *
 * @param own the group's own `aria-invalid` and descriptions
 * @returns the `aria-invalid` and descriptions of the group
 */
export function useGroupError(own: GroupError): GroupError {
  const field = useField().getFieldProps<GroupError>({});
  return mergeGroupError(own, field);
}
