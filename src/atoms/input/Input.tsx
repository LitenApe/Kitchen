import { type ComponentPropsWithRef, type JSX, useId } from 'react';

import { useField } from '../field';
import Affix from './bones/Affix';
import InputElement from './bones/InputElement';
import { InputLayout, getInputLayout } from './bones/getInputLayout';
import type { AffixProps } from './types';

// `prefix` is also an HTML attribute, which the affix takes the place of
export type InputProps = Omit<ComponentPropsWithRef<'input'>, 'prefix'> &
  AffixProps;

/**
 * A text input, which takes its id and other props from a surrounding
 * `Field`, and can show a prefix or a postfix.
 */
function Input(ownProps: InputProps): JSX.Element {
  // the input's own props, combined with the ones its field shares
  const inputProps = useField().getFieldProps(ownProps);
  const { prefix, postfix, ...props } = inputProps;
  const affixId = useId();
  const layout = getInputLayout(inputProps);

  // the input is wrapped even without an affix, as React would otherwise
  // replace it whenever an affix comes or goes, which loses its focus and
  // what was typed into it
  return (
    <Affix id={affixId} layout={layout} content={prefix ?? postfix}>
      <InputElement
        {...props}
        affixId={layout === InputLayout.Plain ? undefined : affixId}
      />
    </Affix>
  );
}

export default Input;
