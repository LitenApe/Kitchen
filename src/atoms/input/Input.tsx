import { type ComponentPropsWithRef, type JSX, useId } from 'react';

import { isDefined } from '../../utils/functions/isDefined';
import { joinIds } from '../../utils/functions/joinIds';
import { useCustomValidity } from '../../utils/hooks/useCustomValidity';
import { useMergedRefs } from '../../utils/hooks/useMergedRefs';
import { useField } from '../field';
import Affix from './bones/Affix';
import type { AffixProps } from './types';

// `prefix` is also an HTML attribute, which the affix takes the place of
export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'prefix'> & {
  /**
   * An error message, which marks the input as invalid and becomes its native
   * validation message.
   */
  error?: string;
} & AffixProps;

/**
 * A text input, which takes its id and other props from a surrounding
 * `Field`, and can show a prefix or a postfix.
 */
function Input(ownProps: InputProps): JSX.Element {
  const { prefix, postfix, error, ref, ...props } =
    useField().getFieldProps(ownProps);
  const validityRef = useCustomValidity<HTMLInputElement>(error);
  const inputRef = useMergedRefs(validityRef, ref);
  const affixId = useId();
  const affix = prefix ?? postfix;
  const describedBy = isDefined(affix)
    ? joinIds(props['aria-describedby'], affixId)
    : props['aria-describedby'];

  const input = (
    <input
      // an input is a text field unless told otherwise
      type="text"
      aria-invalid={Boolean(error)}
      {...props}
      aria-describedby={describedBy}
      ref={inputRef}
    />
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
