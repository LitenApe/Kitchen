import {
  ComponentPropsWithoutRef,
  FocusEvent,
  ForwardedRef,
  JSX,
  createElement,
  createRef,
  forwardRef,
} from 'react';

import { RadioGroupContext } from './bones/RadioGroupContext';
import { callAll } from '../../utils/functions/callAll';
import { isNull } from '../../utils/functions/isNull';
import { isUndefined } from '../../utils/functions/isUndefined';
import { mergeRefs } from '../../utils/functions/mergeRefs';

export type RadioGroupProps = ComponentPropsWithoutRef<'fieldset'> &
  ComponentPropsWithoutRef<'input'>;

function RadioGroup(
  props: RadioGroupProps,
  ref: ForwardedRef<HTMLFieldSetElement>
): JSX.Element {
  const fieldsetRef = createRef<HTMLFieldSetElement>();
  const { children, onBlur, ...rest } = props;

  function onBlurHandler(event: FocusEvent<HTMLInputElement>) {
    if (isUndefined(onBlur)) {
      return;
    }

    if (isNull(fieldsetRef.current)) {
      return onBlur(event);
    }

    if (!fieldsetRef.current.contains(event.relatedTarget)) {
      return onBlur(event);
    }
  }

  function getGroupProps<T extends ComponentPropsWithoutRef<'input'>>(
    args: T
  ): T {
    return {
      ...rest,
      ...args,
      onBlur: callAll(args.onBlur, onBlurHandler),
    };
  }

  return createElement(
    RadioGroupContext.Provider,
    { value: { getGroupProps } },
    createElement(
      'fieldset',
      { role: 'radiogroup', ref: mergeRefs(ref, fieldsetRef) },
      children
    )
  );
}

export default forwardRef(RadioGroup);
