import type { ComponentType, JSX, Ref } from 'react';

import { Input, type InputProps } from '../../atoms/input';
import { Label } from '../../atoms/label';
import type { DistributiveOmit } from '../../utils/types/PolymorphicProps';
import { BaseField } from '../base_field';

export type InputFieldProps = {
  /** The text of the label. */
  label: string;
  /** Renders another input component in place of `Input`. */
  as?: ComponentType<{ ref?: Ref<HTMLInputElement> }>;
  ref?: Ref<HTMLInputElement>;
} & DistributiveOmit<InputProps, 'ref'>;

function InputField({
  label,
  as: Component = Input,
  ref,
  ...props
}: InputFieldProps): JSX.Element {
  return (
    <BaseField {...props}>
      <Label>{label}</Label>
      <Component ref={ref} />
    </BaseField>
  );
}

export default InputField;
