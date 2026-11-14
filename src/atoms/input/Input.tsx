import { type ComponentPropsWithRef, type JSX, useId } from 'react';

import { isDefined } from '../../utils/functions/isDefined';
import { joinIds } from '../../utils/functions/joinIds';
import { useCustomValidity } from '../../utils/hooks/useCustomValidity';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import type { DistributiveOmit } from '../../utils/types/PolymorphicProps';
import { useField } from '../field';
import Affix from './bones/Affix';
import type { AffixProps } from './types';

type InputElementProps = { as?: 'input' } & ComponentPropsWithRef<'input'>;
type TextareaElementProps = {
  as: 'textarea';
} & ComponentPropsWithRef<'textarea'>;

// `prefix` is also an HTML attribute, which the affix takes the place of
export type InputProps = DistributiveOmit<
  InputElementProps | TextareaElementProps,
  'prefix'
> & {
  /**
   * An error message, which marks the input as invalid and becomes its native
   * validation message.
   */
  error?: string;
} & AffixProps;

type ControlElement = HTMLInputElement | HTMLTextAreaElement;

/**
 * A text input, or a `textarea` through `as`, which takes its id and other
 * props from a surrounding `Field`, and can show a prefix or a postfix.
 */
function Input(ownProps: InputProps): JSX.Element {
  const { prefix, postfix, error, ...props } =
    useField().getFieldProps(ownProps);
  const validityRef = useCustomValidity<ControlElement>(error);
  const ref = useMergedRefs<ControlElement>(validityRef, props.ref);
  const invalid = Boolean(error);
  const affixId = useId();
  const affix = prefix ?? postfix;
  const describedBy = isDefined(affix)
    ? joinIds(props['aria-describedby'], affixId)
    : props['aria-describedby'];

  let control: JSX.Element;
  if (props.as === 'textarea') {
    const { as: _as, ...textareaProps } = props;
    control = (
      <textarea
        aria-invalid={invalid}
        {...textareaProps}
        aria-describedby={describedBy}
        ref={ref}
      />
    );
  } else {
    const { as: _as, ...inputProps } = props;
    control = (
      // an input is a text field unless told otherwise
      <input
        type="text"
        aria-invalid={invalid}
        {...inputProps}
        aria-describedby={describedBy}
        ref={ref}
      />
    );
  }

  if (!isDefined(affix)) {
    return control;
  }

  return (
    <Affix
      id={affixId}
      content={affix}
      placement={isDefined(prefix) ? 'before' : 'after'}
    >
      {control}
    </Affix>
  );
}

export default Input;
