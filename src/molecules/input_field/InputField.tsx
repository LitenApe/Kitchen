import type { ComponentType, JSX, Ref } from 'react';

import { Input, type InputProps } from '../../atoms/input';
import { Label } from '../../atoms/label';
import type { DistributiveOmit } from '../../utils/types/PolymorphicProps';
import { BaseField } from '../base_field';

export type InputFieldProps = {
  /** The text of the label. */
  label: string;
  /**
   * An error message to show and announce, which also marks the input as
   * invalid.
   */
  error?: string;
  /**
   * A component to render in place of `Input`. It only receives the `ref`, so
   * it has to take its other props from the field through `useField`, as
   * `Input` does.
   */
  as?: ComponentType<{ ref?: Ref<HTMLInputElement> }>;
  /** Passed on to the input. */
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
