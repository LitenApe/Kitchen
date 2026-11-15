import type { ComponentPropsWithRef, JSX } from 'react';

import { joinIds } from '../../../utils/functions/joinIds';

type InputElementProps = ComponentPropsWithRef<'input'> & {
  /** The id of an affix, which describes the input next to its own descriptions. */
  affixId?: string;
};

/** The `input` element of `Input`, which an affix may also describe. */
function InputElement({
  affixId,
  // an input is a text field unless told otherwise
  type = 'text',
  ...props
}: InputElementProps): JSX.Element {
  return (
    <input
      {...props}
      type={type}
      aria-describedby={joinIds(props['aria-describedby'], affixId)}
    />
  );
}

export default InputElement;
