import type { JSX } from 'react';

import { Field } from '../../atoms/field';
import { Label } from '../../atoms/label';
import { Legend } from '../../atoms/legend';
import { Radio, type RadioProps } from '../../atoms/radio';
import { RadioGroup, type RadioGroupProps } from '../../atoms/radio_group';
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
  /** The choices, which may include other props for their radio. */
  options: Array<RadioOption>;
} & Omit<RadioGroupProps, 'children' | 'name'>;

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
      {/* only the first radio is natively required, so the group tells
          screen readers that choosing one of them is required */}
      <RadioGroup ref={ref} aria-required={required}>
        <Legend>{label}</Legend>
        {options.map(({ label: optionLabel, ...radioProps }, index) => (
          // every radio has a field of its own, which links it to its label
          <Field key={radioProps.value}>
            <div>
              <Radio
                // one required radio makes choosing any of them mandatory
                required={required && index === 0}
                {...radioProps}
                name={name}
              />
              <Label>{optionLabel}</Label>
            </div>
          </Field>
        ))}
      </RadioGroup>
    </BaseField>
  );
}

export default RadioField;
