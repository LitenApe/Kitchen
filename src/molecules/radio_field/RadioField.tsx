import type { ComponentPropsWithoutRef, JSX, Ref } from 'react';

import { Field } from '../../atoms/field';
import { Label } from '../../atoms/label';
import { Legend } from '../../atoms/legend';
import { Radio, type RadioProps } from '../../atoms/radio';
import { RadioGroup } from '../../atoms/radio_group';
import { BaseField } from '../base_field';

type RadioOption = Omit<RadioProps, 'children' | 'value' | 'name'> & {
  label: string;
  value: string;
};

export type RadioFieldProps = {
  /** The name shared by every radio in the group. */
  name: string;
  /** The legend of the group. */
  label: string;
  /**
   * The choices, as `{ label, value }` objects, which may also include other
   * props for their radio.
   */
  options: Array<RadioOption>;
  /**
   * An error message to show and announce, which also marks the group as
   * invalid.
   */
  error?: string;
  ref?: Ref<HTMLFieldSetElement>;
  // every other prop is passed on to the `BaseField`, which takes the props
  // of an input rather than those of a group
} & Omit<ComponentPropsWithoutRef<'input'>, 'children' | 'name'>;

function RadioField({
  label,
  options,
  name,
  required,
  ref,
  ...props
}: RadioFieldProps): JSX.Element {
  return (
    <BaseField {...props}>
      {/* the group shares `required` with every radio, as screen readers
          only announce it on the radios which have it, and `aria-required`
          tells them that the group as a whole is required */}
      <RadioGroup
        ref={ref}
        name={name}
        required={required}
        aria-required={required}
      >
        <Legend>{label}</Legend>
        {options.map(({ label: optionLabel, ...radioProps }) => (
          // every radio has a field of its own, which links it to its label
          <Field key={radioProps.value}>
            <div>
              <Radio {...radioProps} />
              <Label>{optionLabel}</Label>
            </div>
          </Field>
        ))}
      </RadioGroup>
    </BaseField>
  );
}

export default RadioField;
