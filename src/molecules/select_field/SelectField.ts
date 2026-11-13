import { ForwardedRef, JSX, createElement, forwardRef } from 'react';
import { Select, Option as SelectOption } from '../../atoms/select';

import { BaseField } from '../base_field';
import { Label } from '../../atoms/label';
import { useId } from '../../utils/hooks/useId';

type OptionProps = Parameters<typeof SelectOption>[0];
interface Option extends Omit<OptionProps, 'children' | 'value' | 'ref'> {
  label: string;
  value: string;
}

type SelectProps = Parameters<typeof Select>[0];
type SelectFieldProps = {
  label: string;
  options: Array<Option | (() => JSX.Element)>;
} & Omit<SelectProps, 'children'>;

function SelectField(
  props: SelectFieldProps,
  ref: ForwardedRef<HTMLSelectElement>
): JSX.Element {
  const { label, options, ...rest } = props;
  const id = useId('select-field');

  return createElement(BaseField, rest, [
    createElement(Label, { key: `${id}_label_${label}` }, label),
    createElement(
      Select,
      { key: `${id}_component_${label}`, ref },
      options.map((option) =>
        typeof option === 'function'
          ? createElement(option)
          : createElement(
              SelectOption,
              { ...option, key: `${id}_option_${label}` },
              option.label
            )
      )
    ),
  ]);
}

export default forwardRef(SelectField);
