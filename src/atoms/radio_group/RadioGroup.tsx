import type {
  ComponentPropsWithoutRef,
  FocusEvent,
  FocusEventHandler,
  JSX,
  ReactNode,
  Ref,
} from 'react';

import { mergeDefinedProps } from '../../utils/functions/mergeDefinedProps';
import { RadioGroupContext } from './bones/RadioGroupContext';
import {
  type SharedRadioProps,
  splitGroupProps,
} from './bones/splitGroupProps';
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
   * Called when focus leaves the group, but not when it moves between the
   * controls inside it, such as from a radio to a text input. The event's
   * `target` is the control which lost focus.
   */
  onBlur?: FocusEventHandler<HTMLFieldSetElement>;
  /** Attached to the `fieldset`. */
  ref?: Ref<HTMLFieldSetElement>;
} & SharedRadioProps &
  Omit<
    ComponentPropsWithoutRef<'fieldset'>,
    keyof SharedRadioProps | 'children' | 'onBlur' | 'role'
  >;

function RadioGroup({
  children,
  onBlur,
  ...props
}: RadioGroupProps): JSX.Element {
  const { shared, group } = splitGroupProps(props);
  const { 'aria-invalid': invalid, 'aria-describedby': describedBy } =
    useGroupError(group);

  function getGroupProps<T extends object>(radioProps: T): T {
    return mergeDefinedProps(shared, radioProps);
  }

  // the blur of every control inside the group bubbles up to the fieldset,
  // which only passes it on when focus has moved outside the group
  function handleBlur(event: FocusEvent<HTMLFieldSetElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      onBlur?.(event);
    }
  }

  return (
    <RadioGroupContext value={{ getGroupProps }}>
      <fieldset
        {...group}
        role="radiogroup"
        onBlur={handleBlur}
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
