import type {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  JSX,
  ReactNode,
  Ref,
} from 'react';

import { callAll } from '../../utils/functions/callAll';
import { mergeDefinedProps } from '../../utils/functions/mergeDefinedProps';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import {
  type GroupMemberProps,
  RadioGroupContext,
} from './bones/RadioGroupContext';
import {
  type SharedRadioProps,
  splitGroupProps,
} from './bones/splitGroupProps';
import { useGroupBlur } from './bones/useGroupBlur';
import { useGroupError } from './bones/useGroupError';

/**
 * `name`, `onChange`, `required`, `disabled` and `form` are shared with every
 * radio in the group. Every other prop, such as `id`, `className`, `style` or
 * the `aria-` props which name, describe or validate the group, is set on the
 * `fieldset`.
 */
export type RadioGroupProps = {
  /** A `Legend`, followed by the radios, each in a `Field` with its `Label`. */
  children?: ReactNode;
  /**
   * Called when focus leaves the group, but not when it moves between its
   * radios.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;
  /** Attached to the `fieldset`. */
  ref?: Ref<HTMLFieldSetElement>;
} & SharedRadioProps &
  Omit<
    ComponentPropsWithoutRef<'fieldset'>,
    keyof SharedRadioProps | 'children' | 'onBlur' | 'role'
  >;

function RadioGroup({
  children,
  ref,
  onBlur,
  ...props
}: RadioGroupProps): JSX.Element {
  const { shared, group } = splitGroupProps(props);
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
        {...group}
        role="radiogroup"
        ref={fieldsetRef}
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
