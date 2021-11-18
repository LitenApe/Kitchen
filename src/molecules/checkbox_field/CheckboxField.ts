import { createElement, ForwardedRef, forwardRef } from 'react';
import { BaseInputProps } from '../../atoms/base_input';
import { Checkbox } from '../../atoms/checkbox';
import { Label } from '../../atoms/label';
import { useId } from '../../utils/hooks/useId';
import { BaseField } from '../base_field';

type Props = {
  label: string;
} & BaseInputProps<'input'>;

function CheckboxField(
  props: Props,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const { label, ...rest } = props;
  const id = useId('checkbox-field');

  return createElement(BaseField, rest, [
    createElement(Checkbox, { key: `${id}_component`, ref }),
    createElement(Label, null, { key: `${id}_label` }, label),
  ]);
}

export default forwardRef(CheckboxField);