import type { ComponentPropsWithoutRef, JSX, ReactNode, Ref } from 'react';

import { callAll } from '../../utils/functions/callAll';
import { mergeDefinedProps } from '../../utils/functions/mergeDefinedProps';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import {
  type GroupMemberProps,
  RadioGroupContext,
} from './bones/RadioGroupContext';
import { splitGroupProps } from './bones/splitGroupProps';
import { useGroupBlur } from './bones/useGroupBlur';
import { useGroupError } from './bones/useGroupError';

/**
 * Apart from `children`, `ref` and the `aria-` props which name, describe or
 * validate the group, which all belong to the `fieldset`, the props are
 * shared with every radio in the group.
 */
export type RadioGroupProps = {
  /** A `Legend`, followed by the radios, each in a `Field` with its `Label`. */
  children?: ReactNode;
  /** Attached to the `fieldset`. */
  ref?: Ref<HTMLFieldSetElement>;
} & Omit<ComponentPropsWithoutRef<'input'>, 'children'>;

function RadioGroup({
  children,
  ref,
  onBlur,
  ...props
}: RadioGroupProps): JSX.Element {
  const { group, shared } = splitGroupProps(props);
  const { groupRef, handleBlur } = useGroupBlur<HTMLFieldSetElement>(onBlur);
  const fieldsetRef = useMergedRefs(ref, groupRef);
  const { 'aria-invalid': invalid, 'aria-describedby': describedBy } =
    useGroupError(group);

  function getGroupProps<T extends GroupMemberProps>(radioProps: T): T {
    const ownBlur: GroupMemberProps['onBlur'] = radioProps.onBlur;
    return {
      ...mergeDefinedProps(shared, radioProps),
      onBlur: callAll(ownBlur, handleBlur),
    };
  }

  return (
    <RadioGroupContext value={{ getGroupProps }}>
      <fieldset
        role="radiogroup"
        ref={fieldsetRef}
        {...group}
        // a surrounding field can also mark and describe the group, rather
        // than its radios
        aria-invalid={invalid}
        aria-describedby={describedBy}
      >
        {children}
      </fieldset>
    </RadioGroupContext>
  );
}

export default RadioGroup;
