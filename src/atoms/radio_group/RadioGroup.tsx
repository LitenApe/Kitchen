import type { ComponentPropsWithoutRef, JSX, ReactNode, Ref } from 'react';

import { callAll } from '../../utils/functions/callAll';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import {
  type GroupMemberProps,
  RadioGroupContext,
} from './bones/RadioGroupContext';
import { splitGroupProps } from './bones/splitGroupProps';
import { useGroupBlur } from './bones/useGroupBlur';
import { useGroupError } from './bones/useGroupError';

/**
 * Apart from `children`, `ref`, `error` and the `aria-` props which name,
 * describe or validate the group, which all belong to the `fieldset`, the
 * props are shared with every radio in the group.
 */
export type RadioGroupProps = {
  children?: ReactNode;
  ref?: Ref<HTMLFieldSetElement>;
  /**
   * An error message, which marks the group as invalid and keeps its radios
   * from being submitted. Show the message yourself, and point to it with
   * `aria-describedby`.
   */
  error?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'children'>;

function RadioGroup({
  children,
  ref,
  onBlur,
  error: ownError,
  ...props
}: RadioGroupProps): JSX.Element {
  const { group, shared } = splitGroupProps(props);
  const { groupRef, handleBlur } = useGroupBlur<HTMLFieldSetElement>(onBlur);
  const fieldsetRef = useMergedRefs(ref, groupRef);
  const { error, 'aria-describedby': describedBy } = useGroupError({
    error: ownError,
    'aria-describedby': group['aria-describedby'],
  });

  function getGroupProps<T extends GroupMemberProps>(radioProps: T): T {
    const ownBlur: GroupMemberProps['onBlur'] = radioProps.onBlur;
    return {
      ...shared,
      ...radioProps,
      onBlur: callAll(ownBlur, handleBlur),
    };
  }

  return (
    <RadioGroupContext value={{ getGroupProps, error }}>
      <fieldset
        role="radiogroup"
        ref={fieldsetRef}
        {...group}
        // an error marks the group as invalid, rather than its radios
        aria-invalid={group['aria-invalid'] ?? Boolean(error)}
        aria-describedby={describedBy}
      >
        {children}
      </fieldset>
    </RadioGroupContext>
  );
}

export default RadioGroup;
