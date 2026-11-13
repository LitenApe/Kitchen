import { ForwardedRef, JSX, createElement, forwardRef } from 'react';
import { Input, InputProps, PermittedTags } from '../../atoms/input';

import { BaseField } from '../base_field';
import { Label } from '../../atoms/label';
import { useId } from '../../utils/hooks/useId';

type InputFieldProps<T extends PermittedTags> = {
  label: string;
  as?: () => JSX.Element;
} & InputProps<T>;

function InputField<T extends PermittedTags>(
  props: InputFieldProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { as = Input, label, ...rest } = props;
  const id = useId('input-field');

  // @ts-ignore
  return createElement(BaseField, rest, [
    createElement(Label, { key: `${id}_label` }, label),
    createElement(as, { key: `${id}_component`, ref }),
  ]);
}

export default forwardRef(InputField);
