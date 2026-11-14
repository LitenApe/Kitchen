import { type ComponentPropsWithRef, type JSX, useId } from 'react';

import { useField } from '../field';
import Affix from './bones/Affix';
import InputElement from './bones/InputElement';
import { InputLayout, getInputLayout } from './bones/getInputLayout';
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
  // the input's own props, combined with the ones its field shares
  const inputProps = useField().getFieldProps(ownProps);
  const { prefix, postfix, ...props } = inputProps;
  const affixId = useId();

  switch (getInputLayout(inputProps)) {
    case InputLayout.Plain:
      return <InputElement {...props} />;

    case InputLayout.Prefixed:
      return (
        <Affix id={affixId} content={prefix} placement="before">
          <InputElement {...props} affixId={affixId} />
        </Affix>
      );

    case InputLayout.Postfixed:
      return (
        <Affix id={affixId} content={postfix} placement="after">
          <InputElement {...props} affixId={affixId} />
        </Affix>
      );
  }
}

export default Input;
