import { joinIds } from '../../../utils/functions/joinIds';
import { mergeDefinedProps } from '../../../utils/functions/mergeDefinedProps';

/** Reads `aria-describedby` from props which are only known to be an object. */
function getDescribedBy(props: object): string | undefined {
  return 'aria-describedby' in props &&
    typeof props['aria-describedby'] === 'string'
    ? props['aria-describedby']
    : undefined;
}

/**
 * Merges the props a field shares with a control's own props. The control's
 * own props take precedence unless they are `undefined`. `aria-describedby`
 * combines both instead, so that a description shared by the field, such as
 * its error message, is never lost.
 *
 * @param shared the props shared by the field
 * @param own the control's own props
 * @returns the merged props
 */
export function mergeFieldProps<T extends object>(shared: object, own: T): T {
  return {
    ...mergeDefinedProps(shared, own),
    'aria-describedby': joinIds(getDescribedBy(shared), getDescribedBy(own)),
  };
}
