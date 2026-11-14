import type { ComponentPropsWithRef, JSX } from 'react';

import { joinIds } from '../../../utils/functions/joinIds';
import { useCustomValidity } from '../../../utils/hooks/useCustomValidity';
import { useMergedRefs } from '../../../utils/hooks/useMergedRefs';

type InputElementProps = ComponentPropsWithRef<'input'> & {
  /**
   * An error message, which marks the input as invalid and becomes its native
   * validation message.
   */
  error?: string;
  /** The id of an affix, which describes the input next to its own descriptions. */
  affixId?: string;
};

/** The `input` element of `Input`, which an affix may also describe. */
function InputElement({
  error,
  affixId,
  ref,
  ...props
}: InputElementProps): JSX.Element {
  const validityRef = useCustomValidity<HTMLInputElement>(error);
  const inputRef = useMergedRefs(validityRef, ref);

  return (
    <input
      // an input is a text field unless told otherwise
      type="text"
      aria-invalid={Boolean(error)}
      {...props}
      aria-describedby={joinIds(props['aria-describedby'], affixId)}
      ref={inputRef}
    />
  );
}

export default InputElement;
