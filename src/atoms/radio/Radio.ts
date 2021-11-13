import { createElement, ForwardedRef, forwardRef } from 'react';
import { BaseInput, BaseInputProps } from '../base_input';

function Radio(
  props: Omit<BaseInputProps<'input'>, 'type'>,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  return createElement(BaseInput, { ...props, type: 'radio', ref });
}

export default forwardRef(Radio);
