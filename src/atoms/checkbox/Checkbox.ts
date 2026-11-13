import { createElement, ForwardedRef, forwardRef, JSX } from 'react';
import { BaseInput, BaseInputProps } from '../base_input';

function Checkbox(
  props: Omit<BaseInputProps<'input'>, 'type'>,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  return createElement(BaseInput, { ...props, type: 'checkbox', ref });
}

export default forwardRef(Checkbox);
