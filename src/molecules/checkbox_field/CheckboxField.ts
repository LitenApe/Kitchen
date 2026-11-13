import { ForwardedRef, JSX, createElement, forwardRef } from 'react';

import { BaseField } from '../base_field';
import { Checkbox } from '../../atoms/checkbox';
import { Label } from '../../atoms/label';
import { useId } from '../../utils/hooks/useId';

type CheckboxFieldProps = {
  label: string;
} & Parameters<typeof Checkbox>[0];

function CheckboxField(
  props: CheckboxFieldProps,
  ref: ForwardedRef<HTMLInputElement>
): JSX.Element {
  const { label, ...rest } = props;
  const id = useId('checkbox-field');

  return createElement(BaseField, rest, [
    createElement(Checkbox, { key: `${id}_component`, ref }),
    createElement(Label, { key: `${id}_label` }, label),
  ]);
}

export default forwardRef(CheckboxField);
