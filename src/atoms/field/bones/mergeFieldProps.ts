import { joinIds } from '../../../utils/functions/joinIds';

/** Reads `aria-describedby` from props which are only known to be an object. */
function getDescribedBy(props: object): string | undefined {
  return 'aria-describedby' in props &&
    typeof props['aria-describedby'] === 'string'
    ? props['aria-describedby']
    : undefined;
}

/**
 * Merges the props a field shares with a control's own props. The control's
 * own props take precedence, except for `aria-describedby`, which combines
 * both, so that a description shared by the field, such as its error message,
 * is never lost.
 *
 * @param shared the props shared by the field
 * @param own the control's own props
 * @returns the merged props
 */
export function mergeFieldProps<T extends object>(shared: object, own: T): T {
  return {
    ...shared,
    ...own,
    'aria-describedby': joinIds(getDescribedBy(shared), getDescribedBy(own)),
  };
}
