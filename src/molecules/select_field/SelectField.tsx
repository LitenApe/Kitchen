import type { ComponentType, JSX } from 'react';

import { Label } from '../../atoms/label';
import {
  Option,
  type OptionProps,
  Select,
  type SelectProps,
} from '../../atoms/select';
import { BaseField } from '../base_field';

type OptionData = Omit<OptionProps, 'children' | 'value' | 'ref'> & {
  label: string;
  value: string;
};

export type SelectFieldProps = {
  /** The text of the label. */
  label: string;
  /** The choices, as option data or as components which render options. */
  options: Array<OptionData | ComponentType>;
} & Omit<SelectProps, 'children'>;

function SelectField({
  label,
  options,
  ref,
  ...props
}: SelectFieldProps): JSX.Element {
  return (
    <BaseField {...props}>
      <Label>{label}</Label>
      <Select ref={ref}>{options.map(renderOption)}</Select>
    </BaseField>
  );
}

function renderOption(
  option: OptionData | ComponentType,
  index: number
): JSX.Element {
  if (typeof option === 'function') {
    const CustomOption = option;
    return <CustomOption key={index} />;
  }

  const { label, ...optionProps } = option;
  return (
    <Option key={option.value} {...optionProps}>
      {label}
    </Option>
  );
}

export default SelectField;
