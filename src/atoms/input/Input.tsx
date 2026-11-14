import { type JSX, useId } from 'react';

import { isDefined } from '../../utils/functions/isDefined';
import { joinIds } from '../../utils/functions/joinIds';
import type { DistributiveOmit } from '../../utils/types/PolymorphicProps';
import { BaseInput, type BaseInputProps } from '../base_input';
import { useField } from '../field';
import Affix from './bones/Affix';
import type { AffixProps } from './types';

// `prefix` is also an HTML attribute, which the affix takes the place of
export type InputProps = DistributiveOmit<BaseInputProps, 'prefix'> &
  AffixProps;

function Input(ownProps: InputProps): JSX.Element {
  const { prefix, postfix, ...props } = useField().getFieldProps(ownProps);
  const affixId = useId();
  const affix = prefix ?? postfix;
  const describedBy = isDefined(affix)
    ? joinIds(props['aria-describedby'], affixId)
    : props['aria-describedby'];

  // a textarea has no type, while an input is a text field unless told otherwise
  const input =
    props.as === 'textarea' ? (
      <BaseInput {...props} aria-describedby={describedBy} />
    ) : (
      <BaseInput type="text" {...props} aria-describedby={describedBy} />
    );

  if (!isDefined(affix)) {
    return input;
  }

  return (
    <Affix
      id={affixId}
      content={affix}
      placement={isDefined(prefix) ? 'before' : 'after'}
    >
      {input}
    </Affix>
  );
}

export default Input;
