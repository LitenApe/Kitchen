import type { JSX } from 'react';

import { Checkbox, type CheckboxProps } from '../../atoms/checkbox';
import { Label } from '../../atoms/label';
import { BaseField } from '../base_field';

export type CheckboxFieldProps = {
  /** The text of the label. */
  label: string;
} & CheckboxProps;

function CheckboxField({
  label,
  ref,
  ...props
}: CheckboxFieldProps): JSX.Element {
  return (
    <BaseField {...props}>
      <Checkbox ref={ref} />
      <Label>{label}</Label>
    </BaseField>
  );
}

export default CheckboxField;
