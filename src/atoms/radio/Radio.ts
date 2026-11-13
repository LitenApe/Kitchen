import { BaseInput, BaseInputProps } from '../base_input';
import { ForwardedRef, JSX, createElement, forwardRef } from 'react';

import { useRadioGroup } from '../radio_group';

export type RadioProps = Omit<BaseInputProps<'input'>, 'type'>;

function Radio(
  props: RadioProps,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const { getGroupProps } = useRadioGroup();

  return createElement(BaseInput, {
    ...getGroupProps(props),
    type: 'radio',
    ref,
  });
}

export default forwardRef(Radio);
